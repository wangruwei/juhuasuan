'use strict';
window.onload = function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth*0.1+'px';
	window.onresize = function(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth*0.1+'px';
	};
	var oBanner = document.querySelectorAll('.banner')[0];
	var oUl = oBanner.children[0];
	var aLi = oUl.children;
	var aBtn = oBanner.children[1].children;
	var x = 0;
	oUl.addEventListener('touchstart',function(ev){
		oUl.style.WebkitTransition = 'none';
		var disX = ev.targetTouches[0].pageX-x;
		var startX = ev.targetTouches[0].pageX;
		var startY = ev.targetTouches[0].pageY;
		var dir = '';
		var swipe = '';
		var oldTime = new Date().getTime();
		function fnMove(ev){
			var endX = ev.targetTouches[0].pageX;
			swipe = endX-startX;
			if(dir==''){
				if(Math.abs(ev.targetTouches[0].pageX-startX)>10)dir='x';
				if(Math.abs(ev.targetTouches[0].pageY-startY)>10)dir='y';
			}else{
				if(dir=='x'){
					x = ev.targetTouches[0].pageX-disX;
					oUl.style.WebkitTransform = 'translateX('+x+'px)';
					ev.preventDefault()
				}
			}
		}
		function fnEnd(ev){
			var n = Math.round(x/aLi[0].offsetWidth);
			var newTime = new Date().getTime();
			var ms = newTime - oldTime;
			if(ms<200&&Math.abs(swipe)<aLi[0].offsetWidth/2){
				if(swipe<0)n-=1;
				if(swipe>0)n+=1;
			}
			if(n>0)n=0;
			if(n<-(aLi.length-1))n=-(aLi.length-1);
			x = n*aLi[0].offsetWidth;
			oUl.style.WebkitTransition = '0.3s all ease';
			oUl.style.WebkitTransform = 'translateX('+x+'px)';
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className = '';
			}
			aBtn[Math.abs(n)].className = 'on';
			oUl.removeEventListener('touchmove',fnMove,false);
			oUl.removeEventListener('touchend',fnEnd,false);
		}
		oUl.addEventListener('touchmove',fnMove,false);
		oUl.addEventListener('touchend',fnEnd,false);
	},false);
};
