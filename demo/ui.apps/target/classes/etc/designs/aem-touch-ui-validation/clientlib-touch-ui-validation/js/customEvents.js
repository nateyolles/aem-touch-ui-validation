/**
 * Trigger jQuery event 'stylechange' when a jQuery object's style attribute
 * changes.
 */
(function() {
  var originalCss= $.fn.css;

  $.fn.css = function() {
    var event = new $.Event('stylechange');
    originalCss.apply(this, arguments);
    $(this).trigger(event);
  }
})();
