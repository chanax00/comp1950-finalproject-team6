/*

	COMP 1950 Home Page CSS
	File Name: 		lecture.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

function appendSession(cstr)
{
	var session = readCookie("session");
	var sessionStr = String(session);
	if (session < 9)
	{
		sessionStr = String('0').concat(sessionStr);
	}
	return cstr+sessionStr;
}

function selectSession()
{
	var session = readCookie("session");
	if (session == null || session == '')
	{
		$("#session_list ol li:nth-child(1)").css("color","yellow");
		createCookie("session","01",365);
	}
	else
	{
		var iSession = 1;
		var sessionNum = Number(session);
		while (iSession > 0)
		{
			var nthChild = $("#session_list ol li:nth-child("+String(iSession)+")");
			if (nthChild.css('color') == null || nthChild.css('color') == '') break;
			if (iSession == sessionNum)
			{
				nthChild.css('color','yellow');
			}
			else nthChild.css('color','#dedede');
			iSession++;
		}
	}
}

function showCard()
{
	var session = readCookie('session');
	var cstr = readCookie('card'+session);
	var nthChildLast = $("h2:nth-last-of-type(1)");
	var iCard = 1;
	while (1)
	{
		nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == cstr)
		{
			$("h2:nth-child("+String(iCard)+")").css('display','block');
			$("h2:nth-child("+String(iCard)+")+div").css('display','block');
			createCookie(cstr,nthChild.html(),365);
			return;
		}
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
	$("h2:nth-child(1)").css('display','block');
	$("h2:nth-child(1)+div").css('display','block');
	var session = readCookie('session');
	createCookie('card'+session,$("h2:nth-child(1)").html(),365);
}

function hideCard()
{
	var iCard = 1;
	var nthChildLast = $("h2:nth-last-of-type(1)");
	while (1)
	{
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		var session = readCookie('session');
		if (nthChild.html() == readCookie('card'+session))
		{
			$("h2:nth-child("+String(iCard)+")").css('display','none');
			$("h2:nth-child("+String(iCard)+")+div").css('display','none');
			return;
		}
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
}

function showPrevCard()
{
	var iCard = 2;
	var nthChildLast = $("h2:nth-last-of-type(1)");
	$("h2").css('display','none');
	$("h2+div").css('display','none');
	while (1)
	{
		var nthChild = $("h2:nth-of-type("+String(iCard)+")");
		var session = readCookie('session');
		if (nthChild.html() == readCookie('card'+session))
		{
			$("h2:nth-of-type("+String(iCard-1)+")").css('display','block');
			$("h2:nth-of-type("+String(iCard-1)+")+div").css('display','block');
			createCookie("card"+session,$("h2:nth-of-type("+String(iCard-1)+")").html(),365);
			selectCard();
			return;
		}
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
	$("h2:nth-of-type(1)").css('display','block');
	$("h2:nth-of-type(1)+div").css('display','block');
	createCookie("card"+session,$("h2:nth-of-type(1)").html(),365);
	selectCard();
}

function showNextCard()
{
	var iCard = 1;
	var nthChildLast = $("h2:nth-last-of-type(1)");
	while(1) {
		var nthChild = $("h2:nth-child("+String(iCard)+")");
		if (nthChild.html() == nthChildLast.html()) break;
		var session = readCookie('session');
		if (nthChild.html() == readCookie('card'+session))
		{
			$("h2:nth-child("+String(iCard)+")").css('display','none');
			$("h2:nth-child("+String(iCard)+")+div").css('display','none');
			iCard+=2;
			$("h2:nth-child("+String(iCard)+")").css('display','block');
			$("h2:nth-child("+String(iCard)+")+div").css('display','block');
			var session = readCookie('session');
			createCookie("card"+session,$("h2:nth-child("+String(iCard)+")").html(),365);
			selectCard();
			return;
		}
		iCard++;
	}
}

function selectCard()
{
	var session = readCookie('session');
	var card = readCookie("card"+session);
	if (card == null || card == '')
	{
		$("#card_list ul li:nth-child(1)").css("color","yellow");
		var cardName = $($("#card_list ul li:nth-child(1)")).html();
		var session = readCookie('session');
		createCookie("card"+session,cardName,365);
	}
	else
	{
		var iCard = 1;
		var nthChildLast = $("#card_list ul li:nth-last-of-type(1)");
		while(1) {
			var nthChild = $("#card_list ul li:nth-child("+String(iCard)+")");
			if (nthChild.html() == card)
			{
				nthChild.css('color','yellow');
				var session = readCookie('session');
				createCookie("card"+session,nthChild.html(),365);
			}
			else nthChild.css('color','#dedede');
			iCard++;
			if (nthChild.html() == nthChildLast.html()) break;
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
		var nthChildLast = $("#card_list ul li:nth-last-of-type(1)");
		while(1) {
			var nthChild = $("#card_list ul li:nth-child("+String(iCard)+")");
			nthChild.css('color','#dedede');
			if (nthChild.html() == nthChildLast.html()) break;
			iCard++;
		}
		hideCard();
		var cardName = $(this).html();
		var session = readCookie('session');
		createCookie("card"+session,cardName,365);
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
	});
}

function clickOption(option)
{
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
			selectSession();
			showCard();
			$("#session_list ol li").click(function(){
				var currSession = 1;
				var cstr = readCookie('session');
				if (cstr != "") currSession = Number(cstr);
				var iSession = 1;
				while (iSession > 0)
				{
					var nthChild = $("#session_list ol li:nth-child("+String(iSession)+")");
					if (nthChild.css("color") == null || nthChild.css("color") == "") break;
					if (currSession == iSession)
					{
						nthChild.css('color','#dedede');
					}
					else if ($(this).html() == nthChild.html())
					{
						cstr = iSession.toString();
						if (cstr.length < 2) cstr = String(0).concat(cstr);
						createCookie("session",cstr,365);
					}
					iSession++;
				}
				$(this).css("color","yellow");
				location.reload();
//				hideCard();
//				document.getElementById("content").
//				showCard();				
			});
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

