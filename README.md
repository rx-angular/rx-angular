[![rx-angular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/docs/images/rx-angular_logo.png)](https://www.rx-angular.io/)

# RxAngular ![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime
performance and template rendering.

RxAngular is divided into different packages:

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/README.md)
- [📦@rx-angular/eslint-plugin](https://github.com/rx-angular/rx-angular/tree/main/libs/eslint-plugin/README.md)
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/README.md)
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/main/libs/template/README.md)

Used together, you get a powerful tool for developing high-performance angular applications with or without NgZone.

This repository holds a set of helpers to create **fully reactive** as well as **fully zone-less** applications.

## Benefits

- 🔥 It's fast & performance focused: exceptional runtime speed & small bundle size
- ✔ Easy upgrade paths: migration scripts included since beta! `ng update @rx-angular/{cdk | template | state}`
- ✔ Lean and simple: No boilerplate guaranteed
- ✔ Well typed and tested
- ✔ Backwards compatible: support for Angular > v11

> **❗ Warning**
> Expect no migration scripts for any change in `experimental` folders

## Used by

<table style="width:100%">
  <tr>
    <td><img width="140" src="https://clickup.com/landing/images/logo-clickup_color.svg"></td>
    <td><img width="140" src="https://get.tapeapp.com/wp-content/uploads/2021/08/tape_logo_24px.svg"></td>
    <td><img height="80" src="https://avatars.githubusercontent.com/u/1733746?s=200&v=4"></td>
  </tr>
   <tr>
    <th>Large scale application</th>
    <th>Medium size project</th>
    <th>Small project</th>
  </tr>
  <tr>
    <td>
      Url: https://clickup.com <br/>
      Platforms: Web
    </td>
    <td>
      Url: https://get.tapeapp.com<br/>
      Platforms: Web, Mobile (ionic)
    </td>
    <td> 
      Url: https://angular-movies-a12d3.web.app<br/>
      Platforms: Web
    </td>
  </tr>
</table>

## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)

## Packages

Find details in the linked readme files below for installation and setup instructions, examples and resources.

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/README.md) - Component Development Kit
- [📦@rx-angular/eslint-plugin](https://github.com/rx-angular/rx-angular/tree/main/libs/eslint-plugin/README.md) - ESLint Plugin
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/README.md) - Imperative & Reactive Component State-Management
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/main/libs/template/README.md) - High-Performance Non-Blocking Rendering

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/state | @rx-angular/template | @rx-angular/cdk     | 
|------------------------|----------------------|-------------------|----------------------|---------------------|
| `14`                   | `^7.4.0`             | `> 1.4.6`         | `> 1.0.0-beta.29`    | `> 1.0.0-alpha.10`  |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.4.6`         | `> 1.0.0-beta.29`    | `> 1.0.0-alpha.10`  |
| `^11.0.0`              | `^6.5.5`             | `<= 1.4.6`        | `<= 1.0.0-beta.29`   | `<= 1.0.0-alpha.10` |

Regarding the compatibility to RxJs, we generally stick to the compatibilities of the angular framework itself.
All the packages support RxJs versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3)
