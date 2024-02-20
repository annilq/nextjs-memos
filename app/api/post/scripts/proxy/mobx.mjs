const relationMap = {}
// track current component which refer
let currentlyRenderingComponent

const handler = {
  // getter用来收集依赖
  get: (target, key) => {
    if (typeof currentlyRenderingComponent === "undefined") {
      return target[key]
    }

    if (!relationMap[key]) {
      relationMap[key] = [currentlyRenderingComponent]
    }

    const hasComponent = relationMap[key].find(com => com.ID === currentlyRenderingComponent.ID);
    if (!hasComponent) {
      relationMap[key].push(currentlyRenderingComponent)
    }
    return target[key]
  },
  set: (target, key, value) => {
    // 用来更新依赖
    target[key] = value
    relationMap[key]?.forEach(com => com.forceUpdate())
    return true
  },
}

export function store(object) {
  return new Proxy(object, handler);
}

export function observer(MyComponent) {
  // observer用来联结getter 与 setter
  // 比如 react 中的依赖主要是render中
  // 先执行继承组件的render收集依赖
  // 再在setter的时候遍历依赖的map循环执行更新
  return class Observer extends MyComponent {
    ID = `${Math.floor(Math.random() * 10e9)}`
    render() {
      currentlyRenderingComponent = this;
      // collect refer 收集引用
      const renderValue = super.render()
      currentlyRenderingComponent = undefined
      return renderValue
    }
  }
}

const storeIns = store({ a: 10 })

class TextComponent {
  forceUpdate() {
    this.render()
  }
  render() {
    console.log(`render ${storeIns.a}`);
  }
}

const com = observer(TextComponent)
const cominstance = new com()
cominstance.render()
storeIns.a = 20
storeIns.a = 10
storeIns.a = 30