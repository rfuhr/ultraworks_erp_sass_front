## Why

<!-- Explain the motivation for this change. What problem does this solve? Why now? -->

## What Changes

<!-- Describe what will change. Be specific about new capabilities, modifications, or removals. -->

## Escopo

<!-- Declare onde a mudança vive no monorepo. Obrigatório: apps afetados e libs tocadas.
     Apps: erp, platform-admin. Libs: tokens, uw-ui, core, data, i18n.
     Se a mudança criar uma lib nova, justifique e cite o ADR. -->

- **Apps:** `<erp | platform-admin>`
- **Libs:** `<tokens | uw-ui | core | data | i18n>`
- **Capabilities:** `<kebab-case>` (prefixar com o app quando o comportamento for específico de produto)

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md with OpenSpec delta headers and Gherkin-style scenarios. -->
- `<name>`: <brief description of what this capability covers>

### Modified Capabilities
<!-- Existing capabilities whose behaviour is changing (not just implementation).
     Only list here if spec-level behaviour changes. Each needs a delta spec.md file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->
- `<existing-name>`: <what behaviour is changing>

## Impact

<!-- Affected code, APIs, dependencies, systems -->
