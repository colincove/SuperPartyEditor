define(function (require, exports, module) {
    "use strict";
    require("ProjectEditor/classes/ProjectEditor");
    require("ProjectEditor/classes/Project");
       var DocumentManager             = brackets.getModule("document/DocumentManager"),
        MainViewFactory             = brackets.getModule("view/MainViewFactory"),
        ConfigViewContent           = require("text!ProjectEditor/views/ProjectEditor.html"), 
         FileUtils                   = brackets.getModule("file/FileUtils"), 
           ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    
    
    ExtensionUtils.loadStyleSheet(module, "css/style.less");
    
  /* our module object */
    var _module = module;

    MainViewFactory.registerViewFactory({
        canOpenFile: function (fullPath) {
          return (fullPath.slice(-6) === ".sproj");
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
                    var view = new ProjectEditor(doc, pane.$el, ConfigViewContent, _module);
                    pane.addView(view, true);
                    result.resolve(doc.file);
                })
                .fail(function (fileError) {
                    result.reject(fileError);
                });
        }
        return result.promise();

    }
});

