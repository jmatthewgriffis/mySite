<?php include("frame_top.php"); ?>
<?php include("frame_header_and_nav.php"); ?>

	<section id="music" class="content">

		<div class="background" id="musicPic">
		</div><!--end background-->

		<article id="whatPage">
			<h2><a href="about.php"><img src="images/people/me3.jpg" alt="This is the Music page." title="Drop the beats!"/></a>
				Music I've dreamed up<br>composed and performed</h2>
		</article>

		<!--the work-->

		<!--big thanks to media.io for providing audio conversion-->

		<article class="thing music">
			<audio controls>
				<source src="music/spacejunk2.mp3" type="audio/mpeg">
				<source src="music/spacejunk2.ogg" type="audio/ogg">
					Your browser does not support the audio element.
			</audio>
			<h3>Space Pollution...2/2</h3>
			<p class="specs">February 2013</p>
			<p>This is the music for stage 2 of group project <a href="games.php"><span class="italics">Space Pollution Needs Solution</span></a>. I composed, performed and recorded the music using a Casio electronic keyboard, an iPhone, and GarageBand. Forgive the background noise - recording conditions were not ideal.</p>
		</article>

		<article class="thing music">
			<audio controls>
				<source src="music/spacejunk1.mp3" type="audio/mpeg">
				<source src="music/spacejunk1.ogg" type="audio/ogg">
					Your browser does not support the audio element.
			</audio>
			<h3>Space Pollution...1/2</h3>
			<p class="specs">February 2013</p>
			<p>This is the music for <a target="_blank" href="http://www.openprocessing.org/sketch/90457">stage 1</a> of group project <a href="games.php"><span class="italics">Space Pollution Needs Solution</span></a>. I composed, performed and recorded the music using a Casio electronic keyboard, an iPhone, and GarageBand. Forgive the background noise - recording conditions were not ideal.</p>
		</article>

		<article class="thing music">
			<audio controls>
				<source src="music/platformal_ware.mp3" type="audio/mpeg">
				<source src="music/platformal_ware.ogg" type="audio/ogg">
					Your browser does not support the audio element.
			</audio>
			<h3>Platformal Ware</h3>
			<p class="specs">December 2011</p>
			<p>This is the soundtrack to a game demo of the same name (<a href="games.php">available here</a>) I created as part of my application to graduate school. I composed, performed and recorded the music using a Casio electronic keyboard, a drum, an external mic, and a laptop.</p>
		</article>

	</section><!--end music-->

<?php include("frame_footer_and_bottom.php"); ?>