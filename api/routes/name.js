/** @format */
const express = require('express');
const router = express.Router();
const { getRandomInt, getIndex, getIt } = require('../../api/utils/getData');
const { data } = require('../../fakeDDBB/data');
// get a obj by name
router.get('/:name', (req, res) => {
	const name = req.params.name;
	const target = getIt(name, data, 'name');
	res.send(target);
});

// editind a nationality
router.put('/:name', (req, res) => {
	const name = req.params.name;
	const target = getIt(name, data, 'name');

	if (!target || target === undefined)
		return res.status(404).send(`Please be attentive, ${name}`);

	target['nationality'] = req.body.nationality;
	console.log(target);
	res.send(target);
});

router.delete('/:name', (req, res) => {
	const name = req.params.name;
	const index = getIndex(name, data, 'name');
	console.log(index);
	data.splice(index, 1);
	res.send(` ${name} was deleted from ${index} position`);
});


module.exports = router;

