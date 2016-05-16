
const express = require('express');
const fs = require('fs');
const app = express();

const COMMENTS_FILE = './comments.json';

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
})

app.get('/api/comments', (req, res) => {
	fs.readFile(COMMENTS_FILE, (err, data) => {
		if(err){
			console.log(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	})
})

app.listen(3000, () => {
	console.log('server started at 3000...')
})
