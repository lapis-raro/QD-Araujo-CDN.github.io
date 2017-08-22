// Variável para checar o CDN
var _QD_giftlist_cdn_check = true;

try {
	var List = {
		run: function() {
			List.readyListRedirectAddNoRedirect();
			List.postRDStation();
		},
		init: function() {
			List.readyListRedirect(); // chamar antes de todos

			List.giftlistClone();
			List.giftListInviteSelectModel();
			List.giftListInviteTextFill();
			List.giftListInviteLinkFill();
			List.giftListCreateUrlListName();
			List.inviteGetLists();
			List.inviteSendEmail();
			List.giftListManageBtnEdit();
			List.giftListChangeIdURL();
			List.giftListBtnGiftCustom();
			List.giftListShelfBuyButton();
			List.giftListShelfRedirectManage();
			List.giftListCreateToolsTipsInsert();
			List.changeReadyListTitle();
			Product.insertSkuModalCustomize();
			List.giftlistReadySetId();
			List.paginationStartFix();
			List.hideSearchNavigator();
			List.addLinkBeforeSidebar();
			List.readyListRemoveLinks();
			List.qdMobileListSearchMenu();
			List.insertLidListLinks();
			List.giftlistReadySetProductName();
			List.giftlistCreteRemoveListTypes();
			List.changeTagHtmlSeachNavigator();
			List.formEnhancedValidation();
			List.togglePopupGiftList();

			if(location.pathname.toLowerCase().indexOf('/giftlist/product') > -1){
				List.getGiftListBalance();
				List.getGiftBalance();
			}

			List.getGiftListCreateModalOpen();
		},
		ajaxStop: function() {
			List.readyListRemoveLinks();
			List.giftlistReadySetProductName();

			if(location.pathname.toLowerCase().indexOf('/giftlist/product') > -1)
				List.addValueTotalGift();
		},
		windowOnload: function() {},
		
		togglePopupGiftList: function () {
			$('.giftlist-popup-qd-v1-title').click(function () {
				$('.giftlist-popup-qd-v1').toggleClass('popup-on');
			});
		},
		changeTagHtmlSeachNavigator: function() {
			var $h3 = $(".search-single-navigator h3");

			$h3.each(function() {
				var $t = $(this);

				$t.replaceWith('<h1>' + $t.html() + '</h1>');
			});
		},
		postRDStation: function() {
			if(!(location.pathname.indexOf("/giftlist/create") > -1 || location.hash.indexOf("readylist=1") > -1))
				return;

			var identificador = 'Clicou no CTA - Criar sua lista';
			if (location.hash.indexOf("readylist=1") > -1)
				identificador = 'Clicou no CTA - Listas prontas';

			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data) {
					$.getScript('//d335luupugsy2.cloudfront.net/js/integration/stable/rd-js-integration.min.js', function() {
						RdIntegration.post([
							{ name: 'email', value: data.Email },
							{ name: 'identificador', value: identificador },
							{ name: 'nome', value: (data.FirstName || data.Email) + ' ' + (data.LastName || '') },
							{ name: 'token_rdstation', value: '19afe9cd6a66d4578bcc6b174a4d186a' }
							]);
					})
				}
			});
		},
		giftlistCreteRemoveListTypes: function() {
			if(!$(document.body).is('.giftlist-create'))
				return;

			// Remove as listas que não podem ser utilizadas por clientes
			Product.removeGiftlistTypes($('#giftlisttype'));
		},
		giftlistReadySetProductName: function() {
			if (!$(document.body).is('.giftlist-shelf-list'))
				return;

			$('.buy-sku-name').each(function() {
				var $t = $(this);
				$t.closest('li[layout]').find('.shelf-common-product-name a').text($t.text().trim());
			});
		},
		insertLidListLinks: function() {
			if (!$(document.body).is('.giftlist-shelf-list'))
				return;

			var lid = (location.search.match(/lid=[^&]+/i) || ['']).pop();

			if (lid.length)
				$('.navigation a').each(function(){
					this.search += '&' + lid;
				});
		},
		qdMobileListSearchMenu: function() {
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
		addLinkBeforeSidebar: function() {
			var listLink = $('.giftlistinfo-link input').val();
			var listLinkStructure = $('<a href="'+ listLink +'"></a>');
			var listLinkHtml = $('<a class="gf-shelf-back-link" href="'+ location.href +'"><i class="fa fa-reply-all"></i> Ver lista completa</a>');

			listLinkHtml[0].pathname = listLinkStructure[0].pathname;

			$('.gf-shelf-navigator').prepend(listLinkHtml);
			$('.search-qd-v1-navigator-title').after(listLinkHtml);
		},
		readyListRedirectAddNoRedirect: function() {
			// Adiciono a querystring nos links da lista
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					if(!data.IsUserDefined)
						return;

					$(function() {
						var wrapper = $('.glmanager-type');

						wrapper.find('li.action-view a').each(function() {
							this.search = 'redirect=false&' + this.search.replace('?', '');
						});

						wrapper.find('li.action-manage a').each(function() {
							this.search = 'redirect=false&' + this.search.replace('?', '');
							this.protocol = 'https:';
						});
					});
				}
			});
		},
		readyListRedirect: function() {
			// Script responsável pelo redirect da visualização de uma lista pronta
			var search = (location.search || '');
			if(search.indexOf('lid=') > -1 || search.indexOf('redirect=false') > -1)
				return;

			var wrapper = $('.giftlistinfo-members').clone();
			wrapper.find('span').remove();
			var surname = wrapper.find('.surname').text().trim().toLowerCase() == 'lista';
			var name = wrapper.find('.name').text().trim().toLowerCase() == 'drogaria araujo';
			var title = $('.giftlistinfo-title').text().trim().toLowerCase() == 'lista pronta';

			if(surname && name && title)
				location.href = '/giftlist/ready-list';
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
		readyListRemoveLinks: function() {
			if(!$(document.body).is('.giftlist-shelf-list'))
				return;

			$('li[layout] a').removeAttr('href');
		},
		giftListCreateToolsTipsInsert: function() {
			var form = $("#giftlistform");
			var formInputs = [];

			formInputs[0] = form.find('#giftlisttype');
			formInputs[1] = form.find('#giftlistname');
			formInputs[2] = form.find('#giftlisturl');
			formInputs[3] = form.find('#giftlistmessage');
			formInputs[4] = form.find('#giftlisteventdate');
			formInputs[5] = form.find('#giftlisteventlocation');
			formInputs[6] = form.find('#giftlisteventcity');
			formInputs[7] = form.find('#membertitle1');
			formInputs[8] = form.find('#membername1');
			formInputs[9] = form.find('#membersurname1');
			formInputs[10] = form.find('#membermail1');
			formInputs[11] = form.find('');
			formInputs[12] = form.find('.address-component h2');

			$(".gf-create-toolstips .gf-qd-v1-toolstips-text").each(function(index, el) {
				$(formInputs[index]).after($(el));
				$(formInputs[index]).after('<span class="gf-qd-v1-toolstips-btn-active-'+ [index] +'"></span>');
			});

			$('[class*="gf-qd-v1-toolstips-btn-active"]').hover(function() {
				$(this).find('+ .gf-qd-v1-toolstips-text').show();
			}, function() {
				$(this).find('+ .gf-qd-v1-toolstips-text').hide();
			});
		},
		paginationStartFix: function() {
			// chupaaaaa buuuug
			var functionName;
			for(var i in window){
				if(i.indexOf('PageClick_') == 0){
					functionName = i;
					break;
				}
			}

			// Caso eu tenha conteúdo na hash atual e esteja em uma página de lista pronta, armazeno isso e insiro novamente após a função de paginação da VTEX
			var hash = (window.location.hash || '').replace('#', '');
			var isReadyGiftlist = $(".btn-clone-list").length > 0;

			var orig = window[functionName];
			window[functionName] = function(pageNumber) {
				if(!parseInt(pageNumber || '-', 10))
					return;

				orig.apply(this, arguments);

				if(isReadyGiftlist && hash.length)
					window.location.hash = hash;
			}
		},
		getGiftListCreateModalOpen: function() {
			if(location.pathname.toLowerCase().indexOf('/giftlist/manage') < 0)
				return;

			if (!$(document.body).is('.giftlist-manage'))
				return;

			var listId = (location.search.match(/new\=([0-9]+)/i) || [""]).pop();
			if(!listId.length)
				return;

			var modal = $(".modal");
			var html = '<div class="row"> <div class="col-xs-28 col-xs-offset-1"> <div class="row"> <div class="col-xs-30 col-sm-10"> <div class="giftlist-qd-v1-modal-after-creation-img"> <img class="center-block" src="/arquivos/giftlist-qd-v1-modal-after-creation-img-1.png" alt=""/> </div></div><div class="col-xs-30 col-sm-20"> <div class="giftlist-qd-v1-modal-after-creation-title"> <h3>Sua lista foi criada com sucesso!</h3> <span>O que fazer agora?</span> </div></div></div><div class="row"> <div class="col-xs-30 col-sm-13"> <div class="giftlist-qd-v1-modal-after-creation-btn-content"> <a href="/" class="link-return"><i class="fa fa-chevron-left"></i>ESCOLHER PRODUTOS NA LOJA</a> <p>Navegue entre os produtos e clique em “Adicione à sua lista”.</p></div></div><div class="col-xs-30 col-sm-4"> <div class="giftlist-qd-v1-modal-after-creation-btn-content"> <p class="giftlist-qd-v1-modal-after-creation-btn-content-middle-text">ou</p></div></div><div class="col-xs-30 col-sm-13"> <div class="giftlist-qd-v1-modal-after-creation-btn-content"> <a href="/giftlist/ready-list?qdlistid=' + listId + '" class="link-ready-list">Usar lista pronta<i class="fa fa-chevron-right"></i></a> <p>Utilize uma de nossas listas prontas.</p></div></div></div></div></div>';

			modal.addClass('giftlist-qd-v1-modal-after-creation');
			modal.find('.modal-body').html(html);
			modal.modal({
				backdrop: 'static'
			});
		},
		giftListShelfRedirectManage: function() {
			if (!$(document.body).is('.giftlist-shelf-list'))
				return;

			var listId = $.bbq.getState('qdlistid');
			var orig = window.ShowInsertedSuccess;

			window.ShowInsertedSuccess = function() {
				orig.apply(this, arguments);

				$("#TB_window .glis-edit-link").text("Redirecionando para o gerenciamento de lista...").prepend('<i class="fa fa-spinner fa-spin margin-r-xs "></i>');

				setTimeout(function () {
					if(listId)
						window.location = '/giftlist/manage';
					else
						window.location = "/giftlist/edit?" + (($("#TB_window .glis-edit-link").attr('href') || '').match(/(\?)?(\&)?(id=[0-9]*)/i) || ['']).pop() + "#readylist=1";
				}, 2000);
			};
		},
		addValueTotalGift: function() {
			var wrapper = $(".gf-product-statitics:not(.qd-on)").addClass("qd-on");
			if(!wrapper.length)
				return;

			var table  = $('<table class="glstat-table"><thead></thead><tbody></tbody></table>').insertAfter(wrapper.find(".glstat-table"));
			table.find("thead").append('<th class="glstat-table-vale">Valor total das compras</th><th class="glstat-table-gift-balance">Saldo do seu vale</th>');
			table.find("tbody").append('<td class="glstat-table-vale">' + (List.giftListBalance || "---") + '</td><td class="glstat-table-gift-balance">' + (List.giftBalance || "---") + '</td>');
		},
		giftListShelfBuyButton: function() {
			if (!$(document.body).is('.giftlist-shelf'))
				return;

			$(".header-simple-cart").QD_buyButton({
				buyButton: ".shelf-common-buy-button .qd-buybutton-2 a"
			});
		},
		giftListBtnGiftCustom: function() {
			if ($(document.body).is('.giftlist-manage'))
				$(".glmanager-actions").each(function() {
					var $t = $(this);
					if($t.find('.action-share').length)
						$t.append('<li class="action-manage"><a href="/giftlist/invite" title="Convites Personalizados">Convites Personalizados</a></li>');
				});

			if($(document.body).is('.giftlist-shelf, .giftlist-product')){
				if(!$('.giftlistinfo-link').length)
					$('.action-share').hide(); // lista privada não é possível compartilhar
				else if ($(".admin-only").length)
					$(".list-action").append('<li class="action-manage"><a href="/giftlist/invite" title="Convites Personalizados">Convites Personalizados</a></li>');
			}
		},
		giftListChangeIdURL: function() {
			if (!$(document.body).is('.giftlist-shelf'))
				return;

			var linkManage = $(".GiftListInfoV2 .list-action .action-manage a");

			if (!linkManage.length)
				return;

			linkManage.attr('href', linkManage.attr('href').replace(/Id=/g, "id="));
		},
		giftListManageBtnEdit: function() {
			if (!$(document.body).is('.giftlist-product'))
				return;

			$(".GiftListInfoV2  .giftlistinfo-image").append('<a class="btn-link-edit" href="/giftlist/edit?id=' +  location.search.replace(/(\?)?(\&)?id=/g, "") + '">Editar Foto</a>');
		},
		giftListCreateUrlListName: function() {
			var wrapper = $(".gf-search-create");

			if(!wrapper.length)
				return;

			wrapper.find("#giftlistname").keyup(function() {
				wrapper.find("#giftlisturl").val($(this).val().replace(/[^a-z0-9]/ig, ""));
			});
		},
		giftlistClone: function() {
			$(".btn-clone-list").click(function(){
				if ($(".glis-popup-link").length > 0) {
					$(".glis-sku-listtolist .glis-listtolist-checkbox").attr("checked", true).click();
					$(".glis-popup-link").click();
				} else {
					$(window.document.location).attr('href', $(".glis-link.must-login").attr("href"));
				}
			});
		},
		giftListInviteSelectModel: function() {
			var wrapperImg = $(".gf-invite-block-2-choose-invitation");
			var wrapperTableModel = $(".gf-invite-block-3-models-invite");

			wrapperImg.find('.gf-invite-img-model img').click(function() {
				var $t = $(this);

				// Select Img
				wrapperImg.find('.gf-invite-img-model').removeClass('active-model');
				$t.parent().addClass('active-model');

				// Select Table
				wrapperTableModel.find('> div').removeClass('active-model');
				wrapperTableModel.find('.' + $t.attr('data-invite-model')).addClass('active-model');
			});
		},
		giftListInviteTextFill: function() {
			var wrapper = $(".gf-invite-block-3-models-invite .text-user");
			var tableText = wrapper.find("p");
			var textPre = "Olá, \n \nNosso bebê ainda nem chegou mas já está cativando nossos corações. Por isso, você está convidado para um momento superespecial: o nosso Chá de Bebê. \n \nContamos com a sua participação."

			tableText.html(textPre.replace(/\n/g, "<br />"));

			$('.gf-invite-block-3-form [name="text_list"]')
			.val(textPre)
			.keyup(function() {
				tableText.html($(this).val().replace(/\n/g, "<br />"));
			});

			// Link da lista
			var link = wrapper.find("a");
			$(".qd-invite-lists").on("change", ".list-link", function() {
				var value = $(this).val() || "";
				if(value != "")
					link.attr("href", value).text(value);
			});
		},
		giftListInviteLinkFill: function() {
			var tableLink = $(".gf-invite-block-3-models-invite .text-user a");

			$(".gf-invite-block-3-form").find('[name="link_list"]').keyup(function() {
				tableLink.html($(this).val());
				tableLink.attr('href', "//" + $(this).val());
			});
		},
		inviteGetLists: function() {
			if(!$(document.body).is(".giftlist-invite"))
				return;

			var wrapper = $(".qd-invite-lists");

			$.ajax({
				url: "/giftlist/manage",
				dataType: "html",
				success: function(data) {
					var lists = $(data).find(".giftlistmanager .action-share").siblings(".action-view");

					var select = $('<select name="list-link" class="list-link"><option value="">Selecione</option></select>');
					lists.each(function() {
						var tr = $(this).getParent("tr");
						var list = tr.find(".giftlist-body-name a");
						select.append('<option value="http://www.araujo.com.br' + list.attr("href") + '" data-qd-list-id="' + tr.find(".giftlist-body-id").text().trim() + '">' + list.text() + '</option>');
					});

					if(lists.length)
						wrapper.html(select);
					else
						wrapper.html('<p class="text-danger bg-danger"><i class="fa fa-exclamation-triangle"></i> Você ainda não possui nenhuma lista ou nenhuma delas esta pública. Por favor crie uma <a href="/giftlist/create">clicando aqui</a>.</p>');
				},
				error: function() {
					wrapper.html('<p class="text-danger bg-danger"><i class="fa fa-exclamation-triangle"></i> Desculpe! Houve um erro ao tentar obter suas listas.</p>');
				}
			});
		},
		inviteSendEmail: function() {
			if(!$(document.body).is(".giftlist-invite"))
				return;

			var inviteMessage = "";
			var crmInviteId = "";

			$(".qd-social-whatsapp").parent().hide();

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$(".qd-social-whatsapp").parent().show();
			}

			// Obtendo o IP
			var ip = null;
			$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { ip = data.ip; }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp", success: function(data) { ip = data.ip; } }); } });

			var saveCRM = function(formData) {
				return $.ajax({
					url: "//api.vtexcrm.com.br/" + "araujo" + "/dataentities/LC/documents",
					type: "POST",
					dataType: "json",
					headers: {"Accept": "json", "Content-Type": "application/json; charset=utf-8"},
					data: JSON.stringify(formData),
					success: function(data) { crmInviteId = data.Id.replace("LC-", ""); }
				});
			};

			var getData = function(email, id_user) {
				var listSelect = $(".qd-invite-lists .list-link option:selected");
				inviteMessage = $(".gf-invite-block-3-models-invite .active-model").html() || "";
				return {
					ip: ip,
					email: email,
					user: id_user,
					message: inviteMessage,
					listName: listSelect.text(),
					listId: listSelect.attr("data-qd-list-id") || null,
					listIco: $('.gf-invite-img-model.active-model img:first').attr('src') || null
				};
			};

			var getUserCrmId = function(callback) {
				var userId = null;
				$.getJSON("/no-cache/profileSystem/getProfile").done(function(data) {
					$.ajax({
						url: "//api.vtexcrm.com.br/araujo/dataentities/CL/search?userId=" + data.UserId + "&_fields=id",
						dataType: "json",
						headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
						error: function() { alert("Desculpe! Não foi possível enviar seu formulário!"); }
					}).done(function(data) { callback(data[0].id); });
				}).fail(function() {alert("Desculpe! Não foi possível compartilhar sua lista!");});
			};

			// Facebook e Whatsapp
			$(".qd-social-facebook, .qd-social-whatsapp").click(function(e) {
				e.preventDefault();
				var $t = $(this);

				if(!($(".qd-invite-lists .list-link").val() || "").length){
					alert("Selecione o Link da lista.");
					return;
				}

				var openShareLink = function() {
					if($t.is(".qd-social-facebook"))
						window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://chadebebe.araujo.com.br/convite/" + crmInviteId), 'fbShareWindow', 'height=300, width=400, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
					else
						window.open("whatsapp://send?text=" + encodeURIComponent("http://chadebebe.araujo.com.br/convite/" + crmInviteId), 'whatsappShareWindow');
				};

				// Salvo no CRM
				if(inviteMessage != ($(".gf-invite-block-3-models-invite .active-model").html() || ""))
					getUserCrmId(function(id_user) {saveCRM(getData(null, id_user)).done(openShareLink).fail(function() {alert("Desculpe, não foi possível compartilhar sua lista!");}); });
				else
					openShareLink();
			});

			// E-mail
			var modal = $(".modal");
			$(".qd-social-email").click(function(e) {
				e.preventDefault();

				if(!($(".qd-invite-lists .list-link").val() || "").length){
					alert("Selecione o Link da lista.");
					return;
				}

				var header = modal.find(".modal-header");
				header.children(":not(button)").remove();
				header.prepend('<h4 class="pull-left">Para quem deseja enviar?</h4>');

				modal.modal();
				modal.addClass('qd-invite-modal');

				var form = $('<div class="qd-send-invite"></div>').appendTo(modal.find(".modal-body").empty());
				form.html('<p>Insira os e-mails (separe com vírgula ou espaço):</p>')
				var textarea = $('<textarea></textarea>').appendTo(form).tagEditor({delimiter: " ,;"});
				$('<button class="btn">Enviar convite</button>').click(function() {
					// Obtendo o e-mail
					var email = (textarea.val() || "").match(/([a-zA-Z0-9._\-\+])+@([a-z0-9._\-\+])+\.[a-z]{2,6}/g).join(",");
					if(!email.length)
						return alert("Preencha seu e-mail");

					form.addClass('qd-invite-loading');

					getUserCrmId(function(id_user) {
						var allowSave = inviteMessage != ($(".gf-invite-block-3-models-invite .active-model").html() || "");
						// Crio a variável com os dados
						var formData = getData(email, id_user);
						// Salvo no CRM, somente se o usuário tiver alterado a mensagem (para evitar dados duplicados)
						if(allowSave)
							saveCRM(formData);
						// Envio os dados para a hospedagem para mandar e-mail
						$.ajax({
							url: "https://ssl-202418.kinghost.net/send-invite-cha-de-bebe/general_email.php",
							type: "POST",
							dataType: "json",
							data: formData,
							success: function(){form.find(".form-succes").removeClass("hide"); },
							// error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
							complete: function() {form.removeClass('qd-invite-loading'); }
						});
					});
				}).appendTo(form);
				$('<div class="form-succes green-alert hide"> <i class="fa fa-check-circle-o padding-r-sm font-size-sm"></i>Email enviado com sucesso </div>').appendTo(form);
			});
		},
		getGiftListBalance: function() {
			var url = $("#showorders-popup").first().attr("href") || "";
			if(!url.length)
				return;

			var orders = [];
			$.ajax({
				url: url,
				dataType: "html",
				success: function(data) {
					var $data = $(data);
					$data.find(".order-info-list >li").each(function() {
						var id = ($(this).attr("id") || "").replace("oid-", "");
						if(!id.length)
							return;
						orders.push(id);
					});

					if(!orders.length)
						return;

					$.ajax({
						url: "https://ssl-202418.kinghost.net/orders-sum/orders-sum.php?orders=" + orders.join(","),
						dataType: "json",
						// error: function() {alert("Desculpe, infelizmente não foi possível consultar seu saldo no momento!"); },
						success: function(data) {List.giftListBalance = 'R$ ' + qd_number_format(data.sumOrders / 100, 2, ",", "."); }
					});
				},
				error: function() {
					alert("Desculpe, não foi possível consultar seu saldo no momento!");
				}
			});
		},
		getGiftBalance: function() {
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try {
						if(!data.IsUserDefined)
							return alert('Você precisa se logar para ver o saldo do vale.');

						$.ajax({
							url: "https://ssl-202418.kinghost.net/gift-card/gift-card.php?customerId=" + data.UserId,
							dataType: "json",
							success: function(data) {
								try {
									var total = 0;
									for(var i = 0; i < data.items.length; i++)
										total = total + data.items[i].balance;
									List.giftBalance = 'R$ ' + qd_number_format(total / 100, 2, ",", ".");
								}
								catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
							},
							error: function() {
								alert("Desculpe, infelizmente não foi possível consultar seu saldo no momento!");
							}
						});
					}
					catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
				},
				error: function() {
					alert("Desculpe, não foi possível consultar seu saldo no momento!");
				}
			});
		},
		changeReadyListTitle: function() {
			if (!$(document.body).is(".giftlist-shelf"))
				return;

			$('.giftlistinfo-title').text($('.giftlistinfo-description').remove().text());
		},
		giftlistReadySetId: function() {
			var listId = (location.search.match(/qdlistid\=([0-9]+)/i) || [""]).pop();
			if(!listId.length || !$(document.body).is('.giftlist-ready'))
				return;

			$('a[href^="/list/"]').each(function() {
				this.hash = this.hash + '&qdlistid=' + listId;
			});
		},
		formEnhancedValidation: function() {
			var validationForm = window.validationForm;
			var address = $('#addresscomponent');

			window.validationForm = function() {
				validationForm.apply(this, arguments);

				var filds = address.find('.postal-code');
				if(address.find('.save-address').is('.giftlisterror'))
					filds.addClass('giftlisterror');
				else
					filds.removeClass('giftlisterror');
			}
			
			var ShowErrorMessage = window.ShowErrorMessage;
			window.ShowErrorMessage = function() {
				ShowErrorMessage.apply(this, arguments);

				console.debug("$('.giftlisterror:first')", $('.giftlisterror:first'));
				// Esse set setTimeout esta aqui posi quando o erro é no cadastro de endereço a função que adiciona a classe leva mais tempo do que a que faz a animação
				setTimeout(function() {
					$('html, body').stop(true).animate({scrollTop: $('.giftlisterror:first').offset().top - 100}, 1000);
				}, 50);
			}
		}
	};
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			if (body.is(".giftlist")) List.windowOnload();
		};

		ajaxStop = function() {
			if (body.is(".giftlist")) List.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			if (body.is(".giftlist")) List.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoadedGiftList');
		});

		List.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }