function stone(element, newStyle, startAt, endAt) {
	var st = $(document).scrollTop(),
		old = element.css(newStyle[0]),
		newVal = element.css(newStyle[1]);
	$(document).scroll(function(){
		if(st >= endAt && st <= startAt) {
			
		}
	});
}