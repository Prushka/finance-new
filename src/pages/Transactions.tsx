import { TRANSACTIONS_BY_DATE } from "@/lib/useTransactions";
import { accountsState } from "@/states";
import {
  ActionIcon,
  Chip,
  Drawer,
  Pill,
  ScrollAreaAutosize,
  TextInput,
} from "@mantine/core";
import { FilterIcon, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function Transactions() {
  const [acc] = useRecoilState(accountsState);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState<
    [number, number]
  >([0, 0]);

  const transaction =
    TRANSACTIONS_BY_DATE[selectedTransactionIdx[0]].transactions[
      selectedTransactionIdx[1]
    ];

  const [chipValue, setChipValue] = useState<string | null>(null);

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
          <Chip.Group value={chipValue}>
            <div className="flex gap-2">
              {["Pending", "Spending", "Deposits", "Withdrawls"].map(
                (category) => (
                  <Chip
                    key={category}
                    value={category}
                    onClick={() => {
                      if (chipValue === category) setChipValue(null);
                      else setChipValue(category);
                    }}
                    color="black"
                  >
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
            {transactions
              .filter(({ account }) =>
                Object.keys(acc).some((key) => account.includes(key))
              )
              .map(
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
                    <div className="mr-2 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
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
              <Link to={`/accounts/${transaction.account.includes("TD")? "td":'rbc'}`} className="underline">
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
