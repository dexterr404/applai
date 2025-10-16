import { useState, useEffect, useRef } from 'react';
import { User, LogOut } from 'lucide-react';
import Button from './Button';
import Avatar from './Avatar';
import Modal from './Modal';

interface UserMenuProps {
  user?: {
    email?: string;
    picture?: string;
  };
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Avatar 
        onClick={() => setIsMenuOpen(prev => !prev)} 
        source={user?.picture} 
        className="size-10 rounded-full cursor-pointer"
      />

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <User className="w-4 h-4"/>
            <p className="text-sm text-left truncate">
              {user?.email}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Logout Button */}
          <Button
            onClick={() => {
              setIsLogoutOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      )}
      <Modal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}>
        <h2 className="font-semibold text-lg py-4">Do you really want to logout?</h2>
        <div className="flex justify-between items-center py-4">
            <Button 
            onClick={() => setIsLogoutOpen(false)}
            className="bg-blue-600 min-w-24 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            No
            </Button>
            <Button
            onClick={onLogout}
            className="bg-red-600 min-w-24 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Delete
            </Button>
        </div>
      </Modal>
    </div>
  );
}