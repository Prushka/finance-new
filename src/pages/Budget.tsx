import React, {useMemo, useState} from "react";
import {
  ActionIcon,
  Divider,
  NumberFormatter,
  NumberInput,
  Tooltip,
  Progress, Badge,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  SaveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Schedule, ScheduleCard, ScheduleRow} from "@/pages/Planning.tsx";
import {scheduleState} from "@/states.ts";
import {useRecoilState} from "recoil";
import {Link} from "react-router-dom";

const currentDate = new Date();

export default function Budget({isDetails}:{isDetails?:boolean}) {
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
  ];

  const [schedules] = useRecoilState(scheduleState);
  const fixedCosts = useMemo(() => {
    return schedules.filter((schedule: Schedule) => schedule.si === "expense").reduce((acc: number, schedule: Schedule) => {
        return acc + schedule.amount;
    }, 0);
  }, [schedules]);
  const monthlyTotal = useMemo(()=>{
    return budgetAmountForm.reduce((a, b) => a + b, 0) + fixedCosts
  }, [budgetAmountForm, fixedCosts]);
  const monthlySpent = useMemo(()=>{
    return budgetCategories
        .map(({ spent }) => spent)
        .reduce((a, b) => a + b, 0)
  }, [budgetCategories]);
  const monthlyRemaining = useMemo(()=>{
    return monthlyTotal - monthlySpent - fixedCosts;
  }, [monthlyTotal, monthlySpent, fixedCosts]);

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
        className={"w-24"}
        onClick={() => {
          setIsEditing((prev) => !prev);
          if (isEditing) {
            setBudgetAmount(budgetAmountForm);
          }
        }}
      >
        {!isEditing ? (
          <>
            <PencilIcon className="size-4 mr-2" /> Edit
          </>
        ) : (
          <>
            <SaveIcon className="size-4 mr-2" /> Save
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

  const totalMonthlyBudgetSection = (useSpent: boolean) => {
    return <section>
      <div className="flex mb-2 justify-between items-center text-sm font-medium">
        <div className={"flex flex-col gap-0.5"}>
          <p className={"text-sm text-muted-foreground font-normal"}>{useSpent?"Spent":"Left to spend"}</p>
          <NumberFormatter
              value={useSpent? monthlySpent:monthlyRemaining}
              prefix="$"
              thousandSeparator
              decimalScale={2}
          />
        </div>

        <div className={"flex flex-col gap-0.5 mr-4"}>
          <p className={"text-sm text-muted-foreground font-normal"}>Monthly Budget</p>
          <NumberFormatter
              value={monthlyTotal}
              prefix="$"
              thousandSeparator
              decimalScale={2}
          />
        </div>

      </div>
      <div className="flex gap-1 items-center">
        <Progress.Root size={22} radius={"md"} className={"w-full"}>
          <Tooltip label={`Fixed Costs – $${fixedCosts}`}>
            <Progress.Section value={(fixedCosts / monthlyTotal) * 100} color="pink">
              <Progress.Label>Fixed</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label={`Expenses – $${monthlySpent}`}>
            <Progress.Section value={monthlySpentPercentage} color="#6A43DD">
              <Progress.Label>Expenses</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label={`Left – $${monthlyRemaining.toFixed(2)}`}>
            <Progress.Section value={100 - monthlySpentPercentage - (fixedCosts / monthlyTotal) * 100} color="gray.2">
              <Progress.Label></Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
      </div>
    </section>
  };

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
      isDetails ? <>
            <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className={"flex gap-4 items-center justify-center"}>
                  <Link to={"/planning"}>
                    <ChevronLeftIcon className="cursor-pointer flex-grow"/>
                  </Link>

                  <h1 className="text-xl font-bold self-center">Expenses</h1>
                </div>
                <Badge
                    variant="gradient"
                    className={"font-bold text-xs self-center"}
                    gradient={{
                      from: "#a052ab",
                      to: "#696eff",
                      deg: 96,
                    }}
                >
                  🎉 5 months on budget!
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5">
              <div className={"flex flex-col gap-1.5 justify-center items-center  mb-4"}>

                <div
                    className={"!cursor-pointer flex gap-0.5 justify-center items-center outline outline-transparent outline-offset-3 rounded-md hover:outline-gray-500 outline-1"}>
                  <MonthPickerInput
                      variant={"unstyled"}
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
                  >
                  </MonthPickerInput>
                  <ChevronDown size={14}/>
                </div>

                <NumberFormatter
                    className={"text-5xl font-medium"}
                    value={monthlyRemaining}
                    prefix="$"
                    thousandSeparator
                    decimalScale={2}
                />
                <p className={"text-sm text-muted-foreground font-normal"}>Left to spend</p>
              </div>
              <Card>
                <CardHeader className={"flex flex-col justify-center gap-3"}>
                  {totalMonthlyBudgetSection(true)}
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className={"flex flex-row justify-between gap-2 items-center"}>
                  <div className={"flex flex-col gap-2"}>
                    <CardTitle>Budget Categories</CardTitle>
                    <CardDescription>Manage your budgets</CardDescription>
                  </div>
                  {editButton}
                </CardHeader>
                <CardContent>
                  {budgetCategoriesSection}
                </CardContent>
              </Card>
              <ScheduleCard si={"expense"} addButton={isCurrentMonth}/>
            </div>
          </> :
         <Link to={"/budget"}>
           <Card className={"hoverable-card"}>
             <CardHeader className={"flex flex-row justify-between gap-2"}>
               <div className={"flex flex-col gap-2"}>
                 <CardTitle>Expenses</CardTitle>
                 <CardDescription>Budget your expenses</CardDescription>
               </div>
               <ChevronRightIcon/>
             </CardHeader>
             <CardContent>
               {totalMonthlyBudgetSection(false)}
             </CardContent>
           </Card>
         </Link>
  );
}
