---
title: "A motion budget, and why ours is small"
date: "2026-06-15"
tag: "Design"
tone: "lavender"
summary: "Everything we ship moves for under 280ms, in two properties, and stops entirely when your system asks for less motion."
---
We give ourselves a fixed amount of movement to spend, the same way an engineering team budgets network bytes on high-latency connections. Everything that moves across our software fits strictly inside it:

- **120ms** for micro-feedback that acknowledges a press or tap.
- **180ms** for discrete UI state changes the user requested.
- **280ms** as the hard ceiling for structural overlays and dialogs, used sparingly.
- **Two animated properties:** opacity and GPU-accelerated transform.
- **Instant static fallback** for users who specify `prefers-reduced-motion`.

## Prioritizing end-user velocity over demo theatrics

Motion is the easiest way to make a software demo look expensive and a daily production tool feel sluggish. The first time a panel sweeps across the screen, it feels sleek. The five-hundredth time you encounter it while trying to file an invoice or edit a document, it is a forced delay you are waiting on.

Our priority is the person using the system day in and day out. Their attention and velocity matter more than our desire to show off choreography. When software responds under 120ms, it ceases to feel like software and starts feeling like an extension of thought.

```css
.button {
  transition: background var(--duration-base) var(--ease-standard),
              transform var(--duration-fast) var(--ease-standard);
}
@media (prefers-reduced-motion: reduce) {
  :root { --duration-base: 0ms; --duration-fast: 0ms; }
}
```

## Sensory respect and vestibular safety

There is a health imperative that many engineering teams overlook. Vestibular disorders affect millions of people. Large-scale parallax scrolling, spring-physics bouncing, and uninvited screen shifts are documented medical triggers for nausea and disorientation.

A disciplined motion budget guarantees that animation remains informative, clarifying spatial context rather than creating cognitive static. And when an operating system requests reduced motion, our animations do not merely slow down — they disappear entirely.

## The durable boundary

Tools you live in for eight hours must remain steady, predictable, and calm. By enforcing strict motion boundaries, our applications respect your hardware's battery, protect your cognitive focus, and remain dependable across years of daily use.
