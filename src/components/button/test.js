oem.Components = (function(Components, Core) {

    // Button component
    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-button-test';

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
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Button', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.Button.Test = Test;
    return Components;

})(oem.Components || {}, oem.Core);