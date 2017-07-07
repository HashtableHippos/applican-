const express = require('express');
const path = require('path');

const app = express();
const axios = require("axios");

// INIT
app.set('port', process.env.PORT || 2245);
app.use(express.static(path.join(__dirname, '/public')));
app.listen(app.get('port'), (err) => {
  if (err) {
    return console.log('Error starting server', err);
  }
  return console.log('Applican-: Listening on port:', app.get('port'));
});


//search from glassdoor's API. 
app.post('/search', function (req, res) {
	var text = 'Java'; 
  var city = "New+York,+NY"; //must be in this format; 
	axios.get('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+text+'&city='+city
  )
  .then(function(response) {     
		res.send(response.data.resultItemList)
	})
	.catch(function(err) { 
		console.warn(err);
		res.send('NOPE')
	})
});

module.exports = app;
