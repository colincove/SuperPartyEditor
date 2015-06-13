
function ProjectEditor ( doc, $container, ConfigViewContent, _module ) 
{
    /**
    * Modules
    */
    var  FileUtils = brackets.getModule("file/FileUtils");
    
    /**
    * Instance Variables
    */
    
    this._project = null;
    this._editProjectName = false;
    
     /**
    * View
    */
    this.$container = $container;
    this.doc = doc;
    this.$el = $(Mustache.render(ConfigViewContent, this));
    this.$el.css({
        "background-image": "url(file://" + FileUtils.getNativeModuleDirectoryPath(_module) + "/views/img/logo-sm.png)",
        "background-position": "bottom right",
        "background-repeat": "no-repeat"
        });
    $container.append(this.$el);
    
    
    
    this._$projectName          = $("#project-name");
    this._$projectNameInput     = $("#project-name-input");
    this._$editProjectName      = $("#project-name-edit").click(this, this.onEditProjectName);
    this._$saveProjectName      = $("#project-name-save").click(this, this.onSaveProjectName);
    this._$cancelProjectName    = $("#project-name-cancel").click(this, this.onCancelProjectName);
    
    this.projectNameState(this._editProjectName);
    
    this.fileLoaded(doc.getText());
    
    ProjectEditor.addProjectEditor(this);
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
ProjectEditor.prototype.serialize = function ()
{
    var obj = {};
    
    obj.project = null;
    
    if(this._project != null)
    {
        obj.project = this._project.serialize();
    }
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

ProjectEditor.prototype.refreshData = function()
{
    if(this._project != null)
    {
        this._$projectName.html( this._project.getProjectName() );
    }
}

ProjectEditor.prototype.write = function()
{
    this.doc.setText ( JSON.stringify( this.serialize()) );
}

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
        this.refreshData();
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
    
    this._$projectName.html(this._project.getProjectName());
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

ProjectEditor.prototype.onEditProjectName = function(e)
{
    e.data.setEditProjectName(true);
}

ProjectEditor.prototype.onSaveProjectName = function(e)
{
    e.data._project.setProjectName(e.data._$projectNameInput.val());
    e.data.write();
    e.data.setEditProjectName(false);
}

ProjectEditor.prototype.onCancelProjectName = function (e, instance)
{
    e.data.setEditProjectName(false);
}

ProjectEditor.prototype.setEditProjectName = function ( value ) 
{
    if(value == this._editProjectName) return;
    this._editProjectName = value;
    
    this.projectNameState(value);
}

ProjectEditor.prototype.projectNameState = function(edit)
{
    if(edit)
    {
        this._$projectNameInput.val( this._project.getProjectName() );
        
        this._$cancelProjectName.show();
        this._$editProjectName.hide();
        this._$projectName.hide();
        this._$projectNameInput.show();
        this._$saveProjectName.show();
    }
    else
    {
        if( this._project != null)
        {
            this._$projectName.html( this._project.getProjectName() );
        }
        
        this._$cancelProjectName.hide();
        this._$editProjectName.show();
        this._$projectName.show();
        this._$projectNameInput.hide();
        this._$saveProjectName.hide();
    }
}

