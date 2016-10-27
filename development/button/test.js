(function(CORE, COMPONENTS) {

    var Test = Object.create(CORE.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Button';

    /**
     * Test example
     *
     * @method     
     */
    Test.exampleIsWorking = function(){
        Test.assert('Tests are working', true, true);
    };    

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Button', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Button.Test = Test;
    return COMPONENTS;

})(oem.Core, oem.Components);