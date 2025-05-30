
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface BudgetItem {
  type: string;
  percentage: number;
  budget: number;
  color: string;
}

interface BudgetCardProps {
  income: number;
  setIncome: (income: number) => void;
  totalSavings: number;
  setTotalSavings: (savings: number) => void;
  totalExpenses: number;
  budgetItems: {
    type: string;
    percentage: number;
    budget: number;
    color: string;
  }[];
  expectedSavings: number;
  expectedExpenses: number;
  expectedDifference: number;
  actualSavings: number;
  actualExpenses: number;
  actualDifference: number;
}

const BudgetCard = ({ income,
  setIncome,
  totalSavings,
  setTotalSavings,
  totalExpenses,
  budgetItems,
  expectedSavings,
  expectedExpenses,
  expectedDifference,
  actualSavings,
  actualExpenses,
  actualDifference, }: BudgetCardProps) => {

  const savingsDifference = actualSavings - expectedSavings;
  const expensesDifference = expectedExpenses - actualExpenses;
  
  return (
    <div className="space-y-6">
      {/* Income and Totals */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Income</label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="bg-blue-50/50"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
          
            {/* Savings Row */}
            <div className="grid grid-cols-3 gap-4 items-start mb-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Expected Savings</label>
                <div className="bg-blue-50/50 rounded-md px-4 py-2 text-sm border w-32">
                  ${expectedSavings.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Actual<br />Savings</label>
                <div className="bg-blue-50/50 rounded-md px-4 py-2 text-sm border w-32">
                  ${actualSavings.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Savings Difference</label>
                <div
                className={`rounded-md px-4 py-2 text-sm border w-32 ${
                  savingsDifference < 0 ? "bg-red-100 text-red-800" : "bg-blue-50/50"
                }`}
              >
                ${savingsDifference.toFixed(2)}
              </div>
              </div>
            </div>

            {/* Expenses Row */}
            <div className="grid grid-cols-3 gap-4 items-start">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Expected Expenses</label>
                <div className="bg-gray-100 rounded-md px-4 py-2 text-sm border w-32">
                  ${expectedExpenses.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Actual<br /> Expenses</label>
                <div className="bg-gray-100 rounded-md px-4 py-2 text-sm border w-32">
                  ${actualExpenses.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Expenses Difference</label>
                <div
                  className={`rounded-md px-4 py-2 text-sm border w-32 ${
                    expensesDifference < 0 ? "bg-red-100 text-red-800" : "bg-gray-100"
                  }`}
                >
                  ${expensesDifference.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create your budget:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium mb-4">
              <span>Type</span>
              <span>% of Income</span>
              <span>Budget</span>
              <span>Adjusted</span>
            </div>
            
            {budgetItems.map((item, index) => (
              <div key={index} className={`grid grid-cols-4 gap-4 p-3 rounded-lg ${item.color}`}>
                <span className="font-medium">{item.type}</span>
                <span>{item.percentage}%</span>
                <span>${((income * item.percentage) / 100).toFixed(2)}</span>
                <span>${item.budget.toFixed(2)}</span>
              </div>
            ))}
            
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Reset to default
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCard;
