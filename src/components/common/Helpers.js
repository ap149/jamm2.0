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