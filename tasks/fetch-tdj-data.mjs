import fs from 'fs';
// import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import * as CSV from 'csv-tools';

import { writeFile, outputJSON, pick_obj, } from './u.mjs';

{
	// img path
	// https://media.zlongame.com/media/news/cn/tdj/info/data/heroicon/Hero2017_HeadIcon_Basic.png
	// https://media.zlongame.com/media/news/cn/tdj/info/data/strategy/BattleAsssit_053.png
	// https://media.zlongame.com/media/news/cn/tdj/info/data/accessories/Equip_canghaiyueming.png

	// ornaments 飾品
	// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
}


let dev_mode = false;
dev_mode = true; // fetch local file

console.log({dev_mode});

let raw_data = {
	roles: {
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=basic
		url: () => get_url({ module: 'hero', type: 'basic' }),
		fn: './tasks/_temp/_roles.json',
		rawdata: null,
	},
	role_deatil: {
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=detail&query=%s
		url: (name) => get_url({ module: 'hero', type: 'detail', query: name, }),
		fn: './tasks/_temp/_roles_detail_fn.json',
		rawdata: null,
	},
	ornaments: {
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
		url: (name) => get_url({ module: 'ornaments', type: 'ornaments', }),
		fn: './tasks/_temp/_ornaments.json',
		rawdata: null,
	},
};

let roles_data;
if (dev_mode) {
	for (let type in raw_data) {
		raw_data[type].rawdata = JSON.parse( fs.readFileSync(raw_data[type].fn, 'utf8') );
	}
	roles_data = raw_data.roles.rawdata?.data?.data || [];
} else {
	raw_data.roles.rawdata = await fetch(raw_data.roles.url()).then(r => r.json());
	outputJSON({
		json: raw_data.roles.rawdata,
		fn: raw_data.roles.fn,
		cn2tw: false,
	});

	raw_data.ornaments.rawdata = await fetch(raw_data.ornaments.url()).then(r => r.json());
	outputJSON({
		json: raw_data.ornaments.rawdata,
		fn: raw_data.ornaments.fn,
		cn2tw: false,
	});

	roles_data = raw_data.roles.rawdata?.data?.data || [];
	raw_data.role_deatil.rawdata = await Promise.all(
		roles_data.slice(0).map(i => fetch_role_detail(i.pinyin))
	)
	outputJSON({
		json: raw_data.role_deatil.rawdata,
		fn: raw_data.role_deatil.fn,
		cn2tw: false,
	});
}

let op = {
	roles: [],
	icons: {},
	strategy: [],
	ornaments: [],
};



// ROLES
let roles_detail_data = raw_data.role_deatil.rawdata.flat();
op.roles = roles_data.map(item => {
	let detail = roles_detail_data.find(j => j.name === item.name);

	op.icons[detail.prop_icon.toLowerCase()] = detail.prop;
	op.icons[detail.career_icon.toLowerCase()] = detail.career;

	let _strategy = detail.strategy?.[0];
	let strategy;
	if (_strategy) {
		delete _strategy.unlock_condition;
		op.strategy.push(_strategy);
		strategy = _strategy.name;
	}

	return {
		...pick_obj(item, ['name', 'rarity', 'prop', 'hero_icon', 'career', ]),
		...pick_obj(detail, ['pinyin', 'pic', 'rarity', 'position', 'range', 'speed',]),

		strategy,
		path: encodeURIComponent(item.name),

		status: {
			hp: +detail.qixue,
			atk_mag: +detail.magic_attack,
			atk_phy: +detail.physical_attack,
			def_mag: +detail.magic_defense,
			def_phy: +detail.physical_defense,
			crit: +detail.huixin,
		},
	};
})




// STRATEGY
let icons_mapping = {
	...op.icons,
	female: '女',
	male: '男',
	strategy_core: '陣眼',
};

op.strategy = op.strategy.map(item => {
	let obj = {
		name: item.name,
		img: item.img,
		desc: item.desc,
		members: [
			gen_mem_by_img(item.icon_center),
		],
	};
	for (let prop in item) {
		if (/icon\d/.test(prop) && item[prop]) {
			obj.members.push( gen_mem_by_img(item[prop]) );
		}
	};

	if (item.name === '三身通智阵') {
		obj.members.push( gen_mem_by_img('strategy_core') );
		obj.members.push( gen_mem_by_img('strategy_core') );
	}

	return obj;
});


let sources = [...new Set(op.roles.map(i => i.source))];
// console.log(111, sources);



// ORNAMENTS
op.ornaments = {
	keys: {
		position: {
			1: '頭',
			2: '身',
			3: '腰',
			4: '手',
		},
		job: ['俠客', '羽士', '鐵衛', '咒師', '御風', '鬥將', ],
		// type: ['physical_attack','physical_defense','magic_attack','magic_defense','treatment','qixue','currency'];
		type: ['物攻', '物防', '法攻', '法防', '治療', '氣血', ],
	},
	data: raw_data.ornaments.rawdata.data.data.map(item =>
		pick_obj(item, [
			'name',
			'icon',
			'position',
			'quality',
			'description',
			'job',
			'type',
		])
	),
};


outputJSON({
	json: op.roles,
	fn: './tasks/_temp/roles.json',
	// space: 0,
	cn2tw: true,
});
outputJSON({
	json: op.roles,
	fn: './data/roles.min.json',
	space: 0,
	cn2tw: true,
});

outputJSON({
	json: op.strategy,
	fn: './tasks/_temp/strategy.json',
	cn2tw: true,
});
outputJSON({
	json: op.strategy,
	fn: './data/strategy.min.json',
	space: 0,
	cn2tw: true,
});

outputJSON({
	json: op.ornaments,
	fn: './tasks/_temp/ornaments.json',
	cn2tw: true,
});

// writeFile(
// 	'./tasks/_temp/roles.json.csv',
// 	CSV.fromJSON(op.roles),
// 	true, // cn2tw
// );


//
//
//



async function fetch_role_detail(name = '') {
	let _url = raw_data.role_deatil.url(name);

	return fetch(_url)
		.then(r => r.json())
		.then(data => {
			return data?.data?.data;
		});
}

function get_url(qs_obj = {}) {
	qs_obj = {
		...{
			id: 0,
			action: 'info',
			module: 'hero',
			type: 'basic',
		},
		...qs_obj,
	}
	let qs = new URLSearchParams();

	for(let key in qs_obj) {
		qs.set(key, qs_obj[key]);
	}

	return `https://tdj-activity.zlongame.com/tdj/data/mQuery.do?${qs.toString()}`;
}

function gen_mem_by_img(img = '') {
	let role = op.roles.find(r => r.hero_icon === img);
	if (role) {
		return {
			name: role.name,
			img: img,
		};
	}

	if (icons_mapping[img]) {
		return {
			name: icons_mapping[img],
		};
	}

	console.error('gg:', img);
	return img;
}

