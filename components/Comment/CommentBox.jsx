import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

class CommentBox extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.state.data = [];

		// if not bind, this will refers to 'window' while not CommentBox
		this.getComments = this.getComments.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

	}

	getComments() {
		fetch(this.props.url).then((res) => {
			return res.json();
		}).then((data) => {
			this.setState({data: data});
		})
	}

	handleCommentSubmit(comment) {
		fetch(this.props.url, {
			method: 'POST',
			// if not set content-type, backend can't resolve data from request body
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
  			},
			body: JSON.stringify(comment)
		}).then((res) => {
			return res.json();
		}).then((data) => {
			let comments = this.state.data;
			let newComments = comments.concat([data]);
			this.setState({data: newComments});
		})
	}

	componentDidMount() {
		this.getComments();
		setInterval(this.getComments, 2000);
	}

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm handleCommentSubmit={this.handleCommentSubmit} />
			</div>
		)
	}
}

ReactDOM.render(<CommentBox url="http://localhost:3000/api/comments" />, document.getElementById('comment'));
