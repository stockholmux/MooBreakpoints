# MooBreakpoints
## A Mootools Plugin for responsive javascript

Media quries are great and can go a long way in shifting your design around depending on the width of the browser window(among other things), but if you back your design up with specific javascript, you will need something to to alert your script that your design is a different.
 
A few months ago [benbrown](https://github.com/benbrown) created [breakpoints](https://github.com/xoxco/breakpoints/) for jQuery. I was working on a [MooTools](http://mootools.net/) project and I needed the breakpoint functionality. So, I took Ben's concept and wrote a moo flavored plugin.

##How it works
```javascript
//create an instance of the plugin
myBreakpoints = new MooBreakpoints(/*your options here*/);

//add events - a few breakpoints are baked in, you can set your own in the optiopns
window.addEvents({
                'onWidthEnter480':function() {/* do stuff */},
                'onWidthLeave480':function() {/* do other stuff */}
});
```

##What kind of options do I have?
Four basic options exist - you can see them in action in the example.
###breakPoints
Default value - [320, 480, 768, 1024]

This is an array of screen widths that you want to respond to - the number represents the upper end of a range. So, this array:
```
[100,200,300]
```
would respond in three different widths - 0-100 (_onWidthEnter100_), 101-200 (_onWidthEnter200_), 201-300 (_onWidthEnter300_). If you want to fire an event when it is great than a certian width you can use a _onWidthLeaveXXX_ function and test with width in the event.

###delay
Default value - 250ms

The events are fired on a self-cancelling timeout so we don't get bogged down in handling every pixel change in width.  You can supply any number you want, although I would avoid extremely low numbers.

###delayedResizeEvent
Default value - false

Sometimes you just want to know the width of the window. Since this plugin is already measuring it on a self-cancelling timeout, if you set this to true, it will fire _onDelayedResize_ anytime the width of the window changes, even if it isn't a breakpoint. Just a little bonus.

###measureAtDomReady
default value - true

This will control if the width of your window is measured after the dom is ready. If it is set to true, your resize events will fire after you have initalized the plugin or when the dom is ready, whichever is last. This gets a little tricky - you will want to setup your _onWidthEnterXXX_/_onWidthLeaveXXX_ events before you create the instance of the plugin if you want them to immediately fire. 

