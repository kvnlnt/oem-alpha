# OEM

[&larr; Guide](./guide.md)

## Development

### Table of contents
1. [Creating Components](#creating-components)
1. [Launching The Development Server](#launching-the-development-server)
1. [Developing a Component](#developing-a-component)

### Creating Components

    node oem create my-component

Now navigate to the components folder in your IDE and checkout all the code that was generated:

    ./development/my-component

Also, notice that the component's manifest has been registered to the `./oem.json`'s "development" list. This now makes the component available for the CLI tools commands.

Let's take a moment and review the files that were autogenerted for our component. Here's a breakdown of each file and what it's purpose is:

#### ./manifest.json
The manifest file provides the necessary metadata needed by the Oem CLI tool in order to perform workflow operations.

    {
        "name": "My Component",
        "version": "1.0.0",
        "description": "My component",
        // any components you want to load during testing for this component are listed here
        "components": ["core"],
        // your scripts get added here
        "scripts": [
            "./development/my-component/module.js",
            "./development/my-component/prototype.js"
        ],
        // your test scripts go here
        "tests": [
            "./development/my-component/test.js"
        ],
        // templates are specified here
        "templates": {
            "description": "./development/my-component/templates/description.html",
            "examples": "./development/my-component/templates/examples.html",
            "tests": "./development/my-component/templates/tests.html",
            "usage": "./development/my-component/templates/usage.html"
        }
    }


#### ./module.js
This file is a convention used by Oem to create a namespace on behalf of the component. You usually want to leave this alone.

#### ./prototype.js
This is where all your component's logic lives. It's namespaced as "Prototype" off the module name. This abstraction helps keep things tidy. If you want to break your component up into more files – add them to the manifest. 

#### ./style.css
This is where all the styles for your component go. We suggest using BEM syntax with your component's `data-oem` data attr as the main css 'block'. It would look something like this:

    [data-oem="MyComponent"] {}
    [data-oem="MyComponent"].--state-alert{}
    [data-oem="MyComponent"].--state-success{}
    [data-oem="MyComponent"] .__button {}
    [data-oem="MyComponent"] .__button--small{}
    [data-oem="MyComponent"] .__button--big {}

One thing we'd recommend: Create a "theming" component. Keep these styles as "white label" as possible. This will give you the greatest flexibility. Also, you can load components dynamically with the `--components` argument like so `node oem dev my-component --components=some-theme`. This would allow you to work on component with multiple themes. Also, there's a `--port` argument which would allow you to work on two separate components or two instances of the same at once.

#### ./test.js
This file contains your unit and integration tests. See [Testing](./testing.md) for more info.

#### ./templates/description.html
This contains the name and description of your component like so:

    <h1>My Component</h1>
    <p>It does exactly what I want it to do.</p>

Note: This snippet is used by both the deployment and demo generators.

#### ./templates/examples.html
This where you put all the html of your component you're working on.

#### ./templates/tests.html
This is where you put the test component used by your tests scripts, ie: your `test.js` script.

#### ./templates/usage.html
This is where you provide code examples and instructions on how to use your component. The demo generator uses this for the pattern library. 

### Launching The Development Server
To work on your newly created component use the `dev` command. The dev command requires the name of the component you'd like to work on. Like so:

    node oem dev my-component

The component will be autolaunched in a browser. Taking a look at your `manifest.json` file you'll notice the section "components" with an entry of `["core"]`. This is a list of all the components you'd like to be loaded along with your component. You need the core of course but you can use this to pull in code from another component you're using for composition, mixin purposes, etc. Sometimes however, you don't want other components permanently specified to load in the manifest. One example of where you might run into this is when you want to load a theme component. In this scenario you can use the `--component` flag. Here's an example:

    node oem dev my-component --components=temp-theme

That's the same as having an entry of `["core", "temp-theme"]` in your manifest's "component" listing. 

Also, you can work on more than one component at a time. To do that you'll need the dev server to be running on separate ports. Use the `--port` flag for that. Here's an example

    node oem dev my-component --port=7002

and at the same time

    node oem dev another-component --port=7003

Here's where the `--components` and `--port` flag might come in handy. 

    node oem dev my-component --components=theme-dark --port=7002
    node oem dev my-component --components=theme-lite --port=7003

Now your working on the same component with two different themes at the same time.

### Developing a Component

Taking a look at the following file:

    ./development/my-component/prototype.js

The prototype represents all the properties and methods. Any static properties attached the prototype such as:

    Prototype.firstName = 'BillyBob';
    Prototype.bio = null;

Will be permanent and exist across all instances of the component. Probably not what you want. Instead you want to set the instance properties for a component in it's `init` method. Something like this (put this into your `./prototype.js` file):

    Prototype.init = function(){
        this.firstName = this.getEl().dataset.oemFirstName;
        this.bio = this.getEl().innerHTML;
    };

Now when your component – which looks something like this (go ahead an put this in your `./templates/examples.html` file):

    <div oem="MyComponent" oem-id="my-component" oem-first-name="Kevin">
        Some information about Kevin
    </div>

...is initialized, it will have distinct values. However, when calling the properties and methods on a given instance, be sure to use the `this` scope - it's javascript folks.

Launch the dev server for this component if you haven't already (`node oem dev my-component`) and open up the developer console. Type in the following:

    oem.read('my-component').firstName
    // output should read: Kevin
    oem.read('my-component').bio
    // output should read: Some information about Kevin

You're on your way now.