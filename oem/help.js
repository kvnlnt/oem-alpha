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
    console.log("node oem [option] [arguments]");
    console.log();
    console.log(CLI.section, "OPTIONS");
    console.log("");
    console.log(ARG.HELP, "            Usage documentation");
    console.log(ARG.DEVELOP, "         Launch development server for a component");
    console.log("   Arguments:", "   [Component Name] [Port - Defaults to 7001]");
    console.log("   Example:", "     node oem develop card");
    console.log(ARG.NEW, "             Create new component");
    console.log("   Arguments:", "   [Component Name]. Note: Use dashes for multiple words");
    console.log("   Example:", "     node oem new component-name");
    console.log();
}

module.exports = {
    show:show
};