
define(function (require, exports, module) {
    "use strict";
    require("ProjectEditor/main");
    
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
    ExtensionUtils.loadStyleSheet(module, "css/style.less");
    
});
