import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import blowfishIcon from '../assets/blowfish_icon.png';
import { Button } from '@/components/ui/button';
import './Dashboard.css';

const Dashboard = () =>  {

    return (
        <div className='min-h-screen'>
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
        </div>
    )
}

export default Dashboard