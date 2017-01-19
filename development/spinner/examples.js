oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, function(){
    var countdown = 3;
    var interval = null;
    interval = setInterval(function(){
        oem.read("exampleSpinner").setMessage('Loading in ' + countdown + ' seconds');
        countdown -= 1;
        if(countdown < 0) {
            clearInterval(interval);
            oem.read("exampleSpinner").hide()
        }
    }, 1000);

});