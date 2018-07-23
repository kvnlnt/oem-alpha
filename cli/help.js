const chalk = require('chalk');

/**
 * Show help
 * @return {[type]} [description]
 */
function show() {
    console.log("");
    console.log("");
    console.log(chalk.bgWhite("       "));
    console.log(chalk.black.bgWhite("  OEM  "), " HELP ");
    console.log(chalk.bgWhite("       "));
    console.log("");
    console.log("");
    console.log("Usage:");
    console.log("");
    console.log("   ", chalk.bold("node oem"), "[option] [arguments]");
    console.log("");
    console.log("Options:");
    console.log("");
    console.log(chalk.bold("   help"));
    console.log("");
    console.log("      Purpose:", "    Show options and usage information.");
    console.log("");
    console.log(chalk.bold("   list"));
    console.log("");
    console.log("      Purpose:", "    List all deployments, demos and components.");
    console.log("      Example:", "    node oem list");
    console.log("");
    console.log(chalk.bold("   dev"));
    console.log("");
    console.log("      Purpose:", "    Develop a component.");
    console.log("      Arguments:", "  [Component Name] [Port - Defaults to 7001]");
    console.log("      Example:", "    node oem dev card");
    console.log();
    console.log(chalk.bold("   create"));
    console.log("");
    console.log("      Purpose:", "    Scaffold out new component.");
    console.log("      Arguments:", "  [Component Name - lowercase, no spaces, uses dashes if necessary]");
    console.log("      Example:", "    node oem new component-name");
    console.log("");
    console.log(chalk.bold("   remove"));
    console.log("");
    console.log("      Purpose:", "    Remove a component.");
    console.log("      Arguments:", "  [Component Name]");
    console.log("      Example:", "    node oem remove component-name");
    console.log("");
    console.log(chalk.bold("   demo"));
    console.log("");
    console.log("      Purpose:", "    Generate a demo.");
    console.log("      Arguments:", "  [Demo Name]");
    console.log("      Example:", "    node oem demo foo.com");
    console.log("");
    console.log(chalk.bold("   deploy"));
    console.log("");
    console.log("      Purpose:", "    Generate a deployment.");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem deploy foo.com");
    console.log("");
    console.log(chalk.bold("   test"));
    console.log("");
    console.log("      Purpose:", "    Run a test.");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem demo foo.com");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
}

module.exports = {
    show: show
};