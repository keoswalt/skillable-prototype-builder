import { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, ...props }, ref) => {
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon'; 