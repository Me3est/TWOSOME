// 원페이지 스크롤 이벤트
var scroll = function(){
    
    var $nav = null,
        $cnt = null,
        moveCnt = null,
        moveIndex = 0,
        moveCntTop = 0,
        winH = 0,
        time = false; // 새로 만든 변수
  
    $(document).ready(function(){
        init();
        initEvent();
    });
    
    var init = function(){
        $cnt = $(".section");
        $nav = $(".indicator a");
    };
    
    var initEvent = function(){
        $("html ,body").scrollTop(0);
        winResize();
        $(window).resize(function(){
            winResize();
        });
        $nav.on("click", function(){
            moveIndex = $(this).parent("li").index();
            moving(moveIndex);
            return false;
        });
        $cnt.on("mousewheel", function(e){
            if(time === false){ // time 변수가 펄스일때만 휠 이벤트 실행
              wheel(e);
            }
        });
    };
        
    var winResize = function(){
        winH = $(window).height();
        $cnt.height(winH);
        $("html ,body").scrollTop(moveIndex.scrollTop);
    };
    
    var wheel = function(e){
        if(e.originalEvent.wheelDelta < 0){
            if(moveIndex < 6){
                moveIndex += 1;
                moving(moveIndex);
            };
        }else{
            if(moveIndex > 0){
                moveIndex -= 1;
                moving(moveIndex);
            };
        };
    };
    
    var moving = function(index){
        time = true // 휠 이벤트가 실행 동시에 true로 변경
        moveCnt = $cnt.eq(index);
        moveCntTop = moveCnt.offset().top;
        $("html ,body").stop().animate({
            scrollTop: moveCntTop
        }, 700, function(){
          time = false; // 휠 이벤트가 끝나면 false로 변경
        });
        $nav.parent("li").eq(index).addClass("indi_active").siblings().removeClass("indi_active");
    };
    
  };
  scroll();

  $(document).ready(function() {
        // history.scrollRestoration = "manual";
        // header
        let header = $('.header');
        let cate = $('.h_menu');
        let hover = $('.hover_menu')
        header.mouseenter(function() {
            header.css({
                backgroundColor: '#fff',
                transition: 'background 0.5s',
                boxShadow: '0px 0px 4px #00000029',
            })
            $('.h_menu > ul').css({color:'black'})
        })
        cate.mouseenter(function() {
            $('.hover_menu').css({display:'block'})
            header.stop().animate({
                height:'380px'
            },400)
            $('.hover_menu').stop().slideDown("slow")
        })
        header.mouseleave(function() {
            header.css({
                backgroundColor: 'inherit',
                transition: 'background 0.2s',
                boxShadow: '0px 0px 0px #00000029'
            })
            $('.h_menu > ul').css({color:'white'})
            header.animate({
                height:'105px',
            }, 300)
            $('.hover_menu').stop().slideUp("fast");
        })
        // sec1
        let banner = $('.banner');
        let index = 0;
        banner.eq(0).css({left:0})
        $('#r_btn').click(function() {
            slide(index%2, '-100%', (index+1)%2, '100%', index+=1)
        })
        $('#l_btn').click(function() {
            slide(index%2, '100%', (index-1)%2, '-100%', index+=1)
        })
        function slide(cidx, c_pos, oidx, o_pos, next_idx) {
            //나갈판
            banner.eq(cidx).animate({
                left:c_pos
            }, 400)
            banner.eq(oidx).css({left:o_pos})
            banner.eq(oidx).animate({
                left:'0'
            }, 400)
            next_idx;

            //인디케이터
            $('.banner_num').innerText="11"
        }
  })