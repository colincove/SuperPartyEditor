Rendering.register('SIMPLE_RENDER', 
	{draw:function(drawInfo)
	{
		if(this.res == null)return;
		
		Stage.context.drawImage(this.res, this.transform.position.x, this.transform.position.y);
	}
});