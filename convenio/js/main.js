$(document).ready(function(){
	$("input[placeholder], textarea[placeholder]").each(function(i, e){
		if($(e).val() == "")
		{
			$(e).val($(e).attr("placeholder"));
		}
		$(e).blur(function(){
	    if($(this).val()=="")
	      $(this).val($(e).attr("placeholder"));
		}).focus(function(){
	    if($(this).val() == $(e).attr("placeholder"))
        $(this).val("");
		});
	});
});