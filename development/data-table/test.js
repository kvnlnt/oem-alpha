(function(COMPONENTS, EL,  TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'DataTableTest';

    function createTestElement () {

        // header
        var headerCol1 = EL("th", { "data-oem-sort-by": "INTEGER", "scope":"col"}, "ID");
        var headerCol2 = EL("th", { "data-oem-sort-by": "ALPHA", "scope":"col"}, "Alpha");
        var headerCol3 = EL("th", { "data-oem-sort-by": "DATE", "scope":"col"}, "Date");
        var header = EL("tr", {}, [headerCol1, headerCol2, headerCol3]);
        var thead = EL("thead", {}, header);

        // body
        var row1col1 = EL("td", {}, "1");
        var row1col2 = EL("td", {}, "A");
        var row1col3 = EL("td", {}, "01/01/75");
        var row1 = EL("tr", {}, [row1col1, row1col2, row1col3]);
        var row2col1 = EL("td", {}, "2");
        var row2col2 = EL("td", {}, "B");
        var row2col3 = EL("td", {}, "01/02/75");
        var row2 = EL("tr", {}, [row2col1, row2col2, row2col3]);
        var row3col1 = EL("td", {}, "3");
        var row3col2 = EL("td", {}, "C");
        var row3col3 = EL("td", {}, "01/03/75");
        var row3 = EL("tr", {}, [row3col1, row3col2, row3col3]);
        var tbody = EL("tbody", {}, [row1, row2, row3]);
        var table = EL("table", {}, [thead, tbody]);
        var component = EL("div", { "data-oem": "DataTable", "data-oem-id":"testTableEl" }, table);

        // create component
        return oem.create(oem.Components.DataTable.Prototype, {
            el: component
        });
    }

    /**
     * Determines ability to sort by integer.
     */
    Test.canSortByInteger = function(){
        var component = createTestElement();
        component.init();
        var column = component.getEl().querySelectorAll("table thead tr th")[0];
        column.click();
        column.click();
        var test = component.getRecords()[0].ID === 3;
        Test.assert('can sort by integer', test, true);
    }; 

    /**
     * Determines ability to sort by alpha.
     */
    Test.canSortByAlpha = function(){
        var component = createTestElement();
        component.init();
        var column = component.getEl().querySelectorAll("table thead tr th")[1];
        column.click();
        column.click();
        var test = component.getRecords()[0].Alpha === "C";
        Test.assert('can sort by alpha', test, true);
    };

    Test.canSortByDate = function(){
        var component = createTestElement();
        component.init();
        var column = component.getEl().querySelectorAll("table thead tr th")[2];
        column.click();
        column.click();
        var test = component.getRecords()[0].Date === "01/03/75";
        Test.assert('can sort by date', test, true);
    };       

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('DataTable', [
            Test.canSortByInteger,
            Test.canSortByAlpha,
            Test.canSortByDate
        ]);
    });

    // exports
    COMPONENTS.DataTable.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.El, oem.Core.Test);