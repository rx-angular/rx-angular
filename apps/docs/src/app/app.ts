import { Viewer } from './timeline-viewer/timeline_viewer';
import { configApp } from './timeline-viewer/config';

declare const Runtime;

const w = window as unknown as {chrome: any}

export function init() {
  console.log('APP init');
  document.addEventListener('DOMContentLoaded', () => {
    // only works in Chrome because browser devtools
    if (!w.chrome) {
      document.getElementById('status').textContent = 'Sorry y\'all, Chrome required to view traces.';
      return;
    }
    const viewer = new Viewer();

    // We are monkeypatching window.loadResourcePromise, which is from devtools' Runtime.js
    viewer.devTools.monkeypatchLoadResourcePromise();
    console.log(Runtime);
    Runtime.startApplication('timelineviewer_app');

  });

  configApp();
}
