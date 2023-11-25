
<section class="panel page-footer">
	
	<div class="container">
	
		<div class="footer-container">
				
			<div class="footer-container__col">
				<?php  $copyright =  str_replace('{date}', date('Y'), get_field('copyright_message'));?>
				<div class="copyright-message"><?php echo $copyright;?></div>
			</div>

			<div class="footer-container__col footer-container__col--right">

				<div class="logo-container">
					<div class="logo-container__col">
						<div class="roffey-logo"></div>
					</div>	
					<div class="logo-container__col">
						<div class="wbc-logo"></div>
					</div>	
				</div>	
			</div>
		
		</div>
	</div>
	
</section>
	


<div id="cookie-accept" class="cookie-accept">
	<div class="cookie-accept__container">
		<div class="cookie-accept__content">
			This website uses cookies for core functionality.  It also uses analytics cookies to allow us to see how the site is used. The cookies do not identify you. If you continue to use this site we will assume that you are happy with this.  If you would like to know more please read our <a href="<?php echo get_field('privacy_policy_url', 'options');?>">privacy policy</a>.
		</div>
		<div class="cookie-accept__controls">
			<button id="cookie-accept__allow" class="cookie-accept__allow">Allow Cookies</button>
		</div>
	</div>
</div>


<?php wp_footer(); ?>


<?php echo get_field('embed_script_footer','options');?>


</body>
</html>
