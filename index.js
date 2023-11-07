/**
 * eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */

/** @format */
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(`Listen to your heart
When he's calling for you`)
);

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

const data_source = fs.readFileSync('./fakeDDBB/fakeDDBB.json', 'utf8');

app.get('/', (req, res) => {
	res.send(
		'Uma pai que retorna nome de pessoas e a nacionalidade tradicional desse nome!'
	);
});

//random data how>

// get all names x nationalities
app.get('/api/allData', (req, res) => {
	res.send(data_source);
});
app.get('/api/randomName', (req, res) => {
	res.send(data_source);
});

