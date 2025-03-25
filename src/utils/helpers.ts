export const delay = (t: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  })
}
