import {
  ActionIcon,
  Chip,
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

export default function Transactions() {
  const transactionsDataByDate = [
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
        },
        {
          name: "University of Toronto Bookstore",
          category: "Retail",
          icon: <ShoppingBag />,
          account: "RBC *7342",
          amount: 45.67,
          pending: true,
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
        },
        {
          name: "Apple Store",
          category: "Retail",
          icon: <ShoppingBag />,
          account: "RBC *7342",
          amount: 1599.99,
          pending: false,
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
        },
        {
          name: "Gas Station",
          category: "Transportation",
          icon: <CarIcon />,
          account: "RBC *7342",
          amount: 50.0,
          pending: false,
        },
      ],
    },
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
        {transactionsDataByDate.map(({ when, transactions }) => (
          <div key={when} className="flex flex-col mt-4">
            <h2 className="text-sm text-gray-500 px-4 mb-4">{when}</h2>
            {transactions.map(
              ({ name, account, category, icon, amount, pending }) => (
                <button
                  key={name}
                  className="text-left flex justify-between items-center gap-2 bg-white hover:bg-gray-200 p-4"
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
    </div>
  );
}
