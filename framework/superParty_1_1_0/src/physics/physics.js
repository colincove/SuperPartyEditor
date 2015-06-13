var Physics 			= {};

//-------------------------
//Enums
//-------------------------
var BodyTypes 			= new Enum('CIRCLE', 'BOX', 'POLYGON', 'POINT');



Physics.bodies 			= {};
Physics.bodies.lists 	= {allBodies:[]};
Physics.solver 			= {solve:function(body1, body2){}};
Physics.gravity			= {x:0, y:1};
Physics.doCollisions 	= function(){};

setupPhysicsMethods(Physics);
//-------------------------
//Events
//-------------------------
Physics.EVENT_ON_LOITER 	= "EVENT_ON_LOITER";//when a physics body loiters within a trigger
Physics.EVENT_ON_ENTER 		= "EVENT_ON_ENTER";//when a physics body enters a trigger
Physics.EVENT_ON_EXIT 		= "EVENT_ON_EXIT";//when a physics body exits a trigger
Physics.EVENT_COLLIDE 		= "EVENT_COLLIDE";//when 2 physics bodies collide
Physics.EVENT_ON_DESTROYED 	= "EVENT_ON_DESTROYED";//when a body has been destroyed through the physics system. 



//-------------------------
//Setup
//-------------------------
function setupPhysicsMethods(Physics)
{
	Physics.onCollision = function(body1, body2, type)
	{
		if(body1.isTrigger || body2.isTrigger) 
		{
			var body 	= body1.isTrigger ? body2:body1;
			var trigger = body1.isTrigger ? body1:body2;

			if(trigger.collisionTable[body.UUID])
			{
				trigger.emitEvent(Physics.EVENT_ON_LOITER, {other:body});
			}
			else
			{
				trigger.emitEvent(Physics.EVENT_ON_ENTER, {other:body});
				trigger.collisionTable[body.UUID] = body;
				body.triggerTable[trigger.UUID] = trigger;
				trigger.activeCollisions = trigger.activeCollisions + 1;
			}
		}
		else
		{
			//2 physical bodies have collided. Resolve the collision in the physics world. 
			Physics.solver.solve(body1, body2, type);
			body1.emitEvent(Physics.EVENT_ON_ENTER, {other:body2});
		}
	}
	//Collision engine calls this when 2 bodies are NOT touching.
	Physics.collisionCleanup = function(body1, body2)
	{
		if(body1.isTrigger || body2.isTrigger) 
		{
			var body 	= body1.isTrigger ? body2:body1;
			var trigger = body1.isTrigger ? body1:body2;

			if(trigger.collisionTable[body.UUID])
			{
				trigger.emitEvent(Physics.EVENT_ON_EXIT, {other:body});
				trigger.addEventListener(Physics.EVENT_ON_DESTROYED, Physics.tableCleanup); 
				delete trigger.collisionTable[body.UUID];
				delete body.triggerTable[trigger.UUID];
				trigger.activeCollisions = trigger.activeCollisions - 1;
			}
		}
	}
	//instantiate lists used to keep track of bodies
	for(var i = 0; i < BodyTypes.size; i++)
	{
		Physics.bodies.lists[i] = [];
	}
	Physics.bodies.destroyBody = function(body)
	{
		var list = Physics.bodies.lists[body.type];
		removeFromList(list, body);
		removeFromList(Physics.bodies.lists.allBodies, body);
	}
	Physics.bodies.addBody = function(body)
	{
		var list = Physics.bodies.lists[body.type];
		list.push(body);
		Physics.bodies.lists.allBodies.push(body);
	}
	Physics.bodies.setupBody = function(body)
	{
		this.addBody(body);
		Events.setup(body);
	}
	Physics.bodies.config = 
		{
			collisionTable:{},
			triggerTable:{},
			type:BodyTypes.POINT,
			sleeping:false,
			isTrigger:false,
			activeCollisions:0,
			static:false,
			drag:1.1,
			fric:1.00,
			damp:1,
			mass:1,
			density:1, 
			owner:{},
			collisionGroup:'common',
			getWidth:function(){return 0;},
			getHeight:function(){return 0;},
			getCenter:function()
			{
				return {
					x:this.transform.position.x+this.getWidth()/2, 
					y:this.transform.position.y+this.getHeight()/2
				};
			},
			transform:
			{
				position:{x:0, y:0}, 
				velocity: {x:0, y:0}, 
				rotation: 0, 
				scale:1,

				applyForce:function(x, y)
				{
					this.velocity.x+=	x;
					this.velocity.y+=	y;
				},
				setVelocity:function(x, y)
				{
					this.velocity.x = x;
					this.velocity.y = y;
				},
				setPosition:function(x, y) 
				{
					this.position.x = x;
					this.position.y = y;
				},
				move:function(x, y)
				{
					this.setPosition(this.position.x+x, this.position.y+y);
				}
			}
		};
	Physics.bodies.circleConfig = $.extend( true, {}, Physics.bodies.config,
		{
			type:BodyTypes.CIRCLE, 
			radius:1
		} );
	Physics.bodies.boxConfig = $.extend( true, {}, Physics.bodies.config, 
		{
			type:BodyTypes.BOX, 
			width:1, 
			height:1
		} );
	Physics.bodies.polygonConfig = $.extend( true, {}, Physics.bodies.config, 
		{
			type:BodyTypes.POLYGON, 
			vertices:[],
			getVertexCount:function(){return this.vertices.length;}
		} );
    Physics.bodies.getBody = function(type, config)
	{
        if (type == BodyTypes.POINT)
        {
            return Physics.bodies.getPoint(config);
        }
        else if (type == BodyTypes.CIRCLE)
        {
            return Physics.bodies.getCircle(config);
        }
        else if (type == BodyTypes.BOX)
        {
            return Physics.bodies.getBox(config);
        }
        else if (type == BodyTypes.POLYGON)
        {
            return Physics.bodies.getPolygon(config);
        }
        
		return null;
	}
    Physics.bodies.getPoint = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.config, config, {UUID:UUID.create()} );
		this.setupBody(body);
		return body;
	}
	Physics.bodies.getCircle = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.circleConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		body.getWidth = function()
		{
			return this.transform.scale*this.radius*2;
		}
		body.getHeight = function()
		{
			return this.transform.scale*this.radius*2;
		}
		body.getCenter = function()
		{
			return {
				x:this.transform.position.x, 
				y:this.transform.position.y
			};
		}
		return body;
	}
	Physics.bodies.getBox = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.boxConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		body.getWidth = function()
		{
			return this.transform.scale*this.width;
		}
		body.getHeight = function()
		{
			return this.transform.scale*this.height;
		}
		return body;
	}
	Physics.bodies.getPolygon = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.polygonConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		return body;
	}
}
