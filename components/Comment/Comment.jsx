import React from 'react';
import marked from 'marked';

class Comment extends React.Component {

	rawMarkup() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup }
	}

	render() {
		return (
			<div className="comment-body">
				<h2 className="author">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		) 
	}

}

module.exports = Comment;