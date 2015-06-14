define(function (require, exports, module) {
    "use strict";
    require("SpriteEditor/classes/SpriteEditor");
    require("SpriteEditor/classes/Sprite");
     require("SpriteEditor/classes/Animation");
     require("SpriteEditor/classes/Frame");
       var DocumentManager             = brackets.getModule("document/DocumentManager"),
        MainViewFactory             = brackets.getModule("view/MainViewFactory"),
        ConfigViewContent           = require("text!SpriteEditor/views/SpriteEditor.html"), 
         FileUtils                   = brackets.getModule("file/FileUtils"), 
           ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
  /* our module object */
    var _module = module;

    MainViewFactory.registerViewFactory({
        canOpenFile: function (fullPath) {
          return (fullPath.slice(-7) === ".sprite");
      },
      openFile: function(file, pane) {
          return getMyView(file, pane);
      }
    });
    
    var DocumentManager = brackets.getModule("document/DocumentManager");
    var EditorManager = brackets.getModule("editor/EditorManager");

    function getMyView(file, pane)
    {
        var result = new $.Deferred(),
            view = pane.getViewForPath(file.fullPath);
        
        if (view) {
            // existing view, then just show it
            pane.showView(view);
            result.resolve(view.getFile());
        } else {
            DocumentManager.getDocumentForPath(file.fullPath)
                .done(function (doc) {
                    var view = new SpriteEditor(doc, pane.$el, ConfigViewContent, _module);
                    pane.addView(view, true);
                    result.resolve(doc.file);
                })
                .fail(function (fileError) {
                    result.reject(fileError);
                });
        }
        return result.promise();
    }
    ExtensionUtils.loadStyleSheet(module, "css/style.less");
});

