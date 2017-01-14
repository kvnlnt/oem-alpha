(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'FieldTest';

    function createTestElement () {
        var label = EL("label", { "for":"inputField"}, "First Name");
        var help = EL("div", { "class":"help"}, "Please enter your first name");
        var input = EL("input", {"type":"text", "name":"inputField", "placeholder":"First Name"});
        var field = EL("div", { "data-oem": "Field", "data-oem-id":"Field" }, [label, help, input] );
        return oem.create(oem.Components.Field.Prototype, {
            el: field
        });
    }

    /**
     * Test example
     *
     * @method     
     */
    Test.canGetAndSetValue = function(){
        var component = createTestElement();
        component.init();
        component.setValue('newValue');
        var test = component.getValue() === "newValue";
        Test.assert('can get and set value', test, true);
    };   

    Test.canGetLabel = function(){
        var component = createTestElement();
        component.init();
        component.setValue('newValue');
        var test = component.getLabel().innerText === "First Name";
        Test.assert('can get label', test, true);
    };

    Test.canGetField = function(){
        var component = createTestElement();
        component.init();
        component.setValue('newValue');
        var test = component.getField().name === "inputField";
        Test.assert('can get field', test, true);
    }; 

    Test.canGetName = function(){
        var component = createTestElement();
        component.init();
        component.setValue('newValue');
        var test = component.getName() === "inputField";
        Test.assert('can get field name', test, true);
    };

    Test.canAddandRunValidator = function(){
        var component = createTestElement();
        component.init();
        var el = document.createElement("div");
        el.id = "validator";
        var validator = oem.create(oem.Components.Validator.Prototype, {
            id: 'validator',
            field:'Field',
            validation:'minLength',
            args:'len:3',
            message:'not long enough',
            el: el
        });
        component.addValidator(validator);
        var test1 = component.getValidators().length >= 1;
        component.validate();
        var test2 = validator.isShowing === true;
        var test = test1 && test2;
        Test.assert('can add and run validators', test, true);
    };

    Test.canResetField = function(){
        var component = createTestElement();
        component.init();
        component.setValue('newValue');
        var el = document.createElement("div");
        el.id = "validator";
        var validator = oem.create(oem.Components.Validator.Prototype, {
            id: 'validator',
            field:'Field',
            validation:'minLength',
            args:'len:3',
            message:'not long enough',
            el: el
        });
        component.addValidator(validator);
        component.reset();
        var test = component.getValidators()[0].isShowing === false;
        Test.assert("can reset field", test, true);
    };

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Field', [
            Test.canGetAndSetValue,
            Test.canGetLabel,
            Test.canGetName,
            Test.canGetField,
            Test.canAddandRunValidator,
            Test.canResetField
        ]);
    });

    // exports
    COMPONENTS.Field.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);