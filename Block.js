function Block(x, y){
	this.x = x
	this.y = y
	this.pos = [this.x, this.y]
	this.active = true
	this.dist = Number.POSITIVE_INFINITY
	this.prev = null
	this.source = false
	this.dest = false
	this.inShortestPath = false
	this.neighbours = createNeighbours(this.x, this.y)


	this.switchActivity = function(){
		this.active = !this.active
	}

	this.show = function(){
		fill(255)
		if(this.inShortestPath)
			fill(255, 255, 0)
		if(!this.active)
			fill(0)

		if(this.dest)
			fill(140)

		if(this.source)
			fill(80)

		strokeWeight(strokeW)
		stroke(0)
		rect(x*blockSize, y*blockSize, blockSize-strokeW, blockSize-strokeW)
	}
}

//Creates Array of neighbours' positions for Block at given (x, y) position
function createNeighbours(x, y) {
		var arr = new Array()

		if(y > 1)
			arr.push([x, y-1])

		if(y < (h/blockSize)-1)
			arr.push([x, y+1])

		if(x > 1)
			arr.push([x-1, y])

		if(x < (w/blockSize)-1)
			arr.push([x+1, y])

		return arr
}