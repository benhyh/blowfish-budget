import { useState, useEffect } from "react";
import { UserButton } from "@clerk/clerk-react";
import BudgetStatus from "@/components/BudgetStatus";
import BudgetCard from "@/components/BudgetCard";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import ExpenseEditModal from "@/components/ExpenseEditModal";
import ExpenseDeleteModal from "@/components/ExpenseDeleteModal";
import blowfishIcon from "@/assets/blowfish_icon.png";
import { useSupabaseUser } from "@/lib/auth";
import { fetchUserExpenses, createExpense, updateExpense, deleteExpense, type Expense } from "@/lib/expenseService";

const Dashboard = () => {
  const { user, isLoaded, syncUser } = useSupabaseUser();
  const [income, setIncome] = useState(5000);
  const [totalSavings, setTotalSavings] = useState(1000);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sync user with Supabase when component mounts and user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      console.log('Syncing user with Supabase:', user.id);
      syncUser();
    }
  }, [isLoaded, user, syncUser]);

  // Fetch expenses when user is available
  useEffect(() => {
    const loadExpenses = async () => {
      if (user?.id) {
        console.log('Loading expenses for user:', user.id);
        
        setLoading(true);
        const userExpenses = await fetchUserExpenses(user.id);
        console.log('Fetched expenses:', userExpenses);
        setExpenses(userExpenses);
        setLoading(false);
      }
    };

    loadExpenses();
  }, [user?.id]);

const totalExpenses = expenses
    .filter(expense => expense.savingOrExpense === "Expense")
    .reduce((sum, expense) => sum + expense.amount, 0);
  /*calculating actual expenses */
  const actualSavings = expenses
  .filter((e) => e.savingOrExpense === "Saving")
  .reduce((sum, e) => sum + e.amount, 0);

  const actualExpenses = totalExpenses; 

  const actualDifference = actualSavings - actualExpenses;

  const budgetItems = [
    { type: "Necessities", percentage: 50, budget: (income * 0.5), color: "bg-yellow-100" },
    { type: "Wants", percentage: 30, budget: (income * 0.3), color: "bg-pink-100" },
    { type: "Savings", percentage: 20, budget: (income * 0.2), color: "bg-blue-100" }
  ];

  /*calculaing expected expenses*/
  const expectedSavings = budgetItems.find((item) => item.type === "Savings")?.budget || 0;
  const expectedExpenses = budgetItems
  .filter((item) => item.type !== "Savings")
  .reduce((sum, item) => sum + item.budget, 0);
  const expectedDifference = expectedSavings - expectedExpenses;

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
  const isOverBudget = totalExpenses > totalBudget;

  const handleAddExpense = async (newExpense: Omit<Expense, 'id'>) => {
    console.log('Adding expense:', newExpense);
    console.log('Current user:', user?.id);
    
    if (!user?.id) {
      console.error(' No user ID available');
      return;
    }

    try {
      const createdExpense = await createExpense(user.id, newExpense);
      console.log('Expense created:', createdExpense);
      
      if (createdExpense) {
        setExpenses(prev => {
          const updated = [createdExpense, ...prev];
          console.log('Updated expenses list:', updated);
          return updated;
        });
      } else {
        console.error('Failed to create expense');
      }
    } catch (error) {
      console.error('Error in handleAddExpense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    console.log('Deleting expense:', expenseId);
    
    if (!user?.id) {
      console.error('No user ID available');
      return;
    }

    try {
      const success = await deleteExpense(expenseId);
      
      if (success) {
        setExpenses(prev => {
          const updated = prev.filter(expense => expense.id !== expenseId);
          console.log('Expense deleted, updated list:', updated);
          return updated;
        });
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error in handleDeleteExpense:', error);
    }
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    console.log('Updating expense:', updatedExpense);
    
    if (!user?.id) {
      console.error('No user ID available');
      return;
    }

    try {
      const result = await updateExpense(updatedExpense.id, updatedExpense);
      
      if (result) {
        setExpenses(prev => {
          const updated = prev.map(expense => 
            expense.id === updatedExpense.id ? result : expense
          );
          console.log('Expense updated, updated list:', updated);
          return updated;
        });
      } else {
        console.error('Failed to update expense');
      }
    } catch (error) {
      console.error('Error in handleUpdateExpense:', error);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  const handleShowDeleteModal = (expense: Expense) => {
    setDeletingExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingExpense(null);
  };

  const handleConfirmDelete = () => {
    if (deletingExpense) {
      handleDeleteExpense(deletingExpense.id);
      handleCloseDeleteModal();
    }
  };

  // Show loading state while user or expenses are loading
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-blue-100/30 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/lovable-uploads/06dabb6b-3cef-4526-9e7e-3f5b04abb716.png)`
      }}
    >
      <div className="min-h-screen bg-blue-100/30 backdrop-blur-sm">
        {/* Navigation */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={blowfishIcon} alt="Blowfish icon" className="h-8 w-8"/>
              <span className="text-lg font-semibold">Blowfish Budgeting</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/" className="hover:text-blue-300">Home</a>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blowfish Budgeting</h1>
            <p className="text-lg text-gray-700 italic">-- "Don't blow it!"</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
                {/* Blowfish Status */}
              <div className="flex justify-center">
                <BudgetStatus isOverBudget={isOverBudget} />
              </div>

                {/* Budget Info */}
              <BudgetCard
                income={income}
                setIncome={setIncome}
                totalSavings={totalSavings}
                setTotalSavings={setTotalSavings}
                totalExpenses={totalExpenses}
                budgetItems={budgetItems}
                expectedSavings={expectedSavings}
                expectedExpenses={expectedExpenses}
                expectedDifference={expectedDifference}
                actualSavings={actualSavings}
                actualExpenses={actualExpenses}
                actualDifference={actualDifference}
              />
              
              
            </div>

            {/* Right Column - Expense Management */}
            <div className="lg:col-span-2 space-y-6">
              <ExpenseForm onAddExpense={handleAddExpense} />
              <ExpenseTable 
                expenses={expenses} 
                onDelete={handleShowDeleteModal}
                onUpdate={handleEditExpense}
              />
              
              <ExpenseEditModal
                expense={editingExpense}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onSave={handleUpdateExpense}
              />
              
              <ExpenseDeleteModal
                expense={deletingExpense}
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
