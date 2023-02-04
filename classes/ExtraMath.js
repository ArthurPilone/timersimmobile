export {ExtraMath as ExtraMath}

const ExtraMath  = {
	gaussianRandom,
	clamp,
	minutesToMs
}

// The following function was taken from:
	// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve, 
function gaussianRandom(mean, stdev){
	let u = 1 - Math.random();
	let v = Math.random();
	let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	return z * stdev + mean;
}

function clamp(val,min,max){
	if(val < min){
		return min
	}else if(val > max){
		return max
	}else{
		return val
	}
}

function minutesToMs(min){
	return 60000*min;
}