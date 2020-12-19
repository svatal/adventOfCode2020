export function doIt() {
  const parsed = input.split(`,`).map((n) => +n);
  const first = [...parsed];
  for (let i = parsed.length; i < 2020; i++) {
    const prev = first[i - 1];
    const prevIdx = first.lastIndexOf(prev, i - 2);
    const current = prevIdx === -1 ? 0 : i - 1 - prevIdx;
    first.push(current);
  }
  const lastIdxs = new Map<number, number>(
    parsed.slice(0, parsed.length - 1).map((n, i) => [n, i])
  );
  let prev = parsed[parsed.length - 1];
  for (let i = parsed.length; i < 30000000; i++) {
    const prevIdx = lastIdxs.get(prev);
    lastIdxs.set(prev, i - 1);
    const current = prevIdx === undefined ? 0 : i - 1 - prevIdx;
    prev = current;
  }
  console.log(first[first.length - 1], prev);
}

// const input = `0,3,6`;
const input = `11,18,0,20,1,7,16`;
