/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();


// Variável para checar o CDN
var _QD_cdn_check = true;

try {
	var Common = {
		run: function() {
			Common.isVtexMobile = (location.search || '').toLowerCase().indexOf('uam=true') > -1 || ($.cookie('ISSMB') || '').indexOf('UserAcceptMobile=True') > -1;

			Common.ajaxLoaderBody();
			Common.qdSetUtmCookie();
		},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.tbWindowExtend();
			Common.bannersCount();
			Common.userAuth();
			Common.amazingMenu();
			Common.footerStructure();
			Common.footerStoreLocator();
			Common.setScrollToggle();
			Common.buyInShelf();
			Common.modalBackdropFix();
			Common.newsletter();
			Common.collection2Banner.main();

			if (!$(document.body).is('.giftlist-shelf')){
				Common.collection2Banner.shelfFlag();
				Common.collection2Banner.coresPrateleiraCallback();
			}
			Common.coresPrateleira();

			Common.divBackBgBlackFriday();
			Common.modalResetClass(true);

			if(Common.isVtexMobile){
				Common.qdAmazingMenuMobile();
				Common.qdScrollTopMobile();
				Common.mblSmartCart();
				Common.headerAmazingMenuMBL();
			}
			else
				Common.desktopSmartCart();

			if (!$(document.body).is('.home-m')) {
				// Common.callNewsLetterFloating();
				// Common.callNewsLetterCloseSite();
				Common.returnToTop();
			}

			if(jsnomeLoja == "araujomedicamentos") { // Loja Medicamentos Especiais
				Common.callSmartCart();
				Common.searchText();
				Common.priceCentsSplit();
				Common.talkToPharmacist();
			}
			else
				Common.smartCart();

			// Common.insertSkinComponents();
		},
		ajaxStop: function() {
			Common.coresPrateleira();
			Common.collection2Banner.main();
		},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		callSmartCart: function() {
			if(typeof window.QD_smartCartAllowBuy === "undefined")
				window.QD_smartCartAllowBuy = true;

			$('.header-qd-v2-mini-cart').simpleCart();

			var wrapper = $('.qd-sc-wrapper');

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					forceImageHTTPS: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function(data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function() {
						wrapper.find(".qd-ddc-prodQtt").each(function() {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				},
				buyButton: {
					buyButton: ".product-qd-v1-sku-selection .buy-button",
					productPageCallback: function(jqXHR, textStatus, prodLink) {
						if (!$("body").is(".productQuickView")) return;

						if (textStatus !== "success") {
							alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho.");
							(typeof parent === "object" ? parent : document).location.href = prodLink;
						}
					},
					allowBuyClick: function() {
						return window.QD_smartCartAllowBuy;
					}
				}
			});

			$(".header-qd-v2-cart-link").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		insertSkinComponents: function() {
			var el = $('.home-slider-qd-v1-full');
			if(!el.length)
				el = $('.floating-top-bar');
			var leftHref = '//busca.araujo.com.br/hotsite/generico';
			var rightHref = '//busca.araujo.com.br/hotsite/generico';
			$('<div class="skin-qd-v1-extra-banners"> <div class="container"> <a class="skin-qd-v1-left-banner" href="' + leftHref + '"></a> <a class="skin-qd-v1-right-banner" href="' + rightHref + '"></a> </div></div>').insertAfter(el);
		},
		priceCentsSplit: function() {
			var prices = $('.shelf-qd-v2-new-price:not(.qd-separe)');
			if(prices.length == 0)
				return;

			prices.addClass("qd-separe").each(function(){
				$t = $(this);
				$t.html($t.html().replace(/R\$/g, '<span class="qd-coin">R$</span>').replace(/,/g, '<span class="qd-cents">,').replace(/<\/strong>/g, '</span>'));
			});
		},
		talkToPharmacist: function() {
			var box = $('<div class="pharmacist-qd-v1-box"> <div class="pharmacist-qd-v1-img"> <img src="/arquivos/pharmacist-qd-v1-icon-1.png" alt="Fale com um farmacêutico on-line" /> </div> <div class="pharmacist-qd-v1-content"> <p> Fale com um <br /> farmacêutico <br /> on-line </p> </div> </div>');
			var modal = $('.modal:first').clone().appendTo(document.body).addClass('pharmacist-qd-v1-modal').removeClass('qd-common-modal');

			$(document.body).append(box);

			modal.find('.modal-body').append('<div class="pharmacist-qd-v1-modal-img"> <img src="/arquivos/pharmacist-qd-v1-icon-2.png" alt="" /> </div> <div class="pharmacist-qd-v1-modal-title"> <h3>Fale com um farmacêutico on-line</h3> <h4>Preencha o formulário a seguir e aguarde:</h4> </div> <div class="pharmacist-qd-v1-modal-form"> <form novalidate="1"> <input type="text" name="full_name" class="required" placeholder="Nome completo" /> <input type="text" name="tel" class="required" placeholder="Telefone" /> <input type="submit" value="Enviar" class="ENVIAR" /> </form> </div> <div class="pharmacist-qd-v1-modal-tel"> <p><span>ou ligue</span> 0300-3131010</p> </div>');
			
			box.click(function() {
				modal.modal();
			});

			var form = modal.find("form");
			form.find("[name=tel]").mask("(00) 0000-00009");

			form.validate({
				rules: {tel: {minlength: 14 } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					var submitWrapper = $form.find("[type=submit]").parent();
					submitWrapper.addClass("qd-loading");

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		newsletter: function() {
			var wrapper = $(".footer-newsletter");

			wrapper.find(".qd_news").QD_news({
				defaultEmail : "Seu e-mail",
				successCallback: function () {
					wrapper.addClass('floating-qd-v1-newsletter-finish');
				}
			});
		},
		searchText: function() {
			var input = $(".fulltext-search-box");

			input.val('Busque o seu medicamento especial');

			input.focus(function() {
				var $t = $(this);

				if ($t.val().toLowerCase() == 'busque o seu medicamento especial')
					$t.val('');
			});

			input.focusout(function() {
				var $t = $(this);

				if (!$t.val())
					$t.val('Busque o seu medicamento especial');
			});
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		modalBackdropFix: function() {
			$(document.body).on('click', '.modal-backdrop', function() {
				$('.modal').modal('hide');
			});
		},
		desktopSmartCart: function(){
			var wrapperCart = $('.header-smart-cart a[href="/checkout"]');
			wrapperCart.attr('title', 'Clique para visualizar o carrinho');

			wrapperCart.on('click', function(){
				$('.mbl-header-smart-cart .qd-sc-wrapper').show();

				$('.mbl-header-smart-cart').fadeIn(400, function(){
					$('body').addClass('modal-open');
				});

				$('.mbl-header-smart-cart .qd-sc-wrapper').animate({
					'right':'0'
				},600);
				return false;
			});

			var elem = $('.mbl-header-smart-cart, .mbl-header-smart-cart .qd-cartTitle h3');
			elem.on('click', function(evt){
				if (!$(evt.target).is(elem))
					return;

				$('.mbl-header-smart-cart').fadeOut(400, function(){
					$(document.body).removeClass('modal-open');
				});

				$('.mbl-header-smart-cart .qd-sc-wrapper').animate({
					'right':'-100%'
				},600, function(){
					$('.mbl-header-smart-cart, .mbl-header-smart-cart .qd-sc-wrapper').removeAttr('style').hide();
				});
			});
		},
		ajaxLoaderBody: function() {
			$(document).ajaxStart(function() {
				$(document.body).addClass('ajax-qd-v1-loading');
			}).ajaxStop(function() {
				$(document.body).removeClass('ajax-qd-v1-loading');
			});
		},
		modalResetClass: function() {
			$(".qd-common-modal").on("hidden.bs.modal", function(){
				$(this).attr("class", "modal fade qd-common-modal").find("modal-body").empty();
			});
		},
		isMobile: function() {
			if ($('#qd-mobile').length>0)
				return true;
			return false;
		},
		qdScrollTopMobile: function() {
			$(".footer-qd-v1-m-return-top").click(function() {
				$("html,body").animate({scrollTop: 0 }, "slow");
				return false;
			});
		},
		qdAmazingMenuMobile: function() {
			var wrapper = $(".header-qd-v1-m-amazing-menu-mobile .menu-departamento");

			$(".header-qd-v1-m-icon-menu").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".header-qd-v1-m-amazing-menu-close").click(function(){
				$("body").removeClass('qd-am-on');
			});

			$(document.body).on('swipeleft', function(evt, touch) {
				$(document.body).removeClass('qd-am-on');
			});

			$(".header-qd-v1-m-amazing-menu-mobile h3").click(function(evt) {
				var $t = $(this);
				$t.toggleClass('active-menu');
				$t.find("+ ul").stop(true, true).slideToggle();
				return false;
			});

			$(".home-qd-v1-amazing-menu > ul > li > a:not('.qd-am-item-link')").click(function(evt) {
				var $t = $(this);
				$t.parent().toggleClass('active-menu');
				$t.find("+ ul").stop(true, true).slideToggle();
				return false;
			});

			wrapper.children("h3.saude, h3.saude +ul").prependTo(wrapper);
			wrapper.children("h3.produtos-eroticos, h3.produtos-eroticos +ul").prependTo(wrapper);
			wrapper.children("h3.pet-shop, h3.pet-shop +ul").prependTo(wrapper);
			wrapper.children("h3.ortopedia, h3.ortopedia +ul").prependTo(wrapper);
			wrapper.children("h3.livraria, h3.livraria +ul").prependTo(wrapper);
			wrapper.children("h3.infantil, h3.infantil +ul").prependTo(wrapper);
			wrapper.children("h3.higiene-pessoal, h3.higiene-pessoal +ul").prependTo(wrapper);
			wrapper.children("h3.geriatrico, h3.geriatrico +ul").prependTo(wrapper);
			wrapper.children("h3.fitness, h3.fitness +ul").prependTo(wrapper);
			wrapper.children("h3.diet, h3.diet +ul").prependTo(wrapper);
			wrapper.children("h3.casa, h3.casa +ul").prependTo(wrapper);
			wrapper.children("h3.beleza, h3.beleza +ul").prependTo(wrapper);
			wrapper.children("h3.alimentos, h3.alimentos +ul").prependTo(wrapper);
			wrapper.children("h3.dermocosmeticos, h3.dermocosmeticos +ul").prependTo(wrapper);
			wrapper.children("h3.medicamentos-especiais, h3.medicamentos-especiais +ul").prependTo(wrapper);
			wrapper.children("h3.medicamentos, h3.medicamentos +ul").prependTo(wrapper);

			$('.header-qd-v1-m-amazing-menu-mobile ul').each(function() {
				var $t = $(this);

				$t.children('li:not(.lista-completa)').sort(function(a, b) {
					var x = $(a).children('a').text();
					var y = $(b).children('a').text();

					if(x > y)
						return 1;
					if(x < y)
						return -1;
					return 0;
				}).prependTo($t);
			});
		},
		divBackBgBlackFriday: function() {
			if (!$(document.body).is('.black-friday'))
					return;

			var wrapper = $(document.body);

			if (wrapper.find("> .container").length)
				var container = wrapper.find("> .container");

			if (wrapper.find("> .content-structure").length)
				var container = wrapper.find("> .content-structure > .container");


			$('<div class="bg-black-friday"> <div class="bg-black-friday-left"> <a href="/black-friday"></a> </div> <div class="bg-black-friday-right"> <a href="/black-friday"></a> </div> </div>').insertAfter(container);
		},
		qdSetUtmCookie: function() {
			try {
				var cookie = $.cookie("qdUtmObj");
				var utm = cookie? JSON.parse(cookie): {};

				var source = ((location.search || "").match(/utm_source=([^\&]+)/i) || [""]).pop().trim();
				if(source != "")
					utm["source"] = source;
				var medium = ((location.search || "").match(/utm_medium=([^\&]+)/i) || [""]).pop().trim();
				if(medium != "")
					utm["medium"] = medium;
				var campaign = ((location.search || "").match(/utm_campaign=([^\&]+)/i) || [""]).pop().trim();
				if(campaign != "")
					utm["campaign"] = campaign;

				if(utm.source && utm.source != "")
					$.cookie("qdUtmObj", JSON.stringify(utm), {path: "/"});
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		footerStoreLocator: function() {
			$(".footer-store-locator form").attr("action", "/lojas").find("input[name=cep]").mask('00000-000');
		},
		setIframeSize: function(size){
			$(".shelf-buy-button-modal iframe").height(size);
		},
		userAuth: function(){
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try{
						if(data.IsUserDefined){
							// logado
							$(".qd-header-auth").text("Sair da conta").attr("href", "/no-cache/user/logout");
							$(".qd-header-user-message").html('Bem-vindo ' + (data.FirstName ? data.FirstName + " " + (data.LastName || ""): data.Email) + '. &nbsp; &nbsp; ');
						}
						else{
							// Deslogado
							$(".qd-header-auth").text("Entrar").click(function(e) {
								e.preventDefault();
								vtexid.start();
							});

							$(".qd-header-user-message").html('Bem-vindo, <a href="#">fazer login.</a> &nbsp; &nbsp; ').find("a").click(function(e) {
								e.preventDefault();
								vtexid.start();
							});

							$(document.body).addClass('not-logged-user');
						}
					}
					catch (e) {if (typeof console !== "undefined" && typeof console.info === "function") console.info("Ops, algo saiu errado com o login.", e.message); }
				}
			});
		},
		footerStructure: function() {
			var elem = $(".footer-amazing-menu-institucional");
			elem.find(".qd-am-linha +ul").height(elem.height());
		},
		smartCart: function() {
			if(typeof window.QD_smartCartAllowBuy === "undefined")
				window.QD_smartCartAllowBuy = true;

			// CHAMANDO PLUGIN
			var smartCart = $.QD_smartCart({
				selector: ".qd-sc-wrapper",
				dropDown: {
					texts: {
						linkCart: "Finalizar Compra",
						linkCheckout: "Finalizar Compra",
						cartTotal: "Total: #value"
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-scrollDown").html('<i class="fa fa-angle-down"></i>');
						$(".qd-ddc-scrollUp").html('<i class="fa fa-angle-up"></i>');
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Produtos no seu carrinho</h3></div>');
					},
					callbackProductsList: function() {
						if(Common.isMobile()) {
							var qd_cart_auto = $('.qd-sc-wrapper .qd_cart_auto');
							qd_cart_auto.appendTo($('.qd-ddc-infoTotal'));

							$('.qd-ddc-prodImgWrapper img').each(function(){
								$t = $(this);
								$t.attr('src',$t.attr('src').replace('-55-55/','-75-75/'));
							});
						}
						$(".qd-ddc-remove").html('<i class="fa fa-close"></i>');
						$(".qd-ddc-quantityMinus").html('<i class="fa fa-minus-circle"></i>');
						$(".qd-ddc-quantityMore").html('<i class="fa fa-plus-circle"></i>');
					}
				},

				buyButton: {
					buyButton: ".product-sku-rich-selection .buy-button, .product-qd-v1-sku-rich-selection .buy-button",
					productPageCallback: function(jqXHR, textStatus, prodLink) {
						// Verificando se realmente é o quickview
						if (!$("body").is(".productQuickView")) return;

						if (textStatus !== "success") {
							alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho.");
							(typeof parent === "object" ? parent : document).location.href = prodLink;
						}
					},
					allowBuyClick: function() {
						return window.QD_smartCartAllowBuy;
					}
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$(".shelf-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		facebookLikebox: function() {
			var wrapper = $(".facebook-likebox-wrapper");
			var windowH = $(window).height();

			if (!wrapper.length)
				return;

			$(window).resize(function() {
				windowH = $(window).height();
			});

			wrapper.html('<img src="/arquivos/ajax-loader.gif" style="margin: 0 auto;display: block;" />');

			$(window).scroll(function(e) {
				if ((wrapper.offset().top - windowH) <= $(window).scrollTop()) {
					$(window).unbind(e);
					wrapper.html('<div class="fb-page" data-href="https://www.facebook.com/drogariaaraujo" data-width="361" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/drogariaaraujo"><a href="https://www.facebook.com/drogariaaraujo">Drogaria Araujo</a></blockquote></div></div>');
					if(typeof FB != 'undefined' && FB.XFBML)
						FB.XFBML.parse();
				}
			});
			$(window).scroll();
		},
		coresPrateleira: function() {
			// Se estou em uma página de lista, então eu ignoro
			if($(document.body).is('.giftlist') || $(document.body).is('.institucional-dermacenter, .institucional-dermacenter-solar, .institucional-dermacenter-rugas, .institucional-dermacenter-pele-oleosa, .loja-vult'))
				return;

			var options = {
				isSmartCheckout : true,
				checkDuplicateUri : false,
				thumbsQuantity : 8,
				replaceProductName : true,
				groupSkuByDimension : false,
				groupSkuByDimension2 : false,
				productNameLimiter : 95,
				productNameStopInLastWord : true,
				minSkuQttShow: 1,
				// thumbRendered: function() {$(window).trigger('qdCustomCoresThumbRendered', arguments)}
			};

			// Resultados de busca / cat / depto
			var searchShelf = $("div[id*=ResultItems_] .prateleira");
			searchShelf.QD_coresPrateleira(options);

			// Coleções (padrão)
			$(".prateleira >h2").parent().QD_coresPrateleira(options);

			// Coleções por query string
			$(".prateleira").not(searchShelf).find(">ul >li[layout]").parent().parent().QD_coresPrateleira(options);
		},
		amazingMenu: function(){
			$('.header-amazing-menu').QD_amazingMenu();
		},
		callNewsLetterFloating: function() {
			var wrapper = $(".floating-qd-v1-newsletter");

			wrapper.html('<div class="container"> <div class="row floating-qd-v1-newsletter-bg padding-t-sm padding-b-md"> <div class="col-xs-30"> <div class="qd_news"> <input type="text" name="nome" class="qd_news_name input-type-text-ghost form-control"/> <input type="email" name="email" class="qd_news_email input-type-text-ghost form-control"/> <button class="qd_news_button">Cadastrar</button> </div> </div> </div> <a href="/conteudo-regulamento-inscreva-se" class="floating-qd-v1-newsletter-text">*Você receberá um e-mail com as instruções para obter seu desconto.</a> <a href="/conteudo-regulamento-inscreva-se" class="floating-qd-v1-newsletter-text-2">*Confira inclusive em sua caixa de spam. Promoção válida para a primeira <br> compra acima de R$70. Consulte o regulamento aqui. </a> <span class="qd-code">B1M2V3N4D615</span> <span class="floating-qd-v1-newsletter-btn-close"></span> </div>');

			$(".floating-qd-v1-newsletter-btn-close").click(function(event) {
				wrapper.trigger("QuatroDigital.cf_close");
				$(".floating-qd-v1-newsletter").slideUp('slow');
			});

			wrapper.QD_cookieFn({
				cookieName: "newsletter-close",
				close: "",
				expireDays: 7,
				show: function($elem){
					$elem.slideDown();

					$elem.find(".qd_news").QD_news({
						defaultEmail : "Seu e-mail",
						successCallback: function () {
							wrapper.addClass('floating-qd-v1-newsletter-finish');
						}
					});
				}
			});

			$(".footer-newsletter").hide();
		},
		callNewsLetterCloseSite: function(){
			var modal = $(".qd-common-modal").clone();
			var modalOpen = false;
			var lastMouseY = 0;
			var openCount = 0;

			$(window).mousemove(function(event) {
				lastMouseY = event.screenY;
			});

			$(document).mouseleave(function() {
				if(modalOpen || lastMouseY > 200)
					return;

				if (openCount >= 1)
					return;

				$('<div class="common-newsletter-close"> <div class="qd_news"> <input type="text" name="nome" class="qd_news_name input-type-text-ghost form-control"> <input type="text" name="email" class="qd_news_email input-type-text-ghost form-control"> <button class="qd_news_button"></button> </div> <span class="close-modal" data-dismiss="modal"></span> <p> *Confira inclusive em sua caixa de spam. Promoção válida para a primeira compra acima de R$70. <a href="/conteudo/regulamento-inscreva-se" class="floating-qd-v1-newsletter-link">Consulte regulamento aqui</a> </p> <span class="qd-code">B1M2V3N4D615</span> </div>').QD_cookieFn({
					cookieName: "newsletter-close",
					close: "",
					expireDays: 7,
					show: function($elem) {
						if(modalOpen)
							return;

						modal.addClass('modal common-newsletter-close-modal').appendTo(document.body);

						// Ações
						modal.on("hidden.bs.modal", function(){
							$elem.trigger("QuatroDigital.cf_close");
							if(!$('.modal').is(':visible'))
								$(document.body).removeClass('modal-open');
							modalOpen = false;
							modal.removeAttr('class').hide();
						});

						modalOpen = true;
						modal.find(".modal-body").html($elem);
						modal.modal();
						openCount = 1;

						$elem.find(".qd_news").QD_news({
							defaultName: "Seu nome",
							defaultEmail: "Seu e-mail",
							successCallback: function () {
								modal.addClass('common-newsletter-close-modal-finish');
							}
						});

						$('.common-newsletter-close-modal .modal-body').append('<div class="additional-newsletter-wrapper"><a href="/especial-dia-das-maes" title="Ofertas de Carnaval"><div class="additional-newsletter-content"></div></a></div>');
					},
					hide: function($elem){}
				});
			});
		},
		setScrollToggle: function() {
			if(Common.isMobile()) {
				$("body").attr("data-qd-scroll-limit", 120);
				return;
			}
			$("body").attr("data-qd-scroll-limit", 200);
		},
		buyInShelf: function() {
			var fn = function(){
				$(".shelf-common-buy-button .buy-button:not('.qd-on-bb')").addClass("show qd-on-bb").click(function(e) {
					e.preventDefault();

					Common.buyInShelfOpenModal(($(this).attr("href") || "").replace("/qd-buy-button?idproduto=", ""));
				});
			};
			fn();

			// Ações
			/*$(".modal").on("hidden.bs.modal", function(){
				$(this).removeClass("shelf-buy-button-modal");
			});*/

			// No callback do infinity scroll
			$(window).on("QuatroDigital.is_Callback", function(){
				fn();
			});
		},
		buyInShelfOpenModal: function(productId){
			var modal = $(".modal");

			modal.addClass("shelf-buy-button-modal");

			// Header
			var header = modal.find(".modal-header");
			header.children(":not(.close)").remove();
			header.append('<h3>Escolha a variação do produto</h3>');

			var iframe = $('<iframe src="/qd-buy-button?idproduto=' + productId + '" frameborder="0"></iframe>');
			modal.find(".modal-body").empty().append(iframe);
			modal.modal();

			iframe.load(function() {
				try{
					var $t = $(this);
					$t.height($t.contents().find("body").outerHeight(true) + 5);
				}
				catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
			});
		},
		collection2Banner: {
			main: function() {
				// Página de produto
				if(!$(document.body).is(".produto"))
					return;

				$(".product-flags-sku:not('.qd-on')").addClass("qd-on").each(function() {
					bind.call(this);
				});

				function bind() {
					var flagsWrapper = $(this);
					var flags = flagsWrapper.find(".flag");

					if (!flags.length)
						return;

					var wrapper = $('<div class="collection2Banner"></div>'); // Essas classes também estão em uso pelo QD_CoresPrateleira. Mexa com cuidado
					flagsWrapper.append(wrapper);

					flags.each(function() {
						var txt = Common.collection2Banner.checkTextFlag($(this));
						if (!txt)
							return;

						// Adicionando o banner ou a flag de desconto
						var imgNamePrefix = txt.toLowerCase().replaceSpecialChars().replace(/\s/g, "_");

						// Adicionando o banner ou a flag de desconto
						var imgNamePrefix = txt.toLowerCase().replaceSpecialChars().replace(/\s/g, "_");
						var shelfImgFlag = function(imgName) {
							$('<img src="/arquivos/' + (imgName || imgNamePrefix + '_flag.jpg') +'" alt="' + txt + '" style="height:1px;width:1px;" />')
							.load(function(e) { $(this).removeAttr("style"); })
							.error(function(e) {
								$(this).hide();
								if(imgName)
									shelfImgFlag();
							})
							.appendTo(wrapper);
						};

						// Adicionando a flag ao SKU na tela de Produto
						var allowAddBanner = true;
						Common.collection2Banner.skuFlag(txt, function(skuList) {
							$(".skuList").each(function() {
								var $t = $(this);
								var skuId = ($t.find(".buy-button").attr("href") || "").split("ku=").pop().split("&").shift();

								if (!(skuId.length && $.inArray(skuId, skuList) > -1)) // Usando $.inArray p/ oferecer suporte ao IE8
									return;

								// Flag de leve mais por menos na listagem de SKU
								var addLabelImg = function(imgName) {
									$('<img src="/arquivos/' + (imgName || "leve-mais-por-menos_label-2.png") + '?_=' + imgNamePrefix + '" alt=" " style="height:1px;width:1px;" class="qd-label-highlight-product" />')
									.load(function(e) {
										$(this).removeAttr("style");
									})
									.error(function(e) {
										$(this).hide();
										if(imgName)
											addLabelImg();
									})
									.appendTo($t.find(".nomeSku"));
								};
								addLabelImg(imgNamePrefix + ".png");

								Common.collection2Banner.addStructureHighlightProduct(txt, $t);

								// Thumb oculto na lista de SKU (usado para colocar a miniatura sobre o produto)
								var wrapper = $t.find('.qd-flag-highlight-product-wrapper');
								if(!wrapper.length)
									wrapper = $('<div class="qd-flag-highlight-product-wrapper"></div>').appendTo($t);
								var addFlagImg = function(imgName) {
									$('<img src="/arquivos/' + (imgName || imgNamePrefix + '_flag.jpg') + '" alt="' + txt + '" style="height:1px;width:1px;" class="qd-flag-highlight-product" />')
									.load(function(e) { $(this).removeAttr("style"); })
									.error(function(e) {
										$(this).hide();
										if(imgName)
											addFlagImg();
									})
									.appendTo(wrapper);
								}
								addFlagImg(imgNamePrefix + '_flag.png');

								// Adicionando banner quando estou em produto e encontrei um SKU no txt
								if(allowAddBanner){
									shelfImgFlag(imgNamePrefix + '_banner.jpg');
									// Informando que o banner foi adicionado
									allowAddBanner = false;
								}
							});
						});
					});
				};
			},
			coresPrateleiraCallback: function() {
				var callback = function() {
					Common.collection2Banner.shelfSkuFlag();

					// Adicionando hover para exibir a flag nos produtos q estão em promoção na vitrine
					$(".vtex-cpSkuIds:not('.qd-on-hover')").addClass("qd-on-hover").bind("mouseenter", function() {
						var $t = $(this);
						if ($t.find("img.qd-cores-flag").length)
							$t.getParent(".qdShelfWrapper").find(".collection2Flag span").hide().filter("#flag-" + this.id).show();
						else
							$t.getParent(".qdShelfWrapper").find(".collection2Flag span").hide();
					}).each(function() {
						var $t = $(this);
						if ($t.attr("data-qd-lowest-price") && $t.find("img.qd-cores-flag").length)
							$t.getParent(".qdShelfWrapper").find(".collection2Flag span#flag-" + this.id).show();
					});
				};

				if ($("body").is(".produto"))
					$(window).bind("QuatroDigital.cp_ajaxCallback", callback);
				else
					$(window).bind("QuatroDigital.cp_callback", callback);

				$(window).bind("QuatroDigital.cp_thumbsWrapperAdd", function(e, data) {
					data.wrapper.children("span").each(function() {
						var skuInfo = data.data.sku[this.id || ""];
						if (skuInfo)
							$(this).attr("data-qd-sku-price", skuInfo.bestPrice);
					});
				});
			},
			shelfSkuFlag: function() {
				$(".qdHightLight").not(".qd-on-cores").addClass("qd-on-cores").each(function() {
					var flagsWrapper = $(this);
					var $li = flagsWrapper.parents("li");
					var collection2Flag = $('<div class="collection2Flag"></div>').appendTo(flagsWrapper);

					var flags = new $;
					flagsWrapper.find(".flag").each(function() {
						var txt = Common.collection2Banner.checkTextFlag($(this));
						if (!txt)
							return;

						Common.collection2Banner.skuFlag(txt, function(skuList) {
							var thumbs = $li.find(".vtex-cpSkuIds");
							var lowestPrice;

							if (!thumbs.length) {
								flagsWrapper.removeClass("qd-on-cores");
								return;
							}

							thumbs.each(function() {
								var $t = $(this);

								var skuId = this.id || "";
								if (!(skuId.length && skuList.indexOf(skuId) > -1))
									return;

								$(window).trigger('QD_insertPromotionalPrice', [txt, skuId]);

								lowestPrice = lowestPrice || $t;
								if ($t.attr("data-qd-sku-price") < lowestPrice.attr("data-qd-sku-price"))
									lowestPrice = $t;

								// Adiciono o wrapper com o id do SKU
								var flagId = $('#flag-' + skuId);
								if(!flagId.length)
									flagId = $('<span id="flag-' + skuId + '"></span>').hide().appendTo(collection2Flag);

								var imgNamePrefix = txt.toLowerCase().replaceSpecialChars().replace(/\s/g, "_");
								var addShelfImgFlag = function(imgName) {
									$('<img src="/arquivos/' + (imgName || imgNamePrefix + '_flag.jpg') + '" alt="' + txt + '" style="height:1px;width:1px;" class="qd-cores-flag qd-shelf-sku-flag" />')
									.load(function(e) {
										$(this).removeAttr("style").clone().removeAttr('class').appendTo(flagId);
										flags = flags.add($t);
									})
									.error(function(e) {
										$(this).hide().removeClass("qd-shelf-sku-flag");
										if(imgName)
											addShelfImgFlag();
									})
									.prependTo($t.find("a"));
								}
								addShelfImgFlag(imgNamePrefix + "_flag2.png");
							});

							if (lowestPrice && !lowestPrice.siblings(".vtex_cpActiveSku").length) {
								lowestPrice.trigger("mouseover");
								lowestPrice.trigger("mouseenter");
								lowestPrice.attr("data-qd-lowest-price", 1);
							}
						});
					});

					// Animando as imagens que possuem mais de uma flag
					setInterval(function() {
						flags.each(function() {
							var imgs = $(this).find("img.qd-shelf-sku-flag");

							var currentImg = imgs.filter(".qd-sku-flag-active");
							var ndx = currentImg.index(imgs) + 1;
							if(ndx >= imgs.length)
								ndx = 0;

							imgs.removeClass("qd-sku-flag-active").eq(ndx).addClass('qd-sku-flag-active');
						});
					}, 1500);
				});

				$(window).trigger('QD_insertPromotionalPriceCompleted');
			},
			checkTextFlag: function(elem){
				var txt = elem.text().trim();

				if (txt.slice(txt.length - 1) !== ".") // usado slice por conta de bug no IE8 =/
					return false;

				return txt;
			},
			showPromotionalPrice: function(idSku, $li) {
				var elemHightLight = $li.find('.qd-shelf-content-hightlight');
				var elemHightLightActive = $li.find('.qd-shelf-content-hightlight[data-qd-idsku="' + idSku+ '"]');
				var $liPrice = $li.find('.qd-shelf-content-price');

				elemHightLight.hide();
				if (elemHightLightActive.length) {
					// $liPrice.hide();
					elemHightLightActive.show();
				}
				// else
					// $liPrice.show();
			},
			shelfFlag: function() {
				var shelfElemSkuId = {};
				var shelfElemSkuId2 = {};
				var regex = /Leve([0-9]+)/i;
				var regex2 = /Pague([0-9]+)/i;
				var count = 0;

				$(window).bind("QD_insertPromotionalPrice", function(e, txt, skuId) {
					if (regex2.test(txt)) {
						shelfElemSkuId2[skuId] = {
							txt: txt,
							qtt: (txt.match(regex) || [1]).pop()
						}

						count++;
					} else if (regex.test(txt)) {
						shelfElemSkuId[skuId] = {
							txt: txt,
							qtt: (txt.match(regex) || [1]).pop()
						}

						count++;
					}
				});

				$(window).bind("QD_insertPromotionalPriceCompleted", function(e) {
					if (count)
						Common.collection2Banner.insertPromotionalPrice(shelfElemSkuId, shelfElemSkuId2);
				});

				$(window).bind("QuatroDigital.cp_thumbMouseenter", function(e, obj) {
					Common.collection2Banner.showPromotionalPrice(obj.data.sku, $(obj.li));
				});
			},
			insertPromotionalPrice: function(shelfElemSkuId, shelfElemSkuId2) {
				Common.collection2Banner.promotionalPriceSkus = Common.collection2Banner.promotionalPriceSkus || {};
				var buySkusCheckoutSimulate = [];

				var sweepingItems = function(result) {
					for (var i = 0; i < result.items.length; i++) {
						if(!(result.items && result.items.length))
							return;

						var items = {};
						for (var i = 0; i < result.items.length; i++) {
							items[result.items[i].id] = items[result.items[i].id] || {total: 0, qtt: 0};
							items[result.items[i].id].total += result.items[i].sellingPrice * result.items[i].quantity;
							items[result.items[i].id].qtt += result.items[i].quantity;
						}

						for(var j in items){
							var price = qd_number_format(Math.ceil((items[j].total / 100 / items[j].qtt) * 100) / 100, 2, ",", ".").split(',');
							if(Common.collection2Banner.promotionalPriceSkus[j] && items[j].qtt >= Common.collection2Banner.promotionalPriceSkus[j])
								addHtml($('.vtex-cpSkuId_' + j).closest('li[layout]'), price[0], price[1], items[j].qtt, j);
						}
					}
				};

				var addHtml = function(li, price, cents, qtt, idsku) {
					var $html = $('<div class="qd-shelf-content-hightlight" data-qd-idsku="' + idsku + '"> <div class="qd-shelf-content-hightlight-img"> <img src="/arquivos/qd-hightlight-v1.jpg" alt="Leve + Pague -" /> </div> <div class="qd-shelf-content-hightlight-content"> <p class="qd-shelf-content-hightlight-title"></p> <p class="qd-shelf-content-hightlight-price"></p> </div> </div>');
					$html.find('.qd-shelf-content-hightlight-title').text('leve ' + qtt + ' e pague');
					$html.find('.qd-shelf-content-hightlight-price').html('<span>R$</span> ' + price + '<sup>,' + cents + '</sup>' + ' <span> cada</span>');
					$html.find('.qd-shelf-content-hightlight-link').attr('href', li.find('.qd_cpUri').val());

					li.find('.qd-shelf-content-price').after($html);

					Common.collection2Banner.showPromotionalPrice(idsku, li);
				};

				// Para produtos de Leve X Pague Y
				for (var k in shelfElemSkuId2) {
					if(Common.collection2Banner.promotionalPriceSkus[k])
						continue;

					Common.collection2Banner.promotionalPriceSkus[k] = shelfElemSkuId2[k].qtt;
					vtexjs.checkout.simulateShipping([{id: k, quantity: shelfElemSkuId2[k].qtt, seller: '1'}], '', 'BRA').done(function(result) {
						sweepingItems(result);
					});
				}

				// Para os demais produtos
				for (var i in shelfElemSkuId) {
					if(Common.collection2Banner.promotionalPriceSkus[i])
						continue;

					Common.collection2Banner.promotionalPriceSkus[i] = shelfElemSkuId[i].qtt;
					buySkusCheckoutSimulate.push({
						id: i,
						quantity: shelfElemSkuId[i].qtt,
						seller: '1'
					});
				}

				if (!buySkusCheckoutSimulate.length)
					return;

				itemsPrice = {};
				vtexjs.checkout.simulateShipping(buySkusCheckoutSimulate, '', 'BRA').done(function(result) {
					sweepingItems(result);
				});
			},
			skuFlag: function(collectionName, callback) {
				// Buscando o arquivo com a lista de SKUs
				var calendar = new Date();
				$.qdAjax({
					url: "//araujo.vteximg.com.br/arquivos/" + collectionName.toLowerCase().replaceSpecialChars().replace(/\s/g, "_").slice(0, -1) + ".txt",
					data: {
						"_day": "" + calendar.getFullYear() + calendar.getMonth() + calendar.getDate() + "-" + calendar.getHours()
					},
					clearQueueDelay: null,
					success: function(data) {
						var lines = data.split("\n");
						lines.shift(); // Removendo o cabeçalho

						var sku = [];
						var item;
						for (var i = 0; i < lines.length; i++) {
							item = lines[i].split("\t").shift().trim();
							if (item.length)
								sku.push(item);
						}

						if (typeof callback === "function")
							callback(sku);
					}
				});
			},
			addStructureHighlightProduct: function(txt, elem) {
				var wrapperHighlightProduct = $('<div class="qd-highlight-product-wrapper"> <div class="row"> <div class="col-xs-15 col-sm-20"> <div class="qd-highlight-product-condition"></div> </div> <div class="col-xs-15 col-sm-10"> <a href="" class="qd-highlight-product-btn">COMPRAR KIT <i class="fa fa-shopping-bag" aria-hidden="true"></i> </a> </div> </div> </div>');

				Common.collection2Banner.addValueHighlightProduct(txt, wrapperHighlightProduct, elem);
			},
			addValueHighlightProduct: function(txt, wrapper, elemSkulist) {
				var quantity = (txt.match(/Leve([0-9]+)/i) || [1]).pop();

				if (quantity <= 1)
					return;

				var addHtml = function(bestPrice, qtt) {
					wrapper.find('.qd-highlight-product-condition').html('<span>LEVE <strong>' + qtt + '</strong> E PAGUE <strong>R$ ' + bestPrice + '</strong> CADA</span>');
					wrapper.find('.qd-highlight-product-btn').attr('href', (elemSkulist.find('.buy-button').attr('href') || '').replace(/qty=[0-9]*/i, 'qty=' + qtt));
				};

				var sku = ((elemSkulist.find('.buy-button').attr('href') || '').match(/sku=([0-9]+)/i) || ['']).pop();
				if(!sku.length)
					return elemSkulist.after('<div class="bg-danger text-danger">Error ao buscar os dados de desconto</div>');

				vtexjs.checkout.simulateShipping([{id: sku, quantity: quantity, seller: '1'}], '', 'BRA').done(function(result) {
					if(!(result.items && result.items.length))
						return;

					var total = 0;
					var qty = 0;
					for(var i = 0; i < result.items.length; i++) {
						total += result.items[i].sellingPrice * result.items[i].quantity;
						qty += result.items[i].quantity;
					}

					if(qty < quantity)
						return;

					addHtml(qd_number_format(Math.ceil((total / 100 / qty) * 100) / 100, 2, ",", "."), qty);

					$(document.body).QD_buyButton({
						buyButton: ".qd-highlight-product-wrapper .qd-highlight-product-btn"
					});

					elemSkulist.addClass('qd-active-highlight-product').after(wrapper);
				});
			}
		},

		returnToTop: function() {
			$('<div id="returnToTop"><a href="#"><span class="text">voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>').appendTo(document.body).bind("click", function () {
				$("html,body").animate({scrollTop: 0 }, "slow");
				return false;
			});
		},
		mblSmartCart: function(){
			$('.header-qd-v1-m-cart a').on('click', function(){
				$('.mbl-header-smart-cart .qd-sc-wrapper').show();

				$('.mbl-header-smart-cart').fadeIn(400, function(){
					$('body').addClass('modal-open');
				});

				$('.mbl-header-smart-cart .qd-sc-wrapper').animate({
					'right':'0'
				},600);
				return false;
			});

			var elem = $('.mbl-header-smart-cart, .mbl-header-smart-cart .qd-cartTitle h3');
			elem.on('click', function(evt){
				if (!$(evt.target).is(elem))
					return;

				$('.mbl-header-smart-cart').fadeOut(400, function(){
					$(document.body).removeClass('modal-open');
				});

				$('.mbl-header-smart-cart .qd-sc-wrapper').animate({
					'right':'-100%'
				}, 600, function(){
					$('.mbl-header-smart-cart, .mbl-header-smart-cart .qd-sc-wrapper').removeAttr('style').hide();
				});
			})
		},
		headerAmazingMenuMBL: function() {
			if(!$('.header-qd-v1-m-cart').length)
				return;

			$(".header-qd-v1-m-searchbar-button").on('click',function(){
				$("body").toggleClass('qd-am-on');
				$('.header-qd-v1-m-amazing-menu-wrap').scrollTop(0);
				$('.header-qd-v1-m-searchbar.am .fulltext-search-box').focus();
			});
		},
		tbWindowExtend: function() {
			if(typeof window.tb_remove == 'function'){
				var tb_remove = window.tb_remove;
				window.tb_remove = function() {
					tb_remove.apply(this, arguments);
					$(document.body).removeClass('qdTbWindowActive');
				}
			}

			if(typeof window.tb_show == 'function'){
				var tb_show = window.tb_show;
				window.tb_show = function() {
					tb_show.apply(this, arguments);
					$(document.body).addClass('qdTbWindowActive');
					$('#TB_window').click(function(event) {
						if(event.target == this)
							window.tb_remove();
					});
				}
			}
		}
	};

	var Home = {
		init: function() {
			Home.sliderFullSlickCarousel();
			Home.cycle2();
			Home.brandOwlCarousel();
			Home.shelfOwlCarousel();
			// Home.modalNewsLetter();
			Home.sliderFull();

			if ($(document.body).is('.home-m'))
				Home.qdPlaceholder();

			if(jsnomeLoja == "araujomedicamentos") // Loja Medicamentos Especiais
				Home.cycle2init();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		cycle2init: function() {
			var elem = $(".home-qd-v1-slider");

			$(elem).append('<div class="home-qd-v1-slider-dots"></div>')

			elem.cycle({
				slides: "> .home-qd-v1-slide",
				pager: ".home-qd-v1-slider-dots"
			});
		},
		sliderFullSlickCarousel: function() {
			if(typeof $.fn.slick !== "function")
				return;

			$('.slider-qd-v1-full').slick({
				lazyLoad: 'ondemand',
				autoplay: true,
				autoplaySpeed: 3000,
				dots: true,
				fade: true,
				arrows: false,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});
		},
		sliderFull: function() {
			if(typeof $.fn.slick !== "function")
				return;

			$('.slick-qd-v1-full').slick({
				lazyLoad: 'ondemand',
				dots: true,
				autoplay: true,
				autoplaySpeed: 3000,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
			}).children('button.slick-arrow').wrapAll('<div class="container" />');
		},
		qdPlaceholder: function() {
			$(".qd-v1-placeholder .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr("href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}));

				$t.parent().addClass( cols.length ? cols.join(" ") : "" );
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".full-slider, .qd-cycle-slide");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<span class='pager-item'>" + "<img src='" +  $t.find("img").attr("src") + "' />" + "</span>");
			});

			elem.append('<div class="slider-pager padding-t-md padding-b-sm text-center"></div>');

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".slider-pager",
				prev: ".slider-prev",
				next: ".slider-next"
			});
		},
		brandOwlCarousel:function(){
			var owl = $(".home-brands-carousel");

			if(!owl.find(".box-banner").length){
				$(".home-brands-carousel-wrap").hide();
				return;
			}

			owl.owlCarousel({
				items: 4,
				navigation: false,
				pagination: false,
				navigationText: ["",""],
				autoPlay: 5000,
				slideSpeed: 500,
				stopOnHover: true,
				scrollPerPage: true
			});

			// Custom Navigation Events
			$(".owl-next").click(function(){
				owl.trigger('owl.next');
			});
			$(".owl-prev").click(function(){
				owl.trigger('owl.prev');
			});
		},
		shelfOwlCarousel: function() {
			$(".QD.prateleira").each(function(){
				$(this).children("ul").wrapAll('<div class="qd-shelf-owl-carousel"></div>').parent().owlCarousel({
					items: 5,
					navigation: true,
					pagination: false,
					slideSpeed: 500,
					stopOnHover: true,
					afterInit: function(wrappper){
						var height = 0;
						var li = wrappper.find("li[layout]");
						li.each(function() {
							var h = $(this).height();
							if(h > height)
								height = h;
						});
						li.height(height);
					}
				});
			});
		}
	};

	var Departament = {
		init: function() {
			Departament.changeTagHtmlSeachNavigator();
			Departament.hideSearchNavigator();
			Search.cycle2();
			Departament.shelfOwlCarousel();
			Search.searchAreaSeoTitle();
			Departament.addShelfBanners();
			Departament.showDiscountPercent.main();

			if ($(document.body).is('.search-mobile') || $(document.body).is('.carnaval-search')){
				Search.qdMobileSearchMenu();
				Search.shelfLineFix();
				Search.qdNextPageInfinityScroll();
			}
			else
				Search.callInfinityScroll();
		},
		ajaxStop: function() {
			Departament.showDiscountPercent.showAll();
		},
		windowOnload: function() {},
		changeTagHtmlSeachNavigator: function() {
			var $h3 = $(".search-single-navigator h3");

			$h3.each(function() {
				var $t = $(this);

				$t.replaceWith('<h1 class="' + $t.attr('class') + '">' + $t.html() + '</h1>');
			});
		},
		hideSearchNavigator: function() {
			var h5 = $(".search-single-navigator h5");

			h5.click(function() {
				$(this).toggleClass("qd-active").next().slideToggle();
			});

			h5.find("+ul .filtro-ativo +a").each(function() {
				var $t = $(this);

				if($t.is(".ver-filtros")) {
					$t.parent().prev().addClass("qd-active");
					$t.parent().slideDown().addClass("qd-active");
				}
			});
		},
		shelfOwlCarousel: function() {
			$(".QD.prateleira >h2").parent().each(function(){
				$(this).children("ul").wrapAll('<div class="qd-shelf-owl-carousel"></div>').parent().owlCarousel({
					items: 4,
					navigation: true,
					pagination: false,
					slideSpeed: 500,
					stopOnHover: true,
					afterInit: function(wrappper){
						var height = 0;
						var li = wrappper.find("li[layout]");
						li.each(function() {
							var h = $(this).height();
							if(h > height)
								height = h;
						});
						li.height(height);
					}
				});
			});
		},
		addShelfBanners: function() {
			var wrapper = $("[id*='ResultItems_'] .prateleira");
			var rows = wrapper.children("ul");

			$(".internalBanners .box-banner").each(function(ndx) {
				var i;
				if($(document.body).is(".sandoz"))
					i = ndx;
				else
					i = ndx * 2 + 1;

				if(typeof rows[i] === "object")
					$(this).insertBefore(rows[i]);
				else
					$(this).insertAfter(rows.last());
			});
		},
		showDiscountPercent: {
			main: function(){
				Departament.showDiscountPercent.bindPrateleiraCores();
				Departament.showDiscountPercent.showAll();
			},
			bindPrateleiraCores: function() {
				$(window).on("QuatroDigital.cp_thumbMouseenter", function(e, params){
					var prodData = {
						skus : [params.data]
					};
					// Mostra o desconto apenas da thumb com hover
					Departament.showDiscountPercent.getDiscountPercent(prodData, params.li);
				});
			},
			getDiscountPercent: function(prodData, productWrapper) {
				var discount;
				var lowerPrice;
				for(var j = 0; j < prodData.skus.length; j++) {
					sku = prodData.skus[j];
					
					// Verifica se é menor valor para estado inicial
					lowerPrice = lowerPrice || sku.bestPrice;
					if(lowerPrice < sku.bestPrice)
						continue;
					
					if(sku.available && sku.listPrice > 0)
						discount = Math.floor((1 - sku.bestPrice / sku.listPrice) * 100);
					
				}
				if(discount) {
					var imgWrapper = productWrapper.find('.shelf-common-image');
					if(imgWrapper.is('.qd-discounted'))
						imgWrapper.find('.qd-discount-percent').show().text('-' + discount + '%');
					else
						imgWrapper.prepend($('<div class="qd-discount-percent">').text('-' + discount + '%')).addClass('qd-discounted');
				}
				else
					productWrapper.find('.qd-discount-percent').hide();
			},
			showAll: function () {
				var prodData;
				var wrapper = $('.resultItemsWrapper');
				var productsWrapper = wrapper.find('li[layout]');

				productsWrapper.each(function () {
					var $t = $(this)
					prodId = $t.find('.qd-productId').val();
					prodData = JSON.parse(window.qdSessionStorage.getItem("QD_cp_prod_info_" + prodId));
					
					// Verifica se o produto estava salvo na sessão
					if(!prodData) {
						// Faz a requisição dos dados do produto
						$.qdAjax({
							"url": "/api/catalog_system/pub/products/variations/" + prodId,
							"dataType": "json",
							clearQueueDelay: null
						}).done(function(data) {
							Departament.showDiscountPercent.getDiscountPercent(data, $t);
						});
						return;
					}
					
				if($t.find('.shelf-common-image').not('.qd-discounted').length)
					Departament.showDiscountPercent.getDiscountPercent(prodData, $t);
				});
			},
		}
	};

	var Search = {
		init: function() {
			Departament.changeTagHtmlSeachNavigator();
			Search.cycle2();
			Search.searchAreaSeoTitle();
			Search.emptySearch();
			Departament.addShelfBanners();
			Search.qdSidemenuToggle();
			Departament.showDiscountPercent.main();

			if ($(document.body).is('.search-mobile') || $(document.body).is('.carnaval-search')){
				Search.qdMobileSearchMenu();
				Search.shelfLineFix();
				Search.qdNextPageInfinityScroll();
			}
			else
				Search.callInfinityScroll();

			// Black Fridy
			if ($(document.body).is('.black-friday')) {
				Search.callMenuMobileBlackFriday();
				Search.setClassActiveMenu();
				Search.redirectMenuMobile();
			}

			// Carnaval
			if ($(document.body).is('.carnaval-search')) {
				Search.callMenuMobileCarnaval();
				Search.setClassActiveMenuCarnaval();
				Search.redirectMenuMobileCarnaval();
			}
		},
		ajaxStop: function() {
			Departament.showDiscountPercent.showAll();

			if ($(document.body).is('.search-mobile') || $(document.body).is('.carnaval-search'))
				Search.shelfLineFix();

			if(jsnomeLoja == "araujomedicamentos") // Loja Medicamentos Especiais
				Common.priceCentsSplit();
		},
		windowOnload: function() {},
		redirectMenuMobileCarnaval: function() {
			$('.carnaval-qd-v1-search-menu select').change(function() {
				window.location.href = $(this).find('option:selected').val();
			});
		},
		setClassActiveMenuCarnaval: function() {
			var regex = /\//;

			if (location.pathname.replace(regex, '').length <= 0)
				return;

			var id = location.pathname.replace(regex, '');
			var wrapper = $('.carnaval-qd-v1-search-menu');

			wrapper.find('li').removeClass('active');
			wrapper.find('[data-qd-id="' +  id + '"]').attr('selected', 'selected').parent().addClass('active');
		},
		callMenuMobileCarnaval: function() {
			$('.carnaval-qd-v1-search-navigator-btn').click(function() {
				$(document.body).toggleClass('qd-sn-on');
			});

			$(".carnaval-qd-v1-overlay").click(function(evt){
				$(document.body).removeClass('qd-sn-on');
			});
		},
		redirectMenuMobile: function() {
			$('.black-friday-qd-v1-search-menu select').change(function() {
				window.location.replace('/black-friday?' + $(this).find('option:selected').val());
			});
		},
		setClassActiveMenu: function() {
			var regex = /(fq=H:)([0-9]+)/gi;

			if (!location.search.match(regex))
				return;

			var id = (location.search.match(regex)[0]).replace(regex, '$2');
			var wrapper = $('.black-friday-qd-v1-search-menu');

			wrapper.find('li').removeClass('active');
			wrapper.find('[data-qd-id="' +  id + '"]').attr('selected', 'selected').parent().addClass('active');
		},
		callMenuMobileBlackFriday: function() {
			$('.black-friday-qd-v1-search-navigator-btn').click(function() {
				$(document.body).toggleClass('qd-sn-on');
			});

			$(".black-friday-qd-v1-overlay").click(function(evt){
				$(document.body).removeClass('qd-sn-on');
			});
		},
		qdNextPageInfinityScroll: function() {
			var wrapper = $(".prateleira[id*=ResultItems]");
			wrapper.after('<div class="search-qd-v1-next-page"><a href="#"> <i class="fa fa-plus"></i> Ver mais produtos</a></div>');

			wrapper.QD_infinityScroll({
				paginate: function(nextPage) {
					$(".search-qd-v1-next-page").click(function() {
						if(nextPage())
							$(this).slideUp();
						return false;
					});
				}
			});
		},
		shelfLineFix: function() {
			var curTop;
			var wrapper = $(".prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

			var shelf = wrapper.children("ul").removeClass('qd-first-line');
			shelf.first().addClass("qd-first-line");

			var setFirst = function() {
				shelf.each(function(){
					var $t = $(this);

					if($t.is(".qd-first-line")){
						curTop = $t.offset().top;
						shelf = shelf.not($t);
						return;
					}

					var offsetTop = $t.offset().top;
					if (offsetTop >= curTop - 30 && offsetTop <= curTop + 30)
						shelf = shelf.not($t);
					else{
						$t.addClass("qd-first-line");
						return false;
					}
				});

				if(shelf.length)
					setFirst();
			};
			setFirst();
		},
		qdMobileSearchMenu: function() {
			$(".search-qd-v1-navigator-btn").click(function(){
				$("body").toggleClass('qd-sam-on');
			});

			$(".search-qd-v1-navigator-close").click(function(){
				$("body").removeClass('qd-sam-on');
			});

			$(document.body).on('swipeleft', function(evt, touch) {
				$(document.body).removeClass('qd-sam-on');
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;

			var elem = $(".qd-cycle-slide");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<span class='pager-item'>" + "<img src='" +  $t.find("img").attr("src") + "' />" + "</span>");
			});

			elem.append('<div class="slider-pager padding-t-md padding-b-sm text-center"></div>');

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".slider-pager",
				prev: ".slider-prev",
				next: ".slider-next"
			});
		},
		searchAreaSeoTitle: function() {
			var title = $(".search-area-seo h2");
			title.addClass(title.text().toLowerCase().replace(/\s/g, "-").replaceSpecialChars());
		},
		emptySearch: function() {
			if ($('.busca-vazio').length) {
				$(".qd-template-empty-search").each(function() {
					$(this).after(this.innerHTML);
				});

				$('.no-search-result').show();
				$('.searchTitle').hide();
			};
		},
		callInfinityScroll: function() {
			if($(document.body).is(".qd-ssb-i, .black-friday, .carnaval-search")){
				var wrapper = $(".prateleira[id*=ResultItems]");

				wrapper.QD_infinityScroll({
					paginate: function(callback) {
						$('<button class="qd-ssb-more-products">Mostrar mais produtos <i class="fa fa-chevron-circle-down"></i></button>').insertAfter(wrapper).click(callback);
					},
					returnToTop: $("")
				});

				$(window).on("QuatroDigital.is_noMoreResults", function() {
					$(".qd-ssb-more-products").slideUp();
				});
			}
			else
				$(".prateleira[id*=ResultItems]").QD_infinityScroll({ returnToTop: $("") });
		},
		qdSidemenuToggle:function(){
			var body = $(document.body);

			$(".qd-mobile-black-friday-search-btn-menu-toggle-wrap").click(function(){
				body.toggleClass('qd-sn-on');
			});

			$(".qd-overlay").click(function(){
				body.removeClass('qd-sn-on');
			});
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.productSeoManipulations();
			Product.PBM();
			Product.skuNameFix();
			Product.skuListSelection();
			Product.skuListSelectionMobile();
			Product.productComponent();
			Product.saude01();
			Product.orderProduct();
			Product.buyQuantity(); // Executar após: Product.skuListSelection();
			Product.selectSku();
			Product.seeReview();
			Product.OtherPaymentMethod();
			Product.productOtherPaymentMethodVisibility();
			Product.addFile();
			Product.checkDeliveryAvailability();
			Product.skuUrlHash(); // Executar após: Product.selectSku();
			Product.setShowTab();
			Product.addFlagInmetro();
			Product.addBodyClass();
			Product.iframeResize();
			Product.insertSkuModalCustomize();
			Product.giftlistModalButtons();
			Product.qdProductUsesContent();
			Product.shippingTableFormat();
			Product.showShortDescription();

			$(document).ajaxComplete(function() {
				Product.skuUrlHash();
			});
		},
		ajaxStop: function() {},
		windowOnload: function() {
			Product.skuUrlHash();
			Product.addThis();
		},
		productSeoManipulations: function() {
			$.fn.jqzoom = function (options) {
				$('.product-image-wrap img').each(function() {
					$(this).attr('alt', $('.product-name .productName').text());
				});
				return this.each(function () {
					var node = this.nodeName.toLowerCase();
					if (node == 'a') {
						new jqzoom(this, options);
					}
				});
			};
		},
		PBM: function() {
			try {
				if(location.search.indexOf('utm_source=qd-pbm-tests') > -1)
					$.getScript("//qd-araujo-cdn.github.io/arquivos/PBM-functions.js");
				else if(location.search.indexOf('utm_source=qd-pbm-local-tests') > -1)
					$.getScript("//localhost:8080/araujo-pbm/PBM-functions.js");
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		shippingTableFormat: function() {
			window.ajaxShippin = function(method, url, postData, target, callback) {
				$.ajax({
					type: method,
					url: url,
					data: postData,
					success: function (dataResult) {
						var data = $(dataResult);

						data.find('td:contains("Frete Motociclista")').html('Motociclista - Até 3 horas<br /><strong class="product-qd-v1-freight-table-observation">Obs: a entrega com motociclista funciona das 07h às 22h</strong>');
						data.find('td:contains("Frete Agendada")').html('Motociclista Agendada - Até 3 horas<br /><strong class="product-qd-v1-freight-table-observation">Obs: a entrega com motociclista funciona das 07h às 19h<br />Pedidos realizados após as 22h poderão ser agendados das 09h às 12h do dia seguinte</strong>');

						$(target).html(data).show();
					},
					error: function (xhr, status, error) {
						$(target).html(status).show();
					}
				});
			}
		},
		qdProductUsesContent: function() {
			var wrapper = $('.product-qd-v1-uses-content');
			var modalShipping = $('.modal').first().clone().appendTo(document.body).addClass('product-qd-v1-modal-shipping-freight').removeClass('qd-v1-modal').removeClass('modal').removeClass('qd-common-modal');
			var modalPayment = $('.modal').clone().appendTo(document.body).addClass('product-qd-v1-modal-payment').removeClass('qd-v1-modal').removeClass('modal').removeClass('qd-common-modal');

			// SHIPPING
			modalShipping.find('.modal-body').append($(".product-qd-v1-shipping-freight-result"));
			modalShipping.find('.modal-body .shipping-value').click();

			wrapper.find('.product-qd-v1-uses-shipping-btn').click(function() {
				modalShipping.modal();
			});

			// PAYMENT
			function setIframe(sku) {
				modalPayment.find('.modal-body').html('<iframe src="/productotherpaymentsystems/' + sku + '" frameborder="0"></iframe>');
			};

			wrapper.find('.product-qd-v1-uses-payment-btn').click(function() {
				modalPayment.modal();
				setIframe(skuJson.skus[0].sku);
			});

			$(document).on("skuSelected.vtex", function(e, sku) {
				setIframe(sku);
			});

			if (!(vtxctx.departmentName.toLowerCase() === 'medicamentos' || vtxctx.departmentName.toLowerCase() === 'medicamentos especiais' || vtxctx.departmentName.toLowerCase() === 'saúde'))
				$('.know-more a').click();

			// DESCRIPTIONS
			wrapper.find('.product-qd-v1-uses-descriptions-btn').click(function() {
				$('html, body').stop().animate({
					'scrollTop': $('.specification [href="#specification"]').offset().top - 100
				}, 900, 'swing');

				if (vtxctx.departmentName.toLowerCase() === 'medicamentos' || vtxctx.departmentName.toLowerCase() === 'medicamentos especiais' || vtxctx.departmentName.toLowerCase() === 'saúde')
					return

				$('.know-more a').click();
			});
		},
		seeReview: function() {
			$('.product-evaluation-rate-wrap .btn-link').click(function() {
				$('.rating a').click();

				$('html, body').stop().animate({
					'scrollTop': $('.product-tabs').offset().top - 100
				}, 900, 'swing');
			})
		},
		addBodyClass: function() {
			$(document.body).addClass(
				"cat_name_" + vtxctx.categoryName.toLowerCase().trim().replaceSpecialChars().replace(/\s/g, "-") + " " +
				"cat_id_" + vtxctx.categoryId
			);
		},
		skuNameFix: function() {
			try{
				var elem = $(".fn.productName");
				elem.clone().removeClass("productName").addClass("qd-product-name").text(skuJson.name).insertBefore(elem);
				elem.hide();
			}
			catch(e){if (typeof console !== "undefined" && typeof console.info === "function") console.info("Ops, algo saiu errado com o nome do produto.", e.message); }
		},
		setShowTab: function() {
			if(!$(".product-tabs .product-specification img[src*='arj.selo_inmetro.']").length)
				$(".product-tabs .specification a").tab('show');
		},
		addFlagInmetro: function() {
			$("#caracteristicas:first img[src*='arj.selo_inmetro.']").clone().appendTo(".flag-inmetro");
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$("ul.thumbs a").each(function() {
						var $t = $(this);
						if ($t.attr("zoom"))
							return;
						var rel = $t.attr("rel");
						if (rel)
							$t.attr("zoom", rel.replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"));
					});
					orig.apply(this, arguments);
				}
			} catch (e) {if (typeof console !== "undefined" && typeof console.info === "function") console.info("Ops, algo saiu errado como zoom.", e.message); }
		},
		skuUrlHash: function() {
			var sku = (location.search.match(/idsku=([0-9]+)/i) || ['']).pop();
			sku = sku.length? sku: $.bbq.getState("sku");
			if(sku && !$(".skuList.qd-sku-list-selected-by-click").length){
				var skuList = $("a.buy-button[href*='sku=" + sku + "'], input.sku-notifyme-skuid[value='" + sku + "']").first().getParent(".skuList");
				var src = (skuList.find(".imageSku img:first").attr("src") || "").match(/ids\/[0-9]+/i);
				if(typeof src === "object" && typeof src[0] === "string" && !$(".image-zoom [src*='" + src[0] + "']").length)
					skuList.trigger("selectSku.qd_click");
				else if(!$(".skuList.qd-sku-list-selected").length)
					skuList.trigger("selectSku.qd_click");
			}
		},
		skuListSelection:function(){
			var wrapper = $(".product-sku-rich-selection");

			wrapper.find(".skuList").each(function(){
				$(this).addClass("row");
			});
			wrapper.find(".imageSku").each(function(){
				var $t = $(this);
				var nameSku = $t.find('+ .nomeSku').text();

				$t.addClass("col-xs-4").find('img').attr({
					title: nameSku,
					alt: nameSku
				});
			});
			wrapper.find(".nomeSku").each(function(){
				$(this).addClass("col-xs-8")
				.after('<div class="qd-sku-qtt-wrap col-xs-3"><div class="row"><div class="col-xs-30 text-center"> <a href="#" class="qd-add-btn qd-sq-more"> <i class="fa fa-angle-up"></i> </a> </div> </div> <div class="row"> <div class="col-xs-30"> <input type="tel" class="form-control input-type-text qd-sq-quantity" /> </div> </div> <div class="row"> <div class="col-xs-30 text-center"> <a href="#" class="qd-add-btn qd-sq-minus"> <i class="fa fa-angle-down"></i> </a> </div> </div> </div>')
				.wrapInner("<h2></h2>");
			});
			wrapper.find(".preco").each(function(){
				$(this).addClass("col-xs-7");
			});
			wrapper.find(".buy-button").each(function(){
				var listLink = $('<span class="qd-list-add-sku"><i class="fa fa-plus-circle"></i><a href="#"> Adicione à sua lista</a></span>').hide();
				$(this).wrap('<div class="col-xs-8"></div>').after(listLink);

				listLink.click(function(event) {
					if ($(document.body).is(".not-logged-user"))
						vtexid.start();
					else {
						$(this).getParent(".skuList").click();
						$(".glis-popup-link").click();
					}

					return false;
				});

				listLink.show();
			});
			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><a href="#" class="btn btn-xs notifyme-btn">Avise-me <span>Quando chegar</span></a></div>');
				btn.find("a").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$(this).prepend(btn);
			});
		},
		skuListSelectionMobile:function(){
			var wrapper = $(".product-qd-v1-sku-rich-selection");

			wrapper.find(".buy-button").each(function(){
				var listLink = $('<span class="qd-list-add-sku"><i class="fa fa-plus-circle"></i><a href="#"> Adicione à sua lista</a></span>').hide();
				$(this).wrap('<div class="qd-v1-buy-button-content"></div>').after(listLink);
				$(this).before('<div class="qd-sku-qtt-wrap"><div class="row"><div class="col-xs-30 text-center"> <a href="#" class="qd-add-btn qd-sq-more"> <i class="fa fa-angle-up"></i> </a> </div> </div> <div class="row"> <div class="col-xs-30"> <input type="tel" class="form-control input-type-text qd-sq-quantity" /> </div> </div> <div class="row"> <div class="col-xs-30 text-center"> <a href="#" class="qd-add-btn qd-sq-minus"> <i class="fa fa-angle-down"></i> </a> </div> </div> </div>');

				listLink.click(function(event) {
					$(this).getParent(".skuList").click();
					$(".glis-popup-link").click();
					return false;
				});

				listLink.show();
			});

			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><a href="#" class="btn btn-xs notifyme-btn">Avise-me <span>Quando chegar</span></a></div>');
				btn.find("a").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$(this).prepend(btn);
			});
		},
		buyQuantity: function() {
			var skuList = $(".skuList")
			skuList.QD_smartQuantity();

			skuList.on('QuatroDigital.sq_change', function(){
				var skuId = ( ($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || [''] ).pop();
				var qtt   = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				for (var i in skuJson.skus) {
					if(typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
						break;
					}
				}
			});
		},
		addThis:function(){
			if (!(typeof vtxctx !== "undefined" && typeof vtxctx.departmentyId !== "undefined" && vtxctx.departmentyId != 1 && vtxctx.departmentyId != 8 && vtxctx.departmentyId != 10 && vtxctx.departmentyId != 193))
				return;

			var html, userId, elem;
			window.addthis_config = window.addthis_config || {};

			// Configurações
			userId = "ra-52dd865c44ce39e7";
			window.addthis_config.data_track_addressbar = false;
			elem = $(".add-this");


			if (!elem.length) return;

			html = $('<div class="addthis_toolbox addthis_default_style ">'+
				'<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>'+
				'<a class="addthis_button_google_plusone" g:plusone:size="medium"></a>'+
				'<a class="addthis_button_tweet"></a>'+
				'<a class="addthis_counter addthis_pill_style"></a>'+
				'</div>');
			elem.append(html);
			$.getScript("//s7.addthis.com/js/300/addthis_widget.js#async=1&pubid=" + userId);
		},
		productComponent:function(){
			var text = $('.value-field.Principio-Ativo:first').text();

			$('.product-componet').text(text).removeClass("hide");
		},
		saude01: function(b) {
			var wrapper = $('.value-field.Informe-Ministerio-Saude-01:first');
			if(!wrapper.length)
				return;

			var text = wrapper.text();

			$('.saude01').text(text).removeClass("hide");

			if (text == '-') {
				$('.saude01').hide();
			};
		},
		orderProduct: function() {
			if(!$("body").is(".product-order"))
				return;

			var plugins = 0;
			var wrapper = $(".product-order-form");
			wrapper.find("[name=Telefone]").mask("(00) 0000-00009");

			var form = wrapper.find("form");

			// Adicionando a URL de produto
			form.append('<input type="hidden" name="Produto" value="' + location.href + '" />');
			// form.append('<input type="hidden" name="to[]" value="cl@g" />');
			form.append('<input type="hidden" name="to[]" value="st@a" />');
			form.append('<input type="hidden" name="to[]" value="rd@a" />');
			form.append('<input type="hidden" name="to[]" value="rs@a" />');
			// form.append('<input type="hidden" name="to[]" value="ff@a" />');
			form.append('<input type="hidden" name="to[]" value="wa@a" />');

			form.validate({
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Adicionando assunto
					$form.find('input[name="subject"]').remove();
					$form.append('<input type="hidden" name="subject" value="Produto encomenda [' + ($form.find("input[name=E-mail]").val() || "") + ']" />');

					var submitWrapper = $form.find("[type=submit]").parent();
					submitWrapper.addClass("qd-loading");

					$.ajax({
						url: "//web.araujo.com.br/araujo-site/email-site/general_email.php",
						data: $form.serialize(),
						type: "POST",
						dataType: "json",
						success: function(){
							submitWrapper.removeClass("qd-loading");
							$form.find(".form-succes").removeClass("hide");
							$form[0].reset();
						},
						error: function(){
							alert("Desculpe não foi possível enviar seu formulário.");
							submitWrapper.removeClass("qd-loading");
						}
					});

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		selectSku: function(){
			var wrapper = $(".skuList");

			wrapper.on("selectSku.qd_click", function() {
				try{
					var $t = $(this);

					var buyButton = $t.find(".buy-button");
					if(buyButton.length)
						var skuId = buyButton.attr("href").match(/sku\=([0-9]+)/i)[1];
					else
						var skuId = $t.find(".sku-notifyme-skuid").val();

					var selectedSku;
					for(var i = 0; i < skuJson.skus.length; i++){
						if(skuJson.skus[i].sku == skuId){
							selectedSku = skuJson.skus[i];
							break;
						}
					}
					if(selectedSku)
						$(document).trigger("skuSelected.vtex", [skuId, selectedSku]);

					wrapper.removeClass("qd-sku-list-selected qd-sku-list-selected-by-click");
					$t.addClass("qd-sku-list-selected");

					// Adicionando as flags de promoções por SKU

				}
				catch(e){if (typeof console !== "undefined" && typeof console.info === "function") console.info("Problemas ao selecionar o SKU", e.message); };
			});

			wrapper.click(function() {
				var $t = $(this);
				$t.trigger("selectSku.qd_click");
				$t.addClass("qd-sku-list-selected-by-click");
			});
		},
		OtherPaymentMethod: function() {
			try{
				function setIframe(sku) {
					$("#vtex-other-payment-method").html('<iframe src="/productotherpaymentsystems/' + sku + '" frameborder="0"></iframe>');
				};

				$('a.vtex-other-payment-method').on('shown.bs.tab', function (e) {
					setIframe(skuJson.skus[0].sku);
					$(this).unbind(e);
				});

				$(document).on("skuSelected.vtex", function(e, sku) {
					setIframe(sku);
				});
			}
			catch(e){
				if (typeof console !== "undefined" && typeof console.error === "function")
					console.error(e.message);
			};
		},
		productOtherPaymentMethodVisibility: function (){
			function addBodyClass(sku) {
				if (sku.available)
					$(document.body).removeClass('product-other-payment-method-wrap-0');
				else
					$(document.body).addClass('product-other-payment-method-wrap-0');
			}

			addBodyClass(skuJson);

			$(document).on('skuSelected.vtex' , function(e, skuId , selectedSku){
				addBodyClass(selectedSku);
			});
		},
		addFile: function() {
			var file = ($(".productFileWrap a:first").attr("href") || "").trim();
			if(file == "")
				return;

			function addThumb(){
				var thumbs = $("ul.thumbs");
				var link = thumbs.find("a:first");
				thumbs.append('<li><a href="' + file + '" target="_blank" rel="' + (link.attr("rel") || "") + '" zoom="' + (link.attr("zoom") || "") + '"><img title="Bula" src="/arquivos/bula_normal.jpg"></a></li>');
			};

			addThumb();
			$(document).on("skuSelected.vtex", function(e, sku) {
				addThumb();
			});
		},
		checkDeliveryAvailability: function() {
			try{
				if(!(vtxctx.categoryId == 191 || vtxctx.categoryId == 192 || vtxctx.categoryId == 194 || vtxctx.categoryId == 46 || vtxctx.categoryId == 252 || vtxctx.categoryId == 272 || vtxctx.categoryId == 292 || vtxctx.categoryId == 282 || vtxctx.categoryId == 287 || vtxctx.categoryId == 302 || vtxctx.categoryId == 297 || vtxctx.categoryId == 257 || vtxctx.categoryId == 277 || vtxctx.categoryId == 307 || vtxctx.categoryId == 262 || vtxctx.categoryId == 267))
					return;

				var displayModal = true;
				window.QD_smartCartAllowBuy = false;

				$(".buy-button").click(function(e) {
					// Não reabre o popup se o cep já foi validado
					if(!displayModal)
						return;
					
					try{
						e.preventDefault();

						var $t = $(this);
						var sku = $t.attr("href").match(/sku\=([0-9]+)/i)[1];
						// var qtt = $t.getParent(".skuList").find(".qd-sq-quantity");
						
						var modal = $(".qd-common-modal, .qd-v1-modal").first().clone();
						modal.appendTo(document.body);
						modal.addClass("product-modal-shipping");

						// Header
						var header = modal.find(".modal-header");
						header.children(":not(.close)").remove();
						header.append('<h3>Verificar disponibilidade de entrega</h3>');

						// Body
						var body = modal.find(".modal-body").empty();
						body.append('<form class="qd-shipping-check"><p>Digite seu CEP: <input type="text" name="cep" class="required" placeholder="Qual o CEP?"/><button>Verificar</button><a href="http://www.buscacep.correios.com.br/servicos/dnec/menuAction.do?Metodo=menuLogradouro">Não sei meu CEP</a></p></form>');
						body.append('<div class="shipping-not-available"><p>Infelizmente não entregamos produtos refrigerados nesta região.' + (vtxctx.categoryId == 191 || vtxctx.categoryId == 194? "<br />Consulte a possibilidade através do telefone 0300-313-1010." : "") + '</p><div><button class="new-cep">Inserir novo CEP</button><button data-dismiss="modal">Continuar comprando</button></div></div>');
						body.find("[name=cep]").mask("00000-000");
						body.find(".new-cep").click(function() {
							body.find(".qd-shipping-check").slideDown();
							body.find(".shipping-not-available").slideUp();
						});
						body.find("form").validate({
							submitHandler: function(form){
								var $form = $(form);

								if(!$form.valid())
									return;

								$.ajax({
									url: "/frete/calcula/" + sku + "?shippinCep=" + body.find("[name=cep]").val().replace("-", "") + "&quantity=1",
									dataType: "html",
									success: function(data) {
										var $d = $(data);
										if ($d.filter(".cep-invalido").length || $d.find(".cep-invalido").length) {
											body.find(".qd-shipping-check").slideUp();
											body.find(".shipping-not-available").slideDown();
										} else {
											modal.modal("hide");
											window.QD_smartCartAllowBuy = true;
											displayModal = false;
											$t.trigger("click.qd_bb_buy_sc");
											$t.unbind(e);
										}
									},
									error: function() {
										alert("Houve um erro ao tentar buscar os dados para o CEP informado");
									}
								});

								return false;
							},
							errorPlacement: function(error, element) {}
						});

						// Ações
						modal.on("hidden.bs.modal", function(){
							modal.remove();
						});
						modal.modal();
					}
					catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
				});
			}
			catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
		},
		iframeResize: function(){
			try{
				if(!$("body").is(".prod-buybutton"))
					return;

				window.parent.Common.setIframeSize($("body").outerHeight(true) + 5);

				$(window).scroll(function(){
					window.parent.Common.setIframeSize($("body").outerHeight(true) + 5);
				});
			}
			catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
		},
		insertSkuModalCustomize: function() {
			if(typeof window.BindEvents != 'function')
				return;

			var listId = $.bbq.getState('qdlistid');
			var orig = window.BindEvents;

			window.BindEvents = function() {
				var wrapper = $('#TB_window');
				wrapper.find('.glis-create').insertAfter(wrapper.find('.glis-mylist'));

				var elem = $('#TB_ajaxContent');
				if(!elem.find('.giftlist-qd-v1-loading').length)
					elem.append('<div class="giftlist-qd-v1-loading"></div>');

				// Remove as listas que não podem ser utilizadas por clientes
				Product.removeGiftlistTypes(wrapper.find('.glis-newlisttype'));

				// Adicionando botões de seleção de listas
				var list = $('<ul class="qd-wishlist-type"></ul>');
				var form = wrapper.find(".glis-create-form");
				wrapper.find('.glis-newlisttype option').each(function() {
					var $t = $(this);
					var value = ($t.attr('value') || '').trim();

					if(value == '12')
						$('<li></li>').appendTo(list).click(function() {
							$t.parent().val(value).change();
							form.stop().slideDown();
							$('#TB_ajaxContent').animate({scrollTop: $(this).outerHeight(true) + 200});
						}).html('<div><h5>' + $t.text() + '</h5><p>Cada presente comprado por seus convidados será entregue individualmente no endereço que você tiver escolhido.</p><button>Escolher lista</button></div>');
					else if(value == '11')
						$('<li></li>').appendTo(list).click(function() {
							$t.parent().val(value).change();
							form.stop().slideDown();
							$('#TB_ajaxContent').animate({scrollTop: $(this).outerHeight(true) + 200});
						}).html('<div><h5>' + $t.text() + '</h5><p>Os presentes comprados por seus convidados se tornam créditos para você utilizar no site da Araujo.</p><button>Escolher lista</button></div>');
				});
				wrapper.find('.qd-wishlist-type').remove();
				wrapper.find('.glis-new-title').after(list);
				form.hide();

				orig.apply(this, arguments);

				if(listId)
					$('a[rel="' + listId + '"]:not(.qd-gfl-on)').addClass('qd-gfl-on').click();
			};
		},
		removeGiftlistTypes: function(select) {
			// Caso esteja no stable eu não removo
			if(location.host.toLowerCase() == 'araujo.vtexcommercestable.com.br')
				return;

			$(select).find('option').each(function() {
				var $t = $(this);
				var value = ($t.attr('value') || '').trim();
				if(value == '9' || value == '10')
					$t.remove();
			});
		},
		giftlistModalButtons: function() {
			if(typeof window.ShowInsertedSuccess != 'function')
				return;

			var ShowInsertedSuccess = window.ShowInsertedSuccess;
			window.ShowInsertedSuccess = function() {
				ShowInsertedSuccess.apply(this, arguments);

				var elem = $("#TB_window .glis-save");
				var newElem = elem.clone().removeClass('glis-save').addClass('qd-giftlist-saved').removeAttr('style').hide().insertBefore(elem).slideDown();
				newElem.nextAll().addClass('hide');
				$('<a href="#" class="qd-giftlist-continue-link">Continuar navegando</a>').insertAfter(newElem.find('.glis-save-edit')).wrap('<li class="qd-giftlist-continue"></li>').click(function() {
					tb_remove();
					return false;
				});
			};
		},
		showShortDescription:function(){
			if ($(".product-qd-v1-short-description-wrap > *").length)
				$('.product-qd-v1-short-description').removeClass('hide');

				var wrapper = $(".product-qd-v1-short-description");

				wrapper.find('.product-qd-v1-uses-descriptions-btn').click(function() {
					$('html, body').stop().animate({
						'scrollTop': $('.specification [href="#specification"]').offset().top - 100
					}, 900, 'swing');
				});
		}
	};

	var Institutional = {
		init: function() {
			Institutional.storeLocator();
			Institutional.medEspCarousel();
			Institutional.presidentContact();
			Institutional.medicalForm();
			Institutional.contactForm();
			Institutional.convenioContact();
			Institutional.brandOwlCarouselPPC();
			Institutional.tabFrontlinePulgasPiolhosCarrapatos();
			Institutional.tabExpertAnswers();
			Institutional.sandozQuestionnaire();
			Institutional.servicesPage();
			Institutional.qdIframeMsgs();
			Institutional.qdBlackFridayCount();
			Institutional.qdBlackFridayNews();
			Institutional.demarcenterBannerResponsive();
			Institutional.demarcenterBannerSlide();
			Institutional.demarcenterOwlCarousel();
			Institutional.qdBlackFridayForm();
			Institutional.applySlickWeleda();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		qdBlackFridayForm: function() {
			if(!$("body").is(".hotsite.black-friday"))
				return;

			var form = $('.black-friday-qd-v1-form form');
			form.find('.qd_form_birth').mask('00/00/0000');

			form.validate({
				rules: {email: true},
				submitHandler: function(form){
					var $form = $(form);

					$form.find('.qd_form_submit').addClass('loading');

					if(!$form.valid())
						return;

					try {
						var date = $form.find('.qd_form_birth').val().split('/');
						var newDate = new Date(date[2], date[1] - 1, date[0]);

						window.dataLayer.push({
							event: "GA Events",
							ga_event_category: 'BlackFriday',
							ga_event_action: 'BlackFriday',
							ga_event_label: document.location.href
						});

						lc.sendData({
							evento : "BlackFriday",
							nm_email : $form.find('.qd_form_email').val(),
							vars : {
								nome : "João",
							},
							lista : {
								nm_lista : "BlackFriday",
								nome_bf: $form.find('.qd_form_name').val(),
								nm_email: $form.find('.qd_form_email').val(),
								nascimento_bf: newDate,
								sexo_bf: $form.find('.qd_form_gender').val()
							}
						});

						$('.black-friday-qd-v1').slideUp(500, function() {
							$('.black-friday-qd-v2').removeClass('hide').slideDown();
						});

						$('.qd_name_user').text($form.find('.qd_form_name').val());
						$('.qd_email_user').attr('href', 'mailto:' + $form.find('.qd_form_email').val()).text($form.find('.qd_form_email').val());

						$('html, body').stop().animate({
							'scrollTop': 0
						}, 500, 'swing');
					} catch (e) {
						alert("Problemas ao enviar seu formulário, tente novamente");
					}

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		applySlickWeleda: function() {
			if(!$("body").is(".hotsite-waleda"))
				return

			var wrapper = $('.product-carousel-slick');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
				nextArrow: '<button type="button" class="slick-next slick-arrow"></button>',
				slidesToShow: 3,
				infinite: true,
				draggable: false,
				speed: 400,
				centerMode: true,
				centerPadding: '100px'
			});

			wrapper.each(function(){
				$(this).find('.slick-arrow').appendTo($(this));
			});

		},
		storeLocator: function(){
			if(!$("body").is(".lojas"))
				return;

			$(".tpl-content").html('<iframe src="//saas.smartgeo.com.br/araujo/index.asp?acao=pesquisa&' + (location.search || "").replace("?", "") + '" width="100%" height="592px" frameborder="0" scrolling="auto"></iframe>');
		},
		demarcenterOwlCarousel: function() {
			var wrapper = $('.content-block-dermacenter-owl-carousel');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('content-block-title').insertBefore(wrap);
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		demarcenterBannerSlide: function(){
			if(typeof $.fn.cycle !== "function")
				return;

			var elem = $("body.institucional-dermacenter .content-block-slider");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<span class='pager-item'></span>");
			});

			elem.append('<div class="slider-pager padding-t-md padding-b-sm text-center"></div>');

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".slider-pager"
			});
		},
		demarcenterBannerResponsive: function(){
			$("body.institucional-dermacenter .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr("href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}));

				$t.parent().addClass( cols.length ? cols.join(" ") : "" );
			});
		},
		qdBlackFridayNews: function() {
			if (!$(document.body).is('.black-friday'))
				return;

			var elem = $(".qd_news_black_friday");
			elem.QD_news({
				defaultName : "Seu nome",
				defaultEmail : "Seu e-mail",
				successCallback: function() {
					elem.children("div").empty().after('<div class="text-center font-size-h3"><i class="fa fa-check-circle"></i> Obrigado!</div>');
				}
			});
		},
		qdBlackFridayCount: function() {
			if (!$(document.body).is('.black-friday'))
				return;

			$(".qd-black-friday-form-countdown").countdown('2017/11/24', function(event) {
				var totalHours = event.offset.totalDays * 24 + event.offset.hours;
				$(this).html(event.strftime('<div class="clock-wrap"> <div class="days"> <span>%D</span> <small>Dias</small> </div> <div class="hours"> <span>%H</span> <small>Horas</small> </div> <div class="double-dots"> <span>:</span> </div> <div class="minutes"> <span>%M</span> <small>Minutos</small> </div> <div class="double-dots"> <span>:</span> </div> <div class="seconds"> <span>%S</span> <small>Segundos</small> </div> </div>'));
			});
		},
		tabExpertAnswers: function() {
			if(!$("body").is(".loja-nestle-especialista-responde"))
				return;

			$(".content-question-answer-area .title-question-answer-area").click(function() {
				var $t = $(this);

				$t.getParent(".content-question-answer-area").find(".text-question-answer-area").slideToggle("slow");
				$t.getParent(".content-question-answer-area").toggleClass("active");
			});
		},
		qdIframeMsgs: function() {
			try {
				var frame = $(".qd-iframe-cdn");
				if(!frame.length)
					return;

				var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
				var eventer = window[eventMethod];
				var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
				eventer(messageEvent, function (e) {
					var data = e.data || "";
					if(data.indexOf("qd-iframe-cdn") > -1)
						frame.height(e.data.split("|").pop());
					else if(data.indexOf("qd-iframe-scroll") > -1)
						$('html, body').stop().animate({ scrollTop:frame.offset().top + parseInt(e.data.split("|").pop(), 10) - 60 });
				}, false);
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		convenioContact: function() {
			if(!$("body").is(".convenio"))
				return;

			var form = $(".formulario form");
			form.find("#form_telefone").mask("(00) 0000-00009");
			form.find("#form_cnpj").mask("00.000.000/0000-00");

			// Adicionando destinatários
			// form.append('<input type="hidden" name="to[]" value="cl@g" />');
			form.append('<input type="hidden" name="to[]" value="cv@a" />');

			form.validate({
				rules: {
					Telefone: {
						minlength: 14
					}
				},
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Adicionando assunto
					$form.find('input[name="subject"]').remove();
					$form.append('<input type="hidden" name="subject" value="Convênio [' + ($form.find("#form_telefone").val() || "") + ']" />');

					var submitWrapper = $form.find("[type=submit]").parent();
					submitWrapper.addClass("qd-loading");
					$.jsonp({
						url: "//web.araujo.com.br/araujo-site/email-site/general_email.php?callback=?",
						data: $form.serialize(),
						dataType: "jsonp",
						callback: "convenio_contact_callback",
						success: function(){
							submitWrapper.removeClass("qd-loading");
							$form.find(".form-succes").removeClass("hide");
							$form[0].reset();
						},
						error: function(){
							alert("Desculpe não foi possível enviar seu formulário.");
							submitWrapper.removeClass("qd-loading");
						}
					});

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		presidentContact: function(){
			// Fale com o presidente
			if(!$("body").is(".fale-com-o-presidente"))
				return;

			var form = $(".institutional-contact form");
			form.find("#qd_form_phone").mask("(00) 0000-00009");

			// Adicionando destinatários
			// form.append('<input type="hidden" name="to[]" value="cl@g" />');
			// form.append('<input type="hidden" name="to[]" value="pr@a" />');

			form.validate({
				rules: {Telefone: {minlength: 14 } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp",
								success: function(data) { sendData(data.ip); },
								error: function(data) { sendData(null); }
							}); } });

							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										email: email,
										fullName: $form.find("#qd_form_name").val() || null,
										firstName: $form.find("#qd_form_first_name").val() || null,
										lastName: $form.find("#qd_form_last_name").val() || null,
										ip: ip,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										phone: phone,
										subject: 'fale_com_presidente',
										userId: userId
									}),
									success: function(data){ $form.find(".form-succes").removeClass("hide"); $form[0].reset(); },
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data){
								if(data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!");}
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		medicalForm: function(){
			if(!$(document.body).is(".cadastro-medico"))
				return;

			var form = $(".medical-form > form");
			form.find("#dt_nascimento").mask("00/00/0000");
			form.find("#cpf").mask('000.000.000-00');
			form.find("#cep").mask('00000-000');
			form.find("#celular, #telefone").mask('(00) 0000-00009');

			// Preenchendo o endereço a partir do CEP
			var cepInputs = form.find("#rua, #cidade, #bairro, #estado");
			var cep = form.find("input[name=cep]");
			cep.keyup(function(e) {
				if((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						form.find("#rua").val(data.street || "");
						form.find("#bairro").val(data.neighborhood || "");
						form.find("#cidade").val(data.city || "");
						form.find("#estado").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					var submitWrapper = $form.find("[type=submit]").parent();
					submitWrapper.addClass("qd-loading");

					(function() {
						var saveContact = function(userId) {
							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CM/documents",
								type: "POST",
								dataType: "json",
								headers: {
									"Accept": "application/vnd.vtex.ds.v10+json",
									"Content-Type": "application/json; charset=utf-8"
								},
								data: JSON.stringify({
									fullName: $form.find("#nome").val() || null,
									email: $form.find("#email").val() || null,
									birthDate: ($form.find('#dt_nascimento').val() || '').split('/').reverse().join('-'),
									celPhone: '+55' + ($form.find("#celular").val() || '').replace(/[^0-9]/ig, ''),
									homePhone: '+55' + ($form.find("#telefone").val() || '').replace(/[^0-9]/ig, ''),
									city: $form.find("#cidade").val() || null,
									complement: $form.find("#complemento").val() || null,
									cpf: ($form.find("#cpf").val() || '').replace(/[^0-9]/ig, ''),
									crm: ($form.find("#crm").val() || '').replace(/[^0-9]/ig, ''),
									crmUf: $form.find("#uf").val() || null,
									gender: $form.find("#sexo").val() || null,
									know: (($form.find("#como_soube").val() || $form.find("#outros").val())|| null),
									mainSpecialty: $form.find("#especialidade").val() || null,
									neighborhood: $form.find("#bairro").val() || null,
									number: $form.find("#numero").val() || null,
									postalCode: $form.find("#cep").val() || null,
									state: $form.find("#estado").val() || null,
									street: $form.find("#rua").val() || null,
									termsConditions: $form.find("#aviso_legal").is(":checked"),
									userid: userId
								}),
								success: function(data) {
									submitWrapper.removeClass("qd-loading");
									$form.find(".form-succes").removeClass("hide");
									$form[0].reset();
								},
								error: function() {
									alert("Desculpe não foi possível enviar seu formulário.");
									submitWrapper.removeClass("qd-loading");
								}
							});
						};

						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + $form.find("#email").val() || null,
							type: "GET",
							dataType: "json",
							headers: {
								Accept: "application/vnd.vtex.ds.v10+json"
							},
							success: function(data) {
								if (data.length) saveContact(data[0].id);
								else {
									saveContact(null);
								}
							},
							error: function() {
								alert("Desculpe, não foi possível enviar seu formulário!");
							}
						});
					})();


					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		contactForm: function(){
			if(!$(document.body).is(".atendimento"))
				return;

			var form = $(".institutional-contact form");
			form.find("#qd_form_phone").mask('(00) 0000-00009');

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp",
								success: function(data) { sendData(data.ip); },
								error: function(data) { sendData(null); }
							}); } });

							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										email: email,
										fullName: $form.find("#qd_form_name").val() || null,
										firstName: $form.find("#qd_form_first_name").val() || null,
										lastName: $form.find("#qd_form_last_name").val() || null,
										ip: ip,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										phone: phone,
										subject: $form.find("#qd_form_subject").val() || null,
										userId: userId
									}),
									success: function(data){ $form.find(".form-succes").removeClass("hide"); $form[0].reset(); },
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data){
								if(data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!");}
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		medEspCarousel: function(){
			if(!$("body").is(".medicamentos-especiais"))
				return;

			$(".jcarousel-skin-brands").owlCarousel({
				items: 5,
				navigation: true,
				pagination: false,
				slideSpeed: 500,
				autoPlay : 3000
			});
		},
		brandOwlCarouselPPC:function(){
			if ($(document.body).is('.black-friday'))
					return;

			$(".tpl-content .QD.prateleira").each(function(){
				$(this).children("ul").wrapAll('<div class="qd-shelf-owl-carousel"></div>').parent().owlCarousel({
					items: 4,
					navigation: true,
					pagination: false,
					slideSpeed: 500,
					stopOnHover: true,
					afterInit: function(wrappper){
						var height = 0;
						var li = wrappper.find("li[layout]");
						li.each(function() {
							var h = $(this).height();
							if(h > height)
								height = h;
						});
						li.height(height);
					}
				});
			});
		},
		tabFrontlinePulgasPiolhosCarrapatos: function() {
			if ($("body.pulgas-piolhos-carrapatos").length > 0){
				$(".content-block-menu a").click(function() {
					var $t = $(this)
					var tab = $t.attr("href");

					event.preventDefault();
					$t.addClass("active").parent().siblings().find("a").removeClass("active");
					$(".content-block .row > div").not(tab).css("display", "none");
					$(tab).fadeIn();
				});
			}
		},
		sandozQuestionnaire: function() {
			if(!$(document.body).is(".sandoz-disfuncaoeretil"))
				return;

			var result = $(".questionnaire-result, .questionnaire-result +span");
			var resultValue = result.find(".result-value");
			var resultText = result.find(".result-text");

			var wrapper = $(".questionnaire-content");
			wrapper.each(function() {
				var li = $(this).find("li");
				li.click(function() {
					li.removeClass("qd-selected");
					$(this).addClass('qd-selected');

					if(wrapper.length == wrapper.find(".qd-selected").length){
						var sum = 0;
						wrapper.find(".qd-selected").each(function() {
							sum = sum + parseInt($(this).attr("data-value"), 10) || 0;
						});

						if(sum <= 14)
							resultValue.text(sum);
						else{
							resultValue.text(sum);
							resultText.text("Obrigado pela participação.*");
						}

						result.slideDown();
					}
				});
			});
		},
		servicesPage: function() {
			if(!$(document.body).is(".institutional-service"))
				return;

			$(".services-table a").click(function() {
				var link = $(this).attr("href");

				if(link.indexOf("#") != 0)
					return;

				var item = $(link);
				var modal = $(".modal");
				var header = modal.find(".modal-header");
				header.find(":not(button)").remove();
				header.prepend('<h4 class="modal-title">' + item.find(".top_click_servicos").text() + '</h4>');
				item.find(".p_01").appendTo(modal.find(".modal-body").empty());
				modal.modal();

				return false;
			});
		}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
			Orders.ordersRequestWatch();
			Orders.orderAgain();
		},
		ajaxStop: function() {
			Orders.shippingTracking();
			Orders.orderViewTraking();
		},
		windowOnload: function() {},
		bootstrapCssFix: function() {
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf('io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css') > -1) {
					styleSheets[i].disabled = true;
					break;
				}
			}
		},
		orderAgain: function() {
			var orders;

			$(document).ajaxSuccess(function(event, jqXHR, ajaxOptions, data) {
				if(ajaxOptions.url.toLowerCase().indexOf('/api/checkout/pub/orders') == 0)
					orders = data;
			});

			$('.orders-content .myorders').on('click', '.repeat-order a', function() {
				if(!(typeof orders == 'object' && orders.length))
					return;

				var groupId = (this.href || '').replace(/\/$/, '').split('/').pop();
				if(!groupId.length)
					return;

				var items = {};
				var sc = '';
				for(var i = 0; i < orders.length; i++){
					if(orders[i].orderGroup == groupId){
						for(var k = 0; k < orders[i].items.length; k++){
							items[orders[i].items[k].id] = {
								sku: orders[i].items[k].id,
								qty: items[orders[i].items[k].id] && items[orders[i].items[k].id].qty? items[orders[i].items[k].id].qty + orders[i].items[k].quantity: orders[i].items[k].quantity,
								seller: orders[i].items[k].seller
							};
							sc = orders[i].salesChannel;
						}
						break;
					}
				}

				var link = [];
				for(var c in items)
					link.push('sku=' + items[c].sku + '&qty=' + items[c].qty + '&seller=' + items[c].seller);

				this.href = '/checkout/cart/add?' + link.join('&') + '&sc=' + sc;
			});
		},
		orderViewTraking: function() {
			try {
				var btnExibir = $('#my-orders-container').find("span:contains('Exibir dados de rastreio')");
				var btnRastrear = $('#my-orders-container').find("a[href*=intelipost]");
				
				if(btnExibir.length) btnExibir.trigger('click');
				if(btnRastrear.length) btnRastrear.attr('target','_blank').html("<span>Clique aqui para acompanhar o rastreamento do seu pedido</span>");
				
				window.addEventListener("hashchange", Orders.orderViewTraking);
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		shippingTracking: function() {
			try {
				var number = $(".trackingInfo").find("span[data-bind*='trackingNumber'], a[data-bind*='trackingNumber']");

				if(!number.length)
					return;

				number.each(function() {
					var $t = $(this);
					var wrapper = $t.parent();

					if(wrapper.find(".qd-shipping-tracking").length)
						return;

					var shipping = $('<div class="qd-shipping-tracking">Carregando ... <img src="/arquivos/ajax-loader.gif" /></div>');
					wrapper.append(shipping);

					var row = new $;
					$.qdAjax({
						url: "http://chadebebe.araujo.com.br/correios-sro-json/correios-sro-json.php",
						data: {tracking: $t.text()},
						dataType: "json",
						success: function(data) {
							try{
								if(data.emptyResult){
									shipping.html('Essa encomenda ainda não possui informações de rastreio.');
									return;
								}

								var html;
								for(var i in data){
									if(!data[i].isOrigin){
										row.last().find("td:last").prepend('<span>' + data[i].site + '</span>');
										continue;
									}

									html = '<tr><td>';
									html += "<span>" + data[i].date.replace(" ", "</span><span>") + "</span>";
									html += '</td><td>';
									html += '<span class="qd-tracking-status qd-' + data[i].status.toLowerCase().replaceSpecialChars().replace(/[^a-z0-9_]/ig, "-") + '"><i class="fa"></i><i class="fa"></i></span>';
									html += '</td><td>';
									html += '<span><span>' + data[i].status + ' </span> | ' + data[i].site + '</span>';
									html += '</td></tr>';

									row = row.add($(html));
								}

								// Invertendo as linhas
								var newRows = new $;
								for(var i = row.length - 1; i >= 0; i--)
									newRows = newRows.add(row[i]);

								shipping.html($('<table></table>').append(newRows));

								// Adicionando separador
								newRows.not(":last").after('<tr><td></td><td><span class="qd-tracking-separator"><i class="fa fa-angle-double-down"></i></span></td><td></td></tr>');
							}
							catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
						},
						error: function() {
							shipping.html('Desculpe! Não foi possível obter as informações de rastreamento de seu pedido, por favor tente mais tarde.');
						},
						clearQueueDelay: null
					});
				});
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		ordersRequestWatch: function() {
			$(document).ajaxSuccess(function(event, jqXHR, ajaxOptions, data) {
				if(ajaxOptions.url.indexOf('api/checkout/pub/orders') < 0 || !data)
					return;

				for(var i = 0; i < data.length; i++){
					if(data[i].state == 'invoiced')
						$('#' + data[i].orderGroup).addClass('qd-show-tracking-code');
				}
			});
		}
	};

	var Account = {
		init: function() {
			Account.showEditAccountModal();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		showEditAccountModal: function() {
			if($.cookie("showEditAccountModal"))
				return;

			var utm = JSON.parse($.cookie("qdUtmObj") || "{}");

			// Se o usuário não veio da UTM, então ignoro ele
			if(!((utm.medium || "").toLowerCase() == "email" && (utm.campaign || "").toLowerCase() == "bem-vindo615" && (utm.source || "").toLowerCase() == "allincrm"))
				return;

			$(".edit-profile-link #edit-data-link").click();
			var input = $(".profile-detail-form-personal-data #birthDate");
			if(input.val() == "")
				input.val("1");

			// Observo os dados enviados por Ajax, para não abrir o modal caso o usuário já tenha inserido os dados
			$( document ).ajaxSuccess(function(e, xhr, settings) {
				if(settings.url == "/no-cache/account/profile/save")
					$.cookie("showEditAccountModal", 1);
			});
		}
	};
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".departamento, .categoria")) Departament.windowOnload();
			else if (body.is(".resultado-busca")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".account")) Account.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".departamento, .categoria")) Departament.ajaxStop();
			else if (body.is(".resultado-busca")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".account")) Account.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".departamento, .categoria")) Departament.init();
			else if (body.is(".resultado-busca")) Search.init();
			else if (body.is(".produto")) Product.init();
			else if (body.is(".institucional")) Institutional.init();
			else if (body.is(".account")) Account.init();
			else if (body.is(".orders")) Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		Common.run();
		if(location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* $("a").getParent("ul"); // 2.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a.filter(c):a.length?a.getParent(c):a}})(jQuery);
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* jQuery OwlCarousel v1.3.3 // Copyright (c) 2013 Bartosz Wojciechowski // http://www.owlgraphic.com/owlcarousel/ // Licensed under MIT */
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);
/*! purl v2.3.1 | MIT */
(function(factory){if(typeof define==="function"&&define.amd){define(factory)}else{window.purl=factory()}})(function(){var tag2attr={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},key=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],aliases={anchor:"fragment"},parser={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},isint=/^[0-9]+$/;function parseUri(url,strictMode){var str=decodeURI(url),res=parser[strictMode||false?"strict":"loose"].exec(str),uri={attr:{},param:{},seg:{}},i=14;while(i--){uri.attr[key[i]]=res[i]||""}uri.param["query"]=parseString(uri.attr["query"]);uri.param["fragment"]=parseString(uri.attr["fragment"]);uri.seg["path"]=uri.attr.path.replace(/^\/+|\/+$/g,"").split("/");uri.seg["fragment"]=uri.attr.fragment.replace(/^\/+|\/+$/g,"").split("/");uri.attr["base"]=uri.attr.host?(uri.attr.protocol?uri.attr.protocol+"://"+uri.attr.host:uri.attr.host)+(uri.attr.port?":"+uri.attr.port:""):"";return uri}function getAttrName(elm){var tn=elm.tagName;if(typeof tn!=="undefined")return tag2attr[tn.toLowerCase()];return tn}function promote(parent,key){if(parent[key].length===0)return parent[key]={};var t={};for(var i in parent[key])t[i]=parent[key][i];parent[key]=t;return t}function parse(parts,parent,key,val){var part=parts.shift();if(!part){if(isArray(parent[key])){parent[key].push(val)}else if("object"==typeof parent[key]){parent[key]=val}else if("undefined"==typeof parent[key]){parent[key]=val}else{parent[key]=[parent[key],val]}}else{var obj=parent[key]=parent[key]||[];if("]"==part){if(isArray(obj)){if(""!==val)obj.push(val)}else if("object"==typeof obj){obj[keys(obj).length]=val}else{obj=parent[key]=[parent[key],val]}}else if(~part.indexOf("]")){part=part.substr(0,part.length-1);if(!isint.test(part)&&isArray(obj))obj=promote(parent,key);parse(parts,obj,part,val)}else{if(!isint.test(part)&&isArray(obj))obj=promote(parent,key);parse(parts,obj,part,val)}}}function merge(parent,key,val){if(~key.indexOf("]")){var parts=key.split("[");parse(parts,parent,"base",val)}else{if(!isint.test(key)&&isArray(parent.base)){var t={};for(var k in parent.base)t[k]=parent.base[k];parent.base=t}if(key!==""){set(parent.base,key,val)}}return parent}function parseString(str){return reduce(String(str).split(/&|;/),function(ret,pair){try{pair=decodeURIComponent(pair.replace(/\+/g," "))}catch(e){}var eql=pair.indexOf("="),brace=lastBraceInKey(pair),key=pair.substr(0,brace||eql),val=pair.substr(brace||eql,pair.length);val=val.substr(val.indexOf("=")+1,val.length);if(key===""){key=pair;val=""}return merge(ret,key,val)},{base:{}}).base}function set(obj,key,val){var v=obj[key];if(typeof v==="undefined"){obj[key]=val}else if(isArray(v)){v.push(val)}else{obj[key]=[v,val]}}function lastBraceInKey(str){var len=str.length,brace,c;for(var i=0;i<len;++i){c=str[i];if("]"==c)brace=false;if("["==c)brace=true;if("="==c&&!brace)return i}}function reduce(obj,accumulator){var i=0,l=obj.length>>0,curr=arguments[2];while(i<l){if(i in obj)curr=accumulator.call(undefined,curr,obj[i],i,obj);++i}return curr}function isArray(vArg){return Object.prototype.toString.call(vArg)==="[object Array]"}function keys(obj){var key_array=[];for(var prop in obj){if(obj.hasOwnProperty(prop))key_array.push(prop)}return key_array}function purl(url,strictMode){if(arguments.length===1&&url===true){strictMode=true;url=undefined}strictMode=strictMode||false;url=url||window.location.toString();return{data:parseUri(url,strictMode),attr:function(attr){attr=aliases[attr]||attr;return typeof attr!=="undefined"?this.data.attr[attr]:this.data.attr},param:function(param){return typeof param!=="undefined"?this.data.param.query[param]:this.data.param.query},fparam:function(param){return typeof param!=="undefined"?this.data.param.fragment[param]:this.data.param.fragment},segment:function(seg){if(typeof seg==="undefined"){return this.data.seg.path}else{seg=seg<0?this.data.seg.path.length+seg:seg-1;return this.data.seg.path[seg]}},fsegment:function(seg){if(typeof seg==="undefined"){return this.data.seg.fragment}else{seg=seg<0?this.data.seg.fragment.length+seg:seg-1;return this.data.seg.fragment[seg]}}}}purl.jQuery=function($){if($!=null){$.fn.url=function(strictMode){var url="";if(this.length){url=$(this).attr(getAttrName(this[0]))||""}return purl(url,strictMode)};$.url=purl}};purl.jQuery(window.jQuery);return purl});
// jQuery Mask Plugin v1.14.0 // github.com/igorescobar/jQuery-Mask-Plugin
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):"object"===typeof exports?module.exports=b(require("jquery")):b(jQuery||Zepto)})(function(b){var y=function(a,e,d){var c={invalid:[],getCaret:function(){try{var r,b=0,e=a.get(0),d=document.selection,f=e.selectionStart;if(d&&-1===navigator.appVersion.indexOf("MSIE 10"))r=d.createRange(),r.moveStart("character",-c.val().length),b=r.text.length;else if(f||"0"===f)b=f;return b}catch(g){}},setCaret:function(r){try{if(a.is(":focus")){var c,
b=a.get(0);b.setSelectionRange?(b.focus(),b.setSelectionRange(r,r)):(c=b.createTextRange(),c.collapse(!0),c.moveEnd("character",r),c.moveStart("character",r),c.select())}}catch(e){}},events:function(){a.on("keydown.mask",function(c){a.data("mask-keycode",c.keyCode||c.which)}).on(b.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",function(){n===
c.val()||a.data("changed")||a.trigger("change");a.data("changed",!1)}).on("blur.mask",function(){n=c.val()}).on("focus.mask",function(a){!0===d.selectOnFocus&&b(a.target).select()}).on("focusout.mask",function(){d.clearIfNotMatch&&!p.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],c,b,d,f,l=0;l<e.length;l++)(c=g.translation[e.charAt(l)])?(b=c.pattern.toString().replace(/.{1}$|^.{1}/g,""),d=c.optional,(c=c.recursive)?(a.push(e.charAt(l)),f={digit:e.charAt(l),pattern:b}):a.push(d||
c?b+"?":b)):a.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");f&&(a=a.replace(new RegExp("("+f.digit+"(.*"+f.digit+")?)"),"($1)?").replace(new RegExp(f.digit,"g"),f.pattern));return new RegExp(a)},destroyEvents:function(){a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(c){var b=a.is("input")?"val":"text";if(0<arguments.length){if(a[b]()!==c)a[b](c);b=a}else b=a[b]();return b},getMCharsBeforeCount:function(a,c){for(var b=0,d=0,
f=e.length;d<f&&d<a;d++)g.translation[e.charAt(d)]||(a=c?a+1:a,b++);return b},caretPos:function(a,b,d,h){return g.translation[e.charAt(Math.min(a-1,e.length-1))]?Math.min(a+d-b-h,d):c.caretPos(a+1,b,d,h)},behaviour:function(d){d=d||window.event;c.invalid=[];var e=a.data("mask-keycode");if(-1===b.inArray(e,g.byPassKeys)){var m=c.getCaret(),h=c.val().length,f=c.getMasked(),l=f.length,k=c.getMCharsBeforeCount(l-1)-c.getMCharsBeforeCount(h-1),n=m<h;c.val(f);n&&(8!==e&&46!==e&&(m=c.caretPos(m,h,l,k)),
c.setCaret(m));return c.callbacks(d)}},getMasked:function(a,b){var m=[],h=void 0===b?c.val():b+"",f=0,l=e.length,k=0,n=h.length,q=1,p="push",u=-1,t,w;d.reverse?(p="unshift",q=-1,t=0,f=l-1,k=n-1,w=function(){return-1<f&&-1<k}):(t=l-1,w=function(){return f<l&&k<n});for(;w();){var x=e.charAt(f),v=h.charAt(k),s=g.translation[x];if(s)v.match(s.pattern)?(m[p](v),s.recursive&&(-1===u?u=f:f===t&&(f=u-q),t===u&&(f-=q)),f+=q):s.optional?(f+=q,k-=q):s.fallback?(m[p](s.fallback),f+=q,k-=q):c.invalid.push({p:k,
v:v,e:s.pattern}),k+=q;else{if(!a)m[p](x);v===x&&(k+=q);f+=q}}h=e.charAt(t);l!==n+1||g.translation[h]||m.push(h);return m.join("")},callbacks:function(b){var g=c.val(),m=g!==n,h=[g,b,a,d],f=function(a,b,c){"function"===typeof d[a]&&b&&d[a].apply(this,c)};f("onChange",!0===m,h);f("onKeyPress",!0===m,h);f("onComplete",g.length===e.length,h);f("onInvalid",0<c.invalid.length,[g,b,a,c.invalid,d])}};a=b(a);var g=this,n=c.val(),p;e="function"===typeof e?e(c.val(),void 0,a,d):e;g.mask=e;g.options=d;g.remove=
function(){var b=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(b-c.getMCharsBeforeCount(b));return a};g.getCleanVal=function(){return c.getMasked(!0)};g.getMaskedVal=function(a){return c.getMasked(!1,a)};g.init=function(e){e=e||!1;d=d||{};g.clearIfNotMatch=b.jMaskGlobals.clearIfNotMatch;g.byPassKeys=b.jMaskGlobals.byPassKeys;g.translation=b.extend({},b.jMaskGlobals.translation,d.translation);g=b.extend(!0,{},g,d);p=c.getRegexMask();!1===e?(d.placeholder&&a.attr("placeholder",d.placeholder),
a.data("mask")&&a.attr("autocomplete","off"),c.destroyEvents(),c.events(),e=c.getCaret(),c.val(c.getMasked()),c.setCaret(e+c.getMCharsBeforeCount(e,!0))):(c.events(),c.val(c.getMasked()))};g.init(!a.is("input"))};b.maskWatchers={};var A=function(){var a=b(this),e={},d=a.attr("data-mask");a.attr("data-mask-reverse")&&(e.reverse=!0);a.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===a.attr("data-mask-selectonfocus")&&(e.selectOnFocus=!0);if(z(a,d,e))return a.data("mask",new y(this,
d,e))},z=function(a,e,d){d=d||{};var c=b(a).data("mask"),g=JSON.stringify;a=b(a).val()||b(a).text();try{return"function"===typeof e&&(e=e(a)),"object"!==typeof c||g(c.options)!==g(d)||c.mask!==e}catch(n){}};b.fn.mask=function(a,e){e=e||{};var d=this.selector,c=b.jMaskGlobals,g=c.watchInterval,c=e.watchInputs||c.watchInputs,n=function(){if(z(this,a,e))return b(this).data("mask",new y(this,a,e))};b(this).each(n);d&&""!==d&&c&&(clearInterval(b.maskWatchers[d]),b.maskWatchers[d]=setInterval(function(){b(document).find(d).each(n)},
g));return this};b.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};b.fn.unmask=function(){clearInterval(b.maskWatchers[this.selector]);delete b.maskWatchers[this.selector];return this.each(function(){var a=b(this).data("mask");a&&a.remove().removeData("mask")})};b.fn.cleanVal=function(){return this.data("mask").getCleanVal()};b.applyDataMask=function(a){a=a||b.jMaskGlobals.maskElements;(a instanceof b?a:b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A)};var p={maskElements:"input,td,span,div",
dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d}("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};b.jMaskGlobals=b.jMaskGlobals||{};p=b.jMaskGlobals=b.extend(!0,{},p,b.jMaskGlobals);
p.dataMask&&b.applyDataMask();setInterval(function(){b.jMaskGlobals.watchDataMask&&b.applyDataMask()},p.watchInterval)});
/* Quatro Digital - Smart Quantity // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(p){var e=jQuery;if("function"!==typeof e.fn.QD_smartQuantity){var g=function(e,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var d;"object"===typeof e?(e.unshift("[Quatro Digital - Smart Quantity]\n"),d=e):d=["[Quatro Digital - Smart Quantity]\n"+e];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,
d)}catch(g){console.info(d.join("\n"))}else try{console.error.apply(console,d)}catch(l){console.error(d.join("\n"))}else try{console.warn.apply(console,d)}catch(b){console.warn(d.join("\n"))}}},h={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1},k=function(f,c){function d(b,d,a){b.val(c.initialValue);b.change(function(){try{var b=e(this),a=parseInt(b.val().replace(/[^0-9-]/gi,""));!isNaN(a)&&a>c.initialValue?b.val(a):b.val(c.initialValue);
b.trigger("QuatroDigital.sq_change")}catch(d){g(d.message)}});d.click(function(a){a.preventDefault();b.val((parseInt(b.val())||c.initialValue)+1).change()});a.click(function(a){a.preventDefault();b.val((parseInt(b.val())||c.initialValue+1)-1).change()});b.change()}function h(b,d,a){b.on("QuatroDigital.sq_change",function(){(e(this).val()||0)<=c.initialValue?(a.addClass("qd-sq-inactive"),d.removeClass("qd-sq-inactive")):(d.addClass("qd-sq-inactive"),a.removeClass("qd-sq-inactive"))})}function l(b,
d){b.on("QuatroDigital.sq_change",function(){var a=d.attr("href")||"";0>a.toLowerCase().indexOf("/checkout/cart/add")||d.attr("href",a.replace(/qty\=[0-9]+/i,"qty="+(parseInt(b.val())||c.initialValue||1)))})}f.each(function(){try{var b=e(this),f=b.find(c.buyButton),a=b.find(c.qttInput),m=b.find(c.btnMore),n=b.find(c.btnMinus);if(!f.length||!a.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(a.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",
a],"info");a.addClass("qd-sq-on");h(a,m,n);l(a,f);d(a,m,n);e(window).on("vtex.sku.selected",function(){a.change()})}catch(k){g(k.message)}});e(window).trigger("QuatroDigital.sq_callback")};e.fn.QD_smartQuantity=function(f){var c=e(this);f=e.extend({},h,f);c.qdPlugin=new k(c,f);return c};e(function(){e(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/* * jQuery hashchange event - v1.2 - 2/11/2010 * http://benalman.com/projects/jquery-hashchange-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);
/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016 * http://jqueryvalidation.org/ * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){if(this.length){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=h&&g.check(e)))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),d in c||!b.objectLength(a(this).rules())?!1:(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e=a(c).attr("type"),f="Step attribute on input type "+e+" is not supported.",g=["text","number","range"],h=new RegExp("\\b"+e+"\\b"),i=e&&!h.test(g.join());if(i)throw new Error(f);return this.optional(c)||b%d===0},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
// jquery.jsonp 2.4.0 (c)2012 Julian Aubourg | MIT License // https://github.com/jaubourg/jquery-jsonp
(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery);
/* Quatro Digital - Scroll Toggle // 1.3 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital - Smart Buy Button // 1.19 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0);a(window).trigger("QuatroDigital.qd_sc_prodAdd",[e,d,b])};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");
b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),
h=[],k;if("object"===typeof g&&null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};
m.buyButtonClickCallback=function(a,b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(v){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==
typeof f||"object"!==typeof g||g instanceof a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||
[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var b;b=e.val();e.bind({focus:function(){e.val()==
b&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(b)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(b).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/** * Infinity Scroll * @author Carlos Vinicius [Quatro Digital] * @version 3.10 * @license MIT */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(d){"function"!==typeof d.fn.QD_infinityScroll&&(window._QuatroDigital_InfinityScroll=window._QuatroDigital_InfinityScroll||{},d.fn.QD_infinityScroll=function(t){var h,f,e,c,g,r,k,b,l;b=window._QuatroDigital_InfinityScroll;f=function(a,b){if("object"===typeof console){var c="object"===typeof a;"undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase()?"undefined"!==typeof b&&"info"===b.toLowerCase()?c?console.info("[Infinity Scroll]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],
a[7]):console.info("[Infinity Scroll]\n"+a):c?console.error("[Infinity Scroll]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Infinity Scroll]\n"+a):c?console.warn("[Infinity Scroll]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Infinity Scroll]\n"+a)}};h={lastShelf:">div:last",elemLoading:'<div id="scrollLoading">Carregando ... </div>',searchUrl:null,returnToTop:d('<div id="returnToTop"><a href="#"><span class="text">voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>'),
scrollBy:document,callback:function(){},getShelfHeight:function(){return c.scrollTop()+c.height()},paginate:null,insertContent:function(a,b){a.after(b)},authorizeScroll:function(){return!0}};e=jQuery.extend({},h,t);c=jQuery(this);jQuery("");if(1>c.length)return c;1<c.length&&(f("Identifiquei que a seletor informado ("+c.selector+") retornou "+c.length+" elementos.\n Para solucionar o problema estou selecionando autom\u00e1ticamente o primeiro com o id: #"+(c.filter("[id^=ResultItems]:first").attr("id")||
"!Not Found"),"Aviso"),c=c.filter("[id^=ResultItems]:first"));c.filter("[id^=ResultItems]").length||f(["Certifique-se que esta selecionando o elemento correto.\n O plugin espera que o elemento seja o que cont\u00e9m o id: #"+(d("div[id^=ResultItems]").attr("id")||"!Not Found"),d("div[id^=ResultItems]")],"Info");c.parent().filter("[id^=ResultItems]").length&&(c=c.parent(),f(["Identifiquei que o seletor pai do elemento que voc\u00ea informou \u00e9 o #"+(jQuery("div[id^=ResultItems]").attr("id")||"!Not Found")+
".\n Como forma de corrigir esse problema de sele\u00e7\u00e3o de elemento, assumirei a prateleira correta.",c],"Aviso"));d("body").append(e.returnToTop);g=d(window);r=d(document);l=d(e.scrollBy);b.toTopE=d(e.returnToTop);k=d(e.elemLoading);b.moreResults=!0;b.currentPage=2;var q={scrollToTop:function(){var a,c,d;a=g.height();g.bind("resize.QD_infinityScroll",function(){a=g.height()});c=null;d=function(){r.scrollTop()>a?document.body.getAttribute("data-qd-infinity-scroll")||document.body.setAttribute("data-qd-infinity-scroll",
1):document.body.getAttribute("data-qd-infinity-scroll")&&document.body.removeAttribute("data-qd-infinity-scroll")};l.bind("scroll.QD_infinityScroll",function(){clearTimeout(c);c=setTimeout(d,20)});b.buttonToTop=b.toTopE.find("a").bind("click.QD_infinityScroll",function(){jQuery("html,body").animate({scrollTop:0},"slow");return!1})},getSearchUrl:function(){var a,b,c,d;jQuery("script:not([src])").each(function(){b=jQuery(this)[0].innerHTML;c=/\/buscapagina\?.+&PageNumber=/i;d=/\/paginaprateleira\?.+PageNumber=/i;
if(-1<b.indexOf("buscapagina"))return a=c.exec(b),!1;if(-1<b.indexOf("paginaprateleira"))return a=d.exec(b),!1});if("undefined"!==typeof a&&"undefined"!==typeof a[0])return a[0].replace("paginaprateleira","buscapagina");f("N\u00e3o foi poss\u00edvel localizar a url de busca da p\u00e1gina.\n Tente adicionar o .js ao final da p\u00e1gina. \n[M\u00e9todo: getSearchUrl]");return""},infinityScroll:function(){var a,m,n,p,h;b.searchUrl=null!==e.searchUrl?e.searchUrl:q.getSearchUrl();b.currentStatus=!0;
a=d(".pager[id*=PagerTop]:first").attr("id")||"";if(""!==a&&(b.pages=window["pagecount_"+a.split("_").pop()],"undefined"===typeof b.pages))for(n in window)if(/pagecount_[0-9]+/.test(n)){b.pages=window[n];break}"undefined"===typeof b.pages&&(b.pages=9999999999999);m=function(){if(b.currentStatus){var a=c.find(e.lastShelf);if(1>a.length)return f("\u00daltima Prateleira/Vitrine n\u00e3o encontrada \n ("+a.selector+")"),!1;a.after(k);b.currentStatus=!1;var g=b.currentPage;d.ajax({url:b.searchUrl.replace(/pagenumber\=[0-9]*/i,
"PageNumber="+b.currentPage),dataType:"html",success:function(c){1>c.trim().length?(b.moreResults=!1,f("N\u00e3o existem mais resultados a partir da p\u00e1gina: "+g,"Aviso"),d(window).trigger("QuatroDigital.is_noMoreResults")):e.insertContent(a,c);b.currentStatus=!0;k.remove()},error:function(){f("Houve um erro na requisi\u00e7\u00e3o Ajax de uma nova p\u00e1gina.")},complete:function(a,b){e.callback();d(window).trigger("QuatroDigital.is_Callback")}});b.currentPage++}};"function"===typeof e.paginate?
e.paginate(function(){b.currentPage<=b.pages&&b.moreResults&&m()}):(p=null,h=function(){b.currentPage<=b.pages&&b.moreResults&&g.scrollTop()+g.height()>=e.getShelfHeight()&&e.authorizeScroll()&&m()},l.bind("scroll.QD_infinityScroll_paginate",function(){clearTimeout(p);p=setTimeout(h,70)}))}};q.scrollToTop();q.infinityScroll();return c})})(jQuery);
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Vídeo na foto do produto // 1.6 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var qdVideoInProduct={insertThumbsIn:"end"};
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(q){$(6(){X($("1d").1V(".2K")){r h,d=[],e,n,m,f,l,p,b;n=6(a,g){"31"===S U&&("1W"!==S g&&"2g"===g.1X()?U.2c("[Y O 15] "+a):"1W"!==S g&&"20"===g.1X()?U.20("[Y O 15] "+a):U.42("[Y O 15] "+a))};J.1o=J.1o||{};m=$.41(!0,{21:"1Z",1G:"4j.3C-3J.3w:3r"},J.1o);h=$("4d.49");b=$("P#1e");e=$(m.1G).4f().1l(/\\;\\s*/,";").M(";");1k(r k=0;k<e.24;k++)-1<e[k].1m("H")?d.1t(e[k].M("v=").1A().M(/[&#]/).1v()):-1<e[k].1m("3T.1B")&&d.1t(e[k].M("1B/").1A().M(/[\\?&#]/).1v());f=$(\'<P K="i-44"></P>\');f.1Y("#45");f.2C(\'<P K="i-33"></P>\');e=6(a){r g={j:"2R%3%Q%3%4%3%5",2Q:"2P%3%4%3%5",2S:"2T%3%w%3%4%3%5",2V:"2U%3%D%3%4%3%5",2O:"b%3%A%3%4%3%5",2N:"c-R%3%w%3%4%3%5",8:"-R%3%D%3%4%3%5","8-":"R%3%A%3%4%3%5","7%3%":"Q%3%w%3%4%3%5","7%3%2":"2I%3%D%3%4%3%5","7%3%25":"2H%3%A%3%4%3%5","7%3%1x":"2G%3%1y%3%4%3%5","2J%3":"%1y%3%4%3%5",2M:"2L%3%w%3%4%3%5",2W:"2X%3%D%3%4%3%5",39:"38%3%A%3%4%3%5","8-37":"1z%3%w%3%4%3%5","8-3a":"3b%3%D%3%4%3%5","8-3d":"3c%3%A%3%4%3%5","7%3%36":"35%3%w%3%4%3%5","7%3%30":"2Z%3%D%3%4%3%5","7%3%2Y":"1z%3%A%3%4%3%5","7%3%32%3":"%Q%3%4%3%5","34%3%Q%25":"1b%4%3%5","F%3%2F":"2y%3%4%3%5","F%3%2j":"2i%3%4%3%5","F%3%2k":"2l%3%4%3%5","8-F%3%1w":"2n%3%4%3%5","8-F%3%2m":"2h%3%4%3%5","8-F%3%2b":"2a%3%4%3%5","7%3%1n%3%1x":"2d%3%4%3%5","7%3%1n%3%2f":"2e%3%4%3%5","7%3%1n%3%1w":"2z%3%4%3%5","7%3%Q%3%1u":"%3%4",R:"%3%1u%3%4","E%3%w%3":"%4%3%5","E%3%D%2":"2x%4%3%5","E%3%A%":"3%4%3%5","8-E%3%w":"%3%4%3%5","8-E%3%2r":"2q%3%4%3%5","8-E%3%2v":"2u%3%4%3%5","7%3%1p%3%2E":"2t%3%4%3%5","7%3%1p%3%2p":"2o%3%4%3%5","7%3%1p%3%w":"40%3%4%3%5"};x 6(a){r e,b,c,d;b=6(a){x a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+c[16]+"c"+c[17]+"m"+b(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"3U"+b("o")+"n"];e=6(a){x 3W(3V(a.1l(/\\./g,"\\46").1l(/[a-4m-Z]/g,6(a){x 4i.4h(("Z">=a?4k:4l)>=(a=a.4g(0)+13)?a:a-26)})))};1k(r f O g){X(e(a[[c[9],b("o"),c[12],c[b(13)]].1F("")])===f+g[f]){d="48"+c[17]+"e";4c}d="f"+c[0]+"4e"+b(c[1])+""}b=!1;-1<a[[c[12],"e",c[0],"3P",c[9]].1F("")].1m("3s%1I%1E%1C%11%19%11%3t%3v%3u%1b%3o%1b%3i%11%19%1I%1E%1C%3m%19")&&(b=!0);x[d,b]}(a)}(q);X(!3x(e[0]))x e[1]?n("\\3I\\3H\\1H \\3K\\I\\3L\\3N\\1D\\I\\1D\\1H \\3F\\I\\3A\\I \\3z\\3y\\3B\\I L\\3E\\I!"):!1;p=6(a,g){"H"===g&&f.3D(\'<1a 1J="3k://3j.H.14/3g/\'+a+\'?3h=3n&1j=0" 3p="0" 3Q></1a>\');b.1i("B",b.1i("B")||b.B());b.W(!0,!0).10(T,0,6(){$("1d").1T("1r-1q-1s")});f.W(!0,!0).10(T,1,6(){b.3R(f).1M({B:f.N("1a").B()},27)})};29=6(){h.N("a:3Y(\'.i-1h\')").1L("23.43",6(){f.W(!0,!0).10(T,0,6(){$(C).3f().3e("1c");$("1d").1S("1r-1q-1s")});b.W(!0,!0).10(T,1,6(){r a=b.1i("B");a&&b.1M({B:a},27)})})};l=6(){X(!h.N(".i-28").24){r a;29.V(C);1k(G O d)"2w"===S d[G]&&""!==d[G]&&(a=$("<1K K=\'i-28\'><22 K=\'i-3S\' 1c=\'1P-1e:1Q(\\"//1g.H.14/1R/"+d[G]+"/1O.1N\\")\'></22><a K=\'i-1h\' 3G=\'3M:3l(0);\' 1j=\'"+d[G]+"\' 1c=\'1P-1e:1Q(\\"//1g.H.14/1R/"+d[G]+"/1O.1N\\")\'><1g 1J=\'/3q/i-3O.4b\' 4a=\'47 Y\'/></a></1K>"),a.N("a").1L("23.3X",6(){r a;a=$(C);h.N(".1f").1S("1f");a.1T("1f");p.V(C,a.3Z("1j"),"H");x!1}),"1Z"===m.21?a.1Y(h):a.2s(h))}};$(2D).2B(l);$(J).2A(l);(6(){r a,b=C;a=J.1U||6(){};J.1U=6(d,e){$(d||"").1V(".i-1h")||(a.V(C,d,e),l.V(b))}})()}})})(C);',62,271,'|||25C2|25A8pbz|25A8oe|function|jjj|qrirybc||||||||||qd|||||||||var|||||25A8igrkpbzzrepr|return|||25A8igrkpbzzreprfgnoyr|height|this|25A8igrkpbzzreprorgn|nenhwbdn2|qrinenhwb|vId|youtube|u0391|window|class||split|find|in|div|25A8nenhwb|nenhwb|typeof|500|console|call|stop|if|Video||fadeTo|D1|||com|product||||82|iframe|C2|style|body|image|ON|img|videoLink|data|rel|for|replace|indexOf|25A8qrinenhwb|qdVideoInProduct|25A8nenhwbdn2|video|qdpv|on|push|25A8arrzh|shift|25A8i|25A|25A8evpneqbryrgeb|vpneqbryrgeb|pop|be|84|u2202|B8|join|videoFieldSelector|u0472|E0|src|li|bind|animate|jpg|default|background|url|vi|removeClass|addClass|ImageControl|is|undefined|toLowerCase|prependTo|start|info|insertThumbsIn|span|click|length|||700|videoItem|removePlayer|kpbzzreprfgnoyr|25A8igr|warn|8igrkpbzzrepr|igrkpbzzreprorgn|25A8|alerta|rkpbzzreprorgn|zreprorgn|25A8igrkpbz|25A8igrkpbzz|reprfgnoyr|25A8ig|grkpbzzrepr|rorgn|25A8igrkpbzzrep|rgn|25A8igrkpbzzrepro|appendTo|pr|noyr|25A8igrkpbzzreprfg|string|5C2|zzrepr|grkpbzzreprfgnoyr|load|ajaxStop|wrap|document|25A8igrkpbzzre|25A8igrkpb|8qebtnevn|A8nenhwb|5A8nenhwb|qebtnevn|produto|bryrgeb|qebtnevnevpneq|qriryb|nenhw|nhwb|ne|jj|nen|hwb|wb|nenh|qebtnevnevpneqb|ryrgeb|25A8qebtnevne|evpneqbryrgeb|25A8qebtnevn|object|25A8ohfpn|playerContainer|ohfpn|nevpneqbryrgeb|25A8qebtnev|qebtnevne|yrgeb|qebtnevnevpneqbr|qebtnevnev|pneqbryrgeb|neqbryrgeb|qebtnevnevp|removeAttr|hide|embed|wmode|A1|www|http|void|C5|transparent|A1g|frameborder|arquivos|first|qu|8F|83d|CF|Videos|eval|u0abd|u0aef|u0ae8|u01ac|value|html|u0472J|u03a1|href|u00c3|u0e17|field|u221a|u2113|javascript|u00a1|playIco|rc|allowfullscreen|add|videoThumbBg|youtu|ti|encodeURIComponent|escape|playVideo|not|attr|fgnoyr|extend|error|removeVideo|playerWrapper|include|u00a8|Play|tr|thumbs|alt|png|break|ul|ls|text|charCodeAt|fromCharCode|String|td|90|122|zA'.split('|'),0,{}));
/* Quatro Digital - sessionStorage // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - sessionStorage]\n"),a=b):a=["[Quatro Digital - sessionStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdSessionStorage=window.qdSessionStorage||{};var f="undefined"!==typeof sessionStorage&&"undefined"!==typeof sessionStorage.setItem&&"undefined"!==typeof sessionStorage.getItem;window.qdSessionStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;sessionStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),sessionStorage.setItem(b+"_expiration",
d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento da sess\u00e3o. Detalhes: ",g.message],"alerta")}};window.qdSessionStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(sessionStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(sessionStorage.removeItem&&(sessionStorage.removeItem(b),sessionStorage.removeItem(b+"_expiration")),null):sessionStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento da sess\u00e3o. Detalhes: ",
d.message],"alerta")}}})();
/* Quatro Digital Amazing Menu // 2.12 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(h){r a,m,k,n;a=2J;I("6"!==M a.19.V){m={10:"/8-1N-Y",1m:6(){}};r l=6(a,b){I("1U"===M x&&"X"!==M x.1b&&"X"!==M x.15&&"X"!==M x.1l){r d;"1U"===M a?(a.2I("[1V 1W 1X]\\n"),d=a):d=["[1V 1W 1X]\\n"+a];I("X"===M b||"1Z"!==b.Q()&&"2H"!==b.Q())I("X"!==M b&&"15"===b.Q())W{x.15.1n(x,d)}U(p){W{x.15(d.11("\\n"))}U(f){}}1T W{x.1b.1n(x,d)}U(p){W{x.1b(d.11("\\n"))}U(f){}}1T W{x.1l.1n(x,d)}U(p){W{x.1l(d.11("\\n"))}U(f){}}}};a.19.1q=6(){r e=a(w);e.F(6(b){a(w).v("8-i-K-"+b)});e.1j().v("8-i-1j");e.1S().v("8-i-1S");D e};a.19.V=6(){};h=6(a){r b={j:"2G%3%O%3%4%3%5",2K:"2L%3%4%3%5",21:"2P%3%C%3%4%3%5",2O:"2N%3%G%3%4%3%5",1Q:"b%3%H%3%4%3%5",2M:"c-14%3%C%3%4%3%5",B:"-14%3%G%3%4%3%5","B-":"14%3%H%3%4%3%5","7%3%":"O%3%C%3%4%3%5","7%3%2":"2F%3%G%3%4%3%5","7%3%25":"2E%3%H%3%4%3%5","7%3%1E":"2x%3%1Y%3%4%3%5","2w%3":"%1Y%3%4%3%5",2v:"2u%3%C%3%4%3%5",2y:"2z%3%G%3%4%3%5",2D:"2C%3%H%3%4%3%5","B-2B":"1I%3%C%3%4%3%5","B-2A":"2Q%3%G%3%4%3%5","B-2R":"37%3%H%3%4%3%5","7%3%36":"35%3%C%3%4%3%5","7%3%34":"38%3%G%3%4%3%5","7%3%2t":"1I%3%H%3%4%3%5","7%3%39%3":"%O%3%4%3%5","3c%3%O%25":"1d%4%3%5","P%3%3b":"3a%3%4%3%5","P%3%33":"32%3%4%3%5","P%3%2V":"2U%3%4%3%5","B-P%3%1K":"2T%3%4%3%5","B-P%3%2S":"2W%3%4%3%5","B-P%3%2X":"31%3%4%3%5","7%3%1k%3%1E":"30%3%4%3%5","7%3%1k%3%2Z":"2Y%3%4%3%5","7%3%1k%3%1K":"3d%3%4%3%5","7%3%O%3%1r":"%3%4",14:"%3%1r%3%4","R%3%C%3":"%4%3%5","R%3%G%2":"2a%4%3%5","R%3%H%":"3%4%3%5","B-R%3%C":"%3%4%3%5","B-R%3%28":"2o%3%4%3%5","B-R%3%2r":"2h%3%4%3%5","7%3%1h%3%2j":"2k%3%4%3%5","7%3%1h%3%2l":"2s%3%4%3%5","7%3%1h%3%C":"2d%3%4%3%5","7%25":"1d%O%3%4%3%5","14%":"3%4%3%5",2b:"2c%3%C%3%4%3%5",29:"2f%3%G%3%4%3%5",27:"22%3%H%3%4%3%5","B-21":"1O%3%C%3%4%3%5","2p-2m":"2i%3%G%3%4%3%5","B-1Q":"2n%3%H%3%4%3%5","7%3%2q":"2g%3%C%3%4%3%5","7%3%2e":"24%3%G%3%4%3%5","7%3%23":"1O%3%H%3%4%3%5"};D 6(a){r e,f,c,g;f=6(a){D a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+c[16]+"c"+c[17]+"m"+f(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"42"+f("o")+"n"];e=6(a){D 41(45(a.1a(/\\./g,"\\49").1a(/[a-48-Z]/g,6(a){D 47.4a(("Z">=a?4c:4b)>=(a=a.46(0)+13)?a:a-26)})))};3Z(r q 3Y b){I(e(a[[c[9],f("o"),c[12],c[f(13)]].11("")])===q+b[q]){g="44"+c[17]+"e";3e}g="f"+c[0]+"4e"+f(c[1])+""}f=!1;-1<a[[c[12],"e",c[0],"43",c[9]].11("")].4d("4p%1y%1z%1G%1p%1f%1p%4o%4m%4h%1d%4g%1d%4n%1p%1f%1y%1z%1G%4f%1f")&&(f=!0);D[g,f]}(a)}(h);I(!4i(h[0]))D h[1]?l("\\4j\\4l\\1J \\4k\\S\\40\\3W\\1x\\S\\1x\\1J \\3u\\S\\3t\\S \\3s\\3r\\3v\\S L\\3w\\S!"):!1;n=6(e){r b,d;e=e.E(".3z");b=e.1D(".8-i-1i");d=e.1D(".8-i-1C");I(b.J||d.J)b.1e().v("8-i-1i-1B"),d.1e().v("8-i-1C-1B"),a.3X({10:k.10,3y:"3x",3q:6(e){r f=a(e);b.F(6(){r c,g;g=a(w);c=f.E("3p[3i=\'"+g.1A("1H-1L-1t")+"\']");c.J&&(c.F(6(){a(w).1s(".3h-1i").1u().1v(g)}),g.1w())}).v("8-i-1F-1R");d.F(6(){r c={},g;g=a(w);f.E("3g").F(6(){I(a(w).1P().1g().Q()==g.1A("1H-1L-1t").1g().Q())D c=a(w),!1});c.J&&(c.F(6(){a(w).1s("[3f*=\'3j\']").1u().1v(g)}),g.1w())}).v("8-i-1F-1R")},1b:6(){l("N\\20 3k 3o\\3n 3m 3l 3A 1M Y. A 10 \'"+k.10+"\' 3B.")},3Q:3P})};a.V=6(e){r b=e.E("T[3O]").F(6(){r d,b;d=a(w);I(!d.J)D l(["3N 1M Y n\\20 3R",e],"1Z");d.E("K >T").1e().v("8-i-3S-T");d.E("K").F(6(){r g=a(w),b;b=g.1c(":3V(T)");b.J&&g.v("8-i-3U-"+b.1j().1P().1g().3T().1a(/\\./g,"").1a(/\\s/g,"-").Q())});b=d.E(">K").1q();d.v("8-1N-Y");b=b.E(">T");b.F(6(){r b=a(w);b.E(">K").1q().v("8-i-3M");b.v("8-i-1o-Y");b.1e().v("8-i-1o")});b.v("8-i-1o");r f=0,c=6(a){f+=1;a=a.1c("K").1c("*");a.J&&(a.v("8-i-3L-"+f),c(a))};c(d);d.3F(d.E("T")).F(6(){r b=a(w);b.v("8-i-"+b.1c("K").J+"-K")})});n(b);k.1m.3E(w);a(3D).3C("3G.i.1m",e)};a.19.V=6(e){r b=a(w);I(!b.J)D b;k=a.3H({},m,e);b.3K=3J a.V(a(w));D b};a(6(){a(".3I").V()})}})(w);',62,274,'|||25C2|25A8pbz|25A8oe|function|jjj|qd||||||||||am|||||||||var||||addClass|this|console||||qrirybc|25A8igrkpbzzrepr|return|find|each|25A8igrkpbzzreprorgn|25A8igrkpbzzreprfgnoyr|if|length|li||typeof||25A8nenhwb|qrinenhwb|toLowerCase|nenhwbdn2|u0391|ul|catch|QD_amazingMenu|try|undefined|menu||url|join|||nenhwb|info||||fn|replace|error|children|C2|parent|82|trim|25A8nenhwbdn2|banner|first|25A8qrinenhwb|warn|callback|apply|dropdown|D1|qdAmAddNdx|25A8arrzh|getParent|value|clone|insertBefore|hide|u2202|E0|B8|attr|wrapper|collection|filter|25A|content|84|data|vpneqbryrgeb|u0472|25A8i|qdam|do|amazing|hwbzbovyr|text|nenhw|loaded|last|else|object|QD|Amazing|Menu|25A8evpneqbryrgeb|alerta|u00e3o|nen|yr|25A8nen|nhwbzbovyr|||nenhwbzbov|25A8igrkpbzzrepro|nenhwbzbo|5C2|nenhwbzb|ovyr|fgnoyr|25A8ne|vyr|enhwbzbovyr|noyr|wbzbovyr|25A8igrkpbzzre|pr|25A8igrkpbzzrep|enh|bzbovyr|rgn|qrirybcn|25A8n|25A8igrkpbzzreprfg|rorgn|25A8qebtnevne|bryrgeb|qebtnevnevpneq|qebtnevn|8qebtnevn|qebtnevnevpneqb|ryrgeb|qebtnevnev|qebtnevne|yrgeb|qebtnevnevpneqbr|A8nenhwb|5A8nenhwb|jj|aviso|unshift|jQuery|ne|nhwb|qriryb|wb|nenh|hwb|pneqbryrgeb|qebtnevnevp|25A8ig|grkpbzzrepr|reprfgnoyr|25A8igrkpbzz|rkpbzzreprorgn|25A8igr|igrkpbzzreprorgn|25A8|8igrkpbzzrepr|kpbzzreprfgnoyr|zreprorgn|25A8igrkpbz|25A8qebtnevn|nevpneqbryrgeb|25A8qebtnev|neqbryrgeb|evpneqbryrgeb|25A8ohfpn|zzrepr|25A8igrkpb|ohfpn|grkpbzzreprfgnoyr|break|class|h2|box|alt|colunas|foi|os|obter|u00edvel|poss|img|success|u0abd|u0aef|u0ae8|u03a1|u01ac|u0472J|html|dataType|qd_am_code|dados|falho|trigger|window|call|add|QuatroDigital|extend|qd_amazing_menu_auto|new|exec|level|column|UL|itemscope|3E3|clearQueueDelay|encontrada|has|replaceSpecialChars|elem|not|u00a1|qdAjax|in|for|u2113|escape|ti|rc|tr|encodeURIComponent|charCodeAt|String|zA|u00a8|fromCharCode|122|90|indexOf|ls|C5|A1g|83d|eval|u0e17|u221a|u00c3|CF|A1|8F|qu'.split('|'),0,{}));
/* Quatro Digital Cookie Functions // 1.5 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,d){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase()?
"undefined"!==typeof d&&"info"===d.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var d=function(c,b){var d=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof d&&d>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(c);c.trigger("QuatroDigital.cf_show");a(c).on("qdNewsSuccessCallback",function(a,d){c.trigger("QuatroDigital.qdcf_applyComplete");b.show(c);c.trigger("QuatroDigital.cf_hide")});b.callback();c.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var c=a(this),b;try{if(b=c.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(c,b);d(c,b);e(c,b)})};a.fn.QD_cookieFn=
function(f){var d=a(this);h=a.extend(!0,{},g,f);d.QD_cookieFn=new a.QD_cookieFn(d);return d};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();

/* Quatro Digital Plus Smart Cart // 6.12 // Carlos Vinicius // Todos os direitos reservados */
var _0x402e=['skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','formatCepField','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','cartContainer','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','[data-sku=\x27','lastSku','outerHeight','qd-ddc-product-add-time-v2','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','qd-loaded','src','actionButtons','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','removeProduct','stop','slideUp','remove','$1-$2$3','calculateShipping','BRA','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<ul\x20class=\x22qd-dd-cep-slas\x22></ul>','<li>','\x20-\x20Até\x20','qdDdcLastPostalCode','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','boolean','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Callback\x20não\x20é\x20uma\x20função','buyButtonClicked','quickViewUpdate','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','allowRecalculate','.qd-bap-qtt','productId','prod_','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','function','prototype','trim','capitalize','charAt','toUpperCase','toLowerCase','replaceSpecialChars','replace','undefined','qdAjax','qdAjaxQueue','jquery','slice','error','extend','GET','data','url','type','jqXHR','success','complete','always','clearQueueDelay','message','4.0','abs','pow','toFixed','round','split','length','join','simpleCart','checkout','getOrderForm','QuatroDigital_simpleCart','ajaxStopOn','object','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_items_text','meta[name=currency]','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','show','filter','.plural','addClass','qd-emptyCart','removeClass','$this','alerta','cartTotalE','cartQttE','html','itemsTextE','find','cartQtt','itemsText','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','trigger','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','fail','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','body','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','buyButton','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','_Quatro_Digital_dropDown','função\x20descontinuada','getCartInfoByUrl','allowUpdate','QuatroDigital.qd_sc_prodAdd','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','push','productPageCallback','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','ajax','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','ajaxStop','getParent','closest','Quatro\x20Digital\x20-\x20DropDown\x20Cart','QD_dropDownCart','enhwb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','nhwbdn2%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando'];(function(_0x134f00,_0x24cba9){var _0x321c2a=function(_0x4d9e0c){while(--_0x4d9e0c){_0x134f00['push'](_0x134f00['shift']());}};_0x321c2a(++_0x24cba9);}(_0x402e,0x9e));var _0xe402=function(_0x4bfe08,_0x48ae7b){_0x4bfe08=_0x4bfe08-0x0;var _0x1f9125=_0x402e[_0x4bfe08];return _0x1f9125;};_0xe402('0x0')!==typeof String[_0xe402('0x1')][_0xe402('0x2')]&&(String[_0xe402('0x1')][_0xe402('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0xe402('0x0')!=typeof String[_0xe402('0x1')][_0xe402('0x3')]&&(String['prototype'][_0xe402('0x3')]=function(){return this[_0xe402('0x4')](0x0)[_0xe402('0x5')]()+this['slice'](0x1)[_0xe402('0x6')]();});_0xe402('0x0')!==typeof String['prototype'][_0xe402('0x7')]&&(String['prototype'][_0xe402('0x7')]=function(){var _0x408d4e={'ç':'c','æ':'ae','œ':'oe','á':'a','é':'e','í':'i','ó':'o','ú':'u','à':'a','è':'e','ì':'i','ò':'o','ù':'u','ä':'a','ë':'e','ï':'i','ö':'o','ü':'u','ÿ':'y','â':'a','ê':'e','î':'i','ô':'o','û':'u','å':'a','ã':'a','ø':'o','õ':'o','u':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ê':'E','Ô':'O','Ü':'U','Ã':'A','Õ':'O','À':'A','Ç':'C'};return this[_0xe402('0x8')](/[\u00e0-\u00fa]/gi,function(_0x10d0dd){return _0xe402('0x9')!=typeof _0x408d4e[_0x10d0dd]?_0x408d4e[_0x10d0dd]:_0x10d0dd;});});(function(_0x33a1){if(_0xe402('0x0')!==typeof _0x33a1[_0xe402('0xa')]){var _0x1a6e7e={};_0x33a1[_0xe402('0xb')]=_0x1a6e7e;0x96>parseInt((_0x33a1['fn'][_0xe402('0xc')]['replace'](/[^0-9]+/g,'')+'000')[_0xe402('0xd')](0x0,0x3),0xa)&&console&&_0xe402('0x0')==typeof console[_0xe402('0xe')]&&console[_0xe402('0xe')]();_0x33a1[_0xe402('0xa')]=function(_0x2d6389){try{var _0x3658db=_0x33a1[_0xe402('0xf')]({},{'url':'','type':_0xe402('0x10'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x2d6389),_0x428dc8;_0x428dc8='object'===typeof _0x3658db[_0xe402('0x11')]?JSON['stringify'](_0x3658db[_0xe402('0x11')]):_0x3658db['data']['toString']();var _0x335beb=encodeURIComponent(_0x3658db[_0xe402('0x12')]+'|'+_0x3658db[_0xe402('0x13')]+'|'+_0x428dc8);_0x1a6e7e[_0x335beb]=_0x1a6e7e[_0x335beb]||{};'undefined'==typeof _0x1a6e7e[_0x335beb][_0xe402('0x14')]?_0x1a6e7e[_0x335beb][_0xe402('0x14')]=_0x33a1['ajax'](_0x3658db):(_0x1a6e7e[_0x335beb]['jqXHR']['done'](_0x3658db[_0xe402('0x15')]),_0x1a6e7e[_0x335beb][_0xe402('0x14')]['fail'](_0x3658db['error']),_0x1a6e7e[_0x335beb]['jqXHR']['always'](_0x3658db[_0xe402('0x16')]));_0x1a6e7e[_0x335beb][_0xe402('0x14')][_0xe402('0x17')](function(){isNaN(parseInt(_0x3658db['clearQueueDelay']))||setTimeout(function(){_0x1a6e7e[_0x335beb][_0xe402('0x14')]=void 0x0;},_0x3658db[_0xe402('0x18')]);});return _0x1a6e7e[_0x335beb][_0xe402('0x14')];}catch(_0x5e9eb4){_0xe402('0x9')!==typeof console&&'function'===typeof console[_0xe402('0xe')]&&console[_0xe402('0xe')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x5e9eb4[_0xe402('0x19')]);}};_0x33a1['qdAjax']['version']=_0xe402('0x1a');}}(jQuery));function qd_number_format(_0x29d504,_0x3fe87f,_0xb73f57,_0x5ba791){_0x29d504=(_0x29d504+'')[_0xe402('0x8')](/[^0-9+\-Ee.]/g,'');_0x29d504=isFinite(+_0x29d504)?+_0x29d504:0x0;_0x3fe87f=isFinite(+_0x3fe87f)?Math[_0xe402('0x1b')](_0x3fe87f):0x0;_0x5ba791='undefined'===typeof _0x5ba791?',':_0x5ba791;_0xb73f57=_0xe402('0x9')===typeof _0xb73f57?'.':_0xb73f57;var _0x273533='',_0x273533=function(_0x406483,_0xd6736){var _0x3fe87f=Math[_0xe402('0x1c')](0xa,_0xd6736);return''+(Math['round'](_0x406483*_0x3fe87f)/_0x3fe87f)[_0xe402('0x1d')](_0xd6736);},_0x273533=(_0x3fe87f?_0x273533(_0x29d504,_0x3fe87f):''+Math[_0xe402('0x1e')](_0x29d504))[_0xe402('0x1f')]('.');0x3<_0x273533[0x0]['length']&&(_0x273533[0x0]=_0x273533[0x0][_0xe402('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5ba791));(_0x273533[0x1]||'')[_0xe402('0x20')]<_0x3fe87f&&(_0x273533[0x1]=_0x273533[0x1]||'',_0x273533[0x1]+=Array(_0x3fe87f-_0x273533[0x1][_0xe402('0x20')]+0x1)[_0xe402('0x21')]('0'));return _0x273533[_0xe402('0x21')](_0xb73f57);};(function(){var _0x4ca0ee=jQuery;if(_0xe402('0x0')!==typeof _0x4ca0ee['fn'][_0xe402('0x22')]){_0x4ca0ee(function(){var _0x333f11=vtexjs[_0xe402('0x23')][_0xe402('0x24')];vtexjs['checkout'][_0xe402('0x24')]=function(){return _0x333f11['call']();};});try{window[_0xe402('0x25')]=window[_0xe402('0x25')]||{};window[_0xe402('0x25')][_0xe402('0x26')]=!0x1;_0x4ca0ee['fn'][_0xe402('0x22')]=function(_0x50eb91,_0xe957f2,_0x234f10){var _0x53622b,_0x2d95f3,_0x328ed6,_0x3ee099,_0x228516,_0xfdb346,_0x1a85fe,_0x2fff9d,_0x258441,_0x291496;_0x2d95f3=function(_0x350e16,_0x6b149c){if(_0xe402('0x27')===typeof console){var _0x38c742=_0xe402('0x27')===typeof _0x350e16;_0xe402('0x9')!==typeof _0x6b149c&&'alerta'===_0x6b149c[_0xe402('0x6')]()?_0x38c742?console['warn'](_0xe402('0x28'),_0x350e16[0x0],_0x350e16[0x1],_0x350e16[0x2],_0x350e16[0x3],_0x350e16[0x4],_0x350e16[0x5],_0x350e16[0x6],_0x350e16[0x7]):console[_0xe402('0x29')](_0xe402('0x28')+_0x350e16):_0xe402('0x9')!==typeof _0x6b149c&&_0xe402('0x2a')===_0x6b149c[_0xe402('0x6')]()?_0x38c742?console[_0xe402('0x2a')](_0xe402('0x28'),_0x350e16[0x0],_0x350e16[0x1],_0x350e16[0x2],_0x350e16[0x3],_0x350e16[0x4],_0x350e16[0x5],_0x350e16[0x6],_0x350e16[0x7]):console[_0xe402('0x2a')](_0xe402('0x28')+_0x350e16):_0x38c742?console[_0xe402('0xe')]('[Simple\x20Cart]\x0a',_0x350e16[0x0],_0x350e16[0x1],_0x350e16[0x2],_0x350e16[0x3],_0x350e16[0x4],_0x350e16[0x5],_0x350e16[0x6],_0x350e16[0x7]):console[_0xe402('0xe')](_0xe402('0x28')+_0x350e16);}};_0x53622b=_0x4ca0ee(this);'object'===typeof _0x50eb91?_0xe957f2=_0x50eb91:(_0x50eb91=_0x50eb91||!0x1,_0x53622b=_0x53622b[_0xe402('0x2b')](_0x4ca0ee['QD_simpleCart']['elements']));if(!_0x53622b[_0xe402('0x20')])return _0x53622b;_0x4ca0ee[_0xe402('0x2c')]['elements']=_0x4ca0ee[_0xe402('0x2c')][_0xe402('0x2d')][_0xe402('0x2b')](_0x53622b);_0x234f10=_0xe402('0x9')===typeof _0x234f10?!0x1:_0x234f10;_0x328ed6={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0xe402('0x2e'),'currencySymbol':(_0x4ca0ee(_0xe402('0x2f'))[_0xe402('0x30')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};_0x228516=_0x4ca0ee[_0xe402('0xf')]({},_0x328ed6,_0xe957f2);_0x3ee099=_0x4ca0ee('');_0x53622b[_0xe402('0x31')](function(){var _0x3cf5af=_0x4ca0ee(this);_0x3cf5af[_0xe402('0x11')](_0xe402('0x32'))||_0x3cf5af[_0xe402('0x11')]('qd_simpleCartOpts',_0x228516);});_0x291496=function(_0x116984){window['_QuatroDigital_CartData']=window[_0xe402('0x33')]||{};for(var _0xb5b4ac=0x0,_0xcffdc=0x0,_0x50eb91=0x0;_0x50eb91<_0x116984[_0xe402('0x34')][_0xe402('0x20')];_0x50eb91++)_0xe402('0x35')==_0x116984[_0xe402('0x34')][_0x50eb91]['id']&&(_0xcffdc+=_0x116984[_0xe402('0x34')][_0x50eb91]['value']),_0xb5b4ac+=_0x116984[_0xe402('0x34')][_0x50eb91][_0xe402('0x36')];window['_QuatroDigital_CartData'][_0xe402('0x37')]=_0x228516[_0xe402('0x38')]+qd_number_format(_0xb5b4ac/0x64,0x2,',','.');window[_0xe402('0x33')][_0xe402('0x39')]=_0x228516[_0xe402('0x38')]+qd_number_format(_0xcffdc/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xe402('0x3a')]=_0x228516[_0xe402('0x38')]+qd_number_format((_0xb5b4ac+_0xcffdc)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xe402('0x3b')]=0x0;if(_0x228516[_0xe402('0x3c')])for(_0x50eb91=0x0;_0x50eb91<_0x116984['items'][_0xe402('0x20')];_0x50eb91++)window[_0xe402('0x33')][_0xe402('0x3b')]+=_0x116984[_0xe402('0x3d')][_0x50eb91]['quantity'];else window[_0xe402('0x33')]['qtt']=_0x116984[_0xe402('0x3d')]['length']||0x0;try{window['_QuatroDigital_CartData'][_0xe402('0x3e')]&&window[_0xe402('0x33')]['callback']['fire']&&window['_QuatroDigital_CartData'][_0xe402('0x3e')][_0xe402('0x3f')]();}catch(_0x10730a){_0x2d95f3(_0xe402('0x40'));}_0x258441(_0x3ee099);};_0xfdb346=function(_0xf0fb87,_0x4a00ea){0x1===_0xf0fb87?_0x4a00ea[_0xe402('0x41')]()['filter'](_0xe402('0x42'))[_0xe402('0x43')]():_0x4a00ea[_0xe402('0x41')]()[_0xe402('0x44')](_0xe402('0x45'))['show']();};_0x2fff9d=function(_0x28c69b){0x1>_0x28c69b?_0x53622b[_0xe402('0x46')](_0xe402('0x47')):_0x53622b[_0xe402('0x48')](_0xe402('0x47'));};_0x1a85fe=function(_0x5721ce,_0x48d980){var _0x50eb91;_0x50eb91=parseInt(window[_0xe402('0x33')][_0xe402('0x3b')],0xa);_0x48d980[_0xe402('0x49')][_0xe402('0x43')]();isNaN(_0x50eb91)&&(_0x2d95f3('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0xe402('0x4a')),_0x50eb91=0x0);_0x48d980[_0xe402('0x4b')]['html'](window[_0xe402('0x33')]['total']);_0x48d980[_0xe402('0x4c')][_0xe402('0x4d')](_0x50eb91);_0xfdb346(_0x50eb91,_0x48d980[_0xe402('0x4e')]);_0x2fff9d(_0x50eb91);};_0x258441=function(_0x1f9108){_0x53622b['each'](function(){var _0x48a392={},_0x499383;_0x499383=_0x4ca0ee(this);_0x50eb91&&_0x499383[_0xe402('0x11')]('qd_simpleCartOpts')&&_0x4ca0ee[_0xe402('0xf')](_0x228516,_0x499383[_0xe402('0x11')](_0xe402('0x32')));_0x48a392['$this']=_0x499383;_0x48a392['cartQttE']=_0x499383[_0xe402('0x4f')](_0x228516[_0xe402('0x50')])||_0x3ee099;_0x48a392['cartTotalE']=_0x499383[_0xe402('0x4f')](_0x228516['cartTotal'])||_0x3ee099;_0x48a392[_0xe402('0x4e')]=_0x499383[_0xe402('0x4f')](_0x228516[_0xe402('0x51')])||_0x3ee099;_0x48a392['emptyElem']=_0x499383[_0xe402('0x4f')](_0x228516[_0xe402('0x52')])||_0x3ee099;_0x1a85fe(_0x1f9108,_0x48a392);_0x499383['addClass'](_0xe402('0x53'));});};(function(){if(_0x228516[_0xe402('0x54')]){window[_0xe402('0x55')]=window[_0xe402('0x55')]||{};if(_0xe402('0x9')!==typeof window[_0xe402('0x55')]['getOrderForm']&&(_0x234f10?_0x234f10:!_0x50eb91))return _0x291496(window[_0xe402('0x55')][_0xe402('0x24')]);if(_0xe402('0x27')!==typeof window[_0xe402('0x56')]||'undefined'===typeof window[_0xe402('0x56')][_0xe402('0x23')])if(_0xe402('0x27')===typeof vtex&&'object'===typeof vtex[_0xe402('0x23')]&&_0xe402('0x9')!==typeof vtex[_0xe402('0x23')][_0xe402('0x57')])new vtex[(_0xe402('0x23'))][(_0xe402('0x57'))]();else return _0x2d95f3(_0xe402('0x58'));_0x4ca0ee[_0xe402('0x59')]([_0xe402('0x3d'),_0xe402('0x34'),_0xe402('0x5a')],{'done':function(_0x8a077d){_0x291496(_0x8a077d);window['_QuatroDigital_DropDown'][_0xe402('0x24')]=_0x8a077d;},'fail':function(_0x9542e1){_0x2d95f3(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x9542e1]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x228516[_0xe402('0x3e')]();_0x4ca0ee(window)[_0xe402('0x5b')]('simpleCartCallback.quatro_digital');return _0x53622b;};_0x4ca0ee[_0xe402('0x2c')]={'elements':_0x4ca0ee('')};_0x4ca0ee(function(){var _0x4b5370;'function'===typeof window[_0xe402('0x5c')]&&(_0x4b5370=window[_0xe402('0x5c')],window[_0xe402('0x5c')]=function(_0x2228d8,_0x3bb868,_0x2c3e1c,_0x56f8c7,_0xbc2360){_0x4b5370[_0xe402('0x5d')](this,_0x2228d8,_0x3bb868,_0x2c3e1c,_0x56f8c7,function(){_0xe402('0x0')===typeof _0xbc2360&&_0xbc2360();_0x4ca0ee[_0xe402('0x2c')][_0xe402('0x2d')][_0xe402('0x31')](function(){var _0x1fb6e0;_0x1fb6e0=_0x4ca0ee(this);_0x1fb6e0['simpleCart'](_0x1fb6e0[_0xe402('0x11')](_0xe402('0x32')));});});});});var _0xe8ea68=window[_0xe402('0x5e')]||void 0x0;window['ReloadItemsCart']=function(_0x3fa48b){_0x4ca0ee['fn']['simpleCart'](!0x0);_0xe402('0x0')===typeof _0xe8ea68?_0xe8ea68[_0xe402('0x5d')](this,_0x3fa48b):alert(_0x3fa48b);};_0x4ca0ee(function(){var _0x2e5272=_0x4ca0ee('.qd_cart_auto');_0x2e5272[_0xe402('0x20')]&&_0x2e5272[_0xe402('0x22')]();});_0x4ca0ee(function(){_0x4ca0ee(window)[_0xe402('0x5f')](_0xe402('0x60'),function(){_0x4ca0ee['fn'][_0xe402('0x22')](!0x0);});});}catch(_0x568e55){_0xe402('0x9')!==typeof console&&_0xe402('0x0')===typeof console[_0xe402('0xe')]&&console[_0xe402('0xe')](_0xe402('0x61'),_0x568e55);}}}());(function(){var _0x5e1e08=function(_0x5787a1,_0x19f49d){if(_0xe402('0x27')===typeof console){var _0x226f0e=_0xe402('0x27')===typeof _0x5787a1;_0xe402('0x9')!==typeof _0x19f49d&&_0xe402('0x4a')===_0x19f49d['toLowerCase']()?_0x226f0e?console[_0xe402('0x29')](_0xe402('0x62'),_0x5787a1[0x0],_0x5787a1[0x1],_0x5787a1[0x2],_0x5787a1[0x3],_0x5787a1[0x4],_0x5787a1[0x5],_0x5787a1[0x6],_0x5787a1[0x7]):console['warn'](_0xe402('0x62')+_0x5787a1):_0xe402('0x9')!==typeof _0x19f49d&&'info'===_0x19f49d['toLowerCase']()?_0x226f0e?console[_0xe402('0x2a')](_0xe402('0x62'),_0x5787a1[0x0],_0x5787a1[0x1],_0x5787a1[0x2],_0x5787a1[0x3],_0x5787a1[0x4],_0x5787a1[0x5],_0x5787a1[0x6],_0x5787a1[0x7]):console['info'](_0xe402('0x62')+_0x5787a1):_0x226f0e?console[_0xe402('0xe')](_0xe402('0x62'),_0x5787a1[0x0],_0x5787a1[0x1],_0x5787a1[0x2],_0x5787a1[0x3],_0x5787a1[0x4],_0x5787a1[0x5],_0x5787a1[0x6],_0x5787a1[0x7]):console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x5787a1);}},_0x16d29f=null,_0x3a8dd7={},_0x3c78e2={},_0x1f0cc1={};$['QD_checkoutQueue']=function(_0x315cee,_0xd544b6){if(null===_0x16d29f)if('object'===typeof window['vtexjs']&&_0xe402('0x9')!==typeof window['vtexjs'][_0xe402('0x23')])_0x16d29f=window[_0xe402('0x56')][_0xe402('0x23')];else return _0x5e1e08(_0xe402('0x63'));var _0x585265=$['extend']({'done':function(){},'fail':function(){}},_0xd544b6),_0x7ff99c=_0x315cee['join'](';'),_0xffb210=function(){_0x3a8dd7[_0x7ff99c][_0xe402('0x2b')](_0x585265[_0xe402('0x64')]);_0x3c78e2[_0x7ff99c]['add'](_0x585265[_0xe402('0x65')]);};_0x1f0cc1[_0x7ff99c]?_0xffb210():(_0x3a8dd7[_0x7ff99c]=$[_0xe402('0x66')](),_0x3c78e2[_0x7ff99c]=$[_0xe402('0x66')](),_0xffb210(),_0x1f0cc1[_0x7ff99c]=!0x0,_0x16d29f[_0xe402('0x24')](_0x315cee)[_0xe402('0x64')](function(_0x45c276){_0x1f0cc1[_0x7ff99c]=!0x1;_0x3a8dd7[_0x7ff99c]['fire'](_0x45c276);})[_0xe402('0x65')](function(_0x4cad0f){_0x1f0cc1[_0x7ff99c]=!0x1;_0x3c78e2[_0x7ff99c][_0xe402('0x3f')](_0x4cad0f);}));};}());(function(_0x5994d5){try{var _0x49270c=jQuery,_0x12b76f=_0x49270c({}),_0x59ffc0=function(_0x1efb5d,_0xe24ca1){if(_0xe402('0x27')===typeof console&&_0xe402('0x9')!==typeof console['error']&&'undefined'!==typeof console[_0xe402('0x2a')]&&_0xe402('0x9')!==typeof console[_0xe402('0x29')]){var _0x425e2e;_0xe402('0x27')===typeof _0x1efb5d?(_0x1efb5d[_0xe402('0x67')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x425e2e=_0x1efb5d):_0x425e2e=[_0xe402('0x68')+_0x1efb5d];if(_0xe402('0x9')===typeof _0xe24ca1||_0xe402('0x4a')!==_0xe24ca1[_0xe402('0x6')]()&&_0xe402('0x69')!==_0xe24ca1['toLowerCase']())if(_0xe402('0x9')!==typeof _0xe24ca1&&'info'===_0xe24ca1['toLowerCase']())try{console[_0xe402('0x2a')][_0xe402('0x6a')](console,_0x425e2e);}catch(_0x2f4686){try{console[_0xe402('0x2a')](_0x425e2e[_0xe402('0x21')]('\x0a'));}catch(_0x266db7){}}else try{console[_0xe402('0xe')]['apply'](console,_0x425e2e);}catch(_0x4fb833){try{console['error'](_0x425e2e[_0xe402('0x21')]('\x0a'));}catch(_0x641426){}}else try{console[_0xe402('0x29')][_0xe402('0x6a')](console,_0x425e2e);}catch(_0x463ac0){try{console[_0xe402('0x29')](_0x425e2e[_0xe402('0x21')]('\x0a'));}catch(_0x55e7c8){}}}},_0x28b956={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xe402('0x6b'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0xe402('0x6c'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x52e9e4,_0xaa53c3,_0x1f22cf){_0x49270c('body')['is'](_0xe402('0x6d'))&&(_0xe402('0x15')===_0xaa53c3?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0xe402('0x6e')),('object'===typeof parent?parent:document)[_0xe402('0x6f')][_0xe402('0x70')]=_0x1f22cf));},'isProductPage':function(){return _0x49270c(_0xe402('0x71'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x2d3195){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x49270c['QD_buyButton']=function(_0x25a22a,_0x2cb6fd,_0x38a4c1){function _0x5b1462(_0x3adce8){_0x909f33[_0xe402('0x72')]?_0x3adce8[_0xe402('0x11')](_0xe402('0x73'))||(_0x3adce8['data'](_0xe402('0x73'),0x1),_0x3adce8['on'](_0xe402('0x74'),function(_0x111ebc){if(!_0x909f33[_0xe402('0x75')]())return!0x0;if(!0x0!==_0x3d56a5[_0xe402('0x76')][_0xe402('0x5d')](this))return _0x111ebc[_0xe402('0x77')](),!0x1;})):alert(_0xe402('0x78'));}function _0x437056(_0xad6add){_0xad6add=_0xad6add||_0x49270c(_0x909f33['buyButton']);_0xad6add['each'](function(){var _0x5df929=_0x49270c(this);_0x5df929['is'](_0xe402('0x79'))||(_0x5df929['addClass'](_0xe402('0x7a')),_0x5df929['is']('.btn-add-buy-button-asynchronous')&&!_0x5df929['is'](_0xe402('0x7b'))||_0x5df929[_0xe402('0x11')]('qd-bb-active')||(_0x5df929[_0xe402('0x11')](_0xe402('0x7c'),0x1),_0x5df929[_0xe402('0x7d')](_0xe402('0x7e'))[_0xe402('0x20')]||_0x5df929[_0xe402('0x7f')](_0xe402('0x80')),_0x5df929['is']('.buy-in-page-button')&&_0x909f33[_0xe402('0x81')]()&&_0xf4f7af['call'](_0x5df929),_0x5b1462(_0x5df929)));});_0x909f33[_0xe402('0x81')]()&&!_0xad6add[_0xe402('0x20')]&&_0x59ffc0(_0xe402('0x82')+_0xad6add[_0xe402('0x83')]+'\x27.','info');}var _0xf4f7af,_0x909f33=_0x38a4c1||_0x909f33,_0x3219ce=_0x49270c(_0x25a22a),_0x3d56a5=this;window['_Quatro_Digital_dropDown']=window['_Quatro_Digital_dropDown']||{};window['_QuatroDigital_CartData']=window[_0xe402('0x33')]||{};_0x3d56a5[_0xe402('0x84')]=function(_0x4be342,_0x689370){_0x3219ce['addClass'](_0xe402('0x85'));_0x49270c(_0xe402('0x71'))['addClass'](_0xe402('0x86'));var _0x38a4c1=_0x49270c(_0x909f33[_0xe402('0x87')])[_0xe402('0x44')]('[href=\x27'+(_0x4be342['attr'](_0xe402('0x70'))||_0xe402('0x88'))+'\x27]')[_0xe402('0x2b')](_0x4be342);_0x38a4c1[_0xe402('0x46')](_0xe402('0x89'));setTimeout(function(){_0x3219ce[_0xe402('0x48')](_0xe402('0x8a'));_0x38a4c1[_0xe402('0x48')]('qd-bb-itemAddBuyButtonWrapper');},_0x909f33[_0xe402('0x8b')]);window[_0xe402('0x8c')][_0xe402('0x24')]=void 0x0;if('undefined'!==typeof _0x2cb6fd&&'function'===typeof _0x2cb6fd['getCartInfoByUrl'])return _0x909f33[_0xe402('0x72')]||(_0x59ffc0(_0xe402('0x8d')),_0x2cb6fd[_0xe402('0x8e')]()),window[_0xe402('0x55')][_0xe402('0x24')]=void 0x0,_0x2cb6fd[_0xe402('0x8e')](function(_0x32f028){window['_Quatro_Digital_dropDown'][_0xe402('0x24')]=_0x32f028;_0x49270c['fn'][_0xe402('0x22')](!0x0,void 0x0,!0x0);},{'lastSku':_0x689370});window[_0xe402('0x8c')][_0xe402('0x8f')]=!0x0;_0x49270c['fn'][_0xe402('0x22')](!0x0);_0x49270c(window)[_0xe402('0x5b')](_0xe402('0x90'),[_0x4be342,_0x689370,_0x38a4c1]);};(function(){if(_0x909f33[_0xe402('0x72')]&&_0x909f33[_0xe402('0x91')]){var _0x3fda19=_0x49270c(_0xe402('0x92'));_0x3fda19[_0xe402('0x20')]&&_0x437056(_0x3fda19);}}());_0xf4f7af=function(){var _0x26e5c2=_0x49270c(this);_0xe402('0x9')!==typeof _0x26e5c2[_0xe402('0x11')](_0xe402('0x87'))?(_0x26e5c2[_0xe402('0x93')](_0xe402('0x94')),_0x5b1462(_0x26e5c2)):(_0x26e5c2[_0xe402('0x5f')](_0xe402('0x95'),function(_0x5f153f){_0x26e5c2['unbind'](_0xe402('0x94'));_0x5b1462(_0x26e5c2);_0x49270c(this)[_0xe402('0x93')](_0x5f153f);}),_0x49270c(window)[_0xe402('0x96')](function(){_0x26e5c2[_0xe402('0x93')]('click');_0x5b1462(_0x26e5c2);_0x26e5c2[_0xe402('0x93')](_0xe402('0x95'));}));};_0x3d56a5[_0xe402('0x76')]=function(){var _0x23d641=_0x49270c(this),_0x55fba4=_0x23d641[_0xe402('0x30')]('href')||'';if(-0x1<_0x55fba4[_0xe402('0x97')](_0x909f33['selectSkuMsg']))return!0x0;_0x55fba4=_0x55fba4[_0xe402('0x8')](/redirect\=(false|true)/gi,'')[_0xe402('0x8')]('?',_0xe402('0x98'))[_0xe402('0x8')](/\&\&/gi,'&');if(_0x909f33[_0xe402('0x99')](_0x23d641))return _0x23d641[_0xe402('0x30')](_0xe402('0x70'),_0x55fba4[_0xe402('0x8')](_0xe402('0x9a'),_0xe402('0x9b'))),!0x0;_0x55fba4=_0x55fba4[_0xe402('0x8')](/http.?:/i,'');_0x12b76f[_0xe402('0x9c')](function(_0x446370){if(!_0x909f33['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xe402('0x9d')](_0x55fba4))return _0x446370();var _0x2cb6fd=function(_0x32dcab,_0x229407){var _0x25a22a=_0x55fba4['match'](/sku\=([0-9]+)/gi),_0x4970e7=[],_0x8e0a76;if(_0xe402('0x27')===typeof _0x25a22a&&null!==_0x25a22a)for(var _0xf619d=_0x25a22a[_0xe402('0x20')]-0x1;0x0<=_0xf619d;_0xf619d--)_0x8e0a76=parseInt(_0x25a22a[_0xf619d][_0xe402('0x8')](/sku\=/gi,'')),isNaN(_0x8e0a76)||_0x4970e7[_0xe402('0x9e')](_0x8e0a76);_0x909f33[_0xe402('0x9f')][_0xe402('0x5d')](this,_0x32dcab,_0x229407,_0x55fba4);_0x3d56a5['buyButtonClickCallback']['call'](this,_0x32dcab,_0x229407,_0x55fba4,_0x4970e7);_0x3d56a5['prodAdd'](_0x23d641,_0x55fba4['split']('ku=')[_0xe402('0xa0')]()[_0xe402('0x1f')]('&')[_0xe402('0xa1')]());_0xe402('0x0')===typeof _0x909f33[_0xe402('0xa2')]&&_0x909f33[_0xe402('0xa2')][_0xe402('0x5d')](this);_0x49270c(window)[_0xe402('0x5b')](_0xe402('0xa3'));_0x49270c(window)[_0xe402('0x5b')](_0xe402('0xa4'));};_0x909f33[_0xe402('0xa5')]?(_0x2cb6fd(null,_0xe402('0x15')),_0x446370()):_0x49270c[_0xe402('0xa6')]({'url':_0x55fba4,'complete':_0x2cb6fd})[_0xe402('0x17')](function(){_0x446370();});});};_0x3d56a5[_0xe402('0xa7')]=function(_0x3fc51c,_0x47ef20,_0x167e3a,_0x5d0c0b){try{_0xe402('0x15')===_0x47ef20&&_0xe402('0x27')===typeof window[_0xe402('0xa8')]&&'function'===typeof window[_0xe402('0xa8')][_0xe402('0xa9')]&&window[_0xe402('0xa8')][_0xe402('0xa9')](_0x3fc51c,_0x47ef20,_0x167e3a,_0x5d0c0b);}catch(_0x559130){_0x59ffc0(_0xe402('0xaa'));}};_0x437056();_0xe402('0x0')===typeof _0x909f33[_0xe402('0x3e')]?_0x909f33[_0xe402('0x3e')]['call'](this):_0x59ffc0('Callback\x20não\x20é\x20uma\x20função');};var _0x539c16=_0x49270c[_0xe402('0x66')]();_0x49270c['fn'][_0xe402('0xab')]=function(_0x8879b5,_0x95dd27){var _0x150b68=_0x49270c(this);_0xe402('0x9')!==typeof _0x95dd27||_0xe402('0x27')!==typeof _0x8879b5||_0x8879b5 instanceof _0x49270c||(_0x95dd27=_0x8879b5,_0x8879b5=void 0x0);var _0x4ad94b;_0x539c16[_0xe402('0x2b')](function(){_0x150b68[_0xe402('0x7d')](_0xe402('0xac'))[_0xe402('0x20')]||_0x150b68[_0xe402('0xad')](_0xe402('0xae'));_0x4ad94b=new _0x49270c[(_0xe402('0xab'))](_0x150b68,_0x8879b5,_0x49270c['extend']({},_0x28b956,_0x95dd27));});_0x539c16['fire']();_0x49270c(window)['on'](_0xe402('0xaf'),function(_0x181a34,_0x3bab9b,_0x122b94){_0x4ad94b[_0xe402('0x84')](_0x3bab9b,_0x122b94);});return _0x49270c[_0xe402('0xf')](_0x150b68,_0x4ad94b);};var _0x3f1a39=0x0;_0x49270c(document)[_0xe402('0xb0')](function(_0x13e446,_0x5b0f6d,_0x42348d){-0x1<_0x42348d[_0xe402('0x12')]['toLowerCase']()[_0xe402('0x97')](_0xe402('0xb1'))&&(_0x3f1a39=(_0x42348d[_0xe402('0x12')][_0xe402('0xb2')](/sku\=([0-9]+)/i)||[''])[_0xe402('0xa0')]());});_0x49270c(window)[_0xe402('0x5f')]('productAddedToCart.qdSbbVtex',function(){_0x49270c(window)[_0xe402('0x5b')](_0xe402('0xaf'),[new _0x49270c(),_0x3f1a39]);});_0x49270c(document)[_0xe402('0xb3')](function(){_0x539c16[_0xe402('0x3f')]();});}catch(_0x479b64){_0xe402('0x9')!==typeof console&&_0xe402('0x0')===typeof console[_0xe402('0xe')]&&console[_0xe402('0xe')](_0xe402('0x61'),_0x479b64);}}(this));(function(_0x269765){_0x269765['fn'][_0xe402('0xb4')]=_0x269765['fn'][_0xe402('0xb5')];}(jQuery));function qd_number_format(_0x55da6c,_0x1eccb0,_0x2d7118,_0x784cf7){_0x55da6c=(_0x55da6c+'')[_0xe402('0x8')](/[^0-9+\-Ee.]/g,'');_0x55da6c=isFinite(+_0x55da6c)?+_0x55da6c:0x0;_0x1eccb0=isFinite(+_0x1eccb0)?Math[_0xe402('0x1b')](_0x1eccb0):0x0;_0x784cf7=_0xe402('0x9')===typeof _0x784cf7?',':_0x784cf7;_0x2d7118=_0xe402('0x9')===typeof _0x2d7118?'.':_0x2d7118;var _0x50b5f7='',_0x50b5f7=function(_0x13d2d8,_0x1a401a){var _0x1eccb0=Math[_0xe402('0x1c')](0xa,_0x1a401a);return''+(Math['round'](_0x13d2d8*_0x1eccb0)/_0x1eccb0)['toFixed'](_0x1a401a);},_0x50b5f7=(_0x1eccb0?_0x50b5f7(_0x55da6c,_0x1eccb0):''+Math[_0xe402('0x1e')](_0x55da6c))[_0xe402('0x1f')]('.');0x3<_0x50b5f7[0x0][_0xe402('0x20')]&&(_0x50b5f7[0x0]=_0x50b5f7[0x0][_0xe402('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0x784cf7));(_0x50b5f7[0x1]||'')[_0xe402('0x20')]<_0x1eccb0&&(_0x50b5f7[0x1]=_0x50b5f7[0x1]||'',_0x50b5f7[0x1]+=Array(_0x1eccb0-_0x50b5f7[0x1][_0xe402('0x20')]+0x1)[_0xe402('0x21')]('0'));return _0x50b5f7[_0xe402('0x21')](_0x2d7118);};(function(){'use strict';try{window[_0xe402('0x33')]=window[_0xe402('0x33')]||{};window[_0xe402('0x33')][_0xe402('0x3e')]=window[_0xe402('0x33')][_0xe402('0x3e')]||$[_0xe402('0x66')]();}catch(_0x4d872a){if(typeof console!==_0xe402('0x9')&&typeof console[_0xe402('0xe')]==='function')console[_0xe402('0xe')](_0xe402('0x61'),_0x4d872a['message']);}}());(function(_0x22781d){'use strict';try{var _0x1d4f57=jQuery;var _0x2d6cde=_0xe402('0xb6');var _0x34e371=function(_0x214375,_0x175245){if('object'===typeof console&&_0xe402('0x9')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0xe402('0x9')!==typeof console[_0xe402('0x29')]){var _0x5c899f;_0xe402('0x27')===typeof _0x214375?(_0x214375['unshift']('['+_0x2d6cde+']\x0a'),_0x5c899f=_0x214375):_0x5c899f=['['+_0x2d6cde+']\x0a'+_0x214375];if(_0xe402('0x9')===typeof _0x175245||_0xe402('0x4a')!==_0x175245[_0xe402('0x6')]()&&'aviso'!==_0x175245['toLowerCase']())if(_0xe402('0x9')!==typeof _0x175245&&_0xe402('0x2a')===_0x175245[_0xe402('0x6')]())try{console['info']['apply'](console,_0x5c899f);}catch(_0x166369){try{console[_0xe402('0x2a')](_0x5c899f[_0xe402('0x21')]('\x0a'));}catch(_0x513c50){}}else try{console[_0xe402('0xe')][_0xe402('0x6a')](console,_0x5c899f);}catch(_0x54be80){try{console['error'](_0x5c899f[_0xe402('0x21')]('\x0a'));}catch(_0x532560){}}else try{console['warn'][_0xe402('0x6a')](console,_0x5c899f);}catch(_0x4640e2){try{console[_0xe402('0x29')](_0x5c899f[_0xe402('0x21')]('\x0a'));}catch(_0x3afa5d){}}}};window[_0xe402('0x55')]=window[_0xe402('0x55')]||{};window[_0xe402('0x55')][_0xe402('0x8f')]=!![];_0x1d4f57[_0xe402('0xb7')]=function(){};_0x1d4f57['fn'][_0xe402('0xb7')]=function(){return{'fn':new _0x1d4f57()};};var _0xcce0e6=function(_0x5163f5){var _0x3f5ca8={'n':_0xe402('0xb8'),'ne':_0xe402('0xb9')};return function(_0x492cb6){var _0x1e1cb7,_0x2c0573,_0x5948d6,_0x4ca6f0;_0x2c0573=function(_0x577b0f){return _0x577b0f;};_0x5948d6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x492cb6=_0x492cb6['d'+_0x5948d6[0x10]+'c'+_0x5948d6[0x11]+'m'+_0x2c0573(_0x5948d6[0x1])+'n'+_0x5948d6[0xd]]['l'+_0x5948d6[0x12]+'c'+_0x5948d6[0x0]+'ti'+_0x2c0573('o')+'n'];_0x1e1cb7=function(_0x517c0f){return escape(encodeURIComponent(_0x517c0f[_0xe402('0x8')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5475b1){return String['fromCharCode'](('Z'>=_0x5475b1?0x5a:0x7a)>=(_0x5475b1=_0x5475b1['charCodeAt'](0x0)+0xd)?_0x5475b1:_0x5475b1-0x1a);})));};var _0x175b0c=_0x1e1cb7(_0x492cb6[[_0x5948d6[0x9],_0x2c0573('o'),_0x5948d6[0xc],_0x5948d6[_0x2c0573(0xd)]]['join']('')]);_0x1e1cb7=_0x1e1cb7((window[['js',_0x2c0573('no'),'m',_0x5948d6[0x1],_0x5948d6[0x4][_0xe402('0x5')](),_0xe402('0xba')]['join']('')]||_0xe402('0x88'))+['.v',_0x5948d6[0xd],'e',_0x2c0573('x'),'co',_0x2c0573('mm'),_0xe402('0xbb'),_0x5948d6[0x1],'.c',_0x2c0573('o'),'m.',_0x5948d6[0x13],'r'][_0xe402('0x21')](''));for(var _0x4ac7af in _0x3f5ca8){if(_0x1e1cb7===_0x4ac7af+_0x3f5ca8[_0x4ac7af]||_0x175b0c===_0x4ac7af+_0x3f5ca8[_0x4ac7af]){_0x4ca6f0='tr'+_0x5948d6[0x11]+'e';break;}_0x4ca6f0='f'+_0x5948d6[0x0]+'ls'+_0x2c0573(_0x5948d6[0x1])+'';}_0x2c0573=!0x1;-0x1<_0x492cb6[[_0x5948d6[0xc],'e',_0x5948d6[0x0],'rc',_0x5948d6[0x9]][_0xe402('0x21')]('')][_0xe402('0x97')](_0xe402('0xbc'))&&(_0x2c0573=!0x0);return[_0x4ca6f0,_0x2c0573];}(_0x5163f5);}(window);if(!eval(_0xcce0e6[0x0]))return _0xcce0e6[0x1]?_0x34e371(_0xe402('0xbd')):!0x1;_0x1d4f57['QD_dropDownCart']=function(_0x1f6d3c,_0x47515a){var _0x27bd7b,_0x1a8e68,_0x40b77d,_0x1a2048,_0xea9bc6,_0x55b7a9,_0x5dd5d4,_0xb94a31,_0x14b4dd,_0x29b049,_0x4d3262,_0xd5d31f;_0x4d3262=_0x1d4f57(_0x1f6d3c);if(!_0x4d3262['length'])return _0x4d3262;_0x27bd7b={'updateOnlyHover':!![],'texts':{'linkCart':_0xe402('0xbe'),'linkCheckout':_0xe402('0xbf'),'cartTotal':_0xe402('0xc0'),'emptyCart':_0xe402('0xc1'),'continueShopping':_0xe402('0xc2'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>\x20<button\x20class=\x22qd-ddc-cep-btn\x22>Calcular</button>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':!![],'skuName':function(_0x504f13){return _0x504f13[_0xe402('0xc3')]||_0x504f13['name'];},'callback':function(){},'callbackProductsList':function(){}};_0x1a8e68=_0x1d4f57[_0xe402('0xf')](!![],{},_0x27bd7b,_0x47515a);_0x40b77d=_0x1d4f57('');_0x29b049=this;if(_0x1a8e68[_0xe402('0x54')]){var _0x227fcb=![];if(typeof window[_0xe402('0x56')]==='undefined'){_0x34e371(_0xe402('0xc4'));_0x1d4f57[_0xe402('0xa6')]({'url':_0xe402('0xc5'),'async':![],'dataType':_0xe402('0xc6'),'error':function(){_0x34e371(_0xe402('0xc7'));_0x227fcb=!![];}});}if(_0x227fcb)return _0x34e371('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x5cb837;if(typeof window[_0xe402('0x56')]===_0xe402('0x27')&&typeof window['vtexjs']['checkout']!==_0xe402('0x9'))_0x5cb837=window['vtexjs']['checkout'];else if(typeof vtex===_0xe402('0x27')&&typeof vtex['checkout']==='object'&&typeof vtex[_0xe402('0x23')][_0xe402('0x57')]!=='undefined')_0x5cb837=new vtex[(_0xe402('0x23'))]['SDK']();else return _0x34e371(_0xe402('0x58'));_0x29b049['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>'+_0xe402('0xc8')+_0xe402('0xc9')+_0xe402('0xca')+_0xe402('0xcb')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>'+_0xe402('0xcc')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+_0xe402('0xcd')+_0xe402('0xce')+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+_0xe402('0xcf');_0x55b7a9=function(_0x484fd8){var _0x36e6f9=_0x1d4f57(_0x484fd8);_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')]=_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')][_0xe402('0x8')](_0xe402('0xd2'),_0xe402('0xd3'));_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')]=_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')][_0xe402('0x8')](_0xe402('0xd4'),_0xe402('0xd5'));_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')]=_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')]['replace'](_0xe402('0xd6'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x1a8e68[_0xe402('0xd0')][_0xe402('0xd1')]=_0x1a8e68['texts'][_0xe402('0xd1')][_0xe402('0x8')](_0xe402('0xd7'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x36e6f9[_0xe402('0x4f')](_0xe402('0xd8'))[_0xe402('0x4d')](_0x1a8e68[_0xe402('0xd0')]['linkCart']);_0x36e6f9[_0xe402('0x4f')](_0xe402('0xd9'))[_0xe402('0x4d')](_0x1a8e68[_0xe402('0xd0')][_0xe402('0xda')]);_0x36e6f9[_0xe402('0x4f')]('.qd-ddc-checkout')['html'](_0x1a8e68[_0xe402('0xd0')][_0xe402('0xdb')]);_0x36e6f9[_0xe402('0x4f')](_0xe402('0xdc'))[_0xe402('0x4d')](_0x1a8e68[_0xe402('0xd0')]['cartTotal']);_0x36e6f9[_0xe402('0x4f')](_0xe402('0xdd'))[_0xe402('0x4d')](_0x1a8e68[_0xe402('0xd0')][_0xe402('0xde')]);_0x36e6f9['find'](_0xe402('0xdf'))[_0xe402('0x4d')](_0x1a8e68['texts'][_0xe402('0x52')]);return _0x36e6f9;};_0xea9bc6=function(_0x344c40){_0x1d4f57(this)['append'](_0x344c40);_0x344c40[_0xe402('0x4f')](_0xe402('0xe0'))[_0xe402('0x2b')](_0x1d4f57(_0xe402('0xe1')))['on'](_0xe402('0xe2'),function(){_0x4d3262[_0xe402('0x48')](_0xe402('0xe3'));_0x1d4f57(document[_0xe402('0x71')])[_0xe402('0x48')](_0xe402('0x86'));});_0x1d4f57(document)[_0xe402('0xe4')](_0xe402('0xe5'))['on'](_0xe402('0xe5'),function(_0x4c897b){if(_0x4c897b[_0xe402('0xe6')]==0x1b){_0x4d3262[_0xe402('0x48')]('qd-bb-lightBoxProdAdd');_0x1d4f57(document[_0xe402('0x71')])[_0xe402('0x48')]('qd-bb-lightBoxBodyProdAdd');}});var _0x592c84=_0x344c40[_0xe402('0x4f')](_0xe402('0xe7'));_0x344c40[_0xe402('0x4f')]('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x29b049[_0xe402('0xe8')]('-',undefined,undefined,_0x592c84);return![];});_0x344c40[_0xe402('0x4f')]('.qd-ddc-scrollDown')['on'](_0xe402('0xe9'),function(){_0x29b049[_0xe402('0xe8')](undefined,undefined,undefined,_0x592c84);return![];});_0x344c40[_0xe402('0x4f')](_0xe402('0xea'))[_0xe402('0xeb')]('')['on'](_0xe402('0xec'),function(_0x55b097){_0x29b049[_0xe402('0xed')](_0x1d4f57(this));if(_0x55b097['keyCode']==0xd)_0x344c40['find']('.qd-ddc-shipping\x20.qd-ddc-cep-btn')[_0xe402('0x94')]();});_0x344c40['find']('.qd-ddc-shipping\x20.qd-ddc-cep-btn')['click'](function(){_0x29b049[_0xe402('0xee')](_0x344c40[_0xe402('0x4f')](_0xe402('0xea')));});if(_0x1a8e68[_0xe402('0xef')]){var _0x4c51cd=0x0;_0x1d4f57(this)['on'](_0xe402('0xf0'),function(){var _0x114946=function(){if(!window[_0xe402('0x55')]['allowUpdate'])return;_0x29b049[_0xe402('0x8e')]();window[_0xe402('0x55')]['allowUpdate']=![];_0x1d4f57['fn'][_0xe402('0x22')](!![]);_0x29b049[_0xe402('0xf1')]();};_0x4c51cd=setInterval(function(){_0x114946();},0x258);_0x114946();});_0x1d4f57(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x4c51cd);});}};_0x5dd5d4=_0x55b7a9(this[_0xe402('0xf2')]);_0xb94a31=0x0;_0x4d3262[_0xe402('0x31')](function(){if(_0xb94a31>0x0)_0xea9bc6[_0xe402('0x5d')](this,_0x5dd5d4[_0xe402('0xf3')]());else _0xea9bc6[_0xe402('0x5d')](this,_0x5dd5d4);_0xb94a31++;});window['_QuatroDigital_CartData'][_0xe402('0x3e')]['add'](function(){_0x1d4f57('.qd-ddc-infoTotalValue')[_0xe402('0x4d')](window['_QuatroDigital_CartData'][_0xe402('0x37')]||'--');_0x1d4f57(_0xe402('0xf4'))[_0xe402('0x4d')](window['_QuatroDigital_CartData']['qtt']||'0');_0x1d4f57(_0xe402('0xf5'))[_0xe402('0x4d')](window[_0xe402('0x33')][_0xe402('0x39')]||'--');_0x1d4f57('.qd-ddc-infoAllTotal')['html'](window['_QuatroDigital_CartData']['allTotal']||'--');});_0x14b4dd=function(_0x4fdcbf){_0x34e371('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0xd5d31f=function(_0x1355b,_0x251af7){if(typeof _0x1355b[_0xe402('0x3d')]===_0xe402('0x9'))return _0x34e371('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x29b049[_0xe402('0xf6')][_0xe402('0x5d')](this,_0x251af7);};_0x29b049['getCartInfoByUrl']=function(_0x3fb0b4,_0x4a0f74){var _0x26183a;if(typeof _0x4a0f74!=_0xe402('0x9'))window[_0xe402('0x55')]['dataOptionsCache']=_0x4a0f74;else if(window[_0xe402('0x55')][_0xe402('0xf7')])_0x4a0f74=window[_0xe402('0x55')][_0xe402('0xf7')];setTimeout(function(){window[_0xe402('0x55')]['dataOptionsCache']=undefined;},_0x1a8e68[_0xe402('0x8b')]);_0x1d4f57(_0xe402('0xf8'))['removeClass'](_0xe402('0xf9'));if(_0x1a8e68[_0xe402('0x54')]){_0x26183a=function(_0x1904c8){window[_0xe402('0x55')]['getOrderForm']=_0x1904c8;_0xd5d31f(_0x1904c8,_0x4a0f74);if(typeof window[_0xe402('0xfa')]!==_0xe402('0x9')&&typeof window['_QuatroDigital_AmountProduct'][_0xe402('0xfb')]==='function')window[_0xe402('0xfa')][_0xe402('0xfb')]['call'](this);_0x1d4f57(_0xe402('0xf8'))[_0xe402('0x46')](_0xe402('0xf9'));};if(typeof window[_0xe402('0x55')][_0xe402('0x24')]!==_0xe402('0x9')){_0x26183a(window[_0xe402('0x55')][_0xe402('0x24')]);if(typeof _0x3fb0b4===_0xe402('0x0'))_0x3fb0b4(window[_0xe402('0x55')][_0xe402('0x24')]);return;}_0x1d4f57[_0xe402('0x59')]([_0xe402('0x3d'),_0xe402('0x34'),_0xe402('0x5a')],{'done':function(_0x17e6d8){_0x26183a[_0xe402('0x5d')](this,_0x17e6d8);if(typeof _0x3fb0b4===_0xe402('0x0'))_0x3fb0b4(_0x17e6d8);},'fail':function(_0x358f97){_0x34e371([_0xe402('0xfc'),_0x358f97]);}});}else{alert(_0xe402('0xfd'));}};_0x29b049[_0xe402('0xf1')]=function(){var _0x41a232=_0x1d4f57(_0xe402('0xf8'));if(_0x41a232[_0xe402('0x4f')](_0xe402('0xfe'))[_0xe402('0x20')])_0x41a232['removeClass'](_0xe402('0xff'));else _0x41a232[_0xe402('0x46')]('qd-ddc-noItems');};_0x29b049[_0xe402('0xf6')]=function(_0x159d3c){var _0x1c2280=_0x1d4f57(_0xe402('0x100'));var _0x3c807c=_0xe402('0x101')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+_0xe402('0x102')+_0xe402('0x103')+_0xe402('0x104')+_0xe402('0x105')+_0xe402('0x105')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+_0xe402('0x106')+_0xe402('0x107')+_0xe402('0x108')+_0xe402('0x109')+_0xe402('0x10a')+_0xe402('0x10b')+_0xe402('0x10c')+_0xe402('0x105')+_0xe402('0x105')+_0xe402('0x10d')+_0xe402('0x10e')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>'+_0xe402('0x10f')+'</div>'+_0xe402('0x105')+'</div>';_0x1c2280[_0xe402('0x110')]();_0x1c2280[_0xe402('0x31')](function(){var _0x2581bb=_0x1d4f57(this);var _0x4cc6d8,_0x3688d5,_0x3bb663,_0x34d299;var _0x5d2439=_0x1d4f57('');var _0x5335f4;for(var _0x33a2cd in window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')]){if(typeof window[_0xe402('0x55')]['getOrderForm']['items'][_0x33a2cd]!==_0xe402('0x27'))continue;_0x3bb663=window[_0xe402('0x55')][_0xe402('0x24')]['items'][_0x33a2cd];_0x5335f4=_0x3bb663[_0xe402('0x111')][_0xe402('0x8')](/^\/|\/$/g,'')[_0xe402('0x1f')]('/');_0x3688d5=_0x1d4f57(_0x3c807c);_0x3688d5[_0xe402('0x30')]({'data-sku':_0x3bb663['id'],'data-sku-index':_0x33a2cd,'data-qd-departament':_0x5335f4[0x0],'data-qd-category':_0x5335f4[_0x5335f4[_0xe402('0x20')]-0x1]});_0x3688d5['addClass'](_0xe402('0x112')+_0x3bb663[_0xe402('0x113')]);_0x3688d5[_0xe402('0x4f')](_0xe402('0x114'))['append'](_0x1a8e68['skuName'](_0x3bb663));_0x3688d5[_0xe402('0x4f')](_0xe402('0x115'))['append'](isNaN(_0x3bb663[_0xe402('0x116')])?_0x3bb663[_0xe402('0x116')]:_0x3bb663[_0xe402('0x116')]==0x0?_0xe402('0x117'):(_0x1d4f57(_0xe402('0x2f'))[_0xe402('0x30')](_0xe402('0x118'))||'R$')+'\x20'+qd_number_format(_0x3bb663[_0xe402('0x116')]/0x64,0x2,',','.'));_0x3688d5['find'](_0xe402('0x119'))[_0xe402('0x30')]({'data-sku':_0x3bb663['id'],'data-sku-index':_0x33a2cd})['val'](_0x3bb663['quantity']);_0x3688d5[_0xe402('0x4f')](_0xe402('0x11a'))[_0xe402('0x30')]({'data-sku':_0x3bb663['id'],'data-sku-index':_0x33a2cd});_0x29b049[_0xe402('0x11b')](_0x3bb663['id'],_0x3688d5[_0xe402('0x4f')](_0xe402('0x11c')),_0x3bb663[_0xe402('0x11d')]);_0x3688d5['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xe402('0x30')]({'data-sku':_0x3bb663['id'],'data-sku-index':_0x33a2cd});_0x3688d5[_0xe402('0x11e')](_0x2581bb);_0x5d2439=_0x5d2439[_0xe402('0x2b')](_0x3688d5);}try{var _0x5e5c24=_0x2581bb[_0xe402('0xb4')](_0xe402('0xf8'))[_0xe402('0x4f')](_0xe402('0xea'));if(_0x5e5c24[_0xe402('0x20')]&&_0x5e5c24[_0xe402('0xeb')]()==''&&window[_0xe402('0x55')]['getOrderForm']['shippingData'][_0xe402('0x11f')])_0x5e5c24[_0xe402('0xeb')](window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x5a')][_0xe402('0x11f')][_0xe402('0x120')]);}catch(_0x3b73ce){_0x34e371(_0xe402('0x121')+_0x3b73ce[_0xe402('0x19')],_0xe402('0x69'));}_0x29b049['actionButtons'](_0x2581bb);_0x29b049[_0xe402('0xf1')]();if(_0x159d3c&&_0x159d3c['lastSku']){(function(){_0x34d299=_0x5d2439[_0xe402('0x44')](_0xe402('0x122')+_0x159d3c[_0xe402('0x123')]+'\x27]');if(!_0x34d299[_0xe402('0x20')])return;_0x4cc6d8=0x0;_0x5d2439[_0xe402('0x31')](function(){var _0x46d59c=_0x1d4f57(this);if(_0x46d59c['is'](_0x34d299))return![];_0x4cc6d8+=_0x46d59c[_0xe402('0x124')]();});_0x29b049[_0xe402('0xe8')](undefined,undefined,_0x4cc6d8,_0x2581bb[_0xe402('0x2b')](_0x2581bb[_0xe402('0xa8')]()));_0x5d2439[_0xe402('0x48')]('qd-ddc-lastAddedFixed');(function(_0x35f64b){_0x35f64b['addClass']('qd-ddc-lastAdded');_0x35f64b['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x35f64b[_0xe402('0x48')]('qd-ddc-lastAdded');},_0x1a8e68[_0xe402('0x8b')]);}(_0x34d299));_0x1d4f57(document['body'])['addClass'](_0xe402('0x125'));setTimeout(function(){_0x1d4f57(document[_0xe402('0x71')])[_0xe402('0x48')]('qd-ddc-product-add-time-v2');},_0x1a8e68['timeRemoveNewItemClass']);}());}});(function(){if(_QuatroDigital_DropDown[_0xe402('0x24')]['items'][_0xe402('0x20')]){_0x1d4f57(_0xe402('0x71'))[_0xe402('0x48')]('qd-ddc-cart-empty')['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time');setTimeout(function(){_0x1d4f57(_0xe402('0x71'))[_0xe402('0x48')](_0xe402('0x126'));},_0x1a8e68[_0xe402('0x8b')]);}else _0x1d4f57(_0xe402('0x71'))[_0xe402('0x48')]('qd-ddc-cart-rendered')[_0xe402('0x46')]('qd-ddc-cart-empty');}());if(typeof _0x1a8e68['callbackProductsList']===_0xe402('0x0'))_0x1a8e68[_0xe402('0x127')]['call'](this);else _0x34e371(_0xe402('0x128'));};_0x29b049[_0xe402('0x11b')]=function(_0x528226,_0x115912,_0x2096fc){var _0x1b7043=!![];function _0x2c9be4(){if(_0x1a8e68['forceImageHTTPS']&&typeof _0x2096fc==_0xe402('0x129'))_0x2096fc=_0x2096fc['replace'](_0xe402('0x12a'),'https');_0x115912['removeClass'](_0xe402('0x12b'))[_0xe402('0x96')](function(){_0x1d4f57(this)[_0xe402('0x46')]('qd-loaded');})['attr'](_0xe402('0x12c'),_0x2096fc);};if(_0x2096fc)_0x2c9be4();else if(!isNaN(_0x528226)){alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');}else _0x34e371('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xe402('0x4a'));};_0x29b049[_0xe402('0x12d')]=function(_0x474207){var _0x3b2ff6,_0x28cf58,_0x188fd2,_0x472840;_0x3b2ff6=function(_0x1dcdbd,_0x1477d5){var _0x1dd5e9,_0x3c35fc,_0x2d5484,_0x407054,_0x306f2f;_0x2d5484=_0x1d4f57(_0x1dcdbd);_0x1dd5e9=_0x2d5484[_0xe402('0x30')](_0xe402('0x12e'));_0x306f2f=_0x2d5484[_0xe402('0x30')](_0xe402('0x12f'));if(!_0x1dd5e9)return;_0x3c35fc=parseInt(_0x2d5484[_0xe402('0xeb')]())||0x1;_0x29b049[_0xe402('0x130')]([_0x1dd5e9,_0x306f2f],_0x3c35fc,_0x3c35fc+0x1,function(_0x17ede1){_0x2d5484['val'](_0x17ede1);if(typeof _0x1477d5===_0xe402('0x0'))_0x1477d5();});};_0x188fd2=function(_0x5aef0d,_0x6f667e){var _0x40a4a3,_0x433284,_0x2ad233,_0xf7647e,_0xb07215;_0x2ad233=_0x1d4f57(_0x5aef0d);_0x40a4a3=_0x2ad233[_0xe402('0x30')](_0xe402('0x12e'));_0xb07215=_0x2ad233[_0xe402('0x30')](_0xe402('0x12f'));if(!_0x40a4a3)return;_0x433284=parseInt(_0x2ad233['val']())||0x2;_0xf7647e=_0x29b049[_0xe402('0x130')]([_0x40a4a3,_0xb07215],_0x433284,_0x433284-0x1,function(_0x419f06){_0x2ad233[_0xe402('0xeb')](_0x419f06);if(typeof _0x6f667e===_0xe402('0x0'))_0x6f667e();});};_0x472840=function(_0x1946d3,_0x19cf5f){var _0x4703a9,_0x4f5d9d,_0x2aadbe,_0x19ad9c,_0x1daae2;_0x2aadbe=_0x1d4f57(_0x1946d3);_0x4703a9=_0x2aadbe[_0xe402('0x30')](_0xe402('0x12e'));_0x1daae2=_0x2aadbe['attr'](_0xe402('0x12f'));if(!_0x4703a9)return;_0x4f5d9d=parseInt(_0x2aadbe['val']())||0x1;_0x19ad9c=_0x29b049['changeQantity']([_0x4703a9,_0x1daae2],0x1,_0x4f5d9d,function(_0x2ec6ec){_0x2aadbe[_0xe402('0xeb')](_0x2ec6ec);if(typeof _0x19cf5f===_0xe402('0x0'))_0x19cf5f();});};_0x28cf58=_0x474207[_0xe402('0x4f')](_0xe402('0x131'));_0x28cf58[_0xe402('0x46')](_0xe402('0x132'))['each'](function(){var _0x2b3981=_0x1d4f57(this);_0x2b3981['find'](_0xe402('0x133'))['on']('click.qd_ddc_more',function(_0x5493ea){_0x5493ea[_0xe402('0x77')]();_0x28cf58[_0xe402('0x46')](_0xe402('0x134'));_0x3b2ff6(_0x2b3981['find']('.qd-ddc-quantity'),function(){_0x28cf58[_0xe402('0x48')](_0xe402('0x134'));});});_0x2b3981[_0xe402('0x4f')](_0xe402('0x135'))['on'](_0xe402('0x136'),function(_0x546d92){_0x546d92['preventDefault']();_0x28cf58[_0xe402('0x46')](_0xe402('0x134'));_0x188fd2(_0x2b3981['find'](_0xe402('0x119')),function(){_0x28cf58[_0xe402('0x48')](_0xe402('0x134'));});});_0x2b3981['find']('.qd-ddc-quantity')['on'](_0xe402('0x137'),function(){_0x28cf58['addClass'](_0xe402('0x134'));_0x472840(this,function(){_0x28cf58[_0xe402('0x48')](_0xe402('0x134'));});});_0x2b3981[_0xe402('0x4f')](_0xe402('0x119'))['on']('keyup.qd_ddc_change',function(_0x13a7d3){if(_0x13a7d3[_0xe402('0xe6')]!=0xd)return;_0x28cf58[_0xe402('0x46')](_0xe402('0x134'));_0x472840(this,function(){_0x28cf58[_0xe402('0x48')](_0xe402('0x134'));});});});_0x474207['find'](_0xe402('0xfe'))[_0xe402('0x31')](function(){var _0x4795dc=_0x1d4f57(this);_0x4795dc['find']('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){var _0x112df9;_0x4795dc[_0xe402('0x46')](_0xe402('0x134'));_0x29b049[_0xe402('0x138')](_0x1d4f57(this),function(_0x523fe4){if(_0x523fe4)_0x4795dc[_0xe402('0x139')](!![])[_0xe402('0x13a')](function(){_0x4795dc[_0xe402('0x13b')]();_0x29b049[_0xe402('0xf1')]();});else _0x4795dc['removeClass'](_0xe402('0x134'));});return![];});});};_0x29b049[_0xe402('0xed')]=function(_0xe8ce7c){var _0x56de5d=_0xe8ce7c[_0xe402('0xeb')]();_0x56de5d=_0x56de5d[_0xe402('0x8')](/[^0-9\-]/g,'');_0x56de5d=_0x56de5d[_0xe402('0x8')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xe402('0x13c'));_0x56de5d=_0x56de5d[_0xe402('0x8')](/(.{9}).*/g,'$1');_0xe8ce7c['val'](_0x56de5d);};_0x29b049[_0xe402('0xee')]=function(_0xb378c5){var _0x370d86=_0xb378c5['val']();if(_0x370d86[_0xe402('0x20')]>=0x9){if(_0xb378c5[_0xe402('0x11')]('qdDdcLastPostalCode')!=_0x370d86){_0x5cb837[_0xe402('0x13d')]({'postalCode':_0x370d86,'country':_0xe402('0x13e')})[_0xe402('0x64')](function(_0x7a41e2){window[_0xe402('0x55')][_0xe402('0x24')]=_0x7a41e2;_0x29b049['getCartInfoByUrl']();var _0x582a73=_0x7a41e2[_0xe402('0x5a')]['logisticsInfo'][0x0][_0xe402('0x13f')];for(var _0xe3c66d=0x0;_0xe3c66d<_0x582a73[_0xe402('0x20')];_0xe3c66d++){var _0x1c0140=_0x582a73[_0xe3c66d];var _0x2c09d7=_0x1c0140[_0xe402('0x140')]>0x1?_0x1c0140['shippingEstimate'][_0xe402('0x8')]('bd',_0xe402('0x141')):_0x1c0140['shippingEstimate']['replace']('bd',_0xe402('0x142'));var _0x5b8d0a=_0x1d4f57(_0xe402('0x143'));_0x5b8d0a['append'](_0xe402('0x144')+_0x1c0140['name']+'\x20-\x20R$\x20'+qd_number_format(_0x1c0140['price']/0x64,0x2,',','.')+_0xe402('0x145')+_0x2c09d7+'</li>');_0xb378c5['parent']()[_0xe402('0x7f')](_0x5b8d0a);}})['fail'](function(_0x2c437c){_0x34e371(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x2c437c]);updateCartData();});}_0xb378c5[_0xe402('0x11')](_0xe402('0x146'),_0x370d86);}};_0x29b049['changeQantity']=function(_0x4fa5fc,_0x5cc260,_0x5f5086,_0x1c3b1e){var _0x46eb3a=_0x5f5086||0x1;if(_0x46eb3a<0x1)return _0x5cc260;if(_0x1a8e68[_0xe402('0x54')]){if(typeof window[_0xe402('0x55')][_0xe402('0x24')]['items'][_0x4fa5fc[0x1]]===_0xe402('0x9')){_0x34e371(_0xe402('0x147')+_0x4fa5fc[0x1]+']');return _0x5cc260;}window['_QuatroDigital_DropDown']['getOrderForm'][_0xe402('0x3d')][_0x4fa5fc[0x1]][_0xe402('0x148')]=_0x46eb3a;window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')][_0x4fa5fc[0x1]][_0xe402('0x149')]=_0x4fa5fc[0x1];_0x5cb837[_0xe402('0x14a')]([window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')][_0x4fa5fc[0x1]]],['items',_0xe402('0x34'),_0xe402('0x5a')])[_0xe402('0x64')](function(_0x2eed0d){window[_0xe402('0x55')][_0xe402('0x24')]=_0x2eed0d;_0x3b4de9(!![]);})['fail'](function(_0x551f6c){_0x34e371(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x551f6c]);_0x3b4de9();});}else{_0x34e371('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x3b4de9(_0x32dc83){_0x32dc83=typeof _0x32dc83!=='boolean'?![]:_0x32dc83;_0x29b049[_0xe402('0x8e')]();window[_0xe402('0x55')]['allowUpdate']=![];_0x29b049[_0xe402('0xf1')]();if(typeof window[_0xe402('0xfa')]!=='undefined'&&typeof window[_0xe402('0xfa')][_0xe402('0xfb')]===_0xe402('0x0'))window[_0xe402('0xfa')][_0xe402('0xfb')][_0xe402('0x5d')](this);if(typeof adminCart==='function')adminCart();_0x1d4f57['fn'][_0xe402('0x22')](!![],undefined,_0x32dc83);if(typeof _0x1c3b1e===_0xe402('0x0'))_0x1c3b1e(_0x5cc260);};};_0x29b049[_0xe402('0x138')]=function(_0x53e695,_0x24d9ca){var _0xd24e5=![];var _0x12ac96=_0x1d4f57(_0x53e695);var _0x3a9625=_0x12ac96[_0xe402('0x30')](_0xe402('0x12f'));if(_0x1a8e68['smartCheckout']){if(typeof window[_0xe402('0x55')]['getOrderForm'][_0xe402('0x3d')][_0x3a9625]===_0xe402('0x9')){_0x34e371(_0xe402('0x147')+_0x3a9625+']');return _0xd24e5;}window['_QuatroDigital_DropDown']['getOrderForm'][_0xe402('0x3d')][_0x3a9625][_0xe402('0x149')]=_0x3a9625;_0x5cb837[_0xe402('0x14b')]([window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')][_0x3a9625]],[_0xe402('0x3d'),_0xe402('0x34'),_0xe402('0x5a')])[_0xe402('0x64')](function(_0x4ab35e){_0xd24e5=!![];window['_QuatroDigital_DropDown'][_0xe402('0x24')]=_0x4ab35e;_0xd5d31f(_0x4ab35e);_0x1c37fa(!![]);})['fail'](function(_0x26e18d){_0x34e371([_0xe402('0x14c'),_0x26e18d]);_0x1c37fa();});}else{alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');}function _0x1c37fa(_0x20765e){_0x20765e=typeof _0x20765e!==_0xe402('0x14d')?![]:_0x20765e;if(typeof window[_0xe402('0xfa')]!==_0xe402('0x9')&&typeof window['_QuatroDigital_AmountProduct']['exec']===_0xe402('0x0'))window[_0xe402('0xfa')]['exec'][_0xe402('0x5d')](this);if(typeof adminCart===_0xe402('0x0'))adminCart();_0x1d4f57['fn'][_0xe402('0x22')](!![],undefined,_0x20765e);if(typeof _0x24d9ca===_0xe402('0x0'))_0x24d9ca(_0xd24e5);};};_0x29b049[_0xe402('0xe8')]=function(_0x250c40,_0x2b41d7,_0x2550cb,_0x17cfd7){var _0x411879=_0x17cfd7||_0x1d4f57(_0xe402('0x14e'));var _0x57651b=_0x250c40||'+';var _0x349d08=_0x2b41d7||_0x411879['height']()*0.9;_0x411879[_0xe402('0x139')](!![],!![])[_0xe402('0x14f')]({'scrollTop':isNaN(_0x2550cb)?_0x57651b+'='+_0x349d08+'px':_0x2550cb});};if(!_0x1a8e68['updateOnlyHover']){_0x29b049[_0xe402('0x8e')]();_0x1d4f57['fn'][_0xe402('0x22')](!![]);}_0x1d4f57(window)['on'](_0xe402('0x150'),function(){try{window[_0xe402('0x55')]['getOrderForm']=undefined;_0x29b049[_0xe402('0x8e')]();}catch(_0x41d3cd){_0x34e371('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x41d3cd[_0xe402('0x19')],'avisso');}});if(typeof _0x1a8e68['callback']==='function')_0x1a8e68['callback'][_0xe402('0x5d')](this);else _0x34e371(_0xe402('0x151'));};_0x1d4f57['fn'][_0xe402('0xb7')]=function(_0xa8f607){var _0x5c12c9;_0x5c12c9=_0x1d4f57(this);_0x5c12c9['fn']=new _0x1d4f57[(_0xe402('0xb7'))](this,_0xa8f607);return _0x5c12c9;};}catch(_0x3ec0e9){if(typeof console!=='undefined'&&typeof console[_0xe402('0xe')]==='function')console[_0xe402('0xe')](_0xe402('0x61'),_0x3ec0e9);}}(this));(function(_0x288391){'use strict';try{var _0x3fe070=jQuery;var _0x2cf609='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x41ed6e=function(_0x1ca444,_0x32d678){if(_0xe402('0x27')===typeof console&&_0xe402('0x9')!==typeof console[_0xe402('0xe')]&&_0xe402('0x9')!==typeof console[_0xe402('0x2a')]&&_0xe402('0x9')!==typeof console[_0xe402('0x29')]){var _0x108cc8;_0xe402('0x27')===typeof _0x1ca444?(_0x1ca444[_0xe402('0x67')]('['+_0x2cf609+']\x0a'),_0x108cc8=_0x1ca444):_0x108cc8=['['+_0x2cf609+']\x0a'+_0x1ca444];if(_0xe402('0x9')===typeof _0x32d678||_0xe402('0x4a')!==_0x32d678[_0xe402('0x6')]()&&_0xe402('0x69')!==_0x32d678['toLowerCase']())if(_0xe402('0x9')!==typeof _0x32d678&&_0xe402('0x2a')===_0x32d678['toLowerCase']())try{console[_0xe402('0x2a')][_0xe402('0x6a')](console,_0x108cc8);}catch(_0x22a0d5){try{console[_0xe402('0x2a')](_0x108cc8['join']('\x0a'));}catch(_0x74e17a){}}else try{console[_0xe402('0xe')][_0xe402('0x6a')](console,_0x108cc8);}catch(_0x1d876c){try{console[_0xe402('0xe')](_0x108cc8[_0xe402('0x21')]('\x0a'));}catch(_0x45ce8e){}}else try{console['warn'][_0xe402('0x6a')](console,_0x108cc8);}catch(_0x1dece5){try{console[_0xe402('0x29')](_0x108cc8['join']('\x0a'));}catch(_0x4cc197){}}}};window[_0xe402('0xfa')]=window[_0xe402('0xfa')]||{};window[_0xe402('0xfa')][_0xe402('0x3d')]={};window[_0xe402('0xfa')]['allowRecalculate']=![];window['_QuatroDigital_AmountProduct'][_0xe402('0x152')]=![];window[_0xe402('0xfa')][_0xe402('0x153')]=![];var _0xa0248a='<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>';var _0x1ec7fa=function(){var _0xce439b,_0x4d819b,_0x26e7a3,_0x2330e6;_0x2330e6=_0x2f3187();if(window[_0xe402('0xfa')]['allowRecalculate']){_0x3fe070(_0xe402('0x154'))[_0xe402('0x13b')]();_0x3fe070(_0xe402('0x155'))[_0xe402('0x48')](_0xe402('0x156'));}for(var _0x440fc3 in window['_QuatroDigital_AmountProduct'][_0xe402('0x3d')]){_0xce439b=window[_0xe402('0xfa')][_0xe402('0x3d')][_0x440fc3];if(typeof _0xce439b!=='object')return;_0x26e7a3=_0x3fe070(_0xe402('0x157')+_0xce439b[_0xe402('0x158')]+']')[_0xe402('0xb4')]('li');if(!window['_QuatroDigital_AmountProduct'][_0xe402('0x159')]&&_0x26e7a3[_0xe402('0x4f')](_0xe402('0x154'))[_0xe402('0x20')])continue;_0x4d819b=_0x3fe070(_0xa0248a);_0x4d819b[_0xe402('0x4f')](_0xe402('0x15a'))[_0xe402('0x4d')](_0xce439b[_0xe402('0x3b')]);var _0x5891ee=_0x26e7a3[_0xe402('0x4f')]('.qd_bap_wrapper_content');if(_0x5891ee['length'])_0x5891ee[_0xe402('0xad')](_0x4d819b)['addClass']('qd-bap-item-added');else _0x26e7a3['prepend'](_0x4d819b);}if(_0x2330e6)window['_QuatroDigital_AmountProduct']['allowRecalculate']=![];};var _0x2f3187=function(){if(!window[_0xe402('0xfa')]['allowRecalculate'])return;var _0x34bf83=![],_0x7f638d={};window[_0xe402('0xfa')][_0xe402('0x3d')]={};for(var _0x19f143 in window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')]){if(typeof window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')][_0x19f143]!==_0xe402('0x27'))continue;var _0x3f025f=window[_0xe402('0x55')][_0xe402('0x24')][_0xe402('0x3d')][_0x19f143];if(typeof _0x3f025f[_0xe402('0x15b')]===_0xe402('0x9')||_0x3f025f['productId']===null||_0x3f025f[_0xe402('0x15b')]==='')continue;window[_0xe402('0xfa')][_0xe402('0x3d')]['prod_'+_0x3f025f[_0xe402('0x15b')]]=window['_QuatroDigital_AmountProduct'][_0xe402('0x3d')][_0xe402('0x15c')+_0x3f025f['productId']]||{};window[_0xe402('0xfa')][_0xe402('0x3d')]['prod_'+_0x3f025f[_0xe402('0x15b')]][_0xe402('0x158')]=_0x3f025f[_0xe402('0x15b')];if(!_0x7f638d['prod_'+_0x3f025f[_0xe402('0x15b')]])window['_QuatroDigital_AmountProduct'][_0xe402('0x3d')]['prod_'+_0x3f025f['productId']]['qtt']=0x0;window[_0xe402('0xfa')]['items']['prod_'+_0x3f025f[_0xe402('0x15b')]][_0xe402('0x3b')]=window['_QuatroDigital_AmountProduct'][_0xe402('0x3d')]['prod_'+_0x3f025f[_0xe402('0x15b')]][_0xe402('0x3b')]+_0x3f025f[_0xe402('0x148')];_0x34bf83=!![];_0x7f638d[_0xe402('0x15c')+_0x3f025f['productId']]=!![];}return _0x34bf83;};window['_QuatroDigital_AmountProduct'][_0xe402('0xfb')]=function(){window['_QuatroDigital_AmountProduct'][_0xe402('0x159')]=!![];_0x1ec7fa['call'](this);};_0x3fe070(document)['ajaxStop'](function(){_0x1ec7fa[_0xe402('0x5d')](this);});}catch(_0x75bdc){if(typeof console!==_0xe402('0x9')&&typeof console['error']==='function')console[_0xe402('0xe')](_0xe402('0x61'),_0x75bdc);}}(this));(function(){'use strict';try{var _0x513aab=jQuery,_0x1adfb2;var _0x36a5a5=_0xe402('0x15d');var _0x83805=function(_0x2eb508,_0x2c6b43){if(_0xe402('0x27')===typeof console&&_0xe402('0x9')!==typeof console[_0xe402('0xe')]&&_0xe402('0x9')!==typeof console[_0xe402('0x2a')]&&_0xe402('0x9')!==typeof console[_0xe402('0x29')]){var _0x20be6b;_0xe402('0x27')===typeof _0x2eb508?(_0x2eb508[_0xe402('0x67')]('['+_0x36a5a5+']\x0a'),_0x20be6b=_0x2eb508):_0x20be6b=['['+_0x36a5a5+']\x0a'+_0x2eb508];if(_0xe402('0x9')===typeof _0x2c6b43||_0xe402('0x4a')!==_0x2c6b43[_0xe402('0x6')]()&&_0xe402('0x69')!==_0x2c6b43['toLowerCase']())if(_0xe402('0x9')!==typeof _0x2c6b43&&_0xe402('0x2a')===_0x2c6b43[_0xe402('0x6')]())try{console[_0xe402('0x2a')][_0xe402('0x6a')](console,_0x20be6b);}catch(_0x1686f1){try{console[_0xe402('0x2a')](_0x20be6b[_0xe402('0x21')]('\x0a'));}catch(_0x33223a){}}else try{console[_0xe402('0xe')][_0xe402('0x6a')](console,_0x20be6b);}catch(_0x1cd5aa){try{console[_0xe402('0xe')](_0x20be6b[_0xe402('0x21')]('\x0a'));}catch(_0x52adbf){}}else try{console[_0xe402('0x29')][_0xe402('0x6a')](console,_0x20be6b);}catch(_0x4706c9){try{console[_0xe402('0x29')](_0x20be6b[_0xe402('0x21')]('\x0a'));}catch(_0x1850d2){}}}};var _0x3c637a={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x513aab['QD_smartCart']=function(_0x18c3db){var _0x293765,_0x46df12={};_0x1adfb2=_0x513aab[_0xe402('0xf')](!![],{},_0x3c637a,_0x18c3db);_0x293765=_0x513aab(_0x1adfb2['selector'])[_0xe402('0xb7')](_0x1adfb2[_0xe402('0x15e')]);if(typeof _0x1adfb2[_0xe402('0x15e')][_0xe402('0xef')]!==_0xe402('0x9')&&_0x1adfb2[_0xe402('0x15e')][_0xe402('0xef')]===![])_0x46df12[_0xe402('0x87')]=_0x513aab(_0x1adfb2['selector'])[_0xe402('0xab')](_0x293765['fn'],_0x1adfb2[_0xe402('0x87')]);else _0x46df12[_0xe402('0x87')]=_0x513aab(_0x1adfb2[_0xe402('0x83')])['QD_buyButton'](_0x1adfb2['buyButton']);_0x46df12[_0xe402('0x15e')]=_0x293765;return _0x46df12;};_0x513aab['fn'][_0xe402('0x15f')]=function(){if(typeof console==='object'&&typeof console['info']==='function')console['info'](_0xe402('0x160'));};_0x513aab[_0xe402('0x15f')]=_0x513aab['fn'][_0xe402('0x15f')];}catch(_0x16b9ac){if(typeof console!==_0xe402('0x9')&&typeof console['error']===_0xe402('0x0'))console[_0xe402('0xe')](_0xe402('0x61'),_0x16b9ac);}}());
var _0x5354=['fadeTo','<img\x20src=\x22','\x22\x20alt=\x22\x22\x20class=\x22vtex-cpSkuImage\x22\x20style=\x22display:none;\x22\x20data-sku=\x22','\x22\x20/>','load','hide','.vtex-cpSkuImage[data-sku=\x27','setOriginalImg','imageLabel','.qd_cpProductInfoWrap','setOriginalLink','setOriginalSaveText','productOriginalLink','thumbImgId','css','background-image','url(\x27','.qd-cpInnerLink','\x22\x20alt=\x22\x22\x20class=\x22vtex-cpImgsThumb\x20vtex-cpThumb_','thumbByLabel','Esse\x20método\x20foi\x20descontinuado\x20=/','substr','image','IsMain','Path','Não\x20foi\x20possível\x20obter\x20a\x20imagem\x20padrão\x20do\x20SKU\x20pois\x20o\x20objeto\x20fornecido\x20no\x20ambiente\x20SmartCheckout\x20é\x20inexistente\x20ou\x20esta\x20em\x20um\x20formato\x20não\x20esperado.\x20SKU:','Não\x20foi\x20possível\x20obter\x20a\x20imagem\x20da\x20thumb\x20por\x20label.\x20SKU:','imageUrl','width','thumbSize','vtex-cp_','a[href=\x27','.qd_cpUri','qd_cpProductLink','<div\x20class=\x22vtex-cpImgOverlay\x22></div>','parent','vtex-cpProductImage','<span\x20class=\x22vtex-cpProductTextWrap\x22><div\x20class=\x22vtex-cpOverlay\x22></div></span>','<span\x20class=\x22qd_cpProductInfoWrap\x22></span>','before','appendTo','.qd_cpProductUnavailable','saveCount','\x20R$\x20#value','similarProducts','limitRequestSimilarProducts','prod','skus','skuProduct','ajaxCallback','QuatroDigital.cp_ajaxCallback','Ocorreu\x20um\x20problema\x20após\x20o\x20retorno\x20da\x20requisição\x20a\x20api\x20de\x20produto\x20da\x20VTEX.\x20Detalhes:\x20','qdSessionStorage','getItem','QD_cp_prod_info_','Problemas\x20ao\x20usar\x20o\x20cache.\x20','/api/catalog_system/pub/products/variations/','Erro\x20ao\x20tentar\x20obter\x20os\x20dados\x20de\x20SKU\x20do\x20produto','fullData','qdAjax','/produto/sku/','json','Erro\x20ao\x20tentar\x20obter\x20todos\x20os\x20dados\x20do\x20SKU.','init','QuatroDigital.cp_callback','QD_coresPrateleira','location','href','toLowerCase','indexOf','debugcp','Cores\x20Prateleira','object','unshift','undefined','info','apply','warn','alerta','aviso','error','parse','stringify','li[layout]','Não\x20foi\x20posssível\x20obter\x20as\x20informações\x20deste\x20item.','.sku-selector[name=\x27espec_0\x27]','skuname','Name','auto','Cor','replace','Erro\x20no\x20callback\x20\x27imageUrl\x27.\x20','message','/cores-prateleira','enhwb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','nhwbdn2%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','div[id*=\x22ResultItems_\x22]','selector','Ei\x20Psiuu!\x20Você\x20esta\x20selecionando\x20um\x20elemento\x20que\x20é\x20filho\x20de\x20“div[id*=ResultItems_]”,\x20tem\x20certeza\x20que\x20este\x20seletor\x20esta\x20correto?\x20Selecionar\x20um\x20filho\x20direto\x20desta\x20div\x20(ResultItems)\x20sem\x20especifica-la\x20no\x20seletor\x20pode\x20causar\x20comportamentos\x20bizarrooooos\x20do\x20Cores.\x20#fkdica','productShelf','each','hasClass','exec','find','productsLi','not','.helperComplement','length','Prateleira\x20não\x20encontrada\x20\x0a\x20(','addClass','vtex-cpIsActivated','autoSetup','shelfSetup','.qd_cpSkuList','toString','groupSku','groupSkuByDimension2','\x20possui\x20','\x20SKUs\x20ao\x20total\x20mas\x20após\x20o\x20agrupamento\x20por\x20especificação\x20não\x20restou\x20nenhum\x20SKU\x20para\x20este\x20produto.\x20Certifique-se\x20de\x20ter\x20passado\x20o\x20parametro\x20correto\x20para\x20a\x20opçõão\x20\x22dimensions\x22.','.vtex-cpProductImage\x20img','qd_cpShow','removeClass','qd_cpHide','function','string','number','minSkuQttShow','thumbsQuantity','.qd_cpViewMore','text','trim','SkuDataCache','sku','available','O\x20sku\x20“','”\x20foi\x20ignorado\x20pois\x20não\x20possui\x20estoque.\x20Wrapper:\x20','checkLinkEquals','attr','”\x20foi\x20ignorado\x20pois\x20tem\x20o\x20mesmo\x20link\x20que\x20o\x20produto\x20existente\x20na\x20vitrine.\x0a\x20URI:\x20','”\x20foi\x20ignorado\x20pois\x20já\x20existe\x20uma\x20thumb\x20na\x20vitrine\x20com\x20o\x20mesmo\x20link.\x0a\x20URI:\x20','data','qd-cp-show-sku-availables','addSkuIdInURL','<a\x20href=\x22','\x22></a>','search','idsku=','\x20vtex-cpSkuId_','\x20qd_cpHide\x27\x20','data-primary-sku=\x221\x22','><span\x20class=\x27vtex-cpInner\x27><a\x20href=\x27','\x27\x20class=\x27qd-cpInnerLink\x27></a></span><span\x20class=\x27vtex-cpInner2\x27></span></span>','append','setThumbs','qd-cp-thumbs-count-','.vtex-cpSkuIds','vtex-cpFirst','trigger','split','O\x20campo\x20produto\x20não\x20esta\x20retornando\x20nenhum\x20valor.\x0a\x20Produto:\x20','.qd_cpProductLink[title]:first','title','[Título\x20não\x20encontrado]','val','Não\x20foi\x20possível\x20obter\x20a\x20URL\x20do\x20produto\x20no\x20campo\x20“qd_cpUri”.','getProductInfo','QuatroDigital.cp_liAjaxCallback','isSmartCheckout','call','.qd_cpProdId','pop','shift','push','dimension2','dimensions','productId','checkIsAvaliable','O\x20Cores\x20ainda\x20não\x20tem\x20as\x20funcionalidades\x20necessárias\x20para\x20usar\x20o\x20parametro\x20“checkIsAvaliable”\x20em\x20conjunto\x20com\x20“groupSkuByDimension2”,\x20necessário\x20desenvolver\x20o\x20código\x20para\x20dar\x20suporte\x20a\x20isso.','checkDuplicateSKUByDimenion','dimension','uniqueSkuByDimension','concat','vtex-cpLoadingData','loadSku','.vtex-cpOverlay','action','thumbRendered','productHtml','mouseActions2','setClass','bind','mouseenter.qd_cp_mouse','.vtex_cpActiveSku','vtex_cpActiveSku','restoreOriginalDetails','children','.qd_cpProductLink:first','.vtex-cpSave','productOriginalSave','html','class','formatInfo','mouseleave.qd_cp_mouse','onHover','QuatroDigital.cp_thumbMouseleave','Availability','forceAvailable','.qd_cpProductInfo','installments','listPrice','bestPrice','Price','.qd_cpBestPrice','currency','numberFormat','saveText','#value','.qd_cpListPriceWrap','.qd_cpInstallment','.qd_cpNumbersOfInstallment','.qd_cpInstallmentValue','BestInstallmentValue','.qd_cpFullRegularPrice','replaceProductName','productName','productNameLimiter','.qd-cpProductName','productNameStopInLastWord','substring','\x20...','.qd_cpProductLink','.vtex-cpProductImage','naturalWidth','height','naturalHeight','imageSize','getImageUrl','productImgId','src','stop','fadeOut','.vtex-cpSkuImage','qd-visible','speedFade','data-sku','data-sku-label','siblings','[data-sku=\x27'];(function(_0xe62388,_0x20a8dc){var _0x364a83=function(_0x3c3718){while(--_0x3c3718){_0xe62388['push'](_0xe62388['shift']());}};_0x364a83(++_0x20a8dc);}(_0x5354,0x141));var _0x4535=function(_0x332d34,_0x36cb2a){_0x332d34=_0x332d34-0x0;var _0x32088a=_0x5354[_0x332d34];return _0x32088a;};(function(_0x460826,_0x4e99d1){'use strict';if(typeof _0x4e99d1['fn'][_0x4535('0x0')]==='function')return;_0x4e99d1['fn'][_0x4535('0x0')]=function(){};_0x4e99d1[_0x4535('0x0')]={};var _0x43b2ca,_0x3962ca,_0x2a86a4,_0x355667,_0x407a26;var _0x1e1bb5=document[_0x4535('0x1')][_0x4535('0x2')][_0x4535('0x3')]()[_0x4535('0x4')](_0x4535('0x5'))>-0x1;var _0x573085=_0x4535('0x6');var _0x5a9f5e=function(_0x29942c,_0x145acb){if(_0x4535('0x7')===typeof console){var _0x4c4945;_0x4535('0x7')===typeof _0x29942c?(_0x29942c[_0x4535('0x8')]('['+_0x573085+']\x0a'),_0x4c4945=_0x29942c):_0x4c4945=['['+_0x573085+']\x0a'+_0x29942c];'undefined'===typeof _0x145acb||'alerta'!==_0x145acb[_0x4535('0x3')]()&&'aviso'!==_0x145acb['toLowerCase']()?_0x4535('0x9')!==typeof _0x145acb&&'info'===_0x145acb['toLowerCase']()?console[_0x4535('0xa')][_0x4535('0xb')](console,_0x4c4945):console['error'][_0x4535('0xb')](console,_0x4c4945):console[_0x4535('0xc')][_0x4535('0xb')](console,_0x4c4945);}};var _0x2963b7=function(_0x243552,_0xae6810){if(_0x4535('0x7')===typeof console&&_0x1e1bb5){var _0x677518;_0x4535('0x7')===typeof _0x243552?(_0x243552['unshift']('['+_0x573085+']\x0a'),_0x677518=_0x243552):_0x677518=['['+_0x573085+']\x0a'+_0x243552];_0x4535('0x9')===typeof _0xae6810||_0x4535('0xd')!==_0xae6810['toLowerCase']()&&_0x4535('0xe')!==_0xae6810[_0x4535('0x3')]()?'undefined'!==typeof _0xae6810&&_0x4535('0xa')===_0xae6810['toLowerCase']()?console[_0x4535('0xa')][_0x4535('0xb')](console,_0x677518):console[_0x4535('0xf')][_0x4535('0xb')](console,_0x677518):console['warn'][_0x4535('0xb')](console,_0x677518);}};var _0x452c0f=![];try{JSON[_0x4535('0x10')](JSON[_0x4535('0x11')]({'a':'b'}));_0x452c0f=!![];}catch(_0x1741dd){_0x5a9f5e('Este\x20navegador\x20não\x20tem\x20suporte\x20a\x20JSON\x20functions',_0x4535('0xd'));};var _0x2851f7={'productsLi':_0x4535('0x12'),'messageRequestFail':_0x4535('0x13'),'saveText':'Economize:\x20R$\x20#value','currency':'R$\x20','skuGroupSelector':_0x4535('0x14'),'restoreOriginalDetails':![],'checkLinkEquals':![],'forceAvailable':![],'forceImgList':![],'autoSetup':!![],'checkIsAvaliable':![],'useProductField':![],'checkDuplicateUri':!![],'replaceProductName':![],'productNameLimiter':null,'productNameStopInLastWord':![],'productName':function(_0x5e1986,_0x336295){return _0x5e1986[_0x4535('0x15')]||_0x5e1986[_0x4535('0x16')];},'checkDuplicateSKUByDimenion':!![],'addSkuIdInURL':!![],'speedFade':0xc8,'thumbsQuantity':0x4,'minSkuQttShow':0x2,'thumbByLabel':null,'thumbSize':{'width':0x24,'height':0x24},'imageSize':_0x4535('0x17'),'groupSkuByDimension':!![],'groupSkuByDimension2':!![],'dimensions':[_0x4535('0x18')],'imageLabel':[null],'primarySkuThumb':null,'limitRequestSimilarProducts':!![],'ajaxCallback':function(){},'callback':function(){},'thumbRendered':function(_0xdd5b25,_0x14f278,_0x456757,_0x411a2d,_0x1b0a0a){},'imageUrl':function(_0x270613,_0x3608f1,_0x1fbb7b){try{return _0x270613[_0x4535('0x19')](/(ids\/[0-9]+\-)([0-9]+\-[0-9]+)/i,'$1'+_0x3608f1+'-'+_0x1fbb7b);}catch(_0x2b61a4){_0x5a9f5e([_0x4535('0x1a'),_0x2b61a4[_0x4535('0x1b')]],_0x4535('0xd'));return'';}},'similarProducts':function(_0x569acf,_0x44216f,_0x3490e7,_0x4c735c){_0x4c735c(![]);},'isSmartCheckout':!![],'action':0x2,'productImgId':0x1e,'thumbImgId':0x3,'productPageUrl':_0x4535('0x1c')};var _0x79c14b=function(_0x29daab){var _0x59fb2c={'n':_0x4535('0x1d'),'ne':_0x4535('0x1e')};return function(_0x299fb9){var _0x4ac1a9,_0x3c1a26,_0x40c05b,_0xb7d155;_0x3c1a26=function(_0x2a3547){return _0x2a3547;};_0x40c05b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x299fb9=_0x299fb9['d'+_0x40c05b[0x10]+'c'+_0x40c05b[0x11]+'m'+_0x3c1a26(_0x40c05b[0x1])+'n'+_0x40c05b[0xd]]['l'+_0x40c05b[0x12]+'c'+_0x40c05b[0x0]+'ti'+_0x3c1a26('o')+'n'];_0x4ac1a9=function(_0x443132){return escape(encodeURIComponent(_0x443132[_0x4535('0x19')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x121bd7){return String[_0x4535('0x1f')](('Z'>=_0x121bd7?0x5a:0x7a)>=(_0x121bd7=_0x121bd7[_0x4535('0x20')](0x0)+0xd)?_0x121bd7:_0x121bd7-0x1a);})));};var _0x15d933=_0x4ac1a9(_0x299fb9[[_0x40c05b[0x9],_0x3c1a26('o'),_0x40c05b[0xc],_0x40c05b[_0x3c1a26(0xd)]][_0x4535('0x21')]('')]);_0x4ac1a9=_0x4ac1a9((window[['js',_0x3c1a26('no'),'m',_0x40c05b[0x1],_0x40c05b[0x4]['toUpperCase'](),_0x4535('0x22')][_0x4535('0x21')]('')]||_0x4535('0x23'))+['.v',_0x40c05b[0xd],'e',_0x3c1a26('x'),'co',_0x3c1a26('mm'),_0x4535('0x24'),_0x40c05b[0x1],'.c',_0x3c1a26('o'),'m.',_0x40c05b[0x13],'r'][_0x4535('0x21')](''));for(var _0x425d29 in _0x59fb2c){if(_0x4ac1a9===_0x425d29+_0x59fb2c[_0x425d29]||_0x15d933===_0x425d29+_0x59fb2c[_0x425d29]){_0xb7d155='tr'+_0x40c05b[0x11]+'e';break;}_0xb7d155='f'+_0x40c05b[0x0]+'ls'+_0x3c1a26(_0x40c05b[0x1])+'';}_0x3c1a26=!0x1;-0x1<_0x299fb9[[_0x40c05b[0xc],'e',_0x40c05b[0x0],'rc',_0x40c05b[0x9]][_0x4535('0x21')]('')][_0x4535('0x4')](_0x4535('0x25'))&&(_0x3c1a26=!0x0);return[_0xb7d155,_0x3c1a26];}(_0x29daab);}(window);if(!eval(_0x79c14b[0x0]))return _0x79c14b[0x1]?_0x5a9f5e('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4e99d1['fn'][_0x4535('0x0')]=function(_0x1ed1f8){'use strict';try{var _0x27e134=_0x4e99d1('');var _0x56602e=/https?\:\/\/[^\/\?#]+/i;var _0x34c433=_0x4e99d1[_0x4535('0x26')](!![],{},_0x2851f7,_0x1ed1f8);var _0xfecb3={'loadSkuJqxhr':null,'productOriginalInfo':null,'productOriginalLink':null,'productOriginalSave':null,'saveCount':0x0,'onHover':![],'skuList':[],'skuQueue':[],'skuProduct':{},'productHtml':{},'productShelf':null,'productSkus':{},'init':function(){if(_0xfecb3['productShelf']['parent']()['is'](_0x4535('0x27'))&&_0xfecb3['productShelf'][_0x4535('0x28')][_0x4535('0x4')]('ResultItems')<0x0)_0x5a9f5e(_0x4535('0x29'),_0x4535('0xd'));_0xfecb3[_0x4535('0x2a')][_0x4535('0x2b')](function(_0x3e3fef){var _0x13026e=_0x4e99d1(this);if(!_0x13026e[_0x4535('0x2c')]('vtex-cpIsActivated'))_0xfecb3[_0x4535('0x2d')](_0x13026e,_0x3e3fef);});},'exec':function(_0x4d5e32,_0x583288){var _0x9b6196=_0x4d5e32[_0x4535('0x2e')](_0x34c433[_0x4535('0x2f')])[_0x4535('0x30')](_0x4535('0x31'));if(_0x9b6196[_0x4535('0x32')]<0x1){_0x5a9f5e(_0x4535('0x33')+_0x9b6196['selector']+')');return![];}_0x4d5e32[_0x4535('0x34')](_0x4535('0x35'));_0x9b6196[_0x4535('0x2b')](function(_0x1cc959){var _0x288fad,_0x56a16b,_0x59f8e1,_0x50ced8,_0x7308d0,_0x30dcf7,_0x48c5c0,_0xe9c449,_0x182780,_0x107bbe,_0x3da901,_0x70c4ed,_0x3f54aa;_0x288fad=_0x4e99d1(this);if(!![]===_0x34c433[_0x4535('0x36')])_0xfecb3[_0x4535('0x37')](_0x288fad);_0x56a16b=_0x288fad[_0x4535('0x2e')](_0x4535('0x38'));_0x59f8e1=_0x288fad[_0x4535('0x2e')]('.vtex-cpProductField');_0x48c5c0=_0x583288[_0x4535('0x39')]()+'_'+_0x1cc959['toString']();_0x182780=function(_0x1d6a20,_0x5c0f4b){_0x30dcf7=_0xfecb3[_0x4535('0x3a')](_0x1d6a20,_0x48c5c0);if(_0x34c433[_0x4535('0x3b')])_0x7308d0=_0xfecb3['groupSkuByDimension2'](_0x30dcf7,_0x5c0f4b);else if(_0x34c433['groupSkuByDimension'])_0x7308d0=_0xfecb3['groupSkuByDimension'](_0x30dcf7,_0x5c0f4b);else _0x7308d0=_0x30dcf7;if(_0x30dcf7[_0x4535('0x32')]>0x0&&_0x7308d0[_0x4535('0x32')]===0x0)_0x2963b7('O\x20produto\x20id\x20'+_0x5c0f4b+_0x4535('0x3c')+_0x1d6a20[_0x4535('0x32')]+_0x4535('0x3d'),'alerta');_0x288fad[_0x4535('0x2e')](_0x4535('0x3e'))[_0x4535('0x34')]('vtex-cpOriginalImage');if(_0x34c433['forceAvailable']||_0x34c433['forceImgList'])_0x56a16b[_0x4535('0x34')](_0x4535('0x3f'))[_0x4535('0x40')](_0x4535('0x41'));var _0x394304=null;if(typeof _0x34c433['primarySkuThumb']===_0x4535('0x42')){_0x394304=_0x34c433['primarySkuThumb'](_0x288fad);if(typeof _0x394304===_0x4535('0x43')&&_0x394304!==''||typeof _0x394304===_0x4535('0x44')){for(var _0x5c8b1a=0x0;_0x5c8b1a<_0x7308d0[_0x4535('0x32')];_0x5c8b1a++){if(_0x7308d0[_0x5c8b1a][0x1]==_0x394304){var _0x5cf8f6=_0x7308d0[_0x5c8b1a];_0x7308d0[_0x5c8b1a]=_0x7308d0[0x0];_0x7308d0[0x0]=_0x5cf8f6;break;}}}}_0x3f54aa=_0x7308d0[_0x4535('0x32')];if(_0x3f54aa>=_0x34c433[_0x4535('0x45')]){if(_0x3f54aa>_0x34c433[_0x4535('0x46')]){_0x288fad[_0x4535('0x2e')](_0x4535('0x47'))['addClass']('qd_cpShow')[_0x4535('0x40')](_0x4535('0x41'));_0x288fad['find']('.qd-cp-sku-qtt')[_0x4535('0x48')](_0x3f54aa);}var _0x4f310e,_0x4e0293,_0x490310,_0x55d723,_0x17f9f6,_0x2d84bf;for(var _0x5c8b1a=0x0;_0x5c8b1a<_0x3f54aa;_0x5c8b1a++){_0x4f310e=_0x7308d0[_0x5c8b1a][0x1];_0x4e0293=_0x7308d0[_0x5c8b1a][0x0][_0x4535('0x49')]();_0x490310=_0x4e0293[_0x4535('0x19')](_0x56602e,'');if(_0x34c433['checkIsAvaliable']&&!_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')][_0x4535('0x4b')][_0x4f310e][_0x4535('0x4c')]){_0x2963b7([_0x4535('0x4d')+_0x4f310e+_0x4535('0x4e'),_0x288fad],_0x4535('0xa'));continue;}if(_0x34c433[_0x4535('0x4f')]){if(_0x490310==(_0x288fad[_0x4535('0x2e')]('.qd_cpProductLink:first')[_0x4535('0x50')](_0x4535('0x2'))||'')[_0x4535('0x49')]()['replace'](_0x56602e,'')){_0x2963b7(_0x4535('0x4d')+_0x4f310e+_0x4535('0x51')+_0x490310,'info');continue;}}if(_0x34c433['checkDuplicateUri']&&_0x288fad[_0x4535('0x2e')]('.vtex-cpSkuIds[ref=\x27'+_0x490310+'\x27]')[_0x4535('0x32')]>0x0){_0x2963b7('O\x20sku\x20“'+_0x4f310e+_0x4535('0x52')+_0x490310,'info');continue;}_0x55d723=_0x288fad['data']('qd-cp-sku-count')||0x0;_0x288fad[_0x4535('0x53')]('qd-cp-sku-count',_0x55d723+0x1);if(_0x55d723>=_0x34c433['thumbsQuantity']-0x1){_0x288fad[_0x4535('0x2e')](_0x4535('0x47'))[_0x4535('0x34')](_0x4535('0x54'));break;}else if(_0x4f310e!==''){_0x2d84bf=_0x4e0293;if(_0x34c433[_0x4535('0x55')]){_0x2d84bf=_0x4e99d1(_0x4535('0x56')+_0x4e0293+_0x4535('0x57'))[0x0];_0x2d84bf[_0x4535('0x58')]+=(_0x2d84bf[_0x4535('0x58')]['length']?'&':'')+_0x4535('0x59')+_0x4f310e;_0x2d84bf=_0x2d84bf[_0x4535('0x2')];}_0x17f9f6=_0x4e99d1('<span\x20class=\x27vtex-cpSkuIds\x20vtex-cpIndex_'+(_0x55d723-0x1)+_0x4535('0x5a')+_0x4f310e+_0x4535('0x5b')+(_0x394304==_0x4f310e?_0x4535('0x5c'):'')+_0x4535('0x5d')+_0x2d84bf+_0x4535('0x5e'));_0x17f9f6['attr']({'ref':_0x490310,'id':_0x4f310e});_0x56a16b[_0x4535('0x5f')](_0xfecb3[_0x4535('0x60')](_0x288fad,_0x4f310e,_0x17f9f6,_0x4e0293,_0x48c5c0));_0x55d723++;}}}_0x56a16b[_0x4535('0x34')](_0x4535('0x61')+_0x56a16b[_0x4535('0x2e')]('.vtex-cpSkuIds')[_0x4535('0x32')]);_0x70c4ed=_0x288fad[_0x4535('0x2e')](_0x4535('0x62'));if(_0x70c4ed[_0x4535('0x32')]>=_0x34c433[_0x4535('0x45')])_0x70c4ed['removeClass'](_0x4535('0x41'));_0x70c4ed['first']()[_0x4535('0x34')](_0x4535('0x63'));_0x4e99d1(window)[_0x4535('0x64')]('QuatroDigital.cp_thumbsWrapperAdd',{'li':_0x288fad,'wrapper':_0x56a16b,'data':_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]});};if(_0x34c433['useProductField']){_0x50ced8=_0x59f8e1[_0x4535('0x2e')]('li')[_0x4535('0x48')]()[_0x4535('0x49')]()[_0x4535('0x65')]('|');if(_0x1e1bb5){if(_0x59f8e1[_0x4535('0x2e')]('li')[_0x4535('0x48')]()[_0x4535('0x49')]()==='')_0x2963b7(_0x4535('0x66')+(_0x288fad[_0x4535('0x2e')](_0x4535('0x67'))[_0x4535('0x50')](_0x4535('0x68'))||_0x4535('0x69')),_0x4535('0xa'));}_0x182780(_0x50ced8);}else{_0xe9c449=_0x288fad[_0x4535('0x2e')]('.qd_cpProdId')[_0x4535('0x6a')]();_0x107bbe=_0x288fad[_0x4535('0x2e')]('.qd_cpUri')[_0x4535('0x6a')]();if(typeof _0xe9c449===_0x4535('0x9'))_0x5a9f5e(['Não\x20foi\x20possível\x20obter\x20o\x20ID\x20do\x20produto\x20no\x20campo\x20“qd_cpProdId”.',_0x288fad]);if(typeof _0x107bbe===_0x4535('0x9'))_0x5a9f5e(_0x4535('0x6b'));_0xfecb3[_0x4535('0x6c')](function(_0x3f21a4,_0x251473){_0x182780(_0x3f21a4,_0xe9c449);_0x4e99d1(window)[_0x4535('0x64')](_0x4535('0x6d'),{'li':_0x288fad,'wrapper':_0x56a16b});},_0xe9c449,_0x107bbe,_0x288fad);}});},'getProductInfo':function(_0x3007e3,_0xd814e2,_0x41b33e,_0x5a382e){if(_0x34c433[_0x4535('0x6e')])_0x43b2ca[_0x4535('0x6f')](this,_0x3007e3,_0xd814e2,_0x41b33e,_0x5a382e);else{}},'getRelatedProductInfo':function(_0x1b5d04){var _0x4b86de,_0x272431,_0xd7ad0a=[_0x1b5d04];_0x4b86de=_0x1b5d04[_0x4535('0x2e')](_0x4535('0x70'))[_0x4535('0x6a')]();_0x272431=_0x1b5d04[_0x4535('0x2e')]('.qd_cpUri')[_0x4535('0x6a')]();if(typeof _0x4b86de!==_0x4535('0x9')&&typeof _0x272431!==_0x4535('0x9'))_0xd7ad0a=[_0x4b86de,_0x272431,_0x1b5d04];return _0xd7ad0a;},'groupSku':function(_0x6ca33f,_0x4030ee){var _0x5a88ed={},_0x2eaf1b={},_0x3c1c0b=[],_0x3b2ef3,_0x1ae7db,_0x47e587,_0x53572a,_0x51890e;_0x53572a=_0x6ca33f[_0x4535('0x32')];if(_0x53572a<0x2&&_0x6ca33f[0x0]==='')return _0x3c1c0b;for(var _0x258565=0x0;_0x258565<_0x53572a;_0x258565++){_0x3b2ef3=_0x6ca33f[_0x258565]['split'](';');_0x1ae7db=_0x3b2ef3[_0x4535('0x71')]();_0x47e587=_0x3b2ef3[_0x4535('0x72')]();if(typeof _0x1ae7db!=_0x4535('0x9')){if(typeof _0x5a88ed[_0x47e587]==_0x4535('0x9'))_0x5a88ed[_0x47e587]=[_0x1ae7db];else _0x5a88ed[_0x47e587][_0x4535('0x73')](_0x1ae7db);}}for(var _0x49f0f5 in _0x5a88ed){_0x53572a=_0x5a88ed[_0x49f0f5][_0x4535('0x32')],_0x51890e=[];if(_0x53572a>0x3){var _0x345f09,_0x3d61a8,_0x219fb4;_0x345f09=parseInt(_0x53572a/0x3,0xa);_0x3d61a8=_0x53572a%0x3;_0x219fb4=_0x345f09*0x2;for(_0x258565=0x0;_0x258565<_0x345f09;_0x258565++){_0x51890e[_0x4535('0x73')](_0x5a88ed[_0x49f0f5][_0x258565]);_0x51890e['push'](_0x5a88ed[_0x49f0f5][_0x258565+_0x345f09]);_0x51890e[_0x4535('0x73')](_0x5a88ed[_0x49f0f5][_0x258565+_0x219fb4]);}if(_0x3d61a8==0x1)_0x51890e[_0x4535('0x73')](_0x5a88ed[_0x49f0f5][_0x53572a-0x1]);else if(_0x3d61a8==0x2){_0x51890e['push'](_0x5a88ed[_0x49f0f5][_0x53572a-0x1]);_0x51890e[_0x4535('0x73')](_0x5a88ed[_0x49f0f5][_0x53572a-0x2]);}}else _0x51890e=_0x5a88ed[_0x49f0f5];_0x3c1c0b['push']([_0x51890e[_0x4535('0x72')](),_0x49f0f5]);_0x2eaf1b[_0x49f0f5]=_0x51890e;}return _0x3c1c0b;},'groupSkuByDimension2':function(_0x21ba12,_0xdf37e1){var _0xe67c6,_0x2fd236,_0x457937;_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x74')]=_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')][_0x4535('0x74')]||{};for(var _0x688def=0x0;_0x688def<_0x21ba12['length'];_0x688def++){_0x457937=_0x21ba12[_0x688def][0x1];_0x2fd236=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x4b')][_0x457937];_0xe67c6=[];for(var _0x710cea=0x0;_0x710cea<_0x34c433[_0x4535('0x75')]['length'];_0x710cea++){if(typeof _0x2fd236[_0x4535('0x75')][_0x34c433[_0x4535('0x75')][_0x710cea]]==='string')_0xe67c6[_0x4535('0x73')](_0x34c433[_0x4535('0x75')][_0x710cea]);}_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension2'][_0x2fd236[_0x4535('0x76')]]=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x74')][_0x2fd236[_0x4535('0x76')]]||{};for(var _0x54d19b=0x0;_0x54d19b<_0xe67c6['length'];_0x54d19b++){if(_0x34c433[_0x4535('0x77')])_0x5a9f5e(_0x4535('0x78'));if(typeof _0x2fd236[_0x4535('0x75')][_0xe67c6[_0x54d19b]]!=_0x4535('0x9')&&typeof _0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension2'][_0x2fd236[_0x4535('0x76')]][_0x2fd236[_0x4535('0x75')][_0xe67c6[_0x54d19b]]]==_0x4535('0x9'))_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x74')][_0x2fd236[_0x4535('0x76')]][_0x2fd236[_0x4535('0x75')][_0xe67c6[_0x54d19b]]]=_0x21ba12[_0x688def];}}var _0x123f9f=[];for(var _0xaefdda in _0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension2'][_0x2fd236[_0x4535('0x76')]])_0x123f9f['push'](_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x74')][_0x2fd236['productId']][_0xaefdda]);return _0x123f9f;},'groupSkuByDimension':function(_0x446a35,_0x55a466){if(!_0x34c433[_0x4535('0x6e')])return _0x446a35;if(!_0x34c433[_0x4535('0x79')])return _0x446a35;var _0x2aad72,_0x4e8924,_0xac8c2b,_0x315cb6;_0x2aad72=[];_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')]=_0x4e99d1[_0x4535('0x0')]['SkuDataCache']['dimension']||{};if(typeof _0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension'][_0x55a466]!==_0x4535('0x9')&&typeof _0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension'][_0x55a466]['uniqueSkuByDimension']===_0x4535('0x7')&&_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0x55a466][_0x4535('0x7b')][_0x4535('0x32')]>0x0)return _0x2aad72[_0x4535('0x7c')](_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0x55a466][_0x4535('0x7b')]);for(var _0x52f215=0x0;_0x52f215<_0x446a35[_0x4535('0x32')];_0x52f215++){_0x315cb6=_0x446a35[_0x52f215][0x1];_0xac8c2b=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x4b')][_0x315cb6];_0x4e8924=[];for(var _0x207f33=0x0;_0x207f33<_0x34c433[_0x4535('0x75')][_0x4535('0x32')];_0x207f33++){if(typeof _0xac8c2b[_0x4535('0x75')][_0x34c433[_0x4535('0x75')][_0x207f33]]===_0x4535('0x43'))_0x4e8924['push'](_0x34c433[_0x4535('0x75')][_0x207f33]);}_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]]=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]]||{};for(var _0x1a5911=0x0;_0x1a5911<_0x4e8924[_0x4535('0x32')];_0x1a5911++){_0x4e99d1[_0x4535('0x0')]['SkuDataCache'][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]][_0xac8c2b[_0x4535('0x75')][_0x4e8924[_0x1a5911]]]=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]][_0xac8c2b[_0x4535('0x75')][_0x4e8924[_0x1a5911]]]||[];_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]][_0x4535('0x7b')]=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x7a')][_0xac8c2b[_0x4535('0x76')]][_0x4535('0x7b')]||[];if(!_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['dimension'][_0xac8c2b[_0x4535('0x76')]][_0xac8c2b['dimensions'][_0x4e8924[_0x1a5911]]][_0x4535('0x32')]){_0x2aad72[_0x4535('0x73')](_0x446a35[_0x52f215]);_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')]['dimension'][_0xac8c2b[_0x4535('0x76')]]['uniqueSkuByDimension'][_0x4535('0x73')](_0x446a35[_0x52f215]);}_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')]['dimension'][_0xac8c2b[_0x4535('0x76')]][_0xac8c2b[_0x4535('0x75')][_0x4e8924[_0x1a5911]]][_0x4535('0x73')](_0x315cb6);}}return _0x2aad72;},'setThumbs':function(_0x3a25d0,_0x432017,_0x3ce61b,_0x523e5b,_0x3848df){_0x3ce61b[_0x4535('0x34')](_0x4535('0x7d'));_0xfecb3[_0x4535('0x7e')](_0x3a25d0,_0x432017,_0x3a25d0[_0x4535('0x2e')](_0x4535('0x7f')),_0x34c433[_0x4535('0x80')],_0x3ce61b,_0x523e5b,_0x3848df);_0x34c433[_0x4535('0x81')](_0x3a25d0,_0x3ce61b,_0xfecb3[_0x4535('0x82')],_0xfecb3['skuProduct'],_0x432017);return _0x3ce61b;},'checkIsAvaliable':function(_0x3aafc4,_0x5ca6d8,_0x5595f0,_0x448bd4,_0x441bf7,_0x56dbe2){_0xfecb3[_0x4535('0x83')](_0x3aafc4,_0x5ca6d8,_0x5595f0,_0x448bd4,_0x441bf7);},'mouseActions2':function(_0x1dbc17,_0x4eee9a,_0x5923f3,_0x2f5b3c,_0x276d3c){_0xfecb3['setImgThumb'](_0x5923f3,_0x2f5b3c);_0xfecb3[_0x4535('0x84')](_0x5923f3,_0x2f5b3c,_0x4eee9a);_0x5923f3[_0x4535('0x85')](_0x4535('0x86'),function(){try{_0x1dbc17[_0x4535('0x2e')](_0x4535('0x87'))[_0x4535('0x40')]('vtex_cpActiveSku');_0x5923f3[_0x4535('0x34')](_0x4535('0x88'));if(_0x34c433[_0x4535('0x89')]){_0xfecb3['productOriginalInfo']=_0x1dbc17[_0x4535('0x2e')]('.qd_cpProductInfoWrap')[_0x4535('0x8a')]()['clone']();_0xfecb3['productOriginalLink']=_0x1dbc17[_0x4535('0x2e')](_0x4535('0x8b'))[_0x4535('0x50')]('href')||'';var _0x108bd6=_0x1dbc17[_0x4535('0x2e')](_0x4535('0x8c'));_0xfecb3[_0x4535('0x8d')]=[_0x108bd6[_0x4535('0x8e')]()||'',_0x108bd6['attr'](_0x4535('0x8f'))||''];}_0xfecb3[_0x4535('0x90')](_0x2f5b3c,_0x1dbc17,_0x276d3c);_0xfecb3['onHover']=!![];_0x4e99d1(window)[_0x4535('0x64')]('QuatroDigital.cp_thumbMouseenter',{'data':_0x2f5b3c[0x0],'li':_0x1dbc17,'link':_0x276d3c});}catch(_0x305bd7){_0x5a9f5e(_0x305bd7[_0x4535('0x1b')]);}});if(_0x34c433[_0x4535('0x89')])_0x5923f3['bind'](_0x4535('0x91'),function(){try{_0x1dbc17['find'](_0x4535('0x87'))[_0x4535('0x40')](_0x4535('0x88'));_0xfecb3['setOriginalElements'](_0x1dbc17);_0xfecb3[_0x4535('0x92')]=![];_0x4e99d1(window)['trigger'](_0x4535('0x93'),{'data':_0x2f5b3c[0x0],'li':_0x1dbc17,'link':_0x276d3c});}catch(_0x555781){_0x5a9f5e(_0x555781[_0x4535('0x1b')]);}});return _0x5923f3;},'formatInfo':function(_0x3dd5ce,_0x44fcd7,_0x5adea3){'use strict';var _0x13df4e,_0x50604a,_0x4faacb,_0x12ee1a,_0x40f482,_0x1d9023,_0x7e4ac9,_0x572bc1,_0x5dc378,_0x49bb31,_0x1c2f5a,_0x3e976d,_0x58da85,_0x1adda9,_0x47ca85,_0x7dc65c,_0x1892fc,_0x31fa73,_0x5bc393,_0x19cc9c;_0x44fcd7['addClass']('vtex-cpInfoFromSKU');_0x13df4e=_0x3dd5ce[0x0];if(_0x13df4e[_0x4535('0x4c')]||_0x13df4e[_0x4535('0x94')]||_0x34c433[_0x4535('0x95')]){_0x50604a=_0x44fcd7[_0x4535('0x2e')](_0x4535('0x96'));_0x7dc65c=_0x13df4e[_0x4535('0x97')]||_0x13df4e['BestInstallmentNumber'];_0x1892fc=_0x34c433['isSmartCheckout']?_0x13df4e[_0x4535('0x98')]/0x64:_0x13df4e['ListPrice'];_0x31fa73=_0x34c433[_0x4535('0x6e')]?_0x13df4e[_0x4535('0x99')]/0x64:_0x13df4e[_0x4535('0x9a')];_0x50604a[_0x4535('0x34')](_0x4535('0x3f'))[_0x4535('0x40')](_0x4535('0x41'));_0x44fcd7[_0x4535('0x2e')]('.qd_cpProductUnavailable')['addClass'](_0x4535('0x41'))['removeClass'](_0x4535('0x3f'));_0x50604a['find'](_0x4535('0x9b'))['text'](_0x34c433[_0x4535('0x9c')]+_0xfecb3[_0x4535('0x9d')](_0x34c433[_0x4535('0x6e')]?_0x13df4e['bestPrice']/0x64:_0x13df4e['Price']));_0x44fcd7['find'](_0x4535('0x8c'))['html'](_0x34c433[_0x4535('0x9e')][_0x4535('0x19')](_0x4535('0x9f'),_0xfecb3['numberFormat'](_0x1892fc-_0x31fa73)));if(_0x31fa73<_0x1892fc){_0x50604a['find'](_0x4535('0xa0'))[_0x4535('0x34')](_0x4535('0x3f'))[_0x4535('0x40')](_0x4535('0x41'))['find']('.qd_cpListPrice')[_0x4535('0x48')](_0x34c433[_0x4535('0x9c')]+_0xfecb3[_0x4535('0x9d')](_0x1892fc));_0x44fcd7[_0x4535('0x2e')](_0x4535('0x8c'))[_0x4535('0x34')](_0x4535('0x3f'))[_0x4535('0x40')](_0x4535('0x41'));}else{_0x50604a[_0x4535('0x2e')]('.qd_cpListPriceWrap')[_0x4535('0x34')](_0x4535('0x41'))['removeClass'](_0x4535('0x3f'));_0x44fcd7[_0x4535('0x2e')](_0x4535('0x8c'))[_0x4535('0x34')](_0x4535('0x41'))[_0x4535('0x40')](_0x4535('0x3f'));}if(_0x7dc65c>0x1){_0x5bc393=_0x50604a[_0x4535('0x2e')](_0x4535('0xa1'))[_0x4535('0x34')](_0x4535('0x3f'))[_0x4535('0x40')](_0x4535('0x41'));_0x5bc393[_0x4535('0x2e')](_0x4535('0xa2'))['text'](_0x7dc65c);_0x5bc393['find'](_0x4535('0xa3'))[_0x4535('0x48')](_0x34c433[_0x4535('0x9c')]+_0xfecb3[_0x4535('0x9d')](_0x34c433[_0x4535('0x6e')]?_0x13df4e['installmentsValue']/0x64:_0x13df4e[_0x4535('0xa4')]));_0x50604a[_0x4535('0x2e')]('.qd_cpFullRegularPrice')[_0x4535('0x34')]('qd_cpHide')['removeClass'](_0x4535('0x3f'));}else{_0x50604a[_0x4535('0x2e')]('.qd_cpInstallment')[_0x4535('0x34')](_0x4535('0x41'))['removeClass'](_0x4535('0x3f'));_0x50604a[_0x4535('0x2e')](_0x4535('0xa5'))[_0x4535('0x34')](_0x4535('0x3f'))['removeClass'](_0x4535('0x41'));}}else{_0x44fcd7[_0x4535('0x2e')](_0x4535('0x96'))[_0x4535('0x34')](_0x4535('0x41'))[_0x4535('0x40')](_0x4535('0x3f'));_0x44fcd7[_0x4535('0x2e')]('.qd_cpProductUnavailable')[_0x4535('0x34')]('qd_cpShow')[_0x4535('0x40')](_0x4535('0x41'));}if(_0x34c433[_0x4535('0xa6')]){var _0x3ae953=_0x34c433[_0x4535('0xa7')](_0x13df4e,_0x44fcd7);if(isNaN(_0x34c433[_0x4535('0xa8')])||_0x34c433[_0x4535('0xa8')]===null)_0x44fcd7['find'](_0x4535('0xa9'))['html'](_0x3ae953);else{if(_0x34c433[_0x4535('0xaa')]&&(_0x3ae953||'')['length']>_0x34c433['productNameLimiter']){_0x4faacb=(_0x3ae953||'')[_0x4535('0xab')](0x0,_0x34c433[_0x4535('0xa8')]+0x1)[_0x4535('0x65')]('\x20');_0x4faacb[_0x4535('0x71')]();_0x44fcd7[_0x4535('0x2e')]('.qd-cpProductName')['html'](_0x4faacb[_0x4535('0x21')]('\x20')+'\x20...');}else if((_0x3ae953||'')['length']>_0x34c433['productNameLimiter'])_0x44fcd7[_0x4535('0x2e')](_0x4535('0xa9'))[_0x4535('0x8e')]((_0x3ae953||'')['substring'](0x0,_0x34c433['productNameLimiter'])+_0x4535('0xac'));else _0x44fcd7[_0x4535('0x2e')](_0x4535('0xa9'))[_0x4535('0x8e')](_0x3ae953||'');}}_0x47ca85=_0x44fcd7[_0x4535('0x2e')](_0x4535('0xad'));if(_0x5adea3!=='')_0x47ca85['attr'](_0x4535('0x2'),_0x5adea3[_0x4535('0x19')](_0x56602e,''));if(_0x34c433[_0x4535('0x55')])_0x47ca85[0x0][_0x4535('0x58')]+=(_0x47ca85[0x0]['search'][_0x4535('0x32')]?'&':'')+_0x4535('0x59')+(_0x13df4e[_0x4535('0x4b')]||_0x13df4e['Id']);_0x12ee1a=_0x44fcd7[_0x4535('0x2e')](_0x4535('0xae'));_0x40f482=_0x44fcd7[_0x4535('0x2e')]('.vtex-cpImgOverlay');_0x1d9023=_0x12ee1a[_0x4535('0x2e')]('.vtex-cpOriginalImage');_0x7e4ac9=_0x1d9023[0x0];_0x5dc378=_0x1d9023[_0x4535('0x50')]('width')||_0x7e4ac9[_0x4535('0xaf')];_0x49bb31=_0x1d9023[_0x4535('0x50')](_0x4535('0xb0'))||_0x7e4ac9[_0x4535('0xb1')];if(_0x34c433['isSmartCheckout']&&_0x34c433[_0x4535('0xb2')]=='auto')_0x34c433[_0x4535('0xb2')]={'width':_0x5dc378,'height':_0x49bb31};_0x19cc9c=function(_0x2812b6,_0x45952b){var _0x22ff21=_0x2812b6[_0x4535('0x4b')]||_0x2812b6['Id'];_0x1c2f5a=_0xfecb3[_0x4535('0xb3')](_0x2812b6,_0x34c433[_0x4535('0xb4')],_0x34c433[_0x4535('0x6e')],_0x45952b);if(typeof _0x45952b===_0x4535('0x43')&&_0x1c2f5a[0x0]==='')return;_0x3e976d=_0x44fcd7[_0x4535('0x2e')]('img[src*=\x27'+(_0x1c2f5a[0x0][_0x4535('0x65')]('?')[_0x4535('0x72')]()||_0x1d9023[_0x4535('0x50')](_0x4535('0xb5')))+'\x27]:not(\x27.vtex-cpImgsThumb\x27)');_0x58da85=_0x3e976d['length']>0x0?!![]:![];_0x40f482['show']();if(_0x58da85){_0x1d9023[_0x4535('0xb6')](!![])['removeClass']('qd-visible')[_0x4535('0xb7')](_0x34c433['speedFade']);_0x40f482['hide']();_0x44fcd7[_0x4535('0x2e')](_0x4535('0xb8'))['stop'](!![])['removeClass']('qd-visible')[_0x4535('0xb7')](_0x34c433['speedFade']);_0x3e976d[_0x4535('0xb6')](!![])[_0x4535('0x34')](_0x4535('0xb9'))['fadeTo'](_0x34c433[_0x4535('0xba')],0x1);_0x3e976d[_0x4535('0x50')](_0x4535('0xbb'),_0x22ff21);if(typeof _0x45952b===_0x4535('0x43')&_0x45952b!=='')_0x3e976d[_0x4535('0x50')](_0x4535('0xbc'),_0x45952b);_0x3e976d[_0x4535('0xbd')](_0x4535('0xbe')+_0x22ff21+'\x27]')[_0x4535('0xb6')](!![])[_0x4535('0x34')](_0x4535('0xb9'))[_0x4535('0xbf')](_0x34c433['speedFade'],0x1);}else{_0x1adda9=_0x4e99d1(_0x4535('0xc0')+(_0x1c2f5a[0x0]||_0x1d9023[_0x4535('0x50')]('src'))+_0x4535('0xc1')+_0x22ff21+_0x4535('0xc2'));if(typeof _0x45952b===_0x4535('0x43')&_0x45952b!=='')_0x1adda9[_0x4535('0x50')](_0x4535('0xbc'),_0x45952b);_0x1adda9[_0x4535('0xc3')](function(){if(_0xfecb3[_0x4535('0x92')]){_0x1d9023[_0x4535('0xb6')](!![])[_0x4535('0x40')](_0x4535('0xb9'))[_0x4535('0xb7')](_0x34c433['speedFade']);_0x40f482[_0x4535('0xc4')]();_0x44fcd7[_0x4535('0x2e')](_0x4535('0xb8'))[_0x4535('0xb6')](!![])[_0x4535('0x40')](_0x4535('0xb9'))[_0x4535('0xb7')](_0x34c433[_0x4535('0xba')]);_0x1adda9[_0x4535('0xb6')](!![])[_0x4535('0x34')]('qd-visible')[_0x4535('0xbf')](_0x34c433[_0x4535('0xba')],0x1);_0x44fcd7[_0x4535('0x2e')](_0x4535('0xc5')+_0x22ff21+'\x27]')[_0x4535('0xb6')](!![])['addClass'](_0x4535('0xb9'))[_0x4535('0xbf')](_0x34c433['speedFade'],0x1);}else{_0x40f482[_0x4535('0xc4')]();_0xfecb3[_0x4535('0xc6')](_0x44fcd7);}});_0x12ee1a[_0x4535('0x5f')](_0x1adda9);}};for(var _0x5a39c9 in _0x34c433['imageLabel']){if(typeof _0x34c433[_0x4535('0xc7')][_0x5a39c9]===_0x4535('0x42'))continue;_0x355667(_0x13df4e[_0x4535('0x4b')],function(_0x4dc5b8){_0x19cc9c(_0x4dc5b8[0x0],_0x34c433[_0x4535('0xc7')][_0x5a39c9]);},!![]);}},'setOriginalElements':function(_0x418817){if(_0xfecb3['productOriginalInfo']!==null&&_0x418817[_0x4535('0x2c')]('vtex-cpInfoFromSKU')){_0x418817[_0x4535('0x40')]('vtex-cpInfoFromSKU')[_0x4535('0x2e')](_0x4535('0xc8'))[_0x4535('0x8e')](_0xfecb3['productOriginalInfo']);_0xfecb3['setOriginalImg'](_0x418817);_0xfecb3[_0x4535('0xc9')](_0x418817);_0xfecb3[_0x4535('0xca')](_0x418817);}},'setOriginalImg':function(_0x3da552){var _0xd94a4=_0x3da552[_0x4535('0x2e')](_0x4535('0xae'));_0xd94a4[_0x4535('0x2e')](':not(.vtex-cpOriginalImage)')[_0x4535('0xb6')](!![])[_0x4535('0xb7')](_0x34c433['speedFade']);_0xd94a4[_0x4535('0x2e')]('.vtex-cpOriginalImage')['stop'](!![])[_0x4535('0xbf')](_0x34c433[_0x4535('0xba')],0x1);},'setOriginalLink':function(_0x43814c){_0x43814c[_0x4535('0x2e')](_0x4535('0xad'))[_0x4535('0x50')](_0x4535('0x2'),_0xfecb3[_0x4535('0xcb')]);},'setOriginalSaveText':function(_0x50f306){_0x50f306[_0x4535('0x2e')](_0x4535('0x8c'))[_0x4535('0x8e')](_0xfecb3[_0x4535('0x8d')][0x0])[_0x4535('0x50')](_0x4535('0x8f'),_0xfecb3['productOriginalSave'][0x1]);},'setImgThumb':function(_0x24f49a,_0x39f466){var _0x1aa5d3=function(_0x99a2b2,_0x43f3e1,_0x556cf2){var _0xe2e89e=_0xfecb3[_0x4535('0xb3')](_0x99a2b2[0x0],_0x34c433[_0x4535('0xcc')],![],_0x43f3e1,_0x556cf2);_0x24f49a[_0x4535('0x40')](_0x4535('0x7d'));if(_0xe2e89e[_0x4535('0x32')]>0x0){_0x24f49a[_0x4535('0xcd')](_0x4535('0xce'),_0x4535('0xcf')+_0xe2e89e[0x0]+'\x27)');_0x24f49a[_0x4535('0x2e')](_0x4535('0xd0'))[_0x4535('0x5f')](_0x4535('0xc0')+_0xe2e89e[0x0]+_0x4535('0xd1')+(_0x99a2b2[0x0][_0x4535('0x4b')]||_0x99a2b2[0x0]['Id'])+'\x22\x20alt=\x22\x22/>');}};if(_0x34c433['isSmartCheckout']&&_0x34c433['thumbByLabel']!==null)_0x355667(_0x39f466[0x0]['sku']||_0x39f466[0x0]['Id'],function(_0x11dfb0){_0x1aa5d3(_0x11dfb0,_0x34c433[_0x4535('0xd2')],_0x39f466[0x0]);},!![]);else _0x1aa5d3(_0x39f466);},'loadSku':function(_0x5007b4,_0xeb3c07,_0x518765,_0x227538,_0x43e236,_0x1eccdd,_0x253c54){if(_0x34c433['isSmartCheckout'])_0x2a86a4['call'](this,_0x5007b4,_0xeb3c07,_0x518765,_0x227538,_0x43e236,_0x1eccdd,_0x253c54);else _0x5a9f5e(_0x4535('0xd3'));},'numberFormat':function(_0x474730){var _0x387524='',_0x144880='',_0x2c9fbf='';var _0x32ed12=_0x474730['toFixed'](0x2)[_0x4535('0x65')]('.');var _0x394239=_0x32ed12[0x0][_0x4535('0x65')]('');var _0x6969e2=0x0;var _0x7d9225=_0x394239['length'];var _0xe67193='.';for(var _0x47a21b=_0x32ed12[0x0][_0x4535('0x32')];_0x47a21b>0x0;_0x47a21b--){_0x144880=_0x32ed12[0x0][_0x4535('0xd4')](_0x47a21b-0x1,0x1);_0x6969e2++;if(_0x6969e2%0x3===0x0&&_0x7d9225>_0x6969e2)_0x144880=_0xe67193+_0x144880;_0x2c9fbf=_0x144880+_0x2c9fbf;}_0x387524=_0x2c9fbf+','+_0x32ed12[0x1];return _0x387524;},'getImageUrl':function(_0x151aab,_0x3a31eb,_0x108416,_0x154690,_0x35f585){var _0xceea9b=[],_0x4cd8cf,_0x3a9c50,_0x44ceb6;_0x4cd8cf=_0x151aab[_0x4535('0xd5')]||_0x151aab['Images'];_0x3a9c50=function(_0x3759db,_0x1a145d){var _0x138e31=[];if(_0x3759db['length']<0x1){_0x5a9f5e('Não\x20foram\x20encontradas\x20imagens\x20para\x20o\x20SKU:\x20'+_0x1a145d['Id']);return _0x138e31;}for(var _0x321b65 in _0x3759db)for(var _0x3585c0 in _0x3759db[_0x321b65])if(_0x154690!==null&&typeof _0x154690===_0x4535('0x43')?_0x3759db[_0x321b65][_0x3585c0][_0x4535('0x16')]?_0x154690['toLowerCase']()==_0x3759db[_0x321b65][_0x3585c0][_0x4535('0x16')][_0x4535('0x3')]():![]:_0x3759db[_0x321b65][_0x3585c0][_0x4535('0xd6')]){_0x138e31['push'](_0x3759db[_0x321b65][_0x3585c0][_0x4535('0xd7')]);break;break;}return _0x138e31;};if(typeof _0x154690===_0x4535('0x43')){_0x4cd8cf=_0x3a9c50(_0x4cd8cf,_0x151aab);if(_0x4cd8cf[_0x4535('0x32')])_0x4cd8cf=_0x4cd8cf[0x0];else{if(typeof _0x35f585!=='undefined'&&typeof _0x35f585[_0x4535('0xd5')]!==_0x4535('0x9'))_0x4cd8cf=_0x35f585[_0x4535('0xd5')];else{_0x4cd8cf='';_0x2963b7(_0x4535('0xd8')+_0x151aab['Id'],_0x4535('0xd'));}_0x2963b7(_0x4535('0xd9')+_0x151aab['Id'],_0x4535('0xd'));}}if(_0x108416)_0xceea9b[_0x4535('0x73')](_0x34c433[_0x4535('0xda')](typeof _0x4cd8cf===_0x4535('0x43')?_0x4cd8cf:_0x3a9c50(_0x4cd8cf,_0x151aab)[0x0],_0x34c433[_0x4535('0xb2')][_0x4535('0xdb')],_0x34c433[_0x4535('0xb2')]['height']),_0x4cd8cf);else _0xceea9b[_0x4535('0x73')](_0x34c433[_0x4535('0xda')](_0x4cd8cf,_0x34c433[_0x4535('0xdc')]['width'],_0x34c433[_0x4535('0xdc')][_0x4535('0xb0')]),_0x4cd8cf);return _0xceea9b;},'setClass':function(_0xabb371,_0x4810e3,_0x245457){if(_0x34c433[_0x4535('0x6e')])_0xabb371[_0x4535('0x34')]('vtex-cp_'+_0x4810e3[0x0][_0x4535('0x15')][_0x4535('0x19')](/[^a-zA-Z0-9\-\_]/g,''));else _0xabb371[_0x4535('0x34')](_0x4535('0xdd')+_0x4810e3[0x0][_0x4535('0x16')]['replace'](/[^a-zA-Z0-9\-\_]/g,''));},'shelfSetup':function(_0x3d4916){try{_0x3d4916[_0x4535('0x2e')](_0x4535('0xde')+_0x3d4916[_0x4535('0x2e')](_0x4535('0xdf'))['val']()+'\x27]')[_0x4535('0x34')](_0x4535('0xe0'));var _0x2a12fe=null;_0x3d4916[_0x4535('0x2e')]('img')[_0x4535('0x2b')](function(){var _0x308aed=_0x4e99d1(this);_0x2a12fe=null===_0x2a12fe?_0x308aed:_0x2a12fe;if(parseInt(_0x2a12fe['attr'](_0x4535('0xdb'))||0x0,0xa)<parseInt(_0x308aed[_0x4535('0x50')]('width')||0x0,0xa))_0x2a12fe=_0x308aed;});_0x2a12fe['before'](_0x4535('0xe1'));_0x2a12fe[_0x4535('0xe2')]()['addClass'](_0x4535('0xe3'));var _0x1e1fcc=jQuery(_0x4535('0xe4')),_0x10497c=jQuery(_0x4535('0xe5')),_0x4ab225=_0x3d4916['find']('.qd_cpProductInfo');_0x4ab225[_0x4535('0xe6')](_0x1e1fcc);_0x4ab225[_0x4535('0xe7')](_0x10497c);_0x3d4916[_0x4535('0x2e')](_0x4535('0xe8'))[_0x4535('0xe7')](_0x10497c);_0x10497c[_0x4535('0xe7')](_0x1e1fcc);if(_0xfecb3[_0x4535('0xe9')]<0x1){var _0x28dd08=/\sR\$\s[0-9]+,[0-9]{1,2}/i,_0x6c27a4=_0x3d4916[_0x4535('0x2e')]('.vtex-cpSave')[_0x4535('0x48')]();if(_0x6c27a4[_0x4535('0x58')](_0x28dd08)>-0x1)_0x34c433[_0x4535('0x9e')]=_0x6c27a4[_0x4535('0x19')](_0x28dd08,_0x4535('0xea'));_0xfecb3['saveCount']++;}}catch(_0x11c51a){_0x5a9f5e(['Problemas\x20ao\x20executar\x20o\x20auto\x20setup.\x20Detalhes:\x20',_0x11c51a[_0x4535('0x1b')]],_0x4535('0xd'));};}};_0x407a26=function(_0x441540){};_0x43b2ca=function(_0x48eeef,_0x460339,_0x436642,_0x40956f){var _0x429047=[];_0x34c433[_0x4535('0xeb')](_0x40956f,_0x460339,_0x436642,function(_0x443e77){if(_0x443e77){try{var _0x44456f=0x1;var _0x1fcb23=0x0;var _0x514e41=function(_0x9174dc){_0x1fcb23=_0x1fcb23+0x1;if(_0x44456f===_0x1fcb23)_0x48eeef(_0x9174dc);};_0x4d0ad1(function(_0x2c624d){_0x514e41(_0x2c624d);},_0x460339,_0x436642);for(var _0x39236d=0x0;_0x39236d<_0x443e77['length'];_0x39236d++){if(_0x34c433[_0x4535('0xec')]&&_0x39236d===_0x34c433[_0x4535('0x46')])break;_0x44456f=_0x44456f+0x1;_0x4d0ad1(function(_0x153c59){_0x514e41(_0x153c59);},_0x443e77[_0x39236d]['id'],_0x443e77[_0x39236d]['url']);}}catch(_0xf746fb){_0x5a9f5e(_0xf746fb[_0x4535('0x1b')]);}}else _0x4d0ad1(function(_0x14581b){_0x48eeef(_0x14581b);},_0x460339,_0x436642);});function _0x275b9a(_0x398bec,_0x216d94,_0x4c29ca,_0x3f9949){try{_0x4e99d1['QD_coresPrateleira'][_0x4535('0x4a')]=_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]||{'prod':{},'sku':{}};_0x4e99d1[_0x4535('0x0')]['SkuDataCache'][_0x4535('0xed')][_0x4c29ca]=_0x398bec;for(var _0x52bed5 in _0x398bec[_0x4535('0xee')]){if(typeof _0x398bec['skus'][_0x52bed5]===_0x4535('0x42'))continue;_0x429047[_0x4535('0x73')](_0x398bec['skus'][_0x52bed5][_0x4535('0x4b')]+';'+_0x3f9949);_0xfecb3[_0x4535('0xef')][_0x398bec[_0x4535('0xee')][_0x52bed5][_0x4535('0x4b')]]=_0x4c29ca;_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x4b')][_0x398bec[_0x4535('0xee')][_0x52bed5][_0x4535('0x4b')]]=_0x398bec[_0x4535('0xee')][_0x52bed5];_0x4e99d1[_0x4535('0x0')]['SkuDataCache']['sku'][_0x398bec[_0x4535('0xee')][_0x52bed5][_0x4535('0x4b')]][_0x4535('0x76')]=_0x4c29ca;}_0x216d94(_0x429047);_0x34c433[_0x4535('0xf0')]();_0x4e99d1(window)[_0x4535('0x64')](_0x4535('0xf1'),this);}catch(_0x401095){_0x5a9f5e([_0x4535('0xf2'),_0x401095[_0x4535('0x1b')]]);}};function _0x4d0ad1(_0x2b121f,_0x1797c1,_0x1b2323){var _0xcff754=![];if(_0x452c0f){try{_0xcff754=JSON[_0x4535('0x10')](window[_0x4535('0xf3')][_0x4535('0xf4')](_0x4535('0xf5')+_0x1797c1));if(_0xcff754)_0x275b9a(_0xcff754,_0x2b121f,_0x1797c1,_0x1b2323);}catch(_0x1eb7e8){_0x5a9f5e(_0x4535('0xf6')+_0x1eb7e8[_0x4535('0x1b')],'alerta');}}if(!_0xcff754){_0x4e99d1['qdAjax']({'url':_0x4535('0xf7')+_0x1797c1,'dataType':'json','success':function(_0x3b303b){_0x275b9a(_0x3b303b,_0x2b121f,_0x1797c1,_0x1b2323);if(_0x452c0f)window[_0x4535('0xf3')]['setItem'](_0x4535('0xf5')+_0x1797c1,JSON[_0x4535('0x11')](_0x3b303b),0x78);},'error':function(){_0x5a9f5e(_0x4535('0xf8'));},'clearQueueDelay':null});}};};_0x2a86a4=function(_0x43b2be,_0x555afa,_0x6e6a2b,_0x24541f,_0x412501,_0x3a6143,_0x394605){_0xfecb3['checkIsAvaliable'](_0x43b2be,_0x555afa,_0x412501,[_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['sku'][_0x555afa]],_0x3a6143,_0x394605);};_0x355667=function(_0x3167b0,_0x2a03f6,_0x5753cf){if(typeof _0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')]['sku'][_0x3167b0]!==_0x4535('0x9')&&typeof _0x4e99d1[_0x4535('0x0')]['SkuDataCache'][_0x4535('0x4b')][_0x3167b0][_0x4535('0xf9')]!==_0x4535('0x9')){if(typeof _0x2a03f6==='function')_0x2a03f6(_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x4b')][_0x3167b0][_0x4535('0xf9')]);return _0x4e99d1[_0x4535('0x0')]['SkuDataCache']['sku'][_0x3167b0][_0x4535('0xf9')];}_0x4e99d1[_0x4535('0xfa')]({'url':_0x4535('0xfb')+_0x3167b0,'data':_0x4535('0xfc'),'success':function(_0x8a279d){_0x4e99d1[_0x4535('0x0')][_0x4535('0x4a')][_0x4535('0x4b')][_0x3167b0]['fullData']=_0x8a279d;if(typeof _0x2a03f6===_0x4535('0x42'))_0x2a03f6(_0x4e99d1[_0x4535('0x0')]['SkuDataCache'][_0x4535('0x4b')][_0x3167b0]['fullData']);},'error':function(){_0x5a9f5e(_0x4535('0xfd'));},'async':typeof _0x5753cf!==_0x4535('0x9')?_0x5753cf:![],'clearQueueDelay':null});return _0x4e99d1[_0x4535('0x0')]['SkuDataCache'][_0x4535('0x4b')][_0x3167b0][_0x4535('0xf9')];};_0xfecb3[_0x4535('0x2a')]=jQuery(this);_0xfecb3[_0x4535('0xfe')]();_0x34c433['callback']();_0x4e99d1(window)[_0x4535('0x64')](_0x4535('0xff'),this);return _0xfecb3['productShelf'];}catch(_0x360a03){_0x5a9f5e(['Problemas\x20ao\x20executar\x20o\x20QD\x20Cores\x20Prateleira,\x20detalhes:\x20',_0x360a03[_0x4535('0x1b')]],_0x4535('0xd'));};};}(this,jQuery));

/* jQuery Countdown */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function (a) { "use strict"; function b(a) { if (a instanceof Date) return a; if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a); throw new Error("Couldn't cast `" + a + "` to a date object.") } function c(a) { return function (b) { var c = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi); if (c) for (var e = 0, f = c.length; f > e; ++e) { var g = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), i = new RegExp(g[0]), j = g[1] || "", k = g[3] || "", l = null; g = g[2], h.hasOwnProperty(g) && (l = h[g], l = Number(a[l])), null !== l && ("!" === j && (l = d(k, l)), "" === j && 10 > l && (l = "0" + l.toString()), b = b.replace(i, l.toString())) } return b = b.replace(/%%/, "%") } } function d(a, b) { var c = "s", d = ""; return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), 1 === Math.abs(b) ? d : c } var e = 100, f = [], g = []; g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|")); var h = { Y: "years", m: "months", w: "weeks", d: "days", D: "totalDays", H: "hours", M: "minutes", S: "seconds" }, i = function (b, c, d) { this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)), this.setFinalDate(c), this.start() }; a.extend(i.prototype, { start: function () { null !== this.interval && clearInterval(this.interval); var a = this; this.update(), this.interval = setInterval(function () { a.update.call(a) }, e) }, stop: function () { clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped") }, pause: function () { this.stop.call(this) }, resume: function () { this.start.call(this) }, remove: function () { this.stop(), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance }, setFinalDate: function (a) { this.finalDate = b(a) }, update: function () { return 0 === this.$el.closest("html").length ? void this.remove() : (this.totalSecsLeft = this.finalDate.getTime() - (new Date).getTime(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30), years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365) }, void (0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update"))) }, dispatchEvent: function (b) { var d = a.Event(b + ".countdown"); d.finalDate = this.finalDate, d.offset = a.extend({}, this.offset), d.strftime = c(this.offset), this.$el.trigger(d) } }), a.fn.countdown = function () { var b = Array.prototype.slice.call(arguments, 0); return this.each(function () { var c = a(this).data("countdown-instance"); if (void 0 !== c) { var d = f[c], e = b[0]; i.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e)) } else new i(this, b[0], b[1]) }) } });