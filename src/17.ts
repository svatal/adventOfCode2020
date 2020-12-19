export function doIt() {
  const initial = input
    .split(`\n`)
    .map((line, y) =>
      line
        .split("")
        .map((cube, x) => ({ active: cube === "#", x }))
        .filter((c) => c.active)
        .map(({ x }) => ({ x, y }))
    )
    .reduce((a, b) => [...a, ...b])
    .reduce((set, pos) => set.add(`${pos.x},${pos.y},0,0`), new Set<string>());
  let state = initial;
  let turn = 1;
  do {
    const candidates = Array.from(
      Array.from(state.values())
        .map((pos) => getNeighbours(pos))
        .reduce((a, b) => [...a, ...b])
        .reduce((set, p) => set.add(p), new Set<string>())
        .values()
    );
    // console.log(candidates);
    state = candidates
      .filter((pos) => {
        const activeN = getNeighbours(pos).filter((p) => state.has(p)).length;
        // console.log(pos, activeN);
        return activeN === 3 || (state.has(pos) && activeN === 2);
      })
      .reduce((set, p) => set.add(p), new Set<string>());
  } while (turn++ < 6);
  const second = "";
  console.log(state.size, second);
}

function getNeighbours(pos: string) {
  const [x, y, z, w] = pos.split(",").map((n) => +n);
  return [-1, 0, 1]
    .map((x) =>
      [-1, 0, 1].map((y) =>
        [-1, 0, 1].map((z) => [-1, 0, 1].map((w) => ({ x, y, z, w })))
      )
    )
    .reduce((a, b) => [...a, ...b])
    .reduce((a, b) => [...a, ...b])
    .reduce((a, b) => [...a, ...b])
    .filter((p) => p.x !== 0 || p.y !== 0 || p.z !== 0 || p.w !== 0)
    .map((diff) => ({
      x: x + diff.x,
      y: y + diff.y,
      z: z + diff.z,
      w: w + diff.w,
    }))
    .map((p) => `${p.x},${p.y},${p.z},${p.w}`);
}

/*
export function doIt() {
  const initial = input
    .split(`\n`)
    .map((line, y) =>
      line
        .split("")
        .map((cube, x) => ({ active: cube === "#", x }))
        .filter((c) => c.active)
        .map(({ x }) => ({ x, y }))
    )
    .reduce((a, b) => [...a, ...b])
    .reduce((set, pos) => set.add(`${pos.x},${pos.y},0`), new Set<string>());
  let state = initial;
  let turn = 1;
  do {
    const candidates = Array.from(
      Array.from(state.values())
        .map((pos) => getNeighbours(pos))
        .reduce((a, b) => [...a, ...b])
        .reduce((set, p) => set.add(p), new Set<string>())
        .values()
    );
    // console.log(candidates);
    state = candidates
      .filter((pos) => {
        const activeN = getNeighbours(pos).filter((p) => state.has(p)).length;
        console.log(pos, activeN);
        return activeN === 3 || (state.has(pos) && activeN === 2);
      })
      .reduce((set, p) => set.add(p), new Set<string>());
  } while (turn++ < 6);
  const second = "";
  console.log(state.size, second);
}

function getNeighbours(pos: string) {
  const [x, y, z] = pos.split(",").map((n) => +n);
  return [-1, 0, 1]
    .map((x) => [-1, 0, 1].map((y) => [-1, 0, 1].map((z) => ({ x, y, z }))))
    .reduce((a, b) => [...a, ...b])
    .reduce((a, b) => [...a, ...b])
    .filter((p) => p.x !== 0 || p.y !== 0 || p.z !== 0)
    .map((diff) => ({ x: x + diff.x, y: y + diff.y, z: z + diff.z }))
    .map((p) => `${p.x},${p.y},${p.z}`);
}
*/

/*
const input = `.#.
..#
###`;
*/
const input = `..#..#..
.###..#.
#..##.#.
#.#.#.#.
.#..###.
.....#..
#...####
##....#.`;
