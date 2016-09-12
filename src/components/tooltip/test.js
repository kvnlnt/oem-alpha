(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Tooltip-test';

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
        Test.runTestSuite('Tooltip', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Tooltip.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Test);