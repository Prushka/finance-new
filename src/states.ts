import {atom, RecoilState} from "recoil";
import {Bank} from "@/pages/Accounts.tsx";

export const accountsState: RecoilState<
    { [key: string]: Bank }> = atom({
    key: 'accounts',
    default: {},
});
