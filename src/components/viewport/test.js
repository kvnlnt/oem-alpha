(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ViewportTest';

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
        Test.runTestSuite('Viewport', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Viewport.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Test);