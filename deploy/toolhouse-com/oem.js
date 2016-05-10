if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
/*
 * Xccessors Standard: Cross-browser ECMAScript 5 accessors
 * http://purl.eligrey.com/github/Xccessors
 * 
 * 2010-06-21
 * 
 * By Eli Grey, http://eligrey.com
 * 
 * A shim that partially implements Object.defineProperty,
 * Object.getOwnPropertyDescriptor, and Object.defineProperties in browsers that have
 * legacy __(define|lookup)[GS]etter__ support.
 * 
 * Licensed under the X11/MIT License
 *   See LICENSE.md
*/

// Removed a few JSLint options as Notepad++ JSLint validator complaining and 
//   made comply with JSLint; also moved 'use strict' inside function
/*jslint white: true, undef: true, plusplus: true,
  bitwise: true, regexp: true, newcap: true, maxlen: 90 */

/*! @source http://purl.eligrey.com/github/Xccessors/blob/master/xccessors-standard.js*/

(function () {
    'use strict';
    var ObjectProto = Object.prototype,
    defineGetter = ObjectProto.__defineGetter__,
    defineSetter = ObjectProto.__defineSetter__,
    lookupGetter = ObjectProto.__lookupGetter__,
    lookupSetter = ObjectProto.__lookupSetter__,
    hasOwnProp = ObjectProto.hasOwnProperty;
    
    if (defineGetter && defineSetter && lookupGetter && lookupSetter) {

        if (!Object.defineProperty) {
            Object.defineProperty = function (obj, prop, descriptor) {
                if (arguments.length < 3) { // all arguments required
                    throw new TypeError("Arguments not optional");
                }
                
                prop += ""; // convert prop to string

                if (hasOwnProp.call(descriptor, "value")) {
                    if (!lookupGetter.call(obj, prop) && !lookupSetter.call(obj, prop)) {
                        // data property defined and no pre-existing accessors
                        obj[prop] = descriptor.value;
                    }

                    if ((hasOwnProp.call(descriptor, "get") ||
                         hasOwnProp.call(descriptor, "set"))) 
                    {
                        // descriptor has a value prop but accessor already exists
                        throw new TypeError("Cannot specify an accessor and a value");
                    }
                }

                // can't switch off these features in ECMAScript 3
                // so throw a TypeError if any are false
                if (!(descriptor.writable && descriptor.enumerable && 
                    descriptor.configurable))
                {
                    throw new TypeError(
                        "This implementation of Object.defineProperty does not support" +
                        " false for configurable, enumerable, or writable."
                    );
                }
                
                if (descriptor.get) {
                    defineGetter.call(obj, prop, descriptor.get);
                }
                if (descriptor.set) {
                    defineSetter.call(obj, prop, descriptor.set);
                }
            
                return obj;
            };
        }

        if (!Object.getOwnPropertyDescriptor) {
            Object.getOwnPropertyDescriptor = function (obj, prop) {
                if (arguments.length < 2) { // all arguments required
                    throw new TypeError("Arguments not optional.");
                }
                
                prop += ""; // convert prop to string

                var descriptor = {
                    configurable: true,
                    enumerable  : true,
                    writable    : true
                },
                getter = lookupGetter.call(obj, prop),
                setter = lookupSetter.call(obj, prop);

                if (!hasOwnProp.call(obj, prop)) {
                    // property doesn't exist or is inherited
                    return descriptor;
                }
                if (!getter && !setter) { // not an accessor so return prop
                    descriptor.value = obj[prop];
                    return descriptor;
                }

                // there is an accessor, remove descriptor.writable;
                // populate descriptor.get and descriptor.set (IE's behavior)
                delete descriptor.writable;
                descriptor.get = descriptor.set = undefined;
                
                if (getter) {
                    descriptor.get = getter;
                }
                if (setter) {
                    descriptor.set = setter;
                }
                
                return descriptor;
            };
        }

        if (!Object.defineProperties) {
            Object.defineProperties = function (obj, props) {
                var prop;
                for (prop in props) {
                    if (hasOwnProp.call(props, prop)) {
                        Object.defineProperty(obj, prop, props[prop]);
                    }
                }
            };
        }
    }
}());

// Begin dataset code

if (!document.documentElement.dataset && 
         // FF is empty while IE gives empty object
        (!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')  ||
        !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)
    ) {
    var propDescriptor = {
        enumerable: true,
        get: function () {
            'use strict';
            var i, 
                that = this,
                HTML5_DOMStringMap, 
                attrVal, attrName, propName,
                attribute,
                attributes = this.attributes,
                attsLength = attributes.length,
                toUpperCase = function (n0) {
                    return n0.charAt(1).toUpperCase();
                },
                getter = function () {
                    return this;
                },
                setter = function (attrName, value) {
                    return (typeof value !== 'undefined') ? 
                        this.setAttribute(attrName, value) : 
                        this.removeAttribute(attrName);
                };
            try { // Simulate DOMStringMap w/accessor support
                // Test setting accessor on normal object
                ({}).__defineGetter__('test', function () {});
                HTML5_DOMStringMap = {};
            }
            catch (e1) { // Use a DOM object for IE8
                HTML5_DOMStringMap = document.createElement('div');
            }
            for (i = 0; i < attsLength; i++) {
                attribute = attributes[i];
                // Fix: This test really should allow any XML Name without 
                //         colons (and non-uppercase for XHTML)
                if (attribute && attribute.name && 
                    (/^data-\w[\w\-]*$/).test(attribute.name)) {
                    attrVal = attribute.value;
                    attrName = attribute.name;
                    // Change to CamelCase
                    propName = attrName.substr(5).replace(/-./g, toUpperCase);
                    try {
                        Object.defineProperty(HTML5_DOMStringMap, propName, {
                            enumerable: this.enumerable,
                            get: getter.bind(attrVal || ''),
                            set: setter.bind(that, attrName)
                        });
                    }
                    catch (e2) { // if accessors are not working
                        HTML5_DOMStringMap[propName] = attrVal;
                    }
                }
            }
            return HTML5_DOMStringMap;
        }
    };
    try {
        // FF enumerates over element's dataset, but not 
        //   Element.prototype.dataset; IE9 iterates over both
        Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
    } catch (e) {
        propDescriptor.enumerable = false; // IE8 does not allow setting to true
        Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
    }
}
if (!document.querySelectorAll) {
  document.querySelectorAll = function (selectors) {
    var style = document.createElement('style'), elements = [], element;
    document.documentElement.firstChild.appendChild(style);
    document._qsa = [];

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    window.scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while (document._qsa.length) {
      element = document._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }
    document._qsa = null;
    return elements;
  };
}

if (!document.querySelector) {
  document.querySelector = function (selectors) {
    var elements = document.querySelectorAll(selectors);
    return (elements.length) ? elements[0] : null;
  };
}
/*!
Copyright (C) 2013-2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window){
  /*! (C) WebReflection Mit Style License */
  if (document.createEvent) return;
  var
    DUNNOABOUTDOMLOADED = true,
    READYEVENTDISPATCHED = false,
    ONREADYSTATECHANGE = 'onreadystatechange',
    DOMCONTENTLOADED = 'DOMContentLoaded',
    SECRET = '__IE8__' + Math.random(),
    // Object = window.Object,
    defineProperty = Object.defineProperty ||
    // just in case ...
    function (object, property, descriptor) {
      object[property] = descriptor.value;
    },
    defineProperties = Object.defineProperties ||
    // IE8 implemented defineProperty but not the plural...
    function (object, descriptors) {
      for(var key in descriptors) {
        if (hasOwnProperty.call(descriptors, key)) {
          try {
            defineProperty(object, key, descriptors[key]);
          } catch(o_O) {
            if (window.console) {
              console.log(key + ' failed on object:', object, o_O.message);
            }
          }
        }
      }
    },
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    // here IE7 will break like a charm
    ElementPrototype = window.Element.prototype,
    TextPrototype = window.Text.prototype,
    // none of above native constructors exist/are exposed
    possiblyNativeEvent = /^[a-z]+$/,
    // ^ actually could probably be just /^[a-z]+$/
    readyStateOK = /loaded|complete/,
    types = {},
    div = document.createElement('div'),
    html = document.documentElement,
    removeAttribute = html.removeAttribute,
    setAttribute = html.setAttribute,
    valueDesc = function (value) {
      return {
        enumerable: true,
        writable: true,
        configurable: true,
        value: value
      };
    }
  ;

  function commonEventLoop(currentTarget, e, $handlers, synthetic) {
    for(var
      handler,
      continuePropagation,
      handlers = $handlers.slice(),
      evt = enrich(e, currentTarget),
      i = 0, length = handlers.length; i < length; i++
    ) {
      handler = handlers[i];
      if (typeof handler === 'object') {
        if (typeof handler.handleEvent === 'function') {
          handler.handleEvent(evt);
        }
      } else {
        handler.call(currentTarget, evt);
      }
      if (evt.stoppedImmediatePropagation) break;
    }
    continuePropagation = !evt.stoppedPropagation;
    /*
    if (continuePropagation && !synthetic && !live(currentTarget)) {
      evt.cancelBubble = true;
    }
    */
    return (
      synthetic &&
      continuePropagation &&
      currentTarget.parentNode
    ) ?
      currentTarget.parentNode.dispatchEvent(evt) :
      !evt.defaultPrevented
    ;
  }

  function commonDescriptor(get, set) {
    return {
      // if you try with enumerable: true
      // IE8 will miserably fail
      configurable: true,
      get: get,
      set: set
    };
  }

  function commonTextContent(protoDest, protoSource, property) {
    var descriptor = getOwnPropertyDescriptor(
      protoSource || protoDest, property
    );
    defineProperty(
      protoDest,
      'textContent',
      commonDescriptor(
        function () {
          return descriptor.get.call(this);
        },
        function (textContent) {
          descriptor.set.call(this, textContent);
        }
      )
    );
  }

  function enrich(e, currentTarget) {
    e.currentTarget = currentTarget;
    e.eventPhase = (
      // AT_TARGET : BUBBLING_PHASE
      e.target === e.currentTarget ? 2 : 3
    );
    return e;
  }

  function find(array, value) {
    var i = array.length;
    while(i-- && array[i] !== value);
    return i;
  }

  function getTextContent() {
    if (this.tagName === 'BR') return '\n';
    var
      textNode = this.firstChild,
      arrayContent = []
    ;
    while(textNode) {
      if (textNode.nodeType !== 8 && textNode.nodeType !== 7) {
        arrayContent.push(textNode.textContent);
      }
      textNode = textNode.nextSibling;
    }
    return arrayContent.join('');
  }

  function live(self) {
    return self.nodeType !== 9 && html.contains(self);
  }

  function onkeyup(e) {
    var evt = document.createEvent('Event');
    evt.initEvent('input', true, true);
    (e.srcElement || e.fromElement || document).dispatchEvent(evt);
  }

  function onReadyState(e) {
    if (!READYEVENTDISPATCHED && readyStateOK.test(
      document.readyState
    )) {
      READYEVENTDISPATCHED = !READYEVENTDISPATCHED;
      document.detachEvent(ONREADYSTATECHANGE, onReadyState);
      e = document.createEvent('Event');
      e.initEvent(DOMCONTENTLOADED, true, true);
      document.dispatchEvent(e);
    }
  }

  function pageGetter(coord) {
    var
      Dir = (coord === 'X' ? 'Left' : 'Top'),
      clientXY = 'client' + coord,
      clientLR = 'client' + Dir,
      scrollLR = 'scroll' + Dir,
      secretXY = '_@' + clientXY
    ;
    return function get() {
      /* jshint validthis:true */
      return  this[secretXY] || (
        this[secretXY] = (
          this[clientXY] + (
            html[scrollLR] || (document.body && document.body[scrollLR]) || 0
          ) -
          html[clientLR]
        )
      );
    };
  }

  function setTextContent(textContent) {
    var node;
    while ((node = this.lastChild)) {
      this.removeChild(node);
    }
    /*jshint eqnull:true */
    if (textContent != null) {
      this.appendChild(document.createTextNode(textContent));
    }
  }

  function verify(self, e) {
    if (!e) {
      e = window.event;
    }
    if (!e.target) {
      e.target = e.srcElement || e.fromElement || document;
    }
    if (!e.timeStamp) {
      e.timeStamp = (new Date()).getTime();
    }
    return e;
  }

  // normalized textContent for:
  //  comment, script, style, text, title
  commonTextContent(
    window.HTMLCommentElement.prototype,
    ElementPrototype,
    'nodeValue'
  );

  commonTextContent(
    window.HTMLScriptElement.prototype,
    null,
    'text'
  );

  commonTextContent(
    TextPrototype,
    null,
    'nodeValue'
  );

  commonTextContent(
    window.HTMLTitleElement.prototype,
    null,
    'text'
  );

  defineProperty(
    window.HTMLStyleElement.prototype,
    'textContent',
    (function(descriptor){
      return commonDescriptor(
        function () {
          return descriptor.get.call(this.styleSheet);
        },
        function (textContent) {
          descriptor.set.call(this.styleSheet, textContent);
        }
      );
    }(getOwnPropertyDescriptor(window.CSSStyleSheet.prototype, 'cssText')))
  );

  defineProperties(
    ElementPrototype,
    {
      // bonus
      textContent: {
        get: getTextContent,
        set: setTextContent
      },
      // http://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
      firstElementChild: {
        get: function () {
          for(var
            childNodes = this.childNodes || [],
            i = 0, length = childNodes.length;
            i < length; i++
          ) {
            if (childNodes[i].nodeType == 1) return childNodes[i];
          }
        }
      },
      lastElementChild: {
        get: function () {
          for(var
            childNodes = this.childNodes || [],
            i = childNodes.length;
            i--;
          ) {
            if (childNodes[i].nodeType == 1) return childNodes[i];
          }
        }
      },
      oninput: {
        get: function () {
          return this._oninput || null;
        },
        set: function (oninput) {
          if (this._oninput) {
            this.removeEventListener('input', this._oninput);
            this._oninput = oninput;
            if (oninput) {
              this.addEventListener('input', oninput);
            }
          }
        }
      },
      previousElementSibling: {
        get: function () {
          var previousElementSibling = this.previousSibling;
          while (previousElementSibling && previousElementSibling.nodeType != 1) {
            previousElementSibling = previousElementSibling.previousSibling;
          }
          return previousElementSibling;
        }
      },
      nextElementSibling: {
        get: function () {
          var nextElementSibling = this.nextSibling;
          while (nextElementSibling && nextElementSibling.nodeType != 1) {
            nextElementSibling = nextElementSibling.nextSibling;
          }
          return nextElementSibling;
        }
      },
      childElementCount: {
        get: function () {
          for(var
            count = 0,
            childNodes = this.childNodes || [],
            i = childNodes.length; i--; count += childNodes[i].nodeType == 1
          );
          return count;
        }
      },
      /*
      // children would be an override
      // IE8 already supports them but with comments too
      // not just nodeType 1
      children: {
        get: function () {
          for(var
            children = [],
            childNodes = this.childNodes || [],
            i = 0, length = childNodes.length;
            i < length; i++
          ) {
            if (childNodes[i].nodeType == 1) {
              children.push(childNodes[i]);
            }
          }
          return children;
        }
      },
      */
      // DOM Level 2 EventTarget methods and events
      addEventListener: valueDesc(function (type, handler, capture) {
        if (typeof handler !== 'function' && typeof handler !== 'object') return;
        var
          self = this,
          ontype = 'on' + type,
          temple =  self[SECRET] ||
                      defineProperty(
                        self, SECRET, {value: {}}
                      )[SECRET],
          currentType = temple[ontype] || (temple[ontype] = {}),
          handlers  = currentType.h || (currentType.h = []),
          e, attr
        ;
        if (!hasOwnProperty.call(currentType, 'w')) {
          currentType.w = function (e) {
            // e[SECRET] is a silent notification needed to avoid
            // fired events during live test
            return e[SECRET] || commonEventLoop(self, verify(self, e), handlers, false);
          };
          // if not detected yet
          if (!hasOwnProperty.call(types, ontype)) {
            // and potentially a native event
            if(possiblyNativeEvent.test(type)) {
              // do this heavy thing
              try {
                // TODO:  should I consider tagName too so that
                //        INPUT[ontype] could be different ?
                e = document.createEventObject();
                // do not clone ever a node
                // specially a document one ...
                // use the secret to ignore them all
                e[SECRET] = true;
                // document a part if a node has never been
                // added to any other node, fireEvent might
                // behave very weirdly (read: trigger unspecified errors)
                if (self.nodeType != 9) {
                  /*jshint eqnull:true */
                  if (self.parentNode == null) {
                    div.appendChild(self);
                  }
                  if ((attr = self.getAttribute(ontype))) {
                    removeAttribute.call(self, ontype);
                  }
                }
                self.fireEvent(ontype, e);
                types[ontype] = true;
              } catch(meh) {
                types[ontype] = false;
                while (div.hasChildNodes()) {
                  div.removeChild(div.firstChild);
                }
              }
              if (attr != null) {
                setAttribute.call(self, ontype, attr);
              }
            } else {
              // no need to bother since
              // 'x-event' ain't native for sure
              types[ontype] = false;
            }
          }
          if ((currentType.n = types[ontype])) {
            self.attachEvent(ontype, currentType.w);
          }
        }
        if (find(handlers, handler) < 0) {
          handlers[capture ? 'unshift' : 'push'](handler);
        }
        if (type === 'input') {
          self.attachEvent('onkeyup', onkeyup);
        }
      }),
      dispatchEvent: valueDesc(function (e) {
        var
          self = this,
          ontype = 'on' + e.type,
          temple =  self[SECRET],
          currentType = temple && temple[ontype],
          valid = !!currentType,
          parentNode
        ;
        if (!e.target) e.target = self;
        return (valid ? (
          currentType.n /* && live(self) */ ?
            self.fireEvent(ontype, e) :
            commonEventLoop(
              self,
              e,
              currentType.h,
              true
            )
        ) : (
          (parentNode = self.parentNode) /* && live(self) */ ?
            parentNode.dispatchEvent(e) :
            true
        )), !e.defaultPrevented;
      }),
      removeEventListener: valueDesc(function (type, handler, capture) {
        if (typeof handler !== 'function' && typeof handler !== 'object') return;
        var
          self = this,
          ontype = 'on' + type,
          temple =  self[SECRET],
          currentType = temple && temple[ontype],
          handlers = currentType && currentType.h,
          i = handlers ? find(handlers, handler) : -1
        ;
        if (-1 < i) handlers.splice(i, 1);
      })
    }
  );

  /* this is not needed in IE8
  defineProperties(window.HTMLSelectElement.prototype, {
    value: {
      get: function () {
        return this.options[this.selectedIndex].value;
      }
    }
  });
  //*/

  // EventTarget methods for Text nodes too
  defineProperties(TextPrototype, {
    addEventListener: valueDesc(ElementPrototype.addEventListener),
    dispatchEvent: valueDesc(ElementPrototype.dispatchEvent),
    removeEventListener: valueDesc(ElementPrototype.removeEventListener)
  });

  defineProperties(
    window.XMLHttpRequest.prototype,
    {
      addEventListener: valueDesc(function (type, handler, capture) {
        var
          self = this,
          ontype = 'on' + type,
          temple =  self[SECRET] ||
                      defineProperty(
                        self, SECRET, {value: {}}
                      )[SECRET],
          currentType = temple[ontype] || (temple[ontype] = {}),
          handlers  = currentType.h || (currentType.h = [])
        ;
        if (find(handlers, handler) < 0) {
          if (!self[ontype]) {
            self[ontype] = function () {
              var e = document.createEvent('Event');
              e.initEvent(type, true, true);
              self.dispatchEvent(e);
            };
          }
          handlers[capture ? 'unshift' : 'push'](handler);
        }
      }),
      dispatchEvent: valueDesc(function (e) {
        var
          self = this,
          ontype = 'on' + e.type,
          temple =  self[SECRET],
          currentType = temple && temple[ontype],
          valid = !!currentType
        ;
        return valid && (
          currentType.n /* && live(self) */ ?
            self.fireEvent(ontype, e) :
            commonEventLoop(
              self,
              e,
              currentType.h,
              true
            )
        );
      }),
      removeEventListener: valueDesc(ElementPrototype.removeEventListener)
    }
  );

  defineProperties(
    window.Event.prototype,
    {
      bubbles: valueDesc(true),
      cancelable: valueDesc(true),
      preventDefault: valueDesc(function () {
        if (this.cancelable) {
          this.defaultPrevented = true;
          this.returnValue = false;
        }
      }),
      stopPropagation: valueDesc(function () {
        this.stoppedPropagation = true;
        this.cancelBubble = true;
      }),
      stopImmediatePropagation: valueDesc(function () {
        this.stoppedImmediatePropagation = true;
        this.stopPropagation();
      }),
      initEvent: valueDesc(function(type, bubbles, cancelable){
        this.type = type;
        this.bubbles = !!bubbles;
        this.cancelable = !!cancelable;
        if (!this.bubbles) {
          this.stopPropagation();
        }
      }),
      pageX: {get: pageGetter('X')},
      pageY: {get: pageGetter('Y')}
    }
  );

  defineProperties(
    window.HTMLDocument.prototype,
    {
      defaultView: {
        get: function () {
          return this.parentWindow;
        }
      },
      textContent: {
        get: function () {
          return this.nodeType === 11 ? getTextContent.call(this) : null;
        },
        set: function (textContent) {
          if (this.nodeType === 11) {
            setTextContent.call(this, textContent);
          }
        }
      },
      addEventListener: valueDesc(function(type, handler, capture) {
        var self = this;
        ElementPrototype.addEventListener.call(self, type, handler, capture);
        // NOTE:  it won't fire if already loaded, this is NOT a $.ready() shim!
        //        this behaves just like standard browsers
        if (
          DUNNOABOUTDOMLOADED &&
          type === DOMCONTENTLOADED &&
          !readyStateOK.test(
            self.readyState
          )
        ) {
          DUNNOABOUTDOMLOADED = false;
          self.attachEvent(ONREADYSTATECHANGE, onReadyState);
          /* global top */
          if (window == top) {
            (function gonna(e){try{
              self.documentElement.doScroll('left');
              onReadyState();
              }catch(o_O){
              setTimeout(gonna, 50);
            }}());
          }
        }
      }),
      dispatchEvent: valueDesc(ElementPrototype.dispatchEvent),
      removeEventListener: valueDesc(ElementPrototype.removeEventListener),
      createEvent: valueDesc(function(Class){
        var e;
        if (Class !== 'Event') throw new Error('unsupported ' + Class);
        e = document.createEventObject();
        e.timeStamp = (new Date()).getTime();
        return e;
      })
    }
  );

  defineProperties(
    window.Window.prototype,
    {
      getComputedStyle: valueDesc(function(){

        var // partially grabbed from jQuery and Dean's hack
          notpixel = /^(?:[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/,
          position = /^(top|right|bottom|left)$/,
          re = /\-([a-z])/g,
          place = function (match, $1) {
            return $1.toUpperCase();
          }
        ;

        function ComputedStyle(_) {
          this._ = _;
        }

        ComputedStyle.prototype.getPropertyValue = function (name) {
          var
            el = this._,
            style = el.style,
            currentStyle = el.currentStyle,
            runtimeStyle = el.runtimeStyle,
            result,
            left,
            rtLeft
          ;
          name = (name === 'float' ? 'style-float' : name).replace(re, place);
          result = currentStyle ? currentStyle[name] : style[name];
          if (notpixel.test(result) && !position.test(name)) {
            left = style.left;
            rtLeft = runtimeStyle && runtimeStyle.left;
            if (rtLeft) {
              runtimeStyle.left = currentStyle.left;
            }
            style.left = name === 'fontSize' ? '1em' : result;
            result = style.pixelLeft + 'px';
            style.left = left;
            if (rtLeft) {
              runtimeStyle.left = rtLeft;
            }
          }
          /*jshint eqnull:true */
          return result == null ?
            result : ((result + '') || 'auto');
        };

        // unsupported
        function PseudoComputedStyle() {}
        PseudoComputedStyle.prototype.getPropertyValue = function () {
          return null;
        };

        return function (el, pseudo) {
          return pseudo ?
            new PseudoComputedStyle(el) :
            new ComputedStyle(el);
        };

      }()),

      addEventListener: valueDesc(function (type, handler, capture) {
        var
          self = window,
          ontype = 'on' + type,
          handlers
        ;
        if (!self[ontype]) {
          self[ontype] = function(e) {
            return commonEventLoop(self, verify(self, e), handlers, false);
          };
        }
        handlers = self[ontype][SECRET] || (
          self[ontype][SECRET] = []
        );
        if (find(handlers, handler) < 0) {
          handlers[capture ? 'unshift' : 'push'](handler);
        }
      }),
      dispatchEvent: valueDesc(function (e) {
        var method = window['on' + e.type];
        return method ? method.call(window, e) !== false && !e.defaultPrevented : true;
      }),
      removeEventListener: valueDesc(function (type, handler, capture) {
        var
          ontype = 'on' + type,
          handlers = (window[ontype] || Object)[SECRET],
          i = handlers ? find(handlers, handler) : -1
         ;
        if (-1 < i) handlers.splice(i, 1);
      })
    }
  );

  (function (styleSheets, HTML5Element, i) {
    for (i = 0; i < HTML5Element.length; i++) document.createElement(HTML5Element[i]);
    if (!styleSheets.length) document.createStyleSheet('');
    styleSheets[0].addRule(HTML5Element.join(','), 'display:block;');
  }(document.styleSheets, ['header', 'nav', 'section', 'article', 'aside', 'footer']));
}(this.window || global));
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = view.Element[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.setAttribute("class", this.toString());
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
    ;
    do {
        token = tokens[i] + "";
        if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.remove = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
        , index
    ;
    do {
        token = tokens[i] + "";
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.toggle = function (token, force) {
    token += "";

    var
          result = this.contains(token)
        , method = result ?
            force !== true && "remove"
        :
            force !== false && "add"
    ;

    if (method) {
        this[method](token);
    }

    if (force === true || force === false) {
        return force;
    } else {
        return !result;
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
    "use strict";

    var testElement = document.createElement("_");

    testElement.classList.add("c1", "c2");

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
            var original = DOMTokenList.prototype[method];

            DOMTokenList.prototype[method] = function(token) {
                var i, len = arguments.length;

                for (i = 0; i < len; i++) {
                    token = arguments[i];
                    original.call(this, token);
                }
            };
        };
        createMethod('add');
        createMethod('remove');
    }

    testElement.classList.toggle("c3", false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
                return force;
            } else {
                return _toggle.call(this, token);
            }
        };

    }

    testElement = null;
}());

}

}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
// POLYFILLS IE8

// Object.create Partial Polyfill
// Support for second parameter is non-standard
if (typeof Object.create !== 'function') {
    Object.create = function(o, props) {
        // Create new object whose prototype is o
        function F() {}
        F.prototype = o;
        result = new F();
        // Copy properties of second parameter into new object
        if (typeof(props) === "object") {
            for (prop in props) {
                if (props.hasOwnProperty((prop))) {
                    // Even though we don't support all of the functionality that the second
                    // parameter would normally have, we respect the format for the object
                    // passed as that second parameter its specification.
                    result[prop] = props[prop].value;
                }
            }
        }
        // Return new object
        return result;
    };
}

window.oem = {};
window.oem.Core = {};
window.oem.Components = {};
window.oem.Collections = {};
oem.Core = (function(Core) {

    var Theme = {};

    // Theme Colors
    var COLORS = {};
    COLORS.black = '#000000';
    COLORS.grey1 = '#111111';
    COLORS.grey2 = '#222222';
    COLORS.grey3 = '#333333';
    COLORS.grey4 = '#444444';
    COLORS.grey5 = '#555555';
    COLORS.grey6 = '#666666';
    COLORS.grey7 = '#777777';
    COLORS.grey8 = '#888888';
    COLORS.grey9 = '#999999';
    COLORS.greyA = '#AAAAAA';
    COLORS.greyB = '#BBBBBB';
    COLORS.greyC = '#CCCCCC';
    COLORS.greyD = '#DDDDDD';
    COLORS.greyE = '#EEEEEE';
    COLORS.white = '#FFFFFF';
    COLORS.alert = 'red';
    COLORS.success = 'green';
    Theme.COLORS = COLORS;

    // css definitions, see Css module
    var IMAGES = {};
    IMAGES.toolhouse = [{
        selector: "oem-image-toolhouse, .oem-image-toolhouse",
        declaration: [
            "background-image: url('data:image/png;base64,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')",
            'background-repeat: no-repeat',
            'background-size: contain',
            'height: 20px'
        ]
    }, {
        selector: "oem-image-toolhouse.desktop, .oem-image-toolhouse.desktop",
        declaration: [
            'background-repeat: no-repeat',
            'height: 34px'
        ]
    }];

    Theme.IMAGES = IMAGES;

    // exports
    Core.Theme = Theme;
    return Core;

})(oem.Core);
oem.Core = (function(Core){

    function Log() {
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    Core.Log = Log;
    return Core;

})(oem.Core || {});
oem.Core = (function(Core){

    // Module
    var Device = {};

    /**
     * isMobile.js v0.3.9
     *
     * A simple library to detect Apple phones and tablets,
     * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
     * and any kind of seven inch device, via user agent sniffing.
     *
     * @author: Kai Mallea (kmallea@gmail.com)
     *
     * @license: http://creativecommons.org/publicdomain/zero/1.0/
     */
    Device.isMobile = (function() {

        var apple_phone = /iPhone/i,
            apple_ipod = /iPod/i,
            apple_tablet = /iPad/i,
            android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
            android_tablet = /Android/i,
            amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
            amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
            windows_phone = /IEMobile/i,
            windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
            other_blackberry = /BlackBerry/i,
            other_blackberry_10 = /BB10/i,
            other_opera = /Opera Mini/i,
            other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
            other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
            seven_inch = new RegExp(
                '(?:' + // Non-capturing group
                'Nexus 7' + // Nexus 7
                '|' + // OR
                'BNTV250' + // B&N Nook Tablet 7 inch
                '|' + // OR
                'Kindle Fire' + // Kindle Fire
                '|' + // OR
                'Silk' + // Kindle Fire, Silk Accelerated
                '|' + // OR
                'GT-P1000' + // Galaxy Tab 7 inch
                ')', // End non-capturing group
                'i'); // Case-insensitive matching

        var match = function(regex, userAgent) {
            return regex.test(userAgent);
        };

        var IsMobileClass = function(userAgent) {
            var ua = userAgent || navigator.userAgent;

            // Facebook mobile app's integrated browser adds a bunch of strings that
            // match everything. Strip it out if it exists.
            var tmp = ua.split('[FBAN');
            if (typeof tmp[1] !== 'undefined') {
                ua = tmp[0];
            }

            this.apple = {
                phone: match(apple_phone, ua),
                ipod: match(apple_ipod, ua),
                tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
                device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
            };
            this.amazon = {
                phone: match(amazon_phone, ua),
                tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
                device: match(amazon_phone, ua) || match(amazon_tablet, ua)
            };
            this.android = {
                phone: match(amazon_phone, ua) || match(android_phone, ua),
                tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
                device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
            };
            this.windows = {
                phone: match(windows_phone, ua),
                tablet: match(windows_tablet, ua),
                device: match(windows_phone, ua) || match(windows_tablet, ua)
            };
            this.other = {
                blackberry: match(other_blackberry, ua),
                blackberry10: match(other_blackberry_10, ua),
                opera: match(other_opera, ua),
                firefox: match(other_firefox, ua),
                chrome: match(other_chrome, ua),
                device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
            };
            this.seven_inch = match(seven_inch, ua);
            this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

            // excludes 'other' devices and ipods, targeting touchscreen phones
            this.phone = this.apple.phone || this.android.phone || this.windows.phone;

            // excludes 7 inch devices, classifying as phone or tablet is left to the user
            this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

            if (typeof window === 'undefined') {
                return this;
            }
        };

        var instantiate = function() {
            var IM = new IsMobileClass();
            IM.Class = IsMobileClass;
            return IM;
        };

        return instantiate();
    })();

    Core.Device = Device;
    return Core;

})(oem.Core || {});

oem.Core = (function(Core){

    // Module
    var Util = {};

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     *
     * @method     debounce
     * @param      {<type>}  func       { description }
     * @param      {<type>}  wait       { description }
     * @param      {<type>}  immediate  { description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    Util.debounce = function Debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * Implements mixin pattern by grafting an object onto another object
     * @param  {object} destination - object to graft onto
     * @param  {object} source      - object to graft from
     * @return {object}             - grafted destination
     */
    Util.extend = function Extend(destination, source) {
        for (var k in source) {
            // append attr value if already exists in destination
            if (destination.hasOwnProperty(k)) {
                destination[k] = destination[k] + source[k];
            } else {
                destination[k] = source[k];
            }
        }
        return destination;
    };

    /**
     * Better javascript type checking
     *
     * @method     type
     * @param      {<type>}  obj     { description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    Util.type = function Type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

    Core.Util = Util;
    return Core;

})(oem.Core || {});
// USAGE
// adds event listener
// @type - string
// @callback - function
// @scope - the scope where the @callback is defined
// EventBus.addEventListener(type, callback, scope)

// removes event listener
// @type - string
// @callback - function
// @scope - the scope where the @callback is defined
// EventBus.removeEventListener(type, callback, scope)

// checks for listener
// @type - string
// @callback - function
// @scope - the scope where the @callback is defined
// EventBus.hasEventListener(type, callback, scope)

// dispatch an event
// @type - string
// @target - the caller
// @args - pass as many arguments as you want
// EventBus.dispatch(type, target, args ...)

// for debugging purpose, it just prints out the added listeners
oem.Core = (function(Core) {

    function EventBus() {
        this.listeners = {};
    };

    EventBus.prototype = {
        addEventListener: function(type, callback, scope) {
            var args = [];
            var numOfArgs = arguments.length;
            for (var i = 0; i < numOfArgs; i++) {
                args.push(arguments[i]);
            }
            args = args.length > 3 ? args.splice(3, args.length - 1) : [];
            if (typeof this.listeners[type] != "undefined") {
                this.listeners[type].push({
                    scope: scope,
                    callback: callback,
                    args: args
                });
            } else {
                this.listeners[type] = [{
                    scope: scope,
                    callback: callback,
                    args: args
                }];
            }
        },
        removeEventListener: function(type, callback, scope) {
            if (typeof this.listeners[type] != "undefined") {
                var numOfCallbacks = this.listeners[type].length;
                var newArray = [];
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.scope == scope && listener.callback == callback) {

                    } else {
                        newArray.push(listener);
                    }
                }
                this.listeners[type] = newArray;
            }
        },
        hasEventListener: function(type, callback, scope) {
            if (typeof this.listeners[type] != "undefined") {
                var numOfCallbacks = this.listeners[type].length;
                if (callback === undefined && scope === undefined) {
                    return numOfCallbacks > 0;
                }
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
                        return true;
                    }
                }
            }
            return false;
        },
        dispatch: function(type, target) {
            var numOfListeners = 0;
            var event = {
                type: type,
                target: target
            };
            var args = [];
            var numOfArgs = arguments.length;
            for (var i = 0; i < numOfArgs; i++) {
                args.push(arguments[i]);
            };
            args = args.length > 2 ? args.splice(2, args.length - 1) : [];
            args = [event].concat(args);
            if (typeof this.listeners[type] != "undefined") {
                var numOfCallbacks = this.listeners[type].length;
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    if (listener && listener.callback) {
                        var concatArgs = args.concat(listener.args);
                        listener.callback.apply(listener.scope, concatArgs);
                        numOfListeners += 1;
                    }
                }
            }
        },
        getListeners: function() {
            return this.listeners;
        }
    };

    Core.EventBus = EventBus;
    return Core;

})(oem.Core || {});

oem.Core = (function(Core) {

    var EVENTS = {
        DOCUMENT_READY: "DOCUMENT_READY",
        WINDOW_RESIZED: "WINDOW_RESIZED",
        WINDOW_SCROLLED: "WINDOW_SCROLLED",
        COMPONENTS_COLLECTED: "COMPONENTS_COLLECTED"
    };

    var Events = new oem.Core.EventBus();

    // when all dom content is loaded
    document.addEventListener("DOMContentLoaded", function(event) {
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        Core.Log(EVENTS.DOCUMENT_READY);
    });

    // when the window is resized
    window.addEventListener("resize", Core.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_RESIZED, this);
        Core.Log(EVENTS.WINDOW_RESIZED);
    }, 250), true);
    
    // when the window is scrolled
    window.addEventListener("scroll", Core.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_SCROLLED, this);
        Core.Log(EVENTS.WINDOW_SCROLLED);
    }, 250), true);

    Core.EVENTS = EVENTS;
    Core.Events = Events;
    return Core;

})(oem.Core || {});
oem.Core = (function(Core) { 

    var Css = {};
    Css.collection = [];

    /**
     * Add new css rule
     *
     * @method     add
     * @param      {<type>}  css     { description }
     */
    Css.add = function(css) {
        Css.collection.push(css);
    };

    /**
     * { function_description }
     *
     * @method     getCss
     * @param      {<type>}           css     { description }
     * @return     {(Object|string)}  { description_of_the_return_value }
     */
    Css.renderCss = function(css) {
        var declarations = function(declaration) {
            return "   " + declaration + ";\n";
        };
        var rules = function(rule) {
            return rule.selector + " {\n" + rule.declaration.map(declarations).join('') + "}";
        };
        // all rules
        return css.map(rules).join('\n\n');
    };

    /**
     * Render specific css
     *
     * @method     render
     * @param      {string}  id      -string of id
     * @param      {Object}  css    - css defintion configuration
     * @return     {Object}         - self
     */
    Css.renderStyleTag = function(id, css) {
        var _head = document.getElementsByTagName('head')[0];
        var _style = document.createElement("style");
        _style.setAttribute("type", "text/css");
        _style.setAttribute("id", id);
        // XXX: this is for IE8
        // we have to try catch this because polyfills don't account for cssText
        try {
             _style.innerHTML = this.renderCss(css);
         } catch(err) {
            _style.styleSheet.cssText = this.renderCss(css);
         }
        _head.appendChild(_style);
        return this;
    };

    /**
     * Render all collected css
     *
     * @method     renderAll
     */
    Css.renderAll = function() {
        var css;
        for (var i = 0; i < Css.collection.length; i++) {
            css = Css.collection[i];
            Css.renderStyleTag(css.id, css.css);
        }
    };

    // generate onload
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, Css.renderAll);

    Core.Css = Css;
    return Core;

})(oem.Core || {});
 oem.Core = (function(Core) {

     var Responsifier = {};

     // components
     Responsifier.components = [];

     // default breakpoints
     Responsifier.BREAKPOINTS = [{
        "klass": "mobile",
         width: [0, 300]
     }, 
     {
        "klass": "short",
         height: [50, 300]
     },
     {
        "klass": "tablet",
         width: [301, 500]
     }, {
        "klass": "desktop",
        width: [501, '*']
     }];

     // initialize
     Responsifier.init = function() {
         Core.Events.addEventListener(Core.EVENTS.WINDOW_RESIZED, Responsifier.responsify);
         return this;
     };

     /**
      * Loops and adds classes based on breakpoints
      *
      * @method     responsify
      * @return     {Object}  { description_of_the_return_value }
      */
     Responsifier.responsify = function() {

         // loop all components        
         for (var i = 0; i < Responsifier.components.length; i++) {

             var component = Responsifier.components[i]; // current component
             var el = component.getEl(); // current element
             var breakpoints = component.getBreakpoints(); // current breakpoints
             var width = el.offsetWidth; // element width
             var height = el.offsetHeight; // element height

             // calc current components classes based on it's breakpoints
             for (var b = 0; b < breakpoints.length; b++) {

                // current breakpoint
                 var breakpoint = breakpoints[b];

                 // reset application of current klass
                 el.classList.remove(breakpoint.klass);

                 // apply width ranges
                 if (breakpoint.hasOwnProperty('width') && 
                    width >= breakpoint.width[0] && 
                    (width <= breakpoint.width[1] || breakpoint.width[1] === '*')) {
                    el.classList.add(breakpoint.klass);
                 }

                 // apply height ranges
                 if (breakpoint.hasOwnProperty('height') && 
                    height >= breakpoint.height[0] && 
                    (height <= breakpoint.height[1] || breakpoint.height[1] === '*')) {
                    el.classList.add(breakpoint.klass);
                 }

             }

         }

         return this;
     };

     /**
      * Add a responsive component
      *
      * @method     addComponent
      * @param      {<type>}  component  { description }
      * @return     {Object}  { description_of_the_return_value }
      */
     Responsifier.addComponent = function(component) {
         Responsifier.components.push(component);
         return this;
     };

     // run after all components have been collected
     Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Responsifier.init);
     Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Responsifier.responsify);

     Core.Responsifier = Responsifier;
     return Core;

 })(oem.Core || {});
oem.Core = (function(Core) {

    var Component = {};
    Component.el = null;
    Component.name = "Component";
    Component.breakpoints = Core.Responsifier.BREAKPOINTS;

    Component.init = function(){
        Core.Responsifier.addComponent(this);
    };

    Component.getEl = function(){
        return this.el;
    };

    Component.setEl = function(el){
        this.el = el;
        return this;
    };

    Component.getName = function(){
        return this.name;
    };

    Component.setName = function(name){
        this.name = name;
        return this;
    };

    Component.getBreakpoints = function(){
        return this.breakpoints;
    };

    Component.setBreakpoints = function(breakpoints){
        this.breakpoints = breakpoints;
        return this;
    };

    Core.Component = Component;
    return Core;
    

})(oem.Core || {});


oem.Core = (function(Core, Collections) {

    // Card component
    var Collector = {};
    Collector.components = [];

    /**
     * Add component to collection
     *
     * @method     addComponent
     * @param      {string}     selector   - string of base selector
     * @param      {Component}  component  - Object component
     * @return     {Object}     return self
     */
    Collector.addComponent = function(selector, component) {
        Collector.components.push({
            selector: selector,
            component: component
        });
        return this;
    };

    /**
     * Collect a component
     *
     * @method     collect
     * @param      {string}     selector   - base selector text
     * @param      {Component}  component  - Object of compoent
     */
    Collector.collect = function(selector, component) {

        // init vars
        var cssSelector = "." + selector;
        var tagSelector = selector;
        var el;

        // create collection of this selector type
        if (typeof Collections[selector] === "undefined") Collections[selector] = [];

        // if this selector has already been collected, reset it
        // calling collect on a component is the same as "recollecting"
        if(Collections[selector].length > 0) Collections[selector] = [];

        // find all components
        // create and store instances of each
        _components = document.querySelectorAll(cssSelector + "," + tagSelector);
        for (var i = 0; i < _components.length; i++) {
            el = _components[i];
            var instance = Object.create(component, {
                el: {
                    value: el
                }
            });

            // call initializer
            instance.init();

            // attach this object instance to the element so we can use all it's 
            // features through the dom element
            el.oem = instance;
            Collections[selector].push(instance);
        }

        // go tell it on the mountain
        Core.Events.dispatch(Core.EVENTS.COMPONENTS_COLLECTED, this);

    };

    /**
     * Collect all registered components
     *
     * @method     collectAll
     */
    Collector.collectAll = function() {
        var component;
        for (var i = 0; i < Collector.components.length; i++) {
            component = Collector.components[i];
            Collector.collect(component.selector, component.component);
        }
    };

    // collect on document ready
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, Collector.collectAll);

    // exports
    Core.Collector = Collector;
    return Core;

})(oem.Core, oem.Collections);
oem.Core = (function(Core) {

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
            id: 'oem-images-css',
            css: css
        });

    };

    // do this automatically
    Gfx.renderThemeImages(Core.Theme.IMAGES);

    Core.Gfx = Gfx;
    return Core;
    

})(oem.Core || {});
oem.Components = (function(Core) {

    var View = {};
    View.id = 'oem-view';
    View.css = [

        {
            selector: "body",
            declaration: [
                "font-size:16px",
                "font-family:Arial"
            ]
        },
        {
            selector: "h1, h2, h3, h4, h5",
            declaration: [
                "font-weight:normal",
                "margin:20px 0"
            ]
        }, 
        {
            selector: "h1",
            declaration: [
                "font-size:32px",
            ]
        }, 
        {
            selector: "h2",
            declaration: [
                "font-size:28px",
            ]
        },
        {
            selector: "h3",
            declaration: [
                "font-size:24px",
            ]
        },
        {
            selector: "h4",
            declaration: [
                "font-size:20px",
            ]
        },
        {
            selector: "h5",
            declaration: [
                "font-size:16px",
            ]
        }, 

    ];

    // add to css renderer
    Core.Css.add({
        id: View.id,
        css: View.css
    });

    Core.View = View;
    return Core;

})(oem.Core || {});
/**
 * Validator
 * @class
 * @desc - Validation object which allows validations to be chained together. Each call to a validation method populates either the "clean" object for valid values or the "error" object for failed validations. 
 * 
 * Tip: Recreate the validation object each time you do a validation. You can call multiple validations on a single field (this is it's intended usage) but if you call the same validation multiple times on a single field, it will simply add to the collection and you'll end up with duplicate errors on the field. 
 * 
 * @example <caption>Basic usage</caption>
 * // returns {username:['Username must be a valid email address']}
 * var validate = new Validator();
 * validate.email('username', 'Username', 'bad-email-address');
 * validate.password('password, 'Password', 'OKpassw0rd');
 * 
 */

 oem.Core =  (function(Core) {

    "use strict";

    function Validator() {
        this.errors = null;
        this.clean = null;
        this.isValid = true;
    }

    Validator.prototype = {

        // internal methods

        /**
         * Add field and message to error collection and return Validator
         *
         * @method     _addError
         * @param      {string}  fieldName  - fieldName of field
         * @param      {string}  message    - message to collect
         * @return     {Object}             - Validator instance
         */
        _addError: function(fieldName, message) {
            if (this.errors === null) this.errors = {};
            if (!this.errors.hasOwnProperty(fieldName)) this.errors[fieldName] = [];
            this.errors[fieldName].push(message);
            this.isValid = false;
            return this;
        },

        /**
         * Add field and message to clean collection and return Validator
         *
         * @method     _addError
         * @param      {string}  fieldName  - input field name of field
         * @param      {string}  message    - message to collect
         * @return     {Object}             - Validator instance
         */
        _addClean: function(fieldName, val) {
            if (this.clean === null) this.clean = {};
            if (!this.clean.hasOwnProperty(fieldName)) this.clean[fieldName] = val;
            return this;
        },

        // validation methods

        /**
         * Pass through validation and return Validator
         * Used to attach a value to the clean collection
         *
         * @method     skip
         * @param      {string}  fieldName      - input field name
         * @param      {string}  fieldLabel     - input field label
         * @param      {*}  fieldVal            - value to pass through
         * @return     {Object}                 - Validator instance
         */
        skip: function(fieldName, fieldLabel, fieldVal) {
            this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate field exists and return Validator
         *
         * @method     required
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {*}       fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        required: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' is required';
            var isValid = fieldVal !== null && fieldVal !== void 0 && fieldVal.length != 0;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string is an email and return Validator
         *
         * @method     email
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        email: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must be a valid email address';
            var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string is a password and return Validator
         *
         * @method     password
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        password: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must be mixed case, alphanumeric and at least 8 characters long';
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate that two strings match and return Validator
         * useful for comparing passwords
         *
         * @method     match
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {*}  fieldVal                    - any value that can be compared with the "===" operator
         * @param      {string}  fieldToMatchLabel      - label of field to match
         * @param      {*}  fieldToMatchVal             - any value that can be compared with the "===" operator
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        match: function(fieldName, fieldLabel, fieldVal, fieldToMatchLabel, fieldToMatchVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + 'This field must match ' + fieldToMatchLabel;
            var isValid = fieldVal === fieldToMatchVal;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate a string is mixed case and return Validator
         *
         * @method     mixedCase
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        mixedCase: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must contain both upper and lower case letters';
            var re = /(?:[a-z].+[A-Z])|(?:[A-Z].+[a-z])/g;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate stirng contains a number and return Validator
         *
         * @method     containsNumber
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {string}  fieldVal               - value to test
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        containsNumber: function(fieldName, fieldLabel, fieldVal, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' must contain at least one number';
            var re = /[0-9]/g;
            var isValid = re.test(fieldVal);
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string has minimum length and return validator
         *
         * @method     minLength
         * @param      {string}     fieldName               - input field name
         * @param      {string}     fieldLabel              - input field label
         * @param      {string}     fieldVal                - value to test
         * @param      {number}     len                     - minimum length
         * @param      {string}     [customErrorMessage]    - optional custom message
         * @return     {Object}                             - Validator instance
         */
        minLength: function(fieldName, fieldLabel, fieldVal, len, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var fieldVal = fieldVal === null ? '' : fieldVal;
            var errorMessage = customErrorMessage || fieldLabel + ' must be at least ' + len + ' characters long';
            var isValid = fieldVal.length >= len;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate string has maxiumum length and return validator
         *
         * @method     maxLength
         * @param      {string}     fieldName               - input field name
         * @param      {string}     fieldLabel              - input field label
         * @param      {string}     fieldVal                - value to test
         * @param      {number}     len                     - maximum length
         * @param      {string}     [customErrorMessage]    - optional custom message
         * @return     {Object}                             - Validator instance
         */
        maxLength: function(fieldName, fieldLabel, fieldVal, len, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var fieldVal = fieldVal === null ? '' : fieldVal;
            var errorMessage = customErrorMessage || fieldLabel + ' must be less than ' + len + ' characters long';
            var isValid = fieldVal.length < len;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        },

        /**
         * Validate value exists in options list and return Validator
         *
         * @method     option
         * @param      {string}  fieldName              - input field name
         * @param      {string}  fieldLabel             - input field label
         * @param      {(number|string)}  fieldVal      - value to test
         * @param      {(number{}|string[])}  options   - array of options to test against
         * @param      {string}  [customErrorMessage]   - optional custom message
         * @return     {Object}                         - Validator instance
         */
        option: function(fieldName, fieldLabel, fieldVal, options, customErrorMessage) {
            var fieldLabel = fieldLabel || null;
            var errorMessage = customErrorMessage || fieldLabel + ' not a valid option';
            var isValid = options.indexOf(fieldVal) > -1;
            if (!isValid) this._addError(fieldName, errorMessage);
            if (isValid) this._addClean(fieldName, fieldVal);
            return this;
        }

    };

    // Extend and return
    Core.Validator = Validator;
    return Core;

})(oem.Core || {});
/**
 * Field Mixin
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

oem.Components = (function(Core) {

    var Field = {};

    Field.validate = function(){

        // create a brand new one each time, that's right start over
        var validator = new Core.Validator();
        var input = this.getEl();
        var value = this.field.value;
        var configElements = input.querySelectorAll('div.validations > div');

        // collect validations
        var arguments;
        var configElement;
        var validation;
        var settings;
        var errorMessage;

        for(var i = 0; i < configElements.length; i = i + 1){
            configElement = configElements[i];
            errorMessage = configElement.innerText;
            validation = configElement.dataset.validation;
            settings = configElement.dataset.settings.split(',');
            arguments = [];
            arguments.push(this.fieldName);
            arguments.push(this.label);
            arguments.push(value); // get field value
            arguments.push.apply(arguments, settings); // add validation arguments
            arguments.push(errorMessage); // add message
            validator[validation].apply(validator, arguments);
        }

        this.renderErrors(validator);
        
    };

    Field.renderErrors = function(validator){

        // empty error list
        while (this.errors.hasChildNodes()) {
            this.errors.removeChild(this.errors.lastChild);
        }

        // leave if no errors
        if(validator.isValid) return false;

        // don't do anything until we've validated things
        if(!this.hasValidatedOnce) return false;

        var errors = validator.errors[this.fieldName];

        // now populate
        for(var i = 0; i < errors.length; i = i + 1){
            li = document.createElement('li');
            li.innerText = errors[i];
            this.errors.appendChild(li);
        }
    };

    Core.Field = Field;
    return Core;

})(oem.Core);
oem.Components = (function(Components) {

    var CardGfx = {};
    Components.CardGfx = CardGfx;
    return Components;

})(oem.Components || {});
oem.Components = (function(Components, Core) {

    var CardModel = {};

    CardModel.test = function(){
        return 'test';
    };

    Components.CardModel = CardModel;
    return Components;

})(oem.Components || {}, oem.Core);
oem.Components = (function(Components, Core) {

    var CardView = {};
    CardView.id = 'oem-card-css';
    CardView.css = [

        {
            selector: "oem-card, .oem-card",
            declaration: [
                "background-color: " + Core.Theme.COLORS.white,
                "font-size: 16px",
                "display:block",
                "padding:10px",
                "text-align:center",
                "box-shadow: 0px 0px 4px " + Core.Theme.COLORS.greyA
            ]
        },

        {
            selector: "oem-card.mobile, .oem-card.mobile",
            declaration: [
                
            ]
        },

        {
            selector: "oem-card.tablet, .oem-card.tablet",
            declaration: [
                "text-align:left"
            ]
        },

        {
            selector: "oem-card.desktop, .oem-card.desktop",
            declaration: [
                "font-size:24px;",
                "text-align:left"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: CardView.id,
        css: CardView.css
    });

    Components.CardView = CardView;
    return Components;

})(oem.Components || {}, oem.Core);
oem.Components = (function(Components, Core) {

    // Card component
    var Card = Object.create(Core.Component); // call super constructor.
    Card.name = "Card";
    Core.Util.extend(Card, Components.CardModel);
    
    // exports
    Components.Card = Card;
    return Components;

})(oem.Components || {}, oem.Core);
oem.Components = (function(Components, Core) {
    Core.Collector.addComponent('oem-card', Components.Card);
    return Components;
})(oem.Components || {}, oem.Core);
