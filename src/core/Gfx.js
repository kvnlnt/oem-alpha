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

        // convert image configs to css configs
        for(var i in imageConfigs){
            imageConfig = imageConfigs[i];
            selector = i;
            cssConfig = {};
            cssConfig.selector = 'th-image-'+i + ',' + '.th-image-'+i;
            cssConfig.declaration = [
                'background-image: url('+imageConfig.image+')',
                'background-repeat: no-repeat',
                'width:' + imageConfig.width,
                'height:' + imageConfig.height
            ];
            css.push(cssConfig);
        }

        Core.Css.add({
            id: selector,
            css: css
        });

    };

    // do this automatically
    Gfx.renderThemeImages(Core.Theme.IMAGE);

    Core.Gfx = Gfx;
    return Core;
    

})(ToolhouseUI.Core || {});