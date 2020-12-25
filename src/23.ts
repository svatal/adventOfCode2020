interface ICell {
  n: number;
  next: ICell;
}

export function doIt() {
  let cupsA = input.split(``).map((cup) => +cup);
  // zero will not be used
  const cups: ICell[] = [];
  for (let i = 1; i <= max; i++) {
    cups[i] = { n: i, next: (undefined as unknown) as ICell };
  }
  for (let i = 1; i < max; i++) cups[i].next = cups[i + 1];
  for (let i = 0; i < cupsA.length - 1; i++)
    cups[cupsA[i]].next = cups[cupsA[i + 1]];
  let currentCup = cups[cupsA[0]];
  cups[cupsA[cupsA.length - 1]].next = cups[cupsA.length + 1]; // attach last explicit to first implicit one
  cups[cups.length - 1].next = currentCup; // connect end with start

  let move = 0;
  while (move++ < moves) {
    const takeHead = currentCup.next;
    currentCup.next = takeHead.next.next.next;
    let destination = currentCup.n - 1;
    while (
      destination === takeHead.n ||
      destination === takeHead.next.n ||
      destination === takeHead.next.next.n ||
      destination <= 0
    ) {
      destination--;
      if (destination <= 0) destination = max;
    }
    const destCup = cups[destination];
    takeHead.next.next.next = destCup.next;
    destCup.next = takeHead;
    currentCup = currentCup.next;
  }
  console.log(cups[1].next.n * cups[1].next.next.n);
}
/*
const max = 9;
const input = `389125467`;
const moves = 100;
/* */
const max = 1000000;
const input = `925176834`;
const moves = 10000000;
/* */
