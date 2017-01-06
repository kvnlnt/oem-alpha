(function(COMPONENTS, EL, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'DialogTest';

    function createTestElement () {
        var backdrop = EL("div", {"class":"__backdrop"});
        var content = EL("div", {"class":"__content"});
        var dialog = EL("div", { 
            "data-oem": "Dialog", 
            "data-oem-id":"testDialog",
            "data-oem-width":500,
            "data-oem-height":360,
            "data-oem-fullscreen-at":800
        }, [backdrop, content]);
        return oem.create(oem.Components.Dialog.Prototype, {
            el: dialog
        });
    }

    /**
     * Test example
     *
     * @method     
     */
    Test.canOpenDialog = function(){
        var component = createTestElement();
        component.init();
        component.open();
        var test = component.getEl().classList.contains("--showing");
        Test.assert('can be properly opened', test, true);
    };

    Test.canCloseDialog = function(){
        var component = createTestElement();
        component.init();
        component.open();
        component.close();
        var test = !component.getEl().classList.contains("--showing");
        Test.assert('can be properly closed', test, true);
    };

     Test.isResponsive = function(){
        var component = createTestElement();
        component.init();
        // set the full screen at something we know will be larger than the window innerheight
        component.setFullscreenAt(100000).open();
        var test1 = component.getContentEl().style.width === "100%";
        component.close().setFullscreenAt(100).open();
        var test2 = component.getContentEl().style.width === "500px";
        var test = test1 && test2;
        Test.assert('is responsive', test, true);
    };    

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Dialog', [
            Test.canOpenDialog,
            Test.canCloseDialog,
            Test.isResponsive
        ]);
    });

    // exports
    COMPONENTS.Dialog.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.El, oem.Core.Test);