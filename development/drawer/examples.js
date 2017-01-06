oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, function(){
    
    document.getElementById('testDrawerBtn').addEventListener('click', function(){
        oem.read('testDrawer').open();
    });

    document.getElementById('testDrawerRight').addEventListener('click', function(){
        oem.read('testDrawerRight').open()
    });

    document.getElementById('closeTestDrawerBtn').addEventListener('click', function(){
        oem.read('testDrawer').close()
    });

    document.getElementById('closeTestDrawerRight').addEventListener('click', function(){
        oem.read('testDrawerRight').close()
    });

});