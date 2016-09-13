## DECISIONS
1. Leave auto configuration of component data up to component. For example, don't auto set parameters from data-oem attrs.
1. The webcomponent spec is still in flux. It has four lifecycle events I'm leaving out for now. Each component is responsible for it's own events which can be reached via oem.read("cid").events;

## TODO
- forms (masks, fields, etc)
- Add smacks or like definition to CSS and Styling section
- logging filters
- internationalization
- data attributes
- development overwrites
- deployment overwrite structure
- validation
- recollection - solved in collector line:42?

## REFERENCES
- "smacks" css https://smacss.com/book/categorizing
- https://webpack.github.io/
- http://youmightnotneedjquery.com/ - reference jquery dependency
- http://html5please.com/#polyfill - reference polyfills
- http://clearleft.com/thinks/382 - component libraries
- https://robots.thoughtbot.com/introducing-empties-unstyled-components - "empties" component library
- http://semantic-ui.com/

### Coding Standards and Styles
TODO
* Uppercase imported module variables to avoid collisions

1. Native javascript
1. CSS Methodologies (http://sixrevisions.com/css/css-methodologies/)
1. "White label" coding 