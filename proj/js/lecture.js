/*

	COMP 1950 Home Page CSS
	File Name: 		lecture.js
	Author:			Calvin Jun
	Student Number:	A00237412

*/

/*
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
*/

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

function countDups()
{	
	var nDups = 0;
	var nthChildLast = $("#card_list ul li:nth-last-of-type(1)");
	var iItem0 = Number(readCookie("card_panel_0"));
	if (iItem0 < 1) iItem0 = 1;
	var nthChild0 = $("#card_list ul li:nth-child("+String(iItem0)+")");
	var iItem = 1;
	while (iItem < iItem0)
	{
		nthChild = $("#card_list ul li:nth-child("+String(iItem)+")");
		if (nthChild.html() == nthChild0.html()) nDups++;
		if (nthChild.offset().top == nthChildLast.offset().top) break;
		iItem++;
	}
	return nDups;
}

function showCard()
{
	var nDups = countDups();
//	alert('ttt');
	var nthChildLast = $("#content h2:nth-last-of-type(1)");
	var session = readCookie('session');
	var cstr = readCookie('card'+session);
	if (cstr == '' || cstr == null || cstr == "undefined")
	{
		cstr = $("#card_list ul li:nth-child(1)").html();
		if (cstr == '' || cstr == null) return;
	}
	else cstr = cstr.replace("&","&amp;");
//	alert(cstr);
	var iItem = 1;
	var iH2 = 0;
	var nH2 = readCookie("card_list_nh2");
//	alert(nH2);
	while (iH2 < nH2)
	{
		var nthChild = $("#content h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (nthChild.html() == cstr)
			{
				if (nDups > 0) nDups--;
				else
				{
					$("#content h2:nth-child("+String(iItem)+")").css('display','block');
					$("#content h2:nth-child("+String(iItem)+")+div").css('display','block');
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
	var session = readCookie('session');
	var cstr = readCookie('card'+session);
	if (cstr == '' || cstr == null || cstr == "undefined")
	{
		cstr = $("#card_list ul li:nth-child(1)").html();
		if (cstr == '' || cstr == null) return;
	}
	else cstr = cstr.replace("&","&amp;");
	var iItem = 1;
	var iH2 = 0;
	var nH2 = readCookie("card_list_nh2");
//	alert(nH2);
	while (iH2 < nH2)
	{
		var nthChild = $("#content h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (nthChild.html() == cstr)
			{
				if (nDups > 0) nDups--;
				else
				{
					$("#content h2:nth-child("+String(iItem)+")").css('display','none');
					$("#content h2:nth-child("+String(iItem)+")+div").css('display','none');
					return;
				}
			}
			iH2++;
		}
		iItem++;
	}
}

function showPrevCard()
{
	var nDups = countDups();
	var iItem = 1;
	var iH2 = 0;
	var nH2 = readCookie("card_list_nh2");
	var session = readCookie('session');
	var cardName = readCookie('card'+session);
	var nthChildLast = $("#content h2:nth-last-of-type(1)");
	var nthChildPrev = null;
	while(iH2 < nH2) {
		var nthChild = $("#content h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (nthChild.html() == cardName)
			{
				if (nDups > 0) nDups--;
				else
				{
					if (nthChildPrev != null)
					{
						hideCard();
						createCookie("card"+session,nthChildPrev.html());
						selectCard();
						showCard();
					}
					return;
				}
			}
			iH2++;
			nthChildPrev = nthChild;
		}
		iItem++;
	}
}

function showNextCard()
{
	var cardFound = false;
	var nDups = countDups();
	var iItem = 1;
	var iH2 = 0;
	var nH2 = readCookie("card_list_nh2");
	var session = readCookie('session');
	var cardName = readCookie('card'+session);
	var nthChildLast = $("#content h2:nth-last-of-type(1)");
	while(iH2 < nH2) {
		var nthChild = $("#content h2:nth-child("+String(iItem)+")");
		if (nthChild.html() != undefined)
		{
			if (cardFound)
			{
				createCookie("card"+session,nthChild.html());
				selectCard();
				showCard();
				return;
			}
			else
			{
				if (nthChild.html() == cardName)
				{
					if (nDups > 0) nDups--;
					else
					{
						if (iH2 + 1 < nH2)
						{
							hideCard();
							cardFound = true;
						}
					}
				}
			}
			iH2++;
		}
		iItem++;
	}
}

function selectCard()
{
	var iCard = 1;
	var nthChildLast = $("#card_list ul li:nth-last-of-type(1)");
	while(1) {
		var nthChild = $("#card_list ul li:nth-child("+String(iCard)+")");
		nthChild.css('color','#dedede');
		if (nthChild.html() == nthChildLast.html()) break;
		iCard++;
	}
//	var nthChildLast = $("#card_list ul li:nth-last-child(1)");
	var card = $("#card_list ul li:nth-child(1)");
	var session = readCookie('session');
	var cardName = readCookie('card'+session);
	if (cardName == '' || cardName == null)
	{
		cardName = card.html();
		if (cardName == null || cardName == '') return;
		cardName = cardName.replace("&amp;","&");
		var session = readCookie('session');
		createCookie("card"+session,cardName,365);
	}
	else
	{
		cardName = cardName.replace("&","&amp;");
		var nDups = countDups();
		var iH2 = 0;
		var nH2 = readCookie("card_list_nh2");
		iItem = 1;
		while (iH2 < nH2)
		{
			var nthChild = $("#card_list ul li:nth-child("+String(iItem)+")");
			if (nthChild.html() != undefined)
			{
				if (nthChild.html() == cardName)
				{
					if (nDups > 0) nDups--;
					else
					{
						$("#card_list ul li:nth-child("+String(iItem)+")").css('color','yellow');
						return;
					}
				}
				iH2++;
			}
			iItem++;
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
//	var iCard = 1;
	var nH2 = 0;
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
		nH2++;
//		iCard++;
	}
	createCookie("card_list_nh2",nH2,365);
	document.getElementById("card_list").innerHTML = strList+"</ul>";
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
			initCards();
			selectCard();
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

