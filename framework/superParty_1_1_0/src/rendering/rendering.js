var Rendering 			= {};
setupRenderingMethods(Rendering);
Rendering.renderers 	= {};
Rendering.layers 		= [];

Looper.addEventListener(Looper.EVENT_DRAW_TICK, Rendering.doRender);


//-------------------------
//Standard Layers
//-------------------------
var RenderLayers 	= {};
//-------------------------
//Setup
//-------------------------

Rendering.addRenderLayer(-10, 'BACKGROUND');
Rendering.addRenderLayer(0, 'MAIN');
Rendering.addRenderLayer(10, 'FORGROUND');

function setupRenderingMethods(Rendering)
{
	Rendering.rendererConfig = 
		{
			res:null,
			draw:function(drawInfo){},
			visible:true,
			layer:0,
			transform:
			{
				position:{x:0, y:0}, 
				velocity: {x:0, y:0}, 
				rotation: 0, 
				scale:1
			}
		};
	Rendering.doRender = function(e)
	{
		for (var i in Rendering.layers)
		{
			var layer = Rendering.layers[i];
			layer.render({});
		}
	}
	Rendering.register = function(name, renderer)
	{
		this.renderers[name] = renderer;
	}
	Rendering.getRenderer = function(config)
	{	
		var renderer = $.extend( true, Rendering.rendererConfig, config);
		
		return renderer;
	}
	Rendering.addRenderLayer = function(index, name)
	{	
		var newLayer = {index:index, list:[]};
		
		var listIndex = 0;
		
		//find ordered list index of the desired layer index
		for(var i=0;i<this.layers.length;i++)
		{
			var layer = this.layers[i];
			if(layer.index>=newLayer.index)break;
			listIndex = i;
		}
		
		var listSize = this.layers.length;
		
		//shift layers over in the list for fit the new layer. 
		for(var i = listIndex;i<listSize;i++)
		{
			this.layers[i+1] = this.layers[i];
		}
		
		this.layers[listIndex] = newLayer;
		
		RenderLayers[name] = newLayer;
		
		this.configNewLayer(newLayer);
		
		return newLayer;
	}
	Rendering.removeRenderLayer = function(name)
	{	
		if(RenderLayers[name] == null)return;
		
		removeFromList(this.layers, RenderLayers[name]);
		
		RenderLayers[name] = null;
	}
	Rendering.configNewLayer = function(layer)
	{
		layer.add = function(renderer)
		{
			this.list.push(renderer);
		}
		layer.remove = function(renderer)
		{
			removeFromList(this.list, renderer);
		}
		layer.render = function(drawInfo)
		{
			for(var i=0;i<this.list.length;i++)
			{
				this.list[i].draw(drawInfo);
			}
		}
	}
}
