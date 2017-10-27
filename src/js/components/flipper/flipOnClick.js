// import $ from 'jquery';

export default function flipOnClick($elm, overrides){
	const defaults = {
		speed: 'default'
	};

	const options = Object.assign({}, defaults, overrides);

	if (options.speed == 'fast') {
		$elm.addClass('flip--fast');
	}

	if (options.speed == 'slow') {
		$elm.addClass('flip--slow');
	}

	$elm.click(function(){
		$(this).toggleClass('flipped');
	});
}
