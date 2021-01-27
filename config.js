const config = {
	path: '/Users/mattia/Library/Mobile Documents/com~apple~CloudDocs/Links/',
	data: 'links.json'
}

const arg = process.argv[2];
if (arg) {
	console.log(config[arg]);
}

module.exports = config;