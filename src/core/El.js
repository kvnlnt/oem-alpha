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

        // create tag
        var _el = document.createElement(tag);

        // add attributes
        Object.keys(attrs).forEach(function addAttr(attr){
            _el.setAttribute(attr, attrs[attr]);
        });

        // add content
        function addContent(content){
            (typeof content === "string") ? _el.innerHTML = content :  _el.appendChild(content);
        }

        // render content
        (content.constructor === Array) ? content.forEach(addContent) : addContent(content);

        // return element
        return _el;
    }

    Core.El = El;
    return Core;

})(oem.Core || {});