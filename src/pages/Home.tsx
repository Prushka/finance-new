import { Avatar, Card, NumberFormatter, Progress } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="z-50 sticky top-0 bg-white p-4 border-b-[1px] border-b-gray-300 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Finance Fellas</h1>
          <Avatar radius="xl" />
        </div>
      </div>

      <section className="p-4 flex flex-col items-center gap-4">
        <HomeCard title="Accounts" to="/accounts">
          <Card.Section inheritPadding>TODO DAN: List of accounts</Card.Section>
        </HomeCard>

        <HomeCard title="Planning" to="/planning">
          <Card.Section inheritPadding>
            TODO DAN: Chart + upcoming income + expenses
          </Card.Section>
        </HomeCard>

        <HomeCard title="Budget" to="/budget">
          <Card.Section inheritPadding withBorder py="sm">
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
                color="indigo"
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
            <span>months of staying on budget!</span>
            🎉
          </Card.Section>
        </HomeCard>

        <HomeCard title="Recent transactions" to="/transactions">
          <Card.Section inheritPadding>
            List of recent transactions
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
  return (
    <Card withBorder radius="md" className="w-full">
      <Card.Section withBorder className="hover:bg-gray-100">
        <Link
          to={props.to}
          className="flex justify-between items-center size-full px-4 py-3"
        >
          <h2 className="font-semibold">{props.title}</h2>
          <ChevronRight />
        </Link>
      </Card.Section>
      {props.children}
    </Card>
  );
}
