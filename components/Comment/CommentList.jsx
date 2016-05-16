import React from 'react';
import Comment from './Comment.jsx'

class CommentList extends React.Component {

	render() {
		let commentNodes = this.props.data.map((comment, i) => {
			return (
				<Comment author={comment.author} key={i}>
					{comment.text}
				</Comment>
			)
		})
		return (
			<div className="comment-list">
				{commentNodes}
			</div>
		)
	}

}

module.exports = CommentList;
