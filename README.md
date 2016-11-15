# OEM

> Create tomorrow's components for today and tomorrow.

OEM is a small web component framework that puts a premium on component-to-component communication and native web technologies. Should you reach a point where you decide you no longer want/need OEM, you are left with well abstracted code that is semantic, native, and has little to do with OEM itself.

*Note*: OEM web components are not to be confused with [W3C Web Components](https://www.w3.org/TR/components-intro/).

# Table of contents
1. [Quick Start](#quickstart)
1. [Features](#features)
1. [How It Works](#how-it-works)
1. [Development](#development)
1. [Demos](#pattern-library)
1. [Deployment](#deployment)
1. [Tutorials](#tutorials)

<a name="quickstart"></a>
## Quickstart

    # Install
    git clone [repo]

    # Setup
    cd ./[project-root]
    npm install

    # Check out the command line tool
    node oem

    # Create a component
    node oem create my-first-component

    # Develop the component
    node oem dev my-first-component

<a name="features"></a>
## Features:
* streamlined workflow (via cli)
* 100% native javascript
* 100% native html
* 100% native css
* 100% unit test coverage
* 100% integration test coverage
* 100% library dependency free
* 100% conflict free
* customizable deployments
* autogenerated pattern library (called "demos")
* legacy browser support (IE8+, which can be disabled)
* composable architecture
* build server friendly (via cli)
* facilitates atomic design

<a name="how-it-works"></a>
## How It Works
Oem has two parts: The Command Line API and the Client Side API. 

The Command Line API is a workflow tool based off of the `./oem.js` file and can be run by typing `node oem` from the project's root. Each of it's commands run's a corresponding script(s) from the `./cli` folder. 

The Client Side API is the oem framework. All components and code are protected under the `oem` namespace. Open up the console in your browser and type in `oem`. All component lifecycle management and core functionality for oem can be controlled programmatically via the namespace.
See `./src/development/core/module.js` for full api implementation details.

<a name="development"></a>
## Development
The development lifecycle centers around the `node oem dev [component]` command line tool. It launches an express server that loads all files in the component's development configuration registered to the `./oem.json` file. Javascript files are automatically included as script tags to the head of the document. This enables the tried and true classic dev process of writing code and checking your work in the browser – old school. It's fast, simple, reliable and will work for the forseeable future.

[How to develop components](./docs/development.md)

<a name="deployment"></a>
## Deployment
Each deployment entry is a configuration used by the `deploy` utility. Each configuration lists the `oem.components`. All files will be compiled and minified in order and written to the `deploy` folder in a folder named after the entry. Example: `node oem deploy custom-site.com` will run the "custom-site.com" deployment and produce the following:

    ./deploy/custom-site.com/
        |-- oem.js
        |-- oem.min.js
        |-- oem.tests.js
        |-- oem.css
        |-- oem.min.css
        |-- oem.tests.css

[How to deploy](./docs/deployment.md)

<a name="pattern-library"></a>
## Demo
A pattern library can be genereted with the `deploy` command. Example: `node oem demo custom-site.com` will produce the following folder and launch the demo.

    ./deploy/custom-size.com/

[How to create a demo](./docs/demo.md)

<a name="Tutorials"></a>
## Tutorials
- [How to develop components](./docs/development.md)
- [How to test components](./docs/testing.md)
- [How to debug components](./docs/debugging.md)
- [How to deploy](./docs/deployment.md)
- [How to create a demo](./docs/deployment.md)