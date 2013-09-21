

(function(){
	var self = this;
	var eventObjects = [];
	var disabled = false;
	var pub = {		/*element, styles, startAt, endAt */
		add: function( arg ){
			// Add styles for the object
			var tS = {};
			for(var i in arg.styles) {
				tS[i] = [/*default*/ parseInt(arg.element.style[i]) ,/*new*/ parseInt(arg.styles[i]) ];
			};
			// Add eventObject to datastructure
			eventObjects.push({
				animationStartAt: arg.startAt,
				animationEndAt: arg.endAt,
				targetStyle: tS
			});
		},
		clear: function(){
			console.log("not yet implemented");
		},
		disable: function(){
			disabled = true;
		},
		enable: function(){
			disabled = false;
		}
	};
	
	$(document).scroll(function(){
		if(disabled) return;
		var sT = $(document).scrollTop(
		for(var i = 0; i < eventObjects.length; i++){
			var eo = eventObjects[i];
			if(sT <= eo.animationEndAt && sT >= eo.animationStartAt) {
				
			}
		}
	});
	
	window.ScrollingStones = pub;
})();