(function(CORE) {

    // Css component
    var ElTest = Object.create(CORE.Test); // call super constructor
    ElTest.name = "ElTest";
    ElTest.testComponent = 'ElTest';

    ElTest.canCreateDomElements = function(){
        var el = CORE.El("div", { "class": "parent" }, [
            "testing",
            CORE.El("div", { "class": "child1"}, "testing"),
            CORE.El("div", { "class": "child2"}, "testing")
        ]);
        var elExists = el.classList.contains("parent");
        var elHasTextContent = el.textContent === "testingtestingtesting";
        var firstChildExists = el.children[0].classList.contains("child1");
        var firstChildHasTextContent = el.children[0].textContent === "testing";
        var secondChildExists = el.children[1].classList.contains("child2");
        var secondChildHasTextContent = el.children[1].textContent === "testing";
        var test = elExists && 
            elHasTextContent && 
            firstChildExists && 
            firstChildHasTextContent && 
            secondChildExists &&
            secondChildHasTextContent;
        ElTest.assert("Can create dom elements", test, true);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        ElTest.runTestSuite('El', [
            ElTest.canCreateDomElements
        ]);
    });

    // exports
    CORE.ElTest = ElTest;
    return CORE;

})(oem.Core);