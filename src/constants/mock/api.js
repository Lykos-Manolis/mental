export const MONTHLY_GRAPH_DATA = [
  {
    id: "positive",
    label: "Positive",
    color: "#41FFA9",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
    type: "line",
    showMark: false,
    area: true,
    stack: "total",
  },
  {
    id: "negative",
    label: "Negative",
    color: "#FF0055",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
    type: "line",
    showMark: false,
    area: true,
    stack: "total",
  },
  {
    id: "neutral",
    label: "Neutral",
    color: "lightgray",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
    type: "line",
    showMark: false,
    area: true,
    stack: "total",
  },
];

export const MONTHLY_SCATTER_DATA = [
  {
    data: [
      { id: 1, x: 7, y: 156 },
      { id: 2, x: 3, y: 89 },
      { id: 3, x: 11, y: 412 },
      { id: 4, x: 2, y: 267 },
      { id: 5, x: 9, y: 345 },
      { id: 6, x: 5, y: 198 },
    ],
    label: "Happiness",
    color: "orange",
  },
  {
    data: [
      { id: 1, x: 8, y: 234 },
      { id: 2, x: 1, y: 378 },
      { id: 3, x: 12, y: 145 },
      { id: 4, x: 6, y: 289 },
      { id: 5, x: 4, y: 456 },
      { id: 6, x: 10, y: 167 },
    ],
    label: "Sadness",
    color: "blue",
  },
  {
    data: [
      { id: 1, x: 3, y: 312 },
      { id: 2, x: 11, y: 178 },
      { id: 3, x: 2, y: 398 },
      { id: 4, x: 9, y: 145 },
      { id: 5, x: 5, y: 267 },
      { id: 6, x: 7, y: 198 },
    ],
    label: "Anger",
    color: "#FF0055",
  },
  {
    data: [
      { id: 1, x: 6, y: 278 },
      { id: 2, x: 4, y: 389 },
      { id: 3, x: 12, y: 167 },
      { id: 4, x: 1, y: 298 },
      { id: 5, x: 8, y: 189 },
      { id: 6, x: 3, y: 345 },
    ],
    label: "Disgust",
    color: "green",
  },
  {
    data: [
      { id: 1, x: 10, y: 156 },
      { id: 2, x: 2, y: 289 },
      { id: 3, x: 7, y: 198 },
      { id: 4, x: 5, y: 378 },
      { id: 5, x: 11, y: 234 },
      { id: 6, x: 4, y: 312 },
    ],
    label: "Fear",
    color: "purple",
  },
  {
    data: [
      { id: 1, x: 9, y: 189 },
      { id: 2, x: 1, y: 267 },
      { id: 3, x: 6, y: 345 },
      { id: 4, x: 12, y: 156 },
      { id: 5, x: 3, y: 289 },
      { id: 6, x: 8, y: 198 },
    ],
    label: "Surprise",
    color: "yellow",
  },
];

export const MONTHLY_EMOTIONS = {
  positive: {
    id: "positive",
    color: "#41FFA9",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
  },
  negative: {
    id: "negative",
    color: "#FF0055",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
  },
  neutral: {
    id: "neutral",
    color: "lightgray",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
  },
};

export const CHART_DATA = [
  { id: 0, value: 24, label: "anger", color: "#FF0055" },
  { id: 1, value: 76, label: "admiration", color: "white" },
];

export const userContacts = [
  { name: "John", phoneNumber: "6912345678", email: "john.doe@email.com" },
  { name: "Dave", phoneNumber: "6923456789", email: "" },
  { name: "Mary", phoneNumber: "", email: "mary.jones@email.com" },
  { name: "Jean", phoneNumber: "6945678901", email: "" },
  { name: "Jane", phoneNumber: "", email: "jane.brown@email.com" },
  { name: "Jim", phoneNumber: "", email: "jim.miller@email.com" },
  { name: "Jill", phoneNumber: "6978901234", email: "" },
  { name: "Jake", phoneNumber: "6989012345", email: "jake.garcia@email.com" },
];
