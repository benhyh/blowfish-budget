
import blowfishDeflated from "@/assets/blowfish_deflated.png";
import blowfishInflated from "@/assets/blowfish_inflated.png";

interface BudgetStatusProps {
  isOverBudget: boolean;
}

const BudgetStatus = ({ isOverBudget }: BudgetStatusProps) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src={isOverBudget ? blowfishInflated : blowfishDeflated} 
        alt={isOverBudget ? "Over budget - inflated blowfish" : "Within budget - deflated blowfish"}
        className="w-32 h-32 mb-4"
      />
      <p className="text-sm text-gray-600 italic">
        {isOverBudget ? "You're over budget!" : "You're within budget!"}
      </p>
    </div>
  );
};

export default BudgetStatus;
