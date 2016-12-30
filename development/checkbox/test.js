(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'CheckboxTest';

    /**
     * Test example
     *
     * @method     
     */
    Test.exampleIsWorking = function(){
        Test.assert('Tests covered by Field component', true, true);
    };    

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Checkbox', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Select.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test);