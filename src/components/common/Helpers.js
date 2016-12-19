export const delayDefault = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, 1000);
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