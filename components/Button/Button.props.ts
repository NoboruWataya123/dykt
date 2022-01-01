import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    size?: 's' | 'm' ;
    color?: 'ghost' | 'danger' | 'grey' | 'green' | 'primary' | 'default';
    href?: string;
}