import {
  ActionIcon,
  Chip,
  Drawer,
  Pill,
  ScrollAreaAutosize,
  TextInput,
} from "@mantine/core";
import {
  CarIcon,
  FilterIcon,
  Search,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const TRANSACTIONS_BY_DATE = [
  {
    when: "Yesterday",
    transactions: [
      {
        name: "Sushi",
        category: "Restaurant",
        icon: <Utensils />,
        account: "TD *8563",
        amount: 321.12,
        pending: true,
        date: "August 4, 2024 at 6:54pm",
      },
      {
        name: "University of Toronto Bookstore",
        category: "Retail",
        icon: <ShoppingBag />,
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
        icon: <Utensils />,
        account: "TD *8563",
        amount: 12.5,
        pending: false,
        date: "August 1, 2024 at 2:32pm",
      },
      {
        name: "Apple Store",
        category: "Retail",
        icon: <ShoppingBag />,
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
        icon: <ShoppingBag />,
        account: "TD *8563",
        amount: 89.99,
        pending: false,
        date: "July 31, 2024 at 8:55pm",
      },
      {
        name: "Gas Station",
        category: "Transportation",
        icon: <CarIcon />,
        account: "RBC *7342",
        amount: 50.0,
        pending: false,
        date: "July 31, 2024 at 9:23am",
      },
    ],
  },
];

export default function Transactions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState<
    [number, number]
  >([0, 0]);

  const transaction =
    TRANSACTIONS_BY_DATE[selectedTransactionIdx[0]].transactions[
      selectedTransactionIdx[1]
    ];

  return (
    <div>
      <div className="z-50 sticky top-0 bg-white p-4 border-b-[1px] border-b-gray-300 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Transactions</h1>
          <ActionIcon color="black" variant="outline">
            <FilterIcon className="size-4" />
          </ActionIcon>
        </div>

        <TextInput
          placeholder="Search transactions"
          rightSection={<Search className="size-4" />}
        />

        <ScrollAreaAutosize>
          <Chip.Group>
            <div className="flex gap-2">
              {["Pending", "Spending", "Deposits", "Withdrawls"].map(
                (category) => (
                  <Chip key={category} value={category} color="black">
                    {category}
                  </Chip>
                )
              )}
            </div>
          </Chip.Group>
        </ScrollAreaAutosize>
      </div>
      <section className=" flex flex-col gap-4">
        {TRANSACTIONS_BY_DATE.map(({ when, transactions }, dateIdx) => (
          <div key={when} className="flex flex-col mt-4">
            <h2 className="text-sm text-gray-500 px-4 mb-4">{when}</h2>
            {transactions.map(
              (
                { name, account, category, icon, amount, pending },
                transactionIdx
              ) => (
                <button
                  key={name}
                  className="text-left flex justify-between items-center gap-2 bg-white hover:bg-gray-200 p-4"
                  onClick={() => {
                    setSelectedTransactionIdx([
                      dateIdx,
                      transactionIdx,
                    ] as const);
                    setModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs">{account}</p>
                    <p className="text-xs text-gray-500">{category}</p>
                  </div>
                  <div className="flex-1 text-right self-start">
                    <p className="font-semibold">-${amount.toFixed(2)}</p>
                    {pending && <Pill>Pending</Pill>}
                  </div>
                </button>
              )
            )}
          </div>
        ))}
      </section>
      <Drawer
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        position="bottom"
        title={<span className="font-semibold">Transaction details</span>}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center size-12 bg-gray-100 rounded-full">
            {transaction.icon}
          </div>
          <p className="font-semibold">{transaction.name}</p>
          <div className="flex justify-between gap-2">
            <p className="text-sm text-gray-500">Category</p>
            <p>{transaction.category}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-sm text-gray-500">Account</p>
            <div className="flex flex-col text-right">
              <p>{transaction.account}</p>
              <Link to="/accounts" className="underline">
                View account
              </Link>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-sm text-gray-500">Date</p>
            <p>{transaction.date}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-sm text-gray-500">Status</p>
            <p>{transaction.pending ? "Pending" : "Processed"}</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">-${transaction.amount.toFixed(2)}</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
