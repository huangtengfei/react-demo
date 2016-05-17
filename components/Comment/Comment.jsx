import React from 'react';
import marked from 'marked';

class Comment extends React.Component {

	constructor() {
		super();
		this.rawMarkup = this.rawMarkup.bind(this);
	}

	rawMarkup() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup }
	}

	render() {
		return (
			<div className="comment-wrapper">
				<a>
					<img src="https://avatars0.githubusercontent.com/u/3126745?v=3&s=96" />
				</a>
				<div className="comment">
					<div className="comment-header">
						<span className="comment-author">{this.props.author}</span>
						<span className="comment-time">{this.props.time}</span>
					</div>
					<div className="comment-content" dangerouslySetInnerHTML={this.rawMarkup()} />
				</div>				
			</div>
		) 
	}

}

module.exports = Comment;