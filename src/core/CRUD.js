oem.Core = (function(Core) { 

    var CRUD = {};
    CRUD.createComponent();
    CRUD.readComponent();
    CRUD.updateComponent();
    CRUD.deleteComponent();

    Core.CRUD = CRUD;
    return Core;

})(oem.Core || {});