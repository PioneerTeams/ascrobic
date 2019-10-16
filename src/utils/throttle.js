const obj = {
  times: null
}
// 函数节流  fn函数 data 参数
function throttle(fn, data) {
  clearTimeout(obj.times)
  obj.times = setTimeout(() => {
    fn(data)
  }, 500)
}
export default throttle
