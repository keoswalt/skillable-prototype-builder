import { Home, Settings } from 'lucide-react';
import { Icon } from './Icon';
import { Icons } from '../constants/icons';

export function IconExample() {
  return (
    <div className="p-6 space-y-8">
      {/* Direct usage of Lucide icons */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Direct Usage</h2>
        <div className="flex gap-4">
          <Home className="w-6 h-6 text-primary-main" />
          <Settings size={24} color="currentColor" strokeWidth={2} />
        </div>
      </div>

      {/* Using our Icon component */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Using Icon Component</h2>
        <div className="flex gap-4">
          <Icon 
            icon={Icons.home}
            className="w-6 h-6 text-primary-main hover:text-primary-dark transition-colors"
          />
          <Icon
            icon={Icons.settings}
            className="w-6 h-6 text-secondary-main hover:text-secondary-dark transition-colors"
          />
        </div>
      </div>

      {/* Different sizes */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Different Sizes</h2>
        <div className="flex items-center gap-4">
          <Icon icon={Icons.bell} className="w-4 h-4" /> {/* Small */}
          <Icon icon={Icons.bell} className="w-6 h-6" /> {/* Medium */}
          <Icon icon={Icons.bell} className="w-8 h-8" /> {/* Large */}
        </div>
      </div>

      {/* With animations */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">With Animations</h2>
        <div className="flex gap-4">
          <Icon 
            icon={Icons.bell} 
            className="w-6 h-6 hover:animate-bounce text-primary-main"
          />
          <Icon 
            icon={Icons.alert} 
            className="w-6 h-6 hover:animate-pulse text-critical-main"
          />
        </div>
      </div>
    </div>
  );
} 