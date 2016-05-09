 ![Alt text](logo.png)

OEM is a web component development framework. It has two parts: `core` and `components`. The Core *is* the OEM framework while the `components` are the web components. 

## API
To view the api run the following command:

    node oem help

## How It Works
OEM provides a command line utility that streamlines a "conventional" workflow. It relies on configurations in the `package.json` file to generate code that: consolidates development phases, maintains configurations, automates testing, minifies, etc. The command line utility can be lauched with `node oem`.

The most commonly used utility is the `develop` utility. It dynamcially constructs a basic html document, injecting all of the component's scripts into individual script tags and serves it up at `http://localhost:7001`. The workflow then becomes very standard: change some code, refresh the browser - old school.

See `API` for a full breakdown of all functionality.

## Registry
The `package.json` serves as a file registry for the OEM command line tool. All configurations live under the `oem` node in the json.

### oem.deployment
Each deployment entry is configuration used by the `deploy` utility. Each configuration is an array of `oem.configurations` that will be compiled and minified in order and written to the `deploy` folder in a folder named after the entry. Example: `node oem deploy custom-site.com` will run the "custom-site.com" deployment and produce the following:

- ./deploy/custom-site.com/oem.js
- ./deploy/custom-site.com/oem.min.js

### oem.development
Each development entry is a configuation used by the `develop` utility. It lists the required `oem.configuration`s as well as tests to run and the demo file to be used.

### oem.configurations
These are nothing more than collections of files. Both the `deploy` and `develop` utilties reference these configuraitons. Configurations can be used to overwrite functionality and are automatically added and removed with the `create` and `remove` utilities (be careful about name collisions).

## Justification
Modern adaptive and responsive design UI/UX, device fragmentation, legacy browser support, opinionated frameworks combined with the heavy churn of frontend toolchains have turned modern frontend development into a gauntlet of gotchas. Unfortunetly, we need the features and functionality these tools provide in order to efficiently produce a modern web application. 

Today's applications often contain more clientside than serverside code. Some applications are 100% "clientside" and connect to a variety of backend services. This clientside code is often untested or even worse, untestable (without some refactoring). Frameworks help us because they can abstract away core functionality and offer us the reliability of having been tested. There are two basic types of clientside (javascript) frameworks:

1. application logic (Angular, React, Backbone, Ember, etc.)
2. component library (Bootrap, Foundation, Semantic UI, etc.)

OEM falls under the component library category. There are many great libraries in existence. The efficiencies drawn from a component library are only leveraged if you use the components "as designed". Your needs will often exceed a component's limitations and working around them only adds to the complexity you where trying to avoid in the first place. This ends up as broken interfaces, long dev cycles, complex troubleshooting and unhappy clients. 

Once you decide you need a component library, there are two options, "build" or "buy" (or adopt). OEM is a framework that provides you with the tools you build your own component framework. Your ability to create your own testable, highly customizable components allows you to take control of the quality, efficiency and evolution of your own applications and their workflow.

By building your own component library, you can tightly control:

- UI/UX
- Device support
- Dependency chains
- Evolutionary pace
- Build processes

This control will allow us to:

- Speed up prototyping
- Introduce interactive prototypes
- Enable better estimates
- Speed up design time
- Speed up development time
- Solve problems better and faster

## Goals
- Responsive (Container queries and waypoints)
- Themable (During & after Deployment)
- Streamlined workflow (Command line utility)
- Self contained (Namespaced)
- Self documenting workflow
- Consolidate unit, integration & browser testing (but not preclude the use of headless browser testing, etc)
- Dependency free deployments (no external libs such as: jquery, sass, grunt, jasmine, angular, etc)
- Custom deployments (device targeting)
- Deployments < 150kb
- Easy analytics integration
- Composibility (Example: Form inside Card)


## Code Patterns
Like webpack, OEM's final artifact is a single javascript file. Each component has an individual markup structure and implements varioius abilities exposed by the core as well as their own unique functionality.

     - oem namespace
     - oem.Core
     - oem.Components
     - oem.Collections
     - [el].oem

### Core
The Core provides the following features and abilities:

### Core/Polyfills

### Components
#### MVC

### Collections

## Workflow
### Debugging


### Testing
Tests are a part of the development cycle. Each component has a `*.demo.html` and `*.test.js` file which drives this functionality. The test suite combines unit and integration testing by visually displaying the results in the browser along with the component you're developing. This allows for testing to be performed by visiting the component being developed in the respective browser.

## TODO
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
