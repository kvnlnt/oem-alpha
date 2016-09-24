/**
 * Validator
 * @module
 * @desc - pile of validation functions 

 * 
 */

(function(Core) {

    "use strict";

    var Validator = {

        // validation methods

        /**
         * Validate field exists
         * @method     required
         */
        required: function(val) {
            var isValid = val !== null && val !== void 0 && val.length != 0 && val != false;
            return isValid;
        },

        /**
         * Validate string is an email and return Validator
         * @method     email
         */
        email: function(val) {
            var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
            var isValid = re.test(val);
            return isValid;
        },

        /**
         * Validate string is a password and return Validator
         * @method     password
         */
        password: function(val) {
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
            var isValid = re.test(val);
            return isValid;
        },

        /**
         * Validate that two strings match and return Validator
         * @method     match
         */
        match: function(val1, val2) {
            var isValid = val1 === val2;
            return isValid;
        },

        /**
         * Validate a string is mixed case and return Validator
         * @method     mixedCase
         */
        mixedCase: function(val) {
            var re = /(?:[a-z].+[A-Z])|(?:[A-Z].+[a-z])/g;
            var isValid = re.test(val);
            return isValid;
        },

        /**
         * Validate stirng contains a number and return Validator
         * @method     containsNumber
         */
        containsNumber: function(val) {
            var re = /[0-9]/g;
            var isValid = re.test(val);
            return isValid;
        },

        /**
         * Validate string has minimum length and return validator
         * @method     minLength
         */
        minLength: function(val, len) {
            var val = val === null ? '' : val;
            var isValid = val.length >= len;
            return isValid;
        },

        /**
         * Validate string has maxiumum length and return validator
         * @method     maxLength
         */
        maxLength: function(val, len) {
            var val = val === null ? '' : val;
            var isValid = val.length < len;
            return isValid;
        },

        /**
         * Validate value exists in options list and return Validator
         * @method     option
         */
        option: function(val, options) {
            var isValid = options.indexOf(val) > -1;
            return isValid;
        },

        /**
         * Validate against regex value
         * @method     option
         */
        regex: function(val, regex) {
            var isValid = val.match(regex);
            return this;
        }

    };

    // Extend and return
    Core.Modules.Validator = Validator;
    return Core;

})(oem.Core);