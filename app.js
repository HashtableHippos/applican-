const express = require('express');

const app = express();



//INIT
app.set('port', process.env.PORT || 2245);

app.listen(app.get('port'), (err) => {
  if(err){
    return console.log('Error starting server', err);
  }
  return console.log('Applican-: Listening on port:', app.get('port'));
})

module.exports = app;
