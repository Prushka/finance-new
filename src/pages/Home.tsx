import { Avatar, Card, NumberFormatter, Progress } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accountsState, scheduleState } from "@/states.ts";
import { Row2 } from "@/pages/Accounts.tsx";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { Schedule, ScheduleRow } from "@/pages/Planning.tsx";
import { RECENT_TRANSACTIONS } from "@/lib/useTransactions";

export default function Home() {
  const [acc] = useRecoilState(accountsState);
  const navigate = useNavigate();
  const [schedules] = useRecoilState(scheduleState);

  const recentTransactions = RECENT_TRANSACTIONS.filter(({ account }) => {
    return Object.keys(acc).some((acc) => account.includes(acc));
  });

  return (
    <div>
      <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className={"flex gap-3 justify-center items-center"}>
            <img src={"/finance.png"} className={"w-6 h-6 rounded-full"} />
            <h1 className="text-xl font-bold">Finance Fellas</h1>
          </div>
          <Avatar radius="xl" />
        </div>
      </div>

      <section className="p-5 flex flex-col items-center gap-5">
        <HomeCard title="Accounts" to="/accounts">
          <Card.Section className={"p-5 flex flex-col gap-5"}>
            {Object.values(acc).length === 0 ? (
              <div className={"flex flex-col gap-2"}>
                <div>You don't have any accounts yet!</div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/accounts-add");
                  }}
                >
                  Add an account
                </Button>
              </div>
            ) : (
              Object.values(acc).map(({ name, img, accounts }) => (
                <Row2
                  key={`${name}${img}`}
                  icon={<img src={img} className={"w-10 h-10 rounded-full"} />}
                  name={name}
                  description={`${Object.values(accounts).length} accounts`}
                  value={`$${Object.values(accounts)
                    .reduce((acc, { balance }) => acc + balance, 0)
                    .toFixed(2)}`}
                />
              ))
            )}
          </Card.Section>
        </HomeCard>

        <HomeCard title="Schedules" to="/planning">
          <Card.Section className={"flex p-5 gap-5 flex-col"}>
            {schedules
              .slice()
              .sort(
                (a: Schedule, b: Schedule) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, 2)
              .map((a, index) => (
                <ScheduleRow
                  key={index}
                  schedule={a}
                  prefix={a.si === "expense" ? "-" : ""}
                />
              ))}
          </Card.Section>
        </HomeCard>

        <HomeCard title="Budget" to="/budget">
          <Card.Section inheritPadding pt="lg" pb="sm">
            <div className="flex mb-2 font-semibold justify-between items-center text-lg">
              <h2>August 2024 Budget</h2>
              <NumberFormatter
                value={2800}
                prefix="$"
                thousandSeparator
                decimalScale={2}
              />
            </div>
            <div className="flex gap-1 items-center">
              <Progress
                size="lg"
                radius="xl"
                value={(643.32 / 2800) * 100}
                className="w-full"
                color="#6A43DD"
              />
              <p className="text-sm text-gray-500 text-right w-[125px]">
                <NumberFormatter
                  value={643.32}
                  prefix="$"
                  thousandSeparator
                  decimalScale={2}
                />{" "}
                left
              </p>
            </div>
          </Card.Section>
          <Card.Section
            inheritPadding
            py="sm"
            className="flex items-center gap-2"
          >
            <span className="text-3xl font-bold">5</span>{" "}
            <span>months on budget!</span>
            🎉
          </Card.Section>
        </HomeCard>

        <HomeCard title="Recent transactions" to="/transactions">
          <Card.Section
            inheritPadding
            pt="lg"
            pb="sm"
            className="flex flex-col gap-3"
          >
            {recentTransactions.length === 0 && <p>No recent transactions.</p>}
            {recentTransactions.map(({ name, account, amount }) => (
              <div key={name}>
                <div className="flex justify-between items-center gap-2">
                  <p className="font-semibold">{name}</p>
                  <p className="font-semibold">-${amount.toFixed(2)}</p>
                </div>
                <p className="text-xs text-gray-500">{account}</p>
              </div>
            ))}
          </Card.Section>
        </HomeCard>
      </section>
    </div>
  );
}

function HomeCard(props: {
  title: string;
  to: string;
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      shadow="xs"
      radius="md"
      className="w-full hoverable-card p-5"
      onClick={() => {
        navigate(props.to);
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{props.title}</h2>
        <ChevronRight />
      </div>
      {props.children}
    </Card>
  );
}
