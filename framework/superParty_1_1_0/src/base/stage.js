var Stage = {};

Stage.canvas = $("#stage")[0];
Stage.context = Stage.canvas.getContext('2d');

Stage.cam = 
{
	x:0, 
	y:0,
	rotation:0
}