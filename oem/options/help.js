const chalk = require('chalk');

/**
 * Show help
 * @return {[type]} [description]
 */
function show(){
    console.log("");
    console.log("");
    console.log(chalk.bgRed("       "));
    console.log(chalk.black.bgRed("  OEM  "), " HELP ");
    console.log(chalk.bgRed("       "));
    console.log("");
    console.log("");
    console.log("Usage:");
    console.log("");
    console.log("   ", chalk.red("node oem"),"[option] [arguments]");
    console.log("");
    console.log("Options:");
    console.log("");
    console.log(chalk.red("   help"));
    console.log("");
    console.log("      Purpose:", "    options and usage information");
    console.log("");
    console.log(chalk.red("   list"));
    console.log("");
    console.log("      Purpose:", "    lists all components in package.oem.development");
    console.log("      Example:", "    node oem list");
    console.log("");
    console.log(chalk.red("   develop"));
    console.log("");
    console.log("      Purpose:", "    launches development server for a configuration in package.oem.development");
    console.log("      Arguments:", "  [Component Name] [Port - Defaults to 7001]");
    console.log("      Example:", "    node oem develop card");
    console.log();
    console.log(chalk.red("   create"));
    console.log("");
    console.log("      Purpose:", "    creates and registers new component");
    console.log("      Arguments:", "  [Component Name - lowercase, no spaces, uses dashes if necessary]");
    console.log("      Example:", "    node oem new component-name");
    console.log("");
    console.log(chalk.red("   remove"));
    console.log("");
    console.log("      Purpose:", "    removes and unregisters a component");
    console.log("      Arguments:", "  [Component Name]");
    console.log("      Example:", "    node oem remove component-name");
    console.log("");
    console.log(chalk.red("   deploy"));
    console.log("");
    console.log("      Purpose:", "   deploys a configuration from package.oem.deployments");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem deploy all");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
}

module.exports = {
    show:show
};