import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { folder_commit_sha, } from '$lib/data/version.json';

export const memory_cache = new Map();
const CACHE_NAME = 'tdj-role-detail-v1';

// https://www.telerik.com/blogs/client-caching-sveltekit
export async function cache_fetch(key = '', fetch_callback) {
	if (browser && cache.has(key)) {
		return cache.get(key);
	}

	const result = await fetch_callback();

	cache.set(key, result);

	return result;
}

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
	},
	{
		title: 'BWIKI',
		link: 'https://wiki.biligame.com/tdj/',
		target: '_BWIKI',
	},
];

export function get_refs(io) {
	return refs.filter((i, index) => io[index]);
}

const PROXY = [
	/*
	{ // too slow
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
	{ // need plan after 2026-01-25
		get_proxy_url: (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
		fetch: async (url) =>
			fetch(url)
				.then((r) => r.text())
				.then((data) => {
					data = JSON.parse(data);
					console.log('fetch role.tw', data);
					return data.data?.data[0];
				})
				.catch((err) => {
					throw error(err);
				}),
	},
 	*/
	{ // direct
		get_proxy_url: (url) => url,
		fetch: async (url) =>
			fetch(url)
				.then((r) => r.text())
				.then((data) => {
					data = JSON.parse(data);
					return data?.data?.data?.[0];
				})
				.catch((err) => {
					throw error(err);
				}),
	},
][0];

export async function fetch_role_detail(role) {
	let raw_url = get_role_url_from_git(role);

	if (browser && memory_cache.has(raw_url)) {
		return memory_cache.get(raw_url);
	}

	const fetch_promise = _fetch_role_detail_core(role, raw_url);
	if (browser) {
		memory_cache.set(raw_url, fetch_promise);

		// 如果抓失敗（例如斷網拋錯），清掉記憶體紀錄，讓使用者下次點擊可以重試
		fetch_promise.catch(() => {
			memory_cache.delete(raw_url);
		});
	}
	return fetch_promise;
}

export async function clear_caches() {
	if (!('caches' in window)) return;
	const cacheNames = await caches.keys();
	await Promise.all(cacheNames.map((name) => caches.delete(name)));
	console.log('已清空所有 Cache Storage:', cacheNames);
}

async function _fetch_role_detail_core(role, raw_url) {
	// 1. 非瀏覽器環境或無痕模式不支援 caches，直接抓
	if (!browser || typeof caches === 'undefined') {
		return await PROXY.fetch(raw_url);
	}

	// 使用原生 URL 解析路徑與版本參數（加上 origin 作為相對路徑防呆）
	const parsed_url = new URL(raw_url, window.location.origin);
	const cache_key = parsed_url.pathname;
	const current_version = parsed_url.searchParams.get('version') || '';

	try {
		const storage = await caches.open(CACHE_NAME);

		// 1. 使用 pathname 查詢硬碟快取
		const cached_res = await storage.match(cache_key);
		if (cached_res) {
			// console.log('cached_res', cached_res);
			const cached_version = cached_res.headers.get('X-Version');
			if (current_version && cached_version === current_version) {
				return await cached_res.json();
			}
		}

		// 2. 沒快取或版本更新，發送網路請求
		const role_data = await PROXY.fetch(raw_url);

		// console.log('PROXY.fetch');
		if (role_data && role_data.name) {
			try {
				await storage.put(
					cache_key,
					new Response(JSON.stringify(role_data), {
						headers: {
							'Content-Type': 'application/json',
							'X-Version': current_version
						}
					})
				);
			} catch (put_err) {
				console.warn('寫入快取失敗:', put_err);
			}
		}

		return role_data;
	} catch (err) {
		return await PROXY.fetch(raw_url);
	}

	return _data;
}

export function get_role_url_without_proxy(name, lang) {
	return get_url({
		module: 'hero',
		type: 'detail',
		query: name, // pinyin
	}, lang);
}

// const JSON_PATH = 'https://raw.githubusercontent.com/Rplus/tdj-helper/refs/heads/sveltekit/task/rawdata/tdj';
const JSON_PATH = {
	cdn: 'https://cdn.jsdelivr.net/gh/Rplus/tdj-data@data/_cache/tdj-roles',
	github: 'https://raw.githubusercontent.com/Rplus/tdj-data/refs/heads/data/_cache/tdj-roles',
	local: `/local-json`,
};

export function get_role_url_from_git(role, source) {
	let _fn = role.pinyin_tw ? `${role.name}.tw.json` : `${role.path}.cn.json`;

	if (import.meta.env.DEV && !source) {
		source = 'local';
	}

	let path = JSON_PATH[source] || JSON_PATH.cdn;

	return `${path}/${_fn}?version=${folder_commit_sha}`;
}

function get_role_url(name, lang) {
	let _url = get_role_url_without_proxy(name, lang);
	return PROXY.get_proxy_url(_url);
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

	return url;

	// let proxy_url = PROXY.get_proxy_url(url);
	// return proxy_url;
}

