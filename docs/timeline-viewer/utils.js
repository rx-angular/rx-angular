'use strict';

// eslint-disable-next-line no-unused-vars
class Utils {
  fetch(url, params, CORSFlag = false) {
    if (CORSFlag) {
      // see #63
      return this.doCORSRequest(url, params.method, params.body, params.addRequestHeaders, params.onprogress).catch(_ => {
        // Reattempting with credentials, in case of JWT folks, etc.
        return this.doCORSRequest(url, params.method, params.body, params.addRequestHeaders, params.onprogress, true);
      });
    } else {
      return fetch(url, params);
    }
  }

  doCORSRequest(url, method='GET', body, addRequestHeaders, onprogress, withCreds) {
    return new Promise((resolve, reject) => {
      // Use an XHR rather than fetch so we can have progress events
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = !!withCreds;
      xhr.open(method, url);
      addRequestHeaders && addRequestHeaders(xhr);
      // show progress only while getting data
      if (method === 'GET') {
        xhr.onprogress = onprogress;
      }
      xhr.onload = _ => {
        resolve(xhr);
      };
      xhr.onerror = error => {
        console.error('XHR error', error);
        reject(error);
      };
      xhr.send(body);
    });
  }
}
