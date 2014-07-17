/*

	COMP 1950 Home Page CSS
	File Name: 		lecture.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

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

function initLinks()
{
	var strContent = document.getElementById("content").innerHTML;
	var strList = "<ul>";
	var iStr0 = strContent.search("<a");
	if (iStr0 == -1) return;
	strContent = strContent.slice(iStr0+2,strContent.length);
//	iStr0 = strContent.search('>') + 1;
//	var iLink = 1;
	while (iStr0 != -1 && strContent.length > 0)
	{
		var url = "";
		var c = '"';
		iStr0 = strContent.search("href") + 4;
		iStr0 = strContent.search('"');
		if (iStr0 == -1)
		{
			iStr0 = strContent.search("'");
			c = "'";
		}
		if (iStr0 != -1)
		{
			iStr0++;
			strContent = strContent.slice(iStr0,strContent.length);
			iStr0 = strContent.search(c);
			url = strContent.slice(0,iStr0);
		}
		iStr0 = strContent.search(">");
		if (iStr0 != -1)
		{
			iStr0++;
			strContent = strContent.slice(iStr0,strContent.length);
			iStr0 = strContent.search("</a>");
			if (iStr0 == -1) break;
			var anchorName = strContent.slice(0,iStr0);
			strContent = strContent.slice(iStr0+4,strContent.length);
			strList += "<li><a href = '"+url+"' target = '_blank'><strong>"+
				anchorName+"</strong><br />"+url+
			"</a></li>";
			iStr0 = strContent.search("<a");
			c = strContent.charAt(iStr0+2);
			if (iStr0 == -1 || (c != ' ' && c != '>'))
			{
				break;
			}
			strContent = strContent.slice(iStr0+2,strContent.length);
		}
	}
	document.getElementById("link_list").innerHTML = strList+"</ul>";
	$(".dark_panel").css("height",$("#link_list").css("height"));
	$("#link_list").css("display","block");
	$("#session_list").css("display","none");
	$("#card_list").css("display","none");
//	selectCard();
	showCard();
	$("#link_list ul li").click(function(){
		var iCard = 1;
		while (iCard > 0)
		{
			var nthChild = $("#link_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.css("color") == null) break;
			if (nthChild.html() == readCookie('link'))
			{
				nthChild.css('color','#dedede');
			}
			iCard++;
		}
/*		hideCard();
		var cardName = $(this).html();
		createCookie("card",cardName,365);
		$(this).css("color","yellow");
		showCard(); */
	});
}

function clickOption(option)
{
//	document.cookie = "option = " + option;
	$("#icon_"+readCookie("option")).css("border","none");;
	createCookie("option",option,365);
	$("#icon_"+readCookie("option")).css("border","solid 2px yellow");;
	switch (option)
	{
		default: case 'sessions':
			$("#session_list").css("display","block");
			$("#card_list").css("display","none");
			$("#link_list").css("display","none");
			$("#customization").css("display","none");
			$(".dark_panel").css("height",$("#session_list").css("height"));
			break;
		case 'cards':
			initCards();
			$("#session_list").css("display","none");
			$("#card_list").css("display","block");
			$("#link_list").css("display","none");
			$("#customization").css("display","none");
			$(".dark_panel").css("height",$("#card_list").css("height"));
			selectCard();
			showCard();
			break;
		case 'links':
			initLinks();
			$("#session_list").css("display","none");
			$("#card_list").css("display","none");
			$("#link_list").css("display","block");
			$("#customization").css("display","none");
			$(".dark_panel").css("height",$("#link_list").css("height"));
			break;
		case 'customization':
			$("#session_list").css("display","none");
			$("#card_list").css("display","none");
			$("#link_list").css("display","none");
			$("#customization").css("display","block");
			$(".dark_panel").css("height",$("#customization").css("height"));
			break;
	}
}

function showPanel()
{
	clickOption(readCookie('option'));
/*	$(".dark_panel").css("height",$("#session_list").css("height"));
	switch (readCookie('option'))
	{
		default: case 'sessions':
			$(".dark_panel").css("height",$("#session_list").css("height"));
			$("#session_list").css("display","block");
			$("#card_list").css("display","none");
			$("#link_list").css("display","none");
			$("#customization").css("display","none");
			break;
		case 'cards':
			initCards();
			break;
		case 'links':
			initLinks();
			break;
		case 'customization':
			$(".dark_panel").css("height",$("#customization").css("height"));
			$("#session_list").css("display","none");
			$("#card_list").css("display","none");
			$("#link_list").css("display","none");
			$("#customization").css("display","block");
			break;
	} */
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
