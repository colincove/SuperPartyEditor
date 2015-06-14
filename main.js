
define(function (require, exports, module) {
    "use strict";
   // require("jquery-ui.min");
    require("ProjectEditor/main");
    require("SpriteEditor/main");
    require("Utils/uuid");
    
   
    
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        FileUtils = brackets.getModule("file/FileUtils");
    
     Project.baseUrl = FileUtils.getParentPath (module.uri);
    
 
 ExtensionUtils.loadStyleSheet(module, "css/style.less");
     ExtensionUtils.loadStyleSheet(module, "jquery-ui-1.11.4.custom/jquery-ui.min.css");
});
 