/*

	COMP 1950 Home Page CSS
	File Name: 		lecture.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

function getCookie(cname)
/*
	accessing cookies in javascript is not built-in, so I got this function from
	http://www.w3schools.com/js/js_cookies.asp
*/
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ')
		{
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires;
}

function selectCard()
{
	var card = readCookie("card");
	if (card == null)
	{
		$("#card_list ul li:nth-child(1)").css("color","yellow");
		var cardName = $($("#card_list ul li:nth-child(1)")).html();
		createCookie("card",cardName,365);
	}
	else
	{
		var iCard = 1;
		while (iCard > 0)
		{
			var nthChild = $("#card_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.css('color') == null) break;
			if (nthChild.html() == card)
			{
				nthChild.css('color','yellow');
			}
			else nthChild.css('color','#dedede');
			iCard++;
		}
	}
}

function initCards()
{
	var strContent = document.getElementById("content").innerHTML;
	var strList = "<ul>";
	var iStr0 = strContent.search("<h2");
	strContent = strContent.slice(iStr0+3,strContent.length);
	iStr0 = strContent.search('>') + 1;
	var iCard = 1;
	while (iStr0 != -1 && strContent.length > 0)
	{
		var iStr1 = strContent.search("</h2>");
		if (iStr1 == -1) break;
		var cardName = strContent.slice(iStr0,iStr1);
		strList += "<li>"+cardName+"</li>";
		strContent = strContent.slice(iStr1+5,strContent.length);
		iStr0 = strContent.search("<h2");
		strContent = strContent.slice(iStr0+3,strContent.length);
		iStr0 = strContent.search('>') + 1;
		iCard++;
	}
	document.getElementById("card_list").innerHTML = strList+"</ul>";
	$(".dark_panel").css("height",$("#card_list").css("height"));
	$("#card_list").css("display","block");
	$("#session_list").css("display","none");
	selectCard();
	showCard();
	$("#card_list ul li").click(function(){
		var iCard = 1;
		while (iCard > 0)
		{
			var nthChild = $("#card_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.css("color") == null) break;
			if (nthChild.html() == readCookie('card'))
			{
				nthChild.css('color','#dedede');
			}
			iCard++;
		}
		hideCard();
		var cardName = $(this).html();
		createCookie("card",cardName,365);
		$(this).css("color","yellow");
		showCard();
	});
}

function clickOption(option)
{
	document.cookie = "option = " + option;
	switch (option)
	{
		case 'sessions':
			$("#session_list").css("display","block");
			$("#card_list").css("display","none");
			$(".dark_panel").css("height",$("#session_list").css("height"));
			break;
		case 'cards':
			initCards();
			$("#session_list").css("display","none");
			$("#card_list").css("display","block");
			$(".dark_panel").css("height",$("#card_list").css("height"));
			selectCard();
			showCard();
			break;
	}
}

function showCard()
{
	var iCard = 1;
	while (iCard > 0)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == "") break;
		if (nthChild.html() == readCookie('card'))
		{
			$("h2:nth-child("+String(iCard)+")").css('display','block');
			$("h2:nth-child("+String(iCard)+")+div").css('display','block');
			return;
		}
		iCard++;
	}
}

function hideCard()
{
	var iCard = 1;
	while (iCard > 0)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == "") break;
		if (nthChild.html() == readCookie('card'))
		{
			$("h2:nth-child("+String(iCard)+")").css('display','none');
			$("h2:nth-child("+String(iCard)+")+div").css('display','none');
			return;
		}
		iCard++;
	}
}

function showPrevCard()
{
	var iCard = 1;
	while (iCard > 0)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == "") break;
		if (nthChild.html() == readCookie('card'))
		{
			if (iCard - 2 > 0)
			{
				$("h2:nth-child("+String(iCard)+")").css('display','none');
				$("h2:nth-child("+String(iCard)+")+div").css('display','none');
				iCard-=2;
				$("h2:nth-child("+String(iCard)+")").css('display','block');
				$("h2:nth-child("+String(iCard)+")+div").css('display','block');
				createCookie("card",$("h2:nth-child("+String(iCard)+")").html(),365);
				selectCard();
			}
			return;
		}
		iCard++;
	}
}

function showNextCard()
{
	var iCard = 1;
	while (iCard > 0)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == "") break;
		if (nthChild.html() == readCookie('card'))
		{
			if ($("h2:nth-child("+String(iCard+2)+")").css("color") != null)
			{
				$("h2:nth-child("+String(iCard)+")").css('display','none');
				$("h2:nth-child("+String(iCard)+")+div").css('display','none');
				iCard+=2;
				$("h2:nth-child("+String(iCard)+")").css('display','block');
				$("h2:nth-child("+String(iCard)+")+div").css('display','block');
				createCookie("card",$("h2:nth-child("+String(iCard)+")").html(),365);
				selectCard();
			}
			return;
		}
		iCard++;
	}
}

function showPanel()
{
	$(".dark_panel").css("height",$("#session_list").css("height"));
	switch (readCookie('option'))
	{
		default: case 'sessions':
			$(".dark_panel").css("height",$("#session_list").css("height"));
			$("#session_list").css("display","block");
			$("#card_list").css("display","none");
			break;
		case 'cards':
			initCards();
			break;
	}
}

$(document).ready(function(){
	$("#arrow_left").click(function(){
		showPrevCard();
	});
	$("#arrow_right").click(function(){
		showNextCard();
	});
	showPanel();
})
