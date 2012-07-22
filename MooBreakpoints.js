/*
---
description: 
    - provides events when the window passes width thresholds
    - can be used as a polyfill for media query support
    - can be used as a complement to media queries
        (i.e. javascript that is only needed with media queries)
    
authors:
    - Kyle J. Davis (http://stockholmux.com)

license:
    - MIT-style license

provides:
    - MooBreakpoints
*/

var MooBreakpoints = new Class({
    options: { breakPoints : [320, 480, 768, 1024],
               delay: 250,
               delayedResizeEvent: false
            },
    Implements: Options,
    initialize: function (options) {
        'use strict';
        var resizeDelay,
            currentBreakPoint,
            that = this,
            resizeFirer;
            
        this.setOptions(options);
        

        
        resizeFirer = function () {
                var i = 0,
                    windowSize = window.getSize(),
                    rangeLow,
                    rangeHigh;
                    
                //test if still in currentBreakPoint
                while(i <= (that.options.breakPoints.length-1)) {
                    rangeLow = that.options.breakPoints[i];
                    if (that.options.breakPoints[i+1] === undefined) {
                        rangeHigh = screen.width;
                    } else {
                        rangeHigh = that.options.breakPoints[i+1];
                    }
                    //console.log(rangeLow+' .. '+rangeHigh);
                    
                    if (windowSize.x > rangeLow && windowSize.x <= rangeHigh) {
                        //console.log('Im here');
                        if (rangeHigh !== currentBreakPoint) {
                            
                            window.fireEvent('onWidthLeave'+currentBreakPoint,[currentBreakPoint,windowSize.x]);
                            currentBreakPoint = rangeHigh;
                            
                            window.fireEvent('onWidthEnter'+currentBreakPoint,[currentBreakPoint,windowSize.x]);
                        }
                        
                    }
                    
                    i += 1;
                }
               
                
                if(that.options.delayedResizeEvent) {  window.fireEvent('onDelayedResize', windowSize); }
               
            };
        
        
        if (this.options.breakPoints[0] !== 0) {
            this.options.breakPoints.unshift(0);
        }
        this.options.breakPoints.sort();
        
        window.addEvent('resize', function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(that.options.delay);
        });
    }
});

