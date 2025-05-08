/** @format */

const logger = (req, res, next) => {
	console.log('second mid fnc ...LOGGING...');
	next();
};

module.exports = logger;

