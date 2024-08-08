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

  const [budgetAmount, setBudgetAmount] = useState([
    800, 200, 100, 300, 200, 200,
  ]);
  const [budgetAmountForm, setBudgetAmountForm] = useState(budgetAmount);

  const budgetCategories = [
    {
      name: "Food",
      spent: 563.72,
    },
    {
      name: "Entertainment",
      spent: 48.32,
    },
    {
      name: "Transportation",
      spent: 100,
    },
    {
      name: "Shopping",
      spent: 212.31,
    },
    {
      name: "Bills",
      spent: 182.33,
    },
    {
      name: "Health",
      total: 200,
      spent: 50,
    },
  ];

  const monthlyTotal = budgetAmountForm.reduce((a, b) => a + b, 0);
  const monthlySpent = budgetCategories
    .map(({ spent }) => spent)
    .reduce((a, b) => a + b, 0);
  const monthlyRemaining = monthlyTotal - monthlySpent;

  const monthlySpentPercentage = (monthlySpent / monthlyTotal) * 100;

  const editButton = isCurrentMonth && (
    <div className={"flex gap-4"}>
      {isEditing && (
        <Button
          variant={"secondary"}
          onClick={() => {
            setIsEditing((prev) => !prev);
            if (isEditing) {
              setBudgetAmountForm(budgetAmount);
            }
          }}
        >
          Cancel
        </Button>
      )}
      <Button
        className={"w-36"}
        onClick={() => {
          setIsEditing((prev) => !prev);
          if (isEditing) {
            setBudgetAmount(budgetAmountForm);
          }
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
    </div>
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
        <NumberFormatter
          value={monthlyTotal}
          prefix="$"
          thousandSeparator
          decimalScale={2}
        />
      </div>
      <div className="flex gap-1 items-center">
        <Progress
          size="lg"
          radius="xl"
          value={monthlySpentPercentage}
          className="w-full"
          color="#6A43DD"
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
    <section className="flex flex-col gap-5">
      {budgetCategories.map(({ name, spent }, idx) => {
        const total = budgetAmountForm[idx];
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
                  value={budgetAmountForm[idx]}
                  onChange={(value) => {
                    const newBudgetAmountForm = [...budgetAmountForm];
                    newBudgetAmountForm[idx] = Number(value);
                    setBudgetAmountForm(newBudgetAmountForm);
                  }}
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
                color="#6A43DD"
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
      <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-xl font-bold">Budget</h1>
          <Badge
            variant="gradient"
            className={"font-bold text-xs"}
            gradient={{
              from: "#a052ab",
              to: "#696eff",
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
