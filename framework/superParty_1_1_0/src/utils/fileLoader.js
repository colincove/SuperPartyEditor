var FileLoader = {};

FileLoader.readFile = function(urls, scriptCallback, onComplete)
{
    var numScripts      = 0;
    var scriptsLoaded   = 0;
    if(urls instanceof Array)
    {
        numScripts = urls.length;
        for(var i in urls)
        {
            loadUrl(urls[i], scriptLoaded);
        }
    }
    else
    {
        loadUrl(urls, scriptLoaded);
    }
    function scriptLoaded(url, data)
    {
        if(scriptCallback) scriptCallback(url, data);
        
        if(++scriptsLoaded == numScripts)
        {
            if(onComplete) onComplete();
        }
    }
    function loadUrl(url, callback)
    {
        $.get(url, function(data) {callback(url, data)});
    }
}