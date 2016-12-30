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
    Test.sanity = function(){
        Test.assert('Tests covered by Field component', true, true);
    };    

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('TextInput', [
            Test.sanity
        ]);
    });

    // exports
    COMPONENTS.TextInput.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core);