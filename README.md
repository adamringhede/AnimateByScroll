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
