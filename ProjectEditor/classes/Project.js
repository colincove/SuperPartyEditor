function Project()
{
    this._projectName = "";
    this._uuid = UUID.create();
}

/**
 * Encodes a Project instance into a serializable object instance. 
 * @param {Project} project to be serialized
 * @return {Object} serialized representation of Project
 */
Project.prototype.serialize = function()
{
    var obj = {};
    
    obj.projectName = this.getProjectName();
    obj.uuid = this._uuid;
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

/**
 * Parses JSON document into a Project instance
 * @param {JSON} json representing a serialized project
 */
Project.prototype.parse = function (json)
{
    this._projectName = json.projectName;
    this._uuid = json.uuid;
}

Project.prototype.setProjectName = function (value)
{
    this._projectName = value;
}

Project.prototype.getProjectName = function ()
{
    return this._projectName;
}

Project.prototype.getUUID = function()
{
    return this._uuid;
}