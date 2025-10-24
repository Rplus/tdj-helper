import * as OpenCC from 'opencc-js';
import { writeFile, outputJSON, } from './u.mjs';

const converter_cn_to_tw = OpenCC
	.ConverterFactory(OpenCC.Locale.from.cn, OpenCC.Locale.to.tw);

const converter_tw_to_cn = OpenCC
	.ConverterFactory(OpenCC.Locale.from.tw, OpenCC.Locale.to.cn);

let data = [
	{
		pinyin: 'liuwu',
		name: '流舞',
		skills: [
			{
				name: '裂空·流風',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/1/10/iarvyf7hil0tf4nub5ds2sh4up559o9.png/80px-%E7%BB%9D%E5%AD%A6_%E8%A3%82%E7%A9%BA%C2%B7%E6%B5%81%E9%A3%8E.png',
			},
		],
	},
	{
		pinyin: 'huanhaiminghuang',
		name: '幻海冥皇',
		skills: [
			{
				name: '魔戾渊相',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/8/86/4vm9fto5dgqt11hvi7gxlib32c3riuo.png/80px-%E7%BB%9D%E5%AD%A6_%E9%AD%94%E6%88%BE%E6%B8%8A%E7%9B%B8.png',
			},
		],
	},
	{
		pinyin: 'dierying',
		name: '第二瑛',
		skills: [
			{
				name: '卜命·禁',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/4/41/408sne3zdwrs0y7ani8qskowfzn11l2.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8D%9C%E5%91%BD%C2%B7%E7%A6%81.png',
			},
			{
				name: '卜命·行',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/a/ab/ehgx070tiai9kgplyxj36vux2y0dzzu.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8D%9C%E5%91%BD%C2%B7%E8%A1%8C.png',
			}
		],
	},
	{
		pinyin: 'yelvsha',
		name: '耶律纱',
		skills: [
			{
				name: '盾壓四方',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/1/11/l6rrygcojstli8k3vtxxoqvwkjjqyua.png/80px-%E7%BB%9D%E5%AD%A6_%E7%9B%BE%E5%8E%8B%E5%9B%9B%E6%96%B9.png',
			}
		],
	},
	// {
	// 	pinyin: 'yinchuangongzhu',
	// 	name: '銀川公主',
	// 	skills: [
	// 		{
	// 			name: '鳳起九遐',
	// 			img: 'https://patchwiki.biligame.com/images/tdj/thumb/6/6c/s3lq932sq67qyuwaou60o2grt5l17yp.png/80px-%E5%A4%A9%E8%B5%8B_%E4%BB%AA%E5%87%A4%E6%9B%9C%E5%AE%B8.png',
	// 		},
	// 		{
	// 			name: '鳳鳴於野',
	// 			img: 'https://patchwiki.biligame.com/images/tdj/thumb/6/6c/s3lq932sq67qyuwaou60o2grt5l17yp.png/80px-%E5%A4%A9%E8%B5%8B_%E4%BB%AA%E5%87%A4%E6%9B%9C%E5%AE%B8.png',
	// 		}
	// 	],
	// },
	{
		pinyin: 'youjiluzhaoyi',
		name: '幽姬鹿昭依',
		skills: [
			{
				name: '化腐生肌',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/cd/87p4bkmdp4v3ai5ydux4j7ei6oyluzn.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8C%96%E8%85%90%E7%94%9F%E8%82%8C.png',
			}
		],
	},
	{
		pinyin: 'qiongzhifusang',
		name: '琼枝扶桑',
		skills: [
			{
				name: '並枝同序',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/2/2c/nbdyxursupx477zsrp2i5utfp4pu0aa.png/80px-%E7%BB%9D%E5%AD%A6_%E5%B9%B6%E6%9E%9D%E5%90%8C%E5%BA%8F.png',
			}
		],
	},
	{
		pinyin: 'ziqi',
		name: '紫炁',
		skills: [
			{
				name: '幽爍憑神',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/cf/cdds0kttm6c8vy4m97p3bjwgkrj1y2v.png/80px-%E7%BB%9D%E5%AD%A6_%E5%B9%BD%E7%83%81%E5%87%AD%E7%A5%9E.png',
			}
		],
	},
	{
		pinyin: 'chibahanwusha',
		name: '赤魃韓無砂',
		skills: [
			{
				name: '洞若觀火·殺伐',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/e/ee/l7novmenhem0rv36m78zhserbnw3ym4.png/80px-绝学_洞若观火·杀伐.png',
			},
			{
				name: '洞若觀火·謀算',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/1/16/siiic75ib32xz84du8gdfhed7i6rg41.png/80px-绝学_洞若观火·谋算.png',
			},
			{
				name: '洞若觀火·蟄伏',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/0/03/oxixjk66jckd60unbv6fd59wbu6b5dd.png/80px-绝学_洞若观火·蛰伏.png',
			},
			{
				name: '烈炙封剎',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/e/ee/l7novmenhem0rv36m78zhserbnw3ym4.png/80px-绝学_洞若观火·杀伐.png',
			},
			{
				name: '殞火如織',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/e/ee/l7novmenhem0rv36m78zhserbnw3ym4.png/80px-绝学_洞若观火·杀伐.png',
			},
		],
	},
	{
		pinyin: 'sudaji',
		name: '蘇妲己',
		skills: [
			{
				name: '憑身化燭',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/a/ae/ew77q267an9e6amaoa1cuguivz1yjzn.png/80px-%E7%BB%9D%E5%AD%A6_%E5%87%AD%E8%BA%AB%E5%8C%96%E7%83%9B.png',
			}
		],
	},
	{
		pinyin: 'nezha',
		name: '哪吒',
		skills: [
			{
				name: '混天縛海',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/7/78/05ohbero2bz6xsilu8bghq2kng1thol.png/80px-%E7%BB%9D%E5%AD%A6_%E6%B7%B7%E5%A4%A9%E7%BC%9A%E6%B5%B7.png',
			}
		],
	},
	{
		pinyin: 'shuanghunyuxi',
		name: '雙魂虞兮',
		skills: [
			{
				name: '妖攜影',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/2/29/n01rabazy7d77jc606sm4afgofq1mye.png/80px-%E7%BB%9D%E5%AD%A6_%E5%A6%96%E6%90%BA%E5%BD%B1.png',
			},
			{
				name: '靈返光',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/c9/jlusm2gmi88uk5yxy547v3bdxh8h4ft.png/80px-%E7%BB%9D%E5%AD%A6_%E7%81%B5%E8%BF%94%E5%85%89.png',
			},
			{
				name: '諸靈退散',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/f/f6/q6fvjmpblg6pa65hnmlbu67zipuftor.png/80px-绝学_诸灵退散.png',
			},
			{
				name: '妖氛鎮魄',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/a/af/hya680sc8x7w6wnsuprxv0urqfkbvd2.png/80px-绝学_妖氛镇魄.png',
			},
			{
				name: '玄曄破封',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/6/62/dhnq4ppq1t4zh6avy2qf4fcp813b285.png/80px-绝学_玄晔破封.png',
			},
		],
	},
	{
		pinyin: 'yaokong',
		name: '瑤空',
		skills: [
			{
				name: '扶搖霄漢',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/c1/4uj7ggeq443o5qrsv85rf1ds0sf65co.png/80px-%E7%BB%9D%E5%AD%A6_%E6%89%B6%E6%91%87%E9%9C%84%E6%B1%89.png',
			}
		],
	},
	{
		pinyin: 'longmenghuayao',
		name: '朧夢嫿妖',
		skills: [
			{
				name: '鏡分虛實',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/c9/ir5gz9w4srpzb44l0j7mtnak10uua8d.png/80px-%E7%BB%9D%E5%AD%A6_%E9%95%9C%E5%88%86%E8%99%9A%E5%AE%9E.png',
			}
		],
	},
	{
		pinyin: 'baigufuren',
		name: '白骨夫人',
		skills: [
			{
				name: '以骨化形',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/ce/jwvey8aj1jlp20s61okkhgups0n7yig.png/80px-%E7%BB%9D%E5%AD%A6_%E4%BB%A5%E9%AA%A8%E5%8C%96%E5%BD%A2.png',
			}
		],
	},
	{
		pinyin: 'wukong',
		name: '悟空',
		skills: [
			{
				name: '七十二變',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/4/45/nnh2wvar8kd75y2vpxijma2lup2rpvu.png/80px-%E7%BB%9D%E5%AD%A6_%E4%B8%83%E5%8D%81%E4%BA%8C%E5%8F%98.png',
			}
		],
	},
	{
		pinyin: 'jingfeiyu',
		name: '驚飛羽',
		skills: [
			{
				name: '立刀勢',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/0/0b/aixfy30gm1aky6sfqcfa2ofeg21vee6.png/80px-%E7%BB%9D%E5%AD%A6_%E7%AB%8B%E5%88%80%E5%8A%BF.png',
			},
			{
				name: '橫刀勢',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/2/21/6t8k358spfk4ourgy9ny6cy9t1ckght.png/80px-%E7%BB%9D%E5%AD%A6_%E6%A8%AA%E5%88%80%E5%8A%BF.png',
			},
		],
	},
	{
		pinyin: 'xiangyin',
		name: '相胤',
		skills: [
			{
				name: '召喚封豨',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/b/b1/i96dwaf0ry8lj6imtnetjf01w2dvi32.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8F%AC%E5%94%A4%E5%B0%81%E8%B1%A8.png',
			},
			{
				name: '召喚昂昴',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/0/09/tapakidhgoxq0yuo4yxux81bvhx7o1p.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8F%AC%E5%94%A4%E6%98%82%E6%98%B4.png',
			},
		],
	},
	{
		pinyin: 'lucungaohuangjun',
		name: '祿存高皇君',
		skills: [
			{
				name: '折竹界',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/4/4a/ig7v90zeodlqkub1mn87zmyyb8nostn.png/80px-%E7%BB%9D%E5%AD%A6_%E6%8A%98%E7%AB%B9%E7%95%8C.png',
			},
			{
				name: '德慈界',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/cd/2mk0qsupko8eldfv6zxb6tdkp0cpi2l.png/80px-%E7%BB%9D%E5%AD%A6_%E5%BE%B7%E6%85%88%E7%95%8C.png',
			},
			{
				name: '雪重摺竹界',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/c/c5/jxdswyqrh7ie33myw2yr9grx108sa6h.png/80px-%E7%BB%9D%E5%AD%A6_%E9%9B%AA%E9%87%8D%E6%8A%98%E7%AB%B9%E7%95%8C.png',
			},
			{
				name: '冰心德慈界',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/5/5d/86qnvbpqb3xvd6gc3fuqp0v6vjjf6hw.png/80px-%E7%BB%9D%E5%AD%A6_%E5%86%B0%E5%BF%83%E5%BE%B7%E6%85%88%E7%95%8C.png',
			},
		],
	},
	{
		pinyin: 'yaoji',
		name: '瑤姬',
		skills: [
			{
				name: '種生',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/7/7c/nsyluz75jibeiwcoaaz6d1ilo2nom6g.png/80px-%E7%BB%9D%E5%AD%A6_%E7%A7%8D%E7%94%9F.png',
			},
			{
				name: '育殺',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/7/7e/apvxuyn9hu1o4199m59woeoupmqzgk8.png/80px-%E7%BB%9D%E5%AD%A6_%E8%82%B2%E6%9D%80.png',
			}
		],
	},
	{
		pinyin: 'jiyuefeitian',
		name: '伎樂飛天',
		skills: [
			{
				name: '光·自在',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/a/a0/oicgyl3a07jef4h396xy7ywu619v97v.png/80px-%E7%BB%9D%E5%AD%A6_%E5%85%89%C2%B7%E8%87%AA%E5%9C%A8.png',
			},
			{
				name: '雷·自在',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/8/88/ftntcrl12g2wrgjmjte3dgufwxy032h.png/80px-%E7%BB%9D%E5%AD%A6_%E9%9B%B7%C2%B7%E8%87%AA%E5%9C%A8.png',
			},
			{
				name: '梵音超度',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/0/0a/4t64e9el90xfnvtx5cg0dwajh04r1er.png/80px-%E7%BB%9D%E5%AD%A6_%E6%A2%B5%E9%9F%B3%E8%B6%85%E5%BA%A6.png',
			},
			{
				name: '往生礼赞',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/f/fc/nki8x2xtbfk57yxnmq7flj6f390p6fm.png/80px-%E7%BB%9D%E5%AD%A6_%E5%BE%80%E7%94%9F%E7%A4%BC%E8%B5%9E.png',
			},
			{
				name: '罗刹道',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/b/b1/oqko5v17uwy10au8vrekcky6bmgz0yw.png/80px-%E7%BB%9D%E5%AD%A6_%E7%BD%97%E5%88%B9%E9%81%93.png',
			},
			{
				name: '嘆妙伽藍',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/6/69/82wwmo1h01tzghgpxmxulr55envjt6l.png/80px-%E7%BB%9D%E5%AD%A6_%E5%8F%B9%E5%A6%99%E4%BC%BD%E8%93%9D.png',
			},
		],
	},
	{
		pinyin: 'shuangshuang',
		name: '雙雙',
		skills: [
			{
				name: '關切',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/b/bb/pujx7nh40xp1utd82exxkml07vnz9co.png/80px-%E7%BB%9D%E5%AD%A6_%E5%85%B3%E5%88%87.png',
			},
			{
				name: '授業',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/1/1f/bso99ds5e79iacn8999msu9l4zkv89w.png/80px-%E7%BB%9D%E5%AD%A6_%E6%8E%88%E4%B8%9A.png',
			}
		],
	},
	{
		pinyin: 'gongsunqiyue',
		name: '公孫七月',
		skills: [
			{
				name: '橫財',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/4/42/4ks3lro72qet9mtml5bdmkoeyet9xui.png/80px-%E7%BB%9D%E5%AD%A6_%E6%A8%AA%E8%B4%A2.png',
			},
			{
				name: '迷竅',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/1/1f/bso99ds5e79iacn8999msu9l4zkv89w.png/80px-%E7%BB%9D%E5%AD%A6_%E6%8E%88%E4%B8%9A.png',
			}
		],
	},
	{
		pinyin: 'qing',
		name: '青',
		skills: [
			{
				name: '復初',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/d/d1/5nqc2xr6txj30filaw8fp0p4o7heosx.png/80px-%E7%BB%9D%E5%AD%A6_%E5%A4%8D%E5%88%9D.png',
			},
		],
	},
	{
		pinyin: 'zhuoer',
		name: '卓爾',
		skills: [
			{
				name: '挑撥離間',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/0/0d/h7enwbtoshrfh6i4h5eu2rc1d2780oq.png/80px-%E7%BB%9D%E5%AD%A6_%E6%8C%91%E6%8B%A8%E7%A6%BB%E9%97%B4.png',
			},
			{
				name: '傳風煽火',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/9/97/3somc4hhl65eqh3dnmgijxune6kqu9k.png/80px-%E7%BB%9D%E5%AD%A6_%E4%BC%A0%E9%A3%8E%E7%85%BD%E7%81%AB.png',
			},
			{
				name: '聚眾成勢',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/f/fb/nyb5524jq8d09d9deyd93txphj60a9p.png/80px-%E7%BB%9D%E5%AD%A6_%E8%81%9A%E4%BC%97%E6%88%90%E5%8A%BF.png',
			},
		],
	},
	{
		pinyin: 'jiuyin',
		name: '九陰',
		skills: [
			{
				name: '一世願·戒忌',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/3/39/g6bgda2p1rcchax46z7vzk5knttmskc.png/80px-%E7%BB%9D%E5%AD%A6_%E4%B8%80%E4%B8%96%E6%84%BF%C2%B7%E6%88%92%E5%BF%8C.png',
			},
			{
				name: '二世願·守護',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/3/36/j8fzuik7d70p8o6axr3e1lrhqkm34wf.png/80px-%E7%BB%9D%E5%AD%A6_%E4%BA%8C%E4%B8%96%E6%84%BF%C2%B7%E5%AE%88%E6%8A%A4.png',
			},
			{
				name: '三世願·共念',
				img: 'https://patchwiki.biligame.com/images/tdj/thumb/e/ef/dp95kz41653w8drhlty7rfldhxu0krg.png/80px-%E7%BB%9D%E5%AD%A6_%E4%B8%89%E4%B8%96%E6%84%BF%C2%B7%E5%85%B1%E5%BF%B5.png',
			},
		],
	},
];

export function get_addition_skills_cn_names() {
	return data.map(role =>
			role.skills.map(s => converter_tw_to_cn(s.name))
		).flat();
}

let op_data = data.reduce((all, role) => {
	all[role.pinyin] = role.skills.map(s => ({
		...s,
		img: s.img.split('/80px')[0].replace('thumb/', '').replace('https://patchwiki.biligame.com/images/tdj', ''),
	}));
	return all;
}, {});

// data.forEach(item => {
// 	item.name = converter_cn_to_tw(item.name)
// 	item.skills = item.skills.map(ss => {
// 		return {
// 			name: converter_cn_to_tw(ss.name),
// 			// img: decodeURIComponent(ss.img),
// 			img: ss.img.split('/80px')[0].replace('thumb/', '').replace('https://patchwiki.biligame.com/images/tdj', ''),
// 		}
// 	})
// })

op_data['xingzhanxianzhe'] = [
	{ name: '天樞', img: '/2/2a/5b9knp5ywnyuepnq6pjrmw2recvi9qf.png', },
	{ name: '天權', img: '/2/2a/5b9knp5ywnyuepnq6pjrmw2recvi9qf.png', },
	{ name: '玉衡', img: '/2/2a/5b9knp5ywnyuepnq6pjrmw2recvi9qf.png', },
	{ name: '開陽', img: '/2/2a/5b9knp5ywnyuepnq6pjrmw2recvi9qf.png', },
	{ name: '瑤光', img: '/2/2a/5b9knp5ywnyuepnq6pjrmw2recvi9qf.png', },
];

op_data['yinchuangongzhu'] = [
	{ name: '鳳起九遐', img: '/6/6c/s3lq932sq67qyuwaou60o2grt5l17yp.png', },
	{ name: '鳳鳴於野', img: '/6/6c/s3lq932sq67qyuwaou60o2grt5l17yp.png', },
];

op_data['shangguanyue'] = [
	{ name: '凝雷聚形', img: '/d/d3/rpqffdxh0aem8i8gugompfh51vs2r4e.png', },
];

op_data['zhaoyun'] = [
	{ name: '無雙戰魂', img: '/2/28/sq6jkqog6j0o7j2rd1lfpd4t9yt7mbz.png', },
];

outputJSON({
	json: op_data,
	fn: './task/rawdata/addition_skills.json',
	space: 2,
	cn2tw: true,
});

outputJSON({
	json: op_data,
	fn: './src/lib/data/addition_skills.min.json',
	space: 0,
	cn2tw: true,
});

