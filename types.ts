export interface Position {
  top: string | number;
  left: string | number;
  position: 'static' | 'absolute' | 'fixed';
}

export interface FloatingHeartProps {
  delay: number;
  duration: number;
  left: number;
  size: number;
}
