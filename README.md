# OEM

OEM is a platform/framework which allows for the quick development and management of your own pattern library of web components.

## Features/Benefits
* command line utility
* 100% native javascript
* 100% test coverage
* no external dependencies
* customizable deployments
* customizable themes
* legacy browser support (IE8+)
* automatically generates pattern library
* enables quick prototyping

## Setup

    git clone [repo]
    npm install

## API

    node oem help

## How It Works
Oem has two parts: `core` and `components`. The Core *is* the OEM framework while the `components` are the web components that you create and manage. All components and their lifecycles are managed by a globally available namespace of `oem`. 

OEM provides a command line utility that streamlines a "conventional" workflow. It relies on configurations in the `package.json` file to generate code that: consolidates development phases, maintains configurations, automates testing, minifies, etc. The command line utility can be lauched with `node oem`.

The most commonly used utility is the `dev` utility. It dynamcially constructs a basic html document, injecting all of the component's scripts into individual script tags and serves it up at `http://localhost:7001`. The workflow then becomes very standard: change some code, refresh the browser - old school.

See `API` for a full breakdown of all functionality.

## Registry
The `package.json` serves as a file registry for the OEM command line tool. All configurations live under the `oem` node in the json.

### oem.deployment
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

## Goals
1. Responsive (Container queries and waypoints)
1. Themable (During & after Deployment)
1. Streamlined workflow (Command line utility)
1. Self contained (Namespaced)
1. Self documenting workflow
1. Consolidate unit, integration & browser testing (but not preclude the use of headless browser testing, etc)
1. Dependency free deployments (no external libs such as: jquery, sass, grunt, jasmine, angular, etc)
1. Custom deployments (device targeting)
1. Deployments < 150kb
1. Easy analytics integration
1. Composibility (Example: Form inside Card)
1. Build Server / CI integration


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

### Developing
#### css and styling
#### Coding Styles
* Uppercase imported module variables to avoid collisions

### Testing
Tests are a part of the development cycle. Each component has a `*.demo.html` and `*.test.js` file which drives this functionality. The test suite combines unit and integration testing by visually displaying the results in the browser along with the component you're developing. This allows for testing to be performed by visiting the component being developed in the respective browser.
### Debugging
### Deploying
#### customizations
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
