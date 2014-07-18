<!DOCTYPE html>
<!-- 

	COMP 1950 Final Project: Practice Page
	File Name: 		practice.php
	Author:			Calvin Jun
	Student Number:	A00237412
	
-->
<html>
	<head>
		<title>COMP 1950 Lecture</title>
		<meta charset = "utf-8"/>
		<link rel = "stylesheet" href = "./css/basic.css" title = "Basic Page Style" />
		<link rel = "stylesheet" href = "./css/practice.css" title = "Basic Page Style" />
		<link rel = "shortcut icon" href = "favicon.ico" type = "image/x-icon"/>
		<script type = "text/javascript" src = "http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type = "text/javascript" src = "./js/common.js"></script>
		<script type = "text/javascript" src = "./js/practice.js"></script>
	</head>
	<body>
		<div class = 'body'>
			<section>
				<article>
					<div id = "content">
					<?php
						if (!isset($_COOKIE['session']))
						{
							include('./lecture_content/session01.html');
							setCookie('session','01');
						}
						else include('./lecture_content/session' . $_COOKIE['session'] . '.html');
					?>
					</div>
				</article>
			</section>
			<section>
				<div class = "dark_panel"></div>
				<div id = 'practice_list'></div>
			</section>
		</div>
		<?php include('top_panel.html'); ?>
	</body>
</html>
