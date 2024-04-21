---
sidebar_label: Introduction
sidebar_position: 2
title: Introduction
---

## Welcome 🙌

This library helps manage caching of server side pages rendered with Angular Universal.

It provides an easy way to cache pages on the server side and to invalidate the cache when needed.

## Why?

**Angular Universal** package doesn't currently provide any API to pass route data or information directly to the server-side rendering pipeline.

With **@rx-angular/isr** we provide this functionality by doing some **tricks under the hood** ⚡️.

## How?

The moment we register the providers using the **IsrModule.forRoot()** or the **provideISR()**
function, the IsrService will start to listen to route changes on the server-side.

The moment the route is set and won't change anymore, we grab the route data and attach them in the HTML as JSON.

Then, the moment the server-side rendering is about to finish, we read the rendered html and grab the route data from it using regex. We parse the JSON, and now we know if we need to cache the page or not.

If we need to cache the page, we save it in the cache and serve it to the user. If we
don’t need to cache the page, we just serve it to the user.

## What’s next?

Learn more about ISR and how to use it in Angular.
