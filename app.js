const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'client', 'build')))

app.use('/api/code', async (req, res) => {
  console.log(req.body)
  try {
    const result = await axios.post(
      `https://glot.io/api/run/${req.body.lang}/latest`, req.body.code,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
    res.send(result.data);
  }
  catch (err) {
    res.status(500).send(err)
  }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), (err)=>{
      res.status(500).send(err)
    })
  })


app.listen(5000, () => {
  console.log(process.env.NODE_ENV)
  console.log('listening on port 5000')
});