$(function(){
	//DOM对象
	var audio=$('#audio').get(0);
	//jQuery对象
	var $audio=$('audio');
	var musics=[
		{src:'mp3/Adele - Hello.mp3',name:'Hello',author:'Adele',time:'04:55'},
		{src:'mp3/Adele - When We Were Young.mp3',name:'When We',author:'Adele',time:'04:50'},
		{src:'mp3/Love_Story-Taylor_Swift.mp3',name:'LoveStory',author:'Taylor',time:'03:54'},
		{src:'mp3/Tove Lo - Talking Body.mp3',name:'Talking',author:'Tove Lo',time:'03:58'},
		{src:'mp3/曾恺玹 - 撒娇.mp3',name:'撒娇',author:'曾恺玹',time:'04:43'},
		{src:'mp3/汪苏泷、林希儿 - 专属味道.mp3',name:'专属味道',author:'汪苏泷',time:'03:24'},
		{src:'mp3/王童语 - 丫头.mp3',name:'丫头',author:'王童语',time:'05:40'}
	]
	$(musics).each(function(i,v){
		$('<ul class="song-list" data-id='+i+'><li class="song-name">'+v.name+'</li><li class="song-author">'+v.author+'</li><li class="song-time">'+v.time+'</li><div class="song-share"><ul><li class="love"></li><li class="share"></li><li class="collect"></li><li class="delete" style="margin-right:0"></li></ul></div></ul>').appendTo('.play-list .music-list');
		
	})
	var currentIndex;

	$('.song-list').on('click',function(){
		currentIndex=parseInt($(this).attr('data-id'));
		audio.src=musics[currentIndex].src;
		audio.play();
	});
	$('.jiantou .left-jian').on('click',function(){
		
		if(currentIndex==undefined){
			currentIndex=0
		}
		currentIndex+=1;
		if(currentIndex>=musics.length){
			currentIndex=0;
		}
		
		audio.src=musics[currentIndex].src;
		audio.play();
	})

	$('.right-jian').on('click',function(){
		
		if(currentIndex==undefined){
			currentIndex=0
		}
		currentIndex-=1;
		if(currentIndex<0){
			currentIndex=musics.length-1;
		}
		
		audio.src=musics[currentIndex].src;
		audio.play();
	})


	$('.number').text(musics.length);
	


	// 暂停点击事件
	$('.middle-jian').on('click',function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
	// 播放时，添加播放图片的类
	$audio.on('play',function(){
		$('.middle-jian').addClass('bofang');
		$('.song-list').removeClass('bs').eq(currentIndex).addClass('bs');
		var huan=musics[currentIndex]
		$('.songName').text(huan.name);
		$('.songAuthor').text(huan.author);
		$('.songTime').text(huan.time);
	})
	// 暂停时移除类
	$audio.on('pause',function(){
		$('.middle-jian').removeClass('bofang')
	})



	// 音量
	$('.line').on('click',function(e){
		audio.volume=e.offsetX/$(this).width();
	})
	$(audio).on('volumechange',function(){
		if(audio.volume===0){
			$('.volume').addClass('closeyl')
		}else{
			$('.volume').removeClass('closeyl')
		}
		var w=audio.volume*$('.line').width();
		$('.line1').width(w);
		$('.ball').css({left:w});
	})
	$('.ball').on('click',function(e){
		e.stopPropagation()
	})
	$('.volume').on('click',function(){
		$('.volume').toggleClass('closeyl');
		if($('.volume').hasClass('closeyl')){
			$('.line').attr('zhi',audio.volume);
			audio.volume=0;
		}else{
			audio.volume=$('.line').attr('zhi');
		}
	})


	$('.ball').on('mousedown',function(e){
		e.stopPropagation()
		$(document).on('mousemove',function(e){
			$('.line1').addClass('line2');
			$('.ball').addClass('ball1')
			var l=e.pageX-$('.line').offset().left;
			var v=l/$('.line').width();
			v=(v>1)?1:v;
			v=(v<0)?0:v;
			audio.volume=v;
		})
	})


	$(document).on('mouseup',function(){
		$(this).off('mousemove');
		$('line1').removeClass('line2')
	})

})

// 进度条
$(function(){
	var audio=$('#audio').get(0);
	var $audio=$('#audio');
	$audio.on('timeupdate',function(){
		
		var w=(audio.currentTime/audio.duration)*$('.gequjindu').width();
		$('.jindutiao').width(w);
		$('.jindudian').css({left:w});
	})	
	
	$('.gequjindu').on('click',function(e){

		audio.currentTime=e.offsetX/$(this).width()*audio.duration
		
	})
	$('.jindudian').on('click',function(e){
		e.stopPropagation();
	})
	$('.jindudian').on('mousemove',function(e){
		e.stopPropagation();
	})

	$('.jindudian').on('mousedown',function(){
		var left=$('.gequjindu').offset().left;
		$(document).on('mousemove',function(e){
			audio.currentTime=(e.pageX-left)/$('.gequjindu').width()*audio.duration
		})
	})
	$('.jindudian').on('mouseup',function(){
		$(document).off('mousemove')
	})

	$('.gequjindu').on('mousemove',function(e){
		$('.jindutishi').css({
			display:'block',
			left:e.offsetX-$('.jindutishi').width()/2
		})
		var time=e.offsetX/$(this).width()*audio.duration;
		var min=parseInt(time/60);
		var second=parseInt(time%60);
		min=min<10?'0'+min:min;
		second=second<10?'0'+second:second;
		$('.jindutishi').html(min+':'+second);	
	})
	
	$('.gequjindu').on('mouseout',function(){
		$('.jindutishi').css({
			display:'none'
		})
	})

})

// 进度条结束

