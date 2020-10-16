// allowlist what's loaded so we can avoid starting up a bunch of random tabs we don't need. faster load too.
declare const applicationDescriptor;

export function configApp() {

  applicationDescriptor.modules = [
    { 'name': 'bindings', 'type': 'autostart' },
    { 'name': 'common', 'type': 'autostart' },
    { 'name': 'components', 'type': 'autostart' },
    { 'name': 'console_counters', 'type': 'autostart' },
    { 'name': 'dom_extension', 'type': 'autostart' },
    { 'name': 'extensions', 'type': 'autostart' },
    { 'name': 'host', 'type': 'autostart' },
    { 'name': 'main', 'type': 'autostart' },
    { 'name': 'persistence', 'type': 'autostart' },
    { 'name': 'platform', 'type': 'autostart' },
    { 'name': 'product_registry', 'type': 'autostart' },
    { 'name': 'protocol', 'type': 'autostart' },
    { 'name': 'sdk', 'type': 'autostart' },
    { 'name': 'browser_sdk', 'type': 'autostart' },
    { 'name': 'services', 'type': 'autostart' },
    { 'name': 'text_utils', 'type': 'autostart' },
    { 'name': 'ui', 'type': 'autostart' },
    { 'name': 'workspace', 'type': 'autostart' },
    { 'name': 'timeline' },
    { 'name': 'timeline_model' },

    { 'name': 'layer_viewer' },
    { 'name': 'timeline_model' },
    { 'name': 'perf_ui' },
    { 'name': 'extensions' },
    { 'name': 'data_grid' },
    { 'name': 'product_registry' },
    { 'name': 'profiler' },
    { 'name': 'mobile_throttling' },

    { 'name': 'source_frame' },
    { 'name': 'text_editor' },
    { 'name': 'cm' },
    { 'name': 'formatter' },
    { 'name': 'object_ui' },
    { 'name': 'workspace_diff' },
    { 'name': 'diff' },
    { 'name': 'persistence' },
    { 'name': 'heap_snapshot_model' }
  ];

}
