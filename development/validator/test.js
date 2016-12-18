(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ValidatorTest';

    function createTestFieldComponent () {
        var input = EL("input", {"type":"text", "name":"testFirstName", "placeholder":"First Name", "value":"k"});
        var field = EL("div", { "data-oem": "Field", "data-oem-id":"testFirstName" }, [input] );
        return field;
    }

    function createTestValidatorComponent () {
        var validator = EL("div", {
            "data-oem":"Validator",
            "data-oem-id":"testValMin",
            "data-oem-field":"testFirstName",
            "data-oem-validation":"minLength",
            "data-oem-args":"len:3"
        }, "First name must be at least 3 chars long");
        return validator;
    }

    /**
     * Test example
     *
     * @method     
     */
    Test.canDoBasicValidation = function(){
        var field = oem.create(oem.Components.Field.Prototype, {
            el: createTestFieldComponent()
        }); 
        field.init();
        field.setValue('k');
        var validator = oem.create(oem.Components.Validator.Prototype, {
            el: createTestValidatorComponent(),
        });
        validator.init();
        validator.setup();
        oem.read("testFirstName").validate();
        var test = validator.isShowing === true;
        Test.assert('can do basic validation', test, true);
    };

    Test.validatesRequired = function(){
        var test = oem.Components.Validator.required(null) === false;
        Test.assert('validates required', test, true);
    };

    Test.validatesEmail = function(){
        var test = oem.Components.Validator.email('notanemail') === false;
        Test.assert('validates email', test, true);
    };

    Test.validatesPassword = function(){
        var test = oem.Components.Validator.email('notapassword') === false;
        Test.assert('validates password', test, true);
    };

    Test.validatesMatch = function(){
        var test = oem.Components.Validator.match(true, false) === false;
        Test.assert('validates values match', test, true);
    };

    Test.validatesMixedCase = function(){
        var test = oem.Components.Validator.mixedCase('notmixedcase') === false;
        Test.assert('validates mixed case', test, true);
    };

    Test.validatesContainsNumber = function(){
        var test = oem.Components.Validator.containsNumber('nonumberpresent') === false;
        Test.assert('validates has number', test, true);
    };

    Test.validatesMinLength = function(){
        var test = oem.Components.Validator.minLength({val:"test", len:8}) === false;
        Test.assert('validates min length', test, true);
    };

    Test.validatesMaxLength = function(){
        var test = oem.Components.Validator.maxLength({val:"test", len:3}) === false;
        Test.assert('validates max length', test, true);
    };

    Test.validatesOptionInList = function(){
        var test = oem.Components.Validator.optionInList({val:"test", list:"test,next"}) === true;
        Test.assert('validates option in list', test, true);
    };

    Test.validatesRegexPatterns = function(){
        var test1 = oem.Components.Validator.regex({val:"abc12", pattern:"^([a-z0-9]{5,})$"}) === true;
        var test2 = oem.Components.Validator.regex({val:"abc1", pattern:"^([a-z0-9]{5,})$"}) === false;
        var test = test1 && test2;
        Test.assert('validates regex patterns', test, true);
    };

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Validator', [
            Test.canDoBasicValidation,
            Test.validatesRequired,
            Test.validatesEmail,
            Test.validatesPassword,
            Test.validatesMatch,
            Test.validatesMixedCase,
            Test.validatesContainsNumber,
            Test.validatesMinLength,
            Test.validatesMaxLength,
            Test.validatesOptionInList,
            Test.validatesRegexPatterns
        ]);
    });

    // exports
    COMPONENTS.Validator.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);