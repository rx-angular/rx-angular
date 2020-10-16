import { SyncView } from './sync_view';
import { Utils } from './utils';
import { DevTools } from './dev_tools';

const wait = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));
declare const UI;
declare const Timeline;
// eslint-disable-next-line no-unused-vars
export class Viewer {
  _orig_loadResourcePromise;

  params = new URL(location.href).searchParams;

  timelineURL = this.params.get('loadTimelineFromURL');
  timelineId = null;
  timelineProvider = 'url';

  totalSize = 50 * 1000 * 1000;
  loadingStarted = false;
  refreshPage = false;
  welcomeView = false;
  // remote location of devtools we're using
  devtoolsBase = (document.getElementById('devtoolsscript') as HTMLScriptElement).src.replace(/inspector\.js.*/, '');

  statusElem = document.getElementById('status');
  infoMessageElem = document.getElementById('info-message');
  networkOnlineStatusElem = document.getElementById('online-status');
  networkOfflineStatusElem = document.getElementById('offline-status');
  splitViewContainer;
  isSplitView;
  netReqMuted;
  syncView = new SyncView();
  utils = new Utils();
  devTools = new DevTools({ viewerInstance: this });

  constructor() {

    this.attachEventListeners();

    this.parseURLforTimelineId(this.timelineURL);

    if (!this.timelineURL || this.startSplitViewIfNeeded(this.timelineURL)) {
      this.splitViewContainer = document.getElementById('split-view-container');
      this.isSplitView = this.splitViewContainer ? true : false;
      this.welcomeView = true;
      this.handleDragEvents();
    }

    this.handleNetworkStatus();
    this.devTools.init();

    if (!this.welcomeView) {
      this.makeDevToolsVisible(true);
    }
  }

  attachEventListeners() {
    this.attachSubmitUrlListener();
    this.attachPrefillUrlListener();
  }


  handleDragEvents() {
    const dropboxEl = document.getElementById('dropbox');
    if (dropboxEl) {
      dropboxEl.addEventListener('dragover', this.dragover.bind(this), false);
    }
  }


  attachSubmitUrlListener() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (evt: any) => {
      evt.preventDefault();
      const formdata = new FormData(evt.target);
      const url = formdata.get('url');
      if (!url) return;
      const parsedURL = new URL(location.href);
      parsedURL.searchParams.delete('loadTimelineFromURL');
      // this is weird because we don't want url encoding of the URL
      parsedURL.searchParams.append('loadTimelineFromURL', 'REPLACEME');
      location.href = parsedURL.toString().replace('REPLACEME', url as any);
    });
  }

  attachPrefillUrlListener() {
    const input: HTMLInputElement = document.querySelector('#enterurl');
    const submit: HTMLElement = document.querySelector('input[type=submit]');

    [...document.querySelectorAll('a[data-url]') as any].forEach(elem => {
      elem.addEventListener('click', async evt => {
        evt.preventDefault();
        evt.cancelBubble = true;
        const url = evt.target.dataset.url;
        await wait(250);
        input.value = url;
        await wait(600);
        submit.focus();
        await wait(600);
        submit.click();
      });
    });
  }

  showInfoMessage(text) {
    this.infoMessageElem.textContent = text;
    this.infoMessageElem.hidden = false;

    setTimeout(() => {
      this.hideInfoMessage();
    }, 3000);
  }

  hideInfoMessage() {
    this.infoMessageElem.textContent = '';
    this.infoMessageElem.hidden = true;
  }

  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    this.makeDevToolsVisible(true);
  }

  handleNetworkStatus() {
    if (navigator.onLine) {
      this.toggleNetworkStatusMessage();
    } else {
      this.toggleNetworkStatusMessage({ status: 'offline' });
    }

    window.addEventListener('online', _ => {
      this.toggleNetworkStatusMessage();
    }, false);

    window.addEventListener('offline', _ => {
      this.toggleNetworkStatusMessage({ status: 'offline' });
    }, false);
  }

  toggleNetworkStatusMessage(options = { status: 'online' }) {
    if (options.status === 'online') {
      this.networkOnlineStatusElem.hidden = false;
      this.networkOfflineStatusElem.hidden = true;
    } else {
      this.networkOnlineStatusElem.hidden = true;
      this.networkOfflineStatusElem.hidden = false;
    }
  }

  parseURLforTimelineId(url) {
    try {
      const parsedURL = new URL(url);
      if (parsedURL.protocol === 'drive:') {
        this.timelineProvider = 'drive';
        this.timelineId = parsedURL.pathname.replace(/^\/+/, '');
      }
      if (parsedURL.hostname === 'drive.google.com') {
        this.timelineProvider = 'drive';
        this.timelineId = parsedURL.pathname.match(/\b[0-9a-zA-Z]{5,40}\b/)[0];
      }
    } catch (e) {
      // legacy URLs, without a drive:// prefix.
      this.timelineId = url;
      this.timelineProvider = 'drive';
    }
  }

  startSplitViewIfNeeded(urls) {
    urls = urls.split(',');

    if (urls.length > 1) {
      const frameset = document.createElement('frameset');
      frameset.setAttribute('id', 'split-view-container');
      frameset.setAttribute('rows', new Array(urls.length).fill(`${100 / 2}%`).join(','));

      urls.forEach((url, index) => {
        const frame = document.createElement('frame');
        frame.setAttribute('id', `split-view-${index}`);
        frame.setAttribute('src', `./?loadTimelineFromURL=${url.trim()}`);
        frameset.appendChild(frame);
      });
      document.body.appendChild(frameset);
      document.documentElement.classList.add('fullbleed');
      document.querySelector('.welcome').remove();
      document.querySelector('.top-message-container').remove();
      return true;
    }
    return false;
  }

  makeDevToolsVisible(bool) {
    this.welcomeView = !bool;
    document.documentElement.classList[bool ? 'remove' : 'add']('hide-devtools');
  }

  updateStatus(str) {
    this.statusElem.textContent = str;
  }

  loadResource(requestedURL) {
    return this.loadResourcePromise(requestedURL)
      .then(resp => {
        this.devTools.monkeyPatchingHandleDrop();
        return resp;
      });
  }

  // monkeypatched method for devtools

  loadResourcePromise(requestedURL) {
    const url = new URL(requestedURL, location.href);
    const URLofViewer = new URL(location.href);

    // hosted devtools gets confused
    // if DevTools is requesting a file thats on our origin, we'll redirect it to devtoolsBase
    if (url && url.origin === URLofViewer.origin && (requestedURL !== this.timelineURL)) {
      const relativeurl = url.pathname.replace(URLofViewer.pathname, '').replace(/^\//, '');
      const redirectedURL = new URL(relativeurl, this.devtoolsBase);
      return this._orig_loadResourcePromise(redirectedURL.toString());
    }

    // pass through URLs that aren't our timelineURL param
    if (requestedURL !== this.timelineURL) {
      return this._orig_loadResourcePromise(url);
    }

    // adjustments for CORS
    url.hostname = url.hostname.replace('github.com', 'githubusercontent.com');

    return this.fetchTimelineAsset(url.href).then(payload => payload);
  }

  fetchTimelineAsset(url, addRequestHeaders = Function.prototype, method = 'GET', body?) {
    this.netReqMuted = false;
    this.loadingStarted = false;
    return this.utils.fetch(url, {
      url, addRequestHeaders: addRequestHeaders.bind(this), method, body,
      onprogress: this.updateProgress.bind(this)
    }, true)
      .then((xhr: any) => {
        if (this.isSplitView) {
          return this.syncView.splitViewTimelineLoaded()
            .then(_ => SyncView.synchronizeRange(SyncView.panels()[0], this.syncView))
            .then(_ => xhr.responseText);
        } else {
          return xhr.responseText;
        }
      })
      .catch(({ error, xhr }) => {
        this.makeDevToolsVisible(false);
        // tslint:disable-next-line:triple-equals
        this.updateStatus('Download of asset failed. ' + ((xhr.readyState == xhr.DONE) ? 'CORS headers likely not applied.' : ''));
        console.warn('Download of asset failed', error);
      });
  }

  updateProgress(evt) {
    try {
      this.updateStatus(`Download progress: ${((evt.loaded / this.totalSize) * 100).toFixed(2)}%`);

      UI.inspectorView.showPanel('timeline').then(_ => {
        const panel = Timeline.TimelinePanel.instance();
        // start progress
        if (!this.loadingStarted) {
          this.loadingStarted = true;
          // tslint:disable-next-line:no-unused-expression
          panel && panel.loadingStarted();
        }

        // update progress
        // tslint:disable-next-line:no-unused-expression
        panel && panel.loadingProgress(evt.loaded / (evt.total || this.totalSize));

        // flip off filmstrip or network if theres no data in the trace
        if (!this.netReqMuted) {
          this.netReqMuted = true;
          this.devTools.monkepatchSetMarkers();
        }
      });
    } catch (e) {
    }
  }

  changeUrl(id) {
    const url = `?loadTimelineFromURL=drive://${id}`;
    if (this.refreshPage) {
      window.location.href = `/${url}`;
    } else {
      const state = { 'file_id': id };
      const title = 'Timeline Viewer';
      history.replaceState(state, title, url);
    }
  }
}
