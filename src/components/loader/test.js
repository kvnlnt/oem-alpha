(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Loader-test';

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
        Test.runTestSuite('Loader', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Loader.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Test);