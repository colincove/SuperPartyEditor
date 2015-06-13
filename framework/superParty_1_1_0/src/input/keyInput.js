//-------------------------
//Events
//-------------------------
Input.EVENT_KEY_DOWN 	= 'EVENT_KEY_DOWN';
Input.EVENT_KEY_UP 		= 'EVENT_KEY_UP';

//-------------------------
//Setup
//-------------------------
Input.getKeyInput = function()
{
	var obj = {};

	Events.setup(obj);

	document.addEventListener('keydown', function(e)
	{
		obj.emitEvent(Input.EVENT_KEY_DOWN, e);
	});
	document.addEventListener('keyup', function(e)
	{
		obj.emitEvent(Input.EVENT_KEY_UP, e);
	});

	return obj;
}