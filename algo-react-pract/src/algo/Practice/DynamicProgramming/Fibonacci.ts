
export function Test() {
    // console.log(Fib(3))
    console.log(Fib(5))
}

function Fib(n: number): number {
    if(n <= 2) 
        return 1;
    return Fib(n - 1) + Fib(n - 2);
}