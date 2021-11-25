
function printLayers(num = 4) {
  document.body.innerHTML = '';
  const wrap = document.body.appendChild(getChild({
    class: ['wrap'],
    id: 'wrap',
    styles: {
      background: '#' + Math.floor(Math.random()*16777215).toString(16)
    }
  }));
  for(let i = 0; i < num; i++) {
    wrap.appendChild(getChild({
      class: ['layer'],
      id: 'layer-'+i,
      content: i,
      styles: {
        background: '#' + Math.floor(Math.random()*16777215).toString(16)
      }
    }));
    document.body.appendChild(wrap);
  }
}

function styleStress(num= 1, opts = {styles: {background: 'red'}}) {
  for(let i = 0; i < num; i++) {
    document.body.appendChild(getChild(opts));
  }
}

function promoteElem(id, opts = {}) {
  const elem = document.getElementById(id);
  console.log('elem: ', elem);
  applyStyles(elem, {
    styles: {
      zIndex: '1',
      position: 'absolute',
      willChange: 'transform'
    }
  })
}

function applyStyles(elem, opts ) {
  opts?.styles && Object.entries(opts.styles).forEach(([rule, value]) => {
    elem.style[rule] = value;
    console.log(rule, value);
  });
}

function getChild(opts = {}) {
  console.log(opts);
  const div = document.createElement('DIV');
  div.innerHTML = opts?.content !== undefined ? opts.content  : 'Some text '+Math.random();
  opts?.id && (div.id = opts.id);
  opts?.class && div.classList.add(...Array.isArray(opts.class) ? opts.class : [opts.class]);
  applyStyles(div, opts);
  return div;
}
