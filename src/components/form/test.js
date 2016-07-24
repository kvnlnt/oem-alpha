oem.Components = (function(Components, Core) {

    // Form component
    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-form-test';

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
        Test.runTestSuite('Form', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.Form.Test = Test;
    return Components;

})(oem.Components || {}, oem.Core);