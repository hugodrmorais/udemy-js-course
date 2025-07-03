let n = "global";

function showN() {
    let n1 = "n1 local";

    if (true) {
        var n2 = "n2 inside if with var"; // 'var' variables are function-scoped, not block-scoped.
    }
    console.log(n2); // This will log "n2 inside if with var" because n2 is accessible outside the if block.
    console.log("value of n1: " + n1);
    console.log("value of n2: " + n2);
}
showN();

console.log("value of n in global scope: " + n);

function outerFn() {
    let n = "n local in function outerFn"; // This 'n' shadows the global 'n'.

    function innerFn() {
        n = "n local in function innerFn"; // This 'n' refers to the 'n' in outerFn's scope.
        console.log(n);
    }
    innerFn(); // Calls innerFn, which changes 'n' in outerFn's scope and logs it.
    console.log(n); // Logs the changed 'n' from outerFn's scope.
}

outerFn();
