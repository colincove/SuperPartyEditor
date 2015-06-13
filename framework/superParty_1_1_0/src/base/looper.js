var Looper = {};

//-------------------------
//Static Variables
//-------------------------
Looper.DEFAULT_LOOP_TIME 	= 100;
//-------------------------
//Events
//-------------------------
Looper.EVENT_LOGIC_TICK		= "EVENT_LOGIC_TICK";
Looper.EVENT_DRAW_TICK		= "EVENT_DRAW_TICK";

//-------------------------
//Setup
//-------------------------
Events.setup(Looper);
Looper.timer				= null;

//will cause loop to fall out when set to true
Looper.markStop 			= false;
Looper.loopTime 			= Looper.DEFAULT_LOOP_TIME;

Looper.now = 0;
Looper.dt   = 0;
Looper.last = (new Date).getTime();
Looper.step = 1/30;

function frame() {

}
Looper.tick = function()
{
	Looper.now 	= (new Date).getTime();
	Looper.dt 	= Looper.dt + Math.min(1, (Looper.now - Looper.last) / 1000);
	while(Looper.dt > Looper.step) 
	{
		Looper.dt = Looper.dt - Looper.step;
		//converts step from seconds into milliseconds. 
		Looper.emitEvent(Looper.EVENT_LOGIC_TICK, {step:Looper.step*1000});
		Physics.doCollisions();//Physics should always be done last
	}
	Looper.emitEvent(Looper.EVENT_DRAW_TICK);
	Looper.last = Looper.now;
	requestAnimationFrame(Looper.tick);
}
Looper.start = function()
{
	requestAnimationFrame(Looper.tick);
}
Looper.stop = function()
{
	Looper.markStop = true;
}
Looper.cancelLoop = function()
{
	if(Looper.timer)
	{
		clearInterval(Looper.timer);
	}
	Looper.markStop = false;
}
Looper.setFps = function(fps)
{
	//convert frames per second into milliseconds to be used by timer
	Looper.loopTime = 1000/fps;
}



