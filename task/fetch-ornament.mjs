import fs from 'fs';
import { raw_data, outputJSON, fetch_with_cached, pick_obj } from './u.mjs';

// const FORCE_FETCH = false;
// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');

raw_data.ornaments.rawdata = await fetch_with_cached({
	url: raw_data.ornaments.url(),
	cached_path: raw_data.ornaments.cached_path,
	is_json: true,
	ignore_cached: FORCE_FETCH,
});

raw_data.ornaments_tw.rawdata = await fetch_with_cached({
	url: raw_data.ornaments_tw.url(),
	cached_path: raw_data.ornaments_tw.cached_path,
	is_json: true,
	ignore_cached: FORCE_FETCH,
});

outputJSON({
	json: raw_data.ornaments.rawdata,
	fn: `${raw_data.ornaments.fn}.op.json`,
	cn2tw: false,
});

outputJSON({
	json: raw_data.ornaments_tw.rawdata,
	fn: `${raw_data.ornaments_tw.fn}.op.json`,
	cn2tw: false,
});

// check diff icons between tw & cn
const tw_icons_set = new Set(
  raw_data.ornaments_tw.rawdata.data.data.map(o => o.icon)
);

const cn_only_icons = raw_data.ornaments.rawdata.data.data
  .filter(orna_cn => !tw_icons_set.has(orna_cn.icon))
  .map(orna => orna.icon);

const new_ornaments_name = cn_only_icons.concat([...tw_icons_set]);

const ornaments_reordered = reorder_array(raw_data.ornaments.rawdata.data.data, new_ornaments_name);

const ornaments = ornaments_reordered.map((item) => {
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
	return overrides(o);
});

const op = {
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
	// items: raw_data.ornaments.rawdata.data.data.map((item) => {
	items: ornaments,
};


outputJSON({
	json: op,
	fn: './task/rawdata/ornaments.src.json',
	cn2tw: true,
});
outputJSON({
	json: op,
	fn: './src/lib/data/ornaments.min.json',
	space: 0,
	cn2tw: true,
});

// orna data checking
function reorder_array(arr, name_order) {
	const name_map = new Map(name_order.map((name, index) => [name, index]));

	return arr.sort((a, b) => {
		const index_a = name_map.get(a.icon) ?? Infinity;
		const index_b = name_map.get(b.icon) ?? Infinity;
		return index_a - index_b;
	});
}


function overrides(o) {

	// fix data, workaround
	switch (o.icon) {
		// 淵魚金令
		case 'Equip_yuanyujinling':
			// old 010100
			o.type = '000000'; // without any buff for property
			break;

		// 飛鳳墜飾
		case 'Equip_feifengzhuishi':
			// old 100000
			o.type = '000000'; // without any buff for property
			break;

		// 瓊瞳靈戒
		case 'Equip_qiongtonglingjie':
			// old '111101'
			o.type = '000001'; // 氣血only
			break;

		// 諸懷腕帶
		case 'Equip_zhuhuaiwandai':
			// old: 111101
			o.type = '000000'; // without any buff for property
			break;

		// // 九色鹿冠
		// case 'Equip_jiuseluguan':
		// 	// old 000010
		// 	if (o.type === '001001') {
		// 		console.log(1111, '竟然更新修正了！');
		// 	}
		// 	o.type = '001001'; // 000010 => 001001
		// 	break;

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
}