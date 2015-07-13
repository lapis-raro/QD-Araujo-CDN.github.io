// Variável para checar o CDN
var _QD_cdn_check_vacsim = true;

$(document).ready(function(){
	var map,
	locations = [                  

	[-19.915654, -43.940423,'Araujo Matriz - Centro - Rua Curitiba, 327<hr>Todos os dias, das 8h às 20h, inclusive feriados.'],
	[-19.932537, -43.956683,'Araujo Gutierrez – Gutierrez – Rua André Cavalcanti, 222<hr>Todos os dias, das 8h às 20h, inclusive feriados.'],
	[-19.935383, -43.931226,'Araujo Centenário – Funcionários – Av. Getúlio Vargas, 840<hr>Todos os dias, das 8h às 20h, inclusive feriados.'],
	[-19.886905, -43.929193,'Araujo Cristiano Machado – Cidade Nova – Av. Cristiano Machado, 2.400<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.968386, -43.964553,'Araujo Estoril – Estoril – Av. Professor Mário Werneck, 1.340<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.939905, -43.934592,'Araujo Savassi – Funcionários – Av. do Contorno, 6.115<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.843573, -43.971408,'Araujo Portugal – Jardim Atlântico – Av. Portugal, 2.841<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.949079, -43.920340,'Araujo Praça da Bandeira – Mangabeiras – Praça da Bandeira, 180<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.914718, -43.973432,'Araujo Padre Eustáquio – Padre Eustáquio – Rua Padre Eustáquio, 2.208<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.915057, -44.082383,'Araujo Gil Diniz – Nossa Senhora do Carmo – Av. Prefeito Gil Diniz, 777 - Contagem<hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.877882, -43.9965633,'Araujo Miguel Perrela - Castelo – Av. Miguel Perrela, 530 - <strong>Belo Horizonte</strong><hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.'],
	[-19.464351, -44.248767,'Araujo Sete Lagoas - Centro - Praça Alexandre Lanza, 141 - <strong>Sete Lagoas</strong><hr>De segunda a sexta, das 9h às 18h e aos sábados das 9h às 13h, exceto feriados.']
	];
	var myOptions = {
		zoom: 9,
                  center: new google.maps.LatLng( -19.640050, -44.061689),//locations[0][0], locations[0][1]
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  scrollwheel:false
              };
              var image = '/arquivos/marker.png';
              map = new google.maps.Map($('#map')[0], myOptions);
              var infowindow = new google.maps.InfoWindow({maxWidth:250}), marker, i;
              for (i = 0; i < locations.length; i++) {  
              	marker = new google.maps.Marker({
              		position: new google.maps.LatLng(locations[i][0], locations[i][1]),
              		map: map,
              		icon: image

              	});

              	google.maps.event.addListener(marker, 'click', (function(marker, i) {
              		return function() {
              			infowindow.setContent(locations[i][2]);
              			infowindow.open(map, marker);
              			map.setCenter(marker.getPosition());
              		}
              	})(marker, i));


              	google.maps.event.addListener(infowindow, 'domready', function() {

                        // ReferÃªncia ao DIV que agrupa o fundo da infowindow
                        var iwOuter = $('.gm-style-iw');

                        /* Uma vez que o div pretendido estÃ¡ numa posiÃ§Ã£o anterior ao div .gm-style-iw.
                        * Recorremos ao jQuery e criamos uma variÃ¡vel iwBackground,
                        * e aproveitamos a referÃªncia jÃ¡ existente do .gm-style-iw para obter o div anterior com .prev().
                        */
                        var iwBackground = iwOuter.prev();

                        // Remover o div da sombra do fundo
                        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

                        // Remover o div de fundo branco
                        iwBackground.children(':nth-child(4)').css({'display' : 'none'});

                        // Desloca a infowindow 115px para a direita
                        //iwOuter.parent().parent().css({left: '115px'});

                        // Desloca a sombra da seta a 76px da margem esquerda 
                        //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

                        // Desloca a seta a 76px da margem esquerda 
                        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'background-color:#ed2b33 !important; color:#ed2b33 !important; border-color:#ed2b33 !important'});

                        // Altera a cor desejada para a sombra da cauda
                        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1', "color" : "#ed2b33", "background-color" : "#ed2b33", "border-color" : "#ed2b33"});

                        // ReferÃªncia ao DIV que agrupa os elementos do botÃ£o fechar
                        var iwCloseBtn = iwOuter.next();

                        // Aplica o efeito desejado ao botÃ£o fechar
                        iwCloseBtn.css({opacity: '0', right: '38px', top: '3px', border: '7px solid #ed2b33', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' , "display" : "none"});

                        // Se o conteÃºdo da infowindow nÃ£o ultrapassar a altura mÃ¡xima definida, entÃ£o o gradiente Ã© removido.
                        if($('.iw-content').height() < 140){
                        	$('.iw-bottom-gradient').css({display: 'none'});
                        }

                        // A API aplica automaticamente 0.7 de opacidade ao botÃ£o apÃ³s o evento mouseout. Esta funÃ§Ã£o reverte esse evento para o valor desejado.
                        iwCloseBtn.mouseout(function(){
                        	$(this).css({opacity: '1'});
                        });
                    });



}

});


