var ScriptLoader = {};

ScriptLoader.scripts = {};

ScriptLoader.load = function(scripts, callback)
{
    FileLoader.readFile(scripts, fileLoaded, callback);
    
    function fileLoaded(url, data)
    {
        ScriptLoader.scripts[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = data;
    }
}