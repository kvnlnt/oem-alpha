# OEM

[&larr; Guide](./guide.md)

### Run A Test
To run a test, use the test cli tool and provide the name of a deployment like so:

    node oem test [some-deployment]

The test tool will run the deployment and use Phantom Js and Webdriver to load the deployment report's index.html file. The tests results are read and output to stdout. This allows for easy integration with CI tools such as Travis CI.