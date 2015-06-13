
function ProjectEditor ( doc, $container, ConfigViewContent, _module ) {
    /*var ConfigViewContent           = require("text!ProjectEditor/views/ProjectEditor.html"), */
       var  FileUtils                   = brackets.getModule("file/FileUtils");
    /**
    * Instance Variables
    */
    
    this._project = null;
    this._view = $("<section></section>");
    
    this._view.addClass("project-editor");
    
    this.$container = $container;
    this.doc = doc;
    this.$el = $(Mustache.render(ConfigViewContent, this.json));
    this.$el.css({
        "background-image": "url(file://" + FileUtils.getNativeModuleDirectoryPath(_module) + "/ProjectEditor/views/img/logo-sm.png)",
        "background-position": "bottom right",
        "background-repeat": "no-repeat"
        });
    $container.append(this.$el);
    
    ProjectEditor.addProjectEditor(this);
    
    var projectEditor = this;
    
    FileUtils.readAsText(this.getFile()).done(function(text){projectEditor.fileLoaded(text);});
}

/********************************************************************
 * Static Variables and Functions
 *******************************************************************/

ProjectEditor._projectEditors = new Array(); 

/**
 * Adds a project editor to the list of projects
 * @param {ProjectEditor} projectEditor 
 */
ProjectEditor.addProjectEditor = function(projectEditor)
{
    this._projectEditors.push(projectEditor);
}

/**
 * Adds a project editor to the list of projects
 * @return {Array} array of ProjectEditor 
 */
ProjectEditor.getProjectEditors = function(projectEditor)
{
    return this._projectEditors;
}

/**
 * Encodes a ProjectEditor instance into a serializable object instance. 
 * @return {Object} object representation of ProjectEditor
 */
ProjectEditor.serialize = function (projectEditor)
{
    var obj = {};
    
    obj.project = null;
    
    if(projectEditor.getProject() != null)
    {
        obj.project = projectEditor.getProject().serialize();
    }
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

/**
 * Parses JSON document into a ProjectEditor instance
 * @param {JSON} json object
 */
ProjectEditor.prototype.parse = function (json)
{
    if(json.project != null)
    {
        this._project = new Project();
        this._project.parse(json.project);
    }
}

ProjectEditor.prototype.fileLoaded = function(text)
{
    if(text === "")
    {
        this.createNewProject();
    }
    else
    {  
        this.parse(JSON.parse(text));
    }
}

ProjectEditor.prototype.loadFail = function()
{
    
}

ProjectEditor.prototype.createNewProject = function()
{
    var project = new Project();
    project.setProjectName("My New Project");
    
    this.setProject(project);
}

/**
 * Gets project
 * @return {Project} project
 */
ProjectEditor.prototype.getProject = function()
{
    return this._project;
}
  /* 
 * Retrieves the file object for this view
 * return {!File} the file object for this view
 */
ProjectEditor.prototype.getFile = function () 
{
    return this.doc.file;
}

/**
 * Sets project
 * @param {Project} value 
 */
ProjectEditor.prototype.setProject = function(value)
{
    this._project = value;
    
    this.$el.find("h1#project-name").html(this._project.getProjectName());
}

/* 
* Updates the layout of the view
*/
ProjectEditor.prototype.updateLayout = function ()
{
}

ProjectEditor.prototype.destroy = function () 
{
   // this.$view.remove();
}


