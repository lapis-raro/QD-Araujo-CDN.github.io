$('.carousel-slider-banner').slick({
  autoplay: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplaySpeed: 7000,
});



// Definir a data em que estamos contando para baixo
var countDownDate = new Date("Nov 30, 2018 00:00:00").getTime();

// Atualize a contagem a cada 1 segundo
var x = setInterval(function() {

  // Pega a data e a hora de hoje
  var now = new Date().getTime();

  // Encontra a distância entre agora e a data da contagem regressiva
  var distance = countDownDate - now;

  // Cálculos de tempo para dias, horas, minutos e segundos
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Exibe o resultado no elemento com id = "black-friday-time"
  document.querySelector("#black-friday-time").innerHTML ="<div> <span class='days'>" + days + "</span>" + "<div class='smalltext'> Dia(s) </div> </div> " + "<div> <span class='hours'>" + hours + "</span>" + "<div class='smalltext'> Hora(s) </div> </div>" + "<div> <span class='minutes'>" + minutes + "</span>" + "<div class='smalltext'> Minuto(s) </div> </div>" + "<div> <span class='seconds'>" + seconds + "</span>" + "<div class='smalltext'> Segundo(s) </div> </div>";

  // Se a contagem regressiva terminar, escreva algum texto
  if (distance < 0) {
    clearInterval(x);
    document.querySelector("#black-friday-time").innerHTML = "Expirado";
  }
}, 1000);