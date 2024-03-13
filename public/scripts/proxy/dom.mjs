
const handler = {
  get(target, key) {
    return function (attr, ...children) {
      const el = document.createElement(key);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(property, attr[prop])
      }
      children.forEach(child=>{
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child)
      })
      return el
    }

  }
}

const dom = new Proxy({}, handler)

const el = dom.div(
  {},
  'Hello, my name is ',
  dom.a({ href: '//example.com' }, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

console.log(el);