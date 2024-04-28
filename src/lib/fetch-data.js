const domains = {
	cn: 'tdj-activity.zlongame.com',
	// cn: 'tdj-activitytest.zlongame.com', // test
	tw: 'tdj-activity.game-beans.com',
	// tw: 'tdj-activitytest.game-beans.com', // test
};

const refs = [
	{
		title: 'Official (zh-tw)',
		link: 'https://www.game-beans.com/userinfo/tdj/index.html',
		target: '_officail_tw',
	},
	{
		title: 'Official (zh-cn)',
		link: 'https://www.zlongame.com/userinfo/tdj/index.html',
		target: '_officail_cn',
	}, {
		title: 'Bili-Wiki',
		link: 'https://wiki.biligame.com/tdj/',
		target: '_biliwiki',
	},
];

export function get_refs(io) {
	return refs.filter((i, index) => io[index]);
}

const PROXY = [
	{
		get_proxy_url: (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
		fetch: async (url) =>
			fetch(url)
				.then((r) => r.json())
				.then((data) => {
					data = JSON.parse(data?.contents);
					console.log('fetch role.cn', data);
					return data.data?.data[0];
				}),
	},
	{
		get_proxy_url: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
		fetch: async (url) =>
			fetch(url)
				.then((r) => r.text())
				.then((data) => {
					data = JSON.parse(data);
					console.log('fetch role.tw', data);
					return data.data?.data[0];
				}),
	},
][1];

export async function fetch_role_detail(role) {
	let _url = role.pinyin_tw ? get_role_url(role.pinyin_tw, 'tw') : get_role_url(role.pinyin, 'cn');

	return PROXY.fetch(_url);
}

function get_role_url(name, lang) {
	return get_url({ module: 'hero', type: 'detail', query: name }, lang);
}

export function get_url(qs_obj = {}, lang = 'cn') {
	qs_obj = {
		...{
			id: lang === 'cn' ? 0 : 1,
			action: 'info',
			module: 'hero',
			type: 'basic',
		},
		...qs_obj,
	};
	let qs = new URLSearchParams();

	for (let key in qs_obj) {
		qs.set(key, qs_obj[key]);
	}

	let url = `https://${domains[lang]}/tdj/data/mQuery.do?${qs.toString()}`;
	// let proxy_url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
	// let proxy_url = `https://corsproxy.io/?${encodeURIComponent(url)}`;
	let proxy_url = PROXY.get_proxy_url(url);

	return proxy_url;
}
