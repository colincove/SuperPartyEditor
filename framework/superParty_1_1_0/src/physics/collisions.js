var Collisions = {};

setupCollisionMethods(Collisions);
Physics.doCollisions = Collisions.doCollisions;
//Looper.addEventListener(Looper.EVENT_LOGIC_TICK, Collisions.doCollisions);
//mapping the type of bodies to the methods used to calculate their collisions
Collisions.methods = {};

Collisions.methods[BodyTypes.POINT] = {};
Collisions.methods[BodyTypes.POINT][BodyTypes.POINT] = Collisions.noMethod;
Collisions.methods[BodyTypes.POINT][BodyTypes.CIRCLE] = Collisions.collidePointToCircle;
Collisions.methods[BodyTypes.POINT][BodyTypes.BOX] = Collisions.noMethod;

Collisions.methods[BodyTypes.CIRCLE] = {};
Collisions.methods[BodyTypes.CIRCLE][BodyTypes.CIRCLE] = Collisions.collideCircleToCircle;
Collisions.methods[BodyTypes.CIRCLE][BodyTypes.BOX] = Collisions.collideCircleToBox;
Collisions.methods[BodyTypes.CIRCLE][BodyTypes.POLYGON] = Collisions.noMethod;

Collisions.methods[BodyTypes.BOX] = {};
Collisions.methods[BodyTypes.BOX][BodyTypes.BOX] = Collisions.collideBoxToBox;
Collisions.methods[BodyTypes.BOX][BodyTypes.POLYGON] = Collisions.noMethod;

Collisions.methods[BodyTypes.POLYGON] = {};
Collisions.methods[BodyTypes.POLYGON][BodyTypes.POLYGON] = Collisions.noMethod;

function setupCollisionMethods(obj)
{
	obj.doCollisions = function(e)
	{
		var bodyList = Physics.bodies.lists.allBodies;
		for(var i = 0;i<bodyList.length;i++)
		{
			var body1 = bodyList[i];

			if(!body1.static && !body1.isTrigger) 
			{
				body1.transform.move(body1.transform.velocity.x, body1.transform.velocity.y);

				body1.transform.setVelocity(
					body1.transform.velocity.x/body1.drag+
					Physics.gravity.x, 
					body1.transform.velocity.y/body1.drag+
					Physics.gravity.y);	
			}
		}
		for(var i = 0;i<bodyList.length;i++)
		{
			var body1 = bodyList[i];
			
			for(var j = i+1; j<bodyList.length;j++)
			{
				var body2 = bodyList[j];

				if(body1.isTrigger && body2.isTrigger) continue;
				if(body1.static && body2.static) continue;

				//order the bodies by type
				if(body2.type < body1.type)
				{
					var tmpBody = body1;
					body1 		= body2;
					body2		= tmpBody;
				}

				var method 		= Collisions.methods[body1.type][body2.type];

				var collision 	= method(body1, body2);	

				if(collision)
				{
					Physics.onCollision(body1, body2, body1.type | body2.type);
				}
				else
				{
					Physics.collisionCleanup(body1, body2);
				}
			}

		}
	}
	obj.noMethod = function(b, b)
	{
		//no method for collision;
		return false;
	}
	obj.collidePointToCircle = function(p, c)
	{
		var d = Math.sqrt(Math.pow(c.transform.position.x-p.transform.position.x, 2)+Math.pow(c.transform.position.y-p.transform.position.y, 2));
		if(d<c.radius)return true;
		return false;
	}
	obj.collidePointToBox = function(p, b)
	{
		if(p.transform.position.x < b.transform.position.x+b.getWidth() &&
			p.transform.position.x > b.transform.position.x &&
			p.transform.position.y < b.transform.position.y+b.getHeight() &&
			p.transform.position.y > b.transform.position.y
			)
		{
			return true;
		}

		return false;
	}
	obj.collideCircleToCircle = function(c1, c2)
	{
		var d = Math.sqrt(Math.pow(c2.transform.position.x-c1.transform.position.x, 2)+Math.pow(c2.transform.position.y-c1.transform.position.y, 2));
		if(d<c1.radius+c2.radius)return true;
		return false;
	}
	//http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
	obj.collideCircleToBox = function(c, b)
	{
		var circleDistance = {};
	    circleDistance.x = Math.abs(c.transform.position.x - b.transform.position.x);
	    circleDistance.y = Math.abs(c.transform.position.y - b.transform.position.y);

	    if (circleDistance.x > (b.getWidth()/2 + c.radius)) { return false; }
	    if (circleDistance.y > (b.getHeight()/2 + c.radius)) { return false; }

	    if (circleDistance.x <= (b.getWidth()/2)) { return true; } 
	    if (circleDistance.y <= (b.getHeight()/2)) { return true; }

	    var cornerDistance_sq = Math.pow(circleDistance.x - b.getWidth()/2, 2) +
	                         Math.pow(circleDistance.y - b.get/2, 2);

	    return (cornerDistance_sq <= Math.pow(c.radius, 2));
	}
	//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
	obj.collideBoxToBox = function(b1, b2)
	{
		var rect1 = {x: b1.transform.position.x, y: b1.transform.position.y, width: b1.getWidth(), height: b1.getHeight()};
		var rect2 = {x: b2.transform.position.x, y: b2.transform.position.y, width: b2.getWidth(), height: b2.getHeight()};
		
		if (rect1.x < rect2.x + rect2.width &&
		   rect1.x + rect1.width > rect2.x &&
		   rect1.y < rect2.y + rect2.height &&
		   rect1.height + rect1.y > rect2.y) 
		   {
			return true;
		}
		return false;
	}
}





