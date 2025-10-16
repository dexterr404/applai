import { Plus } from "lucide-react"
import { useUser } from "../../hooks/useUser";

import Button from "../ui/Button";
import UserMenu from "../ui/UserMenu";
import Logo from "../../assets/applai-logo.svg"


type HeaderProps = {
  setIsFormOpen: (value: boolean) => void;
}

export default function Header({setIsFormOpen}: HeaderProps) {
    const { data: user } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return(
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <img src={Logo} className="size-10"/>
                <div className="min-w-0">
                    <h1 className="text-lg sm:text-2xl font-bold text-slate-800 truncate text-left">ApplAi</h1>
                    <p className="text-xs sm:text-sm text-slate-500 hidden sm:block text-left">Track smarter, land faster</p>
                </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                    onClick={() => setIsFormOpen(true)}
                    icon={Plus} 
                    iconSize={20} 
                    className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 text-sm sm:text-base flex-shrink-0'
                    >
                    <span className="hidden sm:inline">Add Job</span>
                    <span className="sm:hidden">Add</span>
                    </Button>
                    <UserMenu user={user} onLogout={handleLogout}/>
                </div>
            </div>
            </div>
        </header>
    )
}