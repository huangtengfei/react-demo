
# React Demo

这是一个基于 [React + Webpack + ES6 组合开发的种子项目][1] 做的一个 React Demo，也是我学习 React 的过程 。

## 安装 & 运行：

```
git clone https://github.com/huangtengfei/react-demo.git
cd react-demo
npm install
npm run dev
```

打开 http://localhost:8080 即可看到效果。

## 实现过程

这个例子是参考 [React 官方示例][2] 实现的一个简单的评论框组件。

运行的时候除开头的通用操作以外，需要：

```
cd server
npm install
node server
```

实现的过程分成以下几步：

- 搭了组件的架子，使用了 props，引入了 markdown 
- 从服务器获取数据，使用了 state
- 提交数据到服务器
- 修改评论框样式

另外，由于使用了 [Fetch API][3]进行数据请求，所以需要浏览器为 Chrome42+ 、Firefox39+ 或 Opera 29+ 。当然，你也可以使用 [Fetch ployfill][4] 或用 AJAX 。

## React 基础

### JSX

JSX 语法是一种可以把 HTML 嵌套在 JavaScript 中的方法，像下面这样：

```javascript
...
render() {
    <div>
        {!isFetching &&
            <a href="#" onClick={this.handleClick}>Refresh</a>
        }
    </div>
}
...
```

在遇到 `{` 开头的代码块时，会以 JavaScript 规则解析，在遇到 `<` 开头的 HTML 标签时，以 HTML 语法解析。

#### 注释

使用 JavaScript 注释风格，但在一个组件的子元素位置使用注释要用 `{}` 包起来。例如：

```javascript
return (
    <Nav>
        {/* 注释 */}
        <Person></Person>
    </Nav>
)
```

#### HTML 转义

为防止 XSS 攻击，React 会将所有显示的 DOM 字符串转义，对 HTML 实体会进行二次转义，因此比如 `&copy;` (&copy;) 这样的字符不会正确显示。有以下几种解决办法：

- 直接使用 UTF-8 字符 ©
- 使用实体的 [Unicode 编号][5]
- 在数组里混合使用 `<div>{['cc ', <span>&copy;</span>, ' 2015']}</div>`
- 使用原始 HTML `<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} />`

### 组件

一个 React 应用就是构建在 React 组件之上的。使用 ES6 创建一个组件的方式是：

```javascript
import React, { Component } from 'react'

export default class Hello extends Component {
    render(){
        return(
            <div>
                ...
            </div>
        )
    }
}
```

注意几点：

- 组件类的第一个字母要大写，以区分本地 html 标签
- 组件类只能包含一个顶层标签
- 组件类必须有自己的 `render()` 方法，用来输出一棵 React 组件树，最终渲染成 HTML
- 添加组件属性时，class 要写成 `className`，for 要写成 `htmlFor`，避免跟 JavaScript 关键字冲突

### state 和 props

state 和 props 是组件的两个核心概念。

props 是组件的属性，通过 `this.props` 获取，一旦设置不要更改。它是一种父组件向子组件传递数据的方式，用来构建静态版本（展示内容）。

state 是组件的状态，通过 `this.state` 获取，通过 `this.setState` 更改，一旦更改组件会自动调用 `render` 重新渲染 UI。用于实现交互功能。

### 组合组件

React 中接口定义良好的组件可以组合成更复杂的组件，引用一个组件和引用一个普通 DOM 元素一样简单。

```javascript
...
render() {
    <div>
        <CommentList data={this.state.data} />
        <CommentForm handleCommentSubmit={this.handleCommentSubmit} />
    </div>
}
...
```

#### this.props.children

在组合组件时，子组件的数据可以通过 `this.props` 通过父组件获得，`this.props` 和子组件的属性是一一对应的。但有一个特例 `this.props.children`，它获取的是父组件的子元素。`this.props.children` 对子组件是不透明的。

#### 动态子组件

每次调用 `render()` 方法后，在 React 更新 DOM 时，子组件会根据被渲染的顺序做校正。为了确保动态产生的子组件被正确渲染并保证 diff 效率，需要给每个子组件设定一个唯一的 `key`。

务必把 `key` 添加到添加到子级数组里组件本身上，而不是每个子级内部最外层 HTML 上：

```javascript
return (
    <ul>
        {this.props.data.map((comment) => {
            return <Comment key={comment.id} data={comment}/>
        })}
    </ul>
);
```

### 组件的生命周期

组件的生命周期有三个状态，分别为挂载（Mount）、更新（Update）和卸载（Unmount），每个状态对应两种处理函数，分别为进入状态前（Will）和进入状态后（Did）。三种状态共五种函数：

- componentWillMount()
- componentDidMount()
- componentWillUpdate()
- componentDidUpdate()
- componentWillUnmount()

AJAX 请求通常写在 `componentDidMount()` 方法里：

```javascript
componentDidMount(){
    fetch(url).then(function(res){
        ...
    })
}    
```

另外，在更新状态时，还有两个特殊的状态处理函数。

#### componentWillReceiveProps

在组件接收到新的 props 时调用，初始化时不调用。老的 props 可以通过 `this.props` 获取，新的 props 通过参数传入，比如：

```javascript
componentWillReceiveProps(nextProps) {
    if(nextProps.xxx != this.props.xxx){	
        ...
    }
}
```

如果要在 state 改变时做一些操作，需要使用 `componentWillUpdate()`

#### shouldComponentUpdate

在组件接收到新的 props 或 state，`render()` 之前调用，初始化时不调用。

默认情况下，`shouldComponentUpdate()` 总是返回 true，但如果可以确定新的 props 和 state 不会导致组件更新，可以覆盖 `shouldComponentUpdate()`，让其返回 false，以提高性能。

### PropTypes

组件类的 PropTypes 属性，可以用来验证组件实例的属性是否符合要求，如果不符合，控制台会抛出警告。

```javascript
export default class Hello extends Component {
    render(){
        return(
            <div>
                hello, {this.props.username}
            </div>
        )
    }
}
Hello.PropTypes = {
    username: PropTypes.string.isRequired
}
```

更多的 PropTypes 类型可参加 [官方文档][6]

### DOM 操作

React 组件不是真实的 DOM 节点，而是存在于内存之中的一种数据结构（虚拟 DOM）。大多数情况下不需要直接操作 DOM，而只需要设置组件的状态。

如果需要从组件中获取真实的 DOM 节点（比如从文本框获取用户的输入，依赖真实的 DOM），可以使用 `ref` 属性：

```javascript
return(
    <div>
        <input type="text" placeholder="input name" ref="author" />
    </div>
)
```

再通过 `this.refs.[refName]` 就可以获取到相应的真实 DOM 了。

对于组件，可以在组件加载完成后（componetDidMount），通过 `findDOMNode()` 拿到对应的 DOM 元素。

```javascript
componentDidMound() {
    let el = findDOMNode(this);
}
```

## 补充

### super() 和 super(props) 的区别

如果需要在 constructor 中使用 `this.props`，那么需要传递参数 `props` 给 `super()`。其他情况下没这个必要，因为 React 在调用 constructor 后，会立即在组件的实例上设置 `.props`。

参考 [Should we include the `props` parameter to class constructors when declaring components (using ES6 classes)?][7]

### bind(this) 的使用

在使用 `React.createClass` 的时候，会自动将组件中的方法绑定到组件实例。但是，在使用 ES6 的 `class` 时，我们必须自己手动绑定，不然 `this` 一不小心就指向别的地方了。React 官方推荐在 constructor 中进行绑定。

参考 [Refactoring React Components to ES6 Classes][8] Step3

### props VS state 

#### 什么时候用 state

`state` 应该包含那些可能被事件处理器改变并触发用户界面更新的数据（比如用户输入，服务器请求）。应尽可能地使组件无状态化，让这些组件从 `props` 取数据并渲染出来。

常用的模式是，创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传递给子级。这个有状态的组件封装了所有的用户交互逻辑，而那些无状态组件则负责声明地渲染数据。

参考 [Interactivity and Dynamic UIs][9]

#### 哪个组件应该拥有 state

对于每个 state 数据：

- 找出基于它渲染界面的组件
- 找出共同的祖先组件
- 如果找不出拥有这个 state 的合适组件，创建一个新组件拥有这个 state，层级位于共同祖先的上面

参考 [Thinking in React][10]


  [1]: https://github.com/huangtengfei/blog/issues/17
  [2]: https://facebook.github.io/react/docs/tutorial.html
  [3]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
  [4]: https://github.com/github/fetch
  [5]: http://www.fileformat.info/info/unicode/char/00a9/index.htm
  [6]: http://reactjs.cn/react/docs/reusable-components.html
  [7]: https://discuss.reactjs.org/t/should-we-include-the-props-parameter-to-class-constructors-when-declaring-components-using-es6-classes/2781
  [8]: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  [9]: https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state
  [10]: http://reactjs.cn/react/blog/2013/11/05/thinking-in-react.html