import fs from 'fs';
import pLimit from 'p-limit';
import {
	// raw_data,
	outputJSON,
	fetch_with_cached,
	// pick_obj,
	get_bili_data_url,
	bilidata_to_obj,
	remove_html_tag,
	random_time,
	uniq_array,
} from './u.mjs';

// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');
const fetch_limit = pLimit(5);

const raw = await fetch_with_cached({
	url: 'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50',
	cached_path: './task/rawres/bili-summon.res.json',
	is_json: true,
	ignore_cached: FORCE_FETCH,
});

const bili_summon_names = raw[1].toSorted();

outputJSON({
	json: bili_summon_names,
	fn: './task/rawres/__bili_summon_names.json',
	cn2tw: false,
});



const owner = {
	'召唤物/冥渊魁王': ['幻海冥皇', 'huanhaiminghuang'],
	'召唤物/剑魂': ['武英仲', 'wuyingzhong'],
	'召唤物/哮天犬': ['楊戩', 'yangjian'],
	'召唤物/啸霜': ['銀瑪', 'yinma'],
	'召唤物/守卫灵俑': ['鄲陰', 'danyin'],
	'召唤物/封豨': ['相胤', 'xiangyin'],
	'召唤物/庞傀': ['鄲陰', 'danyin'],
	'召唤物/式鬼': ['真胤', 'zhenyin'],
	'召唤物/式鬼·壹': ['真胤', 'zhenyin'],
	'召唤物/式鬼·贰': ['真胤', 'zhenyin'],
	'召唤物/律.蛛母': ['尉遲良', 'yuchiliang'],
	'召唤物/律.蛛母·贰': ['尉遲良', 'yuchiliang'],
	'召唤物/昂昴': ['相胤', 'xiangyin'],
	'召唤物/梦种灯': ['白鹿', 'bailu'],
	'召唤物/独角仙': ['阿秋', 'aqiu'],
	'召唤物/独角仙·壹': ['阿秋', 'aqiu'],
	'召唤物/独角仙·贰': ['阿秋', 'aqiu'],
	'召唤物/白泽': ['尉遲慎', 'yuchishen'],
	'召唤物/秽土灵俑': ['鄲陰', 'danyin'],
	'召唤物/秽土灵俑·壹': ['鄲陰', 'danyin'],
	'召唤物/秽土灵俑·贰': ['鄲陰', 'danyin'],
	'召唤物/雷晶分身': ['上官玥', 'shangguanyue'],
	'召唤物/驺吾': ['尉遲慎', 'yuchishen'],
};


const bili_summon_rawres = await Promise.all(
	bili_summon_names.map(async (summon_name) => {
		return fetch_limit(() => fetch_with_cached({
			url: get_bili_data_url(summon_name),
			cached_path: `./task/rawres/bili/${summon_name}.res.json`,
			is_json: true,
			ignore_cached: FORCE_FETCH,
			sleep_time: random_time(1000, 3000),
		}))
	})
);

const bili_summon_raw_data = bili_summon_rawres.map((i, index) => ({
	path: bili_summon_names[index],
	...bilidata_to_obj(i.query.data),
}));


let summon_data = [];
let summon_skills = [];
let matched_subskills = [];
for (const summon of bili_summon_raw_data) {

	// fetch inherent
	const inherent_name = summon['天赋'];
	const inherent_res = await fetch_with_cached({
		url: get_bili_data_url('天赋/' + inherent_name),
		cached_path: `./task/rawres/bili/天赋/${inherent_name}.res.json`,
		is_json: true,
		ignore_cached: FORCE_FETCH,
		sleep_time: random_time(1000, 3000),
	});
	const inherent_props = bilidata_to_obj(inherent_res.query.data);



	// async fetch skill
	const skill_names = [].concat(summon['绝学']);
	let skills = [];
	for (const skill_name of skill_names) {
		const _skill_res = await fetch_with_cached({
			url: get_bili_data_url('绝学/' + skill_name),
			cached_path: `./task/rawres/bili/绝学/${skill_name}.res.json`,
			is_json: true,
			ignore_cached: FORCE_FETCH,
			sleep_time: random_time(1000, 3000),
		});
		const _skill_data = bilidata_to_obj(_skill_res.query.data);
		const _skill_desc = remove_html_tag(_skill_data['绝学描述']);

		let sub_skills;

		if (_skill_desc.includes('切换') && _skill_desc.match(/「[^」]+」/)) {
			const subskills_name = _skill_desc.match(/「[^」]+」/gm).map((i) => i.replace(/[「」]/g, ''));
			matched_subskills.push(subskills_name);


			for (let subskill_name of subskills_name) {
				const _subskill_res = await fetch_with_cached({
					url: get_bili_data_url('绝学/' + subskill_name),
					cached_path: `./task/rawres/bili/绝学/${subskill_name}.res.json`,
					is_json: true,
					ignore_cached: FORCE_FETCH,
					sleep_time: random_time(1000, 3000),
				});
				const _subskill_data = bilidata_to_obj(_subskill_res.query.data);
				if (!sub_skills) {
					sub_skills = [];
				}
				const cd = parseInt(_subskill_data['绝学冷却']);
				sub_skills = [...sub_skills, {
					name: subskill_name,
					// cost: _subskill_data['绝学消耗'],
					...(cd ? { cd} : {}),
					// cd: parseInt(_subskill_data['绝学冷却']),
					shoot: _subskill_data['绝学射程'],
					range: _subskill_data['绝学范围'],
					type: _subskill_data['绝学类别'],
					desc: remove_html_tag(_subskill_data['绝学描述']),
				}];
			}
		}

		const cd = parseInt(_skill_data['绝学冷却']);
		summon_skills.push({
			name: skill_name,
			// cost: _skill_data['绝学消耗'],
			...(cd ? { cd} : {}),
			// cd: parseInt(_skill_data['绝学冷却']),
			shoot: _skill_data['绝学射程'],
			range: _skill_data['绝学范围'],
			type: _skill_data['绝学类别'],
			desc: _skill_desc,
			// o: _skill_data,
			...(sub_skills ? { sub_skills } : {}),
		});
	}



	summon_data.push({
		key: encodeURIComponent(summon.path),
		name: summon.path.replace('召唤物/', ''),
		owner: owner[summon.path] ?? '',
		inherent_name,
		inherent: remove_html_tag(inherent_props['天赋6星']),
		stats: summon['属性'].split(',').map((i) => parseInt(i) || 0), // hp, atk_phy, atk_mag, atk_mag, atk_mag
		prop: summon['属相'],
		career: summon['职业'],
		range: +summon['射程'],
		speed: +summon['移动'],
		skill_names,
	});
}

// overrides

{
	// workaround: fix 式鬼
	let target = summon_data.find((i) => i.name?.startsWith('式鬼'));
	summon_data.forEach(sss => {
		if (sss.name?.startsWith('式鬼')) {
			sss.speed = 5;
			sss.range = 1;
			sss.career = '御风';
		}

		if (sss.name === '冥渊魁王') {
			sss.career = 'boss';
		}

		if (sss.name === '梦种灯') {
			sss.speed = 3;
			sss.range = 0;
		}
	});
}


{
	// workaround: add 劍聖|召喚物/天劍
	summon_data.push({
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
	summon_skills.push(...[
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
	// workaround: add 夜無陵|召喚物/九黎悍士
	summon_data.push({
		key: '召喚物/九黎悍士',
		name: '九黎悍士',
		owner: ['夜無陵', 'yewuling'],
		inherent_name: '捐身循義',
		inherent:
			'免傷提高15%。行動結束時，對夜無陵施加1層「徇義」狀態(上限15層)。\n「徇義」：除氣血外全屬性提高2%。',
		stats: [100, 100, 100, 100, 100, 100],
		prop: '暗',
		career: '鐵衛',
		range: 1,
		speed: 3,
		skill_names: ['頂踵盡捐', '抱令守盟', '地禦符'],
	});
	summon_skills.push(...[
		{
			name: '頂踵盡捐',
			cd: 2,
			shoot: '自身',
			range: '菱形3格',
			type: '物攻傷害',
			desc: '[被動]若被夜無陵獻祭，對自身3格範圍內敵人造成1次「固定傷害」(自身當前氣血的20%)，並施加1個隨機「有害狀態」。\n[主動]損耗自身當前氣血20%(無法免疫)，對範圍內敵人造成「固定傷害」，傷害值為釋放者消耗的氣血。並施加1個 隨機「有害狀態」。絕學後立刻死亡。',
		},
		{
			name: '抱令守盟',
			cd: 2,
			shoot: '自身',
			range: '單體',
			type: '主動',
			desc: '[被動]代替相鄰1格內友方承受攻擊。\n[主動]護衛範圍提高到2格，自身獲得1個隨機「有益狀態」和「復仇」狀態，持續2回合。',
		},
		{
			name: '地禦符',
			type: '被動',
			desc: '行動結束時，使相鄰1格內物防屬性最高的1個其他友方施加「披甲I」狀態，持續1回合。',
		},
	]);
}

{
	// workaround: add 上官玥|召喚物/雷晶分身
	summon_data.push({
		key: '召喚物/雷晶分身',
		name: '雷晶分身',
		owner: ['上官玥', 'shangguanyue'],
		inherent_name: '玲瓏妙心',
		inherent:
			'主動攻擊物攻提高15%。\n若氣血大於等於80%，物理免傷提高20%且主動普攻觸發「追擊」（0.5倍傷害）。\n主動攻擊若造成暴擊，則行動結束時為自身召喚物/召喚者施加「蓄電」狀態。\n若不攜帶「離魂」狀態，受到致命傷害免除死亡，氣血恢復50%，並永久進入「離魂」狀態。\n場上不存在友方「雷晶分身」時，行動結束前可選擇使用絕學「凝雷聚形」（間隔4回合觸發）',
		stats: [100, 140, 100, 100, 100, 100],
		prop: '雷',
		career: '俠客',
		range: 1,
		speed: 3,
		skill_names: ['雷晶護體', '輕身', '流霆'],
	});
	summon_skills.push(...[
		{
			name: '雷晶護體',
			type: '被動',
			desc: '遭受範圍傷害、固定傷害降低20%。\n若自身處於「離魂」狀態，遭受「固定傷害」額外降低30%。',
		},
		{
			name: '輕身',
			type: '被動',
			desc: '永久獲得輕功能力，可以翻越障礙。',
		},
		{
			name: '流霆',
			type: '被動',
			desc: '追擊傷害提升30%，主動攻擊「對戰後」恢復自身氣血，恢復量為本次傷害的30%。\n若本回合發起過攻擊，行動結束時使自身召喚物/召喚者移除「移動力限制」狀態，並施加「奮起」狀態，持續2回合。',
		},
	]);
}

{
	// workaround: add 瑚兒|召喚物/公主親從
	summon_data.push({
		key: '召喚物/公主親從',
		name: '公主親從',
		owner: ['瑚兒', 'huer'],
		inherent_name: '公主親從?',
		inherent: '免傷提高15%。法攻的75%額外附加到物攻上。拾取的「御禮奇珍」獲得「有益狀態」數量+1。\n若本回合拾取過友方「御禮奇珍」,行動結束時使「瑚兒」隨機絕學冷卻-1。\n自身在場時,「瑚兒」受到致命傷害時免除死亡且氣血恢復50%,若成功觸發, 「公主親從」自身死亡。',
		stats: [140, 100, 100, 100, 100, 100],
		prop: '冰',
		career: '俠客',
		range: 1,
		speed: 3,
		skill_names: ['公主親從-誓死捍衛', '承令援助', '受賞'],
	});
	summon_skills.push(...[
		{
			name: '公主親從-誓死捍衛',
			cd: 2,
			shoot: '自身',
			range: '單體',
			type: '主動',
			desc: '[被動]代替相鄰1格內友方承受攻擊。\n[主動]護衛範圍提高到2格,持續2回合,並獲得「衛主」狀態。\n「衛主」:免傷、物防提高20%，遭受攻擊後移除。',
		},
		{
			name: '承令援助',
			cd: 2,
			shoot: 5,
			range: '單體',
			type: '支援',
			desc: '對單個其他友方釋放，將自身所有「有益狀態」轉移給目標並轉移目標2個「有害狀態」至自身，且自身本回合拾取的友方「御禮奇珍」效果將施加於目標。若本回合拾取過友方「御禮奇珍」，行動結束時本絕學冷卻-1。',
		},
		{
			name: '受賞',
			type: '被動',
			desc: '[被動]若本回合未遭受攻擊，則下回合開始時使自身「有益狀態」等級+1。',
		},
	]);

	// workaround: add 瑚兒|召喚物/帝姬侍女
	summon_data.push({
		key: '召喚物/帝姬侍女',
		name: '帝姬侍女',
		owner: ['瑚兒', 'huer'],
		inherent_name: '帝姬侍女?',
		inherent: '治療效果提高15%。拾取的「御禮奇珍」獲得「有益狀態」等級+1。\n若本回合拾取過友方「御禮奇珍」，行動結束時使「瑚兒」隨機絕學冷卻-1。\n自身在場時，「瑚兒」受到致命傷害時免除死亡且氣血恢復50%，若成功觸發，「帝姬侍女」自身死亡。',
		stats: [100, 100, 100, 100, 100, 100],
		prop: '光',
		career: '祝由',
		range: 2,
		speed: 3,
		skill_names: ['氣愈之術', '奉命賜福', '受賞'],
	});
	summon_skills.push(...[
		{
			name: '氣愈之術',
			cd: 0,
			shoot: 3,
			range: '單體',
			type: '治療',
			desc: '主動使用，恢復單個角色氣血(恢復量為施術者法攻的1.5倍)，驅散1個「有害狀態」。',
		},
		{
			name: '奉命賜福',
			cd: 2,
			shoot: 5,
			range: '單體',
			type: '支援',
			desc: '對單個其他友方釋放，將自身所有「有益狀態」轉移給目標並在目標周身2格內生成2個「御禮奇珍」，持續1回合，且自身本回合拾取的友方「御禮奇珍」效果將施加於目標。若本回合拾取過友方「御禮奇珍」，行動結束時本絕學冷卻-1。',
		},
	]);
}



const unique_summon_skills = uniq_array(summon_skills, 'name', 'desc')
	.sort((a, b) => {
		return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
	});

summon_data.sort((a, b) => {
	return a.owner[1].localeCompare(b.owner[1], undefined, { numeric: true, sensitivity: 'base' });
})

const all_data = { summons: summon_data, skills: unique_summon_skills };

outputJSON({
	json: bili_summon_raw_data,
	fn: `./task/rawres/_bili-summon-data.res.json`,
	cn2tw: false,
});
outputJSON({
	json: matched_subskills,
	fn: `./task/rawres/__bili-matched_subskills.json`,
	cn2tw: false,
});

outputJSON({
	json: all_data,
	fn: `./task/rawres/summons.json`,
	cn2tw: true,
});
outputJSON({
	json: all_data,
	fn: './src/lib/data/summons.min.json',
	space: 0,
	cn2tw: true,
});