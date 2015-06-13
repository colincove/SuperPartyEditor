/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"), 
         ExtensionUtils              = brackets.getModule("utils/ExtensionUtils"),
        DocumentManager             = brackets.getModule("document/DocumentManager"),
        MainViewFactory             = brackets.getModule("view/MainViewFactory"),
        ConfigViewContent           = require("text!htmlContent/Config.html"), 
         FileUtils                   = brackets.getModule("file/FileUtils");

  /* our module object */
    var _module = module;
    
    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        window.alert("Hello, world!");
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "helloworld.sayhello";   // package-style naming to avoid collisions
    CommandManager.register("Hello World", MY_COMMAND_ID, addSomeText);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);

    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    var MainViewManager = brackets.getModule("view/MainViewManager");
    MainViewManager.on("currentFileChange ", onCurrentFileChange);
    MainViewManager.on("paneCreate ", onPaneCreate);
    var paneCount = MainViewManager.getPaneCount();
    var paneIdList = MainViewManager.getPaneIdList ();
    
    MainViewFactory.registerViewFactory({
        canOpenFile: function (fullPath) {
          return (fullPath.slice(-3) === ".sp");
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
    
    function onCurrentFileChange ()
    {
        // window.alert(MainViewManager.getCurrentlyViewedPath(MainViewManager.getActivePaneId()));
        
        //Pane.showView();
    }
    function onPaneCreate(e, paneId)
    {
        var file = "";
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
                    var view = new ConfigView(doc, pane.$el);
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
        this.$el.append("<h1>Halo world<h1>");
       // this.$el.append("<iframe src = '"+ FileUtils.getNativeModuleDirectoryPath(_module)+"/ProtoShooter/index.html' width = '500' height = '500'><iframe>");
        
        this.$el.append("<script src='"+ FileUtils.getNativeModuleDirectoryPath(_module)+"/ProtoShooter/superParty/superParty.js' ></script>");
        this.$el.append("<script>SuperParty.root = '"+ FileUtils.getNativeModuleDirectoryPath(_module)+"/ProtoShooter'</script>");
        var game = this.$el.append( "<section id='game'></section>");
        game.append("<canvas id = 'stage'></canvas>");
        this.$el.append("<script src='"+ FileUtils.getNativeModuleDirectoryPath(_module)+"/ProtoShooter/ProtoShooter/src/ProtoShooter.js' ></script>");
        this.$el.append("<script>SuperParty.onWindowLoad();</script>");
        
        this.$el.css({
            "background-image": "url(file://" + FileUtils.getNativeModuleDirectoryPath(_module) + "/htmlContent/logo-sm.png)",
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
    ConfigView.prototype.updateLayout = function () {
    };

    /* 
     * Destroys the view
     */
    ConfigView.prototype.destroy = function () {
        this.$view.remove();
    };

    
});



