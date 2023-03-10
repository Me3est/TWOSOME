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
        history.scrollRestoration = "manual";
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
        // 헤더 스크롤
        $(window).scroll(function() {
            let s_top = $(window).scrollTop();
            if(s_top > 0) {
                $('.h_menu > ul').css({color:'black'});
                $('.header .logo').css({
                    background: 'url(../img/logo_black.svg)'
                })
                $('.h_sns').css({
                    background: 'url(../img/ico_24_allmenu_black.svg)'
                })
                header.mouseleave(function() {
                    header.css({
                        backgroundColor: 'inherit',
                        transition: 'background 0.5s',
                        boxShadow: '0px 0px 0px #00000029',
                    })
                    $('.h_menu > ul').css({color:'black'})
                })
                
            }
            else if(s_top == 0) {
                $('.header').css({
                    backgroundColor: 'inherit',
                    transition: 'background 0.2s',
                    boxShadow: '0px 0px 0px #00000029'
                })
                $('.h_menu > ul').css({color:'white'});
                $('.header .logo').css({
                    background: 'url(../img/logo_white.svg)'
                })
                $('.h_sns').css({
                    background: 'url(../img/ico_24_allmenu_white.svg)'
                })
                header.mouseleave(function() {
                    header.css({
                        backgroundColor: 'inherit',
                        transition: 'background 0.5s',
                        boxShadow: '0px 0px 0px #00000029',
                    })
                    $('.h_menu > ul').css({color:'white'})
                })
            }

            if(s_top >= $('#sec2').offset().top) {
                $('.top').animate({
                    height:'67px',
                }, 200)
            }
            if(s_top == $('#sec1').offset().top) {
                $('.top').animate({
                    height:'0px',
                }, 200)
            }
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
            $('.banner_num').text(`${oidx+1} / 2`)
        }
        $('.banner_num').text("1 / 2")
        // sec2
        // $('.sec2_slide').eq(0).addClass('block')
        $('.txt').eq(0).css({display:'block'})
        $('.title').eq(0).css({color:'#000'})
        for(let i=0; i<3; i++) {
            $('.sec2_cate').eq(i).click(function() {
                $('.title').css({
                    color:'#999'
                })
                $('.title').eq(i).css({
                    color:'#000'
                })
                $('.txt').css({display:'none'})
                $('.txt').eq(i).css({display:'block'})
                $('.sec2_slide').css({display:'none'})
                $('.sec2_slide').eq(i).css({display:'block'})
            })
        }
        // sec4
        let sec4_banner = $('.sec4_banner');
        let idx = 0;
        sec4_banner.eq(0).css({left:0})
        $('.r_btn').click(function() {
            slide2(idx%4, '-100%', (idx+1)%4, '100%', idx+=1)
            
        })
        $('.l_btn').click(function() {
            slide2(idx%4, '100%', (idx-1)%4, '-100%', idx+=1)
        })
        function slide2(cidx, c_pos, oidx, o_pos, next_idx) {
            //나갈판
            sec4_banner.eq(cidx).animate({
                left:c_pos
            }, 400)
            sec4_banner.eq(oidx).css({left:o_pos})
            sec4_banner.eq(oidx).animate({
                left:'0'
            }, 400)
            next_idx;

            //인디케이터
            $('.sec4_banner_num').text(`${oidx+1} / 4`)
        }
        $('.sec4_banner_num').text("1 / 4")
  })