/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E","\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/g,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

var Common = {
	init: function(b) {
		Common.externalLinks(b);
		Common.mainBannerSlider(b);
		Common.jcarouselBrands(b);
		Common.jcarouselProducts(b);
		Common.tabsWithShelf(b);
		Common.tabs(b);
		Common.pagination(b);
		Common.accordionSearchMenu(b);
		Common.faq();
		Common.browser();
		Common.hideBrand(b);
		Common.hideCategories(b);
		Common.breadCrumbFix(b);
		Common.autoRefine(b);
		Common.unnamedFunction();
		Common.bannersCount();
		Common.collection2Banner.main();
		Common.collection2Banner.coresPrateleiraCallback();
	},
	ajaxStop: function(b) {
		Common.myOrderDetailsChangePlace();
		Common.pagination(b);
		Common.autoRefine(b);
		Common.collection2Banner.main();
	},
	windowOnload: function(b) {
		Common.fbLikeBox(b);
	},
	collection2Banner: {
		main: function() {
			$(".flagsWrapper:not('.qd-on')").addClass("qd-on").each(function() {
				bind.call(this, true)
			});
			$(".qdHightLight:not('.qd-on')").addClass("qd-on").each(function() {
				bind.call(this, false)
			});

			function bind(productPg) {
				var flagsWrapper = $(this);
				var flags = flagsWrapper.find(".flag");

				if (!flags.length)
					return;

				var wrapper = $('<div class="' + (productPg ? 'collection2Banner' : 'collection2Flag') + '"></div>'); // Essas classes também estão em uso no arquivo "QD_coresPrateleira.js". Mexa com cuidado
				flagsWrapper.after(wrapper);

				// Deixando como oculto quando não é a tela de produto
				if (!productPg)
					wrapper.hide();

				flags.each(function() {
					var txt = $(this).text().trim();

					if (txt.slice(txt.length - 1) !== ".") // usado slice por conta de bug no IE8 =/
						return;

					// Adicionando o banner ou a flag de desconto
					var imgNamePrefix = txt.toLowerCase().replaceSpecialChars().replace(/\s/g, "_");
					var img = $('<img src="/arquivos/' + imgNamePrefix + (productPg ? '_banner' : '_flag') + '.jpg" alt="' + txt + '" style="height:1px;width:1px;" />');
					img.load(function(e) {
						$(this).removeAttr("style")
					});
					img.error(function(e) {
						$(this).hide()
					});
					img.appendTo(wrapper);

					// Adicionando a flag ao SKU na tela de Produto
					if (productPg)
						Common.collection2Banner.skuFlag(txt, function(skuList) {
							$(".skuList").each(function() {
								var $t = $(this);
								var skuId = ($t.find(".buy-button").attr("href") || "").split("ku=").pop().split("&").shift();

								if (!(skuId.length && skuList.indexOf(skuId) > -1))
									return;

								// Thumb no lugar da miniatura do produto
								$('<img src="/arquivos/leve-mais-por-menos_label.png?_=' + imgNamePrefix + '" alt="' + txt + '" style="height:1px;width:1px;" class="qd-flag-highlight-product" />')
									.load(function(e) { $(this).removeAttr("style"); })
									.error(function(e) { $(this).hide(); })
									.appendTo($t.find(".nomeSku"));

								// Thumb oculto na lista de SKU (usado para colocar a miniatura sobre o produto)
								$('<img src="/arquivos/' + imgNamePrefix + '_flag.jpg" alt="' + txt + '" style="height:1px;width:1px;" class="qd-flag-highlight-product" />')
									.load(function(e) { $(this).removeAttr("style").hide(); })
									.error(function(e) { $(this).hide(); })
									.insertAfter($t);
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
						$t.parents(".qdShelfWrapper").find(".collection2Flag").show();
					else
						$t.parents(".qdShelfWrapper").find(".collection2Flag").hide();
				}).each(function() {
					var $t = $(this);
					if ($t.attr("data-qd-lowest-price") && $t.find("img.qd-cores-flag").length)
						$t.parents(".qdShelfWrapper").find(".collection2Flag").show();
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

				flagsWrapper.find(".flag").each(function() {
					var txt = $(this).text().trim();

					if (txt.slice(txt.length - 1) !== ".") // usado slice por conta de bug no IE8 =/
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

							lowestPrice = lowestPrice || $t;
							if ($t.attr("data-qd-sku-price") < lowestPrice.attr("data-qd-sku-price"))
								lowestPrice = $t;

							var imgNamePrefix = txt.toLowerCase().replaceSpecialChars().replace(/\s/g, "_");
							var img = $('<img src="/arquivos/' + imgNamePrefix + '_flag' + '.jpg" alt="' + txt + '" style="height:1px;width:1px;" class="qd-cores-flag" />');
							img.load(function(e) {
								$(this).removeAttr("style")
							});
							img.error(function(e) {
								$(this).hide();
							});
							img.prependTo($t.find("a"));
						});

						if (lowestPrice && !lowestPrice.siblings(".vtex_cpActiveSku").length) {
							lowestPrice.trigger("mouseover");
							lowestPrice.trigger("mouseenter");
							lowestPrice.attr("data-qd-lowest-price", 1);
						}
					});
				});
			});
		},
		skuFlag: function(collectionName, callback) {
			// Buscando o arquivo com a lista de SKUs
			var calendar = new Date();
			$.qdAjax({
				url: "/arquivos/" + collectionName.toLowerCase().replaceSpecialChars().replace(/\s/g, "_").slice(0, -1) + ".txt",
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
		}
	},
	bannersCount: function() {
		$(".box-banner").parent().each(function() {
			var $t = $(this);
			$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
		});

		$(".disclaimerContent").each(function() {
			if (!$(this).find(".box-banner").length) {
				$(this).hide();
			}
		});
	},
	breadCrumbFix: function(b) {
		$('.filtersWrapper a:contains("Sim")').hide();
		$('.bread-crumb').show();
	},
	hideCategories: function(b) {
		if (b.hasClass("departamento") || b.hasClass("resultado-busca") || b.hasClass("categoria")) {
			$(".menu-departamento h4, .menu-departamento ul li").each(function() {
				if ($(this).children("a").size() <= 0) $(this).hide();
				if ($(this).children("a").text().indexOf("N/A") != -1) $(this).hide();
			});
		}
	},
	hideBrand: function(b) {
		$(".search-single-navigator ul.Marca:first").hide().prev().hide();
	},
	autoRefine: function(b) {
		"use strict";
		var url = "";
		$(".search-single-navigator ul li a:not('.on')").addClass("on").click(function(e) {
			e.preventDefault();

			$.ajax({
				url: $(this).attr("href"),
				dataType: "html",
				success: function(data) {
					var $data = $(data);
					$('.paddingFix:first').html($data.find(".paddingFix"));

					// Procurando o script de paginação
					var script = $data.find("script:not('[src]')").add($data.filter("script:not('[src]')"));
					script.each(function() {
						var cont = this.innerHTML;

						// Verificando se é o script que queremos
						if (cont.indexOf("PageClick_") < 0) return;

						var regex = /PageClick_[0-9]+\s*\=\s*function/;
						var contArray = cont.split(regex);
						var fnName = cont.match(regex);

						// Verificando se o nome da função foi encontrado
						if (!(typeof fnName === "object" && fnName !== null)) return;

						// Colocando as variáveis em nível global
						var finalCont = fnName.shift() + contArray[1] + contArray[0];
						finalCont = finalCont.replace("var pagecount_", "window.pagecount_").replace(/pagecount_/g, "window.pagecount_");
						finalCont = finalCont.replace(/PageClick_/g, "window.PageClick_");

						// Executando o bloco de script
						eval(finalCont);
					});

					// Desmarcar o campo do formulário
					$(".filtro-ativo").each(function() {
						$(this).click(function() {
							location.href = $(this).next("a.ver-filtros").attr("href");
						});
					});
				},
				error: function() {
					if (console) console.log("Houve um erro ao buscar a página");
				}
			});
		});

		$(".filtersWrapper ul li a").click(function(e) {
			e.preventDefault();
			$(this).parent().prev().find("a").trigger("click");
		});

		Common.hideBrand(b);
	},
	myOrderDetailsChangePlace: function() {
		if ($("body").hasClass("MeusPedidosDetalhe")) {
			kojsDone(
				function() {
					if ($(".MeusPedidosDetalhe .dados-entrega").length > 0) {
						$(".MeusPedidosDetalhe .dados-entrega").appendTo(".descricao-entrega");
						$(".MeusPedidosDetalhe .descricao-entrega").insertBefore(".box-dados-pedido");

						var numb = $(".MeusPedidosDetalhe .informacoes-entrega .pedido-numero span");
						numb.text(numb.text().replace("Venda n. ", ""));

						// Coisas p/ fazer quando a condição for atendida
						return {
							stopInterval: true
						};
					} else
					// Repetir a ação enquanto a condição não for atendida
						return {
						stopInterval: false
					};
				}
			);
		}
	},
	faq: function() {
		$(".faqCategoria").live("click", function() {
			$(".faqCategoria").removeClass("open");
			$(".faq dl:visible").slideUp();
			if ($(this).parent().children("dl").css("display") == "none") {
				$(this).addClass("open");
				$(this).parent().children("dl").slideDown();
			} else {
				$(this).removeClass("open");
			}
		});

		$(".faqPergunta").live("click", function() {
			$(".faqResposta:visible").prev().children("a").removeClass("active open");
			$(".faqResposta:visible").slideUp();
			if ($(this).parent().next().css("display") == "none") {
				$(this).addClass("active open");
				$(this).parent().next().slideDown();
			} else {
				$(this).removeClass("open");
			}
		});
	},
	externalLinks: function(b) {
		b.find('.external').attr('target', '_blank');
	},
	mainBannerSlider: function(b) {
		var mBanner = b.find('.mainBannerContent');

		if (mBanner.find(".box-banner").length > 1)
			mBanner.cycle({
				fx: "fade",
				speed: 1000,
				timeout: 7000,
				pager: '.cyclePager'
			});
	},
	jcarouselBrands: function(b) {
		var cBrands = b.find('.jcarousel-skin-brands');

		if (cBrands.find('li').length > 6)
			cBrands.jcarousel({
				auto: 6,
				scroll: 6,
				wrap: 'circular'
			});
	},
	jcarouselProducts: function(b) {
		var cProducts = b.find('.collectionsWrap .prateleira ul');
		cProducts.find('.medicamentos, .medicamentos-especiais').remove();
		// Na tela de produto remove as li de remédios não autorizados
		if ($("body").is(".produto"))
			cProducts.find(".qdShelfDepartamentName.Medicamentos, .qdShelfDepartamentName.Medicamentos.Especiais, .qdShelfCategoryName.Lubrificante").getParent("li").remove();

		// Removendo as <li> vazias
		cProducts.find(".helperComplement").remove();

		if (cProducts.find('li').length < 5)
			return;

		if (typeof $.fn.jcarousel === "function")
			cProducts.jcarousel({
				scroll: 4,
				wrap: 'circular'
			});
		else
			$.getScript("/arquivos/jcycle-jcarousel.pack.js", function() {
				cProducts.jcarousel({
					scroll: 4,
					wrap: 'circular'
				});
			});
	},
	tabsWithShelf: function(body) {
		var wrap = body.find(".tabsCollectionsWrapper");
		if (wrap.length < 1) return false;

		wrap.each(function() {
			var $this = $(this);
			var tabsNav = $(".tabsNav");
			var i = 0;
			$this.find(".collectionsWrap >div").each(function() {
				var _this = $(this).addClass("tabContent");
				var li = $("<li></li>").html((_this.find(">h2").html() || ""));
				tabsNav.append(li);

				if (i == 0) {
					li.addClass("activeTab");
					_this.addClass("activeContent");
				}

				i++;
			});
		});
	},
	tabs: function(body) {
		var wrap = body.find(".tabsWrap");
		if (wrap.length < 1) return false;

		wrap.each(function() {
			var _this = $(this);
			var ul = _this.find('.tabsNav');
			ul.find("li").bind('click', function() {
				var $this = $(this);
				if (!$this.hasClass(".activeTab")) {
					ul.find('li').removeClass("activeTab");
					$this.addClass("activeTab");
					_this.find(".tabContent").hide().removeClass("activeContent").eq($this.index()).fadeTo(300, 1).addClass("activeContent");
				} else
					return false;
			});
		});
	},
	fbLikeBox: function(body) {
		body.find(".facebookBoxWrapper").html('<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fdrogariaaraujooficial&amp;width=241&amp;height=195&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=false&amp;header=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:241px; height:200px;" allowTransparency="true"></iframe>');
	},
	pagination: function(body) {
		if (body.find(".classJsPaginationActive").length < 1)
			body.find(".pages .previous, .pages .next").addClass("classJsPaginationActive").html("&nbsp;");
	},
	accordionSearchMenu: function(b) {

		b.find('.search-multiple-navigator fieldset').each(function() {
			$(this).find("h5").addClass("expanded").bind("click", function() {
				var $this = $(this);
				var _div = $this.parent().find(">div");
				if (_div.is(":visible")) {
					$this.removeClass("expanded").addClass("collapsed");
					_div.slideUp();
				} else {
					_div.slideDown();
					$this.removeClass("collapsed").addClass("expanded");
				}
				return false;
			});
		});
	},
	browser: function() // adiciona "class" ie, fx, chrome ou other no body
		{
			var browser = jQuery.browser.msie ? 'ie' : /(chrome)/.test(navigator.userAgent.toLowerCase()) ? 'chrome' : jQuery.browser.mozilla ? 'fx' : 'other';
			var version = jQuery.browser.version.split('.').shift();
			jQuery("body").addClass(browser + " " + browser + version);
		},
	unnamedFunction: function() {
		// Alguém criou essa função e deixou jogada, eu apenas organizei em um objeto
		if ($(".trabalhe-conosco").length) {
			$(".painel-vagas li a").live('click', function(event) {
				event.preventDefault();

				if (!$(this).parent().hasClass("actived")) {
					$(".painel-vagas li").removeClass("actived");
					$(this).parent().addClass("actived");
				} else
					$(this).parent().removeClass("actived");

			}).last().css("border", "0 none");
		}

		if ($(".centralBanner .box-banner a").length) {
			$(".centralBanner .box-banner a").each(function() {
				$(this).html("");
				for (var i = 1; i <= 5; i++) {
					$(this).append('<span><img class="banner_pb" alt="centralBanner" src="/arquivos/centralBanner_botao_0' + i + '_o.png" complete="complete"><img alt="centralBanner" src="/arquivos/centralBanner_botao_0' + i + '.png" complete="complete"></span>');
				};
				$(".banner_pb").hide();
			});

			$(".centralBanner .box-banner a span").hover(function() {
				$(this).find('img:eq(0)').show();
				$(this).find('img:eq(1)').hide();
			}, function() {
				$(this).find('img:eq(0)').hide();
				$(this).find('img:eq(1)').show();
			});
		}
	}
};

var Home = {
	init: function(b) {},
	ajaxStop: function(b) {},
	windowOnload: function(b) {}
};

var Departament = {
	init: function(b) {
		// Init
		Departament.departmentName(b);
		Departament.organizarElementos();
		Departament.hideMarca(b);
		Departament.addShelfBanners();
	},
	ajaxStop: function(b) {},
	windowOnload: function(b) {},
	hideMarca: function(b) {

		if ($('.columnLeft .menu-departamento ul.Marca').length > 1) {
			$('.columnLeft .menu-departamento ul.Marca:first').hide();
			$('.columnLeft .menu-departamento ul.Marca:first').prev().hide();
		}
		var i = 1;
		$('.resultado-busca .columnLeft .menu-departamento h5').each(function() {
			if (i > 2) return false;

			var $h5 = $(this);
			if ($h5.text() == "Marca") {
				$h5.addClass('h5Marca');
				//$h5.find('+ul').addClass('ulCoresSku');
				if (i > 1) {
					$('.columnLeft .menu-departamento h5.h5Marca:first').hide();
					$('.columnLeft .menu-departamento h5.h5Marca:first +ul').hide();
				}
				i++;
			}
		});
	},
	departmentName: function(body) {
		body.find('.departmentName').text(body.find('.menu-departamento h3:eq(0)').text());
		var titulo = body.find('.departmentName').detach();
		body.find('.centralBanner .box-banner').after(titulo);
		titulo.addClass(window.location.pathname.split('/')[1]);
	},
	organizarElementos: function() {
		$('.main .searchResultsTime:first').addClass("top");
		$('.main .sub:first').addClass("top");
		$('.main .searchResultsTime:last').addClass("bottom");
		$('.main .sub:last').addClass("bottom");
	},
	addShelfBanners: function() {
		var wrapper = $("[id*='ResultItems_'] .prateleira");
		var rows = wrapper.children("ul");

		$(".internalBanners .box-banner").each(function(ndx) {
			var i = ndx * 2;
			if(typeof rows[i] === "object")
				$(this).insertAfter(rows[i]);
			else
				$(this).insertAfter(wrapper.children().last());
		});
	}
};

var Search = {
	init: function(b) {
		// Init
		Search.searchInfoFormat(b)
		Search.writeSearchTerm(b)
		Search.searchTerm(b)
		Search.changeViewMode(b)
		Search.emptySearch(b)
		Search.hideFilterWrapper(b)
		Departament.organizarElementos();
		Departament.hideMarca(b);
	},
	ajaxStop: function(b) {

	},
	windowOnload: function(b) {},
	hideFilterWrapper: function(b) {
		if ($('.busca-vazio').length > 0) {
			$('.filtersWrapper').hide()
		}
	},
	searchInfoFormat: function(body) {
		body.find(".searchResultsTime").append('<span class="text"> resultados para &quot<span class="searchTerm"></span>&quot</span>');
	},
	writeSearchTerm: function(body) {
		body.find('.searchResultsTime:last').hide();

		var term = Search.searchTerm(body);
		if (term == "") return false;

		if (term.length > 44)
			term = term.substr(0, 41) + "...";

		body.find(".searchTerm").text(term);
	},
	searchTerm: function(body) {
		var uri, urlArray = document.location.href.replace(/http[s]?:\/\//i, "").split("/");
		if (urlArray.length > 1) {
			urlArray.shift();
			uriArray = urlArray.join("/").split("?");
			if (urlArray[0] == "busca") {
				var tmp = uriArray.pop().split("&");
				for (item in tmp)
					if (typeof(tmp[item]) == "string" && tmp[item].search(/ft=/i) > -1)
						uri = tmp[item].replace(/ft=/i, "");
			} else
				uri = urlArray.shift().split("?").shift();
		}
		if (uri != null && uri != "undefined")
			uri = decodeURIComponent(uri);
		else
			uri = body.find(".filtersWrapper .bread-crumb li.last").text().trim();

		return uri;
	},
	changeViewMode: function(b) {
		if (!$(".busca-vazio").length > 0) $(".emptySearchResult").remove();

		arrumaPrateleiras = null;

		var change_list_style, prateleira;

		change_list_style = jQuery('<div class="change_style"/>');
		prateleira = $(".main > .vitrine .prateleira").parent();


		change_list_style.append('<div class="seletorcssalternativo tabela cssselected">Tabela</div><div class="seletorcssalternativo lista">Lista</div>');

		change_list_style.find(".lista").bind("click", function() {
			prateleira.addClass("grid-list");
			if (arrumaPrateleiras) {}
		});

		change_list_style.find(".tabela").bind("click", function() {
			prateleira.removeClass("grid-list");
			if (arrumaPrateleiras) {}
		});

		b.find(".main > .vitrine").prepend(change_list_style);
	},
	emptySearch: function() {
		if ($('.busca-vazio').length > 0) {
			$('.no-search-result').show();
			$('.searchTitle').hide();
		};
	}
};

var Product = {
	init: function(b) {
		// Init
		Product.uniqueSkuNameFix();
		Product.ratingByDepartament();
		Product.saude01(b);
		Product.mainComponents(b);
		Product.unavailableProduct2(b);
		Product.skuList();
		Product.addFile();
		Product.imageSkuChange();
		Product.tableWrapper();
		Product.imageControl();
		Product.checkDeliveryAvailability();
		Product.fixOtherPaymentsFormsLink();
		Product.zoomFix();
		Product.disableRightClick();
		Product.customProductForm();
	},
	ajaxStop: function(b) {
		Product.imageSkuChange();
		Product.shippingText();
	},
	windowOnload: function(b) {
		Product.imageSkuChange();
		Product.addThis();
	},
	disableRightClick: function() {
		$(".mainTpl .columnLeft").bind("contextmenu", function(e) {
			e.preventDefault();
		});
	},
	zoomFix: function() {
		var overlay = $("<div class='qdZoomInvisibleOverlay' />");
		$("#image").prepend(overlay).on("mouseout", ".zoomPad", function() {
			overlay.hide();
		}).on("mouseover", ".zoomPad", function() {
			overlay.show();
		});
	},
	uniqueSkuNameFix: function() {
		if (!(typeof skuJson !== "undefined" && typeof skuJson.name === "string" && typeof skuJson.skus === "object" && skuJson.skus.length === 1 && skuJson.name !== ""))
			return;

		var elem = $(".fn.productName");
		// Substituindo o nome do produto com sku por apenas o nome do produto
		elem.text(skuJson.name);
	},
	customProductForm: function() {
		if(!$("body").is(".produto-encomenda"))
			return;

		var plugins = 0;
		var wrapper = $(".customProductForm");
		wrapper.addClass("qd-loading");

		var execValidate = function(){
			if(plugins < 2)
				return;

			wrapper.find("form").validate({
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Adicionando a URL de produto
					$form.append('<input type="hidden" name="Produto" value="' + location.href + '" />');

					var submitWrapper = $form.find("[type=submit]").parent();
					submitWrapper.addClass("qd-loading");

					$.ajax({
						url: "//www.quatrodigital.com.br/clientes/araujo/encomenda.php",
						data: $form.serialize(),
						dataType: "jsonp",
						success: function(){
							submitWrapper.removeClass("qd-loading");
							$form.find(".formSuccess").slideDown();
						}
					});

					return false;
				},
				errorPlacement: function(error, element) {}
			});

			wrapper.find("[name=Telefone]").mask("(00) 0000-00009");

			wrapper.removeClass("qd-loading");
		};

		// jQuery Validate
		if(typeof $.fn.validate === "function"){
			plugins = plugins + 1;
			loadMask();
		}
		else
			$.getScript("/arquivos/jquery.validate.min.js", function() {
				plugins = plugins + 1;
				execValidate();
			});
		// jQuery Mask
		if(typeof $.fn.mask === "function"){
			plugins = plugins + 1;
			loadMask();
		}
		else
			$.getScript("/arquivos/jquery.mask.1.6.5.min.js", function() {
				plugins = plugins + 1;
				execValidate();
			});
	},
	addThis: function() {
		if (!(typeof vtxctx !== "undefined" && typeof vtxctx.departmentyId !== "undefined" && vtxctx.departmentyId != 1 && vtxctx.departmentyId != 8 && vtxctx.departmentyId != 10 && vtxctx.departmentyId != 193))
			return;

		var html, userId, elem;
		window.addthis_config = window.addthis_config || {};

		// Configurações
		userId = "ra-52dd865c44ce39e7";
		window.addthis_config.data_track_addressbar = false;
		elem = $(".addThisWrapper");


		if (!elem.length) return;

		html = $('<div class="addthis_toolbox addthis_default_style ">\
			<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>\
			<a class="addthis_button_google_plusone" g:plusone:size="medium"></a>\
			<a class="addthis_button_tweet"></a>\
			<a class="addthis_counter addthis_pill_style"></a>\
			</div>');
		elem.append(html);
		$.getScript("//s7.addthis.com/js/300/addthis_widget.js#async=1&pubid=" + userId);
	},
	fixOtherPaymentsFormsLink: function() {
		var link = $(".see-other-payment-method-link");
		var skuId;

		// Verificando se já existe o link nativo
		if ($(".see-other-payment-method-link").length) return;

		// Função que obtem o Sku de um item da lista de SKUs
		var getSku = function(wrapper) {
			var bt = wrapper.find(".buy-button");
			var sku;
			if (bt.length)
				sku = (bt.attr("href") || "").split("ku=").pop().split("&").shift().split("#").shift();
			else
				sku = wrapper.find("#notifymeSkuId").val();

			return sku;
		};

		// Aplicando a função de clique que atualiza o SKU na URL das formas de pagamento
		$(".skuList").bind("click", function() {
			insertLink(getSku($(this)));
		});

		// Função que insere o link no lugar onde seria o controle
		var insertLink = function(idSku) {
			var crtl = $(".installmentInfoControler");
			crtl.find(".see-other-payment-method-link").remove();
			crtl.append('<a class="see-other-payment-method-link" onclick="window.open(\' ' + window.location.protocol + "//" + window.location.host + '/productotherpaymentsystems/' + idSku + '\')" ></a>')
		};

		// Inserindo o link no controle
		insertLink(getSku($(".skuList:first")));
	},
	checkDeliveryAvailabilityBtn: function() {
		var wrapper = $(".qdCheckDeliveryAvailability");
		var cep = wrapper.find(".fitext");
		var fieldset = wrapper.find("fieldset");

		// Validando o CEP
		if (!cep.length)
			return alert("Campo de CEP nao encontrado.");
		if (cep.val().length < 9)
			return alert("Informe um CEP válido");

		// Mensagem de indisponibilidade
		if ($("body").is(".medicamento-refrigerado"))
			var msgTxt = 'Infelizmente n\u00e3o entregamos produtos refrigerados nesta regi\u00e3o.<br />Consulte a possibilidade atrav\u00e9s do telefone 0300-313-1010.';
		else
			var msgTxt = 'Infelizmente n\u00e3o entregamos produtos refrigerados nesta regi\u00e3o.';
		var msgHtml = $('<div class="qdDeliveryNotAllowed"> <div class="qdMsgWrapper"> <span class="qdIco"></span> <span class="qdMsg">' + msgTxt + '</span> </div> <div class="qdBtsWrapper"> <button>Inserir novo CEP</button> <button>Continuar comprando</button> </div> </div>').hide();
		fieldset.after(msgHtml);

		// Ação dos botoes
		msgHtml.find("button:first").bind("click", function() {
			msgHtml.slideUp(function() {
				fieldset.slideDown();
			});
		});
		msgHtml.find("button:last").bind("click", function() {
			$(".boxPopUp2-close").click();
		});

		$.ajax({
			url: "/frete/calcula/" + wrapper.find("#txtCep").attr("data-sku") + "?shippinCep=" + cep.val().replace("-", "") + "&quantity=1",
			dataType: "html",
			success: function(data) {
				var $d = $(data);
				if ($d.filter(".cep-invalido").length || $d.find(".cep-invalido").length) {
					fieldset.slideUp(function() {
						msgHtml.slideDown();
					});
				} else {
					$(".boxPopUp2-close").click();
					window.QD_publicSmartCart.buyButton.clickBuySmartCheckout.call(window.checkDeliveryAvailabilityBuyButton);
				}
			},
			error: function() {
				alert("Houve um erro ao tentar buscar os dados para o CEP informado");
			}
		});
	},
	checkDeliveryAvailability: function() {
		// Verificando se estamos no produto refrigerado
		if (!$("body").is(".medicamento-refrigerado, .alimento-refrigerado")) return;

		// criando o conteúdo do popup
		var html = '<div class="qdCheckDeliveryAvailability"> <div class="content"><h2>Verificar disponibilidade de entrega</h2> <fieldset> <label class="prefixo"> Digite seu CEP <input type="text" value="" maxlength="9" name="txtCep" id="txtCep" class="fitext" size="9"> </label> <span class="frete-calcular btBordas btBordasInput"> <input type="button" name="btnFreteSimulacao" value="Verificar" onclick="Product.checkDeliveryAvailabilityBtn(this)" id="btnFreteSimulacao" title="OK" class="bt freight-btn"> </span> <span class="cep-busca"><a href="//www.buscacep.correios.com.br/servicos/dnec/menuAction.do?Metodo=menuLogradouro" target="_blank" class="bt lnkExterno" title="Não sei meu CEP">Não sei meu CEP</a></span> </fieldset> </div></div>';

		// Anulando o click do dropDownCart e atribuindo um clique da verificação de entrega
		window.QD_smartCartAllowBuy = false;
		$(".skuListWrapper .buy-button").bind("click.checkDeliveryAvailability", function() {
			var sku = ($(this).attr("href") || "").split("ku=").pop().split("&").shift().split("#").shift();
			// Chamando o popup
			if (sku != "") {
				var $html = $(html);
				$html.vtexPopUp2({
					popupType: "freeContent",
					popupClass: "shippingCalculationPopup shippingCalculationMain qdCheckDeliveryAvailabilityPopup"
				});
				$html.find("#txtCep").attr("data-sku", sku).mask("99999-999");
				window.checkDeliveryAvailabilityBuyButton = $(this);
				return false;
			}
		});

		// Mensagem informativa sobre as regras de aquisição do produto
		if ($("body").is(".medicamento-refrigerado"))
			$(".flagsWrapper").before('<div class="qdBuyInfoWrapper"><p>MANTER SOB REFRIGERAÇÃO CONFORME RECOMENDAÇÃO DO FABRICANTE.<br />NÃO EFETUAMOS TROCA.</p></div>');
		else
			$(".flagsWrapper").before('<div class="qdBuyInfoWrapper"><p>PRODUTO REFRIGERADO. N\u00c3O EFETUAMOS TROCA.</p></div>');
	},
	ratingByDepartament: function() {
		if ((typeof vtxctx !== "undefined" && typeof vtxctx.departmentyId !== "undefined" && vtxctx.departmentyId != 1 && vtxctx.departmentyId != 8 && vtxctx.departmentyId != 10 && vtxctx.departmentyId != 193))
			return;

		$(".ratingStarsWrapper, .ratingWrapper").remove();
		$(".referFriendTpl").remove();
	},
	imageControl: function() {
		var orig = window.imageControl_OnSkuDataReceived;
		window.imageControl_OnSkuDataReceived = function(a) {
			if (typeof a !== "undefined" && typeof a.skuData !== "undefined" && typeof a.skuData.id !== "undefined")
				$("ul.thumbs").attr("data-sku", a.skuData.id);
			orig.call(this, a);
		}
	},
	addFile: function() {
		var fileURL = ($(".productFileWrap a").attr("href") || "").trim();
		if (fileURL == '') return false;

		var _li = $('<li>').addClass('productFileLink');
		var _img = $('<img>').attr('src', '/arquivos/bula_normal.jpg').attr('border', 0);
		$(_li).append(_img);
		_img.wrap('<a href="' + fileURL.replace("~/", "/") + '" target="_blank" />');

		var productThumbs = $('<ul class="thumbs2"></ul>');
		productThumbs.append(_li);
		$("ul.thumbs").after(productThumbs);
	},
	skuList: function() {
		var _skuList = $(".skuListWrapper .skuList");
		if (_skuList.length < 1) return false;

		_skuList.each(function() {
			var $t = $(this);
			if ($t.find(".preco").length > 0) {
				$t.find(".preco .valor-por").html($t.find(".preco .valor-por").html().replace("Por: ", ""));

				var oldValue = $t.find(".preco .valor-de");
				if (oldValue.length) oldValue.html(oldValue.html().replace("De: ", ""));
			}
		});
	},
	mainComponents: function(b) {
		var text = $('.value-field.Principio-Ativo:first').text();

		$('.mainComponents').text(text);
	},
	saude01: function(b) {
		var text = $('.value-field.Informe-Ministerio-Saude-01:first').text();

		$('.saude01').text(text).show();

		if (text == '-') {
			$('.saude01').hide();
		};
	},
	unavailableProduct2: function(b) {
		var wrap;

		b.find("h3.notifymetitle").bind("click", function() {
			if (!$(this).hasClass("activedClick")) {
				var btnTop = $(this).position().top;
				$(this).css({
					'top': btnTop - 14,
					"margin-top": '0'
				});
				$(this).addClass("activedClick");
			}
			wrap = $(this).parent().parent().find("fieldset.sku-notifyme-form");
			// wrap.toggle();
			if (wrap.is(":visible"))
				wrap.hide();
			else
				wrap.attr("style", "display:block !important;");
		});
	},
	imageSkuChangeClicked: false,
	imageSkuChange: function() {
		if ($("ul.thumbs").attr("data-sku")) return;

		var fn = function(sku) {
			$(".skuList").removeClass('_on');
			$(this).addClass('_on');
			if (typeof FireSkuChangeImage === "function")
				FireSkuChangeImage(sku);
		};

		$(".skuList").each(function() {
			$(this).not(".qd_active").addClass("qd_active").bind("click", function() {
				var t = $(this);

				if (t.is("._on"))
					return;

				Product.imageSkuChangeClicked = true;
				buyBtn = t.find(".buy-button");
				fn.call(t, (buyBtn.length ? buyBtn.attr("href").split("ku=").pop() : t.find(".sku-notifyme-skuid, #notifymeSkuId").first().val()).split("&").shift());
			});
		});

		if ($.bbq.getState("sku") && !isNaN($.bbq.getState("sku")) && !Product.imageSkuChangeClicked) {
			fn.call($("a.buy-button[href*='" + $.bbq.getState("sku") + "'], input.sku-notifyme-skuid[value*='" + $.bbq.getState("sku") + "'], input#notifymeSkuId[value*='" + $.bbq.getState("sku") + "']").first().getParent(".skuList")[0], $.bbq.getState("sku"));
		}
	},
	shippingText: function() {
		// Substitui a função nativa de retorno ajax da VTEX
		window.ajaxShippin = function(method, url, postData, target, callback) {
			$.ajax({
				type: method,
				url: url,
				data: postData,
				success: function(dataResult) {
					dataResult = dataResult.replace(" deste produto", "");

					// Frete Motociclista
					var $dataResult = $(dataResult);

					// Verificando se esta no horário de atendimento
					var mOriginalText = $dataResult.find('.Motociclista').text();
					var mCustomText = $('.clientTextWrapper').text();
					$dataResult.find('.Motociclista').html('Carregando... <img src="/arquivos/ajax-loader.gif" />');
					var months = {
						"fev": "feb",
						"abr": "apr",
						"mai": "may",
						"ago": "aug",
						"set": "sep",
						"out": "oct",
						"dez": "dec"
					};
					$.qdAjax({
						url: "/no-cache/HoraAtualServidor.aspx",
						success: function(data) {
							var date = new Date(Date.parse(data.trim().replace(/[a-z]{3}/i, function(rpl) {
								return months[rpl.toLowerCase()] || rpl;
							}).replace(/\s?\+[0-9]+\:[0-9]+/i, "")));
							if ((date && date.getHours) && ((date.getHours() + date.getMinutes() / 100) >= 7 && (date.getHours() + date.getMinutes() / 100) <= 22.40))
								$dataResult.find('.Motociclista').html(mCustomText);
							else
								$dataResult.find('.Motociclista').html(mOriginalText);
						},
						clearQueueDelay: null
					});

					$(target).html($dataResult);
					$(target).show();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$(target).html(textStatus);
					$(target).show();
				}
			});
		};
	},
	tableWrapper: function(b) {
		var i = 0;
		$('#caracteristicas h4').each(function() {
			var wrapper, t;
			wrapper = $('<div class="wrapper ndx_' + (i++) + '" />');
			t = $(this);

			t.before(wrapper);
			t.next('table').appendTo(wrapper);
			t.prependTo(wrapper);
		})
	}
};

var List = {
	init: function(b) {},
	ajaxStop: function(b) {},
	windowOnload: function(b) {}
};

var Orders = {
	init: function() {},
	ajaxStop: function() {
		Orders.shippingMotorcyclist();
		Orders.trackingHistory();
	},
	windowOnload: function() {},
	shippingMotorcyclist: function() {
		$(".shipping-date").each(function() {
			var $t = $(this);
			if ($t.find(".sla-info").text().indexOf("otociclista") > -1)
				$t.find(".shipping-estimate").text("3 horas");
		});
	},
	trackingHistory: function() {
		$(".trackingInfo").each(function() {
			var wrapper = $(this);
			var tracking = wrapper.find("span[data-bind*='trackingNumber']").text().trim();
			if ((/^[a-z]{2}[0-9]{9}$/i).test(tracking))
				wrapper.append('<iframe src="//websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=002&P_COD_LIS=' + tracking + 'BR" frameborder="0" class="qd-shipping-tracking"></iframe>');
		});
	}
};

$(function() {
	var _body_ = $("body");
	Common.init(_body_);
	if (_body_.filter(".departamento, .categoria").length > 0) Departament.init(_body_);
	else if (_body_.filter(".resultado-busca").length > 0) Search.init(_body_);
	else if (_body_.filter(".home").length > 0) Home.init(_body_);
	else if (_body_.filter(".produto").length > 0) Product.init(_body_);
	else if (_body_.filter(".listas").length > 0) List.init(_body_);
	else if (_body_.filter(".account-orders").length > 0) Orders.init(_body_);

	_body_.addClass('jsFullLoaded');

});
$(document).ajaxStop(function() {
	var _body_ = $("body");
	Common.ajaxStop(_body_);
	if (_body_.filter(".departamento, .categoria").length > 0) Departament.ajaxStop(_body_);
	else if (_body_.filter(".resultado-busca").length > 0) Search.ajaxStop(_body_);
	else if (_body_.filter(".home").length > 0) Home.ajaxStop(_body_);
	else if (_body_.filter(".produto").length > 0) Product.ajaxStop(_body_);
	else if (_body_.filter(".listas").length > 0) List.ajaxStop(_body_);
	else if (_body_.filter(".account-orders").length > 0) Orders.ajaxStop(_body_);
});
$(window).load(function() {
	var _body_ = $("body");
	Common.windowOnload(_body_);
	if (_body_.filter(".departamento, .categoria").length > 0) Departament.windowOnload(_body_);
	else if (_body_.filter(".resultado-busca").length > 0) Search.windowOnload(_body_);
	else if (_body_.filter(".home").length > 0) Home.windowOnload(_body_);
	else if (_body_.filter(".produto").length > 0) Product.windowOnload(_body_);
	else if (_body_.filter(".listas").length > 0) List.windowOnload(_body_);
	else if (_body_.filter(".account-orders").length > 0) Orders.windowOnload(_body_);
});

/* Quatro Digital - jQuery Ajax Queue // 2.1 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(c){if("function"!==typeof c.qdAjax){var a={};c.qdAjaxQueue=a;c.qdAjax=function(e){var d,b;d=c.extend({},{success:function(){},error:function(){},complete:function(){},clearQueueDelay:0},e);b=escape(encodeURIComponent(d.url));a[b]=a[b]||{};a[b].opts=a[b].opts||[];a[b].opts.push({success:function(a,b,f){d.success.call(this,a,b,f)},error:function(a,b,f){d.error.call(this,a,b,f)},complete:function(a,b){d.complete.call(this,a,b)}});a[b].parameters=a[b].parameters||{success:{},error:{},complete:{}};
a[b].callbackFns=a[b].callbackFns||{};a[b].callbackFns.successPopulated="boolean"===typeof a[b].callbackFns.successPopulated?a[b].callbackFns.successPopulated:!1;a[b].callbackFns.errorPopulated="boolean"===typeof a[b].callbackFns.errorPopulated?a[b].callbackFns.errorPopulated:!1;a[b].callbackFns.completePopulated="boolean"===typeof a[b].callbackFns.completePopulated?a[b].callbackFns.completePopulated:!1;e=c.extend({},d,{success:function(d,g,f){a[b].parameters.success={data:d,textStatus:g,jqXHR:f};
a[b].callbackFns.successPopulated=!0;for(var c in a[b].opts)"object"===typeof a[b].opts[c]&&(a[b].opts[c].success.call(this,d,g,f),a[b].opts[c].success=function(){})},error:function(c,d,f){a[b].parameters.error={errorThrown:f,textStatus:d,jqXHR:c};a[b].callbackFns.errorPopulated=!0;for(var e in a[b].opts)"object"===typeof a[b].opts[e]&&(a[b].opts[e].error.call(this,c,d,f),a[b].opts[e].error=function(){})},complete:function(c,e){a[b].parameters.complete={textStatus:e,jqXHR:c};a[b].callbackFns.completePopulated=
!0;for(var f in a[b].opts)"object"===typeof a[b].opts[f]&&(a[b].opts[f].complete.call(this,c,e),a[b].opts[f].complete=function(){});isNaN(parseInt(d.clearQueueDelay))||setTimeout(function(){a[b].jqXHR=void 0;a[b].opts=void 0;a[b].parameters=void 0;a[b].callbackFns=void 0},d.clearQueueDelay)}});"undefined"===typeof a[b].jqXHR?a[b].jqXHR=c.ajax(e):a[b].jqXHR&&a[b].jqXHR.readyState&&4==a[b].jqXHR.readyState&&(a[b].callbackFns.successPopulated&&e.success(a[b].parameters.success.data,a[b].parameters.success.textStatus,
a[b].parameters.success.jqXHR),a[b].callbackFns.errorPopulated&&e.error(a[b].parameters.error.jqXHR,a[b].parameters.error.textStatus,a[b].parameters.error.errorThrown),a[b].callbackFns.completePopulated&&e.complete(a[b].parameters.complete.jqXHR,a[b].parameters.complete.textStatus))};c.qdAjax.version="2.1"}})(jQuery);
/* Vídeo na foto do produto // 1.3 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var qdVideoInProduct={insertThumbsIn:"end"};
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(m){$(6(){K($("2H").1u(".2G")){w g,b=[],f,n,c,k,q,d,r,a,p;I.1f=I.1f||{};n=$.2F(!0,{1A:"1l",1o:"2D.2E-2M.2K"},I.1f);g=$("2B.2y");d=$("M#U");f=$(n.1o).36().Y(/\\;\\s*/,";").G(";");15(w h=0;h<f.1p;h++)-1<f[h].1k("F")?b.1n(f[h].G("v=").1q().G(/[&#]/).1y()):-1<f[h].1k("33.1B")&&b.1n(f[h].G("1B/").1q().G(/[\\?&#]/).1y());c=$(\'<M L="A-2o"></M>\');c.1w("#37");c.2V(\'<M L="A-2W"></M>\');a="30".G("");f=m["d"+a[2]+"c"+a[3]+"m"+a[1]+"n"+a[10]];r=m[a[0]+"l"+a[1]+"r"+a[10]];p=f["l"+a[2]+"c"+a[0]+"1v"+a[2]+"n"];q=6(a,l){"F"===l&&c.2Z(\'<1c 1G="22://2h.F.V/1Q/\'+a+\'?23=1W&1g=0" 2i="0" 2e></1c>\');d.1e("C",d.1e("C")||d.C());d.S(!0,!0).O(Q,0);c.S(!0,!0).O(Q,1,6(){d.29(c).1s({C:c.N("1c").C()},1r)})};1C=6(){g.N("a:2d(\'.A-1h\')").1F("1j.3a",6(){c.S(!0,!0).O(Q,0,6(){$(B).1Z().1Y("1b")});d.S(!0,!0).O(Q,1,6(){w a=d.1e("C");a&&d.1s({C:a},1r)})})};(6(){(p[a[11]+"a"+a[12]+"h"]+p["1P"+a[0]+"2f"+a[11]])[a[12]+"e"+a[0]+"r"+a[4]+"h"](1m("/[p-s-]{1,3}"+a[3]+"[-"+a[0]+"-x]{1,8}r-o[-m-"+a[12]+"]{2}d/i"))+1&&r(a[4]+"\\X\\1N\\19\\1O\\1a \\1T\\1a\\X: "+a[14]+"\\1V\\19\\1I\\X\\1a \\1O\\2c\\1N\\1I\\19\\2b")})();k=6(){K(!g.N(".A-1x").1p){w a;1C.R(B);15(D 1z b)K("27"===28 b[D]&&""!==b[D]){a=6(a){w d={P:"%5%J%5%7%5%j",H:"%5%7%5%j","2l%5%":"J%5%7%5%j","W-2m":"2k%5%2j%5%7%5%j","W-H%":"5%25%5%7%5%j","W-H%2g":"2%2n%5%7%5%j","H%5%21":"1U%5%7%5%j","H%5%1S":"1R%5%7%5%j","H%5%24":"r%5%7%5%j","P%5%J%5%20":"1X%5%7%5%j","P%5%J%5%2a":"31%5%7%5%j","P%5%J%5%2X":"2Y%5%7%5%j"};E 6(a){w b,e,f,c;b=6(a){E a};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];f=a["d"+e[16]+"c"+e[17]+"m"+b(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"1v"+b("o")+"n"];a=6(a){E 2R(2Q(a.Y(/\\./g,"\\2S").Y(/[a-2T-Z]/g,6(a){E 2U.32(("Z">=a?39:3c)>=(a=a.3b(0)+13)?a:a-26)})))};15(w l 1z d){K(a(f[[e[9],b("o"),e[12],e[b(13)]].38("")])===l+d[l]){c="34"+e[17]+"e";1i}c="f"+e[0]+"35"+b(e[1])+""}E c}(a)}(m);K(!1m(a))1i;a=$("<1E L=\'A-1x\'><1M L=\'A-2P\' 1b=\'1K-U:1L(\\"//T.F.V/1D/"+b[D]+"/1H.1J\\")\'></1M><a L=\'A-1h\' 2O=\'2x:2w(0);\' 1g=\'"+b[D]+"\' 1b=\'1K-U:1L(\\"//T.F.V/1D/"+b[D]+"/1H.1J\\")\'><T 1G=\'/2z/A-2A.2v\' 2u=\'2q 2p\'/></a></1E>");a.N("a").1F("1j.2r",6(){w a;a=$(B);g.N(".1d").2s("1d");a.2t("1d");q.R(B,a.2C("1g"),"F");E!1});"1l"===n.1A?a.1w(g):a.2L(g)}}};$(2N).2J(k);$(I).2I(k);(6(){w a,b=B;a=I.1t||6(){};I.1t=6(c,d){$(c||"").1u(".A-1h")||(a.R(B,c,d),k.R(b))}})()}})})(B);',62,199,'|||||25C2|function|25A8pbz||||||||||||25A8oe|||||||||||||var||||qd|this|height|vId|return|youtube|split|nenhwb|window|25A8nenhwb|if|class|div|find|fadeTo|jjj|500|call|stop|img|image|com|qrirybc|u044f|replace|||||||for||||u03b1|u03c3|style|iframe|ON|data|qdVideoInProduct|rel|videoLink|break|click|indexOf|start|eval|push|videoFieldSelector|length|pop|700|animate|ImageControl|is|ti|prependTo|videoItem|shift|in|insertThumbsIn|be|removePlayer|vi|li|bind|src|default|u0442|jpg|background|url|span|u03b9|u2202|se|embed|reprorgn|25A8igrkpbzz|u03c1|bzzreprfgnoyr|u03c5|transparent|grkpbzzreprorgn|removeAttr|hide|25A8i|25A8igrkp|http|wmode|25A8igrkpbzzrep|25A8igrkpbzzreprorgn||string|typeof|add|25A8igrk|u2113|u03b9g|not|allowfullscreen|rc|25C|www|frameborder|25A8igrkpbzzreprfgnoyr|wb|jj2|nenh|25A8igrkpbzzrepr|playerWrapper|Video|Play|playVideo|removeClass|addClass|alt|png|void|javascript|thumbs|arquivos|playIco|ul|attr|td|value|extend|produto|body|load|ajaxStop|Videos|appendTo|field|document|href|videoThumbBg|encodeURIComponent|escape|u00a8|zA|String|wrap|playerContainer|25A8igrkpbz|zrepr|html|aeoucdlmnrthsvqespskug|pbzzreprfgnoyr|fromCharCode|youtu|tr|ls|text|include|join|90|removeVideo|charCodeAt|122'.split('|'),0,{}));
/* jQuery BBQ: Back Button & Query Library // v1.3pre // http://benalman.com/projects/jquery-bbq-plugin/ // Dual licensed under the MIT and GPL licenses. <http://benalman.com/about/license/> */
typeof $.bbq === "undefined" && (function($,r){var h,n=Array.prototype.slice,t=decodeURIComponent,a=$.param,j,c,m,y,b=$.bbq=$.bbq||{},s,x,k,e=$.event.special,d="hashchange",B="querystring",F="fragment",z="elemUrlAttr",l="href",w="src",p=/^.*\?|#.*$/g,u,H,g,i,C,E={};function G(I){return typeof I==="string"}function D(J){var I=n.call(arguments,1);return function(){return J.apply(this,I.concat(n.call(arguments)))}}function o(I){return I.replace(H,"$2")}function q(I){return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(K,P,I,L,J){var R,O,N,Q,M;if(L!==h){N=I.match(K?H:/^([^#?]*)\??([^#]*)(#?.*)/);M=N[3]||"";if(J===2&&G(L)){O=L.replace(K?u:p,"")}else{Q=m(N[2]);L=G(L)?m[K?F:B](L):L;O=J===2?L:J===1?$.extend({},L,Q):$.extend({},Q,L);O=j(O);if(K){O=O.replace(g,t)}}R=N[1]+(K?C:O||!N[1]?"?":"")+O+M}else{R=P(I!==h?I:location.href)}return R}a[B]=D(f,0,q);a[F]=c=D(f,1,o);a.sorted=j=function(J,K){var I=[],L={};$.each(a(J,K).split("&"),function(P,M){var O=M.replace(/(?:%5B|=).*$/,""),N=L[O];if(!N){N=L[O]=[];I.push(O)}N.push(M)});return $.map(I.sort(),function(M){return L[M]}).join("&")};c.noEscape=function(J){J=J||"";var I=$.map(J.split(""),encodeURIComponent);g=new RegExp(I.join("|"),"g")};c.noEscape(",/");c.ajaxCrawlable=function(I){if(I!==h){if(I){u=/^.*(?:#!|#)/;H=/^([^#]*)(?:#!|#)?(.*)$/;C="#!"}else{u=/^.*#/;H=/^([^#]*)#?(.*)$/;C="#"}i=!!I}return i};c.ajaxCrawlable(0);$.deparam=m=function(L,I){var K={},J={"true":!0,"false":!1,"null":null};$.each(L.replace(/\+/g," ").split("&"),function(O,T){var N=T.split("="),S=t(N[0]),M,R=K,P=0,U=S.split("]["),Q=U.length-1;if(/\[/.test(U[0])&&/\]$/.test(U[Q])){U[Q]=U[Q].replace(/\]$/,"");U=U.shift().split("[").concat(U);Q=U.length-1}else{Q=0}if(N.length===2){M=t(N[1]);if(I){M=M&&!isNaN(M)?+M:M==="undefined"?h:J[M]!==h?J[M]:M}if(Q){for(;P<=Q;P++){S=U[P]===""?R.length:U[P];R=R[S]=P<Q?R[S]||(U[P+1]&&isNaN(U[P+1])?{}:[]):M}}else{if($.isArray(K[S])){K[S].push(M)}else{if(K[S]!==h){K[S]=[K[S],M]}else{K[S]=M}}}}else{if(S){K[S]=I?h:""}}});return K};function A(K,I,J){if(I===h||typeof I==="boolean"){J=I;I=a[K?F:B]()}else{I=G(I)?I.replace(K?u:p,""):I}return m(I,J)}m[B]=D(A,0);m[F]=y=D(A,1);$[z]||($[z]=function(I){return $.extend(E,I)})({a:l,base:l,iframe:w,img:w,input:w,form:"action",link:l,script:w});k=$[z];function v(L,J,K,I){if(!G(K)&&typeof K!=="object"){I=K;K=J;J=h}return this.each(function(){var O=$(this),M=J||k()[(this.nodeName||"").toLowerCase()]||"",N=M&&O.attr(M)||"";O.attr(M,a[L](N,K,I))})}$.fn[B]=D(v,B);$.fn[F]=D(v,F);b.pushState=s=function(L,I){if(G(L)&&/^#/.test(L)&&I===h){I=2}var K=L!==h,J=c(location.href,K?L:{},K?I:2);location.href=J};b.getState=x=function(I,J){return I===h||typeof I==="boolean"?y(I):y(J)[I]};b.removeState=function(I){var J={};if(I!==h){J=x();$.each($.isArray(I)?I:arguments,function(L,K){delete J[K]})}s(J,2)};e[d]=$.extend(e[d],{add:function(I){var K;function J(M){var L=M[F]=c();M.getState=function(N,O){return N===h||typeof N==="boolean"?m(L,N):m(L,O)[N]};K.apply(this,arguments)}if($.isFunction(I)){K=I;return J}else{K=I.handler;I.handler=J}}})})(jQuery,this);
/* jQuery hashchange event // v1.3 // http://benalman.com/projects/jquery-hashchange-plugin/ // Dual licensed under the MIT and GPL licenses. <http://benalman.com/about/license/> */
typeof $.fn.hashchange === "undefined" && (function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
/* $("a").getParent("ul"); // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a:a.length?a.getParent(c):a}})(jQuery);
/* VTEX PACK */
/* Newslleter customizada para a plataforma VTEX // 4.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(h){"function"!==typeof h.fn.QD_news&&(h.fn.QD_news=function(q){var g,a,n,k;k=function(a,b){"object"===typeof console&&("undefined"!==typeof b&&"alerta"===b.toLowerCase()?console.warn("[VtexNews] "+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?console.info("[VtexNews] "+a):console.error("[VtexNews] "+a))};g=jQuery(this);if(1>g.length)return g;a=jQuery.extend({defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".vtexNewsName",emailField:".vtexNewsEmail",btn:".vtexNewsButton",
elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".vtexNewsAnimateFieldSuccess",timeHideSuccessMsg:3E3,successCallback:function(){},submitCallback:function(a,b){}},q);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation=
"leftRight");if("popup"==a.validationMethod&&"function"!==typeof jQuery.fn.vtexPopUp2)return k("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),g;n=function(f){var b,e,c;e=0;b=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){e<a.animateRepeat&&b();e++})})};c=function(){f.fadeTo(a.animateSpeed,0.2,function(){f.fadeTo(a.animateSpeed,1,function(){e<a.animateRepeat&&c();e++})})};f.stop(!0,!0);
"leftRight"==a.animation?b():"blink"==a.animation&&c()};g.each(function(){var f,b,e,c,g,l,m;b=jQuery(this);e=b.find(a.nameField);c=b.find(a.emailField);g=b.find(a.btn);l=b.find(a.elementError);m=b.find(a.elementSuccess);1>e.length&&a.checkNameExist&&k("Campo de nome, n\u00e3o encontrado ("+e.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>c.length)return k("Campo de e-mail, n\u00e3o encontrado ("+c.selector+")"),b;if(1>g.length)return k("Bot\u00e3o de envio, n\u00e3o encontrado ("+
g.selector+")"),b;if("animateField"!=a.validationMethod&&(1>m.length||1>l.length))return k("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+m.selector+", "+l.selector+")"),b;a.setDefaultName&&e.is("input[type=text], textarea")&&e.val(a.defaultName);c.val(a.defaultEmail);(function(){var d,b;a.checkNameExist&&(d=e.filter(":visible"),d.length&&(b=d.val(),e.is("input, textarea")&&d.bind({focus:function(){d.val()!=b||0!==d.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||d.val("")},
blur:function(){""===d.val()&&d.val(b)}})))})();(function(){var b;b=c.val();c.bind({focus:function(){c.val()==b&&0===c.val().search(a.defaultEmail.substr(0,6))&&c.val("")},blur:function(){""===c.val()&&c.val(b)}})})();f=function(){var d,c,e,f;c=(d=b.find(a.nameField).filter("input[type=text],select,textarea").val())?d:(d=b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val())?d:(d=b.find(a.nameField).attr(a.getAttr))?d:(d=b.find(a.nameField).text())?d:(d=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
d:"Nome_Padrao";d=(b.find(a.emailField).val()||"").trim();e=b.find(a.nameField).is(":visible");e=(1>c.length||0===c.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||e?e:!0);f=0>d.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);e||f?"animateField"==a.validationMethod?(e&&n(b.find(a.nameField)),f&&n(b.find(a.emailField))):"popup"==a.validationMethod?l.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(l.slideDown().bind("click",function(){h(this).slideUp()}),
setTimeout(function(){l.slideUp()},1800)):(g.attr("disabled","disabled"),jQuery.ajax({url:"/no-cache/Newsletter.aspx",type:"POST",data:{newsletterClientEmail:d,newsletterClientName:c,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},success:function(d){var c,e,f;g.removeAttr("disabled");"popup"==a.validationMethod?m.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&
m.slideDown().bind("click",function(){h(this).slideUp()});f=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input, textarea")&&b.find(a.nameField).val(a.defaultName);c=function(){f.val(a.defaultEmail)};"animateField"==a.validationMethod?(f.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),f.addClass("vtexNewsSuccess"),e=setTimeout(function(){f.removeClass("vtexNewsSuccess");c();f.unbind("focus.vtexNews")},a.timeHideSuccessMsg),f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");
clearTimeout(e);h(this).val("");h(this).unbind("focus.vtexNews")})):c();a.successCallback()}}),a.submitCallback(d,c))};g.bind("click",function(){f()});var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),f())};e.filter("input, textarea").bind("keydown",p);c.bind("keydown",p)});return g},h(function(){h(".qd_news_auto").QD_news()}))})(jQuery);
/**
* Vtex Gift List
* @author Carlos Vinicius
* @version 1.5
* @date 2012-09-18
*/
jQuery.fn.vtexGiftlist=function(d){var e=jQuery(this);if(1>e.length)return e;var g=jQuery.extend({giftListWrap:".giftListWrap",popupShow:function(){},buyBtnFormat:function(a,c){var f=jQuery('<div class="giftListBtn"></div>'),b=jQuery('<div class="skuTplButtonsWrap"></div>');a.after(b);a.appendTo(b);c.appendTo(f);f.appendTo(b)}},d),d=jQuery("body");jQuery("");var a=d.find(g.giftListWrap),j="object"==typeof console;if(1>a.length)return j&&console.log("Elemento contendo o controle de lista n\u00e3o encontrado ("+
a.selector+")"),!1;var k=a.parent(),i=d.find("div.skuList"),h={actions:function(d){var c=d||e;c.bind("click",function(){var f,b;f=a.find(".giftlistcreate-nouser");a.find(".giftlistinsertsku").show();b=a.find(".giftlistinsertsku-message");if("block"==b.css("display"))return alert(b.text());b.css("display","block").hide();c.hasClass("multipleSkus")&&a.find(".giftlistinsertsku-button").each(function(){var a=jQuery(this),b=(a.attr("href")||"").split(",");b[1]="'"+c.attr("rel")+"'";a.attr("href",b.join(","))});
if(1>f.length)a.vtexPopUp2({initCallback:g.popupShow,closeCallback:function(){a.appendTo(k)}});else return alert("Voc\u00ea precisa estar logado para adicionar um item a lista."),document.location.href="https://"+document.location.host+"/Site/Login.aspx?ReturnUrl="+document.location.pathname,!1})},buyButton:function(){var a=i.find(".buy-button");if(1>a.length||2>i.length)return!1;var c=e.clone().addClass("multipleSkus");a.each(function(){var a=c.clone(),b=jQuery(this);g.buyBtnFormat(b,a);a.attr("rel",
(b.attr("href")||"").split("Sku=").pop());h.actions(a)});e.hide()}};h.actions();h.buyButton();return e};
/**
* Popups
* @author Carlos Vinicius
* @version 1.26
*/
jQuery.fn.vtexPopUp2=function(n){var m,k,e,l;l=jQuery(this);if(1>l.length)return l;m=jQuery("body");e=m.find(".boxPopUp2");k=function(a,b){"object"==typeof console&&console.log("[Vtex Popups - "+(b||"Erro")+"] "+a)};1>e.length&&(e=jQuery('<div class="boxPopUp2"><div class="boxPopUp2-wrap"><span class="boxPopUp2-close"></span><div class="boxPopUp2-content"></div></div></div>'),m.prepend(e),e.after('<div class="boxPopUp2-overlay"></div>'));var c=jQuery.extend({popupType:null,closeContent:null,popupClass:"",
quickViewClass:".quickViewLink",contentUrl:null,initCallback:function(a){},showCallback:function(a){},closeCallback:function(a){}},n);n=e.find(".boxPopUp2-close");var f=e.find(".boxPopUp2-content"),p=m.find(".boxPopUp2-close, .boxPopUp2-overlay"),q=m.find(".boxPopUp2-overlay"),h=jQuery(document);null!==c.closeContent&&n.html(c.closeContent);var b={positioning:function(){var a=h.scrollTop(),b=jQuery(window).height(),c=e.outerHeight(!0);e.css("top",a+(c>=b?20:(b-c)/2)+"px")},show:function(a){a=a||{};
q.fadeTo("fast",0.5,function(){e.show().addClass("popupOpened");"boolean"===typeof a.loading&&!0===a.loading?b.showLoading():b.hideLoading();"function"===typeof a.callback&&a.callback();c.showCallback(e)})},hideLoading:function(){f.filter(":visible").css("background-image","none")},showLoading:function(){f.filter(":visible").css("background-image",'url("/arquivos/ajax-loader.gif")')},close:function(a){a=a||{};var b=function(){q.fadeOut("fast");e.fadeOut("fast",function(){f.empty()});f.attr("class",
"boxPopUp2-content");e.attr("class","boxPopUp2")};"boolean"==typeof a.closeNow&&!0===a.closeNow&&b();1>p.filter(".boxPopUp2-clickActive").length&&(p.addClass("boxPopUp2-clickActive").bind("click",function(){"function"===typeof a.clickCallback?a.clickCallback():c.closeCallback(e);b()}),h.bind("keyup",function(a){27==(a.keyCode?a.keyCode:a.which)&&b()}));if(l.hasClass("autoClose")){var g=(l.attr("class")||"").split("ac_").pop().split(" ").shift();if(isNaN(parseFloat(g)))return k("O tempo informado (em segundos) n\u00e3o \u00e9 um valor num\u00e9rico: \u201c"+
g+"\u201d"),!1;setTimeout(function(){b()},1E3*g)}},setType:function(a){if(a.hasClass("quickViewLink"))b.quickView(a);else if(a.hasClass("giftListWrap"))b.giftList(a);else if(a.hasClass("installmentInfoTpl"))b.paymentForms(a);else if(a.hasClass("shipping-value"))b.calculateShipping(a);else if(a.hasClass("freeContent"))b.freeContent(a);else if(a.hasClass("boxPopUp2"))b.closeNow(a);else if(a.hasClass("referAFriendTpl"))b.productReferAFriend(a);else if(0<a.filter("#btnReferAFriend").length)b.giftListReferFriend(a);
else if(0<a.filter("#lnkPubliqueResenha").length)b.postRatingComment(a);else if(0<a.filter("#palerta").length)b.cartCheckoutAlert(a);else if(a.hasClass("lnkAddPhoto"))c.popupType="minhaContaFoto",b.userAccount(a);else return!1},checkType:function(a){if("cadastroCliente"===c.popupType||"minhaContaFoto"===c.popupType)b.userAccount(a);else if("newsletter"===c.popupType)b.newsletter(a);else if("quickview"===c.popupType)b.quickView(a);else if("giftlist"===c.popupType)b.giftList(a);else if("paymentforms"===
c.popupType)b.paymentForms(a);else if("shipping"===c.popupType)b.calculateShipping(a);else if("string"==typeof c.popupType&&"freecontent"===c.popupType.toLowerCase())b.freeContent(a);else if("closenow"===c.popupType)b.closeNow(a);else if("GiftListReferAFriend"===c.popupType)b.giftListReferFriend(a);else if("postRatingComment"===c.popupType)b.postRatingComment(a);else return!1},exec:function(){l.each(function(){var a=$(this),d;null===c.popupType?d=b.setType(a):!1===b.checkType(a)&&(d=b.setType(a));
!1===d&&b.freeContent(a)});c.initCallback()},userAccount:function(a){var d="";"cadastroCliente"===c.popupType?d="signInPopups":"minhaContaFoto"===c.popupType&&(d="profilePhoto");a.unbind().removeAttr("onclick");var g=a.attr("href")||"";a.bind("mouseenter",function(){a.unbind().bind("click",function(){e.addClass(c.popupClass+" "+d+"Main");""===g&&k("N\u00e3o existe URL no atributo href");jQuery('<iframe src="'+g+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(f.addClass(c.popupClass+
" "+d));b.show({loading:!0});b.positioning();b.close();return!1})})},newsletter:function(a){a.clone().appendTo(f.addClass(c.popupClass+" newsletterPopup"));e.addClass(c.popupClass+" newsletterMain");b.show();b.positioning();b.close()},quickView:function(a){var d=function(){a.filter(":not(.quickViewLinkActivated)").addClass("quickViewLinkActivated").bind("click",function(){jQuery('<iframe src="'+jQuery(this).attr("href")+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(f.addClass(c.popupClass+
" productQuickView"));e.addClass(c.popupClass+" quickViewMain");b.show({loading:!0});b.positioning();b.close();return!1})};d();h.ajaxStop(d)},paymentForms:function(a){var d="",g=function(){var a=$(".see-other-payment-method-link");if(1>a.length)return k("Url das formas de pagamento n\u00e3o encontrado. \n Verifique se o controle esta na p\u00e1gina.\n("+a.selector+")"),!1;d=/http:(.*?)((?=\&)|(?=\'))/.exec(a[0].getAttribute("onclick").toString())[0]||"#onclickError"};g();a.bind("click",function(){jQuery("<iframe src='"+
d+"' frameborder='0' allowtransparency='true'></iframe>").appendTo(f.addClass(c.popupClass+" paymentFormsPopup"));e.addClass(c.popupClass+" paymentFormsMain");b.show({loading:!0});b.positioning();b.close();return!1});h.ajaxStop(g)},calculateShipping:function(a){h.ajaxStop(function(){var a=m.find("#calculoFrete").children();if(1>a.length)return!1;a.find("span.cep-busca a").attr("target","_blank");a.appendTo(f.addClass(c.popupClass+" shippingCalculationPopup"));e.addClass(c.popupClass+" shippingCalculationMain");
b.show();b.positioning();b.close()})},giftList:function(a){a.appendTo(f.addClass(c.popupClass+" giftListPopup"));e.addClass(c.popupClass+" giftListMain");b.show();b.positioning();b.close({clickCallback:c.closeCallback})},cartCheckoutAlert:function(a){a.appendTo(f.addClass(c.popupClass+" cartCheckoutAlertPopup"));e.addClass(c.popupClass+" cartCheckoutAlertMain");b.show();b.positioning();b.close()},freeContent:function(a){var d;d=function(){e.addClass(c.popupClass+" freeContentMain");b.show();b.positioning();
b.close()};null===c.contentUrl?(a.appendTo(f.addClass(c.popupClass+" freeContentPopup")),d()):a.bind("click",function(){jQuery('<iframe src="'+c.contentUrl+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(f.addClass(c.popupClass+" freeContentPopup"));d();return!1})},closeNow:function(a){b.close({closeNow:!0})},giftListReferFriend:function(a){var d=function(a){a=$(this).attr("href");if("undefined"===typeof a||""===a)return k("[Erro] Url do popup n\u00e3o encontrada."),!1;f.addClass(c.popupClass+
" freeContentPopup").load(a);e.addClass(c.popupClass+" giftListReferFriendMain");b.show({loading:!0});b.positioning();b.close();return!1},g=function(){a.unbind().bind("mouseenter",function(){a.unbind().bind("click",d)})};g();h.ajaxStop(g)},productReferAFriend:function(a){var d=jQuery('<div class="referAFriendPopUpWrap"></div>');a.bind("click",function(){var a=(jQuery(this).parent().find("#div-referAFriend input").attr("onclick")||"").toString(),a=/\/referAFriend\/Form\/[0-9]+\?/i.exec(a);if(null===
a)return alert("Desculpe, n\u00e3o foi poss\u00edvel abrir o formul\u00e1rio."),!1;d.empty().load(a[0],function(){b.positioning()});d.appendTo(f.addClass(c.popupClass+" freeContentPopup"));e.addClass(c.popupClass+" freeContentMain");b.show();b.positioning();b.close();return!1});h.ajaxStop(function(){0<f.find(".referAFriendPopUpWrap #btnFechar").length&&setTimeout(b.closeNow,1500)})},postRatingComment:function(a){var d;a=a.filter(":not(.popUpPublishReviewActivated)");d=!1;if(1>a.length)return!1;a.bind("click",
function(){var a=jQuery(this).attr("href")||"";if(""===a)return k("N\u00e3o foi poss\u00edvel obter os dados para abrir o popup de resenha."),!1;a=a.split(")").shift().split("(").pop().split(",");if(3!=a.length)return k("O array com os dados do cliente retornou um valor inesperado."),!1;if(d)return!1;d=!0;jQuery.ajax({url:"/publishuserreviewcomment",type:"POST",data:{productId:a[1],clientId:a[0],categoryId:a[2]},success:function(a){var g=jQuery(a);f.addClass(c.popupClass+" userReviewPopup").html(g);
e.addClass(c.popupClass+" userReviewPopupMain");b.show({callback:function(){g.find("#txtTituloResenha:hidden").val("titulo_auto");var a=f.find("a#rtAvaliacao_A0"),b=function(){a.attr("title",a.find(".filledRatingStar:last").index()+1||0)};a.find("span").bind("mouseenter",b);a.bind("mouseleave",b)}});b.positioning();b.close();d=!1},error:function(){d=!1}});return!1}).addClass("popUpPublishReviewActivated");0===jQuery.fn.vtexPopUp2.data.userReviewCount&&h.ajaxStop(function(){f.hasClass("userReviewPopup")&&
$("#publishUserReview").children().length&&(b.closeNow(),$("#publishUserReview >.formUserComment").insertAfter("#publishUserReview"))});jQuery.fn.vtexPopUp2.data.userReviewCount++}};b.exec();return l};jQuery.fn.vtexPopUp2.data={userReviewCount:0};

// AUTOLOADS
$(function(){
	var b=$("body");
	/* Gift List */ b.find(".giftListButtonTpl").vtexGiftlist();
	/* Newsletter */ b.find(".vtexNewsWrap").QD_news();
	/* Formas de pagamento */ b.find(".installmentInfoTpl").vtexPopUp2();
	/* Cálculo de frete */ b.find(".shipping-value").vtexPopUp2();
	/* Indicar à um amigo (pg. Produto) */ b.find(".referAFriendTpl").vtexPopUp2();
});
$(document).ajaxStop(function(){
	var b=$("body");
	/* Publicar comentário sobre o produto */ b.find("#lnkPubliqueResenha[href*='javascript']").vtexPopUp2();
	/* Quickview */ b.find(".quickViewLink").vtexPopUp2();
});