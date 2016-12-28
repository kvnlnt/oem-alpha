(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'DrawerTest';

    function createTestElement () {
        var el = EL("div", { "data-oem": "Drawer", "data-oem-id":"testDrawerEl" });
        return oem.create(oem.Components.Drawer.Prototype, {
            el: el
        });
    }

    Test.canOpenAndCloseDrawer = function(){
        var component = createTestElement();
        component.init();
        component.open();
        Test.assert('can open drawer', component.isOpen(), true);
        component.close();
        Test.assert('can close drawer', component.isOpen(), false);
    };     

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Drawer', [
            Test.canOpenAndCloseDrawer
        ]);
    });

    // exports
    COMPONENTS.Drawer.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);