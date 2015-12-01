 //var activeLoops = [];

//var getLoopId = (function() {
	//var staticLoopId = 0;
	//return function() {
		//return staticLoopId++;
	//}
//})();

//let setGameLoop = function(update, tickLengthMs) {

	//var loopId = getLoopId();
	//activeLoops.push(loopId);

	/**
	 * Length of a tick in milliseconds. The denominator is your desired framerate.
	 * e.g. 1000 / 20 = 20 fps, 1000 / 60 = 60 fps
	 */
	//tickLengthMs = tickLengthMs || 1000 / 30;

	//[> gameLoop related variables <]
	//// timestamp of each loop
	//var previousTick = Date.now();
	//// number of times gameLoop gets called
	//var actualTicks = 0;

	//var gameLoop = function() {
		//var now = Date.now();

		//actualTicks++
		//if (previousTick + tickLengthMs <= now) {
			//var delta = (now - previousTick) / 1000;
			//previousTick = now;

			//// actually run user code
			//update(delta);

			//actualTicks = 0;
		//}

		//// do not go on to renew loop if no longer active
		//if (activeLoops.indexOf(loopId) === -1) {
			//return;
		//}

		//// otherwise renew loop in 16ms multiples, or immediately
		//if (Date.now() - previousTick < tickLengthMs - 16) {
			//setTimeout(gameLoop, 16);
		//} else {
			//setTimeout(gameLoop, 1);
		//}
	//}

	//// begin the loop!
	//gameLoop();

	//return loopId;
//};

//let clearGameLoop = function(loopId) {
	//// remove the loop id from the active loops
	//activeLoops.splice(activeLoops.indexOf(loopId), 1);
//};

//let loop = setGameLoop(()=>{
    //self.postMessage(1);
//}, 1000/30);

//let interval = setInterval(()=>{
    //self.postMessage(1);
//}, 1000/30);

let then = Date.now();
let interval = 1000/30;
let first = then;
let counter = 0;

function loop() {

    let now = Date.now();
    let delta = now - then;

    // If the fps interval is correct
    if (delta > interval) {
        // Calculate time since last frame
        then = now - (delta % interval);

        // Set up Rendering
        let _frame = _frame || 1;
        _frame = (_frame%30) ? _frame : 1;

        // Render game
        self.postMessage(1);

        // Calculate next render cycle
        let time_el = (then - first)/1000;
        ++this.counter;
        let _fps = parseInt(counter/time_el);

        // Increment Frame
        _frame++;
        //loop();
    } else {
        //setTimeout(loop, 1);
    }
}
let intervalTimer = setInterval(loop, 13);
//loop();
