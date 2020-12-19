const Floor = ".";
const Empty = "L";
const Occupied = "#";
type State = typeof Floor | typeof Empty | typeof Occupied;

export function doIt() {
  const parsed = input
    .split(`\n`)
    .map((line) => line.split("").map((s) => s as State));

  const first = findEquilibrum(parsed, (actual) =>
    getNext(actual, occupiedNeighbours, 4)
  );
  const second = findEquilibrum(parsed, (actual) =>
    getNext(actual, occupiedNeighbours2, 5)
  );
  console.log(countOccupied(first), countOccupied(second));
}

function findEquilibrum(
  actual: State[][],
  getNext: (arr: State[][]) => State[][]
) {
  do {
    const next = getNext(actual);
    if (snapshot(actual) === snapshot(next)) return actual;
    actual = next;
  } while (true);
}

function countOccupied(arr: State[][]) {
  return arr
    .map((l) => l.filter((s) => s === Occupied).length)
    .reduce((a, b) => a + b);
}

function snapshot(arr: State[][]) {
  return arr.map((l) => l.join("")).join("\n");
}

function getNext(
  arr: State[][],
  occupiedNeighbours: (arr: State[][], x: number, y: number) => number,
  leavingCount: number
) {
  return arr.map((l, y) =>
    l.map((s, x) =>
      s === Empty && occupiedNeighbours(arr, x, y) === 0
        ? Occupied
        : s === Occupied && occupiedNeighbours(arr, x, y) >= leavingCount
        ? Empty
        : s
    )
  );
}

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function occupiedNeighbours(arr: State[][], x: number, y: number) {
  return directions
    .map(([dx, dy]) =>
      y + dy >= 0 && y + dy < arr.length ? arr[y + dy][x + dx] : undefined
    )
    .filter((s) => s === Occupied).length;
}

function occupiedNeighbours2(arr: State[][], x: number, y: number) {
  return directions
    .map(([dx, dy]) => {
      let cx = x + dx;
      let cy = y + dy;
      while (cx >= 0 && cy >= 0 && cy < arr.length && cx < arr[0].length) {
        const candidate = arr[cy][cx];
        if (candidate !== Floor) return candidate;
        cx += dx;
        cy += dy;
      }
      return undefined;
    })
    .filter((s) => s === Occupied).length;
}

/*
const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
/**/

const input = `.LLLL.L.LLLL.LL.LLL.L.LLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLL.LLL.LLLLL.LLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLL..LLLL.LLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLLLLLLL.LL.LLLLL.LLLL.L.LLLL.LLLLLL.L.LLL.LL..LLL.LLLLLLLLLLLLLLLLLL.L.LLL.LLLLLLL.LLLLL
LLLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLL.L.LLL
LL.LLLL.LLLLLLL.L.LLL.LLLLLL.L.LL.LLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LL.LL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLL.LLLLL.LLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLL.LLLL.L.LLLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LL.L.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLL.
LLLLLLLLLLLLLLL.LLLLLLLLLLL..LLLL.LLLLLLLL.LLLLLL.LL.L.LLLLL.LLL.LLLLLLLLLLLLL.LLLLLLL.L.LLLL
....L..L.....L......LL...L.LL.......L...L.L......L.L.LLL....L..L....L.LL..LLL....LL..L..L...L
LLLLLLLLLLLLL.L.LLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLL.LLLL.LLL.LLLLL.LLLLLLLLLLLL.
LLLLLLL.LLLLLLL.LLLLLLLLLL.L.LLLL.LLLLL.LL.LLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLLL.LL.LL.LLLLLLLL.LLLLLLLLLLLLLLLLLL..LLLL.LLLLLLLLLLLLL
LLLL.LL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLL.L.LLL
LLLLLLL..LLLLLL.LLLLL..LLLLL.LLLL.LLLLLLLLLLL.LLL.LLL..LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL..LLLL
...L...L..LL....L.......L...L.......LL........LL.....LL....L.....LL............L..LL....L....
LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLL..LLLLLLLL.LLLLLLLL.LLL.L.LLLLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.L.LLLLLLLLLLL.LLLLL.LLLLLLL..LLLLLL.LLLLLL.LLLLLLLLLLLLL.L.LLLLL
LLLLLLL.LLLLLLLLLL.L..LLLLLLLLLLL.L.L.LLLLLLLLLLL.LLLL.LLLLL.LLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLL.LLLLLLLLLLLLL.L.LLLL.LLLLLLLLL.LLLLLLLL..LLLL.LLLLLLLLLLLLL
LLLLLLLLLLLL.LL.LLLLL.LLLLLL.LLLLLLLLLLLLL..LLLLL.LLLL.LLLLL.LLL.LLLLLLLL.LL.LLLLLLLLLL...LLL
LLLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.L.LLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.L.LL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLL.LL.LLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLL.L.LLLLL
...........LL.....L.LL....L....L..LL..LL.L.LLLL........LL.L.LL..L......L...LL...LL..L.L......
LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLL.LL.LLLLLL.LLLL.LLL.LLLLL..LLLLLLLLLLLLLLLLLLLLL.LLLLL
LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLL.L.LLLLLLLLLLLLL.LLLLL
LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLL..LLLLL.LLLLLLLLLLLLL
LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLL.L..LLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLL..LLLLLLL.LLLLL.LLLLLL.LLLL.LLLL.LLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLL.LLLLL
LL.LL...L....LLL.L.L....LL.L.....L...LLL..LL.......L.......L.......L..L......LLL..L.LL..LL..L
LLLL.LL.LLLLL.L.LLLLLLLLLLLL.LLLL..LLLLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LL.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLL.L.LLLLLLLLLLLLLL.LLLLLLLL.LLLL
LLLLL.L.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLL..LLLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLLLLLLLLLL.L.LLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLL.LLLLL
L.LLLLLLLLLLLLL..LLLLLLLLLLL..LLL.LLLLLLLL.LLLLL...LLL.LLLLLLLLL.LLLLLLLLLLL.LL.LLLLLLLLLLLLL
.L......LL...L.L....L...L...........L.LL...L.LLLLL.....LL....L......L.LL..L..L.....L...L.L.LL
LLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLL.LLLL.LLL.LLLLLL.LLL..LLLLLLLLL.LLLLLLLLLLLLLL..LLLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLL.LLLLLLLLLL.LLLLL.LLLLLLLL.LLLLL.LLLLL.L.LLLLL
LLLLLLLLLLLLLLL.LLLLL.LLL.LL.LLLL.LLLLLLLLLLLLLLLLLLLL.LL.LLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL
LLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLL.L.LLLLL.LLL.LLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL
LL.L.LLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLL.LLLLL
LLLL.LLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.L.LLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LLLLL.LLLLL.LLLLLL.LL.LL.LLLLLLLLLLLLL
..L....L.L.LL.L.........L...LL.L....LL......LL..LL.L.L.....L..L..L..L..LL.L...L..L....L......
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLL..LLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLLLLL.LL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.L.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL..LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLL.L.LLLL.L.LLLLLLLLLLL..LLLLLLLLLL.LL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLL.LL.LLLLLLLL..L.LL.LLLLLLLLLLLLL
.L......L....L.L.L...LLLL......LL...LL...L...L......L..L...........L......L.......L....L.L...
LL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LL.LLLLL.LLLLLLLLLLL.LLL.LLLLL.LLLLLLLL.LLLLL.LL.LLLL.LLLLL
L.LLLLL.LLLLLLL.LLLLL.LLLLLL.LL.LLLLLLLLLL.L.LLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLL.LLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLL.LLLLLLLLLLLLLLL.L.LLLLLLLLLLLL.LLLLL.LLLLLLLL.LLLLLLL.LLLLL
.LLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.L.LLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLLLLLLL.L.LLLL.LLLLLLLLLLL.LLL.LLLL.LLL.LLLLL.LLL.LLLLLLLLLL.LLLLLLL..LLLL
.L.....L...L....L.LL............LL..L.LL.....LLL..L.............L...........L...L.L.L........
LLLLLLLLLLLLL.L.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLL.LLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL..LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLL.LLLLL
LL.LLLLLLLLLLLL.LLLLL.LLL.LL.LLL..LLLLLLLL.L.LLLL.LLLLLLLLLLLLLL.LLLLLL.L.LLLLLLLLLLLL.L.LLLL
LLL.LLL.LLLLLLLLLLLL..LLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLL.L.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLL.LL.L.LLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL..LLLL..LLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLL.LL.LL
.LLLLLL.LL.LLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLL.LLL.LLLLLLL.LLLLL
LL.L.L...L...L...LLL.......LLL..L.L...L.......L......L.LL.......L..LLL.L..L.L.LL..L..L.L.LLL.
LLLLLLL.LLLLLL..LLLLL.LLLLLL.LLLL.LLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLL.LLLLLLLL.LLLLLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLL
LLLLLLLLLLLLLLL.LL.LL.LLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LLLL.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLL
LLLLLLL.LL.LLLL..LLL.LLLLLLLL.L.L.LLLLLLLL.LLLLLL.L.LL.LLLLLL.LL.LLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLL.LLLLL.LL.LLLLLLLLL.LLL.LLLL.
L.LLLLLLLLLLLLLLLLLLL.LLLL.L.LLLL.L.LLLL.L.LLLLLL.LLLL.LLLLLL.L.LLLLLLLLLLLLLLLLLLLLLLL.LL.LL
.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLL.LLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLL.LLLLL.L.LLLLL
LL....L....L..L.L.....L.L...L...L.....L.....L....LLL..L.L..L..L.LL.L...L.LLL.......L....L.LL.
LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL.LLL.LLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLL.LLLLLLL.LLLL.LLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.L..LLLLLLLLLL.LLLLL
LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLL.L.LLL.LLLLLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLL.LLLLLL.LLLLLLLLLLL.LLLLL.LLLLLLLLLLLLL
LLLL.LL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLL.L.LLLLLLLL.LLLLL.LLLLLLL.LLLLL
LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLL..LLLLLLLL.LLLLLL.LLLL.LLL.LLLLL.LLLLLLLLLLLLLL.LLL.LLL.LLLLL
LLLLLLLLLLLLLLL..LLLLLLLLLLLLLLLLLLLL..LLL.LLLLLL.LL.L.LLL.LLLLLLLLL..LLL.LLLLL.LLLLLLL.LLLLL
..L..L..L.L.......L..LL...L.L..LL...L............L.L...L.....L...LL..LL......L.L...L.....L..L
LLLLL.LLLLLLLLLLLLLLL.LLLLLL.LLLL.LL.LLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL
L.LLLLL.LLLLLLL.LLLLLLL.LLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.L.LLL.LL.LLL.LLLLLL
LLLLLLL.LLLLLLLLL.LLLLLLLLLLL.L.L.LLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.L.LLL.LLL.LL..LLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLL.LLLL.LLLL.LLLLLLLL.LLLLL.LLL..LL.LLLLL
LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLL.LL
LLLLLL.LLLLLLLL.LLL...LLLLLL.LLLL.LLLLLLLL.LLLLLL.LLLLLLLLLL.L.L.LLLLLLLL.LLLLL.LLLLLLL.L.LL.
LL.LL.L.LLLLLLLLLLLLL.L.LLLLLLLLLLLLLLLLLL.LLLLLL..LLL.LLLLLLLLLLLLLLLLL..LLLLL.LLLLLLL.LLLLL
LLLLLLLLLLLLLLL.LLL.LL.LLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLL.LLLLLLLLL.LL.L.LLLLLLLLLLLLL
LLLLLLL.LLLL.LL.LLLLL.LLLLLL.LLLL.L.LLLLLLLLLLLLLLLLLLLLLLLLLLL..LLLLLLLLL.LLLLLLLLLLLL.LLLLL
L.LLLLL.LLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLL.L.LLLLLLLLLLLLL..LLLL
LLLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLL.LLL.LLLLLLLLLL..LL.LLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLL`;
/**/
