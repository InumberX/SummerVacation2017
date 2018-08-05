// メニューの位置
var _th = 0;
// SPウィンドウサイズ
var isSp = 767;

$(function () {
    
    /*------------------------------------------
    user agent
    --------------------------------------------*/
    var ua = navigator.userAgent;
    var bw = window.navigator.userAgent.toLowerCase();
    
    if($('body').hasClass('pcview')){
    } else {
        /* iOSスマホ */
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 ){
            $('body').addClass('sp-vis ios');
        } else if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
            /* Androidスマホ */
            $('body').addClass('sp-vis');
            // Android標準ブラウザかつAndroidバージョンが4以下の場合
            if(isAndDefaultBrowser()==true && androidVersion() <= 4) {
                $('body').addClass('ad-df');
            } else {
                $('body').addClass('ad-ot');
            }
        } else if (ua.indexOf("windows") != -1 && ua.indexOf("phone") != -1){
            /* windows Phone */
            $('body').addClass('sp-vis winp');
        } else if (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || (ua.indexOf("windows") != -1 && ua.indexOf("touch") != -1) || ua.indexOf('A1_07') > 0 || ua.indexOf('SC-01C') > 0){
            /* タブレット */
            $('body').addClass('tab');
            var metalist = document.getElementsByTagName('meta');
            for(var i = 0; i < metalist.length; i++) {
                var name = metalist[i].getAttribute('name');
                if(name && name.toLowerCase() === 'viewport') {
                    metalist[i].setAttribute('content','width=1000');
                    break;
                }
            }
        } else if (bw.indexOf('msie') != -1 || bw.indexOf('trident') >= 0) {
            //IEの処理
            $('body').addClass('ie pc-vis');
            //IE6-7
            if (bw.indexOf("msie 7.") != -1 || bw.indexOf("msie 6.") != -1) {
                $('body').addClass('ie7');
            } else if (bw.indexOf("msie 8.") != -1) {
                //IE8
                $('body').addClass('ie8');
            } else if (bw.indexOf("msie 9.") != -1) {
                //IE9
                $('body').addClass('ie9');
            } else if (bw.indexOf("msie 10.") != -1) {
                //IE10
                $('body').addClass('ie10');
            }
        } else {
            $('body').addClass('pc-vis');
        }
        //webkit系
        if (bw.indexOf('chrome') != -1 || bw.indexOf('safari') != -1) {
            $('body').addClass('webkit');
        }
    }
    
    /* Android 標準ブラウザ */
    function isAndDefaultBrowser(){
        var ua=window.navigator.userAgent.toLowerCase();
        if(ua.indexOf('linux; u;')>0){
            return true;
        }else{
            return false;
        }
    }
    
    /* Android バージョン判定(不要なら削除) */
    function androidVersion() {
        var ua = navigator.userAgent;
        if( ua.indexOf("Android") > 0 ) {
            var version = parseFloat(
                ua.slice(ua.indexOf("Android")+8));
            return version;
        }
    }
    
    /*------------------------------------------
    リサイズ（レスポンシブ用）
    --------------------------------------------*/
    var winW = $(window).width();
    var rs_point = 767;
    $(window).resize(function(){
        var rszW = $(window).width();
        if(rszW != winW){
            if(rszW > rs_point) {
                $('.header-menu-box, .smenu ul, .overlay').attr('style','');
                $('.smenu > a').off();
                $('body').removeClass('m-op');
            }
        }
    });
    
    /*------------------------------------------
      スマホメニュー
    --------------------------------------------*/
    var _st = 0;
    var _speed  = 300;
    var _navW   = '-100%';
    var _navW2   = '0%'; //余白
    
    $('.wrap-all').on('click','.sp-menu-btn, .overlay',function(){
        if( $('body').hasClass('m-op') ){
            $('body').removeClass('m-op').css('top','');
            $('.header-menu-box').animate({right:_navW},_speed,'swing');
            $('.overlay').fadeOut(_speed);
            $(window).scrollTop(_st);
        } else {
            _st = $(window).scrollTop();
            $('body').addClass('m-op').css('top',(-_st)+'px');
            if(!$('.overlay').length){
                $('.wrap-all').prepend('<div class="overlay"></div>');
            }
            $('.header-menu-box').animate({right:_navW2},_speed,'swing');
            $('.overlay').fadeIn(_speed);
            //サブメニュー
            $('.smenu > a').off().on('click',function(){
                $('.smenu ul').hide();
                $(this).siblings('ul').slideToggle();
                return false;
            });
        }
    });
    
    /*------------------------------------------
    smoothScroll
    --------------------------------------------*/
    $('a[href^="#"]').click(function() {
        // ウィンドウのサイズを取得
        var winWSize = $(window).width();
        // ウィンドウサイズが767px未満かつメニューが開いていた場合
        if (winWSize <= isSp && $('body').hasClass('m-op')) {
            $('body').removeClass('m-op').css('top','');
            $('.header-menu-box').animate({right:_navW},_speed,'swing');
            $('.overlay').fadeOut(_speed);
            $(window).scrollTop(_st);
        }
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        setScrollAction(target.offset().top);
    });
    
    /*------------------------------------------
    年号
    --------------------------------------------*/
    // 現在年取得
    var nowYear = new Date().getFullYear();
    
    // footerのコピーライトを上書き
    $('footer .c-year').text(nowYear);
    
    /*------------------------------------------
    アコーディオン
    --------------------------------------------*/
    $('.acd-box').each(function() {
        var acdHead = $(this).find('.acd-head');
        if($(acdHead).hasClass('type-btn')) {
            $(acdHead).on('click', '.acd-btn', function() {
                // アコーディオンが閉じていた場合
                if(!$(acdHead).hasClass('on')) {
                    // ウィンドウサイズが767px未満
                    if ($(window).width() <= isSp) {
                        setScrollAction($(acdHead).offset().top);
                    } else {
                        setScrollAction($(acdHead).offset().top - 60);
                    }
                    openAccordion($(acdHead), $(acdHead).siblings('.acd-body'));
                } else {
                    // アコーディオンが開いていた場合
                    closeAccordion($(acdHead), $(acdHead).siblings('.acd-body'));
                }
            });
        }
    });

    /*------------------------------------------
    ページトップ
    --------------------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#PAGE_TOP').addClass('f-fixed').fadeIn('slow');
            var docHeight = $(document).height();
            var dispHeight = $(window).height();
            var footerHeight = 55 * 2;
            if($(this).scrollTop() > docHeight - dispHeight - footerHeight){
                $('#PAGE_TOP').addClass('bottom');
            } else {
                $('#PAGE_TOP').removeClass('bottom');
            }
        } else if ($(this).scrollTop() < 80) {
            $('#PAGE_TOP').fadeOut('slow', function() {
                $('#PAGE_TOP').removeClass('f-fixed');
            });
        }
    });
    $('#PAGE_TOP a').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 'slow');
        return false;
    });

    /*------------------------------------------
    Slick
    --------------------------------------------*/
    var slickElm = $('.aw-slick');
    slickElm.each(function() {
        $(this).slick({
            // ドットナビゲーションを表示するか [初期値:false]
            dots: true,
            // 画像の遅延表示タイプ（ondemand/progressive) [初期値:'ondemand']
            lazyLoad: 'ondemand'
        });
    });

    /*------------------------------------------
    Lazy Load
    --------------------------------------------*/
    $(window).scroll(function (){
        $('.aw-lazy').each(function(){
            if(!$(this).hasClass('aw-lazy-init')) {
                var thisElm = $(this);
                var elemPos = thisElm.offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > elemPos - windowHeight + 40){
                    var imgElm = thisElm.find('img.aw-lazy-img');
                    imgElm.each(function(idx) {
                        $(this).attr('src', $(this).attr('data-original'));
                        if(idx == imgElm.length - 1 && thisElm.find('.aw-slick').length) {
                            thisElm.find('.aw-slick').slick('setPosition');
                        }
                    });
                    thisElm.addClass('aw-lazy-init');
                }
            }
        });
    });
    
});

$(window).on('load', function() {
});

// スクロールを行う処理
function setScrollAction(position) {
    // スクロール速度
    var speed = 300;
    // スクロールを実行
    $('body,html').animate({scrollTop:position}, speed, 'swing');
}

// アコーディオンを開く処理
function openAccordion(acdHead, acdBody) {
    $(acdHead).addClass('on');
    $(acdBody).addClass('open').slideDown('slow');
}

// アコーディオンを閉じる処理
function closeAccordion(acdHead, acdBody) {
    $(acdHead).removeClass('on');
    $(acdBody).removeClass('open').slideUp('slow');
}
