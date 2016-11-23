# OEM

[&larr; Guide](./guide.md)

## Deployment

### Table of contents
1. [Configuration](#configuration)
1. [Run A Deployment](#run-a-deployment)
1. [Testing](#testing)

### Configuration
To create a deployment add a new entry to the "deployments" section in the `./oem.json` config file. Provide a "key" name with a list of the components listed in "development". FYI: Order matters. Here's an example:

    "deployments": {
        "all": [
            "core",
            "accordion",
            "button",
            "field",
            "form",
            "responsify",
            "submit-button",
            "text-input",
            "theme",
            "validator"
        ]
    }

### Run A Deployment

    node oem deploy foo.com

The deploy tool will run the deployment and launches a browser window with report on the deployment.

The report includes:

1. Confiugration 
1. Date Generated
1. Js artifact list and file sizes
1. Css artifact list and file sizes
1. Components included in deployment
1. Test summary
1. Test results
1. Component script list

### Testing
The deployment report also includes all component tests created during development. This is a helpful way to quickly verify that all your tests are passing and there aren't conflicts or missing dependencies between your component set. *FYI: These are the same tests used by phantom js and webdriver run by the `oem test` utility.*