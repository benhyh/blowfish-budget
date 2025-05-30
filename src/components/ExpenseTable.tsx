
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Expense {
  id: string;
  type: string;
  savingOrExpense: string;
  amount: number;
  description: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  const getRowColor = (type: string) => {
    switch (type) {
      case "Necessities":
        return "bg-yellow-100";
      case "Wants":
        return "bg-pink-100";
      case "Savings":
        return "bg-blue-100";
      default:
        return "bg-white";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Expense Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Saving/Expense</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} className={getRowColor(expense.type)}>
                <TableCell className="font-medium">{expense.type}</TableCell>
                <TableCell>{expense.savingOrExpense}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseTable;
