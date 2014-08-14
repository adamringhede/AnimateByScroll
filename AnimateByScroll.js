(function(){
	var eventObjects = [],
		id = 0,
		disabled = false,
		pub = {		
		/** Add an element that should be animated on scroll
		 * parameters: arg.element, arg.styles, arg.startAt, arg.endAt
		 */
		addElement: function( element, arg ){
			// Add styles for the object
			var tS = {};
			for(var i in arg.styles) {
				tS[i] = [/*default*/ parseFloat(element.css(i)) ,/*new*/ parseFloat(arg.styles[i]) ];
			}
			// Add eventObject to array
			eventObjects.push({
				animationStartAt: arg.startAt,
				animationEndAt: arg.endAt,
				targetStyle: tS,
				element: element,
				enabled: true,
				id: id
			});
			element.data('animateByScrollID', id);
			id += 1;
		},
		addInterval: function (parameters) {
			
		},
		clear: function(){
			eventObjects.length = 0;
		},
		/** Disable the animations
		 */
		disable: function(object){
			if (!object) {
				disabled = true;
			} else {
				for (var i = 0, l = eventObjects; i < l; i++) {
					if (eventObjects[i].id === parseInt(object.data('animateByScrollID'))) {
						eventObjects[i].enabled = false;
					}
				}
			}
		},
		/** Enable the animations
		 */
		enable: function(object){
			if (!object) {
				disabled = false;
			} else {
				for (var i = 0, l = eventObjects; i < l; i++) {
					if (eventObjects[i].id === parseInt(object.data('animateByScrollID'))) {
						eventObjects[i].enabled = true;
					}
				}
			}
		}
	};
	
	$(document).scroll(function(){
		if(disabled) return;
		var sT = $(document).scrollTop();		
		for(var i = 0; i < eventObjects.length; i++){
			var eo = eventObjects[i];
			if (!eo.enabled) continue;
			if (sT < eo.animationStartAt) {
				for (var attr in eo.targetStyle) { // Set default if above
					eo.element.css(attr, eo.targetStyle[attr][0]); 
				}
			} else if (sT > eo.animationEndAt) { // Set target if below
				for (var attr in eo.targetStyle) {
					eo.element.css(attr, eo.targetStyle[attr][1]); 
				}
			} else /* if (sT <= eo.animationEndAt && sT >= eo.animationStartAt) */ {
				var progress = (sT - eo.animationStartAt) / (eo.animationEndAt - eo.animationStartAt);
				for (var attr in eo.targetStyle) {
					var def = eo.targetStyle[attr][0];
					eo.element.css(attr, def+((eo.targetStyle[attr][1] - def) * progress));
				}
			} 
		}
	});
	
	jQuery.fn.animateByScroll = function() {
		if (typeof arguments[0] === "boolean")
			arguments[0] ? pub.enable() : pub.disable() // If true, enable; otherwise, disable. 
		else if (typeof arguments[0] === "object")
			pub.add(this, arguments[0]);
	};
	window.AnimateByScroll = pub;
})();

AnimateByScroll.add({
	startAt: 1,
	endAt: 5,
	fn: function (value, progress) {

	}
});

