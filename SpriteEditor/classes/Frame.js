function Frame()
{
    this._name = "";
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    
    this._position = null;
    this._positionDirty = true;
    this._dimensions = null;
    this._dimensionsDirty = true;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

Frame.prototype.serialize = function()
{
    var obj     = {};
    
    obj.name    = this._name;
    obj.x       = this._x;
    obj.y       = this._y;
    obj.width   = this._width;
    obj.height  = this._height;
    
    return obj;
}

Frame.prototype.parse = function (json)
{
    this._name      = json.name;
    this._x         = json.x;
    this._y         = json.y;
    this._width     = json.width;
    this._height    = json.height;
}

Frame.prototype.setPosition = function (x, y)
{
    if ( this._x == x && this._y == y ) return;
    this._positionDirty = true;
    this._x = x;
    this._y = y;
}

Frame.prototype.getPosition = function()
{
    if( this._positionDirty ) this._position = { x:this._x, y:this._y };
    
    return this._position;
}

Frame.prototype.setDimensions = function (width, height)
{
    if ( this._width == width && this._width == width ) return;
    
    this._dimensionsDirty = true;
    
    this._width = width;
    this._height = height;
}

Frame.prototype.getDimensions = function()
{
    if( this._dimensionsDirty ) this._dimensions = { width:this._width, height:this._height };
    
    this._dimensionsDirty = false;
    
    return this._dimensions;
}