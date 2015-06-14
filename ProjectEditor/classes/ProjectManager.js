public function ProjectManager()
{
    this._project = new Array();
}

ProjectManager.addProject = function(project)
{
    this._projects.push(project);
}

ProjectManager.removeProject = function(project)
{
    var index = this._projects.indexOf(project);
    
    if(index>=0)
    {
        this._projects.splice(index, 0);
    }
}

