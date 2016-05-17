
# React Demo

这是一个基于 [React + Webpack + ES6 组合开发的种子项目][1] 做的一个 React Demo 集合，也是我学习 React 的过程 。

## 安装 & 运行：

```
git clone https://github.com/huangtengfei/react-demo.git
cd react-demo
npm install
npm run dev
```

打开 http://localhost:8080 即可看到效果。

## Demo1

这个例子是参考 [React 官方示例][2] 实现的一个简单的评论框组件

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

另外，由于使用了 [Fetch API][3]进行数据请求，所以需要浏览器为 Chrome42+ 、Firefox39+ 或 Opera 29+ 。当然，你也可以使用 [Fetch ployfill][4] 或用 AJAX

## 几点注意

### super() 和 super(props) 的区别

如果需要在 constructor 中使用 `this.props`，那么需要传递参数 `props` 给 `super()`。其他情况下没这个必要，因为 React 在调用 constructor 后，会立即在组件的实例上设置 `.props`。

参考 [Should we include the `props` parameter to class constructors when declaring components (using ES6 classes)?][5]

### bind(this) 的使用

在使用 `React.createClass` 的时候，会自动将组件中的方法绑定到组件实例。但是，在使用 ES6 的 `class` 时，我们必须自己手动绑定，不然 `this` 一不小心就指向别的地方了。React 官方推荐在 constructor 中进行绑定。

参考 [Refactoring React Components to ES6 Classes][6] Step3


  [1]: https://github.com/huangtengfei/blog/issues/17
  [2]: https://facebook.github.io/react/docs/tutorial.html
  [3]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
  [4]: https://github.com/github/fetch
  [5]: https://discuss.reactjs.org/t/should-we-include-the-props-parameter-to-class-constructors-when-declaring-components-using-es6-classes/2781
  [6]: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes