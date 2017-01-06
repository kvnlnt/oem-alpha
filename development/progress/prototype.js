(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Progress"
    });

    Prototype.init = function(){
        this.progress = this.getEl().dataset.oemProgress || 0;
        this.barEl = this.getEl().querySelectorAll('.__bar')[0];
        this.updateProgress();
    };

    Prototype.getProgress = function(){
        return this.progress;
    };

    Prototype.getBarEl = function(){
        return this.barEl;
    };

    Prototype.setProgress = function(progress){
        if(progress > 100) this.progress = 100;
        if(progress < 0) this.progress = 0;
        if(progress < 100 && progress > 0) this.progress = progress;
        this.updateProgress();
        return this;
    };

    Prototype.updateProgress = function(){
        this.getBarEl().style.width = this.getProgress() + "%";
    };

    COMPONENTS.Progress.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);