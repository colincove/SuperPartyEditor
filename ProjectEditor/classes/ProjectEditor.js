function ProjectEditor()
{
    /**
    * Instance Variables
    */
    
    this._project = null;
    this._view = $("<section></section>");
    
    this._view.addClass("project-editor");
    
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

/**
 * Gets project
 * @return {Project} project
 */
ProjectEditor.prototype.getProject = function()
{
    return this._project;
}

/**
 * Sets project
 * @param {Project} value 
 */
ProjectEditor.prototype.setProject = function(value)
{
    this._project = value;
}


