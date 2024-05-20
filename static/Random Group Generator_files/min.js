/*
JQUERY UI SHOULD ALSO BE ENABLED FOR FULL FUNCTIONALITY IN ANY TEMPLATE USING THIS!

Use 'text' for visible text entries (e.g. leaderboard) and 'input' for pw entries.
//e.g. apprise("<span align='center'>Provide your name for the leaderboard!!</span>",{'text':true}, ....
//e.g. apprise("How many cards would you like?", {"text":true}, function(r) {

//Use "range" to force select of numbers, with 'selrange' being returned as the number chosen:
//apprise("How many cards would you like?", {"range":"1-20"}, function(r) { alert(selrange) })
		


Standard args follow > 
function apprise(string, args, callback) {
    var default_args = {
        'confirm': false, // Ok and Cancel buttons
        'verify': false, // Yes and No buttons
        'input': false, // Text input (can be true or string for default text)
        'animate': false, // Groovy animation (can true or number, default is 400)
        'textOk': 'Ok', // Ok button default text
        'textCancel': 'Cancel', // Cancel button default text
        'textYes': 'Yes', // Yes button default text
        'textNo': 'No', // No button default text
        'position': 'center' // position center (y-axis) any other option will default to 100 top
    }


*/

function apprise(string,args,callback)
{var default_args={'confirm':false,'verify':false,'numbers':false,'animate':false,'textOk':'Ok','textCancel':'Cancel','textYes':'Yes','textNo':'No'}
if(args)
{for(var index in default_args)
{if(typeof args[index]=="undefined")args[index]=default_args[index];}}
var aHeight=$(document).height();var aWidth=$(document).width();$('body').append('<div class="appriseOverlay" id="aOverlay"></div>');$('.appriseOverlay').css('height',aHeight).css('width',aWidth).fadeIn(100);$('body').append('<div class="appriseOuter"></div>');$('.appriseOuter').append('<div class="appriseInner"></div>');$('.appriseInner').append(string);$('.appriseOuter').css("left",($(window).width()-$('.appriseOuter').width())/2+$(window).scrollLeft()+"px");if(args)
{if(args['animate'])
{var aniSpeed=args['animate'];if(isNaN(aniSpeed)){aniSpeed=400;}
$('.appriseOuter').css('top','-200px').show().animate({top:"100px"},aniSpeed);}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}
if(args)
	{
	if(args['text'])
		{
		if(typeof(args['text'])=='string')
			{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" id="textBox" value="'+args['text']+'" /></div>');}
		else
			{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" id="textBox" /></div>');}
	$('.aTextbox').focus();
		}
		
	//RANGE OF NUMBERS TO CHOOSE FROM:
	if(typeof(args['range'])!="undefined")
		{
		var items=args['range'].split("-");
		selrange=1;
		rangemin=items[0]
		rangemax=items[1]
		stuff='<input id="rangeFinder" name="value" value="1">'
		$('.appriseInner').append('<div class="aInput">'+stuff+'</div>');	
		$("#rangeFinder").spinner({
			min: items[0], 
			max: items[1],
			stop: function( event, ui ) 
				{
				selrange=$(this).val();if(selrange==""){console.log(0);selrange=rangemin}
				if (!selrange.match(/^\d+$/) && selrange!=""){console.log(1);$(this).val(rangemin);selrange=rangemin}
				if(eval(selrange)>rangemax){console.log(rangemax+" / "+selrange);$(this).val(rangemax);selrange=rangemax;}
				if(selrange<rangemin){console.log(3);$(this).val(rangemin);selrange=rangemin}
				}
		})
		
		}
		
	if(args['input'])
		{
		if(typeof(args['input'])=='string')
			{$('.appriseInner').append('<div class="aInput"><input type="password" class="aTextbox" t="aTextbox" id="pwBox" value="'+args['input']+'" /><br><input type="checkbox" onclick="myFunction()">Show Password</div></div>');}
		else
			{$('.appriseInner').append('<div class="aInput"><input type="password" class="aTextbox" t="aTextbox" id="pwBox" /><br><input type="checkbox" onclick="myFunction()">Show Password</div>');}
		$('.aTextbox').focus();
		}
	}
$('.appriseInner').append('<div class="aButtons"></div>');if(args)
{if(args['confirm']||args['input']||args['text'])
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textCancel']+'</button>');}
else if(args['verify'])
{$('.aButtons').append('<button value="ok">'+args['textYes']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textNo']+'</button>');}
else
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');}}
else
{$('.aButtons').append('<button value="ok">Ok</button>');}
$(document).keydown(function(e)
{if($('.appriseOverlay').is(':visible'))
{if(e.keyCode==13)
{$('.aButtons > button[value="ok"]').click();}
if(e.keyCode==27)
{$('.aButtons > button[value="cancel"]').click();}}});var aText=$('.aTextbox').val();if(!aText){aText=false;}
$('.aTextbox').keyup(function()
{aText=$(this).val();});$('.aButtons > button').click(function()
{$('.appriseOverlay').remove();$('.appriseOuter').remove();if(callback)
{var wButton=$(this).attr("value");if(wButton=='ok')
{if(args)
{if(args['input']||args['text'])
{callback(aText);}
else
{callback(true);}}
else
{callback(true);}}
else if(wButton=='cancel')
{callback(false);}}});}
function myFunction() {
  var x = document.getElementById("pwBox");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}



