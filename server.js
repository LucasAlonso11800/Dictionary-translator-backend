const express = require('express');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const BASE_URL = 'https://od-api.oxforddictionaries.com/api/v2'
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

app.post('/', (req, res) => {
    const word = req.body.word;
    const language = req.body.language;

    const options = {
        method: 'GET',
        url: `${BASE_URL}/entries/${language}/${word}`,
        headers: {
            'app_id': APP_ID,
            'app_key': APP_KEY
        }
    }
    
    axios.request(options)
        .then(data => res.json(data.data.results))
        .catch(err => console.log(err))
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));