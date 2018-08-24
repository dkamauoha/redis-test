const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { promisify } = require("util");

const app = express();

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const keysAsync = promisify(client.keys).bind(client);

app.use(bodyParser.json());

client.on("error", function (err) {
    console.log("Error " + err);
});

// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

// async function myFunc() {
//     const res = await getAsync('string key');
//     console.log(res);
// }

// (this goes inside of a get endpoint(maybe?))
// getAsync(req.body.key)
//     .then((res1) => {
//         res.status(200).send(res1)
//     })
// .catch(err => {
//     console.log(err)
//     res.status(500).send(`Check the server for the error`)
// })
// app.post('/api/addtoredis', (req, res, next) => {
//     client.set(req.body.key, req.body.val, redis.print)
// })

app.get('/api/keys', async (req, res) => {
    let reply = await keysAsync('*')
    res.status(200).send(reply)
      
});

app.post('/api/key', async (req, res) => {
    let reply = await getAsync(req.body.key)
    res.status(200).send(reply)
        // .then(keys => {
        //     res.status(200).send(keys);
        // })
        // .catch(err => {
        //     console.log(err)
        //     res.status(500).send(`Check the server for the error`)
        // })        
})

// client.set("string test key", "string test val", redis.print);
app.post('/api/createcell', async (req, res) => {
    await setAsync(req.body.key, req.body.val)
    let reply = await getAsync(req.body.key)
    res.status(200).send(reply);
})



// myFunc()
const port = 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`))