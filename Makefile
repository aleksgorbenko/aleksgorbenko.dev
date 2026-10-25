HUGO := mise exec -- hugo
JAVA := mise exec -- java
PLAYWRIGHT := node node_modules/@playwright/test/cli.js
MODULES_CACHE := $(HOME)/Library/Caches/aleksgorbenko.dev/node_modules
KIT_WEBSITE ?= $(HOME)/src/proj/bukku/marketing/output/website
BUKKU_IMAGES := content/apps/bukku/images
LIGHTHOUSE_PAGES := / /apps/bukku/ /blog/ /we-need-to-find-new-joy-in-software/
LIGHTHOUSE_PORT := 4399
CSS := assets/css/*.css
TS := tools/*.ts tests/*.ts *.ts
JSON := *.json .stylelintrc.json .htmlvalidate.json

.PHONY: setup build build-staging serve sync-assets chroma \
	lint lint-css lint-templates lint-html lint-markdown lint-prose lint-spelling lint-toml lint-yaml lint-workflows lint-ts \
	format format-check test test-browser test-links test-lighthouse test-unused-css links-external screenshots \
	audit audit-secrets audit-images audit-dependencies check ci deploy-draft clean

setup:
	brew bundle
	mise install
	mkdir -p $(MODULES_CACHE)
	test -L node_modules || ln -s $(MODULES_CACHE) node_modules
	bun install --frozen-lockfile
	$(PLAYWRIGHT) install chromium webkit

build:
	rm -rf public
	$(HUGO) --gc --minify --panicOnWarning --printPathWarnings --printI18nWarnings --printUnusedTemplates

build-staging:
	rm -rf public
	$(HUGO) --gc --minify --environment staging --panicOnWarning --printPathWarnings --printI18nWarnings --printUnusedTemplates

serve:
	$(HUGO) server --environment staging

sync-assets:
	cp $(KIT_WEBSITE)/website-*_1440x1080.webp $(KIT_WEBSITE)/website-hero_2400x1350.webp $(BUKKU_IMAGES)/

chroma:
	{ echo "@layer components {"; $(HUGO) gen chromastyles --style=github-dark | sed 's/^/  /'; echo "}"; } > assets/css/15-code.css

lint: lint-css lint-templates lint-html lint-markdown lint-prose lint-spelling lint-toml lint-yaml lint-workflows lint-ts

lint-css:
	bunx stylelint "$(CSS)"

lint-templates: build-staging

lint-html: build-staging
	bunx html-validate "public/**/*.html"
	$(JAVA) -jar node_modules/vnu-jar/build/dist/vnu.jar --Werror --skip-non-html public

lint-markdown:
	bunx markdownlint-cli2

lint-prose:
	vale content/apps README.md

lint-spelling:
	bunx cspell --no-progress

lint-toml:
	taplo lint
	taplo fmt --check

lint-yaml:
	yamllint --strict -c .yamllint.yaml .github .yamllint.yaml

lint-workflows:
	actionlint
	zizmor --persona=pedantic .github/workflows

lint-ts:
	bunx eslint .
	bunx tsc --noEmit

format:
	bunx prettier --write "layouts/**/*.html" $(TS) $(JSON) "assets/css/0*.css" "assets/css/1[0-4]*.css"
	taplo fmt

format-check:
	bunx prettier --check "layouts/**/*.html" $(TS) $(JSON) "assets/css/0*.css" "assets/css/1[0-4]*.css"

test: test-browser test-links test-unused-css test-lighthouse

test-browser: build-staging
	$(PLAYWRIGHT) test

test-links: build-staging
	lychee --offline --no-progress --root-dir "$(CURDIR)/public" --include-fragments public

test-unused-css: build-staging
	bun tools/unused-css.ts

test-lighthouse: build
	bun tools/lighthouse.ts $(LIGHTHOUSE_PORT) $(LIGHTHOUSE_PAGES)

links-external: build-staging
	lychee --no-progress --max-concurrency 16 --timeout 20 --root-dir "$(CURDIR)/public" public

screenshots: build-staging
	$(PLAYWRIGHT) test --grep screenshot --update-snapshots

audit: audit-secrets audit-images audit-dependencies

audit-secrets:
	gitleaks git --no-banner .
	gitleaks dir --no-banner .

audit-images:
	@found=$$(exiftool -q -r -if '$$GPSLatitude or $$GPSPosition or $$SerialNumber or $$Make' -p '$$Directory/$$FileName' static content); \
	if [ -n "$$found" ]; then echo "images with location or camera metadata:"; echo "$$found"; exit 1; fi
	@if grep -rlE '<script|on[a-z]+=' --include='*.svg' static content; then echo "SVG with script or event handler"; exit 1; fi

audit-dependencies:
	bun audit

check: lint format-check test audit

ci: check

deploy-draft: build-staging
	bunx netlify-cli deploy --no-build --dir public --message "$$(command git rev-parse --short HEAD)"

clean:
	rm -rf public resources .check test-results
