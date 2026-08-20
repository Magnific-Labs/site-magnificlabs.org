/**
 * Progressive enhancement for the Magnific Labs site.
 *
 * Two behaviours, both previously React effects:
 *   - reveal:  fade sections in as they enter the viewport
 *   - toc:     highlight the current heading in the on-this-page nav
 *
 * Both are re-initialised after htmx swaps, so they keep working across
 * boosted page loads and blog filter changes.
 */
;(function () {
  'use strict'

  var root = document.documentElement

  /* -- reveal on scroll ---------------------------------------------------- */

  function initReveal() {
    // Only hide content once we know we can reveal it again.
    root.classList.add('js-reveal')

    var targets = document.querySelectorAll('.reveal:not(.in)')
    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('in')
      return
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue
          entries[i].target.classList.add('in')
          io.unobserve(entries[i].target)
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    )

    Array.prototype.forEach.call(targets, function (el) {
      io.observe(el)
    })
  }

  /* -- table of contents --------------------------------------------------- */

  /** Returns a teardown function, or null when there is no toc on the page. */
  function initToc() {
    var links = document.querySelectorAll('.toc a')
    if (links.length < 2) return null

    var items = []
    Array.prototype.forEach.call(links, function (link) {
      var id = decodeURIComponent(String(link.hash || '').slice(1))
      var target = id && document.getElementById(id)
      if (target) items.push({ link: link, target: target })
    })
    if (!items.length) return null

    var frame = 0

    function update() {
      frame = 0

      // The last heading can sit permanently below the threshold: once the page
      // is scrolled as far as it goes, a tall footer can still leave it further
      // down the viewport than 160px, so it would never light up. Pin it when
      // we reach the bottom.
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      var current = atBottom ? items[items.length - 1] : items[0]

      if (!atBottom) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].target.getBoundingClientRect().top < 160) current = items[i]
        }
      }

      for (var j = 0; j < items.length; j++) {
        items[j].link.classList.toggle('active', items[j] === current)
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return function teardown() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }

  /* -- smooth scrolling ---------------------------------------------------- */

  var lenis = null

  /**
   * Eases wheel and trackpad scrolling.
   *
   * Lenis drives the real scroll position rather than transforming a wrapper,
   * which is why `position: sticky`, IntersectionObserver and find-in-page all
   * keep working. Touch is deliberately left native: smoothing it fights the
   * platform's own momentum and feels worse than doing nothing.
   *
   * One instance for the life of the document — window survives htmx swaps.
   */
  function initSmoothScroll() {
    if (lenis || typeof window.Lenis !== 'function') return
    // Someone asking for less motion is asking for this, first of all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new window.Lenis({
      // 0.6s, not the 1.2s default: enough to feel eased, short enough that the
      // page still stops when you do.
      duration: 0.6,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      // Let Lenis own in-page anchors. It honours the CSS scroll-padding-top,
      // so headings already land clear of the sticky header without an offset.
      anchors: true,
    })
  }

  /* -- navigation drawer -------------------------------------------------- */

  /**
   * Opens the header links as a drawer on phones.
   *
   * The drawer is a native <dialog> opened with showModal(), which brings focus
   * trapping, Escape-to-close and inerting the rest of the page for free. This
   * function only has to wire the open/close triggers and keep aria-expanded
   * and the scroll lock in step.
   *
   * The `js-nav` class on <html> is what hides the inline links, so with this
   * script absent they stay visible rather than becoming unreachable.
   *
   * Returns a teardown for the window listener: hx-boost replaces the body on
   * every navigation, and without removing it they would accumulate.
   */
  function initNav() {
    var toggle = document.getElementById('navtoggle')
    var drawer = document.getElementById('site-menu')
    if (!toggle || !drawer) return null

    root.classList.add('js-nav')
    toggle.hidden = false

    // <html> survives a boosted swap, so a drawer left open during navigation
    // would otherwise strand the scroll lock.
    root.classList.remove('nav-open')

    function open() {
      if (drawer.open || typeof drawer.showModal !== 'function') return
      drawer.showModal()
      // Without this, showModal() focuses the close button and paints a focus
      // ring for people who opened the drawer by tapping it.
      var panel = drawer.querySelector('.drawer-in')
      if (panel) panel.focus()
      toggle.setAttribute('aria-expanded', 'true')
      root.classList.add('nav-open')
      // The CSS lock alone will not stop Lenis, which drives scroll itself.
      if (lenis) lenis.stop()
    }

    function close() {
      if (drawer.open) drawer.close()
    }

    toggle.addEventListener('click', open)

    // Fires for Escape and for close() alike, so all paths land here.
    drawer.addEventListener('close', function () {
      toggle.setAttribute('aria-expanded', 'false')
      root.classList.remove('nav-open')
      if (lenis) lenis.start()
    })

    drawer.addEventListener('click', function (event) {
      // A click landing on the dialog itself is the scrim; the panel is a child.
      if (event.target === drawer) return close()
      if (event.target.closest('[data-drawer-close]')) return close()
      // Let boosted navigation take over, but do not leave the drawer behind.
      if (event.target.closest('a')) close()
    })

    // Resizing up to desktop reveals the inline links again; a drawer still
    // sitting open over them would be stranded.
    function onResize() {
      if (drawer.open && window.innerWidth > 860) close()
    }
    window.addEventListener('resize', onResize)

    return function teardown() {
      window.removeEventListener('resize', onResize)
    }
  }

  /* -- wiring -------------------------------------------------------------- */

  var teardownToc = null
  var teardownNav = null

  function init() {
    if (teardownToc) teardownToc()
    if (teardownNav) teardownNav()
    initSmoothScroll()
    initReveal()
    teardownToc = initToc()
    teardownNav = initNav()

    // A boosted navigation swaps the body for content of a different height,
    // and restarts scrolling that the drawer may have stopped.
    if (lenis) {
      lenis.start()
      lenis.resize()
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // Fires after a boosted navigation and after a blog filter swap.
  document.addEventListener('htmx:afterSettle', init)
})()
