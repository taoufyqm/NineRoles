
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { ROLES } from '../constants';

const RoleSwitcher: React.FC = () => {
  const { currentRole, selectRole } = useAppContext();

  const baseBg = 'bg-gray-800';
  const border = 'border-gray-700';
  const activeBg = 'bg-sky-500/20';
  const textColor = 'text-gray-300';

  return (
    <nav className={`sticky bottom-0 ${baseBg} border-t ${border} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-20">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => selectRole(role)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg transition-all duration-200 group ${currentRole.id === role.id ? activeBg : 'hover:bg-gray-500/10'}`}
              aria-label={role.name}
            >
              <role.icon
                className={`w-7 h-7 mb-1 transition-colors ${currentRole.id === role.id ? role.color : `${textColor} group-hover:${role.color}`}`}
              />
              <span
                className={`text-xs font-medium transition-colors ${currentRole.id === role.id ? role.color : `${textColor} group-hover:${role.color}`}`}
              >
                {role.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RoleSwitcher;