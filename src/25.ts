export function doIt() {
  const [publicKey1, publicKey2] = input.split(`\n`).map((line) => +line);

  const ls1 = getLoopSize(publicKey1);
  const ls2 = getLoopSize(publicKey2);
  console.log(ls1, ls2);
  const first = apply(1, publicKey1, ls2);
  const second = apply(1, publicKey2, ls1);
  console.log(first, second);
}

function getLoopSize(publicKey: number) {
  let val = 1;
  let loopSize = 0;
  while (val !== publicKey) {
    val = apply(val, 7, 1);
    loopSize++;
  }
  return loopSize;
}

function apply(val: number, subjectNumber: number, loopSize: number) {
  for (let i = 0; i < loopSize; i++) {
    val *= subjectNumber;
    val %= 20201227;
  }
  return val;
}
/*
const input = `5764801
17807724`;
*/
const input = `11239946
10464955`;
