(function() {
	const STORAGE_KEY = 'TDJ-HELPER';
	function saveItem(data) {
		if (!data || !data.key) { return false;}
		let odata = getItem() || {};

		odata[data.key] = data.value;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
	};

	function getItem(key) {
		let data = localStorage.getItem(STORAGE_KEY);
		if (!data) { return null; }
		data = JSON.parse(data);

		return key ? data[key] : data;
	};

	const dark_mode_preference = window.matchMedia('(prefers-color-scheme: dark)');

	let cached_dark_theme = getItem('dark-theme');

	let is_dark_theme = (cached_dark_theme !== undefined)
		? cached_dark_theme
		: dark_mode_preference.matches;

	toggle_dark_theme(is_dark_theme);
	dark_mode_preference.addEventListener('change', handle_change);


	function toggle_dark_theme(status = false) {
		document.body.classList.toggle('dark-theme', status);
		saveItem({key: 'dark-theme', value: +status, });
	}

	function handle_change(e) {
		is_dark_theme = e.matches;
		toggle_dark_theme(e.matches);
	}

	function handle_click() {
		is_dark_theme = !is_dark_theme;
		toggle_dark_theme(is_dark_theme);
	}

	// btn
	let btn = document.createElement('button');
	btn.textContent = '🌙';
	btn.style = `
		position: absolute;
		top: .5em;
		right: .5em;
		background-color: #0000;
		border: none;`;

	btn.onclick = handle_click;
	document.body.append(btn);

})();
