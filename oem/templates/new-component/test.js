(function(Components, Core) {

    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = '%SELECTOR%-test';

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
        Test.runTestSuite('%CLASS%', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.%CLASS%.Test = Test;
    return Components;

})(oem.Components, oem.Core);