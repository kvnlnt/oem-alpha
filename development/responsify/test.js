(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ResponsifyTest';

    function createTestFieldElement () {
        var input = EL("input", {"type":"text", "name":"firstNameTest", "placeholder":"First Name", "value":"k"});
        var field = EL("div", { "data-oem": "Field", "data-oem-id":"testField" }, [input] );
        return field;
    }

    /**
     * Test example
     *
     * @method     
     */
    Test.canAddRemoveResponsiveClass = function(){
        var field = oem.create(oem.Components.Field.Prototype, {
            el: createTestFieldElement()
        }); 
        var responsify = oem.create(oem.Components.Responsify.Prototype, {
            el: EL("div"),
            id:"testResponsive",
            component:"testField",
            responsiveClass:"test-class",
            dimension:"width",
            min:"0",
            max:"360"
        });
        responsify.init();
        var testComponent = document.querySelector('[data-oem-test="ResponsifyTest"]');
        testComponent.appendChild(field.getEl());
        field.getEl().style.width = "100px";
        oem.events.dispatch(oem.EVENTS.WINDOW_RESIZED);
        Test.assert('Can add responsive class', field.getEl().classList.contains('test-class'), true);
        field.getEl().style.width = "500px";
        oem.events.dispatch(oem.EVENTS.WINDOW_RESIZED);
        Test.assert('Can remove responsive class', !field.getEl().classList.contains('test-class'), true);
        testComponent.removeChild(field.getEl());
        oem.destroy("testField");
        oem.destroy("testResponsive");
    };    

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Responsify', [
            Test.canAddRemoveResponsiveClass
        ]);
    });

    // exports
    COMPONENTS.Responsify.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);