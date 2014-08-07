AnimateByScroll
===============

Animate elements within vertical scroll boundaries based the window's current scroll position vertically. 
It works for any numerical style attribute. 


```JS

$(elementSelector).animateByScroll({
  startAt: 200,
  endAt: 400,
  styles: {left:200, top:100, opacity: 0.4}
});
```

If you for some reason need to disable the functionality, use the method passing a boolean value.
Disable using false and enable using true. It is enabled by default. 

```JS

$.fn.animateByScroll(false); // Disable
$.fn.animateByScroll(true); // Enable

```
