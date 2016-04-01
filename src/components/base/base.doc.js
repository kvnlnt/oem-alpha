"use strict";

ToolhouseUI.Components = (function(Components, Core) {

    class BaseDoc extends Components.Doc {

        constructor() {

            super({
                documents: Components.Base,
                descr: "Base component",
                selector: "th-base-doc",
                dom: null,
            });

        }

    };

    BaseDoc.type = Core.Component.TYPE.doc;
    Components.BaseDoc = BaseDoc;

    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);