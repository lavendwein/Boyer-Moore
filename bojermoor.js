let fs = require('fs');
let arg = process.argv;
let t = arg[2].toString();
let s = fs.readFileSync(arg[3]).toString();

let lenT = t.length;
let lenS = s.length;

let result = new Array();

function badChar(shift, char){
	if (shift[char])
		return shift[char];
	return 0;
}

fs.readFile(arg[3], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	
	let shift1 = new Array();
	for (let j = 0; j < lenT - 1; j++)
		shift1[t.charAt(j)] = j + 1;
	
	let shift2 = new Array();
	let z = new Array();
	let maxZ = 0;
	let maxZidx = 0;
	
	for (let j = 0; j <= lenT; j++){
		z[j] = 0;
		shift2[j] = lenT;
	}
	
	for (let j = 1; j < lenT; j++){
		if (j <= maxZ)
			z[j] = Math.min(maxZ - j + 1, z[j - maxZidx]);
		
		while (j + z[j] < lenT && t.charAt(lenT - 1 - z[j]) == t.charAt(lenT - 1 - (j + z[j])))
			z[j]++;
		
		if (j + z[j] - 1 > maxZ){
			maxZidx = j;
			maxZ = j + z[j] - 1;
		}
	}
	
	for (let j = lenT - 1; j > 0; j--)
		shift2[lenT - z[j]] = j;
	
	for (let j = 1; j <= lenT - 1; j++){
		if ((j + z[j])  == lenT){
			for(let k = 0; k <= j; k++)
				if (shift2[k] == lenT)
					shift2[k] = j;
		}
	}
	
	let i = 0;
	let m = 0;
	
	while (i <= lenS - lenT){
		let j = lenT - 1;
		while (j >= m && s.charAt(i + j) == t.charAt(j))
			j--;
		if (j < m) {
			result.push(i + 1);
			m = lenT - shift2[0];
			j = -1;
			i += shift2[0];			
		}else{
			m = 0;
			i = Math.max((i + shift2[j + 1]), (i + j + 1 - badChar(shift1, s.charAt(i + lenT - 1))));	
		}
	}
	
	console.log(result);
});










	