

(function(){
	var eventObjects = [],
		disabled = false,
		pub = {		
		/** Add an element that should be animated on scroll
		 * parameters: arg.element, arg.styles, arg.startAt, arg.endAt 
		 */
		add: function( arg ){
			// Add styles for the object
			var tS = {};
			for(var i in arg.styles) {
				tS[i] = [/*default*/ parseInt(arg.element.style[i]) ,/*new*/ parseInt(arg.styles[i]) ];
			}
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
		/** Disable the animations
		 */
		disable: function(){
			disabled = true;
		},
		/** Enable the animations
		 */
		enable: function(){
			disabled = false;
		}
	};
	
	$(document).scroll(function(){
		if(disabled) return;
		var sT = $(document).scrollTop();		
		for(var i = 0; i < eventObjects.length; i++){
			var eo = eventObjects[i];
			if(sT <= eo.animationEndAt && sT >= eo.animationStartAt) {
				var progress = (sT - eo.animationStartAt) / (eo.animationEndAt - eo.animationStartAt);
				for (var attr in eo.targetStyle) {
					var def = eo.targetStyle[attr][0];
					eo.element.style[attr] = def+((eo.targetStyle[attr][1] - def) * progress)
				}
			}
		}
	});
	
	window.ScrollingStones = pub;
})();