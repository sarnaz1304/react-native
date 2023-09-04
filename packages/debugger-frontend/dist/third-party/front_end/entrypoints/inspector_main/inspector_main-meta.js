import*as e from"../../core/common/common.js";import*as t from"../../core/i18n/i18n.js";import*as o from"../../core/root/root.js";import*as i from"../../ui/legacy/legacy.js";const n={rendering:"Rendering",showRendering:"Show Rendering",paint:"paint",layout:"layout",fps:"fps",cssMediaType:"CSS media type",cssMediaFeature:"CSS media feature",visionDeficiency:"vision deficiency",colorVisionDeficiency:"color vision deficiency",reloadPage:"Reload page",hardReloadPage:"Hard reload page",forceAdBlocking:"Force ad blocking on this site",blockAds:"Block ads on this site",showAds:"Show ads on this site, if allowed",autoOpenDevTools:"Auto-open DevTools for popups",doNotAutoOpen:"Do not auto-open DevTools for popups",disablePaused:"Disable paused state overlay",toggleCssPrefersColorSchemeMedia:"Toggle CSS media feature prefers-color-scheme"},a=t.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts",n),r=t.i18n.getLazilyComputedLocalizedString.bind(void 0,a);let s;async function c(){return s||(s=await import("./inspector_main.js")),s}i.ViewManager.registerViewExtension({location:"drawer-view",id:"rendering",title:r(n.rendering),commandPrompt:r(n.showRendering),persistence:"closeable",order:50,loadView:async()=>(await c()).RenderingOptions.RenderingOptionsView.instance(),tags:[r(n.paint),r(n.layout),r(n.fps),r(n.cssMediaType),r(n.cssMediaFeature),r(n.visionDeficiency),r(n.colorVisionDeficiency)]}),i.ActionRegistration.registerActionExtension({category:i.ActionRegistration.ActionCategory.NAVIGATION,actionId:"inspector_main.reload",loadActionDelegate:async()=>(await c()).InspectorMain.ReloadActionDelegate.instance(),iconClass:"refresh",title:r(n.reloadPage),bindings:[{platform:"windows,linux",shortcut:"Ctrl+R"},{platform:"windows,linux",shortcut:"F5"},{platform:"mac",shortcut:"Meta+R"}]}),i.ActionRegistration.registerActionExtension({category:i.ActionRegistration.ActionCategory.NAVIGATION,actionId:"inspector_main.hard-reload",loadActionDelegate:async()=>(await c()).InspectorMain.ReloadActionDelegate.instance(),title:r(n.hardReloadPage),bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+R"},{platform:"windows,linux",shortcut:"Shift+F5"},{platform:"windows,linux",shortcut:"Ctrl+F5"},{platform:"windows,linux",shortcut:"Ctrl+Shift+F5"},{platform:"mac",shortcut:"Shift+Meta+R"}]}),i.ActionRegistration.registerActionExtension({actionId:"rendering.toggle-prefers-color-scheme",category:i.ActionRegistration.ActionCategory.RENDERING,title:r(n.toggleCssPrefersColorSchemeMedia),loadActionDelegate:async()=>(await c()).RenderingOptions.ReloadActionDelegate.instance()}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.NETWORK,title:r(n.forceAdBlocking),settingName:"network.adBlockingEnabled",settingType:e.Settings.SettingType.BOOLEAN,storageType:e.Settings.SettingStorageType.Session,defaultValue:!1,options:[{value:!0,title:r(n.blockAds)},{value:!1,title:r(n.showAds)}]}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.GLOBAL,storageType:e.Settings.SettingStorageType.Synced,title:r(n.autoOpenDevTools),settingName:"autoAttachToCreatedPages",settingType:e.Settings.SettingType.BOOLEAN,order:2,defaultValue:!1,options:[{value:!0,title:r(n.autoOpenDevTools)},{value:!1,title:r(n.doNotAutoOpen)}]}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.APPEARANCE,storageType:e.Settings.SettingStorageType.Synced,title:r(n.disablePaused),settingName:"disablePausedStateOverlay",settingType:e.Settings.SettingType.BOOLEAN,defaultValue:!1}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await c()).InspectorMain.NodeIndicator.instance(),order:2,location:i.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT,showLabel:void 0,condition:void 0,separator:void 0,actionId:void 0}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await c()).OutermostTargetSelector.OutermostTargetSelector.instance(),order:98,location:i.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_RIGHT,showLabel:void 0,condition:void 0,separator:void 0,actionId:void 0,experiment:o.Runtime.ExperimentName.OUTERMOST_TARGET_SELECTOR});