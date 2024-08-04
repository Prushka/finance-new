import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Divider,
  NumberFormatter,
  NumberInput,
  Progress,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  SaveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const currentDate = new Date();

export default function Budget() {
  const [monthDate, setMonthDate] = useState<Date>(currentDate);
  const isCurrentMonth =
    monthDate.getMonth() === currentDate.getMonth() &&
    monthDate.getFullYear() === currentDate.getFullYear();
  const goToPreviousMonth = () => {
    setMonthDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  const goToNextMonth = () => {
    setMonthDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const budgetCategories = [
    {
      name: "Food",
      total: 800,
      spent: 563.72,
    },
    {
      name: "Entertainment",
      total: 200,
      spent: 48.32,
    },
    {
      name: "Transportation",
      total: 100,
      spent: 100,
    },
    {
      name: "Shopping",
      total: 300,
      spent: 212.31,
    },
    {
      name: "Bills",
      total: 200,
      spent: 182.33,
    },
    {
      name: "Health",
      total: 200,
      spent: 50,
    },
    {
      name: "Expense: Rent",
      total: 1000,
      spent: 1000,
    },
  ];

  const monthlyTotal = budgetCategories
    .map(({ total }) => total)
    .reduce((a, b) => a + b, 0);
  const monthlySpent = budgetCategories
    .map(({ spent }) => spent)
    .reduce((a, b) => a + b, 0);
  const monthlyRemaining = monthlyTotal - monthlySpent;

  const monthlySpentPercentage = (monthlySpent / monthlyTotal) * 100;

  const editButton = isCurrentMonth && (
    <Button
      onClick={() => {
        setIsEditing((prev) => !prev);
      }}
    >
      {!isEditing ? (
        <>
          <PencilIcon className="size-4 mr-2" /> Edit budget
        </>
      ) : (
        <>
          <SaveIcon className="size-4 mr-2" /> Save budget
        </>
      )}
    </Button>
  );
  const monthPicker = (
    <div>
      <div className="flex justify-between items-center gap-4">
        <ActionIcon
          color="black"
          variant="default"
          disabled={isEditing}
          onClick={goToPreviousMonth}
        >
          <ChevronLeftIcon />
        </ActionIcon>
        <MonthPickerInput
          value={monthDate}
          onChange={(date) => setMonthDate(date!)}
          maxDate={currentDate}
          popoverProps={{
            position: "bottom",
          }}
          styles={{
            input: {
              fontWeight: 500,
            },
          }}
        />
        <ActionIcon
          color="black"
          variant="default"
          disabled={isCurrentMonth || isEditing}
          onClick={goToNextMonth}
        >
          <ChevronRightIcon />
        </ActionIcon>
      </div>
    </div>
  );

  const totalMonthlyBudgetSection = (
    <section>
      <div className="flex mb-2 font-semibold justify-between items-center text-lg">
        <h2>Total Monthly Budget</h2>
        {!isEditing ? (
          <NumberFormatter
            value={monthlyTotal}
            prefix="$"
            thousandSeparator
            decimalScale={2}
          />
        ) : (
          <NumberInput
            defaultValue={monthlyTotal}
            prefix="$"
            thousandSeparator
            decimalScale={2}
            hideControls
            allowNegative={false}
            styles={{
              input: {
                textAlign: "right",
              },
            }}
          />
        )}
      </div>
      <div className="flex gap-1 items-center">
        <Progress
          size="lg"
          radius="xl"
          value={monthlySpentPercentage}
          className="w-full"
          color="indigo"
        />
        <p className="text-sm text-gray-500 text-right w-[125px]">
          <NumberFormatter
            value={monthlyRemaining}
            prefix="$"
            thousandSeparator
            decimalScale={2}
          />{" "}
          left
        </p>
      </div>
    </section>
  );

  const budgetCategoriesSection = (
    <section className="flex flex-col gap-4">
      {budgetCategories.map(({ name, total, spent }) => {
        const remaining = total - spent;
        const spentPercentage = (spent / total) * 100;

        return (
          <div key={name}>
            <div className="flex mb-2 font-semibold justify-between text-md">
              <h2>{name}</h2>
              {!isEditing ? (
                <NumberFormatter value={total} prefix="$" thousandSeparator />
              ) : (
                <NumberInput
                  defaultValue={total}
                  prefix="$"
                  thousandSeparator
                  decimalScale={2}
                  hideControls
                  allowNegative={false}
                  styles={{
                    input: {
                      textAlign: "right",
                    },
                  }}
                />
              )}
            </div>
            <div className="flex gap-1 items-center">
              <Progress
                value={spentPercentage}
                className="w-full"
                color="indigo"
              />
              <p className="text-sm text-gray-500 text-right w-[125px]">
                <NumberFormatter
                  value={remaining}
                  prefix="$"
                  thousandSeparator
                  decimalScale={2}
                />{" "}
                left
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );

  return (
    <div>
      <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-xl font-bold">Budget</h1>
          <Badge
            variant="gradient"
            gradient={{
              from: "indigo",
              to: "cyan",
              deg: 96,
            }}
          >
            🎉 5 months on budget!
          </Badge>
        </div>
        {monthPicker}
      </div>

      <section className="p-5">
        <div className="flex flex-row-reverse mb-4">{editButton}</div>
        <div className="flex flex-col gap-4">
          {totalMonthlyBudgetSection}
          <Divider label="Budget Categories" />
          {budgetCategoriesSection}
        </div>
      </section>
    </div>
  );
}
