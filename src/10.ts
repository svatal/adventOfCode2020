export function doIt() {
  const joltage = input
    .split(`\n`)
    .map((j) => +j)
    .sort((a, b) => a - b); // we do not want to use default string sorting! :)
  joltage.push(joltage[joltage.length - 1] + 3); // our target
  const diffs = joltage.map((j, i) => j - (joltage[i - 1] || 0));
  const diffsCounted = diffs.reduce(
    (map, d) => map.set(d, (map.get(d) || 0) + 1),
    new Map<number, number>()
  );
  console.log(diffsCounted.get(1)! * diffsCounted.get(3)!, count(joltage));
}

const cache = new Map<string, number>();

function count(joltage: number[], start = 0): number {
  const cacheKey = `${start}/${joltage.length}`;
  let c = cache.get(cacheKey);
  if (c) return c;
  c =
    joltage
      .filter((j) => j - start <= 3)
      .map((j, i) => count(joltage.slice(i + 1), j))
      .reduce((a, b) => a + b, 0) || 1;
  cache.set(cacheKey, c);
  return c;
}

const input = `47
99
115
65
10
55
19
73
80
100
71
110
64
135
49
3
1
98
132
2
38
118
66
116
104
87
79
114
40
37
44
97
4
140
60
86
56
133
7
146
85
111
134
53
121
77
117
21
12
81
145
129
107
93
22
48
11
54
92
78
67
20
138
125
57
96
26
147
124
34
74
143
13
28
126
50
29
70
39
63
41
91
32
84
144
27
139
33
88
72
23
103
16`;
