
function SpriteEditor ( doc, $container, ConfigViewContent, _module ) 
{
    /**
    * Modules
    */
    var  FileUtils = brackets.getModule("file/FileUtils");
    
    /**
    * Instance Variables
    */
    
    this._sprite = null;
    this._frames = null;
    this._animations = null;
    
     /**
    * View
    */
    this.$container = $container;
    this.doc = doc;
    this.$el = $(Mustache.render(ConfigViewContent, this));
    $container.append(this.$el);
    
    this._$imageSelector = this.$el.find("#super-image-selector");
    this._$relativePath = this.$el.find("#super-relative-path");
    this._$imagePreview = this.$el.find("#super-image-preview");
    this._$selectButton = this.$el.find("#super-choose-image");
    this._$spriteImage  = this.$el.find("#super-sprite-image");
    this._$btnNewFrame = this.$el.find("#super-new-frame");
    this._$btnSaveFrames = this.$el.find("#super-save-frames");
    this._$frameContainer = this.$el.find("#super-frame-container");

    this.refreshImageSelector();
    
    var instance = this;
    this._$imageSelector.change(function(e){
        instance.onImageSelectChange(e);
    });
    this._$selectButton.click(function(e){
        instance.onSelectImage(e);
    });
    this._$btnNewFrame.click(function(e){
        instance.onNewFrame(e);
    });
    this._$btnSaveFrames.click(function(e){
        instance.onSaveFrames(e);
    });
    this.fileLoaded(doc.getText());
}

/********************************************************************
 * Static Variables and Functions
 *******************************************************************/
SpriteEditor.FileUtils = brackets.getModule("file/FileUtils")
SpriteEditor.imageFileFilter = function(file, number)
{
    return SpriteEditor.FileUtils.getFileExtension(file.fullPath) == "png";
}

/**
 * Encodes a ProjectEditor instance into a serializable object instance. 
 * @return {Object} object representation of ProjectEditor
 */
SpriteEditor.prototype.serialize = function ()
{
    var obj = {};
    
    obj.sprite = null;
    
    if(this._sprite != null)
    {
        obj.sprite = this._sprite.serialize();
    }
    
    return obj;
}

/********************************************************************
 * Instance Functions
 *******************************************************************/

SpriteEditor.prototype.refreshData = function()
{
    this._$imageSelector.val(this._sprite.getUrl());
    this._$spriteImage.attr("src", Project.baseUrl + this._sprite.getUrl()); 
    this._$relativePath.html(this._sprite.getUrl());
    this._$imagePreview.attr("src", Project.baseUrl + this._sprite.getUrl()); 
}

SpriteEditor.prototype.write = function()
{
    this.doc.setText ( JSON.stringify( this.serialize()) );
}

/**
 * Parses JSON document into a ProjectEditor instance
 * @param {JSON} json object
 */
SpriteEditor.prototype.parse = function (json)
{
    if(json.sprite != null)
    {
        this._sprite = new Sprite();
        this._sprite.parse(json.sprite);
        
        var frame;
        for ( var i in this._sprite.getFrames() )
        {
            frame = this._sprite.getFrames()[i];
            this.createFrameView(frame);
        }
        
        this.refreshData();
    }
}

SpriteEditor.prototype.fileLoaded = function(text)
{
    if(text === "")
    {
        this.createNewSprite();
    }
    else
    {  
        this.parse(JSON.parse(text));
    }
}

SpriteEditor.prototype.loadFail = function()
{
    
    
    
}



SpriteEditor.prototype.createNewSprite = function()
{
    var sprite = new Sprite();
    this._sprite = sprite;
}

SpriteEditor.prototype.refreshImageSelector = function()
{
    var ProjectManager = brackets.getModule("project/ProjectManager");
   // var thing = ProjectModel.ProjectModel.getAllFiles();
    var promise = ProjectManager.getAllFiles(SpriteEditor.imageFileFilter);
    
    var instance = this;
    
    promise.done(function(e){
        instance.getAllFilesComplete(e);
    });
}

SpriteEditor.prototype.getAllFilesComplete = function(files)
{
    var ProjectManager = brackets.getModule("project/ProjectManager");
    //TODO: FInd out why ProjectManager.getBaseUrl() return undefined. THere is always a project right?
    //Project.baseUrl is a hack that should not happen
    var baseUrl = Project.baseUrl;
    var name = null;
    var path = null;
    var file = null;
    for ( var i in files )
    {
        file = files[i];
        name = SpriteEditor.FileUtils.getFilenameWithoutExtension(file.name);
        path = SpriteEditor.FileUtils.getRelativeFilename(baseUrl , file.fullPath);
        this._$imageSelector.append("<option value = '" + path +"'>" + name + "</option>");
    }
}
SpriteEditor.prototype.onImageSelectChange = function(e)
{
    this._$relativePath.html(this._$imageSelector.val());
    this._$imagePreview.attr("src", Project.baseUrl + this._$imageSelector.val()); 
}
SpriteEditor.prototype.onSelectImage = function(e)
{
    this._sprite.setUrl(this._$imageSelector.val());
    this.write();
    this.refreshData();
}
SpriteEditor.prototype.onNewFrame = function(e)
{
    var frame = this._sprite.createFrame();
    frame.setDimensions(100,100);
    this.createFrameView(frame);
}
SpriteEditor.prototype.onSaveFrames = function(e)
{
    this.write();
}
SpriteEditor.prototype.createFrameView = function(frame)
{
    var frameView = $("<frame></frame>");
    
    frameView.css("width", frame.getDimensions().width);
    frameView.css("height", frame.getDimensions().height);
    frameView.addClass("super-frame-view");
    
   // frameView.draggable();
    
    this._$frameContainer.append(frameView);
}

/**
 * Gets project
 * @return {Project} project
 */
SpriteEditor.prototype.getSprite = function()
{
    return this._sprite;
}
/* 
 * Retrieves the file object for this view
 * return {!File} the file object for this view
 */
SpriteEditor.prototype.getFile = function () 
{
    return this.doc.file;
}

/**
 * Sets project
 * @param {Project} value 
 */
SpriteEditor.prototype.setSprite = function(sprite)
{
    this._sprite = sprite;
}

/* 
* Updates the layout of the view
*/
SpriteEditor.prototype.updateLayout = function ()
{
}

SpriteEditor.prototype.destroy = function () 
{
   // this.$view.remove();
}