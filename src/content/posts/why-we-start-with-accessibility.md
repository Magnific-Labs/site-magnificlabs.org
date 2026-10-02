---
title: "Why we start with accessibility, not finish with it"
date: "2026-07-28"
tag: "Craft"
tone: "sage"
summary: "Contrast ratios, hit areas and focus rings are cheaper to decide once, at the beginning, than to retrofit across four platforms."
---
Accessibility work has a reputation for being the last item on a launch checklist — the pass you make once the screens are signed off, when someone runs an automated checker and files twelve tickets nobody has time for. We do it in the opposite order, and not out of virtue. The end-user's experience is our non-negotiable priority, and building for everyone from day one is simply better, cheaper, and more durable engineering.

## Decisions, not fixes

Almost everything people call an accessibility bug is really an architectural decision that was made once, early, by accident. A text colour chosen because it looked nice on a designer's calibrated display. A 32px icon button that felt tidy in a Figma canvas. A focus outline switched off because it interfered with a hover state.

Each of those is a five-minute decision at the start, and an excruciating multi-platform migration six months later. So we make them once, in the token layer, before any application code exists:

- **Legibility floor:** Body text never drops below 16px, captions never below 14px, and line length is capped at 68 characters to prevent eye fatigue.
- **Mathematical contrast:** Every text and background pairing clears a 4.5:1 contrast ratio, checked during the build rather than estimated by eye.
- **Physical hit areas:** Interactive targets are at least 44px in their smallest dimension, ensuring accurate tap and click targets on touch screens and trackpads.
- **Persistent focus:** Focus is always visible, distinct, and never communicated through colour alone.

## What that costs

Honestly? Some trendy visual range. A strict 4.5:1 floor rules out the low-contrast, pale-gray-on-white aesthetic that has dominated modern SaaS. A 44px target floor prevents over-crowded, hyper-dense cockpits that induce anxiety.

We consider that a small price to pay. Software that people can comfortably use at the end of a ten-hour workday, on a phone in direct sunlight, or with a screen magnifier at fifty as easily as at twenty, is software worth building.

> The point of an architectural floor is that you stop arguing about it. It frees the rest of the design to be opinionated and durable.

## Accessibility as structural resilience

When you build for screen readers, keyboard navigation, and variable zoom, an unexpected thing happens: your code becomes drastically cleaner. 

Semantic HTML (`<main>`, `<nav>`, `<dialog>`, `<article>`) eliminates bloated container soup. Proper ARIA attributes force you to reason clearly about application state machines. Supporting keyboard navigation guarantees that every interactive flow is linear and deterministic.

None of this is decorative. It is how you build reliable software that stands the test of time.
