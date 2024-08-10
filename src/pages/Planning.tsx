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
    PlusIcon,
    BanknoteIcon,
    CalendarIcon,
    RepeatIcon,
    File,
    SaveIcon,
    Trash
} from "lucide-react";

import {
    Autocomplete,
    NumberInput,
    Select,
    TextInput,

    Badge,
} from "@mantine/core";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {options, Row, Row2, TabGroup, TabGroup2} from "@/pages/Accounts.tsx";
import React, {useEffect, useState} from "react";
import {Drawer} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Button} from "@/components/ui/button.tsx";
import {DatePicker} from "@/pages/DatePicker.tsx";
import {useRecoilState} from "recoil";
import {scheduleState} from "@/states.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {BarChart, LineChart} from "@mantine/charts";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import Budget from "@/pages/Budget.tsx";

function Required() {
    return <span className={"leading-4 text-sm text-red-500"}>*</span>;
}

const size = 18;

const types: any = {
    expense: {
        Rent: <Home size={size}/>,
        "Credit Card": <CreditCard size={size}/>,
        Utilities: <PenTool size={size}/>,
        Insurance: <Shield size={size}/>,
        Other: <MoreHorizontal size={size}/>,
    },
    income: {
        Salary: <DollarSign size={size}/>,
        Freelance: <Briefcase size={size}/>,
        Investment: <TrendingUp size={size}/>,
        Savings: <PiggyBank size={size}/>,
        Gift: <Gift size={size}/>,
        Refund: <RefreshCcw size={size}/>,
        Other: <MoreHorizontal size={size}/>,
    },
};

function tmrDate(): Date {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
}

function upperFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function ScheduleDrawer({
                            opened,
                            close,
                            s,
                            viewOnly,
    si
                        }: {
    opened: boolean;
    close: () => void;
    title?: string;
    s?: Schedule;
    viewOnly?: boolean;
    si: string
}) {
    const [t, setT] = useState(upperFirst(si));
    const [date, setDate] = useState<Date>(tmrDate());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [amount, setAmount] = useState(200);
    const [label, setLabel] = useState("");
    const [type, setType] = useState(Object.keys(types[si])[0]);
    const [, setSchedules] = useRecoilState(scheduleState);
    const [account, setAccount] = useState<string | undefined | null>("");
    const [repeats, setRepeats] = useState<string>("Never");

    useEffect(() => {
        if (s) {
            setT(upperFirst(s.si));
            setDate(new Date(s.date));
            setEndDate(s.endDate ? new Date(s.endDate) : undefined);
            setAmount(s.amount);
            if (s.label) {
                setLabel(s.label);
            }
            setType(s.type);
            setAccount(s?.account);
        } else {
            setT("Expense");
            setDate(tmrDate());
            setEndDate(undefined);
            setAmount(200);
            setLabel("");
            setType(Object.keys(types[si])[0]);
        }
    }, [s]);

    const navigate = useNavigate();

    return (
        <Drawer
            opened={opened}
            onClose={close}
            size={s?.auto || viewOnly ? "md" : "lg"}
            position={"bottom"}
            title={
                s?.auto
                    ? "Imported schedule"
                    : viewOnly
                        ? "Schedule"
                        : s
                            ? `Edit ${si} schedule`
                            : `Add an ${si} schedule`
            }
        >
            {s?.auto || viewOnly ? (
                <div className={"flex flex-col gap-6"}>
                    {s?.account && (
                        <Row
                            icon={<BanknoteIcon/>}
                            title={"Account"}
                            value={s.account || "unknown"}
                        />
                    )}
                    {s?.repeats && (
                        <Row
                            icon={<RepeatIcon/>}
                            title={"Repeats every"}
                            value={s.repeats}
                        />
                    )}
                    {s?.date && (
                        <Row icon={<CalendarIcon/>} title={"Start date"} value={s.date}/>
                    )}
                    {s?.endDate && (
                        <Row icon={<CalendarIcon/>} title={"End date"} value={s.endDate}/>
                    )}
                    {s?.label && (
                        <Row icon={<MoreHorizontal/>} title={"Label"} value={s.label}/>
                    )}
                    {s?.type && <Row icon={<File/>} title={"Type"} value={s.type}/>}
                    {s?.amount && (
                        <Row
                            icon={<DollarSign/>}
                            title={"Amount"}
                            value={`$${s.amount.toFixed(2)}`}
                        />
                    )}
                    {s?.auto && (
                        <Row
                            icon={<MoreHorizontal/>}
                            title={"Source"}
                            value={"Automatically imported"}
                        />
                    )}
                    {s?.account && (
                        <Button
                            onClick={() => {
                                navigate("/accounts/TD");
                            }}
                        >
                            Go to account
                        </Button>
                    )}
                </div>
            ) : (
                <div className={"flex flex-col gap-4"}>
                    <Autocomplete
                        label={
                            <span>
                Type <Required/>
              </span>
                        }
                        placeholder="Enter or choose a type"
                        data={Object.keys(types[si])}
                        value={type}
                        onChange={setType}
                    />

                    {/*<TextInput*/}
                    {/*    value={label}*/}
                    {/*    onChange={(event) => setLabel(event.currentTarget.value)}*/}
                    {/*    label={<p>Label</p>}*/}
                    {/*/>*/}
                    <NumberInput
                        leftSection={<span>$</span>}
                        value={amount}
                        onChange={setAmount}
                        label={
                            <p>
                                Amount <Required/>
                            </p>
                        }
                    />
                    <DatePicker date={date} setDate={setDate}>
                        Effective from <Required/>
                    </DatePicker>


                    <Select
                        label="Repeats Every"
                        placeholder=""
                        data={[
                            "Never",
                            "Day",
                            "Week",
                            "2 Weeks",
                            "Month",
                            "3 Months",
                            "6 Months",
                            "Year",
                        ]}
                        value={repeats}
                        onChange={setRepeats}
                    />

                    {repeats !== "Never" && <DatePicker
                        date={endDate}
                        setDate={setEndDate}
                    >
                        Effective until
                    </DatePicker>}

                    <div className={"grid grid-cols-2 gap-4 mt-3"}>
                        {s && (
                            <Button
                                variant={"destructive"}
                                onClick={() => {
                                    close();
                                    setSchedules((prev) => {
                                        return [...prev.filter((a: Schedule) => a.key !== s.key)];
                                    });
                                    toast.success("Schedule deleted!", {
                                        position: "top-center",
                                        duration: 1500,
                                    });
                                }}
                                className={"flex items-center justify-center"}
                            >
                                <Trash className={"mr-3"} size={16}/>DELETE
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                close();
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
                                                        repeats,
                                                    };
                                                }
                                                return a;
                                            }),
                                        ];
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
                                                repeats,
                                            },
                                        ];
                                    }
                                });
                                toast.success("Schedule added!", {
                                    position: "top-center",
                                    duration: 1500,
                                });
                            }}
                            className={`${!s ? "col-span-2": ""} flex items-center justify-center`}
                        >
                          <SaveIcon className={"mr-3"} size={16}/>  SAVE
                        </Button>
                    </div>
                </div>
            )}
        </Drawer>
    );
}

function formatDate(date: Date | undefined) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}



export default function Planning() {
    return (
        <>
            <div className="z-50 sticky top-0 bg-white p-5 border-b-[1px] border-b-gray-300 flex flex-col gap-6">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-xl font-bold self-center">Planning</h1>
                </div>
            </div>
            <div className={"flex flex-col gap-5 p-5"}>
                <Card>
                    <CardHeader>
                            <div className={"flex flex-col"}>
                                <CardTitle className="mb-2">Dashboard</CardTitle>
                                <CardDescription>
                                    View your historical and predicted expenses and income
                                </CardDescription>

                            </div>
                    </CardHeader>

                    <CardContent className={"flex flex-col gap-6 justify-center items-center"}>
                        {/*<LineChart*/}
                        {/*    withLegend*/}
                        {/*    h={300}*/}
                        {/*    className={"w-full"}*/}
                        {/*    data={dataFromSchedules(schedules)}*/}
                        {/*    series={[{name: "total", label: "Total"}]}*/}
                        {/*    dataKey="date"*/}
                        {/*    type="gradient"*/}
                        {/*    gradientStops={[*/}
                        {/*        {offset: 0, color: "blue.5"},*/}
                        {/*        {offset: 20, color: "cyan.6"},*/}
                        {/*        {offset: 40, color: "lime.5"},*/}
                        {/*        {offset: 70, color: "yellow.5"},*/}
                        {/*        {offset: 80, color: "orange.5"},*/}
                        {/*        {offset: 100, color: "red.6"},*/}
                        {/*    ]}*/}
                        {/*    strokeWidth={5}*/}
                        {/*    curveType="natural"*/}
                        {/*    valueFormatter={(value) =>*/}
                        {/*        `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`*/}
                        {/*    }*/}
                        {/*/>*/}
                        <BarChart
                            h={300}
                            data={[
                                { month: 'May', Expense: -1000, Income: 2100, Total: 1100 },
                                { month: 'June', Expense: -750, Income: 900, Total: 1350 },
                                { month: 'July', Expense: -1800, Income: 600, Total: -1200 },
                                { month: 'August', Expense: -1800, Income: 3500 },
                            ]}
                            dataKey="month"
                            series={[
                                { name: 'Expense', color: 'red.5' },
                                { name: 'Income', color: 'green.5' },
                                { name: 'Total', color: 'gray.8' },
                            ]}
                            tickLine="y"
                            withYAxis={false}
                        />
                        <TabGroup options={options}/>
                    </CardContent>
                </Card>
                <ScheduleCard si={"income"}/>
                <Budget/>
            </div>
        </>
    );
}

export function ScheduleCard({si, addButton=true}:{si:string, addButton:boolean}) {
    const [d, ] = useState(upperFirst(si));
    const [opened, {open, close}] = useDisclosure(false);
    const [schedules] = useRecoilState(scheduleState);
    const [selectedSchedule, setSelectedSchedule] = useState<
        Schedule | undefined
    >(undefined);
    const [viewOnly, setViewOnly] = useState(false);

    return <>
    <ScheduleDrawer
        si={si}
        opened={opened}
        close={close}
        s={selectedSchedule}
        viewOnly={viewOnly}
    /><Card>
        <CardHeader>
            <div className={"flex items-center"}>
                {/*<CardTitle className={"flex-1"}>Schedules</CardTitle>*/}
                <div className={"flex flex-col gap-2"}>
                    <CardTitle>{d}</CardTitle>
                    <CardDescription>Plan your {si} schedules</CardDescription>

                </div>
                {addButton &&
                <div className={"flex-1 flex justify-end"}>

                    <Button
                        onClick={() => {
                            setSelectedSchedule(undefined);
                            setViewOnly(false);
                            open();
                        }}
                        variant={"default"}
                        className={"flex gap-2 w-24"}
                    >
                        <PlusIcon/>
                        Add
                    </Button>
                </div>
                }
            </div>
        </CardHeader>
        <CardContent className={"flex flex-col gap-5"}>
            {schedules
                .slice()
                .sort(
                    (a: Schedule, b: Schedule) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .filter((a: Schedule) => a.si === d.toLowerCase())
                .map((a, index) => (
                    <ScheduleRow
                        className={"outline-transparent outline outline-offset-8 hover:outline-gray-400 rounded-md outline-1 transition-all"}
                        onClick={() => {
                            setSelectedSchedule(a);
                            setViewOnly(false);
                            open();
                        }}
                        key={index}
                        schedule={a}
                        prefix={d === "Expense" ? "-" : ""}
                    />
                ))}
        </CardContent>
    </Card></>
}

export interface Schedule {
    type: string;
    label?: string;
    amount: number;
    date: string;
    endDate?: string;
    auto?: boolean;
    si: string;
    key: string;
    account?: string;
    repeats: string;
}

export function ScheduleRow({
                                schedule,
                                prefix = "",
                                onClick,
    className
                            }: {
    schedule: Schedule;
    prefix?: string;
    onClick?: any;
    className?: string;
}) {
    const {type, amount, date, label} = schedule;
    const d = new Date(date).toLocaleDateString();
    const inDays = Math.ceil(
        (new Date(d).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
        <Row2
            className={`cursor-pointer ${className}`}
            onClick={onClick}
            icon={types.expense?.[type] ?? types.income?.[type] ?? <MoreHorizontal/>}
            name={label || type}
            description={<p><span className={"text-gray-900 font-medium"}>In {inDays} days</span> ({date})</p>}
            value={
            <p className={"font-medium"}><span className={"text-gray-600"}>{prefix}$</span>{formatCurrencyWithSeparator(amount)}</p>
            }
        />
    );
}

function formatCurrencyWithSeparator(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
