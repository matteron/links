const fs = require('fs');
const path = require('path');
const config = require('./config');

const allLinksRegex = /\[([^\[]+)\](\(.*\))/gm;
const singleLinkRegex = /\[([^\[]+)\]\((.*)\)/;

const tags = process.argv.slice(2);

const input = fs.readFileSync('./input.md', 'utf-8');

const links = input.match(allLinksRegex).reduce((acc, cur) => {
	const res = singleLinkRegex.exec(cur);
	acc.push({
		name: res[1],
		link: res[2],
		date: new Date(),
		tags
	});
	return acc;
}, []);

const jsonLoc = path.join(config.path, config.data);
const file = require(jsonLoc) || [];
file.push(...links);

fs.writeFileSync(jsonLoc, JSON.stringify(file));
