import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Button: React.FC<ButtonProps> = ({
  value, ...props
}: ButtonProps) => (
  <button
    type="button"
    {...props}
  >
    {value}
  </button>
);
