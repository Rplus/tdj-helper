import fs from 'fs';
import { outputJSON, uniq, remove_html_tag, fetch_bwiki_props_by_name } from './u.mjs';

Array.prototype.uniq = uniq;

let data = {
	names: [],
	summons: [],
	skills: [],
};

let _res = await fetch(
	'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50',
);
data.names = (await _res.json())?.[1];
data.names.sort();

{
	// summons
	data.summons = await Promise.all(
		data.names.map(async (summon) => {
			let props = await fetch_bwiki_props_by_name(summon);

			let inherent_name = props['天赋'];
			let inherent_props = await fetch_bwiki_props_by_name('天赋/' + inherent_name);

			let skill_names = [].concat(props['绝学']);

			let op = {
				key: summon,
				name: summon.replace('召唤物/', ''),
				inherent_name,
				inherent: remove_html_tag(inherent_props['天赋6星']),
				range: props['射程'],
				stats: props['属性'],
				prop: props['属相'],
				speed: props['移动'],
				career: props['职业'],
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

				return {
					name: skill_name,
					cd: props['绝学冷却'],
					cost: props['绝学消耗'],
					shoot: props['绝学射程'],
					range: props['绝学范围'],
					type: props['绝学类别'],
					desc: remove_html_tag(props['绝学描述']),
				};
			}),
	);
}

{
	// workaround: add 劍聖|召喚物/天劍
	data.names.push('召喚物/天劍');
	data.summons.push({
		key: '召喚物/天劍',
		name: '天劍',
		inherent_name: '凶劍煬魂',
		inherent:
			'行動時無視敵方角色阻擋。死亡時對周圍2格敵人施加「魂創」狀態，持續2回合，重置「天劍聖裁」冷卻時間。',
		range: '1',
		stats: '80%,80%,80%,80%,80%,80%',
		prop: '光',
		speed: '5',
		career: '御風',
		skill_names: ['鎮罪之儀', '逆轉乾坤‧天劍', '魂刻‧天劍'],
	});
	data.skills = data.skills.concat([
		{
			name: '鎮罪之儀',
			cd: '3回合',
			cost: '-',
			shoot: '自身',
			range: '菱形3格',
			type: '物攻傷害',
			desc: '對範圍內所有敵人造成0.5倍傷害，施加2層「魂創」狀態，持續2回合。',
		},
		{
			name: '逆轉乾坤‧天劍',
			cd: '4回合',
			cost: '-',
			shoot: '3格',
			range: '單體',
			type: '支援',
			desc: '和召喚者交換氣血，並轉移所有「減益狀態」到自身。',
		},
		{
			name: '魂刻‧天劍',
			cd: '-',
			cost: '-',
			shoot: '-',
			range: '-',
			type: '被動',
			desc: '行動結束時恢復2格內的友方氣血（最大氣血的20%）。',
		},
	]);
}

outputJSON({
	json: data,
	fn: './task/rawdata/summons.json',
	space: 2,
	// cn2tw: true,
});

outputJSON({
	json: data,
	fn: './src/lib/data/summons.min.json',
	space: 0,
	cn2tw: true,
});
