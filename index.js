/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
// revisar aqui ______________________________________________________
const { config } = require('dotenv');
// const config = require('config');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const app = express();
const startupDebugger = require('debug')('app:startup');
const PORT = process.env.PORT || 3001; 
// setting view wngine to pug
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	startupDebugger(
		`enviroment is really  ${process.env.NODE_ENV} we enabled morgan`
		// comando no terminal : export DEBUG=app:startup
		// comando no terminal : export DEBUG=app:startup, app:db
		// comando no terminal : export DEBUG=app:*
		// comando no terminal com showrtcut:  DEBUG=app:startup nodemon index.js
	);
}
app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ___________________Settings Autorization ________________________
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// ___________________ROUTES ________________________
const base = require('./api/routes/base');
app.use('/', base);
const name = require('./api/routes/name');
app.use('/api/name', name);
const data = require('./api/routes/data');
app.use('/api', data);

app.listen(PORT, () =>
	console.log(`Listen to your heart 
When he's calling for you`)
);