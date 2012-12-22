Radial-Gradient
===============

A simple library for creating evenly distributed monochromatic radial gradients with stop values (0 meaning black, 255 meaning white).

**Functions Include**
- draw() - (re)draws the gradient.
- clear() - clears the gradient.
- pop() - removes and returns the last stop.
- push(stop1, ..., stopN) - appends given stops to the end of the gradient.
- shift() - removes and returns the first stop.
- unshift(stop1, ..., stopN) - appends given stops to the beginning of the gradient. reverse() - reverse the order of all stops.
- map(callback) - modifies the gradient by calling the callback for every stop. sort([callback]) - sorts the stops (via an optional comparison callback)

***
**Example**

	var gradient = new Gradient(element, [0, 255]);
	gradient.push(0, 255);
	gradient.shift();

	gradient.map(function(stop){
 	   return Math.min(255, stop + 100);
	});

	gradient.unshift(0);
	gradient.pop();
	gradient.clear();
***
