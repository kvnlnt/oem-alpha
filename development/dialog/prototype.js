(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Dialog"
    });

    Prototype.init = function(){
        this.width = this.getEl().dataset.oemWidth || 500;
        this.height = this.getEl().dataset.oemHeight || 360;
        this.fullScreenAt = Number.parseInt(this.getEl().dataset.oemFullscreenAt) || 800;
        this.overflowY = this.getEl().dataset.oemOverflowY || "auto";
        this.contentEl = this.getEl().querySelectorAll('.__content')[0];
        this.backdropEl = this.getEl().querySelectorAll('.__backdrop')[0];

        // set overflowY
        this.setOverflowY();

        // events
        this.backdropEl.addEventListener('click', this.handleBackdropClick.bind(this));
        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.positionContentWindow.bind(this));
    };

    Prototype.getBackdropEl = function(){
        return this.backdropEl;
    };

    Prototype.close = function(){
        this.getEl().classList.remove('--showing');
    };

    Prototype.getContentEl = function(){
        return this.contentEl;
    };

    Prototype.getOverflowY = function(){
        return this.overflowY;
    };

    Prototype.getWidth = function(){
        return this.width;
    };

    Prototype.getHeight = function(){
        return this.height;
    };

    Prototype.getFullscreenAt = function(){
        return this.fullScreenAt;
    };

    Prototype.handleBackdropClick = function(e){
        e.preventDefault();
        this.close();
    };

    Prototype.open = function(){
        this.positionContentWindow();
        this.getEl().classList.add('--showing');
    };

    Prototype.positionContentWindow = function(){
        var shouldBeFullScreen = this.getFullscreenAt() >= window.innerWidth;
        var left = shouldBeFullScreen ? 0 : (window.innerWidth - this.getWidth())/2 + "px";
        var top = shouldBeFullScreen ? 0 : (window.innerHeight - this.getHeight())/2 + "px";
        var width = shouldBeFullScreen ? "100%" : this.getWidth() + "px";
        var height = shouldBeFullScreen ? "100%" : this.getHeight() + "px";
        this.getContentEl().style.left = left;
        this.getContentEl().style.top = top;
        this.getContentEl().style.width = width;
        this.getContentEl().style.height = height;
        return this;
    };

    Prototype.setOverflowY = function(){
        this.getContentEl().style.overflowY = this.getOverflowY();
    };

    COMPONENTS.Dialog.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);