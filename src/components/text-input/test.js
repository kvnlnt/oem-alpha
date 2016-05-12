oem.Components = (function(Components, Core) {

    // TextInput component
    var TextInputTest = Object.create(Core.Test); // call super constructor
    TextInputTest.name = "Tests";
    TextInputTest.testComponent = 'oem-text-input-test';

    /**
     * Test example
     *
     * @method     
     */
    TextInputTest.exampleIsWorking = function(){
        TextInputTest.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        TextInputTest.runTestSuite('TextInput', [
            TextInputTest.exampleIsWorking
        ]);
    });

    // exports
    Components.TextInputTest = TextInputTest;
    return Components;

})(oem.Components || {}, oem.Core);