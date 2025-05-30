
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { TrendingUp, PieChart, Target } from "lucide-react";
import { Link } from "react-router-dom";
import blowfishIcon from "@/assets/blowfish_icon.png"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={blowfishIcon} alt="Blowfish icon" className="h-12 w-12"/>
          <span className="text-2xl font-bold text-gray-900">Blowfish Budget</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Take Control of Your
              <span className="text-blue-600 block">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Smart budgeting made simple. Track expenses, set goals, and build wealth with our intuitive financial management platform.
            </p>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started Free
                </Button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Expenses</h3>
              <p className="text-gray-600 text-center">Monitor your spending patterns and identify areas for improvement</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Planning</h3>
              <p className="text-gray-600 text-center">Create personalized budgets that align with your financial goals</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Achieve Goals</h3>
              <p className="text-gray-600 text-center">Set and reach your financial milestones with guided planning</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Trusted by thousands of users worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
