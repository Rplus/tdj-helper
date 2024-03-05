import fs from 'fs';
// import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import * as CSV from 'csv-tools';

import { writeFile, outputJSON, pick_obj, getArgs, } from './u.mjs';

let domains = {
	cn: 'tdj-activity.zlongame.com',
	// cn: 'tdj-activitytest.zlongame.com', // test
	tw: 'tdj-activity.game-beans.com',
	// tw: 'tdj-activitytest.game-beans.com', // test
};

{
	// img path
	// https://media.zlongame.com/media/news/cn/tdj/info/data/heroicon/Hero2017_HeadIcon_Basic.png
	// https://media.zlongame.com/media/news/cn/tdj/info/data/strategy/BattleAsssit_053.png
	// https://media.zlongame.com/media/news/cn/tdj/info/data/accessories/Equip_canghaiyueming.png

	// ornaments 飾品
	// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
	// https://tdj-activity.game-beans.com/tdj/data/mQuery.do?id=1&action=info&module=ornaments&type=ornaments
	// https://tdj-activitytest.game-beans.com/tdj/data/mQuery.do?id=1&action=info&module=ornaments&type=ornaments
}

let args = getArgs();
let dev_mode = !!(+args.dev);

console.log({dev_mode});

let raw_data = {
	roles: {
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=basic
		url: (lang) => get_url({ module: 'hero', type: 'basic', }, lang),
		fn: './tasks/_temp/_roles.json',
		rawdata: null,
	},
	role_deatil: {
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=detail&query=%s
		url: (name, lang) => get_url({ module: 'hero', type: 'detail', query: name, }, lang),
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
	roles_data = raw_data.roles.rawdata || [];
} else {
	let roles_tw = await fetch(raw_data.roles.url('tw')).then(r => r.json());
	let roles_cn = await fetch(raw_data.roles.url('cn')).then(r => r.json());

	raw_data.roles.rawdata = roles_cn?.data?.data.map(role => {
		let role_tw = roles_tw?.data?.data.find(_role => _role.hero_icon === role.hero_icon);
		return role_tw ? {
			...role_tw,
			pinyin_tw: role_tw.pinyin, // tw_only
			pinyin: role.pinyin,
		} : role;
	});

	outputJSON({
		json: roles_tw,
		fn: './tasks/_temp/_roles.tw.json',
		cn2tw: false,
	});
	outputJSON({
		json: roles_cn,
		fn: './tasks/_temp/_roles.cn.json',
		cn2tw: false,
	});
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

	roles_data = raw_data.roles.rawdata || [];
	raw_data.role_deatil.rawdata = await Promise.all(
		roles_data.slice(0).map(i => fetch_role_detail(i))
	)
	outputJSON({
		json: raw_data.role_deatil.rawdata,
		fn: raw_data.role_deatil.fn,
		cn2tw: false,
	});
	outputJSON({
		json: raw_data.role_deatil.rawdata,
		fn: raw_data.role_deatil.fn.replace('json', 'tw.json').replace('_temp', 'data'),
		cn2tw: true,
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
		...pick_obj(item, ['name', 'rarity', 'prop', 'hero_icon', 'career', 'pinyin', 'pinyin_tw', ]),
		...pick_obj(detail, ['pic', 'rarity', 'position', 'range', 'speed', ]),

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

	if (item.name.startsWith('三身通智')) {
		obj.members.push( gen_mem_by_img('strategy_core') );
		obj.members.push( gen_mem_by_img('strategy_core') );
	}
	// workaround for sucking game-beans
	if (item.name === '驅雷魔魄陣' || item.name === '狐靈神氛陣') {
		obj.members.push( gen_mem_by_img('dusk') );
	}
	if (item.name === '暗月鬥靈陣') {
		obj.members.push( gen_mem_by_img('melee') );
	}
	if (item.name === '冰火絕獄陣') {
		obj.desc = obj.desc.split('英靈定位：')[0]
	}

	return obj;
});


let sources = [...new Set(op.roles.map(i => i.source))];
// console.log(111, sources);



// ORNAMENTS
op.ornaments = {
	keys: {
		rarity: ['R', 'SR', 'SSR',],
		position: ['', '頭', '身', '腰', '手', ],
		// position: {
		// 	1: '頭',
		// 	2: '身',
		// 	3: '腰',
		// 	4: '手',
		// },
		job: ['俠客', '羽士', '鐵衛', '咒師', '祝由', '御風', '鬥將', ],
		// type: ['physical_attack','physical_defense','magic_attack','magic_defense','treatment','qixue','currency'];
		type: ['物攻', '物防', '法攻', '法防', '治療', '氣血', ],
	},
	items: raw_data.ornaments.rawdata.data.data.map(item => {
		let o = pick_obj(item, [
			'name',
			'icon',
			'position',
			// 'quality',
			// 'description',
			'job',
			'type',
		]);
		o.rarity = item.quality;
		o.desc = item.description.replace(/\<br\/\>/g, '\n');
		return o;
	}),
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
outputJSON({
	json: op.ornaments,
	fn: './data/ornaments.min.json',
	space: 0,
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



async function fetch_role_detail(role) {
	let _url = role.pinyin_tw
		? raw_data.role_deatil.url(role.pinyin_tw, 'tw')
		: raw_data.role_deatil.url(role.pinyin, 'cn');

	return fetch(_url)
		.then(r => r.json())
		.then(data => {
			return data?.data?.data;
		});
}

function get_url(qs_obj = {}, lang = 'cn') {
	qs_obj = {
		...{
			id: lang === 'cn' ? 0 : 1,
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

	return `https://${domains[lang]}/tdj/data/mQuery.do?${qs.toString()}`;
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

