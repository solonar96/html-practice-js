$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow-left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow-right.svg"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 575,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: {
                    required: true,
                    minlength: 10
                  },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, укажите своё имя",
                    minlength: jQuery.validator.format("Нужно ввести {0} символа или более!")
                  },
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    minlength: jQuery.validator.format("Нужно ввести {0} символов и более!")
                  },
                email: {
                    required: "Пожалуйста, укажите свою почту",
                    email: "Неверно указан адрес почты"
                }
            }
        });
    }

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1080) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // $("a[href^='#']").click(function() {
    //     const _href = $(this).attr("href");
    //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    // });

    $("a[href^='#']a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          const hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
    });

    new WOW().init();
});
  