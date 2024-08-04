import {
    BanknoteIcon,
    BriefcaseIcon,
    CreditCard,
    House,
    PlusIcon,
    ShoppingBasketIcon
} from "lucide-react";

import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Row2, TabGroup, TabGroup2} from "@/pages/Accounts.tsx";
import React, {useState} from "react";
import {Drawer} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Button} from "@/components/ui/button.tsx";

const size = 18;

const schedules:
    { [key: string]: Schedule[] }
    = {
    expenses: [
        {
            name: "Rent",
            amount: 1600,
            date: "2024-08-10",
            icon: <House size={size}/>,
        },
        {
            name: "Groceries",
            amount: 200,
            date: "2024-08-08",
            icon: <ShoppingBasketIcon size={size}/>,
        },
        {
            name: "Credit Card",
            amount: 70,
            date: "2024-08-20",
            auto: true,
            icon: <CreditCard size={size}/>,
        },
    ],
    income: [
        {
            name: "Paycheck",
            amount: 3000,
            date: "2024-08-05",
            icon: <BanknoteIcon size={size}/>,
        },
        {
            name: "Freelance",
            amount: 500,
            date: "2024-08-15",
            icon: <BriefcaseIcon size={size}/>,
        },
    ]
}

function ScheduleDrawer({opened, close}: { opened: boolean, close: () => void }) {

    return <Drawer opened={opened} onClose={close} size={"lg"}
                   position={"bottom"}
                   title={"Add a schedule"}>
        <div className={"grid grid-cols-2"}>
            <ScheduleType/>
            <Button className={"col-span-2"}>SAVE</Button>
        </div>
    </Drawer>
}

export default function Planning() {
    const [t, setT] = useState("Calendar")
    const [d, setD] = useState("Expenses")
    const [opened, {open, close}] = useDisclosure(true);

    return <>
        <div className="z-50 sticky top-0 bg-white p-4 border-b-[1px] border-b-gray-300 flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold self-center">Planning</h1>


                <PlusIcon onClick={open}/>
            </div>
        </div>
        <div className={"flex flex-col gap-6 p-6"}>
            <ScheduleDrawer opened={opened} close={close}/>
            <Card>
                <CardHeader>
                    <div className={"flex justify-between gap-2 items-center"}>
                        <div className={"flex flex-col"}>
                            <CardTitle>Forecast</CardTitle>
                            <CardDescription>See your predicted income & expenses</CardDescription>
                        </div>
                        <TabGroup2 selected={t} setSelected={setT} options={["Calendar", "Chart"]}/>
                    </div>
                </CardHeader>

                <CardContent>
                    {t === "calendar" ?
                        <div>Calendar</div> :
                        <div>Chart</div>}
                </CardContent>
                <CardFooter className={"flex justify-center items-center"}>
                    <TabGroup className={"max-w-80"} options={["Week", "Month", "Year"]}/>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <div className={"flex justify-between gap-2 items-center"}>
                        <CardTitle>Schedules</CardTitle>
                        <TabGroup2 selected={d} setSelected={setD} options={["Expenses", "Income"]}/>
                    </div>
                </CardHeader>
                <CardContent className={"flex flex-col gap-4"}>
                    {d === "Expenses" ?
                        schedules.expenses.map((a, index) => (<ScheduleRow key={index} schedule={a} prefix={"-"}/>)
                        ) : schedules.income.map((a, index) => (<ScheduleRow key={index} schedule={a}/>))
                    }
                </CardContent>
            </Card>
        </div>
    </>;
}

interface Schedule {
    name: string
    amount: number
    date: string
    icon: any
    auto?: boolean
}

function ScheduleRow({schedule, prefix = ""}: { schedule: Schedule, prefix?: string }) {
    const {name, amount, date, icon} = schedule
    const d = new Date(date).toLocaleDateString()
    const inDays = Math.floor((new Date(d).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return <Row2 icon={icon} name={name} description={date + ` (In ${inDays} days)`}
                 value={`${prefix}$${amount.toFixed(2)}`}/>
}
const groceries = ['Rent', 'Groceries', 'Income', 'Freelance', 'Credit Card'];

function ScheduleType() {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);

    const options = groceries.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                >
                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
