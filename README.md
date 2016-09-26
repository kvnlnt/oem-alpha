# OEM

OEM is a component manufacturing library. As such, it allows designers and developers to work together to develop and design the components they want. It's a stand alone framework and development platform that allows for the quick development and frustration free lifecycle management of your own custom web component library.

# Table of contents
1. [Features](#features)
1. [Quick Pitch](#quick-pitch)
1. [Setup](#setup)
1. [How It Works](#how-it-works)
1. [Development](#development)

<a name="features"></a>
## Features:
### Designers love it because:
* automatically generates pattern library
* customizable themes/styling
* enables quick prototyping
* facilitates atomic design

### Dev's will love it because:
* streamlined workflow (via cli)
* 100% native javascript
* 100% native html
* 100% native css
* 100% unit test coverage
* 100% integration test coverage
* 100% library dependency free
* customizable deployments
* legacy browser support (IE8+)
* easy integration
* composable architecture
* build server friendly (via cli)

<a name="quick-pitch"></a>
## Quick pitch
No superset javascript languages to learn, no transpilers to perform magic
There's no hot reloading and auto compilers to fight with, no superset javascript languages to learn, no transpilers to reverse engineer, no css processors to ruin your life, no code maps to debug your code because your dev code isn't minified, there are no incompatibilities and upgrades to worry about. Still not convinced? [Read the long pitch](docs/justification.md).

<a name="setup"></a>
## Setup

    git clone [repo]
    npm install

<a name="how-it-works"></a>
## How It Works
Oem has two parts: `core` and `components`. The Core *is* the OEM framework while the `components` are the web components that you create and manage. All components and their lifecycles are managed client side by a globally available namespace of `oem`. See `Client Side API` for details. 

OEM also provides a command line utility that streamlines a "conventional" workflow. It relies on the `package.json` file to manage configurations for development, deployment and the creation and destruction of components. The command line utility can be lauched with `node oem`. See the `Command Line API` for details.

### Command Line API
OEM's command line utility facilitates basic workflows for creating, developing and deploying components. The cli can be reached via `node oem [command]`. Each command run's a corresponding script in the `./cli/options/` folder.

### Client Side API
OEM's final artifact is a single javascript file. Each component has an individual markup structure and implements various abilities exposed by the core as well as their own unique functionality. All components and code are protected under the `oem` namespace. Open up the console in your browser and type in `oem`. All component lifecycle management and core functionality for oem can be controlled programmatically via the namespace.

See `./src/core/Oem.js` for full api implementation details (don't worry, it's simple!).

<a name="development"></a>
## Development
The development lifecycle centers around the `node oem dev [component]` command line tool. It launches an express server that loads all files in the component's development configuration registered to the `./package.json` file. Javascript files are rendered uncompiled, in order as script tags to the head of the document. This enables the tried and true dev cycle of loading, debugging and editing the code you're actually writing in the browser. It's fast, simple, reliable and has always worked the way it should be.

## Deployment
Each deployment entry is a configuration used by the `deploy` utility. Each configuration lists the `oem.components` to be deployed and any overwrites (`customizations`) to be applied. All files will be compiled and minified in order and written to the `deploy` folder in a folder named after the entry. Example: `node oem deploy custom-site.com` will run the "custom-site.com" deployment and produce the following:

- ./deploy/custom-site.com/

    - oem.js
    - oem.min.js
    - oem.min.js.map
