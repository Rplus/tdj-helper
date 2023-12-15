import fs from 'fs';
// import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import * as OpenCC from 'opencc-js';

import { writeFile, outputJSON, parse_number, } from './u.mjs';

let dev_mode = false;

// roles
let data;
if (dev_mode) {
	data = fs.readFileSync('./tasks/_temp/1.html', 'utf8');
} else {
	data = await fetch('https://wiki.biligame.com/tdj/%E8%8B%B1%E7%81%B5%E6%BB%A1%E7%BA%A7%E5%B1%9E%E6%80%A7%E8%A1%A8').then(d => d.text());
}
let doc = parse(data);

let roles_trs = [...doc.querySelectorAll('#CardSelectTr tbody tr.divsort')];

let icons = {
	klass: {},
	type: {},
};

let roles = roles_trs.map(item => {
	let tds = item.querySelectorAll('td');
	let name = tds[2].textContent.trim();
	let link = 'https://wiki.biligame.com' + tds[0].querySelector('a').getAttribute('href');
	let rarity = tds[0].getAttribute('class').split('_')[1];
	let type = item.getAttribute('data-param2');
	let klass = item.getAttribute('data-param3');
	let avatar = tds[0].querySelector('img');

	icons.klass[klass] = tds[1].querySelectorAll('img')[0].getAttribute('src');
	icons.type[type] = tds[1].querySelectorAll('img')[1].getAttribute('src');

	return {
		name,
		link,
		avatar: {
			src: avatar.getAttribute('src'),
			srcset: avatar.getAttribute('srcset'),
		},
		rarity,
		type,
		klass,
		'3c': !!tds[2].querySelector('.hero_name_3C'),
		status: {
			hp: parse_number(tds[4].textContent),
			atk_phy: parse_number(tds[5].textContent),
			def_phy: parse_number(tds[6].textContent),
			atk_mag: parse_number(tds[7].textContent),
			def_mag: parse_number(tds[8].textContent),
			crit: parse_number(tds[9].textContent),
		},
	};
})

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

writeFile('./tasks/data/roles.json', converter(JSON.stringify(roles, null, 2)));



// formation
let formations_info = fs.readFileSync('./tasks/data/formations-info.json', 'utf8');
formations_info = JSON.parse(formations_info);

let data2;
if (dev_mode) {
	data2 = fs.readFileSync('./tasks/_temp/2.html', 'utf8');
} else {
	data2 = await fetch('https://wiki.biligame.com/tdj/%E6%88%98%E9%98%B5%E5%88%97%E8%A1%A8').then(d => d.text());
}
let doc2 = parse(data2);

let formations = await Promise.all(
	[...doc2.querySelectorAll('#CardSelectTr tbody tr.itemhover')]
	.map(async (item, index) => {
		let tds = item.querySelectorAll('td');
		let name = tds[0].textContent.trim();
		let members = [...tds[1].querySelectorAll('.hero_head')];
		let href = item.querySelector('a ~ a').getAttribute('href');

		return {
			name,
			url: `https://wiki.biligame.com${href}`,
			avatar: {
				src: tds[0].querySelector('img').getAttribute('src'),
				srcset: tds[0].querySelector('img').getAttribute('srcset'),
			},
			members: members.map(mem => mem.querySelector('.hero_head_name').textContent.trim()),
			info: formations_info[name] || '',
			// info: await get_formation_info(`https://wiki.biligame.com${href}`, index),
		};
	})
);

async function get_formation_info(url, index) {
	// let parser = new DOMParser();
	// op.forEach((i, index) => {
	//     fetch(i.url).then(r=>r.text())
	//     .then(html => {
	//         let doc = parser.parseFromString(html, "text/html");
	//         op[index].info = doc.querySelector('.text-left')?.textContent.trim();
	//     })
	// });
	await new Promise(r => setTimeout(r, index * 1));
	// let html = await fetch(url).then(res => res.text());
	// let html = await fetch(url);
	// let _doc = parse(html);
	// // let td = _doc.querySelector('.text-left');
	// let title = _doc.querySelector('title')?.textContent.trim();
	// if (title) {
	// 	return title;
	// }
	// console.log('gg', td, _doc.querySelector('title')?.textContent);
	return '';
}

writeFile('./tasks/data/formations.json', await converter(JSON.stringify(formations, null, 2)));

writeFile('./tasks/data/icons.json', converter(JSON.stringify(icons, null, 2)));

let op = {
	roles,
	formations,
	icons,
};

writeFile('./src/roles/data.json', converter(JSON.stringify(op, null, 2)));
