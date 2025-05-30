
import React, {useState, useEffect} from 'react'; /*useState for gif, useEffect for timer*/
import blowfishDeflated from "@/assets/blowfish_deflated.png";
import blowfishInflated from "@/assets/blowfish_inflated.png";
import blowfishInflatingAnim from "@/assets/blowfish_inflating_animation.gif";
import blowfishDeflatingAnim from "@/assets/blowfish_deflating_animation.gif";

interface BudgetStatusProps {
  isOverBudget: boolean;
}

const BudgetStatus = ({ isOverBudget }: BudgetStatusProps) => {
  const [animateInflate, playInflateAnimation] = useState(false);
  const [animateDeflate, playDeflateAnimation] = useState(false);

  useEffect(() => {
    if (isOverBudget) {
      playInflateAnimation(true);
      playDeflateAnimation(false);

      /* the timer to start inflated png once gif finishes */
      const timer = setTimeout(
        () => { playInflateAnimation(false);}, 
        466.667);

        return() => clearTimeout(timer);
    }
    else { /* user went back under budget */
      if (animateInflate == false) {
        playDeflateAnimation(true);

        /* the timer to start deflated png once gif finishes */
        const timer = setTimeout(
          () => { playDeflateAnimation(false);}, 
          466.667);

          return() => clearTimeout(timer);
      }
    }
  }, [isOverBudget]);

  return (
    <div className="flex flex-col items-center">
      { animateInflate ? ( /* animate inflating */
        <img src={blowfishInflatingAnim} alt={"Over budget - animated blowfish"}
          className="w-64 h-64 mb-4"/>
      ) : animateDeflate ? ( /* animate deflating */
        <img src={blowfishDeflatingAnim} alt={"Within budget - animated blowfish"}
          className="w-64 h-64 mb-4"/>
      ) : isOverBudget ? ( /* inflated if over budget */
        <img src={blowfishInflated} alt={"Over budget - inflated blowfish"}
          className="w-64 h-64 mb-4"/>
      ) : ( /* deflated state */
        <img src={blowfishDeflated} alt={"Within budget - deflated blowfish"}
          className="w-64 h-64 mb-4"/>
      )
    }
      <p className="text-sm text-gray-600 italic">
        {isOverBudget ? "You're over budget!" : "You're within budget!"}
      </p>
    </div>
  );
};

export default BudgetStatus;
