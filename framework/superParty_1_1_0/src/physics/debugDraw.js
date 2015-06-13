Physics.startDebugDraw = function()
{
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, Physics.debugDraw);
}
Physics.stopDebugDraw = function()
{
	Looper.removeEventListener(Looper.EVENT_DRAW_TICK, Physics.debugDraw);
}
Physics.debugDraw = function(e)
{
	for(var i in Physics.bodies.lists.allBodies)
	{
		var body = Physics.bodies.lists.allBodies[i];
		
		if(body.type == BodyTypes.CIRCLE)
		{
			Stage.superContext.beginPath();
			Stage.superContext.arc(
				body.transform.position.x, 
				body.transform.position.y,
				body.radius,
				0, 
				2*Math.PI, 
				false);
			
			if(body.activeCollisions!=0)
			{
				Stage.superContext.setStrokeStyle('#ff0000');
			}
			else
			{
				Stage.superContext.setStrokeStyle('#00ff00');
			}
			
			Stage.superContext.setLineWidth(2);
			Stage.superContext.stroke();
		}
		if(body.type == BodyTypes.BOX)
		{
			Stage.superContext.beginPath();
			Stage.superContext.moveTo(
				body.transform.position.x, 
				body.transform.position.y);

			Stage.superContext.lineTo(body.transform.position.x+body.getWidth(), body.transform.position.y);
			Stage.superContext.lineTo(body.transform.position.x+body.getWidth(), body.transform.position.y+body.getHeight());
			Stage.superContext.lineTo(body.transform.position.x, body.transform.position.y+body.getHeight());
			Stage.superContext.lineTo(body.transform.position.x, body.transform.position.y);
			
			if(body.activeCollisions!=0)
			{
				Stage.superContext.setStrokeStyle('#ff0000');
			}
			else
			{
				Stage.superContext.setStrokeStyle('#00ff00');
			}
			
			Stage.superContext.setLineWidth(2);
			Stage.superContext.stroke();
		}
	}
}