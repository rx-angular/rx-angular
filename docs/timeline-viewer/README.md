# COPIED FORM https://github.com/ChromeDevTools/timeline-viewer

# DevTools Timeline Viewer

<img src="https://user-images.githubusercontent.com/39191/74859446-e6c28c80-52fb-11ea-9ae5-9ed7e8bae4af.png" align=right width=250>

##### Shareable URLs for your Chrome DevTools performance traces.


Works with GitHub gists, public GitHub URLs, some dropbox public URLs, public files on Google Drive, and (after authentication) private files on Google Drive.

You can also drag and drop a `Profile-*.json` file onto the webapp.

The app works offline as it has a service worker, as well. :)



<hr clear=both>



### Google Drive integration

Once authorized, you'll see Timeline Viewer as a registered Google Drive viewer when opening .json files. Once you select the Timeline Viewer, it will open in a new tab and load the timeline asset from your Drive.

<center><img src="https://cloud.githubusercontent.com/assets/39191/18080010/67390d9a-6e48-11e6-98a3-9c8c81b1df67.png" width=600></center>


You can share this URL with any users who have both:

1. authorized [Timeline Viewer](https://chromedevtools.github.io/timeline-viewer/) to Drive via the typical Google OAuth flow and..
1. have `Edit` permission to the Google Drive file

<center><img src="https://cloud.githubusercontent.com/assets/39191/18080845/fb39f056-6e4b-11e6-90df-6cda94bd2495.png" width=600></center>

To revoke authorization, visit your <a href="https://security.google.com/settings/security/permissions?pli=1">Google security permissions</a>.

---------------------

## Dev

Run:
 - `yarn` or `npm i`
 - `yarn run dev` or `npm run dev` - it will open site in browser and run server for you.

Master branch's `docs` folder is what's published to gh-pages, to simplify deployment.

Auth keys have localhost:8833 whitelisted, so you can hack there.

* Private file: http://localhost:8833/?loadTimelineFromURL=drive://0BzvYe7bYFf--aVhZM1RNR2N3cGc

## Updating DevTools Version

* Remote debug Chrome on Android (Dev channel or Canary).
* (Verify it works as expected)
* Open devtools on devtools
* Look at `location.href` and grab the hash out of it
  * `copy(new URL(location.href).pathname.match(/@(\w+)/)[1])`
* Pop that into the hash in `docs/index.html`

### DevTools / Chrome version compatibility

- chrome 79/80/+ (a9b97dff480d5c50843b5190c4d02373a0fc6d84) breaks in our setup. appears to be a decent amount of work to fix.
- chrome 78 (675968a8c657a3bd9c1c2c20c5d2935577bbc5e6 was base commit) is fine
- chrome 70 (81bf34f6bd3784247d7787d879821061c1b7484b) was fine until the removal of custom elements shipped and broke clientside in chrome 80

I sometimes use the archive of https://chromereleases.googleblog.com/ to find a target chrome version.

## Testing

[Cypress](https://cypress.io) is used for integration testing.
To run test just invoke `yarn test`

--------

### Known alternatives

- https://www.speedscope.app/ is quite good
