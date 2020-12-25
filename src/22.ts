export function doIt() {
  let [p1, p2] = input.split(`\n\n`).map((player) =>
    player
      .split("\n")
      .slice(1)
      .map((n) => +n)
  );

  const first = classic([...p1], [...p2]);
  const second = recursive(p1, p2);

  console.log(
    first.cards
      .reverse()
      .reduce((prev, current, i) => prev + current * (i + 1)),
    second.cards
      .reverse()
      .reduce((prev, current, i) => prev + current * (i + 1))
  );
}

const subgameResults = new Map<string, boolean>();
function recursive(
  p1: number[],
  p2: number[]
): { cards: number[]; winnerP1: boolean } {
  const previous = new Set<string>();
  while (p1.length > 0 && p2.length > 0) {
    const state = p1.join(",") + ";" + p2.join(",");
    if (previous.has(state)) {
      break;
    }
    previous.add(state);
    const c1 = p1.shift()!;
    const c2 = p2.shift()!;
    if (p1.length < c1 || p2.length < c2) {
      if (c1 > c2) {
        p1.push(c1, c2);
      } else {
        p2.push(c2, c1);
      }
    } else {
      const sp1 = p1.slice(0, c1);
      const sp2 = p2.slice(0, c2);
      const state = sp1.join(",") + ";" + sp2.join(",");
      if (!subgameResults.has(state)) {
        subgameResults.set(state, recursive(sp1, sp2).winnerP1);
      }

      if (subgameResults.get(state)) {
        p1.push(c1, c2);
      } else {
        p2.push(c2, c1);
      }
    }
  }
  return { cards: [...p1, ...p2], winnerP1: p1.length > 0 };
}

function classic(p1: number[], p2: number[]) {
  p1 = [...p1];
  p2 = [...p2];
  while (p1.length > 0 && p2.length > 0) {
    const c1 = p1.shift()!;
    const c2 = p2.shift()!;
    if (c1 > c2) {
      p1.push(c1, c2);
    } else {
      p2.push(c2, c1);
    }
  }
  return { cards: [...p1, ...p2], winnerP1: p1.length > 0 };
}
/*
const input = `Player 1:
43
19

Player 2:
2
29
14`;
/*
const input = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;
/**/

const input = `Player 1:
18
19
16
11
47
38
6
27
9
22
15
42
3
4
21
41
14
8
23
30
40
13
35
46
50

Player 2:
39
1
29
20
45
43
12
2
37
33
49
32
10
26
36
17
34
44
25
28
24
5
48
31
7`;
/** */
