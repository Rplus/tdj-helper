# make dev-with-json HOST=1 # 給區網 mobile 測試
ifdef HOST
	DEV_FLAGS = --host
endif

.PHONY: build

deploy: build
	pnpm run deploy;

dev:
	pnpm run dev $(DEV_FLAGS);

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
# 	npx servor --static ./data/_cache/tdj-roles 404.html 9527;
	python3 -m http.server 9527 --bind 127.0.0.1 --directory ./data/_cache/tdj-roles

dev-with-json:
	@$(MAKE) -j2 dev host-local-json;
