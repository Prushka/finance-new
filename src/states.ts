import {atom, RecoilState} from "recoil";
import {Bank} from "@/pages/Accounts.tsx";

export const accountsState: RecoilState<
    { [key: string]: Bank }> = atom({
    key: 'accounts',
    default: {},
});

type scheduleTypes = 'expense' | 'income';

export function randomString(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const scheduleState: RecoilState<any[]> =
    atom({
        key: 'schedule',
        default:
            [
                {
                    type: "Rent",
                    amount: 2200,
                    date: "2024-08-24",
                    si: "expense",
                    key: "1",
                    repeats: "Month"
                },
                {
                    type: "Groceries",
                    amount: 200,
                    date: "2024-08-19",
                    si: "expense",
                    key: "2",
                    repeats: "Never"
                },
                {
                    type: "Credit Card",
                    amount: 70,
                    date: "2024-08-20",
                    auto: true,
                    si: "expense",
                    key: "3",
                    account: "TD *8563",
                    repeats: "Month"
                },
                {
                    type: "Salary",
                    amount: 3000,
                    date: "2024-08-27",
                    si: "income",
                    key: "4",
                    repeats: "Month"
                },
                {
                    type: "Freelance",
                    amount: 500,
                    date: "2024-08-15",
                    si: "income",
                    key: "5",
                    repeats: "Never"
                },
            ]
    });
