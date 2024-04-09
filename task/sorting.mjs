import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';

let roles_data;
for (let type in raw_data) {
	raw_data[type].rawdata = JSON.parse(fs.readFileSync(`${raw_data[type].fn}.op.json`, 'utf8'));
}
roles_data = raw_data.roles.rawdata || [];

let op = {
	roles: [],
	icons: {},
	strategy: [],
	ornaments: [],
};

// ########   #######  ##       ########  ######
// ##     ## ##     ## ##       ##       ##    ##
// ##     ## ##     ## ##       ##       ##
// ########  ##     ## ##       ######    ######
// ##   ##   ##     ## ##       ##             ##
// ##    ##  ##     ## ##       ##       ##    ##
// ##     ##  #######  ######## ########  ######

// ROLES
let roles_detail_data = raw_data.role_deatil.rawdata.flat();
op.roles = roles_data.map((item) => {
	let detail = roles_detail_data.find((j) => j.hero_icon === item.hero_icon);

	op.icons[detail.prop_icon.toLowerCase()] = detail.prop;
	op.icons[detail.career_icon.toLowerCase()] = detail.career;

	let _strategy = detail.strategy?.[0];
	let strategy;
	if (_strategy) {
		delete _strategy.unlock_condition;
		op.strategy.push(_strategy);
		strategy = _strategy.name;
	}

	switch (item.hero_icon) {
		case 'Hero1077_HeadIcon_Basic':
			item.prop = '炎';
			break;
	}

	return {
		...pick_obj(item, [
			'name',
			'rarity',
			'prop',
			'hero_icon',
			'career',
			'pinyin',
			'pinyin_tw',
			'path',
		]),
		...pick_obj(detail, ['pic', 'rarity', 'position', 'range', 'speed']),

		strategy,

		status: {
			hp: +detail.qixue,
			atk_mag: +detail.magic_attack,
			atk_phy: +detail.physical_attack,
			def_mag: +detail.magic_defense,
			def_phy: +detail.physical_defense,
			crit: +detail.huixin,
		},
	};
});

//  ######  ######## ########     ###    ######## ########  ######   ##    ##
// ##    ##    ##    ##     ##   ## ##      ##    ##       ##    ##   ##  ##
// ##          ##    ##     ##  ##   ##     ##    ##       ##          ####
//  ######     ##    ########  ##     ##    ##    ######   ##   ####    ##
//       ##    ##    ##   ##   #########    ##    ##       ##    ##     ##
// ##    ##    ##    ##    ##  ##     ##    ##    ##       ##    ##     ##
//  ######     ##    ##     ## ##     ##    ##    ########  ######      ##

// STRATEGY
let icons_mapping = {
	...op.icons,
	female: '女',
	male: '男',
	strategy_core: '陣眼',
};

op.strategy = op.strategy.map((item) => {
	let obj = {
		name: item.name,
		img: item.img,
		desc: item.desc,
		members: [gen_mem_by_img(item.icon_center)],
	};
	for (let prop in item) {
		if (/icon\d/.test(prop) && item[prop]) {
			obj.members.push(gen_mem_by_img(item[prop]));
		}
	}

	switch (item.name) {
		case '三身通智陣':
			obj.members.push(gen_mem_by_img('strategy_core'));
			obj.members.push(gen_mem_by_img('strategy_core'));
			break;

		// case '驅雷魔魄陣':
		// case '狐靈神氛陣':
		// 	obj.members.push(gen_mem_by_img('dusk'));
		// 	break;

		// case '暗月鬥靈陣':
		// 	obj.members.push(gen_mem_by_img('melee'));
		// 	break;

		default:
			break;
	}

	return obj;
});

let sources = [...new Set(op.roles.map((i) => i.source))];
// console.log(111, sources);

// orna data checking
raw_data.ornaments.rawdata.data.data.forEach((orna_cn) => {
	let _ornas_tw = raw_data.ornaments_tw.rawdata.data.data;
	let orna_tw = _ornas_tw.find((_orna) => _orna.icon === orna_cn.icon);
	if (!orna_tw) {
		return;
	}

	if (orna_cn.type !== orna_tw.type) {
		console.log(111, 'orna type gg', orna_cn.name);
	}
});

//
//  #######  ########  ##    ##    ###    ##     ## ######## ##    ## ########  ######
// ##     ## ##     ## ###   ##   ## ##   ###   ### ##       ###   ##    ##    ##    ##
// ##     ## ##     ## ####  ##  ##   ##  #### #### ##       ####  ##    ##    ##
// ##     ## ########  ## ## ## ##     ## ## ### ## ######   ## ## ##    ##     ######
// ##     ## ##   ##   ##  #### ######### ##     ## ##       ##  ####    ##          ##
// ##     ## ##    ##  ##   ### ##     ## ##     ## ##       ##   ###    ##    ##    ##
//  #######  ##     ## ##    ## ##     ## ##     ## ######## ##    ##    ##     ######
//
// ORNAMENTS
op.ornaments = {
	keys: {
		rarity: ['R', 'SR', 'SSR'],
		position: ['', '頭', '身', '腰', '手'],
		// position: {
		// 	1: '頭',
		// 	2: '身',
		// 	3: '腰',
		// 	4: '手',
		// },
		job: ['俠客', '羽士', '鐵衛', '咒師', '祝由', '御風', '鬥將'],
		// type: ['physical_attack','physical_defense','magic_attack','magic_defense','treatment','qixue','currency'];
		type: ['物攻', '物防', '法攻', '法防', '治療', '氣血'],
	},
	items: raw_data.ornaments.rawdata.data.data.map((item) => {
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

		// fix data, workaround
		switch (o.icon) {
			// 九色鹿冠
			case 'Equip_jiuseluguan':
				if (o.type === '001001') {
					console.log(1111, '竟然更新修正了！');
				}
				o.type = '001001'; // 000010 => 001001
				break;

			// 荊羽護元
			case 'Equip_jingyuyanlin':
				o.set = `◈[兩件] 免疫「封勁」，與目標每間隔2格距離，使用傷害絕學「對戰前」自身驅散1個「有害狀態」，並獲得1個隨機「屬性提升類」狀態（最多驅散3個，獲得3個）
◈[三件] 主動攻擊後，若場上不存在攜帶「獵印」狀態的敵方，對選取的目標格子上的敵方角色施加「獵印」狀態，持續2回合。場上有攜帶「獵印」狀態的敵方時，射程+1，主動攻擊攜帶「獵印」目標「對戰中」傷害和暴擊率提高20%，若超過5格距離，則每超過1格傷害和暴擊率額外降低15%（最多降低60%）。
「獵印」：無法發動「閃避」。遭受「羽士」攻擊「對戰中」物防、法防-30%（遭受「羽士」攻擊「對戰後」消失）`;
				break;

			// 寰光劍玉
			case 'Equip_huanguangjianyu':
				o.set = `◈[兩件] 免疫「疲弱」，連擊/追擊/先攻傷害提高30%
◈[三件] 觸發連擊/追擊/先攻/暴擊後，自身獲得1層「劍意」狀態。本回合使用過傷害絕學，行動結束時，對自身2格範圍內所有敵方造成1次無屬相物理傷害（物攻10%*「劍意」層數）並消耗所有「劍意」，若本次消耗5層「劍意」，則額外施加「無摧·禁療」狀態，持續2回合
「無摧·禁療」： 無法被治療（不可驅散）
「劍意」：物攻，物防+3%，3層劍意時，恢復100%氣血，並獲得「迅捷I」狀態，持續2回合（不可驅散，上限5層）`;
				break;

			// 化魄秘鐲
			case 'Equip_huapomizhuo':
				o.set = `◈[兩件] 免疫「封咒」，使用傷害絕學後，50%機率對目標施加1個隨機「有害狀態」
◈[三件] 受到攻擊時，3格範圍內存在與攻擊者攻擊屬相相同的其他友方，則對應屬相免傷提高15%。3格範圍內每有1個與自身屬相相同的其他角色，使用傷害絕學時法攻提高6%（最多提高12%），且釋放後有50%機率（最多100%機率）使該絕學冷卻時間-1。`;
				break;

			case 'Equip_tianshiyunpei':
			case 'Equip_tianshifuzhu':
				o.desc += '\n「鴻宇天石」套裝';
				break;

			// 天石命墜
			case 'Equip_tianshimingzhui':
				o.desc += '\n「鴻宇天石」套裝';
				o.set = `◈[兩件] 免疫擊退和拉拽，自身3格範圍內，每多存在1個其他角色，自身雙防提高5%（最多提高20%）
◈[三件] 遭受方向性範圍絕學攻擊時，身後直線3格內的其他友方免傷和暴擊抗性提高20%。若氣血大於等於50%，自身雙防提高20%，並使3格內其他友方雙防提高（數值為施加者的（物防+法防）*10%）`;
				break;

			default:
				break;
		}

		return o;
	}),
};

outputJSON({
	json: op.roles,
	fn: './task/rawdata/roles.src.json',
	// space: 0,
	cn2tw: true,
});
outputJSON({
	json: op.roles,
	fn: './src/lib/data/roles.min.json',
	space: 0,
	cn2tw: true,
});

outputJSON({
	json: op.strategy,
	fn: './task/rawdata/strategy.src.json',
	cn2tw: true,
});
outputJSON({
	json: op.strategy,
	fn: './src/lib/data/strategy.min.json',
	space: 0,
	cn2tw: true,
});

outputJSON({
	json: op.ornaments,
	fn: './task/rawdata/ornaments.src.json',
	cn2tw: true,
});
outputJSON({
	json: op.ornaments,
	fn: './src/lib/data/ornaments.min.json',
	space: 0,
	cn2tw: true,
});

function gen_mem_by_img(img = '') {
	let role = op.roles.find((r) => r.hero_icon === img);
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
