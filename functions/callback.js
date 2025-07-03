const test = function (cb) {
    console.log("function test")
    console.log(cb)
    typeof cb === "function" && cb(30)


}

const fn = function (param) {
    console.log("callback anonymous function")
    console.log(param)
}
// fn(30)

test(fn)
