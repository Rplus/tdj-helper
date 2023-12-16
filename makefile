fetch:
	node ./tasks/fetch-roles.mjs;

dev:
	pnpm run dev;

deploy: build
	pnpm run deploy;

build:
	pnpm run build;

init:
	pnpm install;

# update-data: fetch cn2tw
# 	echo 'DONE';

# cn2tw:
# 	opencc -c 's2tw.json' -i './task/icons.json' -o './task/icons.tw.json';
# 	opencc -c 's2tw.json' -i './task/roles.json' -o './task/roles.tw.json';