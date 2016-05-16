import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

class CommentBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.data = [];
	}

	getComments() {
		fetch(this.props.url).then((res) => {
			return res.json()
		}).then((data) => {
			this.setState({data: data});
		})
	}

	componentDidMount() {
		this.getComments();
		// if not bind, this will refers to 'window' while not CommentBox
		setInterval(this.getComments.bind(this), 2000);
	}

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm />
			</div>
		)
	}
}

ReactDOM.render(<CommentBox url="http://localhost:3000/api/comments" />, document.getElementById('comment'));
