//window.onresize = r;
//function r(){
//	var winW=window.innerWidth;
//	document.getElementsByTagName("html")[0].style.fontSize=winW*0.03125+"px";
//}

//	apiUrl:'http://10.111.102.128:8888',//测试"
//     window.onresize = r;
// function r(){
// 	var winW=window.innerWidth;
// 	document.getElementsByTagName("html")[0].style.fontSize=winW*0.03125+"px";
// }
(function (doc, win) {
	  	var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 16 * (clientWidth / 1600) + 'px';
			console.log(docEl.style.fontSize)
	    };
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);
