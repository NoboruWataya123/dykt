import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface FooterProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode;
}