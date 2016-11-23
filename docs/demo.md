# OEM

[&larr; Guide](./guide.md)

## Demo

### Table of contents
1. [Configuration](#configuration)
1. [Generate](#generate)
1. [Pattern Library](#pattern-library)

### Configuration
To create a demo add a new entry to the "demos" section in the `./oem.json` config file. Like so:

    "demos": {
        "foo.com": {
            "deployment": "all"
        }
    }

Specify the deployment the demo will be based off of.

### Generate
To generate a demo run:

    node oem demo foo.com

The demo tool will run the deployment, generate the demo and launch a browser window. Use the `--autolaunch=false` argument to disable the autolaunch. This helps to auto deploy the demo. Here's an example: 

    node oem demo foo.com --autolaunch=false

### Pattern Library
The demo can be used as a "Pattern Library". The demo creates a simple list menu with a link to each component. A page is generated for each component containing that components description, example and usage html files. 