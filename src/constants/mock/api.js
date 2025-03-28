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
      { x: 7, y: 156 },
      { x: 3, y: 89 },
      { x: 11, y: 412 },
      { x: 2, y: 267 },
      { x: 9, y: 345 },
      { x: 5, y: 198 },
    ],
    label: "Happiness",
    color: "orange",
  },
  {
    data: [
      { x: 8, y: 234 },
      { x: 1, y: 378 },
      { x: 12, y: 145 },
      { x: 6, y: 289 },
      { x: 4, y: 456 },
      { x: 10, y: 167 },
    ],
    label: "Sadness",
    color: "blue",
  },
  {
    data: [
      { x: 3, y: 312 },
      { x: 11, y: 178 },
      { x: 2, y: 398 },
      { x: 9, y: 145 },
      { x: 5, y: 267 },
      { x: 7, y: 198 },
    ],
    label: "Anger",
    color: "#FF0055",
  },
  {
    data: [
      { x: 6, y: 278 },
      { x: 4, y: 389 },
      { x: 12, y: 167 },
      { x: 1, y: 298 },
      { x: 8, y: 189 },
      { x: 3, y: 345 },
    ],
    label: "Disgust",
    color: "green",
  },
  {
    data: [
      { x: 10, y: 156 },
      { x: 2, y: 289 },
      { x: 7, y: 198 },
      { x: 5, y: 378 },
      { x: 11, y: 234 },
      { x: 4, y: 312 },
    ],
    label: "Fear",
    color: "purple",
  },
  {
    data: [
      { x: 9, y: 189 },
      { x: 1, y: 267 },
      { x: 6, y: 345 },
      { x: 12, y: 156 },
      { x: 3, y: 289 },
      { x: 8, y: 198 },
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
