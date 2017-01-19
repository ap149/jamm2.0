export const delayDefault = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    },1000);
  })
  return promise;
}

export const delayShort = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, 650);
  })
  return promise;
}

export const delayLong = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, 2000);
  })
  return promise;
}

export const cleanPhoneNumber = (phoneNumber, countryCode) => {
  let clean = phoneNumber.replace(/[\-\s\(\)]/gi,'');

  const checkArray = ['0','1','2','3','4','5','6','7','8','9', '+'];
  let checkChar = clean.substr(0,1);
	let checkIndex = checkArray.indexOf(checkChar);
	if (checkIndex == -1) {
		clean = clean.substr(1);
	}  

  checkChar = clean.substr(clean.length -1,1);
	checkIndex = checkArray.indexOf(checkChar);
	if (checkIndex == -1){
		clean = clean.substr(0, clean.length -1);
	}  

	checkChar = clean.substr(0,1);
  if (checkChar == '+') return clean.substr(1);
	
  if (clean.substr(0,2) == "07") {
    return countryCode + clean.substr(1);
	}

  if (clean.substr(0,2) == "44") {
    return clean;
  }

  return clean;

}