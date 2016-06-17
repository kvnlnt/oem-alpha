// USAGE
// =====
// var grandchild = el("div", {class:"subchild"}, "grandchild");
// var child1 = el("div", { class:"child"}, ["child1", grandchild]);
// var child2 = el("div", { class:"child"}, "child2");
// var parent = el("div", { class: "parent" }, ["parents just don't understand", child1, child2]);
// 
// RESULT
// ======
// <div class="parent">
//     parents just don't understand
//     <div class="child">
//         child1
//         <div class="subchild">
//             grandchild
//         </div>
//     </div>
//     <div class="child">
//         child2
//     </div>
// </div>

oem.Core = (function(Core) { 

    function El(tag, attrs, content) {

        // convert content to an array
        var content = content || "";
        content = content instanceof Array ? content : [content];

        var attrs = attrs || {};

        // create tag
        var el = el || document.createElement(tag);

        // add attributes
        Object.keys(attrs).forEach(function addAttr(attr){
            el.setAttribute(attr, attrs[attr]);
        });

        function addContent(content){
            if(typeof content === "string" || content instanceof String){
                var content = document.createTextNode(content);
            }
            el.appendChild(content);
        }
      
        content.forEach(addContent);

        return el;
 
    }

    Core.El = El;
    return Core;

})(oem.Core || {});