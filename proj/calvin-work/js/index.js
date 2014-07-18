/*

	COMP 1950 Home Page Javascript
	File Name: 		index.js
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
		var cstr = readCookie('topic');
		cstr = cstr.replace("&","&amp;");
		if (nthChild.html() == cstr)
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
		var cstr = readCookie('topic');
		cstr = cstr.replace("&","&amp;");
		if (nthChild.html() == cstr)
		{
			$("h2:nth-child("+String(iCard)+")").css('display','none');
			$("h2:nth-child("+String(iCard)+")+div").css('display','none');
			return;
		}
		iCard++;
	}
}

function initTopics()
{
	var strContent = document.getElementById("content").innerHTML;
	var strList = "<ul>";
	var iStr0 = strContent.search("<h2>");
	if (iStr0 == -1) return;
	while (iStr0 != -1 && strContent.length > 0)
	{
		strContent = strContent.slice(iStr0+4,strContent.length);
		iStr0 = strContent.search("</h2>");
		if (iStr0 == -1) break;
		var topic = strContent.slice(0,iStr0);
		strContent = strContent.slice(iStr0+4,strContent.length);
		strList += "<li>"+topic+"</li>";
		iStr0 = strContent.search("<h2>");
	}
	document.getElementById("topic_list").innerHTML = strList+"</ul>";
	$(".dark_panel").css("height",$("#topic_list").css("height"));
	var card = readCookie("topic");
	if (card == null)
	{
		$("#topic_list ul li:nth-child(1)").css("color","yellow");
		var cardName = $($("#topic_list ul li:nth-child(1)")).html();
		cardName = cardName.replace('&amp;','&');
		createCookie("topic",cardName,365);
	}
	showCard();
	$("#topic_list ul li").click(function(){
		var iCard = 1;
		while (iCard > 0)
		{
			var nthChild = $("#topic_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.css("color") == null) break;
			var cstr = readCookie('topic');
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
		createCookie("topic",cardName,365);
		$(this).css("color","yellow");
		showCard();
	});
}

$(document).ready(function(){
	initTopics();
})
