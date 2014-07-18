/*

	COMP 1950 Home Page Javascript
	File Name: 		index.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

function showCard()
{
	var iCard = 1;
	var nthChildLast = $("h2:nth-last-of-type("+String(iCard)+")");
	while (1)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		var cstr = readCookie('practice');
		cstr = cstr.replace("&","&amp;");
		if (nthChild.html() == cstr)
		{
			$("h2:nth-child("+String(iCard)+")").css('display','block');
			$("h2:nth-child("+String(iCard)+")+div").css('display','block');
			return;
		}
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
}

function hideCard()
{
	var iCard = 1;
	var nthChildLast = $("h2:nth-last-of-type("+String(iCard)+")");
	while (1)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		var cstr = readCookie('practice');
		cstr = cstr.replace("&","&amp;");
		if (nthChild.html() == cstr)
		{
			$("h2:nth-child("+String(iCard)+")").css('display','none');
			$("h2:nth-child("+String(iCard)+")+div").css('display','none');
			return;
		}
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
}

function initList()
{
	var strContent = document.getElementById("content").innerHTML;
	var strList = "<ul>";
	var iStr0 = strContent.search("<h2>");
	if (iStr0 == -1) return;
//	alert(strContent);
	while (iStr0 != -1 && strContent.length > 0)
	{
		strContent = strContent.slice(iStr0+4,strContent.length);
		iStr0 = strContent.search("</h2>");
		if (iStr0 == -1) break;
		var topic = strContent.slice(0,iStr0);
		strContent = strContent.slice(iStr0+4,strContent.length);
		if (topic.search("Exercise") != -1)
			strList += "<li>"+topic+"</li>";
		iStr0 = strContent.search("<h2>");
	}
	document.getElementById("practice_list").innerHTML = strList+"</ul>";
	$(".dark_panel").css("height",$("#practice_list").css("height"));
	var card = readCookie("practice");
	if (card == null)
	{
		$("#practice_list ul li:nth-child(1)").css("color","yellow");
		var cardName = $($("#practice_list ul li:nth-child(1)")).html();
		cardName = cardName.replace('&amp;','&');
		createCookie("practice",cardName,365);
	}
	showCard();
	$("#practice_list ul li").click(function(){
		var iCard = 1;
		while (iCard > 0)
		{
			var nthChild = $("#practice_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.css("color") == null) break;
			var cstr = readCookie('practice');
			cstr = cstr.replace("&","&amp;");
			if (nthChild.html() == cstr)
			{
				nthChild.css('color','#dedede');
			}
			iCard++;
		}
		hideCard();
		var cardName = $(this).html();
		cardName = cardName.replace("&amp;","&");
		createCookie("practice",cardName,365);
		$(this).css("color","yellow");
		showCard();
	});
}

$(document).ready(function(){
	initList();
})
