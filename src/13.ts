export function doIt() {
  const [timeS, bussesS] = input.split("\n");
  const time = +timeS;
  const busses = bussesS.split(",");
  const first = busses
    .filter((b) => b !== "x")
    .map((b) => +b)
    .map((b) => ({ b, minutes: Math.ceil(time / b) * b - time }))
    .sort((a, b) => a.minutes - b.minutes)[0];
  const second = busses
    .map((b, i) => ({ b, i }))
    .filter((i) => i.b !== "x")
    .map(({ b, i }) => ({ multiplicator: BigInt(b), offset: BigInt(i) }))
    .reduce(
      (input, next) => {
        let { current } = input;
        while ((current + next.offset) % next.multiplicator !== BigInt(0)) {
          current += input.repeatsEvery;
        }
        return {
          current,
          repeatsEvery: input.repeatsEvery * next.multiplicator,
        };
      },
      { current: BigInt(0), repeatsEvery: BigInt(1) }
    );
  console.log(first.b * first.minutes, second.current);
}

/*
const input = `939
7,13,x,x,59,x,31,19`;
/**/

const input = `1000677
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,661,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,521,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,19`;
/**/
