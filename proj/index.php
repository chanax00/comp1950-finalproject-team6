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
		<link rel = "stylesheet" href = "./css/index.css" title = "Basic Page Style" />
		<link rel = "shortcut icon" href = "favicon.ico" type = "image/x-icon"/>
		<script type = "text/javascript" src = "http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type = "text/javascript" src = "./js/common.js"></script>
		<script type = "text/javascript" src = "./js/index.js"></script>
	</head>
	<body>
		<div class = 'body'>
			<section>
				<article>
					<div id = "content">
					<?php include('./lecture_content/courseinfo.htm'); ?>
					</div>
				</article>
			</section>
			<section>
				<div class = "dark_panel"></div>
				<div id = 'topic_list'></div>
			</section>
		</div>
		<?php include('top_panel.html'); ?>
	</body>
</html>
