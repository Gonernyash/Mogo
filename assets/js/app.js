$(function () {

    //Data

    const header = $('#header'),
        introH = $('#intro').innerHeight(),
        windowH = document.documentElement.scrollHeight;

    let scrollOffset = $(window).scrollTop();
    let isNavToggleClick = false;

    const checkTopOffset = function (topOffset) {

        if (topOffset >= introH) {
            header.addClass('header--fixed')
        } else {
            header.removeClass('header--fixed');
            $('[data-scroll]').removeClass('active');
        }

    };

    const navToggleHide = function () {

       if ($('#nav-toggle').hasClass('nav-toggle--active')) $('#nav').animate({
            width: '0'
        }, 200);

        $('#nav-toggle-bo').removeClass('nav-toggle--active');
        $('#nav-toggle').removeClass('nav-toggle--active');
        checkTopOffset(scrollOffset);



        isNavToggleClick = false;

    };

    const menuActItemSet = function (Item) {

        let menuItem = $('[data-scroll="'+ Item +'"]');

        $('#nav a').removeClass('active');
        $(menuItem).addClass('active');

    };

    const getDocHeight = function() {
        const D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    };


    //Fixed Header

    checkTopOffset(scrollOffset);

    $(window).on("scroll", function () {

        scrollOffset = $(this).scrollTop();

        if (isNavToggleClick === false) checkTopOffset(scrollOffset);

    });

    //Smart menu items

    let aboutOffset, serviceOffset, workOffset, blogOffset, contactOffset;

    $(window).on('load', function () {

            aboutOffset = $('#about').offset().top;
            serviceOffset = $('#services').offset().top;
            workOffset = $('#work').offset().top;
            blogOffset = $('#blog').offset().top;
            contactOffset = $('#map').offset().top;

    });


    $(window).on('scroll', function() {

        scrollOffset++;

        if (scrollOffset >= aboutOffset) menuActItemSet('#about');
        if (scrollOffset >= serviceOffset) menuActItemSet('#services');
        if (scrollOffset >= workOffset) menuActItemSet('#work');
        if (scrollOffset >= blogOffset) menuActItemSet('#blog');
        if (scrollOffset + $(window).height() - 1 === getDocHeight()) menuActItemSet('#map');

    });


    //Smooth scroll

    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        let blockId = $(this).data("scroll"),
            blockOffset = $(blockId).offset().top;

        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);

        navToggleHide();
    });


    //Menu Nav-toggle

    $('#nav-toggle').on('click', function(event) {

        event.preventDefault();

        if (isNavToggleClick === false) {

            $('#nav-toggle-bo').addClass('nav-toggle--active');
            $('#nav-toggle').addClass('nav-toggle--active');
            header.addClass('header--fixed');
            isNavToggleClick = true;

            $('#nav').animate({
                width: '70%'
            }, 200);


        } else navToggleHide();



    });

    $('#nav-toggle-bo').on('click', function(event) {

        event.preventDefault();

        navToggleHide();
    });


    $('#nav').draggable = true;


    //Slider

    $('[data-slider]').on('click', function (event) {

        event.preventDefault();

        let blockId = $(this).data('slider');

        $('[data-slider]').removeClass('active');
        $(this).addClass('active');

        $("[data-slick_slider]").slick('slickGoTo', blockId);

    });


    //Collapse

    $("[data-collapse]").on("click", function(event) {

        event.preventDefault();

        $("[data-collapse]").removeClass('active');
        $(this).addClass('active');
    });

    //Carousel slider in quotes

    $("[data-carousel]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<img src="assets/img/service/arrow.png" class="arrow slick-prev"></img>',
        nextArrow: '<img src="assets/img/service/arrow.png" class="arrow slick-next"></img>'
    });


    //Carousel slider in intro

    $("[data-slick_slider]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    });

    $("[data-slick_slider]").on('afterChange', function (event, slick, currentSlide) {
        event.preventDefault();

        let sliderAct = ($('[data-slider="'+currentSlide+'"]'));

        $('[data-slider]').removeClass('active');

        sliderAct.addClass('active');

    })


});