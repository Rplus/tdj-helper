import fs from 'fs';
import pLimit from 'p-limit';
import {
	// raw_data,
	outputJSON,
	fetch_with_cached,
	pick_obj,
	remove_html_tag,
	converter,
	converter_tw2cn,
	uniq_array,
	random_time,
	get_bili_data_url,
	bilidata_to_obj,
	read_json_file,
} from './u.mjs';

// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');

const all_role_details = read_json_file('./task/rawres/_all_role_details.raw.json');


let all_skill = [];
all_role_details.forEach(i => {
	const role = i.data.data[0];
	if (!role.skill) {
		console.log('no skill', role.name);
		return;
	}

	all_skill = all_skill.concat(
		role.skill.map(i => {
			let o = pick_obj(i, ['img', 'name', 'type', 'cd', 'cost', 'shoot', 'range', 'way', 'desc',])
			o.desc = remove_html_tag(o.desc);
			return o;
		})
	);
})


const all_skill_hant = JSON.parse(converter(JSON.stringify(
	all_skill.toSorted((a, b) => {
		// localeCompare 可以正確處理字串與數字混合的情況
		return a.img.localeCompare(b.img, undefined, { numeric: true, sensitivity: 'base' });
	})
)));

const unique_all_skill = uniq_array(all_skill_hant, 'name', 'img');

outputJSON({
	json: all_skill_hant,
	fn: './task/rawres/__skills.hant.json',
	cn2tw: true,
});
outputJSON({
	json: unique_all_skill,
	fn: './task/rawres/__uni_skills.hant.json',
	cn2tw: true,
});


// =================
// === subskills ===
// =================

// query subkills
const subskills = unique_all_skill.filter(i => i.desc.includes('切換') && i.desc.match(/「[^」]+」/))
	.map(i => {
		let kwd = i.desc.match(/「[^」]+」/gm).map((i) => `'${i.replace(/[「」]/g, '')}'`).join(', ');
		let x__x = `{ main: '${i.name}', sub: [${kwd}], },`;
		return {
				name: i.name,
				desc: i.desc,
				x__x,
			}
	});
outputJSON({
	json: subskills,
	fn: './task/rawres/__潛在subskills.json',
	cn2tw: true,
});




const subskills_whitelist = [
	{ main: '追風趕月', sub: ['逐星破日'] },
	{ main: '雷引萬宇', sub: ['天閃亂魂'] },
	{ main: '喜鵲穿枝', sub: ['細葉扶刃'] },
	{ main: '憤怒淵藪', sub: ['奪駭冥掌'] },
	{ main: '踏步炎斬', sub: ['穿陽連斬'] },
	{ main: '決戰無雙', sub: ['炎燼裂凶'] },
	{ main: '蠻荒戰技', sub: ['撕筋掠血', '剔骨掏心'] },
	{ main: '急召律令', sub: ['真炎律令', '天雷律令'] },
	{ main: '萬寶靈符', sub: ['顯形慧印', '道炁如壁'] },
	{ main: '小而無相', sub: ['怨生剛愎', '山魈索魂'] }, // by hand
	{ main: '三衍劍訣', sub: ['天玄劍法', '破魔劍法', '御劍心法'] },
	{ main: '肉身成聖', sub: ['天目清曜', '天目煥赫'] },
	{ main: '靈劍點隙', sub: ['飛花勢', '疊浪勢', '遊螢勢'] },
	{ main: '折刃貫空', sub: ['透骨同悲'] },
	{ main: '劍心出鞘', sub: ['峙石藏鋒', '天霜一線', '千里戲風'] },
	{ main: '攝法聚神', sub: ['凶蝕之輪'] }, // by hand
];

let subskills_data = [];

for (const sss of subskills_whitelist) {
	for (const subskill_name of sss.sub) {
		// fetch defailt subskill
		const cn_name = converter_tw2cn(subskill_name);
		const _res = await fetch_with_cached({
			url: get_bili_data_url('绝学/' + cn_name),
			cached_path: `./task/rawres/bili/绝学/${cn_name}.res.json`,
			is_json: true,
			ignore_cached: FORCE_FETCH,
			sleep_time: random_time(1000, 3000),
		});
		const _data = bilidata_to_obj(_res.query.data);
		const cd = parseInt(_data['绝学冷却']);

		subskills_data.push({
			name: subskill_name,
			switch: sss.main,
			cost: _data['绝学消耗'],
			...(cd ? { cd } : {}),
			shoot: _data['绝学射程'],
			range: _data['绝学范围'],
			type: _data['绝学类别'],
			desc: remove_html_tag(_data['绝学描述']),
			// o: _data, // debug
		})
	}
}



outputJSON({
	json: subskills_data,
	fn: './task/rawres/_subskills_data.json',
	// space: 0,
	cn2tw: true,
});
