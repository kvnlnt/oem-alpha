const Config = require('./config');
const ARG = Config.ARG;

/**
 * Show help
 * @return {[type]} [description]
 */
function show(){
    console.log();
    console.log(" OEM ".inverse.yellow);
    console.log();
    console.log("USAGE".yellow);
    console.log("--------------------------------------------");
    console.log("node oem [option] [arguments]");
    console.log();
    console.log("OPTIONS".yellow);
    console.log("--------------------------------------------");
    console.log(ARG.HELP.bold, "            Usage documentation");
    console.log(ARG.DEVELOP.bold, "         Launch development server for a component");
    console.log("   Arguments:".italic, "   [Component Name] [Port - Defaults to 7001]");
    console.log("   Example:".italic, "     node oem develop card".blue);
    console.log(ARG.NEW.bold, "             Create new component");
    console.log("   Arguments:".italic, "   [Component Name]. Note: Use dashes for multiple words");
    console.log("   Example:".italic, "     node oem new component-name".blue);
    console.log();
}

module.exports = {
    show:show
}