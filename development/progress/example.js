oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, function(){
    var progress = 0;
    // animate the progress bar
    setInterval(function(){
        oem.read("exampleProgress").setProgress(progress); 
        progress = progress + 1 === 100 ? 0 : progress + 1;
    }, 50);
});