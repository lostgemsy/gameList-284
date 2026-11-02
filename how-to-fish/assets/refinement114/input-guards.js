/* Moderation input guards. This classic script runs before the game modules and
   protects the entire game document, including overlays appended to <body>.
   Do not stop propagation: right-click actions, touch controls and SDK listeners
   must still receive their events. The parent portal / ad iframes are untouched. */
(function () {
  'use strict';
  if (window.__TB_INPUT_GUARDS_114__) return;
  window.__TB_INPUT_GUARDS_114__ = true;

  var scrollSurfaces = [
    '#panel-content', '#panel-tabs', '.renewal-body',
    '#pause-menu .pause-card', '#main-menu .hero-card',
    '.story-card', '.story-card p', '.ending-copy', '.field-guide',
    '.harbor-modal-content14', '.catch-showcase__card',
    '.adventure-choice17__card', '[data-native-scroll]'
  ].join(',');
  var capture = { capture: true, passive: false };

  function elementOf(node) {
    return node && (node.nodeType === 1 ? node : node.parentElement);
  }

  function isTextEntry(node) {
    var element = elementOf(node);
    if (!element) return false;
    if (element.isContentEditable) return true;
    var control = element.closest('input,textarea');
    if (!control || control.disabled) return false;
    return control.tagName === 'TEXTAREA' ||
      /^(text|search|email|url|tel|password|number)$/.test(control.type);
  }

  function prevent(event) {
    if (event.cancelable) event.preventDefault();
  }

  document.addEventListener('contextmenu', prevent, capture);
  document.addEventListener('selectstart', function (event) {
    if (!isTextEntry(event.target)) prevent(event);
  }, capture);
  document.addEventListener('dragstart', function (event) {
    if (!isTextEntry(event.target)) prevent(event);
  }, capture);

  // Keyboard selection and the keyboard context-menu key need the same guard.
  document.addEventListener('keydown', function (event) {
    var menuKey = event.key === 'ContextMenu' || event.code === 'ContextMenu' ||
      (event.shiftKey && (event.key === 'F10' || event.code === 'F10'));
    var selectAll = (event.ctrlKey || event.metaKey) &&
      (event.code === 'KeyA' || String(event.key).toLowerCase() === 'a');
    if (menuKey || (selectAll && !isTextEntry(event.target))) prevent(event);
  }, capture);

  // Clear browser-created ranges as a fallback, without interfering with typing.
  document.addEventListener('selectionchange', function () {
    var selection = window.getSelection && window.getSelection();
    if (selection && !selection.isCollapsed &&
        !isTextEntry(selection.anchorNode) && !isTextEntry(selection.focusNode)) {
      selection.removeAllRanges();
    }
  });

  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (name) {
    document.addEventListener(name, prevent, capture);
  });

  // Keep panel scrolling and native form controls working. Do not cancel
  // touchstart/touchend: doing so would swallow ordinary taps on menu buttons.
  document.addEventListener('touchmove', function (event) {
    var element = elementOf(event.target);
    if (event.touches && event.touches.length > 1) {
      prevent(event);
      return;
    }
    if (element && (element.closest(scrollSurfaces) ||
        element.closest('input,textarea,select') || isTextEntry(element))) return;
    prevent(event);
  }, capture);

  function disableImageDrag(root) {
    if (!root || !root.querySelectorAll) return;
    if (root.tagName === 'IMG') root.draggable = false;
    var images = root.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) images[i].draggable = false;
  }
  disableImageDrag(document);
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      for (var j = 0; j < records[i].addedNodes.length; j++) {
        disableImageDrag(records[i].addedNodes[j]);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
