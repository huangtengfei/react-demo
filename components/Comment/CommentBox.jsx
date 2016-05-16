import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

const data = [{
	author: "fusheng",
	text: "### hahaha"
},{
	author: "htf",
	text: "### lalala"
}];

class CommentBox extends React.Component {

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList data={this.props.data} />
				<CommentForm />
			</div>
		)
	}
}

ReactDOM.render(<CommentBox data={data} />, document.getElementById('comment'));
