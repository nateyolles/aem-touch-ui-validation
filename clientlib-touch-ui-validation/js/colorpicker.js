/*
 * Copyright 2016 Nate Yolles
 *
 * https://github.com/nateyolles/aem-touch-ui-validation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * Validation for Granite Touch UI colorpicker.
 *
 * Additional properties for granite/ui/components/foundation/form/colorpicker
 * are:
 *
 * {Boolean}required
 * Is field required
 * defaults to false
 *
 *  <myColorPicker
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/colorpicker"
 *     fieldLabel="My colorpicker"
 *     name="./myColorPicker"
 *     required="{Boolean}true"/>
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  var COLORPICKER_SELECTOR = '.coral-ColorPicker';

  $.validator.register({
    selector: '.marker-colorpicker',
    validate: function(el) {
      var field,
          value,
          required;

      field = el.closest(".coral-Form-field");
      value = el.val();
      required = field.data('required');

      if (required && !value) {
        return Granite.I18n.get('Please fill out this field.');
      } else {
        el.setCustomValidity(null);
        el.updateErrorUI();
      }
    },
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
    $radioGroups = $dialog.find(COLORPICKER_SELECTOR);

    $radioGroups.each(function() {
      var $radioGroup,
          required,
          $marker,
          $button;

      $radioGroup = $(this);
      required = $radioGroup.data('required');

      if (required) {
        $marker = $radioGroup.find('input[type="hidden"]');
        $button = $radioGroup.find('.coral-ColorPicker-button')
        
        /* Change to text as hidden is not validated */
        $marker.attr('type', 'text');
        $marker.addClass('marker-colorpicker');
        $marker.attr('aria-required', 'true');

        /* revalidate once the button color has changed */
        $button.on('stylechange', function(){
          $marker.trigger('change')
        })
      }
    });
  });

})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
