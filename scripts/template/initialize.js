/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const {retry} = require('../circleci/retry');
const forEachPackage = require('../monorepo/for-each-package');
const setupVerdaccio = require('../setup-verdaccio');
const {execSync} = require('child_process');
const path = require('path');
const yargs = require('yargs');

const {argv} = yargs
  .option('r', {
    alias: 'reactNativeRootPath',
    describe: 'Path to root folder of react-native',
    required: true,
  })
  .option('n', {
    alias: 'templateName',
    describe: 'Template App name',
    required: true,
  })
  .option('tcp', {
    alias: 'templateConfigPath',
    describe: 'Path to folder containing template config',
    required: true,
  })
  .option('d', {
    alias: 'directory',
    describe: 'Path to template application folder',
    required: true,
  })
  .strict();

const {reactNativeRootPath, templateName, templateConfigPath, directory} = argv;

const REPO_ROOT = path.resolve(__dirname, '../..');
const VERDACCIO_CONFIG_PATH = `${reactNativeRootPath}/.circleci/verdaccio.yml`;
const NPM_REGISTRY_SERVER = 'http://localhost:4873';

async function install() {
  const VERDACCIO_PID = setupVerdaccio(
    reactNativeRootPath,
    VERDACCIO_CONFIG_PATH,
  );
  try {
    process.stdout.write('Bootstrapped Verdaccio \u2705\n');

    process.stdout.write('Building packages...\n');
    execSync('node ./scripts/build/build.js', {
      cwd: REPO_ROOT,
      stdio: [process.stdin, process.stdout, process.stderr],
    });

    process.stdout.write('Starting to publish every package...\n');
    forEachPackage(
      (packageAbsolutePath, packageRelativePathFromRoot, packageManifest) => {
        if (packageManifest.private) {
          return;
        }

        execSync(
          `npm publish --registry ${NPM_REGISTRY_SERVER} --access public`,
          {
            cwd: packageAbsolutePath,
            stdio: [process.stdin, process.stdout, process.stderr],
          },
        );

        process.stdout.write(
          `Published ${packageManifest.name} to proxy \u2705\n`,
        );
      },
    );

    process.stdout.write('Published every package \u2705\n');

    execSync(
      `node cli.js init ${templateName} --directory ${directory} --template ${templateConfigPath} --verbose --skip-install --yarn-config-options npmRegistryServer="${NPM_REGISTRY_SERVER}"`,
      {
        cwd: `${reactNativeRootPath}/packages/react-native`,
        stdio: [process.stdin, process.stdout, process.stderr],
      },
    );
    process.stdout.write('Completed initialization of template app \u2705\n');

    process.stdout.write('Installing dependencies in template app folder...\n');
    const options = {
      cwd: directory,
      stdio: [process.stdin, process.stdout, process.stderr],
    };

    execSync(
      `yarn config set npmRegistryServer "${NPM_REGISTRY_SERVER}"`,
      options,
    );

    execSync(
      'yarn config set unsafeHttpWhitelist --json \'["localhost"]\'',
      options,
    );

    const success = await retry('yarn', options, 3, 500, ['install']);

    if (!success) {
      process.stdout.write(
        'Failed to install dependencies in template app folder.',
      );
      throw new Error('Failed to install dependencies in template app folder.');
    }

    process.stdout.write('Installed dependencies via Yarn \u2705\n');
  } finally {
    process.stdout.write(`Killing verdaccio. PID — ${VERDACCIO_PID}...\n`);
    execSync(`kill -9 ${VERDACCIO_PID}`);
    process.stdout.write('Killed Verdaccio process \u2705\n');
  }
}

install().then(() => {
  console.log('Done with preparing the project.');
  process.exit();
});
