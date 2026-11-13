# Claude skills for MagIC

This folder holds Claude skills for working with the MagIC database (https://earthref.org/MagIC).

| Skill | What it does |
|---|---|
| `magic-from-paper` | Turns a published paleomagnetic or rock magnetic paper and its supplementary files into a MagIC Data Model 3.0 upload file, validated with PmagPy. It writes a report of every inferred value, every gap, and any errors found in the paper or in an existing MagIC contribution. Columns, vocabularies and method codes are read live from this repository's data model. |

## Install

**Claude Code**

```
claude plugin marketplace add earthref/magic
claude plugin install magic@earthref
```

or, inside a session, `/plugin marketplace add earthref/magic`. Run `claude plugin marketplace update earthref` to get new versions.

**Claude (claude.ai, desktop and mobile apps)**

Download `magic-from-paper.zip` from the latest release, then go to Customize → Skills → "+" → Upload a skill. Code execution ("Create and edit files") must be on.

## Use

Attach the paper's PDF and its supplementary files and ask, for example, "Make a MagIC contribution from this paper." If the authors already uploaded a MagIC contribution, attach it too and ask for a comparison.

The skill installs `pmagpy` and `json5` with pip when it runs.

## Layout

```
.claude-plugin/marketplace.json      the marketplace (repository root)
skills/magic/.claude-plugin/plugin.json
skills/magic/skills/magic-from-paper/SKILL.md, references/, scripts/
```

Bump `version` in `plugin.json` when you change a skill so Claude Code users receive the update, and check the layout with `claude plugin validate .` from the repository root.
