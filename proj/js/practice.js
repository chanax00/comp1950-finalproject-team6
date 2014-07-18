/*

	COMP 1950 Home Page Javascript
	File Name: 		index.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

function countDups()
{	
	var nDups = 0;
	var nthChildLast = $("#practice_list ul li:nth-last-of-type(1)");
	var iItem0 = Number(readCookie("practice_panel_0"));
	if (iItem0 < 1) iItem0 = 1;
	var nthChild0 = $("#practice_list ul li:nth-child("+String(iItem0)+")");
	var iItem = 1;
	while (iItem < iItem0)
	{
		nthChild = $("#practice_list ul li:nth-child("+String(iItem)+")");
		if (nthChild.html() == nthChild0.html()) nDups++;
		if (nthChild.offset().top == nthChildLast.offset().top) break;
		iItem++;
	}
	return nDups;
}

function showCard()
{
	var nDups = countDups();
	var iItem = 1;
	var nthChildLast = $("h2:nth-last-of-type(1)");
	var session = readCookie('session');
	var cstr = readCookie('practice'+session);
	if (cstr == '' || cstr == null)
	{
		cstr = $("#practice_list ul li:nth-child(1)").html();
		if (cstr == '' || cstr == null) return;
	}
	else cstr = cstr.replace("&","&amp;");
	var iItem = 0;
	var iH2 = 0;
	var nH2 = readCookie("practice_list_nh2");
	while (iH2 < nH2)
	{
		var nthChild = $("h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (nthChild.html() == cstr)
			{
				if (nDups > 0) nDups--;
				else
				{
					$("h2:nth-child("+String(iItem)+")").css('display','block');
					$("h2:nth-child("+String(iItem)+")+div").css('display','block');
					return;
				}
			}
			iH2++;
		}
		iItem++;
	}
}

function hideCard()
{
	var nDups = countDups();
	var iCard = 1;
	var nthChildLast = $("h2:nth-last-of-type(1)");
	var session = readCookie('session');
	var cstr = readCookie('practice'+session);
	cstr = cstr.replace("&","&amp;");

	var iItem = 0;
	var iH2 = 0;
	var nH2 = readCookie("practice_list_nh2");
	while (iH2 < nH2)
	{
		var nthChild = $("h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (nthChild.html() == cstr)
			{
				if (nDups > 0) nDups--;
				else
				{
					$("h2:nth-child("+String(iItem)+")").css('display','none');
					$("h2:nth-child("+String(iItem)+")+div").css('display','none');
					return;
				}
			}
			iH2++;
		}
		iItem++;
	}
}

function selectCard()
{
	var nthChildLast = $("#practice_list ul li:nth-last-child(1)");
	var card = $("#practice_list ul li:nth-child(1)");
	var session = readCookie('session');
	var cardName = readCookie('practice'+session);
	if (cardName == '' || cardName == null)
	{
		cardName = card.html();
		cardName = cardName.replace("&amp;","&");
		var session = readCookie('session');
		createCookie("practice"+session,cardName,365);
	}
	else
	{
		cardName = cardName.replace("&","&amp;");
		var nDups = countDups();
		var iItem = 1;
		while (1)
		{
			var nthChild = $("#practice_list ul li:nth-child("+String(iItem)+")");
			if (nthChild.html() == cardName)
			{
				if (nDups > 0) nDups--;
				else break;
			}
			if (nthChild.offset().top == nthChildLast.offset().top)
			{
				iItem = 1;
				break;
			}
			iItem++;
		}
		card = $("#practice_list ul li:nth-child("+String(iItem)+")");
	}
	card.css("color","yellow");
}

function initList()
{
	var strContent = document.getElementById("content").innerHTML;
	var strList = "<ul>";
	var iStr0 = strContent.search("<h2>");
	if (iStr0 == -1) return;
	var nH2 = 0;
	while (iStr0 != -1 && strContent.length > 0)
	{
		strContent = strContent.slice(iStr0+4,strContent.length);
		iStr0 = strContent.search("</h2>");
		if (iStr0 == -1) break;
		var topic = strContent.slice(0,iStr0);
		strContent = strContent.slice(iStr0+4,strContent.length);
		if (topic.search("Exercise") != -1)
		{
			strList += "<li>"+topic+"</li>";
		}
		iStr0 = strContent.search("<h2>");
		nH2++;
	}
	createCookie("practice_list_nh2",nH2,365);
	document.getElementById("practice_list").innerHTML = strList+"</ul>";
	$(".dark_panel").css("height",$("#practice_list").css("height"));
	var session = readCookie("session");
	var card = readCookie("practice"+session);
	if (card == null || card == "")
	{
		$("#practice_list ul li:nth-child(1)").css("color","yellow");
		var cardName = $($("#practice_list ul li:nth-child(1)")).html();
		cardName = cardName.replace('&amp;','&');
		createCookie("practice"+session,cardName,365);
	}
	selectCard();
	showCard();
	$("#practice_list ul li").click(function(){
		hideCard();
		var cardName = $(this).html();
		cardName.replace("&amp;","&");
		createCookie("practice"+session,cardName);
		$(this).css("color","yellow");
		var nthChildLast = $("#practice_list ul li:nth-last-child(1)");
		var iItem = 1;
		while (1)
		{
			var nthChild = $("#practice_list ul li:nth-child("+String(iItem)+")");
			if (nthChild.offset().top == $(this).offset().top)
			{
				createCookie("practice_panel_0",iItem);
			}
			else nthChild.css('color','#dedede');
			if (nthChild.offset().top == nthChildLast.offset().top) break;
			iItem++;
		}
		selectCard();
		showCard();
	});
}

$(document).ready(function(){
	initList();
})
