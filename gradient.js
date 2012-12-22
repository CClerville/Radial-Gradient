/**
 * Created with JetBrains WebStorm.
 * User: Chris Clerville
 * Date: 12/18/12
 * Time: 2:50 AM
 */

var Gradient = function(el, colors) {
    var me          = this;
    me.el           = el;
    me.colors       = colors;
    me.maxDiameter  = me.el.offsetWidth;

    //(re)draws the gradient
    me.draw = function() {
        me.clear();
        createGradient(me.el, me.maxDiameter, me.colors);
    };

    //clears the gradient
    me.clear = function() {
        me.el.innerHTML = "";
    };

    //removes and returns the last stop
    me.pop = function() {
        var last = me.colors[me.colors.length - 1];

        //creates a new array without the last element
        me.colors.splice(me.colors.length - 1, 1);
        me.draw();

        return last;
    };

    //removes and returns the first stop
    me.shift = function() {
        var first = me.colors[0];

        //create new array without the first element
        me.colors.splice(0,1);
        me.draw();

        return first;
    };

    //appends given stops to the beginning of the stops array
    me.unshift = function() {
        var stops   = Array.prototype.slice.call(arguments),
            len     = stops.length,
            i;

        for(i = 0 ; i < len ; i++) {
            me.colors.splice(0, 0, stops[i]);
        }

        me.draw();
    };

    //reverse the order of all stops
    me.reverse = function() {
        var len = me.colors.length,
            i;

        if(me.colors.length > 1) {
            for(i = 0 ; i < (len/2) ; i++) {
                var temp = me.colors[i];
                me.colors[i] = me.colors[me.colors.length - 1 - i];
                me.colors[me.colors.length - 1 - i] = temp;
            }
        }

        me.draw();
    };

    //sorts the stops (via an optional comparison callback)
    me.sort = function(callback) {
        me.colors.sort(callback);
        me.draw();
    };

    //modifies the gradient by calling the callback for every stop
    me.map = function(callback) {
        var len = me.colors.length,
            i;

        for(i = 0 ; i < len ; i++) {
            me.colors[i] = callback(me.colors[i]);
        }

        me.draw();
    };

    me.draw();

};

//appends given stops to the end of the gradient.
Gradient.prototype.push = function() {
    var me      = this,
        stops   = Array.prototype.slice.call(arguments),
        len     = stops.length,
        i;

    for(i = 0 ; i < len ; i++) {
        me.colors.push(stops[i]);
    }

    me.draw();
};

function createCircle(el, maxDiameter, i, max, color) {
    var circle      = document.createElement('div'),
        background  = 'rgb('+ color+"%"+ "," + color+"%" + "," + color+"%" + ');',
        offset      = ((max - i) / 2) + 'px;';


    circle.style.cssText = ''.concat(
        'width          : '.concat((i/max)*100, '%;'),
        'height         : '.concat((i/max)*100, '%;'),
        'border-radius  : '.concat(maxDiameter, 'px;'),
        'background     : '.concat(background),
        'top            : '.concat(offset),
        'left           : '.concat(offset)
    );

   el.appendChild(circle);

}

/*
   ---------------------------------------------------------------------
    Source: https://raw.github.com/rhuang/gradient/master/gradient.js

    The source was helpful in implementing the gradient function.
   ---------------------------------------------------------------------
 */
function createCircles(el, maxDiameter, min, max, outerColor, innerColor) {
    for (var i = max; i >= min; i--) {
        var color;
        if(outerColor < innerColor) {
            color = (innerColor - outerColor)/255*100 * (1 - (i-min)/(max-min)) + outerColor/255*100;
        }
        else {
            color = (outerColor/255)*100 - (outerColor - innerColor)/255*100 * (1 - (i-min)/(max-min));
        }

        createCircle(el, maxDiameter, i, max, color);
    }
}

function createGradient(el, maxDiameter, colors) {
    var interval = maxDiameter/(colors.length - 1);
    for (var i = 0; i < colors.length - 1; i++) {
        var gradientCircle  = document.createElement('div'),
            max             = maxDiameter - i*interval,
            min             = maxDiameter - (i+1)*interval;

        gradientCircle.style.cssText = ''.concat(
            'width  : '.concat(max , "px;"),
            'height : '.concat(max, "px;"),
            'left   : '.concat((i*interval)/2, "px;"),
            'top    : '.concat((i*interval)/2, "px;")
        );

        createCircles(gradientCircle, maxDiameter, min, max, colors[i], colors[i+1]);

        el.appendChild(gradientCircle);
    }
}