(function(Components, Core) {

    // TextInput component
    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-text-input-test';

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
        Test.runTestSuite('TextInput', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.TextInput.Test = Test;
    return Components;

})(oem.Components, oem.Core);