/**
import { helmet } from 'helmet';
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
const helmet = require('helmet');
const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const logger = require('./fakeDDBB/middleware/logger');
const morgan = require('morgan');
const app = express();
console.log(`enviroment is ${process.env.NODE_ENV}`);

// definir a porta na variavel, tb se pode colocar todas em um arquivo e exportar de lah
// em mac usaremos export e em windows usaremos set + nome de variavel para setar a porta que estara escutando
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
console.log(process.env.NODE_ENV);
// const { FormatJason } = require('./utils/formatJason');
const data_source = JSON.parse(
	fs.readFileSync('./fakeDDBB/fakeDDBB.json', 'utf8')
);
const data = data_source.data;

const getRandomInt = (max) => Math.floor(Math.random() * max);

const getIt = (item, arr, param) => arr.find((n) => n[param] === item);
const getIndex = (item, arr, param) => arr.findIndex((n) => n[param] === item);
// base route
app.get('/', (req, res) => {
	res.send(
		'Uma API que retorna nome de pessoas e a nacionalidade tradicional desse nome!'
	);
});
// middleware Functions
app.use((req, res, next) => {
	console.log('first mid fnc');
	next();
});
// middleware Functions are called insequence
app.use(logger);
// get all data
app.get('/api/data', (req, res) => {
	res.send(data_source);
});
// get a random obj in data set
app.get('/api/randomData', (req, res) => {
	const randomIndex = getRandomInt(100);
	res.send(data[randomIndex]);
});

// get a obj by name
app.get('/api/name/:name', (req, res) => {
	const seti = req.params.name;
	const target = getIt(seti, data, 'name');
	res.send(target);
});
//get name by nat just sent the first name
app.get('/api/nationality/:nationality', (req, res) => {
	const nationality = req.params.nationality;
	const target = getIt(nationality, data, 'nationality');
	res.send(target);
});

// get a nationality by name
app.get('/api/nationalityByName/:name', (req, res) => {
	const name = req.params.name;
	const target = getIt(name, data, 'name');
	const nationality = target.nationality;
	res.send(nationality);
});

// adding names

app.post('/api/data', (req, res) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(2)
			.pattern(/^[a-zA-Z]+$/)
			.required(),
		nationality: Joi.string()
			.min(4)
			.pattern(/^[a-zA-Z]+$/)
			.required(),
	});
	const { error, result } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(` Please be attentive, ${error.message} `);
	}
	const newName = {
		name: req.body.name,
		nationality: req.body.nationality,
	};
	// I am using unshift over push because its easy for me test the array in Postman.
	data.unshift(newName);
	res.send(newName);
});
// editind a nationality
app.put('/api/nationalityByName/:name', (req, res) => {
	const name = req.params.name;
	const target = getIt(name, data, 'name');

	if (!target || target === undefined)
		return res.status(404).send(`Please be attentive, ${name}`);

	target['nationality'] = req.body.nationality;
	console.log(target);
	res.send(target);
});

app.delete('/api/delete/:name', (req, res) => {
	console.log(data);
	const name = req.params.name;
	const index = getIndex(name, data, 'name');
	console.log(index);
	data.splice(index, 1);
	res.send(` ${name} was deleted from ${index} position`);
});

app.listen(PORT, () =>
	console.log(`Listen to your heart 
When he's calling for you`)
);


