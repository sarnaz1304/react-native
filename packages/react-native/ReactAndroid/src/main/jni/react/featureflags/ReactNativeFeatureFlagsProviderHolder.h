/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<228921c4374aa45bdcd496f0f10d653a>>
 */

/**
 * IMPORTANT: Do NOT modify this file directly.
 *
 * To change the definition of the flags, edit
 *   packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.json.
 *
 * To regenerate this code, run the following script from the repo root:
 *   yarn featureflags-update
 */

#pragma once

#include <fbjni/fbjni.h>
#include <react/featureflags/ReactNativeFeatureFlags.h>

namespace facebook::react {

/**
 * Implementation of ReactNativeFeatureFlagsProvider that wraps a
 * ReactNativeFeatureFlagsProvider Java object.
 */
class ReactNativeFeatureFlagsProviderHolder
    : public ReactNativeFeatureFlagsProvider {
 public:
  explicit ReactNativeFeatureFlagsProviderHolder(
      jni::alias_ref<jobject> javaProvider)
      : javaProvider_(make_global(javaProvider)){};

  bool commonTestFlag() override;
  bool useModernRuntimeScheduler() override;
  bool enableMicrotasks() override;
  bool batchRenderingUpdatesInEventLoop() override;
  bool enableSpannableBuildingUnification() override;
  bool enableCustomDrawOrderFabric() override;

 private:
  jni::global_ref<jobject> javaProvider_;
};

} // namespace facebook::react
