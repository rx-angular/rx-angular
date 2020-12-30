window.test = test;

function test(num= 1, opts = {}) {
  for(let i = 0; i < num; i++) {
    document.body.appendChild(getChild(opts));
  }
}

function getChild(opts = {}) {
  const div = document.createElement('DIV');
  div.innerHTML = opts?.class || '&nbsp;';
  opts?.class && div.classList.add(opts.class);
  return div;
}
