---
title: "A motion budget, and why ours is small"
date: "2026-06-15"
tag: "Design"
tone: "lavender"
summary: "Everything we ship moves for under 280ms, in two properties, and stops entirely when your system asks for less motion."
---
We give ourselves a fixed amount of movement to spend, the same way you would budget bytes on a slow connection. Everything that moves in our software fits inside it:

- 120ms for anything that responds to a press.
- 180ms for state changes you asked for.
- 280ms as the absolute ceiling, used rarely.
- Two properties: opacity and background colour.
- One exception, described below: scrolling.

## Why so tight

Motion is the easiest way to make a demo feel expensive and a daily tool feel slow. The first time a panel glides in, it is delightful. The four-hundredth time, it is a queue you are standing in.

There is also a plainer reason. Animation is the part of an interface most likely to make someone ill. Vestibular disorders are common, and large parallax or spring-based transitions are a known trigger. A small budget means that when we honour `prefers-reduced-motion`, almost nothing of the design is actually lost.

## What we don't do

No bounce, no spring, no scale-on-press, no page transitions that choreograph one screen out and the next one in. Hover states shift the background one step; press states shift it one step further. That is very nearly the whole vocabulary.

```css
.button {
  transition: background var(--duration-base) var(--ease-standard);
}
@media (prefers-reduced-motion: reduce) {
  :root { --duration-base: 0ms }
}
```

## Scrolling, which breaks the rule

This website eases its own scrolling, and 280ms does not cover it. That is a deliberate exception and worth stating plainly rather than quietly.

Two things make it defensible. It is motion you are driving — the page follows your hand rather than deciding to move on its own, which is the distinction the budget is really about. And it is off entirely when your system asks for less motion, along with everything else here, so the people most affected by it never meet it. On touch it is off regardless: a phone's own momentum is better than anything we would put on top of it.

We would not do this in a work tool. A marketing site you read once is not a console you live in for eight hours, which is the same reasoning as below.

## The exception

Work tools stay still — nothing moves unless you moved it. Games and consumer surfaces get to be alive: responsive, noisy, personality intact. Same budget per interaction, spent much more often. A tool you use for eight hours and a game you use for twenty minutes are not the same problem.
