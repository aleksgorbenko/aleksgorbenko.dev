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

.PHONY: all
all: build

.PHONY: setup
setup: setup-tools setup-node

.PHONY: setup-tools
setup-tools:
	brew bundle
	mise install

.PHONY: setup-node
setup-node:
	mkdir -p $(MODULES_CACHE)
	test -L node_modules || ln -s $(MODULES_CACHE) node_modules
	bun install --frozen-lockfile
	$(PLAYWRIGHT) install chromium webkit

.PHONY: build
build:
	rm -rf public
	$(HUGO) --gc --minify --panicOnWarning --printPathWarnings --printI18nWarnings --printUnusedTemplates

.PHONY: build-staging
build-staging:
	rm -rf public
	$(HUGO) --gc --minify --environment staging --panicOnWarning --printPathWarnings --printI18nWarnings --printUnusedTemplates

.PHONY: serve
serve:
	$(HUGO) server --environment staging

.PHONY: sync-assets
sync-assets:
	cp $(KIT_WEBSITE)/website-*_1440x1080.webp $(KIT_WEBSITE)/website-hero*_2400x1350.webp $(BUKKU_IMAGES)/

.PHONY: chroma
chroma:
	{ echo "@layer components {"; $(HUGO) gen chromastyles --style=github-dark | sed 's/^/  /'; echo "}"; } > assets/css/15-code.css

.PHONY: lint
lint: lint-makefile lint-css lint-templates lint-html lint-markdown lint-prose lint-spelling lint-toml lint-yaml lint-workflows lint-ts

.PHONY: lint-makefile
lint-makefile:
	checkmake Makefile

.PHONY: lint-css
lint-css:
	bunx stylelint "$(CSS)"

.PHONY: lint-templates
lint-templates: build-staging

.PHONY: lint-html
lint-html: build-staging
	bunx html-validate "public/**/*.html"
	$(JAVA) -jar node_modules/vnu-jar/build/dist/vnu.jar --Werror --skip-non-html public

.PHONY: lint-markdown
lint-markdown:
	bunx markdownlint-cli2

.PHONY: lint-prose
lint-prose:
	vale content/apps README.md

.PHONY: lint-spelling
lint-spelling:
	bunx cspell --no-progress

.PHONY: lint-toml
lint-toml:
	taplo lint
	taplo fmt --check

.PHONY: lint-yaml
lint-yaml:
	yamllint --strict -c .yamllint.yaml .github .yamllint.yaml

.PHONY: lint-workflows
lint-workflows:
	actionlint
	zizmor --persona=pedantic .github/workflows

.PHONY: lint-ts
lint-ts:
	bunx eslint .
	bunx tsc --noEmit

.PHONY: format
format:
	bunx prettier --write "layouts/**/*.html" $(TS) $(JSON) "assets/css/0*.css" "assets/css/1[0-47-9]*.css"
	taplo fmt

.PHONY: format-check
format-check:
	bunx prettier --check "layouts/**/*.html" $(TS) $(JSON) "assets/css/0*.css" "assets/css/1[0-47-9]*.css"

.PHONY: test
test: test-browser test-links test-unused-css test-lighthouse

.PHONY: test-browser
test-browser: build-staging
	$(PLAYWRIGHT) test

.PHONY: test-links
test-links: build-staging
	lychee --offline --no-progress --root-dir "$(CURDIR)/public" --include-fragments public

.PHONY: test-unused-css
test-unused-css: build-staging
	bun tools/unused-css.ts

.PHONY: test-lighthouse
test-lighthouse: build
	bun tools/lighthouse.ts $(LIGHTHOUSE_PORT) $(LIGHTHOUSE_PAGES)

.PHONY: links-external
links-external: build-staging
	lychee --no-progress --max-concurrency 16 --timeout 20 --root-dir "$(CURDIR)/public" public

.PHONY: screenshots
screenshots: build-staging
	$(PLAYWRIGHT) test --grep screenshot --update-snapshots

.PHONY: audit
audit: audit-secrets audit-images audit-dependencies

.PHONY: audit-secrets
audit-secrets:
	gitleaks git --no-banner .
	gitleaks dir --no-banner .

.PHONY: audit-images
audit-images:
	@found=$$(exiftool -q -r -if '$$GPSLatitude or $$GPSPosition or $$SerialNumber or $$Make' -p '$$Directory/$$FileName' static content); \
	if [ -n "$$found" ]; then echo "images with location or camera metadata:"; echo "$$found"; exit 1; fi
	@if grep -rlE '<script|on[a-z]+=' --include='*.svg' static content; then echo "SVG with script or event handler"; exit 1; fi

.PHONY: audit-dependencies
audit-dependencies:
	bun audit

.PHONY: check
check: lint format-check test audit

.PHONY: ci
ci: check

.PHONY: deploy-draft
deploy-draft: build-staging
	bunx netlify-cli deploy --no-build --dir public --message "$$(command git rev-parse --short HEAD)"

.PHONY: clean
clean:
	rm -rf public resources .check test-results
