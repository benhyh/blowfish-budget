import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Expense {
  id: string;
  type: string;
  savingOrExpense: string;
  amount: number;
  description: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (expense: Expense) => void;
  onUpdate: (expense: Expense) => void;
}

const ExpenseTable = ({ expenses, onDelete, onUpdate }: ExpenseTableProps) => {
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

  const handleDelete = (expense: Expense) => {
    onDelete(expense);
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
              <TableHead className="w-20">Type</TableHead>
              <TableHead className="w-28">Saving/Expense</TableHead>
              <TableHead className="w-24">Amount</TableHead>
              <TableHead className="w-64">Description</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} className={getRowColor(expense.type)}>
                <TableCell className="font-medium w-20">{expense.type}</TableCell>
                <TableCell className="w-28">{expense.savingOrExpense}</TableCell>
                <TableCell className="w-24">${expense.amount.toFixed(2)}</TableCell>
                <TableCell className="w-64">{expense.description}</TableCell>
                <TableCell className="w-32">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdate(expense)}
                      className="bg-slate-200 hover:bg-slate-300 border-white-300"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(expense)}
                      className="bg-red-100 hover:bg-red-200 border-red-300 text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseTable;
