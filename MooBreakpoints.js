var MooBreakpoints = new Class({
    options: { breakPoints : [320, 480, 768, 1024] },
    Implements: Options,
    initialize: function (options) {
        'use strict';
        var resizeDelay,
            currentBreakPoint,
            that = this,
            resizeFirer = function () {
                var i,
                    windowSize = window.getSize(),
                    fired = false;
                
                
                for (i = that.options.breakPoints.length - 1; i > -1; i -= 1) {
                    if ((windowSize.x >= that.options.breakPoints[i]) && (!fired)) {
                        fired = true;
                        if (currentBreakPoint !== that.options.breakPoints[i]) {
                            window.fireEvent('onWidthEnter' + that.options.breakPoints[i], windowSize);
                            window.fireEvent('onWidthLeave' + currentBreakPoint, windowSize);
                        }
                        currentBreakPoint = that.options.breakPoints[i];
                    }
                }
            };
        this.setOptions(options); 
        window.addEvent('resize', function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(250);
        });
    }
});

