<!DOCTYPE html>
<!-- 

	COMP 1950 Homework #7: 404 Error demonstration
	File Name: 		lecture.html
	Author:			Calvin Jun
	Student Number:	A00237412
	
-->
<html>
	<head>
		<title>COMP 1950 Lecture</title>
		<meta charset = "utf-8"/>
		<link rel = "stylesheet" href = "./css/basic.css" title = "Basic Page Style" />
		<link rel = "shortcut icon" href = "favicon.ico" type = "image/x-icon"/>
		<script type = "text/javascript" src = "http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type = "text/javascript" src = "./js/lecture.js"></script>
	</head>
	<body>
		<nav id = "main_nav">
			<div id = "main_nav_home"><div></div></div>
			<div id = "main_nav_lecture"><div></div></div>
			<div id = "main_nav_practice"><div></div></div>
			<div id = "main_nav_quiz"><div></div></div>			
		</nav>
		<section>
			<article>
				<?php include('./lecture_content/session01.html'); ?>
				<div id = "arrow_right"></div>
				<div id = "arrow_left"></div>
			</article>
		</section>
	</body>
</html>
