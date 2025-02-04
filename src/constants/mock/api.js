export const MONTHLY_GRAPH_DATA = [
  {
    id: "positive",
    label: "Positive",
    color: "green",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
  },
  {
    id: "negative",
    label: "Negative",
    color: "red",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
  },
  {
    id: "neutral",
    label: "Neutral",
    color: "yellow",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
  },
];

export const MONTHLY_EMOTIONS = {
  positive: {
    id: "positive",
    color: "green",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
  },
  negative: {
    id: "negative",
    color: "red",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
  },
  neutral: {
    id: "neutral",
    color: "yellow",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
  },
};

export const CHART_DATA = [
  { id: 0, value: 73, label: "admiration", color: "rgba(255, 215, 0, 1)" },
  { id: 1, value: 45, label: "amusement", color: "rgba(255, 192, 203, 1)" },
  { id: 2, value: 82, label: "anger", color: "rgba(255, 0, 0, 1)" },
  { id: 3, value: 31, label: "annoyance", color: "rgba(255, 99, 71, 1)" },
  { id: 4, value: 67, label: "approval", color: "rgba(50, 205, 50, 1)" },
  { id: 5, value: 28, label: "caring", color: "rgba(255, 182, 193, 1)" },
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

export const topConversations = [
  {
    id: 1,
    name: "Jane Doe",
    image: "../src/assets/avatars/avatar_1.jpeg",
    date: "01-05",
    message: "👍🏻",
  },
  {
    id: 1,
    name: "Dave Grohl",
    image: "../src/assets/avatars/avatar_2.jpeg",
    date: "23-02",
    message: "Let's go get some beer this Friday",
  },
  {
    id: 1,
    name: "Sam Smith",
    image: "../src/assets/avatars/avatar_3.jpeg",
    date: "17-09",
    message: "Why don't we go singing bruv?",
  },
];

export const favouriteContacts = [
  {
    id: "1",
    name: "Man Lykos",
    avatar: "../src/assets/avatars/avatar_1.jpeg",
    activity: "success",
  },
  {
    id: "2",
    name: "An Lykos",
    avatar: "../src/assets/avatars/avatar_2.jpeg",
    activity: "error",
  },
  {
    id: "3",
    name: "N Lykos",
    avatar: "../src/assets/avatars/avatar_3.jpeg",
    activity: "error",
  },
  {
    id: "4",
    name: "Lykos",
    avatar: "../src/assets/avatars/avatar_4.jpeg",
    activity: "warning",
  },
];
