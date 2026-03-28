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

host-local-json:
	npx servor --static ./task/rawdata/tdj 404.html 9527



update-data--ornament:
	bun ./task/fetch-ornament.mjs;

update-data--ornament--force:
	bun ./task/fetch-ornament.mjs --force-fetch;

update-data--role:
	bun ./task/fetch-role.mjs;

update-data--role--force:
	bun ./task/fetch-role.mjs --force-fetch;

update-data: update-data--ornament update-data--role print-date
	echo 'done: update-data';

update-data--force: update-data--ornament--force update-data--role--force print-date
	echo 'done: update-data--force';

# update-data--parse: print-date
# 	bun ./task/fetch.mjs;

# update-data--sorting:
# 	bun ./task/sorting.mjs;




update-official-data: update-data--parse update-data--sorting
	echo 'official data parsed!';

update-bili-data--parse: print-date genarate-addition-skills
	bun ./task/bili-skill-parsing.js -- new=1;

update-bili-data--parse--cached:
	bun ./task/bili-skill-parsing.js;

update-bili-data--sorting:
	bun ./task/bili-skill-sorting.js;

update-bili-data--parse-summon:
	bun ./task/bili-summon-parsing.js;

update-bili-data--parse-state:
	bun ./task/bili-state-parsing.js;

update-bili-data--parse-new-state:
	bun ./task/bili-state-parsing.js -- new=1;

update-bili-data: update-bili-data--parse-state update-bili-data--parse-summon update-bili-data--parse update-bili-data--sorting
	echo 'bili-wiki data parsed!';

genarate-addition-skills:
	bun ./task/addition_skills.js;

update: update-official-data update-bili-data
