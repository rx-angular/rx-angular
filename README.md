[![rx-angular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/docs/images/rx-angular_logo.png)](https://www.rx-angular.io/)

# RxAngular ![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

RxAngular offers a comprehensive toolset for handling **fully reactive** Angular applications with the main focus on runtime
performance and template rendering. Used together, you get a powerful tool for developing high-performance angular applications with or **without NgZone**.

Find details in the linked readme files below for installation and setup instructions, examples and resources:

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/README.md)
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/README.md)
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/main/libs/template/README.md)

## Benefits

- 🔥 It's fast & performance focused: exceptional runtime speed & small bundle size
- ✔ Easy upgrade paths: migration scripts included since beta! `ng update @rx-angular/{cdk | template | state}`
- ✔ Lean and simple: No boilerplate guaranteed
- ✔ Well typed and tested
- ✔ Backwards compatible: support for Angular > v11

> **❗ Warning**
> Expect no migration scripts for any change in `experimental` folders

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/state | @rx-angular/template | @rx-angular/cdk     |
| ---------------------- | -------------------- | ----------------- | -------------------- | ------------------- |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.4.6`         | `> 1.0.0-beta.29`    | `> 1.0.0-alpha.10`  |
| `^11.0.0`              | `^6.5.5`             | `<= 1.4.6`        | `<= 1.0.0-beta.29`   | `<= 1.0.0-alpha.10` |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself.
All the packages support RxJS versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of Angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3).

## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)

## Used by

<table style="width:100%">
  <tr>
    <td><img style="display: block; max-width: 80%" src="https://clickup.com/landing/images/logo-clickup_color.svg"></td>
    <td><img style="display: block; max-width: 80%"  src="https://pbs.twimg.com/profile_images/1486001434021744643/scrOX1TU_400x400.jpg"></td>
    <td><img style="display: block; max-width: 80%"  src="https://avatars.githubusercontent.com/u/1733746?s=200&v=4"></td>
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
