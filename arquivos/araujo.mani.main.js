var SITE = SITE || {};

SITE.fileInputs = function() {
	var $this = $(this),
	$val = $this.val(),
	valArray = $val.split('\\'),
	newVal = valArray[valArray.length-1],
	$button = $this.siblings('.button'),
	$fakeFile = $this.siblings('.file-holder');
	if(newVal !== '') {
		$button.text('ANEXAR RECEITA');
		if($fakeFile.length === 0) {
			$button.after('<span class="file-holder">' + newVal + '</span>');
		} else {
			$fakeFile.text(newVal);
		}
	}
};

function verificaNumero(e) {
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		return false;
	}
}

$(document).ready(function() {
	$('.file-wrapper input[type=file]').bind('change focus click', SITE.fileInputs);

	$("#cpf").mask("000.000.000-00");
	$("#phone").mask("(00) 0000-00009");
	$("#cep").mask("00000-000");

	$("#numero").keypress(verificaNumero);
});

$(function(){
	if (typeof $.fn.validate !== "function")
		return;

	var load = $('<div style="padding: 12px; text-align: center; font-size: 18px;"><img src="/arquivos/ajax-loader.gif"> Carregando ... </div>');
	var iframe = $('<iframe name="qd_handling_form" src="" style="width:100%;height:1px;" frameborder="0"></iframe>');
	var form = $("#form-receita");
	// var sucess = $('<div style="color:#5C8727;padding: 12px; text-align: center; font-size: 18px;"><i class="icon-ok" style="color:#5C8727;"></i> Dados enviados com sucesso! </div>');

	var options = {
		submitHandler: function(form){
			var $form = $(form);

			if(!$form.valid())
				return;

			// sucess.remove();
			// $form.find("[type=submit]").hide().after(load).after(sucess.hide());
			iframe.css("height", "1px");
			$form.find("[type=submit]").hide().after(load);
			load.slideDown();

			if(!$form.find("[name=subject]").length)
				$form.append('<input type="hidden" name="subject" value="Manipulação - ' + ($form.find("[name=nome]").val() || $form.find("[name=cpf]").val()) + '" />');

			form.submit();

			// Tracker manipulação no envio
			(function(){
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
					event:"GA Events",
					ga_event_category: "Botao",
					ga_event_action: "send",
					ga_event_label: "EnviarCadastroManipulacao"
				});
			})();
		},
		errorPlacement: function(error, element) {}
	};

	iframe.load(function(){
		load.slideUp(function(){$(this).remove();});
		// sucess.slideDown();
		iframe.animate({height: "50px"});
		form.find("[type=submit]").slideDown();
	});

	form.attr({
		// action: "http://chadebebe.araujo.com.br/email-site/general_email.php?to[]=mp@a&to[]=cl@g",
		action: "http://chadebebe.araujo.com.br/email-site/general_email.php?to[]=mp@a",
		// action: "http://chadebebe.araujo.com.br/email-site/general_email.php?to[]=mp@a&bcc[]=cl@g&bcc[]=mm@g&to[]=mt@mt",
		// action: "http://chadebebe.araujo.com.br/email-site/general_email.php?to[]=mp@a&bcc[]=mm@g",
		target: "qd_handling_form",
		enctype: "multipart/form-data"
	});
	form.validate(options);
	form.after(iframe);
});

// Tracker manipulação
$(function(){
	window.dataLayer = window.dataLayer || [];
	$("#form-receita input.enviar").click( function(){
		window.dataLayer.push({
			event:"GA Events",
			ga_event_category: "Botao",
			ga_event_action: "click",
			ga_event_label: "EnviarCadastroManipulacao"
		});
	});
});