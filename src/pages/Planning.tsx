import {
    Home,
    ShoppingCart,
    CreditCard,
    Shield,
    Truck,
    Heart,
    Film,
    Book,
    MoreHorizontal,
    DollarSign,
    Briefcase,
    TrendingUp,
    PiggyBank,
    Gift,
    RefreshCcw,
    PenTool,
    PlusIcon, BanknoteIcon, CalendarIcon, RepeatIcon
} from 'lucide-react';

import {Autocomplete, Indicator, NumberInput, Select, TextInput} from '@mantine/core';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Row, Row2, TabGroup, TabGroup2} from "@/pages/Accounts.tsx";
import React, {useEffect, useState} from "react";
import {Drawer} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Button} from "@/components/ui/button.tsx";
import {DatePicker} from "@/pages/DatePicker.tsx";
import {useRecoilState} from "recoil";
import {scheduleState} from "@/states.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {Calendar} from "@mantine/dates";
import {LineChart} from "@mantine/charts";


function Required() {
    return <span className={"leading-4 text-sm text-red-500"}>*</span>
}

const size = 18

const types: any = {
    expense: {
        "Rent": <Home size={size}/>,
        "Groceries": <ShoppingCart size={size}/>,
        "Credit Card": <CreditCard size={size}/>,
        "Utilities": <PenTool size={size}/>,
        "Insurance": <Shield size={size}/>,
        "Transportation": <Truck size={size}/>,
        "Healthcare": <Heart size={size}/>,
        "Entertainment": <Film size={size}/>,
        "Education": <Book size={size}/>,
        "Other": <MoreHorizontal size={size}/>,
    },
    income: {
        "Salary": <DollarSign size={size}/>,
        "Freelance": <Briefcase size={size}/>,
        "Investment": <TrendingUp size={size}/>,
        "Savings": <PiggyBank size={size}/>,
        "Gift": <Gift size={size}/>,
        "Refund": <RefreshCcw size={size}/>,
        "Other": <MoreHorizontal size={size}/>,
    }
};

function tmrDate(): Date {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
}

function upperFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function ScheduleDrawer({opened, close, title, s}:
                            { opened: boolean, close: () => void, title?: string, s?: Schedule }) {
    const [t, setT] = useState("Expense")
    const [date, setDate] = useState<Date>(
        tmrDate()
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        undefined
    );
    const [amount, setAmount] = useState(
        0
    )
    const [label, setLabel] = useState(
        ""
    )
    const [type, setType] = useState(
        Object.keys(types.expense)[0]
    )
    const [, setSchedules] =
        useRecoilState(scheduleState)
    const [account, setAccount] = useState<string | undefined | null>('');
    const [repeats, setRepeats] = useState<string>('Never');

    useEffect(() => {
        if (s) {
            setT(upperFirst(s.si))
            setDate(new Date(s.date))
            setEndDate(s.endDate ? new Date(s.endDate) : undefined)
            setAmount(s.amount)
            if (s.label) {
                setLabel(s.label)
            }
            setType(s.type)
            setAccount(s?.account)
        }else{
            setT("Expense")
            setDate(tmrDate())
            setEndDate(undefined)
            setAmount(0)
            setLabel("")
            setType(Object.keys(types.expense)[0])
        }
    }, [s]);

    const navigate = useNavigate()

    return <Drawer opened={opened} onClose={close} size={s?.auto ? 'sm': "lg"}
                   position={"bottom"}
                   title={s?.auto ? 'Imported schedule': title}>
        {s?.auto ? <div className={"flex flex-col gap-6"}>
            <Row icon={<BanknoteIcon/>} title={"Account"} value={s.account || "unknown"} />
            <Row icon={<CalendarIcon/>} title={"Start date"} value={s.date} />
            <Row icon={<RepeatIcon/>} title={"Repeats every"} value={s.repeats} />
            <Button
            onClick={()=>{
                navigate("/accounts/TD")
            }}
            >Go to account</Button>
            </div> :
            <div className={"grid grid-cols-2 gap-4 items-end"}>
                <div className={"text-sm font-medium self-center"}>
                    What's your schedule? <Required/>
                </div>
                <TabGroup2
                    selected={t} setSelected={setT}
                    options={["Expense", "Income"]}/>
                <Autocomplete
                    label={<span>Type <Required/></span>}
                    placeholder="Enter or choose a type"
                    data={
                        Object.keys(types[t.toLowerCase()])
                    }
                    value={type}
                    onChange={setType}
                />

                <TextInput
                    value={label}
                    onChange={(event) => setLabel(event.currentTarget.value)}
                    label={
                        <p>Label</p>
                    }/>
                <NumberInput
                    leftSection={<span>$</span>}
                    value={amount}
                    onChange={setAmount}
                    label={
                        <p>Amount <Required/></p>
                    }/>
                <Select
                    label="Associated Account"
                    placeholder=""
                    data={['TD', 'Capital One']}
                    value={account}
                    onChange={setAccount}
                />
                <DatePicker
                    date={date} setDate={setDate}
                >Schedule starts at <Required/></DatePicker>

                <Select
                    label="Repeats Every"
                    placeholder=""
                    data={['Never', 'Day', 'Week', '2 Weeks', 'Month', '3 Months', '6 Months', 'Year']}
                    value={repeats}
                    onChange={setRepeats}
                />

                <DatePicker
                    className={"col-span-2"}
                    date={endDate} setDate={setEndDate}>
                    Schedule ends at
                </DatePicker>

                {s && <Button className={"col-span-2 mt-4"} variant={"destructive"}
                              onClick={() => {
                                  close()
                                  setSchedules((prev) => {
                                      return [
                                          ...prev.filter((a: Schedule) => a.key !== s.key)
                                      ]
                                  })
                                  toast.success("Schedule deleted!", {
                                      position: 'top-center',
                                      duration: 1500
                                  })
                              }}
                >
                    DELETE
                </Button>}
                <Button className={"col-span-2"}
                        onClick={() => {
                            close()
                            setSchedules((prev) => {
                                if (s) {
                                    return [
                                        ...prev.map((a: Schedule) => {
                                            if (a.key === s.key) {
                                                return {
                                                    type,
                                                    amount,
                                                    date: formatDate(date),
                                                    endDate: formatDate(endDate),
                                                    label: label,
                                                    si: t.toLowerCase(),
                                                    key: s.key,
                                                    account,
                                                    repeats
                                                }
                                            }
                                            return a
                                        })
                                    ]
                                } else {
                                    return [
                                        ...prev,
                                        {
                                            type,
                                            amount,
                                            date: formatDate(date),
                                            endDate: formatDate(endDate),
                                            label: label,
                                            si: t.toLowerCase(),
                                            key: Math.random().toString(36),
                                            account,
                                            repeats
                                        }
                                    ]
                                }
                            })
                            toast.success("Schedule added!", {
                                position: 'top-center',
                                duration: 1500
                            })
                        }}
                >SAVE</Button>
            </div>}
    </Drawer>
}

function formatDate(date: Date | undefined) {
    if (!date) return ""
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function dataFromSchedules(schedules: Schedule[]): any[] {
    // export const data = [
    //     {
    //         date: 'Mar 22',
    //         Income: 2890,
    //         Expense: 2338,
    //     },
    const base = 829.34
    const today = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' })
    const data: any = {
     today: {
            date: today,
            income: 0,
            expense: 0,
            total: base
     }
    }
    schedules.forEach((a: Schedule) => {
        const d = new Date(a.date).toLocaleString('en-US', { month: 'short', day: 'numeric' });
        if (!data[d]) {
            data[d] = {
                date: d,
                income: 0,
                expense: 0,
                total: 0
            }
        }
        if (a.si === "income") {
            data[d].income += a.amount
        } else {
            data[d].expense += a.amount
        }
        data[d].total = data[d].income - data[d].expense + base
    })
    console.log(data)
    return Object.values(data)
}

export default function Planning() {
    const [t, setT] = useState("Calendar")
    const [d, setD] = useState("Expense")
    const [opened, {open, close}] = useDisclosure(false);
    const [schedules,] = useRecoilState(scheduleState)
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>(undefined)
    const [title, setTitle] = useState("Add a schedule")
    return <>
        <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold self-center">Planning</h1>
                <PlusIcon onClick={() => {
                    setSelectedSchedule(undefined)
                    setTitle("Add a schedule")
                    open()
                }}/>
            </div>
        </div>
        <div className={"flex flex-col gap-5 p-5"}>
            <ScheduleDrawer opened={opened} close={close}
                            title={title}
                            s={selectedSchedule}/>
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

                <CardContent className={"flex justify-center items-center"}>
                    {t === "Calendar" ?
                        <Calendar
                            static
                            renderDay={(date) => {
                                const day = date.getDate();
                                const ss = schedules.filter((a: Schedule) =>
                                    new Date(a.date).getDate() === day
                                )

                                // if today
                                if (new Date().getDate() === day) {
                                    return <div className={"bg-gray-200 p-2 w-8 h-8 rounded-xl flex justify-center items-center"}>{day}</div>
                                }
                                if (ss.length > 0) {
                                    const first = ss[0]
                                    if (first.si === "expense") {
                                        return <Indicator size={6} color="red" offset={-2}
                                        onClick={()=>{
                                            setSelectedSchedule(first)
                                            open()
                                        }}
                                        >
                                            <div>{day}</div>
                                        </Indicator>
                                    } else {
                                        return <Indicator size={6} color="green" offset={-2}
                                        onClick={()=>{
                                            setSelectedSchedule(first)
                                            open()
                                        }}
                                        >
                                            <div>{day}</div>
                                        </Indicator>
                                    }
                                }
                            }}
                        /> :
                        <LineChart
                            h={300}
                            className={"w-full"}
                            data={dataFromSchedules(schedules)}
                            series={[{ name: 'total', label: 'Total' }
                            ]}
                            dataKey="date"
                            type="gradient"
                            gradientStops={[
                                { offset: 0, color: 'blue.5' },
                                { offset: 20, color: 'cyan.6' },
                                { offset: 40, color: 'lime.5' },
                                { offset: 70, color: 'yellow.5' },
                                { offset: 80, color: 'orange.5' },
                                { offset: 100, color: 'red.6' },
                            ]}
                            strokeWidth={5}
                            curveType="natural"
                            valueFormatter={(value) => `$${value.toFixed(2)}`}
                        />}
                </CardContent>
                    {t === "Chart" &&
                        <CardFooter className={"flex justify-center items-center"}>
                            <TabGroup className={"max-w-80"} options={["Week", "Month", "Year"]}/>
                        </CardFooter>
                    }
            </Card>

            <Card>
                <CardHeader>
                    <div className={"flex justify-between gap-2 items-center"}>
                        <CardTitle>Schedules</CardTitle>
                        <TabGroup2 selected={d} setSelected={setD} options={["Expense", "Income"]}/>
                    </div>
                </CardHeader>
                <CardContent className={"flex flex-col gap-4"}>

                    {schedules.slice()
                        .sort((a: Schedule, b: Schedule) =>
                            new Date(a.date).getTime() - new Date(b.date).getTime())
                        .filter((a: Schedule) => a.si === d.toLowerCase())
                        .map((a, index) => (<ScheduleRow
                            onClick={() => {
                                setSelectedSchedule(a)
                                open()
                            }}
                            key={index} schedule={a} prefix={
                            d === "Expense" ? "-" : ""
                        }/>))
                    }
                </CardContent>
            </Card>
        </div>
    </>;
}

export interface Schedule {
    type: string
    label?: string
    amount: number
    date: string
    endDate?: string
    auto?: boolean
    si: string
    key: string
    account?: string
    repeats: string
}


function ScheduleRow({schedule, prefix = "", onClick}: {
    schedule: Schedule, prefix?: string,
    onClick?: any
}) {
    const {type, amount, date, label} = schedule
    const d = new Date(date).toLocaleDateString()
    const inDays = Math.floor((new Date(d).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return <Row2
        onClick={onClick}
        icon={
            types.expense?.[type] ??
            types.income?.[type] ??
            <MoreHorizontal/>
        } name={label || type} description={date + ` (In ${inDays} days)`}
        value={`${prefix}$${amount.toFixed(2)}`}/>
}
