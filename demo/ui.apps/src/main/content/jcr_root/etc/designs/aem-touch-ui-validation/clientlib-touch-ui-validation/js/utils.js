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
 * AEM Touch UI Validation library common utilities
 */
(function(ns, window, document, $, Granite, undefined) {
  'use strict';

  ns.utils = {
    /**
     * Is a string not null, undefined, blank or empty
     *
     * @param {String} The string to test
     * @return {Boolean} Is string not null, undefined, blank or empty
     * @function
     */
    isNotBlank: function(str) {
      return typeof str !== 'undefined' && str !== null && str.trim() !== '';
    },

    /**
     * Get a data attribute from a jQuery object
     *
     * If the data attribute is undefined, return the default value.
     *
     * @param {jQuery} A jQuery object
     * @param {String} Data attribute to retrieve from the jQuery object
     * @param {String} Default value if data attribute is undefined
     * @return {String|Number} The data attribute or default value
     * @function
     */
    getDataAttribute: function($el, property, defaultVal) {
      var value = $el.data(property);

      return value === undefined ? defaultVal : value;
    },

    /**
     * Get a attribute from a jQuery object
     *
     * If the attribute is undefined, return the default value.
     *
     * @param {jQuery} A jQuery object
     * @param {String} Attribute to retrieve from the jQuery object
     * @param {String} Default value if attribute is undefined
     * @return {String|Number} The attribute or default value
     * @function
     */
    getAttribute: function($el, property, defaultVal) {
      var value = $el.attr(property);

      return value === undefined ? defaultVal : value;
    },

    /**
     * Get the validation error HTML as a jQuery object
     *
     * @return {jQuery} The validation error HTML as a jQuery object
     * @function
     */
    getFieldErrorEl: function() {
      return $("<span class='coral-Form-fielderror coral-Icon coral-Icon--alert coral-Icon--sizeS' data-init='quicktip' data-quicktip-type='error' />").clone();
    }
  };

})(window.aemTouchUIValidation = window.aemTouchUIValidation || {}, window, document, Granite.$, Granite);
