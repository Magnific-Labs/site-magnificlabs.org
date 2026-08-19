---
title: "Why we start with accessibility, not finish with it"
date: "2026-07-28"
tag: "Craft"
tone: "sage"
summary: "Contrast ratios, hit areas and focus rings are cheaper to decide once, at the beginning, than to retrofit across four platforms."
---
Accessibility work has a reputation for being the last item on a launch checklist — the pass you make once the screens are signed off, when someone runs an automated checker and files twelve tickets nobody has time for. We do it in the opposite order, and not out of virtue. It is simply cheaper.

## Decisions, not fixes

Almost everything people call an accessibility bug is really a decision that was made once, early, by accident. A text colour chosen because it looked nice on a designer's calibrated screen. A 32px icon button that felt tidy in a mockup. A focus outline switched off because it interfered with a hover state.

Each of those is a five-minute decision at the start and a four-platform migration later. So we make them once, in the token layer, before any product exists:

- Body text never smaller than 16px, captions never smaller than 14px.
- Every text and background pairing clears a 4.5:1 contrast ratio.
- Interactive targets are at least 44px in their smallest dimension.
- Focus is always visible, and never only a colour change.

## What that costs

Honestly? Some visual range. A 4.5:1 floor rules out the pale-gray-on-white look that a lot of software has settled into, and a 44px target floor rules out some very dense layouts. We think that is a fair trade for software people can still use at the end of a long day, on a laptop in bright sun, at forty-five as easily as at twenty-five.

> The point of a floor is that you stop arguing about it. It frees the rest of the design to be opinionated.

## How we check

Contrast pairings are checked in the build, not by eye. Keyboard paths are walked by hand on every screen before it is considered done — tab through, operate everything, never lose the ring. Motion is tested with reduced-motion turned on, because a transition that is decorative for one person is nausea for another.

None of this is remarkable. It is just ordinary work, moved to the beginning.
