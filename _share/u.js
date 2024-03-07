
export function resize_img(url, size = 128) {
	if (!url) {
		return '';
	}
	return `https://wsrv.nl/?&w=${size}&h=${size}&we&il&output=webp&url=${url}`;
}

const STORAGE_KEY = 'TDJ-HELPER';
export function saveItem(data) {
	if (!data || !data.key) { return false;}
	let odata = getItem() || {};

	odata[data.key] = data.value;

	localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
};

export function getItem(key) {
	let data = localStorage.getItem(STORAGE_KEY);
	if (!data) { return null; }
	data = JSON.parse(data);

	return key ? data[key] : data;
};