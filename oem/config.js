// argument enums
const ARG = {};
ARG.HELP = 'help';
ARG.DEVELOP = 'develop';
ARG.NEW = 'new';
ARG.REMOVE = 'remove';

// content type enums
const CONTENT_TYPE = {};
CONTENT_TYPE.HTML = "text/html";
CONTENT_TYPE.JS = "application/javascript";
CONTENT_TYPE.PNG = "image/png";
CONTENT_TYPE.JPG = "image/jpg";
CONTENT_TYPE.CSS = "text/css";

const CLI = {};
CLI.FgRed = "\x1b[31m%s\x1b[0m";
CLI.FgBlack = "\x1b[30m%s\x1b[0m";
CLI.section = "\x1b[37;m%s\x1b[0m";
CLI.oem = "\x1b[47;30m%s\x1b[0m";

module.exports = {
    ARG: ARG,
    CONTENT_TYPE: CONTENT_TYPE,
    CLI: CLI
};