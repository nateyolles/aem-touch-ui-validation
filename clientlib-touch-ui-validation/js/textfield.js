/**
 * Validation for Granite Touch UI textfield, textarea and password components.
 *
 * Additional properties for granite/ui/components/foundation/form/textfield
 * are:
 *
 * {String}minlength
 * Minimum number of characters allowed
 * No default
 *
 * {Regex|String}pattern
 * A named regular expression pattern or a regular expression. Named regex
 * patterns include: 'phone', 'email', 'url', 'number', 'dateISO', 'alpha',
 * 'alphaNumberic', 'integer' and 'systemKey'.
 * No default
 *
 * {Boolean}activeValidation
 * Validation updates as the user types instead of waiting until the field loses
 * focus.
 * defaults to false
 *
 *  <myTextField
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/textfield"
 *     fieldLabel="My textfield"
 *     name="./myTextfield"
 *     minlength="2"
 *     maxlength="4"/>
 * 
 *  <myEmailTextField
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/textfield"
 *     fieldLabel="My email textfield"
 *     name="./myEmailTextfield"
 *     pattern="email"/>
 *
 *  <myRegexTextField
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/textfield"
 *     fieldLabel="My regex textfield"
 *     name="./myRegexTextfield"
 *     pattern="^\\d{3,5}-[a-c1-3]+$"/>
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  $.validator.register({
    selector: '.coral-Form-fieldwrapper > input[type="text"], .coral-Form-fieldwrapper > input[type="password"], .coral-Form-fieldwrapper > textarea',
    validate: function(el) {
      var value,
          minLength,
          pattern,
          error,
          activeValidation,
          patterns;

      activeValidation = el.data('activevalidation');

      /*
       * Active validation means that the validation error updates as the user
       * types. If the field is set as an email, then the validation will show
       * as incorrect as the user types until they finally get to the character
       * that validates as an email (i.e. "name@company.c").
       */
      if (activeValidation || (!activeValidation && !el.is(':focus'))) {

        value = el.val();
        minLength = el.data('minlength');
        pattern = el.data('pattern');
        error = null;

        /* 
         * Preset patterns copied from
         * /libs/granite/ui/components/foundation/form/formbuilder/clientlibs/js/form-validation.js
         * ^$ added
         * Copyright Adobe Systems Incorporated. All Rights Reserved.
         */
        patterns = {
          phone: /^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$/,
          email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,
          url: /^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
          number: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
          dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
          alpha: /^[a-zA-Z]+$/,
          alphaNumeric: /^\w+$/,
          integer: /^-?\d+$/,
          systemKey:/^[-_a-z0-9]+$/i
        }

        /* validate if the field isn't empty */
        if (value) {

          /* Check min length */
          if (minLength && value.length < minLength) {
            return Granite.I18n.get('The field must be greater than {0} characters long.', minLength);
          }

          /*
           * Test pattern if set. Pattern can be a preset regex pattern name or
           * a regular expression such as "^\\d+$".
           */
          if (pattern) {
            if (patterns[pattern]) {
              error = !patterns[pattern].test(value); 
            } else {
              error = !(new RegExp(pattern)).test(value);
            }

            if (error) {
              return Granite.I18n.get('The field must match the pattern "{0}".', pattern);
            }
          }
        }
      }
    }
  });
})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
