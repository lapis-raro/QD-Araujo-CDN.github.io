var QdPbm={init:function(){QdPbm.cookieRenew();QdPbm.pbmHtmlLayout();QdPbm.pbmConsult()},sever:"http://chadebebe.araujo.com.br/araujo-pbm",cookieRenew:function(){$.cookie("qdPbm",$.cookie("qdPbm")||"",{path:"/",expires:1})},pbmHtmlLayout:function(){$(".product-other-payment-method-wrap").before('<div class="row"> <div class="col-xs-30"> <div class="product-qd-v1-pbm p"><div class="qd-loading" style="display: none;"><img src="/arquivos/ajax-loader.gif" /></div><label for="">CPF: <input type="tel" /></label><button>Enviar</button></div> </div> </div>');
QdPbm.pbmLoading=$(".product-qd-v1-pbm .qd-loading")},pbmConsult:function(){var c=$(".product-qd-v1-pbm"),d=$(".product-sku-rich-selection-wrap .buy-button"),g=$(".product-sku-rich-selection-wrap .skuList");c.find("button").click(function(){var b=(c.find("input").val()||"").trim();if(!b.length)return alert("Informe um CPF");QdPbm.pbmProcessItem(0,skuJson.skus[0],b,d,g)})},pbmProcessItem:function(c,d,g,b,h){function e(){QdPbm.pbmProcessItem(c+1,skuJson.skus,g,b,h)}if("undefined"!=typeof skuJson.skus[c]){var a=
$(".product-qd-v1-pbm");if(!skuJson.skus[c].available)return e();QdPbm.reqData={cpf:g,qtt:b.filter('[href*="sku='+skuJson.skus[c].sku+'&"]').closest(h).find(".qd-sq-quantity").val()||1,bDate:"",sku:skuJson.skus[c].sku,productId:skuJson.productId};(d=$.cookie("qdPbm"))&&d.length&&(QdPbm.reqData.orderId=d);QdPbm.pbmLoading.show();$.ajax({url:QdPbm.sever+"/pre-auth",dataType:"json",type:"POST",data:QdPbm.reqData,complete:function(){QdPbm.pbmLoading.hide()}}).fail(function(){alert("Desculpe, n\u00e3o foi poss\u00edvel consultar o sistema.")}).done(function(f){if(f.redirect&&
0==f.redirect.indexOf("ATIVA")){if(!$(".qd-pbm-modal-sign-up").length){var b=$(".qd-common-modal").clone().removeClass("qd-common-modal").addClass("qd-pbm-modal-sign-up");b.modal();b.on("hidden.bs.modal",function(){b.remove()});QdPbm.pbmInsertSignUpForm(b,f,g)}}else{if(f.item){f.item.QtdeAuth!=QdPbm.reqData.qtt&&a.append("<p>Quantidade solicitada \u00e9 diferente da quantidade na qual foi concedido o desconto</p>");var c=Math.ceil((100-f.item.DescPerc/100)/100*f.item.price);f.item.sellingPrice<=c?
a.append("<p>O desconto oferecido para o item \u201c"+f.item.nameComplete+"\u201d \u00e9 menor do que o pre\u00e7o oferecido pela Araujo. Fique tranquilo, voc\u00ea j\u00e1 esta pagando o menor pre\u00e7o para este item.</p>"):a.append("<p>O item \u201c"+f.item.nameComplete+"\u201d teve o desconto concedido. Voc\u00ea pagar\u00e1 R$ "+qd_number_format(c/100,2,",",".")+"</p>")}a.append("<p>Informa\u00e7\u00e3o do sistema de PBM: \u201c"+f.info+"\u201d </p>")}}).done(function(a){"string"==typeof a.id&&
a.id.length&&$.cookie("qdPbm",a.orderId,{path:"/",expires:1})}).done(function(){e()})}},pbmRegexCache:{onlyNumber:/[^0-9]+/g,date:/([0-9]+)\/([0-9]+)\/([0-9]+)/},pbmInsertSignUpForm:function(c,d,g){var b=$('<form><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><label>Nome Completo <input class="form-control" type="text" name="name"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4 qd-pbm-ATIVA5 qd-pbm-ATIVA-QD"><div class="form-group"><label>E-mail <input class="form-control" type="email" name="email"></label></div><div class="form-group"><label>CPF <input class="form-control" type="text" name="cpf"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><div class="radio"><label>Masculino <input type="radio" value="77" title="Masculino" name="gender"></label><label>Feminino <input type="radio" value="70" title="Feminino" name="gender"></label></div></div><div class="form-group"><label>Data de anivers\u00e1rio <input class="form-control" type="text" name="bDate"></label></div><div class="form-group"><label>Telefone <input class="form-control" type="text" name="phone"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><label>Celular <input class="form-control" type="text" name="mPhone"></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><label>CEP <input class="form-control" type="text" name="zip"></label></div><div class="form-group"><label>Tipo <select class="form-control" name="aType"><option value=""></option><option value="AV">Avenida</option><option value="AL">Alameda</option><option value="EST">Estrada</option><option value="PC">Pra\u00e7a</option><option value="R">Rua</option><option value="ROD">Rodovia</option><option value="TRV">Travessa</option><option value="LG">Largo</option><option value="Outr">Demais</option></select></label></div><div class="form-group"><label>Endere\u00e7o <input class="form-control" type="text" name="address"></label></div><div class="form-group"><label>N\u00famero <input class="form-control" type="text" name="n"></label></div><div class="form-group"><label>Complemento do endere\u00e7o <input class="form-control" type="text" name="complement"></label></div><div class="form-group"><label>Bairro <input class="form-control" type="text" name="neighborhood"></label></div><div class="form-group"><label>Cidade <input class="form-control" type="text" name="city"></label></div><div class="form-group"><label>Estado <select class="form-control" name="state"><option value=""></option><option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amap\u00e1</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Cear\u00e1</option><option value="DF">Distrito Federal</option><option value="ES">Esp\u00edrito Santo</option><option value="GO">Goi\u00e1s</option><option value="MA">Maranh\u00e3o</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="MG">Minas Gerais</option><option value="PA">Par\u00e1</option><option value="PB">Para\u00edba</option><option value="PR">Paran\u00e1</option><option value="PE">Pernambuco</option><option value="PI">Piau\u00ed</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rond\u00f4nia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">S\u00e3o Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option></select></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA1 qd-pbm-ATIVA3"><div class="form-group"><label>Nome do m\u00e9dico <input class="form-control" type="text" name="profName"></label></div><div class="form-group"><label>CRM do m\u00e9dico <input class="form-control" type="text" name="profCod"></label></div><div class="form-group"><label>Estado do m\u00e9dico <select class="form-control" name="profState"><option value="">Selecione</option><option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amap\u00e1</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Cear\u00e1</option><option value="DF">Distrito Federal</option><option value="ES">Esp\u00edrito Santo</option><option value="GO">Goi\u00e1s</option><option value="MA">Maranh\u00e3o</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="MG">Minas Gerais</option><option value="PA">Par\u00e1</option><option value="PB">Para\u00edba</option><option value="PR">Paran\u00e1</option><option value="PE">Pernambuco</option><option value="PI">Piau\u00ed</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rond\u00f4nia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">S\u00e3o Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option></select></label></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA2 qd-pbm-ATIVA3 qd-pbm-ATIVA4"><div class="form-group"><div class="checkbox"><label>Aceito os termos do programa <input type="checkbox" value="83" name="accept"></label></div></div></span><span class="qd-pbm-ATIVA qd-pbm-ATIVA4"><div class="form-group"><div class="checkbox"><label>Aceito contato por telefone <input type="checkbox" value="83" name="acceptPhone"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por correspond\u00eancia <input type="checkbox" value="83" name="acceptMail"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por SMS <input type="checkbox" value="83" name="acceptSMS"></label></div></div><div class="form-group"><div class="checkbox"><label>Aceito contato por e-mail <input type="checkbox" value="83" name="acceptEmail"></label></div></div></span><button type="submit">Enviar</button></form>');
c.find(".modal-body").html(b);b.find(".qd-pbm-ATIVA").hide().filter(".qd-pbm-"+d.redirect).show().find("input:not([type=checkbox]), input[name=accept], select").addClass("required");b.find('.qd-pbm-ATIVA:not(".qd-pbm-'+d.redirect+'")').remove();b.find("input[name=zip]").mask("00000-000");b.find("input[name=phone]").mask("(00) 0000-0000");b.find("input[name=mPhone]").mask("(00) 0000-00009");b.find("input[name=cpf]").val(g).mask("000.000.000-00");b.find("input[name=bDate]").mask("D0/M0/0000",{translation:{D:{pattern:/[0123]/},
M:{pattern:/[01]/}}});var h=b.find("select, input").filter("[name=aType], [name=address], [name=n], [name=complement], [name=neighborhood], [name=city], [name=state]").attr("disabled","disabled"),e=b.find("input[name=zip]");e.keyup(function(a){9>(e.val()||"").length||(e.attr("disabled","disabled"),$.ajax({url:"/api/checkout/pub/postal-code/BRA/"+e.val(),dataType:"json",complete:function(){h.add(e).removeAttr("disabled")}}).done(function(a){var c=(a.street||"").trim().split(" "),d=null;b.find("select[name=aType] option").each(function(){var a=
$(this);if(c[0].toUpperCase().replaceSpecialChars()==a.text().toUpperCase().replaceSpecialChars())return d=a.text(),a.parent().val(a.attr("value")).change(),!1});d?c[0]="":b.find("select[name=aType]").val("Outr").change();b.find("input[name=address]").val(c.join(" "));b.find("input[name=neighborhood]").val(a.neighborhood||"");b.find("input[name=city]").val(a.city||"");b.find("select[name=state]").val(a.state||"").change()}))});b.validate({rules:{email:{email:!0}},submitHandler:function(a){a=$(a);
if(a.valid()){var b=a.serializeArray();a={};for(var e=0;e<b.length;e++)b[e].value&&(a[b[e].name||"---"]=b[e].value);a.acceptPhone=a.acceptPhone||"78";a.acceptMail=a.acceptMail||"78";a.acceptSMS=a.acceptSMS||"78";a.acceptEmail=a.acceptEmail||"78";a.zip&&(a.zip=a.zip.replace(QdPbm.pbmRegexCache.onlyNumber,""));a.cpf&&(a.cpf=a.cpf.replace(QdPbm.pbmRegexCache.onlyNumber,""));a.bDate&&(a.bDate=a.bDate.replace(QdPbm.pbmRegexCache.date,"$3-$2-$1"));a.mPhone&&(a.mPhone=a.mPhone.replace(QdPbm.pbmRegexCache.onlyNumber,
"").split(""),a.mPhoneCode=a.mPhone.shift()+a.mPhone.shift(),a.mPhone=a.mPhone.join(""));a.phone&&(a.phone=a.phone.replace(QdPbm.pbmRegexCache.onlyNumber,"").split(""),a.phoneCode=a.phone.shift()+a.phone.shift(),a.phone=a.phone.join(""));a.preAuthId=d.id;b=d.redirect&&"ATIVA-QD"==d.redirect;$.ajax({url:QdPbm.sever+(b?"/pre-auth":"/sign-up"),type:"POST",dataType:"json",data:b?$.extend({},QdPbm.reqData,a):a}).fail(function(){alert("Desculpe, n\u00e3o foi poss\u00edvel consultar o sistema.")}).done(function(a){alert(a.info);
c.on("hidden.bs.modal",function(){$(".product-qd-v1-pbm button").click()});c.modal("hide")});return!1}},errorPlacement:function(a,b){}})}};$(QdPbm.init);