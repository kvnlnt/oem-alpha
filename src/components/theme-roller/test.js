oem.Components = (function(Components, Core) {

    // ThemeRoller component
    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-theme-roller-test';

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
        Test.runTestSuite('ThemeRoller', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    Components.ThemeRoller.Test = Test;
    return Components;

})(oem.Components || {}, oem.Core);