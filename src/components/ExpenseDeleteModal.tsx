import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Expense {
  id: string;
  type: string;
  savingOrExpense: string;
  amount: number;
  description: string;
}

interface ExpenseDeleteModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExpenseDeleteModal = ({ expense, isOpen, onClose, onConfirm }: ExpenseDeleteModalProps) => {
  if (!expense) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the expense "{expense.description}"?
            <br />
            <span className="font-medium">
              {expense.type} • ${expense.amount.toFixed(2)} • {expense.savingOrExpense}
            </span>
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExpenseDeleteModal; 