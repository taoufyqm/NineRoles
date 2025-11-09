
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import RoleSwitcher from './RoleSwitcher';
import RoleView from './RoleView';
import ObserverDashboard from './ObserverDashboard';
import { LogoIcon } from './icons';

const Header: React.FC = () => {
    const { user } = useAppContext();
    
    return (
        <header className="p-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm bg-gray-900/80 text-white">
            <div className="flex items-center gap-4">
                <LogoIcon className="w-8 h-8 text-sky-400" />
                <div>
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    <p className="text-sm text-gray-400">Session Active</p>
                </div>
            </div>
        </header>
    );
}

const MainLayout: React.FC = () => {
    const { currentRole } = useAppContext();

    return (
        <div className="flex flex-col h-screen text-white">
            <Header />
            <main className="flex-grow overflow-y-auto p-4 md:p-6">
                {currentRole.id === 'Observer' ? <ObserverDashboard /> : <RoleView />}
            </main>
            <RoleSwitcher />
        </div>
    );
};

export default MainLayout;