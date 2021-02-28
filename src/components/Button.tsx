import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Button: React.FC<ButtonProps> = ({
  value, children, ...props
}: ButtonProps) => (
  <button
    type="button"
    {...props}
  >
    {value || children}
  </button>
);
