/**
 * Validation for Granite Touch UI radiogroup.
 *
 * Additional properties for granite/ui/components/foundation/form/radiogroup
 * are:
 *
 * {Boolean}required
 * Is field required
 * defaults to false
 *
 *  <myRadioGroup
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/radiogroup"
 *     fieldLabel="My radiogroup"
 *     required="{Boolean}true">
 *     <items jcr:primaryType="nt:unstructured">
 *     ...
 *     </items>
 *  </myRadioGroup>
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  var RADIOGROUP_SELECTOR = '.coral-RadioGroup';

  $.validator.register({
    selector: '.marker',
    show: function (el, message) {
      var fieldErrorEl,
          field,
          error,
          arrow;

      fieldErrorEl = ns.utils.getFieldErrorEl();
      field = el.closest('.coral-Form-field');

      el.add(field)
        .attr('aria-invalid', 'true')
        .toggleClass('is-invalid', true);

      field.nextAll('.coral-Form-fieldinfo')
        .addClass('u-coral-screenReaderOnly');

      error = field.nextAll('.coral-Form-fielderror');

      if (error.length === 0) {
        arrow = field.closest('form').hasClass('coral-Form--vertical') ? 'right' : 'top';
        fieldErrorEl.clone()
          .attr('data-quicktip-arrow', arrow)
          .attr('data-quicktip-content', message)
          .insertAfter(field);
      } else {
        error.data('quicktipContent', message);
      }
    },
    clear: function(el) {
      var field = el.closest('.coral-Form-field');

      el.add(field)
        .removeAttr('aria-invalid')
        .removeClass('is-invalid');

      field.nextAll('.coral-Form-fielderror').tooltip('hide').remove();
      field.nextAll('.coral-Form-fieldinfo').removeClass('u-coral-screenReaderOnly');
    }
  });

  /**
   * Create hidden field to validate against and click event handler when a
   * Granite UI dialog loads.
   */
  $(document).on('foundation-contentloaded', function(e) {
    var $dialog,
        $radioGroups;

    $dialog = $(e.target);
    $radioGroups = $dialog.find(RADIOGROUP_SELECTOR);

    $radioGroups.each(function() {
      var $radioGroup,
          required,
          $marker,
          $items;

      $radioGroup = $(this);
      required = $radioGroup.data('required');

      if (required) {
        $marker = $('<input type="text" class="marker" aria-required="true">');
        $items = $radioGroup.find('input[type="radio"]');

        $radioGroup.prepend($marker);

        $items.click(function() {
            $marker
              .val($(this).is(':checked') ? 'checked' : null)
              .change();
        });
      }
    });
  });

})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
