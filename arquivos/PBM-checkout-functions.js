var QdPbmCheckout = {
	// sever: '//localhost:8080/araujo-pbm',
	sever: '//web.araujo.com.br/araujo-pbm',
	run: function() {
		QdPbmCheckout.checkRequestIsRunning();
	},
	init: function() {
		QdPbmCheckout.loadElements(); // chamar antes de todos
		QdPbmCheckout.fullPageNotification(); // chamar antes de todos
		QdPbmCheckout.cookieRenew(); // chamar antes de todos

		QdPbmCheckout.validateItems();
	},
	orderUpdated: function(orderForm){
		if (location.hash.toLowerCase().indexOf('/payment') > -1)
			QdPbmCheckout.checkRequestDetails(orderForm);

		QdPbmCheckout.validateItems();
	},
	cart: function() {
		QdPbmCheckout.removeGiftcard();
	},
	payment: function() {
		if(!QdPbmCheckout.requestRunning)
			QdPbmCheckout.execPayment();
		else
			$(window).one("checkoutRequestEnd.vtex", function() {
				QdPbmCheckout.execPayment();
			});
	},
	loadElements: function () {
		QdPbmCheckout.cartElement = $('#cartLoadedDiv');
	},
	removeGiftcard: function() {
		try {
			// obtendo o indece do vale
			var redemptionCode = $.cookie('qdPbm');
			var index = -1;
			if(vtexjs.checkout.orderForm.paymentData && vtexjs.checkout.orderForm.paymentData.giftCards){
				for(var i = 0; i < vtexjs.checkout.orderForm.paymentData.giftCards.length; i++){
					if(vtexjs.checkout.orderForm.paymentData.giftCards[i].redemptionCode == redemptionCode){
						index = i;
						break;
					}
				}
			}

			if(index < 0)
				return;

			vtexjs.checkout.orderForm.paymentData.giftCards.splice(index, 1);

			vtexjs.checkout.sendAttachment('paymentData', {
				giftCards: vtexjs.checkout.orderForm.paymentData.giftCards,
				payments: vtexjs.checkout.orderForm.paymentData.payments
			}).fail(QdPbmCheckout.notificationError);
		}
		catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
	},
	fullPageNotification: function() {
		QdPbmCheckout.fullPageElement = $('<div class="qd-fullpage-notification"></div>');
		QdPbmCheckout.fullPageElement.appendTo('.container-main');
	},
	checkRequestDetails: function(orderForm) {
		if (typeof orderForm.messages == "object") {
			for (i in orderForm.messages) {
				if (orderForm.messages[i].text.indexOf($.cookie('qdPbm')) >= 0) {
					QdPbmCheckout.fullPageElement.html('<div class="qd-fullpage-notification-error"> <div class="qd-fullpage-notification-error-header"> <span>Não foi possível aplicar seu desconto do PBM</span> </div> <p><strong>Infelizmente ocorreu um erro ao tentar aplicar o seu desconto do PBM.</strong></p> <p>para tentar resolver esse erro, por favor verifique se os itens abaixo estão corretos: </p> <ul><li>A quantidade dos itens no carrinho é a mesma que foi utilziada para consultar o benefício na tela de produto.</li> </ul> <p>Caso esse error persista, por favor entre em contato com o Atendimento ao Cliente.</p> <p><strong>Atente-se que devido a este erro, para que o desconto do PBM lhe seja concedido novamente, será necessário que você volte a tela de produto e insira novamente o seu CPF.</strong></p> <a href="/checkout/#/cart" class="qd-fullpage-notification-close">Fechar</a> </div>');
					QdPbmCheckout.fullPageElement.show();

					$('.vtex-front-messages-template').hide();

					QdPbmCheckout.fullPageElement.find('.qd-fullpage-notification-close').click(function(evt) {
						evt.preventDefault();
						QdPbmCheckout.fullPageElement.hide();
					});

					$.removeCookie('qdPbm', { path: '/' });
					return;
				}
				else if (orderForm.messages[i].text.indexOf('Vale Compra' >= 0)) {
					QdPbmCheckout.notificationError();
					$('.vtex-front-messages-template').hide();
					return;
				}
			}
		}

	},
	notificationError: function() {
		var fullPage = QdPbmCheckout.fullPageElement.html('<div class="qd-fullpage-notification-error"> <div class="qd-fullpage-notification-error-header"> <span>Ocorreu um erro ao aplicar o desconto PBM</span> </div> <p><center><strong>Solicitamos que recarregue a pagina para tentar novamente.</strong></center></p> <a href="/checkout/#/cart" class="qd-fullpage-notification-reload-link">Recarregar página</a> </div>');
		QdPbmCheckout.fullPageElement.show();

		QdPbmCheckout.fullPageElement.find('.qd-fullpage-notification-reload-link').click(function(evt) {
			evt.preventDefault();
			location.reload();
		});
	},
	execPayment: function() {
		// Verificando se o usuário esta logado
		QdPbmCheckout.userIsAuthenticated(function() {
			QdPbmCheckout.validateItems();
		});
	},
	checkRequestIsRunning: function() {
		var vtexIsRunning = false;
		$(window).on("checkoutRequestStart.vtex", function() {
			vtexIsRunning = true;
			updateStatus();
		});
		$(window).on("checkoutRequestEnd.vtex", function() {
			vtexIsRunning = false;
			updateStatus();
		});

		var ajaxRunning = false;
		$(document).ajaxStart(function() {
			ajaxRunning = true;
			updateStatus();
		}).ajaxStop(function() {
			ajaxRunning = false;
			updateStatus();
		});

		
		(updateStatus = function() {
			if(ajaxRunning == false && vtexIsRunning == false)
				QdPbmCheckout.requestRunning = false;
			else
				QdPbmCheckout.requestRunning = true;
		})();
	},
	attachmentOrder: function(data) {
		$(document.body).addClass('qd-loading');

		try {
			var infoPbm = {};

			if (vtexjs.checkout.orderForm.openTextField && vtexjs.checkout.orderForm.openTextField.value && vtexjs.checkout.orderForm.openTextField.value.length){
				try { infoPbm = JSON.parse(vtexjs.checkout.orderForm.openTextField.value) }
				catch (e) { infoPbm = {oldMessage: vtexjs.checkout.orderForm.openTextField.value} }
			}

			var pbmItems = [];
			for (var i = 0; i < data.items.length; i++) {
				if(!data.items[i].Pbm)
					continue;

				pbmItems.push({
					"sku": data.items[i].id,
					"nrCentral": data.items[i].PbmNrCentral,
					"hCentral": data.items[i].PbmHoraCentral,
					"ctlAP": data.items[i].PbmCtlAP,
					"nrLocal": data.items[i].PbmNrLocal,
					"discPerc": (data.items[i].PbmDiscount / 100 / 100).toFixed(4),
					"qtyValid": data.items[i].checkoutValid,
					"newPrice": data.items[i].PbmNewPrice
				});
			};
			var newPbmData = {
				"cpf": data.cpf,
				'items': pbmItems
			};

			if(!(infoPbm.PBM && JSON.stringify(infoPbm.PBM) == JSON.stringify(newPbmData))){
				infoPbm['PBM'] = newPbmData;

				vtexjs.checkout.sendAttachment('openTextField', {value: JSON.stringify(infoPbm)}).always(function() {
					$(document.body).removeClass('qd-loading');
				});
			}
		} catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
	},
	cookieRenew: function() {
		$.cookie('qdPbm', $.cookie('qdPbm') || '', {path: '/', expires: 1});
	},
	userIsAuthenticated: function(callback) {
		if(!vtexjs.checkout.orderForm.canEditData) // Não autenticado
			vtexid.start();
		else
			callback();
	},
	itemsValidated: function(data) {
		try {
			if (location.hash.toLowerCase().indexOf('/payment') < 0 || !(data.giftcardValue > 0 && !data.checkItemsAgain))
				return;

			// Verifico se já não tenho esse gift aplicado
			var redemptionCode = $.cookie('qdPbm');
			if(vtexjs.checkout.orderForm.paymentData && vtexjs.checkout.orderForm.paymentData.giftCards)
				for(var i = 0; i < vtexjs.checkout.orderForm.paymentData.giftCards.length; i++){
					if(vtexjs.checkout.orderForm.paymentData.giftCards[i].redemptionCode == redemptionCode)
						return $('.gift-card-section').addClass('qd-pbm-applied-discount');
				}

			QdPbmCheckout.fullPageElement.html('<div class="qd-fullpage-notification-applying"> <div class="qd-fullpage-notification-applying-header"> <img src="/arquivos/stamp-pbm-2.jpg" alt="PBM" /> </div> <p>Aguarde. Estamos aplicando o seu desconto.</p> <i class="icon-spinner icon-spin"></i> </div>');
			QdPbmCheckout.fullPageElement.show();

			$.ajax({
				url: '/api/checkout/pub/gift-cards/providers',
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "json"
			}).done(function(data) {
				vtexjs.checkout.sendAttachment('paymentData', {
					giftCards: [{
						inUse: true,
						isSpecialCard: false,
						provider: data[0].id,
						redemptionCode: redemptionCode
					}],
					payments: vtexjs.checkout.orderForm.paymentData.payments
				}).done(function() {
					QdPbmCheckout.fullPageElement.hide();
				}).always(function() {
					$('.gift-card-section').addClass('qd-pbm-applied-discount');
				}).fail(QdPbmCheckout.notificationError);
			}).fail(QdPbmCheckout.notificationError);
		} catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }

	},
	validateItems: function() {
		if (!vtexjs.checkout.orderForm || vtexjs.checkout.orderForm.items.length <= 0)
			return;

		$(document.body).addClass('qd-loading');
		$.ajax({
			url: QdPbmCheckout.sever + '/checkout-check',
			dataType: 'json',
			type: 'POST',
			data: {
				items: JSON.stringify(vtexjs.checkout.orderForm.items),
				orderId: $.cookie('qdPbm')
			},
			complete: function() { $(document.body).removeClass('qd-loading') }
		}).done(function (data) {
			try {
				if(!data.pbmAvailable || !data.discountAvailable)
					return;

				if (data.giftcardValue <= 0 && !data.checkItemsAgain) {
					QdPbmCheckout.fullPageElement.html('<div class="qd-fullpage-notification-not-applied"> <div class="qd-fullpage-notification-not-applied-header"> <span>Atenção!</span> </div> <p>O desconto da Drogaria Araujo é maior do que o oferecido pelo PBM.</p> <a href="/checkout/#/cart" class="qd-fullpage-notification-close">Fechar</a> </div>');
					QdPbmCheckout.fullPageElement.show();

					QdPbmCheckout.fullPageElement.find('.qd-fullpage-notification-close').click(function(evt) {
						evt.preventDefault();
						QdPbmCheckout.fullPageElement.hide();
					});

					return;
				}

				var checkReq = function() {
					if(req != cReq)
						return;
					if(req != 0)
						QdPbmCheckout.validateItems();
					if(req == cReq) {
						QdPbmCheckout.itemsValidated(data);
						QdPbmCheckout.attachmentOrder(data);
					}
				};

				var req = 0;
				var cReq = 0;
				QdPbmCheckout.cartElement.find('.qd-pbm-item').remove();
				for(var i = 0; i < data.items.length; i++){
					if(!data.items[i].Pbm)
						continue;

					if(data.items[i].PbmValid){
						QdPbmCheckout.showCartDiscountInformation(data.items[i], i);
						checkReq();
						continue;
					}
					else{
						req++;
						QdPbmCheckout.preAuth(data, data.items[i]).always(function() {
							cReq++;
							checkReq();
						});
					}
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		});
	},
	showCartDiscountInformation: function(item, index) {
		var priceDiscount = item.PbmNewPrice;
		QdPbmCheckout.cartElement.find('.product-item[data-sku="' + item.id + '"] td.product-price').append('<div class="qd-pbm-item">  <span>Valor com o desconto do PBM: <span class="qd-pbm-item-value">R$ ' + qd_number_format(priceDiscount / 100, 2, ",", ".") + '</span></span> </div>');
	},
	preAuth: function(data, item) {
		return $.ajax({
			url: QdPbmCheckout.sever + '/pre-auth',
			dataType: 'json',
			type: 'POST',
			data: {
				cpf: data.cpf,
				qtt: item.quantity,
				bDate: '',
				productId: item.productId,
				sku: item.id,
				orderId: $.cookie('qdPbm')
			}
		});
	}
};

(QdPbmCheckout.run)();
$(QdPbmCheckout.init);
$(window).on("orderFormUpdated.vtex", function(e, data){
	QdPbmCheckout.orderUpdated(data)
});