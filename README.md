# RxAngular ![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime
performance and template rendering.

RxAngular is divided into different packages:

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/README.md)
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/README.md)
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/main/libs/template/README.md)

Used together, you get a powerful tool for developing high-performance angular applications with or without NgZone.

This repository holds a set of helpers to create **fully reactive** as well as **fully zone-less** applications.

[![rx-angular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/docs/images/rx-angular_logo.png)](https://www.rx-angular.io/)
## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)

## Packages

Find details in the linked readme files below for installation and setup instructions, examples and resources.

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/README.md) - Component Development Kit
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/README.md) - Imperative&Reactive Component State-Management
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/main/libs/template/README.md) - High-Performance Reactive Rendering

## Version Compatibility

### Angular
|   Angular      |   RxJS                                                     | @rx-angular/state   | @rx-angular/template | @rx-angular/cdk     | 
|---------------|-------------------------------------------|----------------------|----------------------|----------------------|
|  > 13.1.x       | 6.5.x/6.6.x/7.4.x or later minor version  | > 1.4.6                    | > 1.0.0-beta.29       | > 1.0.0-alpha.10     |
| < 12.1.4        | 6.5.x/6.6.x                                              | <= 1.4.6                  | <= 1.0.0-beta.29    | <= 1.0.0-alpha.10  |

### RxJs

Regarding the compatibility to RxJs, we generally stick to the compatibilities of the angular framework itself.
All of the current packages support RxJs versions `>= 6.5.x`.
For more information about the compatibilities of angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3)
