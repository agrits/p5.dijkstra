function BlockArray(source = [0, 0], dest=[(w/blockSize)-1, (h/blockSize)-1]){
	this.source = source
	this.dest = dest

	this.createBlocksArray = function() {
		var arr = new Array()
		for(i = 0; i<h/blockSize; i++)
			for(j = 0; j<w/blockSize; j++)
				arr.push(new Block(j, i))
		return arr
	}

	this.blocks = this.createBlocksArray()

	//Returns block at position (x,y)
	this.getBlock = function(x, y=null) {
		return this.blocks[x+y*(w/blockSize)]
	}

	this.getBlock(this.source[0], this.source[1]).source = true

	
	this.getBlock(this.dest[0], this.dest[1]).dest = true


	this.show = function(){
		for (var i = this.blocks.length - 1; i >= 0; i--) {
			this.blocks[i].show()
		}
	}

	//Takes position of Block (x and y or position as Array) and returns Block that are its neighbours
	this.getNeighboursOf = function(x, y=null){
		if(y)
			return this.getBlock(x, y).neighbours.map(n => ba.getBlock(n[0], n[1]))
		return this.getBlock(x[0], x[1]).neighbours.map(n => ba.getBlock(n[0], n[1])).filter(n => n.active)
	}

	this.getBlock(this.source[0], this.source[1]).dist = 0
}
