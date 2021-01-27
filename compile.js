const fs = require('fs');
const path = require('path');
const config = require('./config');

const dataPath = path.join(config.path, config.data);

const makeList = (data, transform) => data.reduce((acc, cur) => acc + transform(cur), '');

const makeListItem = (name, link) =>
`
<li>
	<a href="/${link}">${name}</a>
</li>\n
`;

const makeLink = (data) => makeListItem(data.name, data.link);

const makeLinks = (data) => makeList(data, makeLink);

const makeTag = (tag) => makeListItem(tag, 'tag/' + tag);

const makeTags = (data) => makeList(data, makeTag);

const makeNavItem = (url) => makeListItem(url, url);

const makePage = (title, list) => 
`
<!DOCTYPE html>
<html>
	<head>
		<title>${title}</title>
		<style>
			body {
				font-size: 1rem;

			}
			ul {
				width: 32rem;
				margin: 1rem auto;
			}
			li {
				margin-bottom: 0.5rem;
			}
			nav li {
				display: inline;
				margin-right: 1rem;
				margin-bottom: 1rem;
			}
		</style>
	</head>
	<body>
		<nav>
			<ul>
				${makeList(['index', 'tags'], makeNavItem)}
			<ul>
		</nav>
		<ul>
			${list}
		</ul>
	</body>
</html>
`;

const gatherTags = (links) => {
	return Object.keys(links.reduce(
		(acc, cur) => {
			cur.tags.forEach(t => {
				if (!acc[t] && t) {
					acc[t] = true;
				}
			})
			return acc;
		},
		{}
	));
}

const compilePage = (file, title, list) => {
	const page = makePage(title, list);
	fs.writeFileSync(path.join(config.path, file + '.html'), page);
}

const data = require(dataPath);
const tags = gatherTags(data);

tags.forEach(t => {
	const links = data.filter(l => l.tags.includes(t));
	compilePage('tag/' + t, t, makeLinks(links));
});

compilePage('tags', 'tags', makeTags(tags));
compilePage('index', 'links', makeLinks(data));