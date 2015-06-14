function Sprite()
{
    this._frames = new Array();
    this._animations = new Array();
    this._url = "";
}

/**
 * Encodes a Project instance into a serializable object instance. 
 * @param {Project} project to be serialized
 * @return {Object} serialized representation of Project
 */
Sprite.prototype.serialize = function()
{
    var obj = {};
    
    obj.url = this._url;
    obj.frames = new Array();
    obj.animations = new Array();
    
    var frame;
    for ( var i in this._frames )
    {
        frame = this._frames[i];
        obj.frames.push ( frame.serialize() );
    }
    
    var animation;
    for ( var i in this._animations )
    {
        animation = this._animations[i];
        obj.animations.push ( animation.serialize() );
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
Sprite.prototype.parse = function (json)
{
    this._url = json.url;
    
    var frame = null;
    var f;
    for ( var i in json.frames ) 
    {
        f = json.frames[i];
        frame = new Frame();
        frame.parse( f );
        this._frames.push(frame);
    }
    
    var animation = null;
    var a;
    for ( var i in json.animations ) 
    {
        a = json.animations[i];
        animation = new Animation(this);
        animation.parse( a );
        this._animations.push(animation);
    }
}

Sprite.prototype.removeFrame = function( frame )
{
    var index = this._frames.indexOf(frame);
    if(index >=0 ) this._frames.splice(index, 1);
}

Sprite.prototype.createFrame = function()
{
    var frame = new Frame();
    this._frames.push ( frame );
    return frame;
}

Sprite.prototype.removeAnimation = function( animation )
{
    var index = this._animations.indexOf(animation);
    if(index >=0 ) this._animations.splice(index, 1);
}

Sprite.prototype.createAnimation = function()
{
    var animation = new Animation(this);
    this._animations.push ( animation );
    return animation;
}

Sprite.prototype.getAnimations = function()
{
    return this._animations;
}

Sprite.prototype.getFrames = function()
{
    return this._frames;
}

Sprite.prototype.setUrl = function (url)
{
    this._url = url;
}

Sprite.prototype.getUrl = function ()
{
    return this._url;
}