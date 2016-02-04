function node(left, up, right, down)
{
	this.value = 0;
	this.left = left;
	this.up = up;
	this.right = right;
	this.down = down;
	this.count = function()
	{
		return 0+!!(this.left!==undefined)+!!(this.up!==undefined)+!!(this.right!==undefined)+!!(this.down!==undefined);		
	}
	this.add = function ()
	{
		this.value++;
		if(this.value == this.count())
			this.bang();
	}
	this.bang = function ()
	{
		this.value = 0;
		if(this.left !== undefined)
			this.left.add();
		
		if(this.up !== undefined)
			this.up.add();

		if(this.right !== undefined)
			this.right.add();

		if(this.down !== undefined)
			this.down.add();
	}
}
var a = new node();
function board(b, n)
{
	if(n == 0)
		return;

	b.right = new node();
	console.log('done')
	board(b.rigth, n-1);
	console.log('done')
	b.down = new node();
	board(b.down, n-1);
}
board(a, 5);


console.log('done');

