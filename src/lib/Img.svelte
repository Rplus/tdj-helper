<script>
export let src = '';
export let alt = '';
export let width = '64';
export let height = '64';

let img;

let err_count = 0; // 0: 主圖, 1: 嘗試參數圖, 2: 嘗試 CN 網域備援

function handle_error() {
	if (err_count > 1) {
		return;
	}

	try {
		const parsed_url = new URL(this.src);

		if (err_count === 0) {
			const url_param = parsed_url.searchParams.get('url');
			err_count = 1;

			// 如果有 url 參數且不是當前網址，先走第一防線
			if (url_param && url_param !== this.src) {
				this.src = url_param;
				return;
			}
		} else if (err_count === 1) {
			const tw_path_prefix = '/media/pictures/tdj/';

			if (parsed_url.pathname.startsWith(tw_path_prefix)) {
				err_count = 2; // 往下推進，準備迎接可能發生的 CN 破圖

				const cn_domain = 'https://media.zlongame.com';
				const cn_pathname = parsed_url.pathname.replace(
					tw_path_prefix,
					'/media/news/cn/tdj/'
				);
				console.log(1123, {cn_pathname});

				this.src = `${cn_domain}${cn_pathname}`;
				return;
			}
		}
	} catch (e) {
		console.error('URL 解析失敗', e);
	}
}
</script>

<img
	bind:this={img}
	loading="lazy"
	decording="async"
	{src}
	{width}
	{height}
	{alt}
	title={$$props.title || alt}
	on:error={handle_error}
	{...$$restProps}
/>
