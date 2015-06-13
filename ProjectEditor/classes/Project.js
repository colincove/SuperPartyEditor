function Project()
{
    this._projectName = "";
}

/**
 * Encodes a Project instance into a serializable object instance. 
 * @param {Project} project to be serialized
 * @return {Object} serialized representation of Project
 */
Project.serialize = function(project)
{
    var obj = {};
    
    obj.projectName = project.getProjectName();
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

/**
 * Parses JSON document into a Project instance
 * @param {JSON} json representing a serialized project
 */
ProjectEditor.prototype.parse = function (json)
{
    this._projectName = json.projectName;
}

Project.prototype.setProjectName = function (value)
{
    this._projectName = value;
}

Project.prototype.getProjectName = function ()
{
    return this._projectName;
}