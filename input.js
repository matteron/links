const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const config = require('./config');

prompt.start();
prompt.get(['link', 'name', 'tags'], (_, result) => {
	const data = {
		link: result.link,
		name: result.name,
		tags: result.tags.split(',').filter(t => t).map(t => t.trim()),
		date: new Date()
	}

	const jsonLoc = path.join(config.path, config.data);
	const file = require(jsonLoc) || [];
	file.push(data);

	fs.writeFileSync(jsonLoc, JSON.stringify(file));

	if (process.argv.includes('-c')) {
		require('./compile');
	}
});
