module.exports = rea;

function rea()
{
	var turn = 0;
	var n, playernum;
	var inited = false;
	var brd;	
	
	function isinit()
	{
		if(!inited)
		{
			throw new Error("game not initialized");
		}
	}

	//public------------------------
	function init(dimr, dimc, pn)
	{
		if(dimr === undefined || dimc === undefined)
			throw new Error("board dimension not defined");
		if(pn === undefined)
			throw new Error("player number not defined");
		playernum = pn;
		brd = new board(dimr, dimc);
		inited = true;
	}
	//init required for all functions
	function state()
	{
		isinit();
		brd.print();
	}

	function place(row, col, team) //team optional, call discarded if not matching
	{
		isinit();
		if(team !== undefined)
			if(team != this.turnteam)
				return
		if (brd.place(row, col, this.turnteam)) //important to use turnteam
			turn++;
		else
		{
			//could not place that
		}
	}

	function turnteam()
	{
		isinit();
		return 1+turn%playernum;
	}
	
	Object.defineProperty(this, 'init', {value: init});
	Object.defineProperty(this, 'state', {get: state});
	Object.defineProperty(this, 'place', {value: place});
	Object.defineProperty(this, 'turnteam', {get: turnteam});
}

function board(dimr, dimc)
{
	this.a = [];
	this.rn = dimr;
	this.cn = dimc;
	var clc = require('cli-color');
	this.cs = [clc.white, clc.red, clc.green, clc.xterm(202), clc.blue, clc.yellowBright, clc.magentaBright];
	for(var i = 0; i < this.rn; i++)
	{
		this.a[i] = [];
		for(var j = 0; j < this.cn; j++)
		{
			this.a[i][j] = new node();
			if(i != 0)
			{
				this.a[i-1][j].down = this.a[i][j];
				this.a[i][j].up = this.a[i-1][j];
			}
			if(j != 0)
			{
				this.a[i][j-1].right = this.a[i][j];
				this.a[i][j].left = this.a[i][j-1];
			}	
		}
	}

	this.place = function(row, col, team)
	{
		if(this.a[row][col].team == team || this.a[row][col].team == 0)
		{
			this.a[row][col].add(team);
			return true;
		}
		return false;
		
	}
	
	this.print = function()
	{
		for(var i = 0; i < this.rn; i++)
		{		
			for(var j = 0; j < this.cn; j++)
			{
				var vv = ' '+this.a[i][j].value+' ';
				var nn = this.a[i][j].team;

				process.stdout.write(this.cs[nn](vv));
			}
			console.log();
		}
	}
}

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
			this.bang(t);
	}

	this.bang = function (t)
	{	
		
		this.value = 0;
		this.team = 0;
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

