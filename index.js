const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use((req,res,next)=>{
  console.log('request recieved:', req.method, req.url);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.on('error', (err)=>{
  console.err('MongoDB connection error:',err);
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
