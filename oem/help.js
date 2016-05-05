const Config = require('./config');
const ARG = Config.ARG;
const CLI = Config.CLI;

/**
 * Show help
 * @return {[type]} [description]
 */
function show(){
    console.log();
    console.log(CLI.oem, "       ");
    console.log(CLI.oem, "  OEM  ", "HELP");
    console.log(CLI.oem, "       ");
    console.log();
    console.log(CLI.section, "USAGE");
    console.log("");
    console.log("   ", "node oem [option] [arguments]");
    console.log("");
    console.log(CLI.section, "OPTIONS");
    console.log("");
    console.log(CLI.FgYellow, "   " + ARG.HELP);
    console.log("   shows help and usage information");
    console.log("");
    console.log(CLI.FgYellow, "   " + ARG.LIST);
    console.log("   lists all components in package.oem.development");
    console.log("");
    console.log("      Example:", "    node oem list");
    console.log("");
    console.log(CLI.FgYellow, "   " + ARG.DEVELOP);
    console.log("   launches development server for a configuration in package.oem.development");
    console.log("");
    console.log("      Arguments:", "  [Component Name] [Port - Defaults to 7001]");
    console.log("      Example:", "    node oem develop card");
    console.log();
    console.log(CLI.FgYellow, "   " + ARG.NEW);
    console.log("   creates and registers new component");
    console.log("");
    console.log("      Arguments:", "  [Component Name - lowercase, no spaces, uses dashes if necessary]");
    console.log("      Example:", "    node oem new component-name");
    console.log("");
    console.log(CLI.FgYellow, "   " + ARG.REMOVE);
    console.log("   removes and unregisters a component");
    console.log("");
    console.log("      Arguments:", "  [Component Name]");
    console.log("      Example:", "    node oem remove component-name");
    console.log("");
    console.log(CLI.FgYellow, "   " + ARG.DEPLOY);
    console.log("   deploys a configuration from package.oem.deployments");
    console.log("");
    console.log("      Arguments:", "  [Deployment Name]");
    console.log("      Example:", "    node oem deploy all");
    console.log("");
    console.log("");
}

module.exports = {
    show:show
};