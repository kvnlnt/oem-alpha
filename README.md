# OEM

OEM is a platform/framework which allows for the quick development and management of your own custom web component library.

## Features/Benefits
* streamlined workflow (via cli)
* 100% native javascript
* 100% unit test coverage
* 100% integration test coverage
* 100% library dependency free
* customizable deployments
* customizable themes/styling
* legacy browser support (IE8+)
* automatically generates pattern library
* enables quick prototyping
* easy integration
* composable architecture
* build server friendly (via cli)

## Setup

    git clone [repo]
    npm install

## How It Works
Oem has two parts: `core` and `components`. The Core *is* the OEM framework while the `components` are the web components that you create and manage. All components and their lifecycles are managed client side by a globally available namespace of `oem`. See `Client Side API` for details. 

OEM also provides a command line utility that streamlines a "conventional" workflow. It relies on the `package.json` file to manage configurations for development, deployment and the creation and destruction of components. The command line utility can be lauched with `node oem`. See the `Command Line API` for details.

## Command Line API
OEM's command line utility facilitates basic workflows for creating, developing and deploying components. The cli can be reached via `node oem [command]`. Each command run's a corresponding script in the `./oem/options/` folder.

    // help

    Options and usage information

    // list

    Lists all registered components.

    // dev [component configuration]
    
    Launches development server (express) for a component, dynamically rendering script all of its configured scripts to script tags in an html document. This allows for simple/conventional troubleshooting and development workflows.

    // [component-name]
    
    Scaffolds out new component with starter code and inline documentation as well as registers a new component to the `package.json` file.

    // [component-name]
    
    Removes a component, all of it's files and it's registration from the `package.json` file.

    // deploy [deployment-name]
    
    Concatenates, minifies and deploys deployments configured in the `package.json` file. Also dynamically generates a pattern libary with all components included in the deployment.

## Client Side API
OEM's final artifact is a single javascript file. Each component has an individual markup structure and implements various abilities exposed by the core as well as their own unique functionality. All components and code are protected under the `oem` namespace. All component lifecycle management and core functionality for oem can be controlled programmatically via the namespace.

    // main namespace

    oem

    // lifecycle management

    oem.list
    oem.create
    oem.read
    oem.update
    oem.destory

    // event bus

    oem.events
    oem.EVENTS

    // core logic

    oem.Core 
    oem.Core.Mixins 
    oem.Core.Modules
    oem.Components 

## Development

### Creating a Component
Example: `node oem create test-component`

A new component titled "test-component" will be added to the `package.json` file. A new folder is created: `./src/components/test-component` which contains starter files for the new component.

#### Source Files:

##### module.js
Main namespace for component. Contains any code common to all instances of the component.

##### gfx.js
To be used to store base64 images unique to this component.

##### css.js
Base styles for this component. Expressed as an array of javascript objects (See Css and Styling).

##### prototype.js
To be used to contain any/all logic for component.

##### test.js
Unit and integration tests

##### templates/description.html
Friendly description of component

##### templates/examples.html
Code examples to be rendered to dev html file and pattern library

##### templates/tests.html
Component targets for the unit tests run by `test.js`.

##### templates/usage.html
Code syntax highlighting blocks and instructions for integration. 

### Css and Styling
All styles are expressed as simple javascript objects with two keys in the `css.js` file:

1. selector (String)
1. declaration (Array of String)

The declaration is nothing more than an array of CSS declarations.

Example:

    {
        selector: ".oem-component",
        declaration: [
            "line-height: 40px",
            "color:" + Core.Modules.Theme.COLORS.GREY
        ]
    }

All styling should be the simplest possible definition that could work. It should use generic styling that can be easily overwritten and extended. Note the use of the global theme object (also customizable) used to implement global settings. It's also possible to add such settings to the `module.js` but is not advisable.


### Coding Standards and Styles
TODO
* Uppercase imported module variables to avoid collisions

1. Native javascript
1. CSS Methodologies (http://sixrevisions.com/css/css-methodologies/)
1. "White label" coding 

### Testing
Tests are a part of the development cycle. Each component has a `templates/tests.html` and `test.js` file which drives this functionality. The tests are driven by the `./src/core/modules/Test.js` module. The test suite combines unit and integration testing by visually displaying the results in the browser along with the component you're developing. This allows for testing to be performed by visiting the component being developed in the respective browser.

### Debugging
Also part of the development cycle. Since the dev server serves a generic html file with generic script tags including all required scripts inline, traditional browser based web development tools can be used for breakpoints, etc. Additionally the deployment file has a map file. Lastly, there is a `./src/core/modules/Logger.js` file that allows for "permanent" debugging capabilities. Calling `Core.Modules.Log("something")` only outputs logging information when a `logging` url parameter is present. Logging "channels" can be subscribed to by giving the logging param a value.

#### All Channels

    logging=true
    logging=all

#### Individual Channels

    logging=some-term

#### Customizations
Both development and deployment configurations have a "customizations" block. This allows you to overwrite a file that was brought in through on the the component sets for that particular configuration. 

    "customizations": [
        {
            "replace": "./src/core/Theme.js",
            "with": "./src/customizations/Example.js"
        }
    ]

## Deployment
Each deployment entry is a configuration used by the `deploy` utility. Each configuration lists the `oem.components` to be deployed and any overwrites (`customizations` see above) to be applied. All files will be compiled and minified in order and written to the `deploy` folder in a folder named after the entry. Example: `node oem deploy custom-site.com` will run the "custom-site.com" deployment and produce the following:

- ./deploy/custom-site.com/

    - oem.js
    - oem.js.map
    - oem.min.js
    - oem.min.js.map

##  Justification: It's not a component library, it's a framework to create a component library.

### Frameworks are a pain but we need them:
Modern adaptive and responsive design UI/UX, device fragmentation, legacy browser support, opinionated frameworks combined with the heavy churn of frontend toolchains have turned modern frontend development into a gauntlet of gotchas. Unfortunately, we need the features and functionality these tools provide in order to efficiently produce a modern web application. 

Today's applications often contain more clientside than serverside code. Some applications are 100% "clientside" and connect to a variety of backend services. This clientside code is often untested or even worse, untestable (without some refactoring). Frameworks help us because they can abstract away core functionality and offer us the reliability of having been tested. 


### There are two types of frontend frameworks:

1. Application logic (Angular, React, Backbone, Ember, etc.)
1. Component library (Bootrap, Foundation, Semantic UI, etc.)

Application logic is at the mercy of your chosen framework but if "done right" can be largely isolated from the features you used in the framework to construct your app. However, this isn't the same for component libraries. All the work that goes into interface flow, selecting dom elements, maintaining state, etc quickly become hotspots for monkeypatching, rerendering, etc...as their intergrations become tightly wound to the component library itself. A component library that can and will evolve away from your implementation(s). 

Instead of providing you with a ready-made set of components, OEM is a framework that provides you with the tools to build your own component library. Your ability to create your own testable, highly customizable components allows you to take control of the quality, efficiency and evolution of your own applications and their workflow. Want two different types of modals? No problem. How about inventing something brand new or finding something in another component library you like, no problem, just create it or port it over!

By building your own component library, you can tightly control:

1. UI/UX
1. Device support
1. Dependency chains
1. Evolutionary pace
1. Build processes

This control will allow you to:

1. Speed up prototyping
1. Introduce interactive prototypes
1. Enable better estimates
1. Speed up design time
1. Speed up development time
1. Solve problems better and faster


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
