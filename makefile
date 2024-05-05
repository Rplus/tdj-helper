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

update-data--parse: print-date
	bun ./task/fetch.mjs;

update-data--sorting:
	bun ./task/sorting.mjs;

update-bili-data--parse-and-sorting: print-date
	bun ./task/bili-skill-parsing.js -- new=1;

update-bili-data--sorting:
	bun ./task/parse-bili-skill.js;