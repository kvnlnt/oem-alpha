oem.Core = (function(Components, Core) {

    // Css component
    var CssTest = Object.create(Core.Test); // call super constructor
    CssTest.name = "CssTest";
    CssTest.testComponent = 'oem-core-css-test';

    var testCss = [
        {
            selector: "test-css",
            declaration: [
                "color: white",
            ]
        }
    ];

    CssTest.canAddRules = function(){
        // var currentRuleLength = Core.Css.collection.length;
        // Core.Css.add({
        //     id: 'testCss',
        //     css: testCss
        // });
        // Core.Css.renderAll();
        // var test = Core.Css.collection.length === currentRuleLength + 1;
        // CssTest.assert('Can add css rules', test, true);
    };

    CssTest.canRenderValidCss = function(){
        // var renderedCss = Core.Css.renderCss(testCss);
        // var cssOutputShouldBe = "test-css {\n";
        //     cssOutputShouldBe += "   color: white;\n";
        //     cssOutputShouldBe += "}";
        // var test = renderedCss == cssOutputShouldBe;
        // CssTest.assert("Can render valid css", test, true);
    };

    CssTest.canRenderStyleTag = function(){
        // Core.Css.renderStyleTag('random-style',testCss);
        // var style = document.getElementById('random-style');
        // var test = style != null;
        // CssTest.assert("Can render style tags", test, true);
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CssTest.runTestSuite('Css', [
            CssTest.canAddRules,
            CssTest.canRenderValidCss,
            CssTest.canRenderStyleTag
        ]);
    });

    // exports
    Core.CssTest = CssTest;
    return Core;

})(oem.Components || {}, oem.Core);