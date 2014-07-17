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

$(document).ready(function(){
	var pageNum = 1;
	var page = getCookie('page');
	if (page != '') pageNum = Number(page);
	$(".page:nth-child("+pageNum+")").css("display","block");
	$("#arrow_left").click(function(){
		var pageNum = 1;
		var page = getCookie('page');
		if (page != '') pageNum = Number(page);
		if (pageNum <= 1) return;
		$(".page:nth-child("+pageNum+")").css("display","none");
		pageNum--;
		$(".page:nth-child("+pageNum+")").css("display","block");
		document.cookie = "page = " + pageNum;
	});
	$("#arrow_right").click(function(){
		var pageNum = 1;
		var page = getCookie('page');
		if (page != '') pageNum = Number(page);
		pageNum++;
		if ($(".page:nth-child("+pageNum+")").css("display") == null) return;
		pageNum--;
		$(".page:nth-child("+pageNum+")").css("display","none");
		pageNum++;
		$(".page:nth-child("+pageNum+")").css("display","block");
		document.cookie = "page = " + pageNum;
	});
})
