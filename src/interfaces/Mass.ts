import { svgName } from '@/components/svg';

export default interface Mass {
  id?: number;
  mass: number;
  size: number;
  type: svgName;
  color: string;
}
