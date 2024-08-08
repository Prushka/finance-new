import { CarIcon, ShoppingBag, Utensils } from "lucide-react";

export const RECENT_TRANSACTIONS = [
  {
    name: "Sushi",
    account: "TD *8563",
    amount: 321.12,
  },
  {
    name: "University of Toronto Bookstore",
    account: "RBC *7342",
    amount: 45.67,
  },
  {
    name: "Starbucks",
    account: "TD *8563",
    amount: 12.5,
  },
  {
    name: "Apple Store",
    account: "RBC *7342",
    amount: 1599.99,
  },
];

const size = 18;

export const TRANSACTIONS_BY_DATE = [
  {
    when: "Yesterday",
    transactions: [
      {
        name: "Sushi",
        category: "Restaurant",
        icon: <Utensils size={size} />,
        account: "TD *8563",
        amount: 321.12,
        pending: true,
        date: "August 4, 2024 at 6:54pm",
      },
      {
        name: "University of Toronto Bookstore",
        category: "Retail",
        icon: <ShoppingBag size={size} />,
        account: "RBC *7342",
        amount: 45.67,
        pending: true,
        date: "August 4, 2024 at 3:12pm",
      },
    ],
  },
  {
    when: "August 1, 2024",
    transactions: [
      {
        name: "Starbucks",
        category: "Restaurant",
        icon: <Utensils size={size} />,
        account: "TD *8563",
        amount: 12.5,
        pending: false,
        date: "August 1, 2024 at 2:32pm",
      },
      {
        name: "Apple Store",
        category: "Retail",
        icon: <ShoppingBag size={size} />,
        account: "RBC *7342",
        amount: 1599.99,
        pending: false,
        date: "August 1, 2024 at 10:16am",
      },
    ],
  },
  {
    when: "July 31, 2024",
    transactions: [
      {
        name: "Amazon",
        category: "Retail",
        icon: <ShoppingBag size={size} />,
        account: "TD *8563",
        amount: 89.99,
        pending: false,
        date: "July 31, 2024 at 8:55pm",
      },
      {
        name: "Gas Station",
        category: "Transportation",
        icon: <CarIcon size={size} />,
        account: "RBC *7342",
        amount: 50.0,
        pending: false,
        date: "July 31, 2024 at 9:23am",
      },
    ],
  },
];

export function useTransactions() {}
