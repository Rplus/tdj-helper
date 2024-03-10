const domains = {
	cn: 'tdj-activity.zlongame.com',
	// cn: 'tdj-activitytest.zlongame.com', // test
	tw: 'tdj-activity.game-beans.com',
	// tw: 'tdj-activitytest.game-beans.com', // test
};

export async function fetch_role_detail(role) {
	let _url = role.pinyin_tw ? get_role_url(role.pinyin_tw, 'tw') : get_role_url(role.pinyin, 'cn');

	return fetch(_url)
		.then((r) => r.json())
		.then((data) => {
			data = JSON.parse(data?.contents);
			// console.log(222, data);
			return data.data?.data[0];
		});
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
	let proxy_url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

	return proxy_url;
}
