const sum = require('./math');

test("add 1 + 2", () => {
    expect(sum(1, 2).add).toBe(3);
})