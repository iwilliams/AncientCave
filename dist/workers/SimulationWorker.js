(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

"use strict";

var then = Date.now();
var interval = 1000 / 30;
var first = then;
var counter = 0;

function loop() {

	var now = Date.now();
	var delta = now - then;

	// If the fps interval is correct
	if (delta > interval) {
		// Calculate time since last frame
		then = now - delta % interval;

		// Set up Rendering
		var _frame = _frame || 1;
		_frame = _frame % 30 ? _frame : 1;

		// Render game
		self.postMessage(1);

		// Calculate next render cycle
		var time_el = (then - first) / 1000;
		++this.counter;
		var _fps = parseInt(counter / time_el);

		// Increment Frame
		_frame++;
		//loop();
	} else {
			//setTimeout(loop, 1);
		}
}
var intervalTimer = setInterval(loop, 13);
//loop();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC93b3JrZXJzL1NpbXVsYXRpb25Xb3JrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3dFQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFDLEVBQUUsQ0FBQztBQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztBQUVoQixTQUFTLElBQUksR0FBRzs7QUFFWixLQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsS0FBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQzs7O0FBR3ZCLEtBQUksS0FBSyxHQUFHLFFBQVEsRUFBRTs7QUFFbEIsTUFBSSxHQUFHLEdBQUcsR0FBSSxLQUFLLEdBQUcsUUFBUSxBQUFDLENBQUM7OztBQUdoQyxNQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQ3pCLFFBQU0sR0FBRyxBQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7O0FBR2xDLE1BQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUdwQixNQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUEsR0FBRSxJQUFJLENBQUM7QUFDbEMsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2YsTUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBR3JDLFFBQU0sRUFBRSxDQUFDOztFQUVaLE1BQU07O0dBRU47Q0FDSjtBQUNELElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIC8vdmFyIGFjdGl2ZUxvb3BzID0gW107XG5cbi8vdmFyIGdldExvb3BJZCA9IChmdW5jdGlvbigpIHtcblx0Ly92YXIgc3RhdGljTG9vcElkID0gMDtcblx0Ly9yZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Ly9yZXR1cm4gc3RhdGljTG9vcElkKys7XG5cdC8vfVxuLy99KSgpO1xuXG4vL2xldCBzZXRHYW1lTG9vcCA9IGZ1bmN0aW9uKHVwZGF0ZSwgdGlja0xlbmd0aE1zKSB7XG5cblx0Ly92YXIgbG9vcElkID0gZ2V0TG9vcElkKCk7XG5cdC8vYWN0aXZlTG9vcHMucHVzaChsb29wSWQpO1xuXG5cdC8qKlxuXHQgKiBMZW5ndGggb2YgYSB0aWNrIGluIG1pbGxpc2Vjb25kcy4gVGhlIGRlbm9taW5hdG9yIGlzIHlvdXIgZGVzaXJlZCBmcmFtZXJhdGUuXG5cdCAqIGUuZy4gMTAwMCAvIDIwID0gMjAgZnBzLCAxMDAwIC8gNjAgPSA2MCBmcHNcblx0ICovXG5cdC8vdGlja0xlbmd0aE1zID0gdGlja0xlbmd0aE1zIHx8IDEwMDAgLyAzMDtcblxuXHQvL1s+IGdhbWVMb29wIHJlbGF0ZWQgdmFyaWFibGVzIDxdXG5cdC8vLy8gdGltZXN0YW1wIG9mIGVhY2ggbG9vcFxuXHQvL3ZhciBwcmV2aW91c1RpY2sgPSBEYXRlLm5vdygpO1xuXHQvLy8vIG51bWJlciBvZiB0aW1lcyBnYW1lTG9vcCBnZXRzIGNhbGxlZFxuXHQvL3ZhciBhY3R1YWxUaWNrcyA9IDA7XG5cblx0Ly92YXIgZ2FtZUxvb3AgPSBmdW5jdGlvbigpIHtcblx0XHQvL3ZhciBub3cgPSBEYXRlLm5vdygpO1xuXG5cdFx0Ly9hY3R1YWxUaWNrcysrXG5cdFx0Ly9pZiAocHJldmlvdXNUaWNrICsgdGlja0xlbmd0aE1zIDw9IG5vdykge1xuXHRcdFx0Ly92YXIgZGVsdGEgPSAobm93IC0gcHJldmlvdXNUaWNrKSAvIDEwMDA7XG5cdFx0XHQvL3ByZXZpb3VzVGljayA9IG5vdztcblxuXHRcdFx0Ly8vLyBhY3R1YWxseSBydW4gdXNlciBjb2RlXG5cdFx0XHQvL3VwZGF0ZShkZWx0YSk7XG5cblx0XHRcdC8vYWN0dWFsVGlja3MgPSAwO1xuXHRcdC8vfVxuXG5cdFx0Ly8vLyBkbyBub3QgZ28gb24gdG8gcmVuZXcgbG9vcCBpZiBubyBsb25nZXIgYWN0aXZlXG5cdFx0Ly9pZiAoYWN0aXZlTG9vcHMuaW5kZXhPZihsb29wSWQpID09PSAtMSkge1xuXHRcdFx0Ly9yZXR1cm47XG5cdFx0Ly99XG5cblx0XHQvLy8vIG90aGVyd2lzZSByZW5ldyBsb29wIGluIDE2bXMgbXVsdGlwbGVzLCBvciBpbW1lZGlhdGVseVxuXHRcdC8vaWYgKERhdGUubm93KCkgLSBwcmV2aW91c1RpY2sgPCB0aWNrTGVuZ3RoTXMgLSAxNikge1xuXHRcdFx0Ly9zZXRUaW1lb3V0KGdhbWVMb29wLCAxNik7XG5cdFx0Ly99IGVsc2Uge1xuXHRcdFx0Ly9zZXRUaW1lb3V0KGdhbWVMb29wLCAxKTtcblx0XHQvL31cblx0Ly99XG5cblx0Ly8vLyBiZWdpbiB0aGUgbG9vcCFcblx0Ly9nYW1lTG9vcCgpO1xuXG5cdC8vcmV0dXJuIGxvb3BJZDtcbi8vfTtcblxuLy9sZXQgY2xlYXJHYW1lTG9vcCA9IGZ1bmN0aW9uKGxvb3BJZCkge1xuXHQvLy8vIHJlbW92ZSB0aGUgbG9vcCBpZCBmcm9tIHRoZSBhY3RpdmUgbG9vcHNcblx0Ly9hY3RpdmVMb29wcy5zcGxpY2UoYWN0aXZlTG9vcHMuaW5kZXhPZihsb29wSWQpLCAxKTtcbi8vfTtcblxuLy9sZXQgbG9vcCA9IHNldEdhbWVMb29wKCgpPT57XG4gICAgLy9zZWxmLnBvc3RNZXNzYWdlKDEpO1xuLy99LCAxMDAwLzMwKTtcblxuLy9sZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgIC8vc2VsZi5wb3N0TWVzc2FnZSgxKTtcbi8vfSwgMTAwMC8zMCk7XG5cbmxldCB0aGVuID0gRGF0ZS5ub3coKTtcbmxldCBpbnRlcnZhbCA9IDEwMDAvMzA7XG5sZXQgZmlyc3QgPSB0aGVuO1xubGV0IGNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBsb29wKCkge1xuXG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIC8vIElmIHRoZSBmcHMgaW50ZXJ2YWwgaXMgY29ycmVjdFxuICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAvLyBTZXQgdXAgUmVuZGVyaW5nXG4gICAgICAgIGxldCBfZnJhbWUgPSBfZnJhbWUgfHwgMTtcbiAgICAgICAgX2ZyYW1lID0gKF9mcmFtZSUzMCkgPyBfZnJhbWUgOiAxO1xuXG4gICAgICAgIC8vIFJlbmRlciBnYW1lXG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoMSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5leHQgcmVuZGVyIGN5Y2xlXG4gICAgICAgIGxldCB0aW1lX2VsID0gKHRoZW4gLSBmaXJzdCkvMTAwMDtcbiAgICAgICAgKyt0aGlzLmNvdW50ZXI7XG4gICAgICAgIGxldCBfZnBzID0gcGFyc2VJbnQoY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgX2ZyYW1lKys7XG4gICAgICAgIC8vbG9vcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vc2V0VGltZW91dChsb29wLCAxKTtcbiAgICB9XG59XG5sZXQgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKGxvb3AsIDEzKTtcbi8vbG9vcCgpO1xuIl19
