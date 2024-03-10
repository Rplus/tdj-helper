import { browser } from '$app/environment';
import { base } from '$app/paths';

// import.meta.env.BASE_URL
export function link(path = '') {
	return `${base}${path}`;
}

export function resize_img(url = '', size = 128) {
	if (!url) {
		return '';
	}
	return `https://wsrv.nl/?&w=${size}&h=${size}&we&il&output=webp&url=${url}`;
}

const STORAGE_KEY = 'TDJ-HELPER';
export function saveItem(data) {
	if (!data || !data.key) {
		return false;
	}
	let odata = getItem() || {};

	odata[data.key] = data.value;

	if (browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
	}
}

export function getItem(key) {
	let data = browser && localStorage.getItem(STORAGE_KEY);
	if (!data) {
		return null;
	}
	data = JSON.parse(data);

	return key ? data[key] : data;
}
