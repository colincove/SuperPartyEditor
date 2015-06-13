var trigger;
var xOffset;
var yOffset;

function update(e)
{
    trigger.transform.setPosition(gameObject.body.transform.position.x+xOffset, gameObject.body.transform.position.y+yOffset);
}