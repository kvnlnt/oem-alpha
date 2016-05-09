/**
 * Validator
 * @class
 * @desc - Validation object which allows validations to be chained together. Each call to a validation method populates either the "clean" object for valid values or the "error" object for failed validations. 
 * 
 * Tip: Recreate the validation object each time you do a validation. You can call multiple validations on a single field (this is it's intended usage) but if you call the same validation multiple times on a single field, it will simply add to the collection and you'll end up with duplicate errors on the field. 
 * 
 * @example <caption>Basic usage</caption>
 * // returns {username:['Username must be a valid email address']}
 * var validate = new Validator();
 * validate.email('username', 'Username', 'bad-email-address');
 * validate.password('password, 'Password', 'OKpassw0rd');
 * 
 */

 oem.Core =  (function(Core) {

    "use strict";

    function Validator() {
        this.errors = null;
        this.clean = null;
        this.isValid = true;
    }

    Validator.prototype = {

        // internal methods

        /**
         * Add field and message to error collection and return Validator
         *
         * @method     _addError
         * @param      {string}  fieldName  - fieldName of field
         * @param      {string}  message    - message to collect
         * @return     {Object}             - Validator instance
         */
        _addError: function(fieldName, message) {
            if (this.errors === null) this.errors = {};
            if (!this.errors.hasOwnProperty(fieldName)) this.errors[fieldName] = [];
            this.errors[fieldName].push(message);
            this.isValid = false;
            return this;
        },

        /**
         * Add field and message to clean collection and return Validator
         *
         * @method     _addError
         * @param      {string}  fieldName  - input field name of field
         * @param      {string}  message    - message to collect
         * @return     {Object}             - Validator instance
         */
        _addClean: function(fieldName, val) {
            if (this.clean === null) this.clean = {};
            if (!this.clean.hasOwnProperty(fieldName)) this.clean[fieldName] = val;
            return this;
        },

        // validation methods

        /**
         * Pass through validation and return Validator
         * Used to attach a value to the clean collection
         *
         * @method     skip
         * @param      {string}  fieldName      - input field name
         * @param      {string}  fieldLabel     - input field label
         * @param      {*}  fieldVal            - value to pass through
         * @return     {Object}                 - Validator instance
         */
        skip: function(fieldName, fieldLabel, fieldVal) {
            this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate field exists and return Validator
         *
         * @method     required
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {*}       fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        required: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' is required';
            var isValid = fieldVal !== null && fieldVal !== void 0 && fieldVal.length != 0;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string is an email and return Validator
         *
         * @method     email
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        email: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must be a valid email address';
            var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string is a password and return Validator
         *
         * @method     password
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        password: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must be mixed case, alphanumeric and at least 8 characters long';
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate that two strings match and return Validator
         * useful for comparing passwords
         *
         * @method     match
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {*}  fieldVal                    - any value that can be compared with the "===" operator
         * @param      {string}  fieldToMatchLabel      - label of field to match
         * @param      {*}  fieldToMatchVal             - any value that can be compared with the "===" operator
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        match: function(fieldName, fieldLabel, fieldVal, fieldToMatchLabel, fieldToMatchVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + 'This field must match ' + fieldToMatchLabel;
            var isValid = fieldVal === fieldToMatchVal;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate a string is mixed case and return Validator
         *
         * @method     mixedCase
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        mixedCase: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must contain both upper and lower case letters';
            var re = /(?:[a-z].+[A-Z])|(?:[A-Z].+[a-z])/g;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate stirng contains a number and return Validator
         *
         * @method     containsNumber
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        containsNumber: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must contain at least one number';
            var re = /[0-9]/g;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string has minimum length and return validator
         *
         * @method     minLength
         * @param      {string}     fieldName               - input field name
         * @param      {string}     fieldLabel              - input field label
         * @param      {string}     fieldVal                - value to test
         * @param      {number}     len                     - minimum length
         * @param      {string}     [customErrorMessage]    - optional custom message
         * @return     {Object}                             - Validator instance
         */
        minLength: function(fieldName, fieldLabel, fieldVal, len, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var fieldVal = fieldVal === null ? '' : fieldVal;
            var errorMessage = customErrorMessage || fieldLabel + ' must be at least ' + len + ' characters long';
            var isValid = fieldVal.length >= len;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string has maxiumum length and return validator
         *
         * @method     maxLength
         * @param      {string}     fieldName               - input field name
         * @param      {string}     fieldLabel              - input field label
         * @param      {string}     fieldVal                - value to test
         * @param      {number}     len                     - maximum length
         * @param      {string}     [customErrorMessage]    - optional custom message
         * @return     {Object}                             - Validator instance
         */
        maxLength: function(fieldName, fieldLabel, fieldVal, len, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var fieldVal = fieldVal === null ? '' : fieldVal;
            var errorMessage = customErrorMessage || fieldLabel + ' must be less than ' + len + ' characters long';
            var isValid = fieldVal.length < len;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate value exists in options list and return Validator
         *
         * @method     option
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {(number|string)}  fieldVal      - value to test
         * @param      {(number{}|string[])}  options   - array of options to test against
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        option: function(fieldName, fieldLabel, fieldVal, options, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' not a valid option';
            var isValid = options.indexOf(fieldVal) > -1;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        }

    };

    // Extend and return
    Core.Validator = Validator;
    return Core;

})(oem.Core || {});