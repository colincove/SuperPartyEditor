var SuperParty = {projectName:""};

SuperParty.EVENT_START_SETUP = 'EVENT_START_SETUP';

SuperParty.scriptLoaders = {};
SuperParty.scriptLoaders.count = 0;//number of loaders
SuperParty.setupCallback = null;

SuperParty.init = function()
{
    Looper.setFps(30);
    Looper.start();
    SuperParty.setupCallback();
}
SuperParty.setupGame = function(gameObj)
{

}
//(init function, scripts...)
SuperParty.loadScripts = function(init, scripts)
{

    if(scripts.length)SuperParty.getScript(scripts[0], onScriptSuccess);
    
    var loaderIndex                         = ++SuperParty.scriptLoaders.count;
    SuperParty.scriptLoaders[loaderIndex]   = {'init':init, 'scripts':scripts, 'loaded':0};

    function onScriptSuccess()
    {
        var scriptLoader = SuperParty.scriptLoaders[loaderIndex];
        var loaded = SuperParty.scriptLoaders[loaderIndex].loaded;

        if( loaded ==  SuperParty.scriptLoaders[loaderIndex].scripts.length-1)
        {
           init(); 
        }
        else
        {
            //load the next script
            SuperParty.getScript(SuperParty.scriptLoaders[loaderIndex].scripts[loaded+1], onScriptSuccess);
        }
        scriptLoader.loaded += 1;
    }
}

SuperParty.getScript = function(url,success){
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0], done=false;
    script.onload = script.onreadystatechange = function(){
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done=true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}

SuperParty.setup = function(callback)
{

    SuperParty.setupCallback = callback;
    
    //load framework scripts to run the game
    SuperParty.loadScripts(SuperParty.init, [
        'superParty/lib/uuid.js', 
        'superParty/src/base/events.js',
        'superParty/src/base/linkedList.js',
        'superParty/src/base/stage.js', 
        'superParty/src/base/looper.js',
        'superParty/src/rendering/rendering.js',
        'superParty/src/rendering/simpleRenderer.js',
        'superParty/src/rendering/superContext.js',
        'superParty/src/resources/resources.js',
        'superParty/src/resources/res.js',
        'superParty/src/physics/physics.js',
        'superParty/src/physics/collisions.js',
        'superParty/src/physics/simpleSolver.js',
        'superParty/src/physics/debugDraw.js',
        'superParty/src/input/input.js',
        'superParty/src/input/keyInput.js',
        'superParty/src/input/standardDirectionalInput.js',      
        'superParty/src/objects/prefab.js',
        'superParty/src/objects/scriptLoader.js',
        'superParty/src/objects/components/components.js', 
        'superParty/src/objects/components/script.js', 
        'superParty/src/objects/components/body.js',
        'superParty/src/utils/fileLoader.js'
	]);
}


function removeFromList(list, obj)
{
    var index = list.indexOf(obj);
    if(index>=0)
    {
        list.splice(index, 1);
    }
}
function Enum() 
{
	this.size = arguments.length; 
    for (var i in arguments) 
	{
        this[arguments[i]] = i;
    }
}
window.onload = function()
{
	SuperParty.setup(setupComplete);
    var configLength = 0;
    var configCounter = 0;
    function setupComplete()
    {
        setupSuperContext(Stage.context);
		
        configureProject();
    }
    function configureProject()
    {
        loadConfigFile(SuperParty.projectName.concat('/config/scripts.csv'), scriptsConfigLoaded);
        loadConfigFile(SuperParty.projectName.concat('/config/prefabs.csv'), prefabsConfigLoaded);
    }
    function loadConfigFile(url, success, fail)
    {
        configLength++;
        var jqxhr = $.get(url, success);
        jqxhr.fail(onConfigFail);
    }
    function scriptsConfigLoaded(data)
    {
        var urls = [];
        var data = data.split("\n");//splt text file from lines into an array
        
        //load scripts defined by the project
        for(var i in data)
        {
            urls.push(SuperParty.projectName.concat('/src/scripts/', data[i]));
        }
        
        //load scripts that are defined by the framework
        for(var i in SuperParty.frameworkScriptUrls)
        {
            urls.push("superParty/scripts/".concat(SuperParty.frameworkScriptUrls[i]));
        }
        
        ScriptLoader.load(urls, configComplete);
    }
    function prefabsConfigLoaded(data)
    {
        var urls = [];
        var data = data.split("\n");//splt text file from lines into an array
        for(var i in data)
        {
            urls.push(SuperParty.projectName.concat('/src/prefabs/', data[i]));
        }
        Prefab.load(urls, configComplete);
    }

    function configComplete()
    {
        if(++configCounter == configLength)
        {
             SuperParty.onSetupComplete(); 
        }
       
    }
    function onConfigFail()
    {
        console.error("Project configuration failed.");
    }
}
SuperParty['frameworkScriptUrls'] = ["physics/stiffTriggerFollow.js"];

