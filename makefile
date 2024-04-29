.PHONY: build

deploy: build
	pnpm run deploy;

dev:
	pnpm run dev;

build:
	pnpm run build;

preview: build
	pnpm run preview;

check:
	pnpm run check;

lint:
	pnpm run lint;

format:
	pnpm run format;

init:
	pnpm install;

print-date:
	date +%FT%T%:::z > './src/lib/data/latest-fetch-time.txt';

# fetch-new: print-date
# 	node ./tasks/fetch-tdj-data.mjs -- dev=0;

fetch-new: print-date
	node ./task/fetch.mjs;

data-sorting:
	node ./task/sorting.mjs;

parse-bili-skill:
	bun ./task/parse-bili-skill.js;

parse-bili-skill--new: print-date
	bun ./task/parse-bili-skill.js -- new=1;