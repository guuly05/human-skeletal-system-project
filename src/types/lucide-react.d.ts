declare module 'lucide-react' {
  import type { ComponentType, SVGProps } from 'react';

  type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  };
  type Icon = ComponentType<IconProps>;

  export const Activity: Icon;
  export const Brain: Icon;
  export const Bone: Icon;
  export const CircleDot: Icon;
  export const HeartPulse: Icon;
  export const Info: Icon;
  export const Pause: Icon;
  export const Play: Icon;
  export const RotateCcw: Icon;
  export const Search: Icon;
  export const Wind: Icon;
}
