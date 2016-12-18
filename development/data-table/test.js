(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'DataTableTest';

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
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('DataTable', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.DataTable.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test);