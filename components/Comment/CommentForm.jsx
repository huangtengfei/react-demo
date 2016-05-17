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
				<a>
					<img src="https://avatars0.githubusercontent.com/u/3126745?v=3&s=96" />
				</a>				
				<div className="comment-text">
					<textarea rows="5" placeholder="say something" ref="text"></textarea>
				</div>				
				<div className="comment-footer">
					<input type="text" placeholder="your name" ref="author" />
					<input type="submit" value="post" />
				</div>
			</form>
		)
	}

}

module.exports = CommentForm;
