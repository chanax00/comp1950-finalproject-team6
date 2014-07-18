<!DOCTYPE html>
<!-- 

	COMP 1950 Final Project: Lecture Page
	File Name: 		lecture.php
	Author:			Calvin Jun
	Student Number:	A00237412
	
-->
<html>
	<head>
		<title>COMP 1950 Lecture</title>
		<meta charset = "utf-8"/>
		<link rel = "stylesheet" href = "./css/basic.css" title = "Basic Page Style" />
		<link rel = "stylesheet" href = "./css/lecture.css" title = "Basic Page Style" />
		<link rel = "shortcut icon" href = "favicon.ico" type = "image/x-icon"/>
		<script type = "text/javascript" src = "http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type = "text/javascript" src = "./js/common.js"></script>
		<script type = "text/javascript" src = "./js/lecture.js"></script>
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
					<div id = "arrow_right"></div>
					<div id = "arrow_left"></div>
				</article>
			</section>
			<section>
				<div class = "dark_panel"></div>
				<div id = "session_list">
					<ol>
						<li>tools and standards</li>
						<li>html5</li>
						<li>css technique</li>
						<li>css layouts</li>
						<li>responsive css</li>
						<li>css3</li>
						<li>javascript frameworks</li>
						<li>dynamic content</li>
						<li>templating, seo</li>
						<li>methodology</li>
						<li>project work</li>
					</ol>
				</div>
				<div id = "card_list"></div>
				<div id = "link_list"></div>
				<div id = "customization">
					<h2>Customization</h2>
					<form>
						<label for = "cust_bg_img">Background Image</label>
						<input id = "cust_bg_img" name = "cust_bg_img" type = "text"/>
					</form>
				</div>
			</section>
		</div>
		<?php include('top_panel.html'); ?>
	</body>
</html>
