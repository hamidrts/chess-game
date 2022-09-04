import { testHook } from "../hooks/testHook";

export class Test {
  constructor(a, b, array) {
    this.a = a;
    this.b = b;
    this.array = array;
  }

  testFunction() {
    const c = this.a + this.b;
    this.array.push(c);
    const f = testHook(this.a);
    return f;
  }
}
