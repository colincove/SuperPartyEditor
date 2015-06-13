var Events 			= {};
Events.setup = function(obj)
{
	obj.addEventListener 	= Events.addEventListener;
	obj.emitEvent 			= Events.emitEvent;
}
Events.addEventListener = function(evt, func)
{
	if(this[Events.getListTitle(evt)] == null)
	{
		this[Events.getListTitle(evt)] = [];
	}

	this[Events.getListTitle(evt)].push(func);
}
Events.removeEventListener = function(evt, func)
{
	if(this[Events.getListTitle(evt)] == null)
	{
		return;
	}

	removeFromList(this[Events.getListTitle(evt)], func);
}
Events.getListTitle = function(evt)
{
	return evt+'_EVT_LIST';
}
Events.emitEvent 	= function(evt, data)
{
	if(this[Events.getListTitle(evt)] == null)
	{
		this[Events.getListTitle(evt)] = [];
	}

	if(data == null)
	{
		data = {};
	}

	data['target'] = this;

	var func;
	for (var i in this[Events.getListTitle(evt)])
	{
		var evtList = this[Events.getListTitle(evt)];
		var list =  this[Events.getListTitle(evt)][i];
		this[Events.getListTitle(evt)][i](data);
	}
}