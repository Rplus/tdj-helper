export function resize_img(url, size = 128) {
	if (!url) {
		return '';
	}
	return `https://wsrv.nl/?&w=${size}&h=${size}&we&il&output=webp&url=${url}`;
}