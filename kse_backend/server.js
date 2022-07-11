const express = require('express');
const app = express();
app.get('/', function(req, res) {
	console.log(req);
	res.send('hello');
});
app.listen(3030, function() {
	console.log('Server started on port 3030');
});
