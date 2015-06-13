var Game = {};
Game.gameObjects = [];
Game.gameAddBuffer = [];
Game.gameRemoveBuffer = [];
Game.setupGameObject = function(obj)
{
	gameAddBuffer.push(obj);
}
Game.destroyGameObject = function(obj)
{
	gameRemoveBuffer.push(obj);
}
Game.tick = function(e)
{
	var gameObj;

	//Run main game update loop
	for(var i in Game.gameObjects)
	{
		gameObj = Game.gameObjects[i];
		if(gameObj["update"])
		{
			gameObject.update();
		}
	}
	//clear buffered lists that may have changes since the last update
	for(var i in Game.gameAddBuffer)
	{
		gameObj = Game.gameAddBuffer[i];
		Game.gameObjects.push(gameObj);
	}
	for(var i in Game.gameRemoveBuffer)
	{
		gameObj = Game.gameRemoveBuffer[i];
		removeFromList(Game.gameRemoveBuffer, gameObj);
	}
	//clear buffers
	if(Game.gameAddBuffer.length)Game.gameAddBuffer.splice(0, Game.gameAddBuffer.length);
	if(Game.gameRemoveBuffer.length)Game.gameRemoveBuffer.splice(0, Game.gameRemoveBuffer.length);
}

Looper.addEventListener(Looper.EVENT_LOGIC_TICK, );