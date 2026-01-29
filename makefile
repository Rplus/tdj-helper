.PHONY: build

deploy: build deploy-rawdata
	pnpm run deploy;

deploy-rawdata:
	@sh -c '\
		if ! git diff-index --quiet HEAD --; then \
			echo "有未 commit 的變更，請先處理再切 branch"; \
			exit 1; \
		fi; \
		git checkout official-rawdata || git checkout --orphan official-rawdata; \
		git reset --hard; \
		git add task/rawdata/tdj; \
		git commit -m "Deploy rawdata update" || echo "No changes"; \
		git push origin official-rawdata; \
	'

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

update-bili-data: update-bili-data--parse-state update-bili-data--parse-summon update-bili-data--parse update-bili-data--sorting
	echo 'bili-wiki parsing done!';

genarate-addition-skills:
	bun ./task/addition_skills.js;

update: update-data--parse update-data--sorting update-bili-data
