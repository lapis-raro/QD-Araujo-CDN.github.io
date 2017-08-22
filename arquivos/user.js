/*
* @author Carlos Vinicius
* @version 1.6
* @date 2011-01-10
*/
if(typeof(jQ)=="undefined") var jQ=$(document);
// Adicionando a função "trim" p/ os IE e os demais que não tem
if("function"!=typeof(String.prototype.trim)){ String.prototype.trim=function(){ return this.replace(/^\s+|\s+$/g,""); };}

var UserJs=
{
    init:function()
    {
        var b=jQ.find("body");
        UserJs.jsLoadRecursive.recursive(UserJs.jsLoadRecursive.list);
        // UserJs.vtexFunctions();
        UserJs.loginItems();
    },
    ajaxStop:function()
    {
        UserJs.loadingAlert();
    },
    windowOnload:function()
    {
    },
    loginItems:function()
    {
        if ($('body').hasClass('login')) {
            $("<div class='oldClients'> <h4>Já Sou cliente</h4> <p>É um prazer recebê-lo em nossa nova loja! Para sua segurança solicitamos o recadastramento de sua senha. Em poucos segundos você receberá um novo código de acesso em seu e-mail.</p> <a href='EsqueciMinhaSenha.aspx'>Recadastrar senha</a> </div>").insertBefore(".sign-in >h4")
        };
    },
    jsLoadRecursiveCallback:function()
    {
    },
    jsLoadRecursive:
    {
        list:["functions.base.js","vtexPack.2.2.js"],
        recursive:function(list)
        {
            if(list.length>0)
                jQuery.ajax({"url":"/arquivos/"+list.shift(), "dataType":"script", "success":function(){   
                    if(list.length>0) UserJs.jsLoadRecursive.recursive(list);
                    else UserJs.jsLoadRecursiveCallback();
                }});
        }
    },
    loadingAlert:function()
    {
        var i=0;
        if(jQ.find(".loading").length<1 && i<1)
        {
            var elem=jQuery('<div class="loading"><p>Aguarde... </p></div>').hide().prependTo("body");
            
            var ajax={
                start:function (sender, args){ elem.show(); },
                stop:function (sender, args){ elem.hide(); }
            };
        
            function AjaxBegin(sender, args){ elem.show(); }
            function AjaxEnd(sender, args){ elem.hide(); UserJs.ajaxStop(); }
            
            if (typeof(Sys)!="undefined" && !Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack())
            {
                Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(ajax.start);
                Sys.WebForms.PageRequestManager.getInstance().add_endRequest(ajax.stop);
                i++;
            }

            jQ.ajaxStart(function(){elem.show();});
            jQ.ajaxStop(function(){elem.hide();});
        }
    },
    /*vtexFunctions:function()
    {
        jQ.find("body.checkout .searchWrapper:last, body.minha-conta .searchWrapper:last, body.fale-conosco .searchWrapper:last, body.sku .searchWrapper:last").addClass("bottomSearchWrapper");
    
        var iframe=jQ.find("iframe");
        if(iframe.length>0)
        {
            if (jQ.find("body.carrinho").length>0)
            {
                iframe.attr({"scrolling":"no", "style":"overflow:hidden; width:640px; height:400px;"}).parent().attr("style", "overflow:visible; width:640px; height:400px;");
                jQ.find("a.thickbox.tbstarted").bind("click",function(){
                    iframe.attr({"scrolling":"no", "style":"overflow:hidden; width:640px; height:400px;"}).parent().attr("style", "overflow:visible; width:640px; height:400px;");
                });
                if ($.browser.safari)
                    iframe.css({"width":"600px", "height":"450px", "overflow":"hidden"}).parent().css({"width":"600px", "height":"400px", "overflow":"hidden"});
            }
            else if (jQ.find("body.checkout").length>0)
            {
                iframe.attr({"scrolling":"no", "style":"overflow:hidden; width:640px; height:400px;"}).parent().attr("style","overflow:visible; width:640px; height:400px;");
                jQ.find("a.thickbox.tbstarted").bind("click",function(){
                    iframe.attr({"scrolling":"no", "style":"overflow:hidden; width:640px; height:400px;"}).parent().attr("style", "overflow:visible; width:640px; height:400px;");
                });
                if ($.browser.safari)
                    iframe.css({"width":"600px", "height":"450px", "overflow":"hidden"}).parent().css({"width":"600px", "height":"400px", "overflow":"hidden"});
            };
        }
    },
    insertPage : {
        faleconosco: function() {
            $("body.fale-conosco .content h2").remove();
            var content = $('body.fale-conosco .content .wrapper').detach();

            $.ajax({
                type: "GET",
                url: "/append",
                dataType: "html",
                success: function(data){
                    var form = $(content).html();
                    var page = $(data).find(".mainTpl").parent().html();
                    var target = $('body.fale-conosco .content');

                    $(target).html(page);
                    $(target).find('.columnMain').addClass('faq').html(form);
                    $(target).find("fieldset legend").remove();
                    $(target).find("li.voltar").remove();

                    $('body.fale-conosco .content').addClass("mainTpl").addClass('faleconosco').prepend().show();
                    $('body.fale-conosco .content div.paddingFix').removeClass("paddingFix").width(965);
                }
            });
        }
    }*/
};

$(UserJs.init);
jQ.ajaxStop(UserJs.ajaxStop);
$(window).load(UserJs.windowOnload);

/*$(document).ready(function() {
    if($("body").is(".fale-conosco")){
        UserJs.insertPage.faleconosco();
    }
});*/