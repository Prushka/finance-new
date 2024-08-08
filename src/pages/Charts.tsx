import {LineChart} from "@mantine/charts";


export function DemoChart({td}:{td:boolean}) {
    return (
        <LineChart
            h={300}
            data={td?[
                {
                    date: 'July 31',
                    Chequing: 2890,
                    Savings: 2338,
                    Credit: 2452,
                },
                {
                    date: 'Aug 1',
                    Chequing: 2890,
                    Savings: 2338,
                    Credit: 2452,
                },
                {
                    date: 'Aug 2',
                    Chequing: 2756,
                    Savings: 2103,
                    Credit: 2402,
                },
                {
                    date: 'Aug 3',
                    Chequing: 3322,
                    Savings: 986,
                    Credit: 1821,
                },
                {
                    date: 'Aug 4',
                    Chequing: 3470,
                    Savings: 2108,
                    Credit: 2809,
                },
            ]:[
                {
                    date: 'July 31',
                    Chequing: 3720,
                    Savings: 2338,
                },
                {
                    date: 'Aug 1',
                    Chequing: 4320,
                    Savings: 120,
                },
                {
                    date: 'Aug 2',
                    Chequing: 1100,
                    Savings: 218,
                },
                {
                    date: 'Aug 3',
                    Chequing: 1100,
                    Savings: 218,
                },
                {
                    date: 'Aug 4',
                    Chequing: 1000,
                    Savings: 281,
                },
            ]}
            dataKey="date"
            withLegend
            series={[
                { name: 'Chequing', color: 'indigo.6' },
                { name: 'Savings', color: 'blue.6' },
                { name: 'Credit', color: 'red.6', label: 'Credit Card' },
            ]}
        />
    )
}
