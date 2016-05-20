oem.Components = (function(Components, Core) {

    // %CLASS% component
    var %CLASS%Test = Object.create(Core.Test); // call super constructor
    %CLASS%Test.name = "Tests";
    %CLASS%Test.testComponent = '%SELECTOR%-test';

    /**
     * Test example
     *
     * @method     
     */
    %CLASS%Test.exampleIsWorking = function(){
        %CLASS%Test.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        %CLASS%Test.runTestSuite('%CLASS%', [
            %CLASS%Test.exampleIsWorking
        ]);
    });

    // exports
    Components.%CLASS%Test = %CLASS%Test;
    return Components;

})(oem.Components || {}, oem.Core);