const express = require('express');
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
    const response = {
      from: "gugugaga@yahoo.com",
      subject: "Percobaan PubSub Redis",
      message: "Semoga berhasil terkirim"
    }
    console.log('Data dari API (ceritanya)')

    await publisher.publish('posts', JSON.stringify(response));

    res.status(200).json({
      message: "Data Published Success",
      data: response
    })
    
  } catch (error) {
    res.status(404).json({
      message: error.message
  })
  }
}

app.get('/', getData);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});