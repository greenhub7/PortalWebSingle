
$(document).ready(function () {

    $('.feature-icon').hover(
        function () {
            $(this).addClass('animated');
        },
        function () {
            $(this).removeClass('animated');
        }
    );

    
    $('#contactForm').on('submit', function (e) {
        
        

        
        if (!$('#source').length) {
            $(this).append('<input type="hidden" id="source" name="source" value="solmed">');
        }
    });

    
    if ($('.stat-counter').length) {
        $('.stat-counter').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    
    $('a[href="#"]').attr('role', 'button');
    $('.feature-card').attr('aria-label', 'Característica');
});