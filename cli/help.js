const chalk = require('chalk');

/**
 * Show help
 * @return {[type]} [description]
 */
function show(){
    console.log("");
    console.log("");
    console.log(chalk.bgWhite("       "));
    console.log(chalk.black.bgWhite("  OEM  "), " HELP ");
    console.log(chalk.bgWhite("       "));
    console.log("");
    console.log("");
    console.log("Usage:");
    console.log("");
    console.log("   ", chalk.bold("node oem"),"[option] [arguments]");
    console.log("");
    console.log("Options:");
    console.log("");
    console.log(chalk.bold("   help"));
    console.log("");
    console.log("      Purpose:", "    options and usage information");
    console.log("");
    console.log(chalk.bold("   list"));
    console.log("");
    console.log("      Purpose:", "    lists all components in oem.development");
    console.log("      Example:", "    node oem list");
    console.log("");
    console.log(chalk.bold("   dev"));
    console.log("");
    console.log("      Purpose:", "    launches development server for a configuration in package.oem.development");
    console.log("      Arguments:", "  [Component Name] [Port - Defaults to 7001]");
    console.log("      Example:", "    node oem dev card");
    console.log();
    console.log(chalk.bold("   create"));
    console.log("");
    console.log("      Purpose:", "    creates and registers new component");
    console.log("      Arguments:", "  [Component Name - lowercase, no spaces, uses dashes if necessary]");
    console.log("      Example:", "    node oem new component-name");
    console.log("");
    console.log(chalk.bold("   install"));
    console.log("");
    console.log("      Purpose:", "    install components from the remote OEM repo");
    console.log("      Arguments:", "  [Component Name]");
    console.log("      Example:", "    node oem install component-name");
    console.log("");
    console.log(chalk.bold("   remove"));
    console.log("");
    console.log("      Purpose:", "    removes and unregisters a component");
    console.log("      Arguments:", "  [Component Name]");
    console.log("      Example:", "    node oem remove component-name");
    console.log("");
    console.log(chalk.bold("   demo"));
    console.log("");
    console.log("      Purpose:", "    creates a demo from a deployment in oem.demos");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem demo foo.com");
    console.log("");
    console.log(chalk.bold("   deploy"));
    console.log("");
    console.log("      Purpose:", "    deploys a configuration from oem.deployments");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem deploy foo.com");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
}

module.exports = {
    show:show
};