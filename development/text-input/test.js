(function(COMPONENTS, CORE) {

    // TextInput component
    var Test = Object.create(CORE.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'TextInput';

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
        Test.runTestSuite('TextInput', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.TextInput.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.CORE);