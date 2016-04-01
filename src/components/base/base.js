"use strict";

ToolhouseUI.Components = (function(Components, Core) {

    class _Base {

        constructor(options) {

            // settings
            this.options = options || this.options;
            this.config = options.config || Components.BaseConfig;
            this.selector = options.selector || this.config.selector;
            this.css = options.css || this.config.css;
            this.gfx = options.gfx || this.config.gfx;
            this.dom = this.options.dom || this.config.dom;
            this.breakpoints = this.options.breakpoints || this.config.breakpoints;
            this.attrs = this.getAttrs();
            this.breakpoint = this.breakpoints[0].klass;

            // events
            Core.Events.addEventListener(Core.EVENTS.WINDOW_RESIZED, this.responsify, this);

            // setup
            this.renderCss().responsify();
        }

        getType() {
            return this.type;
        }

        getConfig() {
            return this.config;
        }

        getSelector() {
            return this.selector;
        }

        getHtml() {
            return this.html;
        }

        getCss() {
            return this.css;
        }

        getGfx() {
            return this.gfx;
        }

        getDom() {
            return this.dom;
        }

        getBreakpoint() {
            return this.breakpoint;
        }

        getBreakpoints() {
            return this.breakpoints;
        }

        getAttrs() {
            var attrs = {};
            for (var i = 0; i < this.dom.attributes.length; i++) {
                var attr = this.dom.attributes[i];
                attrs[attr.nodeName] = attr.nodeValue;
            }
            return attrs;
        }

        setType(type) {
            this.type = type;
            return this;
        }

        setConfig(config) {
            this.config;
            return this;
        }

        setSelector(selector) {
            this.selector = selector;
            return this;
        }

        setCss(css) {
            this.css = css;
            return this;
        }

        setGfx(gfx) {
            this.gfx = gfx;
            return gfx;
        }

        setDom(dom) {
            this.dom = dom;
            return dom;
        }

        setHtml(html) {
            this.html = html;
            return this;
        }

        setBreakpoint(breakpoint) {
            this.breakpoint = breakpoint;
            return this;
        }

        setBreakpoints(breakpoints) {
            this.breakpoints = breakpoints;
            return this;
        }

        setAttrs(attrs) {
            this.attrs = attrs;
            return this;
        }

        renderCss() {
            var Css = new Core.Css(this.css.css, this.selector);
            Css.write();
            return this;
        }

        responsify() {
            var width = this.dom.offsetWidth;
            var klass = this.breakpoints[0]; // default
            for (var i = 0; i < this.breakpoints.length; i++) {
                var breakpoint = this.breakpoints[i];
                this.dom.classList.remove(breakpoint.klass);
                if (width >= breakpoint.range[0] && width <= breakpoint.range[1]) {
                    this.dom.classList.add(breakpoint.klass);
                    this.breakpoint = breakpoint.klass;
                }
            }
            return this;
        }
    }

    var Base = {
        type: Core.Component.TYPE.module,
        Class: _Base
    };
    
    Components.Base = Base;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);