var QdPbm = {
	init: function() {
		QdPbm.cookieRenew(); // chamar antes de todos
		QdPbm.pbmHtmlLayout();
		QdPbm.pbmConsult();
	},
	// sever: '//localhost:8080/araujo-pbm',
	sever: '//web.araujo.com.br/araujo-pbm/',
	cookieRenew: function() {
		$.cookie('qdPbm', $.cookie('qdPbm') || '', {path: '/', expires: 1});
	},
	pbmHtmlLayout: function() {
		$('.product-other-payment-method-wrap').before('<div class="row"> <div class="col-xs-30"> <div class="product-qd-v1-pbm p"><div class="qd-loading" style="display: none;"><img src="/arquivos/ajax-loader.gif" /></div><label for="">CPF: <input type="tel" /></label><button>Enviar</button></div> </div> </div>');

		QdPbm.pbmLoading = $('.product-qd-v1-pbm .qd-loading');
	},
	pbmConsult: function() {
		var wrapper = $('.product-qd-v1-pbm');
		var buyBtns = $('.product-sku-rich-selection-wrap .buy-button');
		var skuLists = $('.product-sku-rich-selection-wrap .skuList');

		wrapper.find('button').click(function() {
			var cpf = (wrapper.find('input').val() || '').trim();
			if(!cpf.length)
				return alert('Informe um CPF');

			QdPbm.pbmProcessItem(0, skuJson.skus[0], cpf, buyBtns, skuLists);
		});
	},
	pbmProcessItem: function(ndx, items, cpf, buyBtns, skuLists) {
		if(typeof skuJson.skus[ndx] == 'undefined')
			return;

		function callNext() {
			QdPbm.pbmProcessItem(ndx + 1, skuJson.skus, cpf, buyBtns, skuLists);
		};

		var wrapper = $('.product-qd-v1-pbm');

		// Verifico se este item esta disponível em estoque
		if(!skuJson.skus[ndx].available)
			return callNext();

		QdPbm.reqData = {
			cpf: cpf,
			qtt: buyBtns.filter('[href*="sku=' + skuJson.skus[ndx].sku + '&"]').closest(skuLists).find('.qd-sq-quantity').val() || 1,
			bDate: '',
			sku: skuJson.skus[ndx].sku,
			productId: skuJson.productId
		};

		// Caso eu tenha o ID da transação anterior
		var cookie = $.cookie('qdPbm');
		if(cookie && cookie.length)
			QdPbm.reqData.orderId = cookie;

		QdPbm.pbmLoading.show();
		$.ajax({
			url: QdPbm.sever + '/pre-auth',
			dataType: 'json',
			type: 'POST',
			data: QdPbm.reqData,
			complete: function() { QdPbm.pbmLoading.hide() }
		})
		.fail(function() {alert('Desculpe, não foi possível consultar o sistema.');})
		.done(function(data) {
			// Exibindo o modal de cadastro
			if(data.redirect && data.redirect.indexOf('ATIVA') == 0){
				if($('.qd-pbm-modal-sign-up').length)
					return;

				var modal = $('.qd-common-modal').clone().removeClass('qd-common-modal').addClass('qd-pbm-modal-sign-up');
				modal.modal();
				modal.on('hidden.bs.modal', function() {modal.remove()});
				QdPbm.pbmInsertSignUpForm(modal, data, cpf);
				return;
			}

			// Exibindo as informações sobre o desconto do item
			if(data.item){
				if(data.item.QtdeAuth != QdPbm.reqData.qtt)	
					wrapper.append('<p>Quantidade solicitada é diferente da quantidade na qual foi concedido o desconto</p>');

				var priceDiscount = Math.ceil(data.item.price * ((100- data.item.DescPerc /100)/100));
				if(data.item.sellingPrice <= priceDiscount)
					wrapper.append('<p>O desconto oferecido para o item “' + data.item.nameComplete + '” é menor do que o preço oferecido pela Araujo. Fique tranquilo, você já esta pagando o menor preço para este item.</p>');
				else
					wrapper.append('<p>O item “' + data.item.nameComplete + '” teve o desconto concedido. Você pagará R$ ' + qd_number_format(priceDiscount / 100, 2, ",", ".") + '</p>');
				
				wrapper.append('<p>Informação do sistema de PBM: “' + data.info + '” </p>');
			}
			else
				wrapper.append('<p>Informação do sistema de PBM: “' + data.info + '” </p>');
		}).done(function(data) {
			if(typeof data.id == 'string' && data.id.length)
				$.cookie('qdPbm', data.orderId, {path: '/', expires: 1});
		}).done(function() {
			callNext();
		}).done(function(data) {
			// Caso a requisição exija o login na Seven
			if(data.statusServico == 30 || data.statusServico == 31)
				$.ajax(QdPbm.sever + '/').always(function() { location.reload() });
		});
	},
	pbmRegexCache: {
		onlyNumber: /[^0-9]+/g,
		date: /([0-9]+)\/([0-9]+)\/([0-9]+)/
	},
	pbmInsertSignUpForm: function(modal, data, cpf) {
		var form = $('<form><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><label>Nome Completo <input class="form-control" type="text" name="name"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4 qd-pbm-ATIVA5 qd-pbm-ATIVA-QD"><div class="form-group"><label>E-mail <input class="form-control" type="email" name="email"></label></div><div class="form-group"><label>CPF <input class="form-control" type="text" name="cpf"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><div class="radio"><label>Masculino <input type="radio" value="77" title="Masculino" name="gender"></label><label>Feminino <input type="radio" value="70" title="Feminino" name="gender"></label></div></div><div class="form-group"><label>Data de aniversário <input class="form-control" type="text" name="bDate"></label></div><div class="form-group"><label>Telefone <input class="form-control" type="text" name="phone"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><label>Celular <input class="form-control" type="text" name="mPhone"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><label>CEP <input class="form-control" type="text" name="zip"></label></div><div class="form-group"><label>Tipo <select class="form-control" name="aType"><option value=""></option><option value="AV">Avenida</option><option value="AL">Alameda</option><option value="EST">Estrada</option><option value="PC">Praça</option><option value="R">Rua</option><option value="ROD">Rodovia</option><option value="TRV">Travessa</option><option value="LG">Largo</option><option value="Outr">Demais</option></select></label></div><div class="form-group"><label>Endereço <input class="form-control" type="text" name="address"></label></div><div class="form-group"><label>Número <input class="form-control" type="text" name="n"></label></div><div class="form-group"><label>Complemento do endereço <input class="form-control" type="text" name="complement"></label></div><div class="form-group"><label>Bairro <input class="form-control" type="text" name="neighborhood"></label></div><div class="form-group"><label>Cidade <input class="form-control" type="text" name="city"></label></div><div class="form-group"><label>Estado <select class="form-control" name="state"><option value=""></option><option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option></select></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA1 qd-pbm-ATIVA3"><div class="form-group"><label>Nome do médico <input class="form-control" type="text" name="profName"></label></div><div class="form-group"><label>CRM do médico <input class="form-control" type="text" name="profCod"></label></div><div class="form-group"><label>Estado do médico <select class="form-control" name="profState"><option value="">Selecione</option><option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option></select></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><div class="checkbox"><label>Aceito os termos do programa <input type="checkbox" value="83" name="accept"></label></div></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><div class="checkbox"><label>Aceito contato por telefone <input type="checkbox" value="83" name="acceptPhone"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por correspondência <input type="checkbox" value="83" name="acceptMail"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por SMS <input type="checkbox" value="83" name="acceptSMS"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por e-mail <input type="checkbox" value="83" name="acceptEmail"></label></div></div></span><button type="submit">Enviar</button></form>');
		modal.find('.modal-body').html(form);
		form.find('.qd-pbm-ATIVA').hide().filter('.qd-pbm-' + data.redirect).show().find('input:not([type=checkbox]), input[name=accept], select').addClass('required');
		form.find('.qd-pbm-ATIVA:not(".qd-pbm-' + data.redirect + '")').remove();

		form.find("input[name=zip]").mask('00000-000');
		form.find("input[name=phone]").mask('(00) 0000-0000');
		form.find("input[name=mPhone]").mask('(00) 0000-00009');
		form.find("input[name=cpf]").val(cpf).mask('000.000.000-00');
		form.find("input[name=bDate]").mask('D0/M0/0000',  {'translation': { D: {pattern: /[0123]/}, M: {pattern: /[01]/} }});

		// Preenchendo o endereço a partir do CEP
		var cepInputs = form.find("select, input").filter('[name=aType], [name=address], [name=n], [name=complement], [name=neighborhood], [name=city], [name=state]').attr("disabled", "disabled");
		var cep = form.find("input[name=zip]");
		cep.keyup(function(e) {
			if((cep.val() || "").length < 9)
				return;

			cep.attr("disabled", "disabled");
			$.ajax({
				url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
				dataType: "json",
				complete: function() {
					cepInputs.add(cep).removeAttr('disabled');
				}
			}).done(function(data) {
				var street = (data.street || "").trim().split(' ');
				var adType = null;
				form.find("select[name=aType] option").each(function() {
					var $t = $(this);
					if(street[0].toUpperCase().replaceSpecialChars() == $t.text().toUpperCase().replaceSpecialChars()){
						adType = $t.text();
						$t.parent().val($t.attr('value')).change();
						return false;
					}
				});
				if(adType)
					street[0] = '';
				else
					form.find('select[name=aType]').val('Outr').change();
				form.find("input[name=address]").val(street.join(' '));

				form.find("input[name=neighborhood]").val(data.neighborhood || "");
				form.find("input[name=city]").val(data.city || "");
				form.find("select[name=state]").val(data.state || "").change();
			});
		});

		form.validate({
			rules: {email: {email: true } },
			submitHandler: function(form){
				var $form = $(form);

				if(!$form.valid())
					return;

				var formDataArray = $form.serializeArray();
				var formData = {};
				for(var i = 0; i < formDataArray.length; i++){
					if(formDataArray[i].value)
						formData[formDataArray[i].name || '---'] = formDataArray[i].value;
				}

				formData.acceptPhone = formData.acceptPhone || '78';
				formData.acceptMail = formData.acceptMail || '78';
				formData.acceptSMS = formData.acceptSMS || '78';
				formData.acceptEmail = formData.acceptEmail || '78';
	
				if(formData.zip)
					formData.zip = formData.zip.replace(QdPbm.pbmRegexCache.onlyNumber, '');
				if(formData.cpf)
					formData.cpf = formData.cpf.replace(QdPbm.pbmRegexCache.onlyNumber, '');
				if(formData.bDate)
					formData.bDate = formData.bDate.replace(QdPbm.pbmRegexCache.date, '$3-$2-$1');
				if(formData.mPhone){
					formData.mPhone = formData.mPhone.replace(QdPbm.pbmRegexCache.onlyNumber, '').split('');
					formData.mPhoneCode = formData.mPhone.shift() + formData.mPhone.shift();
					formData.mPhone = formData.mPhone.join('');
				}
				if(formData.phone){
					formData.phone = formData.phone.replace(QdPbm.pbmRegexCache.onlyNumber, '').split('');
					formData.phoneCode = formData.phone.shift() + formData.phone.shift();
					formData.phone = formData.phone.join('');
				}

				formData["preAuthId"] = data.id;

				var isAtivaQd = data.redirect && data.redirect == 'ATIVA-QD';
				$.ajax({
					url: QdPbm.sever + (isAtivaQd? '/pre-auth': '/sign-up'),
					type: 'POST',
					dataType: 'json',
					data: isAtivaQd? $.extend({}, QdPbm.reqData, formData): formData
				})
				.fail(function() {alert('Desculpe, não foi possível consultar o sistema.');})
				.done(function(data) {
					alert(data.info);

					modal.on('hidden.bs.modal', function() {$('.product-qd-v1-pbm button').click(); });
					modal.modal('hide');
				});

				return false;
			},
			errorPlacement: function(error, element) {}
		});
	}
};

$(QdPbm.init);