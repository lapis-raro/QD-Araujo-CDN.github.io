var QdPbmCheckout = {
	// sever: '//localhost:8080/araujo-pbm',
	sever: '//web.araujo.com.br/araujo-pbm',
	run: function() {
		QdPbmCheckout.checkRequestIsRunning();
	},
	init: function() {
		QdPbmCheckout.cookieRenew(); // chamar antes de todos
		QdPbmCheckout.fullpageLoading(); // chamar antes de todos
		QdPbmCheckout.validateItems();
	},
	fullpageLoading: function() {
		$('.container-main').append('<div class="qd-fullpage-loading"></div>');
	},
	orderUpdated: function(orderForm){
		if (typeof orderForm.messages == "object") {
			for (i in orderForm.messages) {
				if (orderForm.messages[i].text.indexOf($.cookie('qdPbm')) >= 0) {
					var fullPage = $('.qd-fullpage-loading').html('<div class="qd-fullpage-loading-error"> <div class="qd-fullpage-loading-error-header"> <span>Ocorreu um erro ao aplicar o desconto PBM</span> </div> <p>Solicitamos que volte ao(s) produto(s) selecionados e refaça o processo.</p> <a href="/checkout/#/cart" class="qd-fullpage-loading-close">Fechar</a> </div>');

					$('.vtex-front-messages-template').hide();

					fullPage.find('.qd-fullpage-loading-close').click(function(evt) {
						evt.preventDefault();
						fullPage.toggle();
					});

					fullPage.toggle();

					$.removeCookie('qdPbm', { path: '/' });

					return;
				} else if (orderForm.messages[i].text.indexOf('Vale Compra' >= 0)) {
					var fullPage = $('.qd-fullpage-loading').html('<div class="qd-fullpage-loading-reload"> <div class="qd-fullpage-loading-reload-header"> <span>Ocorreu um erro ao aplicar o desconto PBM</span> </div> <p>Solicitamos que recarregue a pagina para tentar novamente.</p> <a href="/checkout/#/cart" class="qd-fullpage-loading-reload-link">Recarregar página</a> </div>');

					$('.vtex-front-messages-template').hide();

					fullPage.find('.qd-fullpage-loading-reload-link').click(function(evt) {
						evt.preventDefault();
						location.reload();
					});

					fullPage.toggle();
					return;
				}
			}
		}
	},
	payment: function() {
		if(!QdPbmCheckout.requestRunning)
			QdPbmCheckout.execPayment();
		else
			$(window).one("checkoutRequestEnd.vtex", function() {
				QdPbmCheckout.execPayment();
			});
	},
	execPayment: function() {
		// Verificando se o usuário esta logado
		QdPbmCheckout.userIsAuthenticated(function() {
			QdPbmCheckout.validateItems();
		});
	},
	checkRequestIsRunning: function() {
		QdPbmCheckout.requestRunning = false;

		$(window).on("checkoutRequestStart.vtex", function() {
			QdPbmCheckout.requestRunning = true;
		});

		$(window).on("checkoutRequestEnd.vtex", function() {
			QdPbmCheckout.requestRunning = false;
		});
	},
	attachmentOrder: function(data) {
		if ($.cookie('qdPbm').length <= 0)
			return;

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
					"horaCentral": data.items[i].PbmHoraCentral,
					"ctlAP": data.items[i].PbmCtlAP,
					"nrLocal": data.items[i].PbmNrLocal,
					"discPerc": (data.items[i].PbmDiscount / 100 / 100).toFixed(4)
				});
			}
			infoPbm["PBM"] = {
				"cpf": data.cpf,
				'items': pbmItems
			};

			vtexjs.checkout.sendAttachment('openTextField', {value: JSON.stringify(infoPbm)}).always(function() {
				$(document.body).removeClass('qd-loading');
			});
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
	itemsValidated: function() {
		try {
			var fullPage = $('.qd-fullpage-loading').html('<div class="qd-fullpage-loading-applying"> <div class="qd-fullpage-loading-applying-header"> <img src="/arquivos/stamp-pbm-2.jpg" alt="PBM" /> </div> <p>Aguarde. Estamos aplicando o seu desconto.</p> <i class="icon-spinner icon-spin"></i> </div>');
			fullPage.show();

			$.ajax({
				url: '/api/checkout/pub/gift-cards/providers',
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "json"
			}).done(function(data) {
				vtexjs.checkout.sendAttachment('paymentData', {
					giftCards: [{
						inUse : true,
						isSpecialCard : false,
						provider : data[0].id,
						redemptionCode : $.cookie('qdPbm')
					}],
					payments: vtexjs.checkout.orderForm.paymentData.payments
				}).always(function() {
					fullPage.toggle();
				}).fail(function() {
					fullPage.html('<div class="qd-fullpage-loading-reload"> <div class="qd-fullpage-loading-reload-header"> <span>Ocorreu um erro ao aplicar o desconto PBM</span> </div> <p>Solicitamos que recarregue a pagina para tentar novamente.</p> <a href="/checkout/#/cart" class="qd-fullpage-loading-reload-link">Recarregar página</a> </div>');

					fullPage.find('.qd-fullpage-loading-reload-link').click(function(evt) {
						evt.preventDefault();
						location.reload();
					});

					fullPage.toggle();
				});
			});
		}
		catch (e) {
			$('.vtex-front-messages-modal-template').modal('hide');
		}
	},
	validateItems: function() {
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
			// Estrutura para o informativo do pbm no item do checkout
			$('.cart-items td.product-price').each(function() {
				var $t = $(this);
				$t.setTimeout('<div class="qd-pbm-item"> <img src="/arquivos/stamp-pbm-2.jpg" alt="" /> <span>Valor com desc.: <span class="qd-pbm-item-value">R$ 6,60</span></span> </div>');
			});

			if (data.giftcardValue <= 0) {
				var fullPage = $('.qd-fullpage-loading').html('<div class="qd-fullpage-loading-not-applied"> <div class="qd-fullpage-loading-not-applied-header"> <span>Atenção!</span> </div> <p>O desconto da Drogaria Araujo é maior do que o oferecido pelo PBM.</p> <a href="/checkout/#/cart" class="qd-fullpage-loading-close">Fechar</a> </div>');

				fullPage.find('.qd-fullpage-loading-close').click(function(evt) {
					evt.preventDefault();
					fullPage.toggle();
				});

				fullPage.toggle();
				return;
			}

			if(!data.pbmAvailable || !data.discountAvailable)
				return;

			var checkReq = function() {
				if(req != cReq)
					return;
				if(req != 0)
					QdPbmCheckout.validateItems();
				if(req == cReq) {
					QdPbmCheckout.itemsValidated();
					QdPbmCheckout.attachmentOrder(data);
				}
			};

			var req = 0;
			var cReq = 0;
			for(var i = 0; i < data.items.length; i++){
				if(!data.items[i].Pbm)
					continue;

				if(data.items[i].PbmValid){
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
		});
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