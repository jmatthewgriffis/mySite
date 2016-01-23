<!DOCTYPE html>
<html>
<head>
	<meta charset=utf-8 />
	<title>Portfolio History - J. Matthew Griffis</title>
	<link href="../../css/style.css" rel="stylesheet" />
	<link href="../../css/gallery.css" rel="stylesheet" />
	<link href="../../css/portfolio-history.css" rel="stylesheet" />
</head>
<body>
	<div id="wrap" class="wrap">
		<h1>The evolution of my Web site [interactive gallery]</h1>
		<a id="linkBack" href="../../">&larr; home</a>
	<?php
		if ($handle = opendir('images'))
		{
			$isFirst = true;
			$isRight = false;
			while (false !== ($entry = readdir($handle)))
			{
				if ($entry != "." && $entry != ".." && $entry != ".DS_Store")
				{
					$parts = explode('_', $entry);
					$label = "";
					$class = "";
					$linkStart = "<a target='_blank' href='$parts[0]'>";
					$linkEnd = "</a>";
					$mask = "<div class='site-mask'><p>Click to try it</p></div>";
					$gradient = "<div class='site-gradient'></div>";
					$arrow = "<span class='site-arrow'>&larr;</span>";

					if ($isRight) // Alternate float left and right.
					{
						$class = " class='rightF'";
					}
					$isRight = !$isRight;

					if ($isFirst) // First div is not a link.
					{
						$linkStart = "";
						$linkEnd = "";
						$mask = "";
						$gradient = "";
						$arrow = "";
						$isFirst = false;
					}
					else if ($parts[4] == "current") // Last div links back to main page.
					{
						$linkStart = "<a href='../../'>";
						$label = " (current design)";
						$mask = "<div class='site-mask'><p>Click to return home</p></div>";
					}

					echo "$linkStart<div$class>$gradient";
					echo "<img src='images/$entry'>";
					echo "<h2 class='site-year'>$parts[1]$label</h2><p class='site-desc'>$parts[3]</p>";
					echo "$mask$arrow</div>$linkEnd";
				}
			}
			closedir($handle);
		}
	?>
	</div>
</body>
</html>