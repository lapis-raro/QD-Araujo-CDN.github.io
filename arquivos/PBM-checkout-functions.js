var QdPbmCheckout = {
	// sever: '//localhost:8080/araujo-pbm',
	sever: '//web.araujo.com.br/araujo-pbm',
	providerId: 'araujo',
	run: function() {
		QdPbmCheckout.checkRequestIsRunning();
		QdPbmCheckout.loadingFix();
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
	requestStop: function() {
		$(window).trigger("QD.PBM_requestStop");
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

		function updateStatus($firstRun) {
			if(ajaxRunning == false && vtexIsRunning == false){
				QdPbmCheckout.requestRunning = false;
				if(!$firstRun)
					QdPbmCheckout.requestStop();
			}
			else
				QdPbmCheckout.requestRunning = true;
		};
		updateStatus(true);
	},
	loadingFix: function() {
		$(window).on("QD.PBM_requestStop", function() {
			setTimeout(function() {
				try {
					if(!checkout.loading() && $('.container-order-form .loading-img:visible').length) {
						checkout.loading(true);
						checkout.loading(false);
					}
				}
				catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
			}, 300);
		});
	},
	cart: function() {
		QdPbmCheckout.removeGiftcard();
	},
	payment: function() {
		if(!QdPbmCheckout.requestRunning) {
			QdPbmCheckout.execPayment();
		} else {
			$(window).one("checkoutRequestEnd.vtex", function() {
				QdPbmCheckout.execPayment();
			});
		}
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
			for (var i = 0; i < orderForm.messages.length; i++) {
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
					console.debug('vou Recarregar por causa do orderForm.messages[i].text ', orderForm.messages[i].text);
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

		var htmlPbmDiscountInfo = $('<tr class="qd-pbm-discount"> <td class="info">Desconto do PBM</td> <td class="space"></td> <td class="qd-pbm-discount-monetary"></td> <td class="empty"></td> </tr> <tr class="qd-pbm-total"> <td class="info">Total com PBM</td> <td class="space"></td> <td class="qd-pbm-total-monetary monetary"></td> <td class="empty"></td> </tr>');
		var cartTotalizers = $('.mini-cart .cart-totalizers');

		if (!vtexjs.checkout.orderForm.paymentData.giftCards.length) {
			cartTotalizers.find('.qd-pbm-discount').remove();
			cartTotalizers.find('.qd-pbm-total').remove();
			return;
		}

		if ($('.mini-cart .cart-totalizers .qd-pbm-discount-monetary').length) {
			cartTotalizers.find('.qd-pbm-discount-monetary').html('- R$ ' + qd_number_format(vtexjs.checkout.orderForm.paymentData.giftCards[0].value/100, 2, ',', '.'));
			cartTotalizers.find('.qd-pbm-total-monetary').html(window.paymentData.totalToPayIncludingGiftsLabel());
		} else {
			cartTotalizers.find('tfoot').append(htmlPbmDiscountInfo);
			htmlPbmDiscountInfo.find('.qd-pbm-total-monetary').html(window.paymentData.totalToPayIncludingGiftsLabel());
			htmlPbmDiscountInfo.find('.qd-pbm-discount-monetary').html('- R$ ' + qd_number_format(vtexjs.checkout.orderForm.paymentData.giftCards[0].value/100, 2, ',', '.'));
		}
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
				if(!(data.items[i].Pbm && data.items[i].PbmHasDiscount))
					continue;

				pbmItems.push({
					"sku": data.items[i].id,
					"nrCentral": data.items[i].PbmNrCentral,
					"hCentral": data.items[i].PbmHoraCentral,
					"ctlAP": data.items[i].PbmCtlAP,
					"nrLocal": data.items[i].PbmNrLocal,
					"discPerc": (data.items[i].PbmDiscount / 100 / 100).toFixed(4),
					"qtyValid": data.items[i].PbmCheckoutValid,
					"newPrice": data.items[i].PbmNewPrice,
					"listPrice": data.items[i].PbmListPrice,
					"cpf": data.items[i].PbmCpf
				});
			};
			var newPbmData = {'items': pbmItems};

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

			// Adiciono a informação ao campo de Texto Livre
			QdPbmCheckout.attachmentOrder(data);

			// Verifico se já não tenho esse gift aplicado
			var redemptionCode = $.cookie('qdPbm');
			if(vtexjs.checkout.orderForm.paymentData && vtexjs.checkout.orderForm.paymentData.giftCards)
				for(var i = 0; i < vtexjs.checkout.orderForm.paymentData.giftCards.length; i++){
					if(vtexjs.checkout.orderForm.paymentData.giftCards[i].redemptionCode == redemptionCode)
						return $('.gift-card-section').addClass('qd-pbm-applied-discount');
				}

			QdPbmCheckout.fullPageElement.html('<div class="qd-fullpage-notification-applying"> <div class="qd-fullpage-notification-applying-header"> <img src="/arquivos/stamp-pbm-2.jpg" alt="PBM" /> </div> <p>Aguarde. Estamos aplicando o seu desconto.</p> <i class="icon-spinner icon-spin"></i> </div>');
			QdPbmCheckout.fullPageElement.show();

			vtexjs.checkout.sendAttachment('paymentData', {
				giftCards: [{
					inUse: true,
					isSpecialCard: false,
					provider: QdPbmCheckout.providerId,
					redemptionCode: redemptionCode
				}],
				payments: vtexjs.checkout.orderForm.paymentData.payments
			}).done(function() {
				QdPbmCheckout.fullPageElement.hide();
			}).always(function() {
				$('.gift-card-section').addClass('qd-pbm-applied-discount');
			}).fail(QdPbmCheckout.notificationError);
		}
		catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
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
				}

				var checkReq = function() {
					if(req != cReq)
						return;
					if(req != 0)
						QdPbmCheckout.validateItems();
					if(req == cReq)
						QdPbmCheckout.itemsValidated(data);
				};

				var req = 0;
				var cReq = 0;
				QdPbmCheckout.cartElement.find('.qd-pbm-item').remove();
				for(var i = 0; i < data.items.length; i++){
					if(!data.items[i].Pbm)
						continue;

					if(data.items[i].PbmValid){
						QdPbmCheckout.showCartDiscountInformation(data.items[i]);
						checkReq();
						continue;
					} else {
						req++;

						QdPbmCheckout.preAuth(data.items[i]).done(function(dataPreAuth){
							console.log(dataPreAuth);
						}).always(function() {
							cReq++;
							checkReq();
						});
					}
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		});
	},
	showCartDiscountInformation: function(item) {
		if(item.PbmHasDiscount)
			var htmlMsg = '<span>Valor com o desconto do PBM: <span class="qd-pbm-item-value">R$ ' + qd_number_format(item.PbmNewPrice / 100, 2, ",", ".") + '</span></span>';
		else
			var htmlMsg = '<span>Preço Araujo menor que o PBM!</span>';

		QdPbmCheckout.cartElement.find('.product-item[data-sku="' + item.id + '"] td.product-price').append('<div class="qd-pbm-item">' + htmlMsg + '</div>');
	},
	validateBestDiscount: function() {
		// var modal = $('<div class="modal fade modal-qd-pbm-confirm-discount hide"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <div class="row-fluid"> <div class="span12"> <p> Notamos que o desconto do PBM para <span class="qd-last-quantity"></span> itens, é melhor do que para <span class="qd-current-quantity"></span> itens </p> <p> Preço para <span class="qd-last-quantity"></span> itens: <span class="qd-last-price"></span> </p> <p> Preço para <span class="qd-current-quantity"></span> itens: <span class="qd-current-price"></span> </p> </div> </div> <div class="row-fluid"> <div class="span12"> <button class="modal-qd-pbm-confirm-discount-last" type="button">Manter PBM para <span class="qd-last-quantity"></span> itens</button> <button class="modal-qd-pbm-confirm-discount-current" type="button" data-dismiss="modal">Manter PBM para <span class="qd-current-quantity"></span> itens</button> </div> </div> </div> </div> </div> </div>');

		// if ($('.modal-qd-pbm-confirm-discount').length)
		// 	modal = $('.modal-qd-pbm-confirm-discount');
		// else
		// 	$(document.body).append(modal);

		// modal.find('.qd-last-quantity').text(previousItem.quantity);
		// modal.find('.qd-last-price').text(qd_number_format(previousItem.PbmNewPrice / 100, 2, ",", "."));
		// modal.find('.qd-current-quantity').text(currentItem.QtdeAuth);
		// modal.find('.qd-current-price').text(qd_number_format(currentItem.newPrice / 100, 2, ",", "."));

		// modal.modal();
	},
	preAuth: function(item) {
		return $.ajax({
			// url: QdPbmCheckout.sever + '/pre-auth',
			url: QdPbmCheckout.sever + '/check-best-discount',
			dataType: 'json',
			type: 'POST',
			data: {
				cpf: item.PbmCpf,
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