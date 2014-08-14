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
		addInterval: function (arg) {
			eventObjects.push({
				animationStartAt: arg.startAt,
				animationEndAt: arg.endAt,
				a: arg.a,
				b: arg.b,
				progress: 0,
				enabled: true,
				id: id,
				callback: arg.fn,
				difference: arg.b - arg.a
			});
			id += 1;
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
				if (eo.element) {
					for (var attr in eo.targetStyle) { // Set default if above
						eo.element.css(attr, eo.targetStyle[attr][0]); 
					}
				} else {
					if (eo.progress !== 0) {
						eo.callback(eo.a, 0)
					}
					eo.progress = 0;
				}
			} else if (sT > eo.animationEndAt) { // Set target if below
				if (eo.element) {
					for (var attr in eo.targetStyle) {
						eo.element.css(attr, eo.targetStyle[attr][1]); 
					}
				} else {
					if (eo.progress !== 1) {
						eo.callback(eo.b, 1)
					}
					eo.progress = 1;
				}
			} else /* if (sT <= eo.animationEndAt && sT >= eo.animationStartAt) */ {
				var progress = (sT - eo.animationStartAt) / (eo.animationEndAt - eo.animationStartAt);
				if (eo.element) {
					for (var attr in eo.targetStyle) {
						var def = eo.targetStyle[attr][0];
						eo.element.css(attr, def+((eo.targetStyle[attr][1] - def) * progress));
					}
				} else {
					if (eo.progress !== progress) {
						eo.callback(eo.a + eo.difference * progress, progress);
					}
					eo.progress = progress;
				}
			} 
		}
	});
	
	jQuery.fn.animateByScroll = function() {
		if (typeof arguments[0] === "boolean")
			arguments[0] ? pub.enable() : pub.disable() // If true, enable; otherwise, disable. 
		else if (typeof arguments[0] === "object")
			pub.addElement(this, arguments[0]);
	};
	window.AnimateByScroll = pub;
})();