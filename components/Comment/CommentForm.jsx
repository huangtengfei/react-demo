import React from 'react';

class CommentForm extends React.Component {

	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let author = this.refs.author.value.trim();
		let text = this.refs.text.value.trim();
		if(!author || !text) {
			return;
		}	
		this.props.handleCommentSubmit({
			author: author,
			text: text
		});
		this.refs.author.value = '';
		this.refs.text.value = '';
	}

	render() {
		return (
			<form className="comment-form" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="your name" ref="author" />
				<input type="text" placeholder="say something" ref="text" />
				<input type="submit" value="post" />
			</form>
		)
	}

}

module.exports = CommentForm;