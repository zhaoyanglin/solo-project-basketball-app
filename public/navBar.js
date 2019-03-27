$(document).ready(function () {
    let tabs = $('.tabs');
    let items = $('.tabs').find('a').length;
    let selector = $(".tabs").find(".selector");
    let activeItem = tabs.find('.active');
    let activeWidth = activeItem.innerWidth();
    $(".selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px"
    });

    $(".tabs").on("click", "a", function (e) {
        $('.tabs a').removeClass("active");
        $(this).addClass('active');
        let activeWidth = $(this).innerWidth();
        let itemPos = $(this).position();
        $(".selector").css({
            "left": itemPos.left + "px",
            "width": activeWidth + "px"
        });
    }); 
})
