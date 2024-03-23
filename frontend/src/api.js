import { cryptoData, cryptoAssets } from "./data";

export function fetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 500);
  });
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 500);
  });
}

// REAL API CALL:
//
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     "X-API-KEY": "2NFUATIor1kha2cA91ZZIHhE9PjkNukgoCc52lCT6gY=",
//   },
// };

// export async function fetchCrypto() {
//   const result = await fetch("https://openapiv1.coinstats.app/coins", options);
//   const data = await result.json();
//   console.log(data);
// }
//__________________________________________________________________________________
