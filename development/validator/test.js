(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ValidatorTest';

    function createTestFieldElement () {
        var input = EL("input", {"type":"text", "name":"firstNameTest", "placeholder":"First Name", "value":"k"});
        var field = EL("div", { "data-oem": "Field", "data-oem-id":"firstNameTest" }, [input] );
        return field;
    }

    /**
     * Test example
     *
     * @method     
     */
    Test.canDoBasicValidation = function(){
        var field = oem.create(oem.Components.Field.Prototype, {
            el: createTestFieldElement()
        }); 
        var validator = oem.create(oem.Components.Validator.Prototype, {
            el: EL("div"),
            id: "valMinTest",
            field: "firstNameTest",
            "validation": "minLength",
            "args": "len:3",
            "message": "First name must be at least 3 chars long"
        }); 
        oem.read("firstNameTest").validate();
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
            // Test.validatesRequired,
            // Test.validatesEmail,
            // Test.validatesPassword,
            // Test.validatesMatch,
            // Test.validatesMixedCase,
            // Test.validatesContainsNumber,
            // Test.validatesMinLength,
            // Test.validatesMaxLength,
            // Test.validatesOptionInList,
            // Test.validatesRegexPatterns
        ]);
    });

    // exports
    COMPONENTS.Validator.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);