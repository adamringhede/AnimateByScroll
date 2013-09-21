

(function(){
	var self = this;
	var eventObjects = [];
	var pub = {
		add: function(){
			eventObjects.push({
				endAt:
				startAt:
				
			});
		},
		clear: function(){
			console.log("not yet implemented");
		}
	};
	
	
	$(document).scroll(function(){
		var sT = $(document).scrollTop(
		for(var i = 0; i < eventObjects.length; i++){
			var eo = eventObjects[i];
			if(sT <= eo.endAt && sT >= eo.startAt) {
				
			}
		}
	});
	
	window.ScrollingStones = pub;
})();
/*
function stone(element, newStyle, startAt, endAt) {
	var 
		old = element.css(newStyle[0]),
		newVal = element.css(newStyle[1]);
		
	
}


stone(someEl, {left:100, top:40}, 400, 700);
*/