# OEM

[&larr; README](../README.md)

## Development

### 1. Create a new component

    node oem create my-component

Now navigate to the components folder in your IDE and checkout all the code that was generated:

    ./development/my-component

Let's take a moment and review what we're looking at. Here's a breakdown of each file and what it's purpose is:

#### ./manifest.json
The manifest file provides the necessary metadata needed by the Oem CLI tool in order to perform workflow operations.

#### ./module.js
This file is a convention used by Oem to create a namespace on behalf of the component. You usually want to leave this alone.

#### ./prototype.js
This is where all your component's logic lives. It's namespaced as "Prototype" off the module name. This abstraction helps keep things tidy. If you're component needs more files, simply add it to the manifest and by utilizing the "Module Pattern" you can create as sophisticated files structure as you like.

#### ./style.css
#### ./test.js
#### ./templates/description.html
#### ./templates/examples.html
#### ./templates/tests.html
#### ./templates/usage.html

Good job...now let's write some code.

### 2. Develop component

    node oem dev my-component

Now open the following file

    ./development/my-component/prototype.js

This is your components 