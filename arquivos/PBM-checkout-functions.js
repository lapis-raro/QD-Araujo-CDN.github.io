var QdPbmCheckout = {
	// sever: '//localhost:8080/araujo-pbm',
	sever: '//web.araujo.com.br/araujo-pbm',
	init: function() {
		QdPbmCheckout.cookieRenew(); // chamar antes de todos
	},
	payment: function() {
		// Verificando se o usuário esta logado
		QdPbmCheckout.userIsAuthenticated(function() {
			QdPbmCheckout.validateItems();
		});
	},
	attachmentOrder: function(data) {
		$(document.body).addClass('qd-loading');

		try {
			var infoPbm = {};

			if (vtexjs.checkout.orderForm.openTextField && vtexjs.checkout.orderForm.openTextField.value && vtexjs.checkout.orderForm.openTextField.value.length){
				try { infoPbm = JSON.parse(vtexjs.checkout.orderForm.openTextField.value) }
				catch (e) { infoPbm = {oldMessage: vtexjs.checkout.orderForm.openTextField.value} }
			}

			infoPbm["PBM"] = [];
			for (var i = 0; i < data.items.length; i++) {
				if(!data.items[i].Pbm)
					continue;

				infoPbm.PBM.push({
					"id": data.items[i].id,
					"code": data.nr_central,
					"pFrom": data.items[i].listPrice,
					"pFor": data.items[i].price - (data.giftcardValue * 100),
					"discPerc": (1 - (data.discountPercentage / 100 / 100)),
					"doc": data.cpf
				});
			}

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
		$(document.body).addClass('qd-loading');

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
				$(document.body).removeClass('qd-loading');
			});
		});
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
			if(!data.pbmAvailable)
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

$(QdPbmCheckout.init);