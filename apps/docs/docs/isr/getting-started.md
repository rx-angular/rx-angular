---
sidebar_label: Getting Started
sidebar_position: 3
title: Getting Started
---

## Installation

### Preconditions

To get started, first you need an application to have Angular Universal installed and configured.

**ngx-isr** is available as an npm package. To install it, run the following command:

```shell
npm install ngx-isr
```

or if you use yarn or pnpm:

```shell
yarn add ngx-isr
```

```shell
pnpm add ngx-isr
```

## Configure providers

To use it in your application, you need to register the providers in your **app.server.module.ts** file.

1. Import the **provideISR()** function from the **ngx-isr** package.
2. Register the provider in the **providers** array of your **NgModule**.

@TODO appServerModuleCode

If you are in a standalone application, you can also register the provider in the **serverConfig**.

@TODO serverConfigCode

## Configure server handling

Now you need to configure the ISR handler in your **server.ts** file.

1. Import the **ISRHandler ** class from the **ngx-isr** package.
2. Create a new instance of the **ISRHandler** class.
3. Use the ISRHandler instance to handle the requests.
4. Comment out default angular universal handler, because it's will be handled in ISR render method.

@TODO serverTsCode

> Congratulations!
> You have successfully configured the **ngx-isr** package.

## Configure routes

Now that we have configured the **ngx-isr** package, we need to configure the routes that
we want to be cached using ISR.

To do this, we need to add the **revalidate** key in the route **data** object.

@TODO routes code

The **revalidate** key is the number of seconds after which the page will be revalidated.

If you don't want a specific route to be handled by the ISR handler, you just shouldn't add
the
**revalidate** key in the route **data** object.
