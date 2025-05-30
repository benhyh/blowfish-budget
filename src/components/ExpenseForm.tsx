
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Expense {
  id: string;
  type: string;
  savingOrExpense: string;
  amount: number;
  description: string;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [type, setType] = useState("");
  const [savingOrExpense, setSavingOrExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type && savingOrExpense && amount && description) {
      onAddExpense({
        type,
        savingOrExpense,
        amount: Number(amount),
        description
      });
      setType("");
      setSavingOrExpense("");
      setAmount("");
      setDescription("");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add New Expense:</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Necessities">Necessities</SelectItem>
                  <SelectItem value="Wants">Wants</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Saving or Expense?</label>
              <Select value={savingOrExpense} onValueChange={setSavingOrExpense}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saving">Saving</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Brief Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Add Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
