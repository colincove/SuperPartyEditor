Components.createScript = function(scriptName, gameObject, config)
{
    var script = {};
    
    eval(ScriptLoader.scripts[scriptName]);
    
    //set the configuration variables
    for(var i in config)
    {
        try
        {
            if(typeof config[i] == "string")
            {
                eval(i +" = '"+config[i]+"';");
            }
            else if (typeof config[i] == "number")
            {
                eval(i +" = "+config[i]+";");
            }
        }
        catch(e)
        {
            continue;    
        }
    }
    
    //setup scriupt messaging
    script.message = function(msg, data)
    {
        //data needs to be in JSON form
        var stringData = JSON.stringify(data);
        var call = msg + "(data);";
        try
        {
            eval(call); 
        }
        catch(e)
        {
            return;
        }
    }
    
    script.map = function(varName, obj)
    {
        eval(varName+" = obj");
    }
    return script;
}
/*
Look into this:

var stringifiedJSON = '{"hello":"world"}';
var parsed = new Function('return ' + stringifiedJSON)();
alert(parsed.hello);
*/