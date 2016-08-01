# OEM

OEM is a platform/framework which allows for the quick development and management of your own pattern library of web components.

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
* composable
* build server friendly (via cli)

## Setup

    git clone [repo]
    npm install

## How It Works
Oem has two parts: `core` and `components`. The Core *is* the OEM framework while the `components` are the web components that you create and manage. All components and their lifecycles are managed by a globally available namespace of `oem`. 

OEM provides a command line utility that streamlines a "conventional" workflow. It relies on configurations in the `package.json` file to generate code that: consolidates development phases, maintains configurations, automates testing, minifification, etc. The command line utility can be lauched with `node oem`. See the `API` for a full breakdown of all functionality.

## API
All commands begin with `node oem`

### help
options and usage information

### list
lists all components

### dev [component configuration]
launches development server for a component

### create [component-name]
creates and registers new component

### remove [component-name]
removes a component

### deploy [deployment-name]
deploys a deployment configuration

## Development

### Creating a Component
Example: `node oem create test-component`

A new component titled "test-component" will be added to the `package.json` file. A new component is comprised of three sets of files: source files, tests and html templates.

#### Source Files:

##### module.js
Main namespace for component. Contains any code common to all instances of the component.

##### gfx.js
To be used to store base64 images unique to this component.

##### css.js
Base styles for this component. Expressed as an array of javascript objects (See Css and Styling).

##### prototype.js
To be used to contain any/all logic for component.

### Css and Styling
All styles are expressed as simple javascript objects with two keys:

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

### Testing
Tests are a part of the development cycle. Each component has a `*.demo.html` and `*.test.js` file which drives this functionality. The test suite combines unit and integration testing by visually displaying the results in the browser along with the component you're developing. This allows for testing to be performed by visiting the component being developed in the respective browser.
### Debugging
#### customizations

## Deployment
Each deployment entry is a configuration used by the `deploy` utility. Each configuration lists the `oem.components` to be deployed and any overwrites (`customizations`) to be applied. All files will be compiled and minified in order and written to the `deploy` folder in a folder named after the entry. Example: `node oem deploy custom-site.com` will run the "custom-site.com" deployment and produce the following:

- ./deploy/custom-site.com/oem.js
- ./deploy/custom-site.com/oem.min.js

### oem.development
Each development entry is a configuation used by the `dev` utility. It lists the required `oem.components`s as well as `customizations` to be loaded.

### oem.components
These are the component configurations:

* `oem.components.[component].files`: component files
* `oem.components.[component].tests`: component tests
* `oem.components.[component].templates`: html templates

## Justification
Modern adaptive and responsive design UI/UX, device fragmentation, legacy browser support, opinionated frameworks combined with the heavy churn of frontend toolchains have turned modern frontend development into a gauntlet of gotchas. Unfortunately, we need the features and functionality these tools provide in order to efficiently produce a modern web application. 

Today's applications often contain more clientside than serverside code. Some applications are 100% "clientside" and connect to a variety of backend services. This clientside code is often untested or even worse, untestable (without some refactoring). Frameworks help us because they can abstract away core functionality and offer us the reliability of having been tested. There are two basic types of clientside (javascript) frameworks:

1. application logic (Angular, React, Backbone, Ember, etc.)
1. component library (Bootrap, Foundation, Semantic UI, etc.)

Application logic is at the mercy of the framework but if "done right" can be largely isolated from the features you used in the framework to construct your app. However, this isn't the same for component libraries. All the work that goes into interface flow, selecting dom elements, maintaining state, etc quickly become hotspots for monkeypatching, rerendering, etc...as their intergrations become tightly wound with the application logic and business logic. 

OEM falls under the component library category but looks to lighten the load by "playing nice" with application logic frameworks. There are many great libraries in existence already. However, their efficiencies are only leveraged when you use the components "as designed". Your needs will often exceed a component's limitations and working around them only adds to the complexity you where trying to avoid in the first place. This ends up as broken interfaces, long dev cycles, complex troubleshooting and unhappy clients. 

OEM is a framework that provides you with the tools to build your own component library. Your ability to create your own testable, highly customizable components allows you to take control of the quality, efficiency and evolution of your own applications and their workflow. Want two different types of modals? No problem. How about inventing something brand new or finding something in another component library you like, no problem, just create it or port it over!

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


## Code Patterns
Like webpack, OEM's final artifact is a single javascript file. Each component has an individual markup structure and implements various abilities exposed by the core as well as their own unique functionality. All components and code are protected under the `oem` namespace.

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

## Workflow


// todo


## TODO
- fix dynamic generation registration
- internationalization
- test core
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
