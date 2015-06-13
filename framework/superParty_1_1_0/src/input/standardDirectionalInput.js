
Input.configStandardDirectionInput = 
{
	wasd:false, 
	arrows:true, 
	up:{
		isDown:false,
		onPress:function(){},
		onRelease:function(){}
	},
	down:{
		isDown:false,
		onPress:function(){},
		onRelease:function(){}
	},
	right:{
		isDown:false,
		onPress:function(){},
		onRelease:function(){}
	},
	left:{
		isDown:false,
		onPress:function(){},
		onRelease:function(){}
	}, 
	handleInput:function(dir, key)
	{
		if(dir == InputDir.UP)
		{
			key.onRelease();
			key.isDown = false;
		}
		else if(!key.isDown)
		{
			key.onPress();
			key.isDown = true;
		}
	}
};

Input.getStandardDirectionInput = function(config)
{

	var obj = $.extend( false, Input.configStandardDirectionInput, config);

	var keyInput = Input.getKeyInput();

	keyInput.addEventListener(Input.EVENT_KEY_DOWN, function(e)
	{
		checkAndEmit(e, InputDir.DOWN);
	});

	keyInput.addEventListener(Input.EVENT_KEY_UP, function(e)
	{
		checkAndEmit(e, InputDir.UP);
	});

	function checkAndEmit(e, dir)
	{

		if((obj.arrows && e.keyCode == 37)  || (obj.wasd && e.keyCode == 65))
		{
			obj.handleInput(dir, obj.left);
		}
		else if((obj.arrows && e.keyCode == 39)  || (obj.wasd && e.keyCode == 68))
		{
			obj.handleInput(dir, obj.right);
		}
		else if((obj.arrows && e.keyCode == 38)  || (obj.wasd && e.keyCode == 87))
		{
			obj.handleInput(dir, obj.up);
		}
		else if((obj.arrows && e.keyCode == 40)  || (obj.wasd && e.keyCode == 83))
		{
			obj.handleInput(dir, obj.down);
		}
		
	}

	return obj;
}