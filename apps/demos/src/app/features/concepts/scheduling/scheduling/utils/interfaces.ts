export enum SchedulingName {
  animationFrame = 'animationFrame',
  Promise = 'Promise',
  idleCallback = 'idleCallback',
  userBlocking = 'userBlocking',
  userVisible = 'userVisible',
  background = 'background',
  setInterval = 'setInterval',
}


export enum SchedulingPriority {
  sync,
  animationFrame,
  Promise,
  setTimeout,
  setInterval,
  postMessage,
  idleCallback,
  userBlocking,
  userVisible,
  background
}

