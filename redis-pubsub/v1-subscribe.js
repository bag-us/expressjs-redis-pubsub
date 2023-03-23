const express = require('express');
const redis = require('redis')
const app = express();
const port = 9001;

app.set('view engine', 'ejs')

const subscriber = redis.createClient({ url: 'redis://client:rahasia@localhost:6379' });
(async () => {
  subscriber.on("error", (error) => console.error(`Ups : ${error}`));
  await subscriber.connect();
  await subscriber.subscribe('posts', (message) => {
    const book = JSON.parse(message)
    // console.log(data) 
    app.locals.datas = book;
  });
})();

app.get('/',(req,res,next)=>{
  const greeting = "Hello";
  const data = app.locals.datas;
  // console.log(data) 
  res.render('index', {greeting, data})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
