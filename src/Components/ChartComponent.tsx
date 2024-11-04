import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

interface Transaction {
    transaction: string;
    amount: number;
}
interface TransactionsProps {
    expense: Transaction[];
    income: Transaction[];
}

export default function ChartComponent({ expense, income }: TransactionsProps) {
    const data = [
        ...expense.map((e) => ({
            value: e.amount,
            label: e.transaction,
            color: "red",
        })),
        ...income.map((i) => ({
            value: i.amount,
            label: i.transaction,
            color: "green",
        })),
    ];

    return (
        <Box className="chart-container">
            <Typography variant="h5" className="chart-title">Transaction Distribution</Typography>
            <PieChart
                series={[{
                    data,
                    arcLabel: (item) => `${item.value}$`,
                    arcLabelMinAngle: 15,
                    arcLabelRadius: '60%',
                }]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                        color: 'white',
                    },
                }}
                width={500}
                height={300}
            />
        </Box>
    );
}
