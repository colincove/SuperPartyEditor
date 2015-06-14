function Animation( sprite )
{
    this._sprite = sprite;
    this._animFrames = new Array();
}

/**
 * Encodes a Project instance into a serializable object instance. 
 * @param {Project} project to be serialized
 * @return {Object} serialized representation of Project
 */
Animation.prototype.serialize = function()
{
    var obj = {};
    
    obj.animFrames = new Array();
    
    var animFrame;
    for ( var i in this._animFrames )
    {
        animFrame = this._animFrames[i];
        obj.animFrames.push ( animFrame.x, animFrame.y, animFrame.getName() );
    }
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

/**
 * Parses JSON document into a Project instance
 * @param {JSON} json representing a serialized project
 */
Animation.prototype.parse = function (json)
{
    var animFrame;
    for ( var i in json.animFrames )
    {
        animFrame = json.animFrames[i];
        this.addAnimFrame( animFrame.x, animFrame.y, this._sprite.getFrameByName( animFrame.frameName ) );
    }
}

Animation.prototype.addAnimFrame = function (x, y, frame)
{
    this._animFrames.push({x:x, y:y, frame:frame});
}

Animation.prototype.getAnimFrames = function ()
{
    return this._animFrames;
}