/** @format */
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { getRandomInt, getIndex, getIt } = require('../../api/utils/getData');
const { data } = require('../../fakeDDBB/data');

// get all data
router.get('/data', (req, res) => {
	res.send(data);
});

// adding names

router.post('/data', (req, res) => {
		console.log(req.body);
	const schema = Joi.object({
		name: Joi.string()
			.min(2)
			.pattern(/^[a-zA-Z]+$/)
			.required(),
		nationality: Joi.string()

			.min(4)
			.pattern(/^[a-zA-Z]+$/, 'batatas')
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

// get a random obj in data set
router.get('/randomData', (req, res) => {
	const randomIndex = getRandomInt(100);
	res.send(data[randomIndex]);
});

//get name by nat just sent the first name
router.get('/nationality/:nationality', (req, res) => {
	const nationality = req.params.nationality;
	const target = getIt(nationality, data, 'nationality');
	res.send(target);
});

// get a nationality by name
router.get('nationalityByName/:name', (req, res) => {
	const name = req.params.name;
	const target = getIt(name, data, 'name');
	const nationality = target.nationality;
	res.send(nationality);
});

module.exports = router;




