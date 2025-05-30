import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { it } from "node:test";
import { set } from "date-fns";

interface BudgetItem {
  type: string;
  percentage: number;
  budget: number;
  color: string;
}

interface BudgetCardProps {
  income: number;
  setIncome: (value: number) => void;
  totalSavings: number;
  setTotalSavings: (value: number) => void;
  totalExpenses: number;
  budgetItems: BudgetItem[];
  setBudgetItems?: (items: BudgetItem[]) => void;
  adjusted: number[];
  setAdjusted: (arr: number[]) => void;
}

const BudgetCard = ({
  income,
  setIncome,
  totalSavings,
  setTotalSavings,
  totalExpenses,
  budgetItems,
  setBudgetItems,
  adjusted,
  setAdjusted,
}: BudgetCardProps) => {
  const initialBudgetTypes = [
    { type: "Necessities", percentage: 50, color: "bg-yellow-100" },
    { type: "Wants", percentage: 30, color: "bg-pink-100" },
    { type: "Savings", percentage: 20, color: "bg-blue-100" },
  ];

  const defaultBudgetItems = useMemo(
    () =>
      initialBudgetTypes.map((item) => ({
        ...item,
        budget: Number(((income * item.percentage) / 100).toFixed(2)),
      })),
    [income]
  );

  const handleBudgetChange = (index: number, value: number | undefined) => {
    const updated = [...budgetItems];
    updated[index].budget = value || 0; // Ensure adjust is a number, default to 0 if undefined
    setBudgetItems(updated);
  };

  const handleReset = () => {
    setBudgetItems && setBudgetItems(defaultBudgetItems);
  };

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Total Savings
              </label>
              <Input
                type="number"
                value={totalSavings}
                onChange={(e) => setTotalSavings(Number(e.target.value))}
                className="bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Total Expenses
              </label>
              <Input
                type="number"
                value={totalExpenses}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Create your budget:
          </CardTitle>
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
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 p-3 rounded-lg ${item.color}`}
              >
                <span className="font-medium">{item.type}</span>
                <span>{item.percentage}%</span>
                <span>${((income * item.percentage) / 100).toFixed(2)}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={
                    adjusted[index] === undefined ||
                    adjusted[index] === null ||
                    adjusted[index] === 0
                      ? ""
                      : adjusted[index]
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    // Only allow digits and at most one dot
                    if (/^\d*\.?\d*$/.test(val)) {
                      const updated = [...adjusted];
                      updated[index] = val === "" ? undefined : Number(val);
                      setAdjusted(updated);
                    }
                  }}
                  placeholder="Adjust budget"
                  className="bg-blue-50/50"
                />
                {/* <span>${item.budget.toFixed(2)}</span> */}
              </div>
            ))}

            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={handleReset}
            >
              Reset to default
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCard;
