/** @format */
const express = require('express');
const router = express.Router();
const { getRandomInt, getIndex, getIt } = require('../../api/utils/getData');
const { data } = require('../../fakeDDBB/data');
// base route
router.get('/', (req, res) => {
	res.render('index', {
		title: 'india express',
		message:
			'Uma API que retorna nome de pessoas e a nacionalidade tradicional desse nome!!',
	});
});



module.exports = router;

