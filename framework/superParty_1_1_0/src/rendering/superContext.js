Stage.superContext = {};

function setupSuperContext(context)
{
	var ctx = Stage.superContext;
	
	//http://www.w3schools.com/tags/ref_canvas.asp
	
	//Colors, Styles, and Shadows
	ctx.fillStyle 		= context.fillStyle;
	ctx.strokeStyle 	= context.strokeStyle;
	ctx.shadowColor 	= context.shadowColor;
	ctx.shadowBlur 		= context.shadowBlur;
	ctx.shadowOffsetX 	= context.shadowOffsetX;
	ctx.shadowOffsetY 	= context.shadowOffsetY;
	
	ctx.setFillStyle 		= function(val){Stage.context.fillStyle = val;this.fillStyle = val;};
	ctx.setStrokeStyle		= function(val){Stage.context.strokeStyle = val;this.strokeStyle = val;};
	ctx.setShadowColor 		= function(val){Stage.context.shadowColor = val;this.shadowColor = val;};
	ctx.setShadowBlur 		= function(val){Stage.context.shadowBlur = val;this.shadowBlur = val;};
	ctx.setShadowOffsetX 	= function(val){Stage.context.shadowOffsetX = val;this.shadowOffsetX = val;};
	ctx.setShadowOffsetY 	= function(val){Stage.context.shadowOffsetY = val;this.shadowOffsetY = val;};
	
	ctx.createLinearGradient = function()
	{
	}
	ctx.createPattern = function()
	{
	}
	ctx.createRadialGradient = function()
	{
	}
	ctx.addColorStop = function()
	{
	}
	
	//Line Styles
	ctx.lineCap 	= context.lineCap;
	ctx.lineJoin	= context.lineJoin;
	ctx.lineWidth	= context.lineWidth;
	ctx.miterLimit	= context.miterLimit;
	
	ctx.setLineCap 		= function(val){Stage.context.lineCap = val;this.lineCap = val;};
	ctx.setLineJoin 	= function(val){Stage.context.lineJoin = val;this.lineJoin = val;};
	ctx.setLineWidth 	= function(val){Stage.context.lineWidth = val;this.lineWidth = val;};
	ctx.setMiterLimit 	= function(val){Stage.context.fillStyle = val;this.fillStyle = val;};

	//Rectangles
	ctx.rect = function()
	{
	}
	ctx.fillRect = function()
	{
	}
	ctx.strokeRect = function()
	{
	}
	ctx.clearRect = function()
	{
	}
	
	//Paths
	ctx.fill = function()
	{
		return Stage.context.fill();
	}
	ctx.stroke = function()
	{
		return Stage.context.stroke();
	}
	ctx.beginPath = function()
	{
		return Stage.context.beginPath();
	}
	ctx.moveTo = function(x, y)
	{
		return Stage.context.moveTo(x-Stage.cam.x, y-Stage.cam.y);
	}
	ctx.closePath = function()
	{
		return Stage.context.closePath();
	}
	ctx.lineTo = function(x, y)
	{
		return Stage.context.lineTo(x-Stage.cam.x, y-Stage.cam.y);
	}
	ctx.clip = function()
	{
		return Stage.context.clip();
	}
	ctx.quadraticCurveTo = function()
	{
	}
	ctx.bezierCurveTo = function()
	{
	}
	ctx.arc = function(x,y,r,sAngle,eAngle,counterclockwise)
	{
		return Stage.context.arc(x-Stage.cam.x,y-Stage.cam.y,r,sAngle,eAngle,counterclockwise);
	}
	ctx.arcTo = function()
	{
	}
	ctx.isPointInPath = function()
	{
	}
	
	//Transformations
	ctx.scale = function()
	{
	}
	ctx.rotate = function()
	{
	}
	ctx.translate = function()
	{
	}
	ctx.transform = function()
	{
	}
	ctx.setTransform = function()
	{
	}
	
	//Text 
	ctx.font 			= context.font;
	ctx.textAlign 		= context.textAlign;
	ctx.textBaseline 	= context.textBaseline;
	
	ctx.setFont 		= function(val){Stage.context.font = val;this.font = val;};
	ctx.setTextAlign 	= function(val){Stage.context.textAlign = val;this.textAlign = val;};
	ctx.setTextBaseline = function(val){Stage.context.textBaseline = val;this.textBaseline = val;};

	ctx.fillText = function()
	{
	}
	ctx.strokeText = function()
	{
	}
	ctx.measureText = function()
	{
	}
	
	//Image Drawing
	ctx.drawImage = function()
	{
		if(arguments.length == 3)
		{
			return Stage.context.drawImage(
				arguments[0], 
				arguments[1]-Stage.cam.x, 
				arguments[2]-Stage.cam.y);
		}
		else
		if(arguments.length == 5)
		{
			return Stage.context.drawImage(
				arguments[0], 
				arguments[1]-Stage.cam.x, 
				arguments[2]-Stage.cam.y,
				arguments[3], 
				arguments[4]);
		}
		else
		if(arguments.length == 9)
		{
			return Stage.context.drawImage(
				arguments[0], 
				arguments[1], 
				arguments[2],
				arguments[3], 
				arguments[4],
				arguments[5]-Stage.cam.x, 
				arguments[6]-Stage.cam.y,
				arguments[7], 
				arguments[8]);
		}
		return null;
	}
	
	//Pixel Manipulation
	ctx.width 	= context.width;
	ctx.height 	= context.height;
	ctx.data 	= context.data;
	
	ctx.setWidth 	= function(val){Stage.context.width = val;this.width = val;};
	ctx.setHeight 	= function(val){Stage.context.height = val;this.height = val;};
	ctx.setData 	= function(val){Stage.context.data = val;this.data = val;};

	ctx.createImageData = function()
	{
	}
	ctx.getImageData = function()
	{
	}
	ctx.putImageData = function()
	{
	}
	
	//Compositing
	ctx.globalAlpha 				= context.globalAlpha;
	ctx.globalCompositeOperation 	= context.globalCompositeOperation;
	
	ctx.setGlobalAlpha				= function(val){Stage.context.globalAlpha = val;this.globalAlpha = val;};
	ctx.setGlobalCompositeOperation = function(val){Stage.context.globalCompositeOperation = val;this.globalCompositeOperation = val;};
	
	//Other
	ctx.save = function()
	{
	}
	ctx.restore = function()
	{
	}
	ctx.createEvent = function()
	{
	}
	ctx.getContext = function()
	{
	}
	ctx.toDataURL = function()
	{
	}
}