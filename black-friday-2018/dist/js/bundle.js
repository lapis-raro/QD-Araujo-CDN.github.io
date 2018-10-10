$('.carousel-slider-banner').slick({
  autoplay: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplaySpeed: 7000,
});

var nextYear = moment.tz("2018-11-30 00:00", "America/Sao_Paulo");

$('#black-friday-time').countdown(nextYear.toDate(), function(event) {
  var $this = $(this).html(event.strftime(''
    + '<span>%d</span> Dias '
    + '<span>%H</span> Horas '
    + '<span>%M</span> Minutos '
    + '<span>%S</span> Segundos'));
});