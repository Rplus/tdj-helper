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

export function resize_imgs(url = '', sizes = [128]) {
	return sizes.map((size) => resize_img(url, size));
}

const img_folders = {
	cn: 'https://media.zlongame.com/media/news/cn/tdj/info/data',
	tw: 'https://tw-media.game-beans.com/media/pictures/tdj/info/data',
};

export function clear_html(html = '') {
	return html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').replace(/。(?!）)+(.)/g, '。\n$1');
}

export function remove_html_tag(html = '') {
	return html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}

export function get_img(type, name, size, lang = 'cn') {
	let src = `${img_folders[lang]}/${type}/${name}.png`;
	return resize_img(src, size);
}

export function get_imgs(type = '', name = '', sizes = [128], lang = 'cn') {
	return sizes.map((size) => get_img(type, name, size, lang));
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
