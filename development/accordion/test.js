(function(COMPONENTS, CORE) {

    var Test = Object.create(CORE.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Accordion';

    Test.sanityCheck = function(){
        Test.assert('Tests are working', true, true);
    };

    Test.afterAll = function(){
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Accordion', [
            Test.sanityCheck
        ]);
    });

    // exports
    COMPONENTS.Accordion.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core);