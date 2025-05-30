import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Expense {
  id: string;
  type: string;
  savingOrExpense: string;
  amount: number;
  description: string;
}

interface ExpenseEditModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedExpense: Expense) => void;
}

const ExpenseEditModal = ({ expense, isOpen, onClose, onSave }: ExpenseEditModalProps) => {
  const [formData, setFormData] = useState({
    type: '',
    savingOrExpense: '',
    amount: 0,
    description: ''
  });

  // Update form data when expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        type: expense.type,
        savingOrExpense: expense.savingOrExpense,
        amount: expense.amount,
        description: expense.description
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expense) return;

    const updatedExpense: Expense = {
      ...expense,
      ...formData
    };

    onSave(updatedExpense);
    onClose();
  };

  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
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

          <div className="space-y-2">
            <Label htmlFor="savingOrExpense">Saving or Expense</Label>
            <Select
              value={formData.savingOrExpense}
              onValueChange={(value) => setFormData(prev => ({ ...prev, savingOrExpense: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Saving">Saving</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseEditModal; 