ToolhouseUI.Core = (function(Core) {

    var Gfx = {};

    /**
     * Renders images from theme to css classes
     *
     * @method     renderThemeImages
     * @param      {<type>}  imageConfigs  { description }
     */
    Gfx.renderThemeImages = function(imageConfigs){

        var selector;
        var imageConfig;
        var cssConfig;
        var css = [];

        // concat all css definitions
        for(var i in imageConfigs){
            for(var x = 0; x < imageConfigs[i].length; x++){
                css.push(imageConfigs[i][x]);
            }
        }

        // render definition
        Core.Css.add({
            id: 'th-images-css',
            css: css
        });

    };

    // do this automatically
    Gfx.renderThemeImages(Core.Theme.IMAGES);

    Core.Gfx = Gfx;
    return Core;
    

})(ToolhouseUI.Core || {});