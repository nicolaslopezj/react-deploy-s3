export default function () {
  var args = Array.prototype.slice.call(arguments)
  return new Promise(function (resolve) {
    setTimeout.apply(null, [resolve].concat(args))
  })
}
