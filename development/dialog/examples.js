oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, function(){
    document.getElementById('exampleDialogBtn').addEventListener('click', function(){
        oem.read('exampleDialog').open();
    });
});