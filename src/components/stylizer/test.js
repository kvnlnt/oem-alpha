oem.Components = (function(Components, Core) {

    // Stylizer component
    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-stylizer-test';

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
        Test.runTestSuite('Stylizer', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.Stylizer.Test = Test;
    return Components;

})(oem.Components || {}, oem.Core);