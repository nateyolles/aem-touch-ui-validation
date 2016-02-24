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
 * Validation for Granite Touch UI pathbrowser component.
 *
 * Additional properties for granite/ui/components/foundation/form/pathbrowser
 * are:
 *
 * {Boolean}allowNonRootPath
 * Allows a path that is not bound by the root path
 * Defaults to false
 *
 * {Boolean}allowNonExistingPath
 * Allows a path that is not a node in the JCR
 * Defaults to false
 *
 * Setting '{Boolean}allowNonRootPath' allows the user to enter a path that
 * doesn't start with the root path. '{Boolean}allowNonExistingPath' allows the
 * user to enter a path that isn't in the JCR. '{Boolean}allowNonRootPath' is
 * validated while the user types. '{Boolean}allowNonExistingPath' is validated
 * when the field loses focus. Both default to false. Previously, the user could
 * enter any text and it would be accepted. Setting both fields to true would
 * behave as it did out of the box.
 *
 *  <myPathbrowser
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
 *     fieldLabel="My pathbrowser"
 *     rootPath="/content/my-site"
 *     required="{Boolean}true"
 *     name="./myPathbrowser"/>
 *
 *  <myAllowAnythingPathbrowser
 *     jcr:primaryType="nt:unstructured"
 *     sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
 *     fieldLabel="My pathbrowser"
 *     rootPath="/content/my-site"
 *     required="{Boolean}true"
 *     allowNonRootPath="{Boolean}true"
 *     allowNonExistingPath="{Boolean}true"
 *     name="./myAllowAnythingPathbrowser"/>
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  var PATHBROWSER_SELECTOR = '.js-coral-pathbrowser-input';

  /**
   * Check if the input path does not start with the root path
   *
   * If allowNonRootPath is set to true any path is valid regardless of the root
   * path. If allowNonRootPath is set to false, validation occurs as the user
   * types and verifies that the path begins with the root path.
   */
  $.validator.register({
    selector: PATHBROWSER_SELECTOR,
    validate: function(el) {
      var container = $(el.parents('span')[1]),
          value = el.val(),
          allowNonRootPath = ns.utils.getDataAttribute(container, 'allownonrootpath', true),
          allowNonExistingPath = ns.utils.getDataAttribute(container, 'allownonexistingpath', true),
          rootPath = container.data('root-path');

      /* Verify that path starts with root */
      if (!allowNonRootPath && value && value.indexOf(rootPath) !== 0) {
        return Granite.I18n.get('The field must start under the root node of {0}.', rootPath);
      }

      /*
       * Check if path exists in the JCR. The check is made only on when the
       * element loses focus to prevent XHR calls on every key press.
       */
      if (!el.is(':focus')) {
        if (!allowNonExistingPath && ns.utils.isNotBlank(value)) {
          status = (function(){ return $.ajax({
            type: 'GET',
            url: value + '.json',
            async: false}).status;
          })();

          if (status !== "200") {
            return Granite.I18n.get('The field must use a path that exists.');
          }
        }
      }
    }
  });

  /**
   * Check if the input path exists in the JCR
   *
   * Makes a synchronous AJAX call to verify the path exists in the JCR. The
   * validation happens on blur so as to not make an ajax call on every key
   * stroke.
   */
  $(document).on('blur', PATHBROWSER_SELECTOR, function(e) {
    var $pathbrowser,
        container,
        value,
        allowNonExistingPath,
        status;

    $pathbrowser = $(this);
    container = $($pathbrowser.parents('span')[1]);
    value = $pathbrowser.val();
    allowNonExistingPath = ns.utils.getDataAttribute(container, 'allownonexistingpath', false);

    if (!allowNonExistingPath && ns.utils.isNotBlank(value)) {
      status = (function(){ return $.ajax({
        type: 'GET',
        url: value + '.json',
        async: false}).status;
      })();

      if (status === 200) {
        $pathbrowser.setCustomValidity(null);
      } else {
        $pathbrowser.setCustomValidity(Granite.I18n.get('The field must use a path that exists.'));
      }

      $pathbrowser.updateErrorUI();
    }
  });
})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
