# OEM

## CLI

    node oem help
        Purpose:     options and usage information

    node oem list
        Purpose:     lists all components available

    node oem dev
        Purpose:     launches development server to work on a component

    node oem create
        Purpose:     creates and registers new component

    node oem remove
        Purpose:     removes and unregisters a component

    node oem deploy
        Purpose:     deploys a deployment and auto generates pattern library

## Clientside API

    oem.list()
        Purpose:    lists all components registered on page

    oem.create()
        Purpose:    create new instance of component

    oem.read()
        Purpose:    read instance of component on page

    oem.update() 
        Purpose:    update instance of component on page

    oem.destroy()
        Purpose:    delete instance of component on page

    oem.events()
        Purpose:    global event bus

    oem.EVENTS
        Purpose:    list of global event names

    oem.Components
        Purpose:    component code base

    oem.Core
        Purpose:    core code base

## Creating a Component
Example: `node oem create test-component`

A new component titled "test-component" will be added to the `package.json` file. A new folder is created: `./src/components/test-component` which contains starter files for the new component.

#### Source Files:

##### module.js
Main namespace for component. Contains any code common to all instances of the component.

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

#### Example:

ComponentName/css.js

    {
        selector: ".title",
        declaration: [
            "line-height: 40px",
            "color:" + Core.Modules.Theme.COLORS.GREY
        ]
    }

Each component has a `style` written to the head in order of components listed in the deployment configuration. Each component prefixes it's selectors with `[data-oem="ComponentName"]`. The style above would render something like:

    [data-oem="ComponentName"] .title {
        line-height: 40px;
        color:#e2e2e2
    }

All styling should be the simplest possible definition that could work. It should use generic styling that can be easily overwritten and extended. Note the use of the global theme object (also customizable) used to implement global settings. It's also possible to add such settings to the `module.js` but is not advisable.


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