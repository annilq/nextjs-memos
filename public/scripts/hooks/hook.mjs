
const React = (function () {
  // 每个组件中有多个hook，所以不能用单个变量维护hook的值，应该使用map或者数组来维护hook
  // 数组解构方便命名，并且可以根据索引存取值(所以hook不能用在循环和条件语句中使用)
  let hooks=[], currenthook = 0;
  return {
    useState(val) {
      hooks[currenthook] = hooks[currenthook] || val;
      const currenthooktemp = currenthook
      const setValue = (newValue) => {
        hooks[currenthooktemp] = newValue
      }
      return [hooks[currenthook++], setValue]
    },
    useEffect(callback, deps) {
      const hasNodeps = !deps;
      const _deps = hooks[currenthook]
      const hasChangedDeps = _deps ? !deps.every((item, i) => item === _deps[i]) : true

      if (hasNodeps || hasChangedDeps) {
        callback()
        hooks[currenthook] = deps
      }
      currenthook++
    },
    render(Component) {
      const Com = Component()
      Com.render()
      currenthook = 0
      return Com
    }
  }
})()

function Counter() {
  const [count, setCount] = React.useState(0)
  const [count1, setCount1] = React.useState(1)
  React.useEffect(
    () => {
      console.log(`reactive count ${count},${count1}`);
    }, [count, count1])
  return {
    onClick: () => { setCount(count + 1); setCount1(count1 + 1) },
    render: () => {
      console.log("render:", { count });
    }
  }
}

const counter = React.render(Counter)
counter.onClick()
React.render(Counter)
