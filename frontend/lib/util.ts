// 小数点以下切り捨て
export const roundDown = (num: number) => Math.floor(num)

// 小数点以下切り上げ
export const roundUp = (num: number) => Math.ceil(num)

// 小数点以下四捨五入
export const roundOff = (num: number) => Math.round(num)

// 小数点以下五捨五超入
export const roundOffIncluding5 = (num: number) => {
  if (num * 10 % 10 === 5) {
    return Math.floor(num);
  } else {
    return Math.round(num);
  }
}