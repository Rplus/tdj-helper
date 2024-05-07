import fs from 'fs';
import { outputJSON, uniq, remove_html_tag, fetch_bwiki_props_by_name } from './u.mjs';

Array.prototype.uniq = uniq;

let names = [];

let data = {
	summons: [],
	skills: [],
};

let _res = await fetch(
	'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50',
);
names = (await _res.json())?.[1];
names.sort();

let owner = {
	'召唤物/剑魂': ['武英仲', 'wuyingzhong'],
	'召唤物/啸霜': ['銀瑪', 'yinma'],
	'召唤物/守卫灵俑': ['鄲陰', 'danyin'],
	'召唤物/封豨': ['相胤', 'xiangyin'],
	'召唤物/庞傀': ['鄲陰', 'danyin'],
	'召唤物/式鬼': ['真胤', 'zhenyin'],
	'召唤物/律.蛛母': ['尉遲良', 'yuchiliang'],
	'召唤物/律.蛛母·贰': ['尉遲良', 'yuchiliang'],
	'召唤物/昂昴': ['相胤', 'xiangyin'],
	'召唤物/梦种灯': ['白鹿', 'bailu'],
	'召唤物/独角仙': ['阿秋', 'aqiu'],
	'召唤物/独角仙·壹': ['阿秋', 'aqiu'],
	'召唤物/独角仙·贰': ['阿秋', 'aqiu'],
	'召唤物/秽土灵俑': ['鄲陰', 'danyin'],
	'召唤物/秽土灵俑·壹': ['鄲陰', 'danyin'],
	'召唤物/秽土灵俑·贰': ['鄲陰', 'danyin'],
};

let sub_skills_list = [
	'「重甲·壹式」',
	'「牢壳·壹式」',
	'「重甲·贰式」',
	'「牢壳·贰式」',
	'「破风爪袭」',
	'「霜影袭杀」',
	'「重甲」',
	'「牢壳」',
];

{
	// summons
	data.summons = await Promise.all(
		names.map(async (summon) => {
			let props = await fetch_bwiki_props_by_name(summon);

			let inherent_name = props['天赋'];
			let inherent_props = await fetch_bwiki_props_by_name('天赋/' + inherent_name);

			let skill_names = [].concat(props['绝学']);

			let op = {
				key: encodeURIComponent(summon),
				name: summon.replace('召唤物/', ''),
				owner: owner[summon] || '',
				inherent_name,
				inherent: remove_html_tag(inherent_props['天赋6星']),
				stats: props['属性'].split(',').map(i => parseInt(i) || 0), // hp, atk_phy, atk_mag, atk_mag, atk_mag
				prop: props['属相'],
				career: props['职业'],
				range: +props['射程'],
				speed: +props['移动'],
				skill_names,
			};

			return op;
		}),
	);
}

{
	// summon skills
	data.skills = await Promise.all(
		data.summons
			.map((sm) => sm.skill_names)
			.flat()
			.uniq()
			.map(async (skill_name) => {
				let props = await fetch_bwiki_props_by_name('绝学/' + skill_name);
				let desc = remove_html_tag(props['绝学描述']);

				let op = {
					name: skill_name,
					cd: props['绝学冷却'],
					// cost: props['绝学消耗'],
					shoot: props['绝学射程'],
					range: props['绝学范围'],
					type: props['绝学类别'],
					desc: desc,
				};

				if (desc.match(/「[^」]+」/)) {
					let sub_skills = desc.match(/「[^」]+」/gm	)
						.filter(i => sub_skills_list.includes(i))
						.map((i) => i.replace(/[「」]/g, ''));
					// let sub_skills = desc.match(/「[^」]+式」/g).map((i) => i.replace(/[「」]/g, ''));

					if (sub_skills.length) {
						op.sub_skills = await Promise.all(sub_skills.map(async (sub_skill) => {
							let props = await fetch_bwiki_props_by_name(`绝学/${sub_skill}`);
							let oop = {
								name: sub_skill,
								cost: props['绝学消耗'],
								shoot: props['绝学射程'],
								range: props['绝学范围'],
								type: props['绝学类别'],
								desc: remove_html_tag(props['绝学描述']),
							};

							if (parseInt(props['绝学冷却'])) {
								oop.cd = props['绝学冷却'];
							}

							return oop;
						}));
					}

				}

				return op;
			}),
	);
}

{
	// workaround: fix 式鬼
	let target = data.summons.find(i => i.name === '式鬼');
	if (target) {
		target.speed = 5;
		target.range = 1;
		target.career = '御风';
	}
}

{
	// workaround: add 劍聖|召喚物/天劍
	names.push('召喚物/天劍');
	data.summons.push({
		key: '召喚物/天劍',
		name: '天劍',
		owner: ['武英仲', 'wuyingzhong'],
		inherent_name: '凶劍煬魂',
		inherent:
			'行動時無視敵方角色阻擋。死亡時對周圍2格敵人施加「魂創」狀態，持續2回合，重置「天劍聖裁」冷卻時間。',
		stats: [80, 80, 80, 80, 80, 80],
		prop: '光',
		career: '御風',
		range: 1,
		speed: 5,
		skill_names: ['鎮罪之儀', '逆轉乾坤‧天劍', '魂刻‧天劍'],
	});
	data.skills = data.skills.concat([
		{
			name: '鎮罪之儀',
			cd: '3回合',
			shoot: '自身',
			range: '菱形3格',
			type: '物攻傷害',
			desc: '對範圍內所有敵人造成0.5倍傷害，施加2層「魂創」狀態，持續2回合。',
		},
		{
			name: '逆轉乾坤‧天劍',
			cd: '4回合',
			shoot: '3格',
			range: '單體',
			type: '支援',
			desc: '和召喚者交換氣血，並轉移所有「減益狀態」到自身。',
		},
		{
			name: '魂刻‧天劍',
			cd: '-',
			shoot: '-',
			range: '-',
			type: '被動',
			desc: '行動結束時恢復2格內的友方氣血（最大氣血的20%）。',
		},
	]);
}

{
	data.summons.sort((a, b) => {
		return a.owner[1].localeCompare(b.owner[1]);
	})
}

outputJSON({
	json: data,
	fn: './task/rawdata/_summons.raw.json',
	space: 2,
	// cn2tw: true,
});
outputJSON({
	json: data,
	fn: './task/rawdata/summons.json',
	space: 2,
	cn2tw: true,
});

outputJSON({
	json: data,
	fn: './src/lib/data/summons.min.json',
	space: 0,
	cn2tw: true,
});
