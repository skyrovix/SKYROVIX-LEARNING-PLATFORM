# Antigravity Complete UI/UX + Motion Skill Pack

## Included skills
- `premium-ui-motion` — overall premium visual system and motion polish
- `advanced-typography` — font pairing, responsive type scales, text treatments
- `cinematic-web-motion` — scroll effects, timelines, transitions, micro-interactions
- `modern-landing-page` — conversion-focused landing page structure and implementation
- `responsive-ui-audit` — responsive, accessibility, and performance audit

## Install
Extract this ZIP into your project root, or copy the `.agents` folder into the project root.

Expected structure:
```
your-project/
└── .agents/
    └── skills/
        ├── premium-ui-motion/SKILL.md
        ├── advanced-typography/SKILL.md
        ├── cinematic-web-motion/SKILL.md
        ├── modern-landing-page/SKILL.md
        └── responsive-ui-audit/SKILL.md
```

## PowerShell install from Downloads
If the ZIP is in your Downloads folder, run from the project root:
```
Expand-Archive "$HOME/Downloads/antigravity-complete-ui-ux-motion-pack.zip" -DestinationPath "." -Force
```

## Suggested Antigravity prompt
```
Use the premium-ui-motion, advanced-typography, cinematic-web-motion,
modern-landing-page, and responsive-ui-audit skills as appropriate.
First inspect my existing project and preserve all working functionality.
Then upgrade the UI with a coherent premium visual direction, expressive
typography, smooth purposeful animations, polished interactions, and
responsive layouts. Run the available checks and report what changed.
```

Use only the skills relevant to the task. The agent should inspect the project before changing code.
