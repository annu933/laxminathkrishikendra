import Sum from "./sum";

test("testing for sum function", () => {
    let a = 40;
    let b = 20;
    let output = 30;
    expect(Sum(a, b)).toBe(output);

})