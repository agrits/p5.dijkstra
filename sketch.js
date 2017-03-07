w = 640
h = 320
noPath = false
mousePath = []
ba = null;
function setup(){
	createCanvas(w, h)
	blockSize = 10
	strokeW = 1
	ba = new BlockArray()
}

function draw(){
	background(255)
	ba.show()
	if(noPath){
		alert("There is no possible path from the source to the destinition")
		noPath = false
	}
}

function mousePressed(){
	var selectedBlock = ba.getBlock(Math.floor(mouseX/blockSize), Math.floor(mouseY/blockSize))
	selectedBlock.switchActivity()
}

function mouseDragged(){
	var coords = [Math.floor(mouseX/blockSize), Math.floor(mouseY/blockSize)]
	if(!mousePath.some(e => e[0]===coords[0] && e[1]===coords[1]))
		mousePath.push(coords)
}

function mouseReleased(){
	mousePath.slice(0).forEach(e => ba.getBlock(e[0], e[1]).switchActivity())
	mousePath = []
}

function findPath() {
	var queue = [ba.getBlock(ba.source[0], ba.source[1])]
	while(queue.length>0){
		ba.getNeighboursOf(queue[0].pos).forEach(n => {if(n.dist>queue[0].dist+1) {
			n.dist = queue[0].dist+1;
			n.prev = queue[0];
			queue.push(n)
		}})
		queue.shift()
	}
	if(ba.getBlock(ba.dest[0], ba.dest[1]).prev===null){
		noPath = true
		return null
	}
	function getPathToSource(block = ba.getBlock(ba.dest[0], ba.dest[1]), path = []){
		block.inShortestPath = true
		if(block === ba.getBlock(ba.source[0], ba.source[1]))
			return path
		return getPathToSource(block.prev, [].concat(path, block))
	}

	var path = getPathToSource()
	path.reverse()
	return path
}

function reset(){
	ba = new BlockArray()
}

function keyPressed(){
	//R key pressed
	if(keyCode == 82)
		reset()

	//Space pressed
	if(keyCode == 32)
		findPath()
}