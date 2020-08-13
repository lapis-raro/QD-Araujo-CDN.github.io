$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        items: 4,
        dots: false,
        navText : ["<img src='assets/images/esquerda.png' alt='Araujo Manipulação' class='img-fluid'>", "<img src='assets/images/direita.png' alt='Araujo Manipulação' class='img-fluid'>"],
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            550:{
                items:2,
            },
            770:{
                items:3,
            },
            992:{
                items:4,
            }
        }
    })

    var width = $(window).width();

    if (width <= 768){
        $( ".seta" ).removeClass("rotate");        
        $( ".aba" ).removeClass("show");        
    };

    $('.btn-aba').click(function(){
        $(this).children(".seta").toggleClass("rotate");
    });
});