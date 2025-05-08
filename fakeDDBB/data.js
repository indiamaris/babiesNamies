/** @format */
const fs = require('fs');
const data_source = JSON.parse(
	fs.readFileSync('./fakeDDBB/fakeDDBB.json', 'utf8')
);
const data = data_source.data;
module.exports = { data };

