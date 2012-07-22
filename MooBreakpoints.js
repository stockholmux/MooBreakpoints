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
               delay: 250
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
                    fired = false;
                
                while((i <= (that.options.breakPoints.length -1)) && (!fired)) {
                    if ((windowSize.x <= that.options.breakPoints[i])  && (that.options.breakPoints[i] !== currentBreakPoint)) {
                        
                        if (currentBreakPoint !== that.options.breakPoints[i]) {
                            window.fireEvent('onWidthLeave' + currentBreakPoint, [currentBreakPoint, windowSize]);
                        }
        
                        window.fireEvent('onWidthEnter' + that.options.breakPoints[i], [that.options.breakPoints[i], windowSize]);
                        
                        currentBreakPoint = that.options.breakPoints[i]
                        fired = true;
                    }
                    
                    i += 1;
                }
            };
        
        window.addEvent('resize', function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(that.options.delay);
        });
    }
});

