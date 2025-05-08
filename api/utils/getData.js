/** @format */

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getIt = (item, arr, param) => arr.find((n) => n[param] === item);
const getIndex = (item, arr, param) => arr.findIndex((n) => n[param] === item);

module.exports = {getRandomInt, getIt, getIndex}

