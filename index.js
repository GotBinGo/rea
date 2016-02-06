function node(left, up, right, down)
{
	this.value = 0;
	this.left = left;
	this.up = up;
	this.right = right;
	this.down = down;
	this.team = 0;
	this.count = function()
	{
		return 0+!(this.left==undefined)+!(this.up==undefined)+!(this.right==undefined)+!(this.down==undefined);		
	}
	this.add = function (t)
	{
		this.team = t;
		this.value++;
		if(this.value == this.count())
			this.bang();
	}
	this.bang = function (t)
	{
		this.value = 0;
		if(this.left !== undefined)
			this.left.add(t);
		
		if(this.up !== undefined)
			this.up.add(t);

		if(this.right !== undefined)
			this.right.add(t);

		if(this.down !== undefined)
			this.down.add(t);
	}
}

function stack(n)
{
	if(n < 1)
		return undefined;

	var a = new node();
	console.log('1')

	if(right)
		a.right = stack(n-1, right);
	else
		a.down = stack(n-1, right);
	
	return a;
}


var a = [];
var n = 3;

for(var i = 0; i < n; i++)
{
	a[i] = [];
	for(var j = 0; j < n; j++)
	{
		a[i][j]	= new node();
		if(i != 0)
		{
			a[i-1][j].down = a[i][j];
			a[i][j].up = a[i-1][j];
		}
		if(j != 0)
		{
			a[i][j-1].right = a[i][j];
			a[i][j].left = a[i][j-1];
		}	
	}
}

function print(a, n)
{	
	for(var i = 0; i < n; i++)
	{
		console.log(a[i].map(x=>x.value));
	}
}
print(a, n);
a[0][0].add()
a[0][0].add()
a[0][0].add()
a[0][0].add()
a[0][1].add()
print(a, n);
console.log('done');

