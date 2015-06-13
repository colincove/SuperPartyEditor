var Resources = {};

setupResourcesMethods(Resources);
//-------------------------
//Events
//-------------------------
Events.setup(Resources);
Resources.EVENT_ON_UPDATE 		= 'EVENT_ON_UPDATE';
Resources.EVENT_ON_COMPELETE 	= 'EVENT_ON_COMPELETE';
//-------------------------
//Setup
//-------------------------

//TODO: load resources in separate batches as opposed to a single batch call. 
Resources.batch = [];
Resources.totalLoaded = 0;

function setupResourcesMethods(Resources)
{
	Resources.addAudio = function(name, src)
	{
		var loader = {name:name,
		src:src,
		load:function(callback, onerror)
		{
			var audio 			= new Audio();
			audio.src 			= this.src;
			R.audio[this.name] 	= audio;
			audio.onload 		= callback;
			audio.onerror 		= onerror;
		}};
		this.batch.push(loader);
	}
	Resources.addImage = function(name, src)
	{
		var loader = {name:name,
		src:src, 
		load:function(callback, onerror)
		{
			var img 				= new Image();
			img.src 				= this.src;
			R.drawable[this.name] 	= img;
			img.onload 				= callback;
			img.onerror 			= onerror;
		}};
		this.batch.push(loader);
	}
	Resources.startLoad = function()
	{
		Resources.totalLoaded = 0;
		for(var i =0;i<Resources.batch.length;i++)
		{
			var res = Resources.batch[i];
			res.load(onLoaded);
		}
		function onLoaded()
		{
			Resources.totalLoaded+=1;
			update();
		}
		function onError()
		{
			Resources.totalLoaded+=1;
			update();
		}
		function onComplete()
		{
			Resources.emitEvent(Resources.EVENT_ON_COMPELETE, {});
		}
		function update()
		{
			Resources.emitEvent(Resources.EVENT_ON_UPDATE, {percent:Resources.totalLoaded/Resources.batch.length*100});
			if(Resources.totalLoaded == Resources.batch.length)
			{
				onComplete();
			}
		}
		
	}
}