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
 * Validation for Granite Touch UI autocomplete and userPicker.
 *
 * Additional properties for granite/ui/components/foundation/form/userPicker
 * are:
 *
 * {Boolean}required
 * Is field required
 * defaults to false
 *
 *  <myUserPicker
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/userpicker"
 *     fieldLabel="My userpicker"
 *     name="./myUserPicker"
 *     required="{Boolean}true"/>
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  var USER_PICKER_SELECTOR = '.coral-Autocomplete';

  $.validator.register({
    selector: '.marker-userpicker',
    validate: function(el) {
      var required,
          value;

      required = el.attr('aria-required');
      value = el.val();

      if (required && !value) {
        return Granite.I18n.get('Please fill out this field.');
      } else {
         el.setCustomValidity(null);
         el.updateErrorUI();
      }
    }
  });

  /**
   * Copy required attribute from the container to the form element and create a
   * click event handler when a Granite UI dialog loads.
   */
  $(document).on('foundation-contentloaded', function(e) {
    var $dialog,
        $userPickers;

    $dialog = $(e.target);
    $userPickers = $dialog.find(USER_PICKER_SELECTOR);

    $userPickers.each(function() {
      var $userPicker,
          $input,
          required;

      $userPicker = $(this);
      $input = $userPicker.find('input[type="text"]');
      required = ns.utils.getAttribute($userPicker, 'aria-required', false);

      if (required) {
        $input.attr('aria-required', 'true')
          .addClass('marker-userpicker');

        /* Revalidate on autocomplete selection */
        $input.closest('.coral-Form-field')
          .click(function(){
            $input.checkValidity();
          });
      }
    });
  });

})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
