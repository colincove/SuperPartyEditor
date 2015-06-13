define(function (require, exports, module) {
    "use strict";
    require("ProjectEditor/classes/ProjectEditor");
    require("ProjectEditor/classes/Project");
       var DocumentManager             = brackets.getModule("document/DocumentManager"),
        MainViewFactory             = brackets.getModule("view/MainViewFactory"),
        ConfigViewContent           = require("text!ProjectEditor/views/ProjectEditor.html"), 
         FileUtils                   = brackets.getModule("file/FileUtils");

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
    var currentDoc = DocumentManager.getCurrentDocument();
    var editor = EditorManager.getCurrentFullEditor();
    
    function addSomeText() {        
        var currentDoc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getCurrentFullEditor();
        var pos = editor.getCursorPos();

        currentDoc.replaceRange("//Black magic. Do not modify EVER", pos);
    }

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
        /* @type {Object.<string, ConfigView>} List of open views */
    function ConfigView(doc, $container) {
        this.$container = $container;
        this.doc = doc;
        this.$el = $(Mustache.render(ConfigViewContent, this.json));
        this.$el.css({
            "background-image": "url(file://" + FileUtils.getNativeModuleDirectoryPath(_module) + "/ProjectEditor/views/img/logo-sm.png)",
            "background-position": "bottom right",
            "background-repeat": "no-repeat"
        });
        $container.append(this.$el);
    }
    
    /* 
     * Retrieves the file object for this view
     * return {!File} the file object for this view
     */
    ConfigView.prototype.getFile = function () {
        return this.doc.file;
    };
    
    /* 
     * Updates the layout of the view
     */
    ConfigView.prototype.updateLayout = function ()
    {
};

/* 
 * Destroys the view
 */
ConfigView.prototype.destroy = function () {
    this.$view.remove();
};
});

