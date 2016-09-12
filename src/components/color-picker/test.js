(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ColorPicker-test';

    /**
     * Test example
     *
     * @method     
     */
    Test.exampleIsWorking = function(){
        Test.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('ColorPicker', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.ColorPicker.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Test);