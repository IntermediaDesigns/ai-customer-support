import React from 'react';
import { Plus } from 'lucide-react';

const Sidebar = ({ setShowSidebar = () => {} }) => {
  return (
    <div className='w-80 bg-sidebar p-5'>
      <div className='flex items-center gap-2 border border-gray-200 border-solid text-gray-200 p-2 rounded-sm w-max text-sm'>
        <Plus size={15} />
        New Chat
      </div>
    </div>
  );
};

export default Sidebar;