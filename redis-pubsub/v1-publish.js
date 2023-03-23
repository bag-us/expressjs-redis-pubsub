const express = require('express');
const axios = require('axios');
const redis = require('redis')
const app = express();
const port = 9000;


const publisher = redis.createClient({ url: 'redis://server:rahasia@localhost:6379' });
(async () => {
  publisher.on("error", (error) => console.error(`Ups : ${error}`));
  await publisher.connect();
})();

const getData = async function (req, res){
  try {
    const posts = req.params.id

    const response = await axios({
      method: 'get',
      url : `https://jsonplaceholder.typicode.com/posts/${posts}`,
    });
    console.log('Data dari Public API')

    await publisher.publish('posts', JSON.stringify(response.data));

    res.status(200).json({
      message: "Data Published Success",
      data: response.data
    })
    
  } catch (error) {
    res.status(404).json({
      message: error.message
  })
  }
}

app.get('/:id', getData);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});