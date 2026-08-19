/**
 * Analytics consent, and Google Analytics 4 once it is given.
 *
 * Nothing is sent to Google — not even a connection — until the visitor
 * accepts. The measurement id arrives on this script's own tag rather than
 * being baked into the file, so the file stays static and content-hashable.
 */
;(function () {
  'use strict'

  var STORAGE_KEY = 'ml.analytics-consent' // 'granted' | 'denied'

  var self = document.currentScript
  var measurementId = self && self.getAttribute('data-ga-id')

  // Private-mode Safari throws on storage access rather than returning null.
  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch (error) {
      return null
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch (error) {
      /* choice lasts for this page only */
    }
  }

  function forgetChoice() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      /* nothing stored to forget */
    }
  }

  /* -- measurement ---------------------------------------------------------- */

  var running = false

  function startAnalytics() {
    if (running || !measurementId) return
    running = true

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    var tag = document.createElement('script')
    tag.async = true
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId)
    document.head.appendChild(tag)

    gtag('js', new Date())
    gtag('config', measurementId)

    // htmx swaps the body instead of loading a document, so GA4's automatic
    // page_view fires only for the load that started the visit. Report the rest.
    //
    // Keyed on the URL changing, which covers both boosted navigation and the
    // blog tag filter — each filter is its own prerendered page with its own
    // URL, so it is a genuine page view rather than a partial update.
    var lastPath = location.pathname + location.search

    document.addEventListener('htmx:afterSettle', function () {
      var current = location.pathname + location.search
      if (current === lastPath) return
      lastPath = current

      gtag('event', 'page_view', {
        page_location: location.href,
        page_path: current,
        page_title: document.title,
      })
    })
  }

  /* -- consent -------------------------------------------------------------- */

  function banner() {
    return document.getElementById('consent')
  }

  function setBannerVisible(visible) {
    var el = banner()
    if (el) el.hidden = !visible
  }

  function decide(value) {
    writeChoice(value)
    setBannerVisible(false)
    if (value === 'granted') startAnalytics()
  }

  /**
   * Wires the banner buttons and the footer control. hx-boost replaces the
   * whole body, so this runs again after every swap against fresh elements.
   */
  function wire() {
    var el = banner()
    if (el && !el.getAttribute('data-wired')) {
      el.setAttribute('data-wired', '1')
      el.addEventListener('click', function (event) {
        var button = event.target.closest('[data-consent]')
        if (button) decide(button.getAttribute('data-consent'))
      })
    }

    var reopen = document.querySelector('[data-consent-reopen]')
    if (reopen && !reopen.getAttribute('data-wired')) {
      reopen.setAttribute('data-wired', '1')
      reopen.hidden = false
      reopen.addEventListener('click', function () {
        forgetChoice()
        setBannerVisible(true)
      })
    }
  }

  function init() {
    wire()

    var choice = readChoice()
    if (choice === 'granted') {
      startAnalytics()
      setBannerVisible(false)
      return
    }
    if (choice === 'denied') {
      setBannerVisible(false)
      return
    }

    // Global Privacy Control and Do Not Track are the visitor telling us
    // already. Honour them instead of asking again.
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') {
      writeChoice('denied')
      setBannerVisible(false)
      return
    }

    setBannerVisible(true)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // The banner is re-rendered by every boosted navigation; re-apply the choice
  // so an undecided visitor keeps seeing it and a decided one never does.
  document.addEventListener('htmx:afterSettle', init)
})()
