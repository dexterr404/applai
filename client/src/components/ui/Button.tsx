import { type LucideIcon } from "lucide-react";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    icon?: LucideIcon;
    iconSize?: number;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    title?: string;
}

export default function Button({
    children,
    icon: Icon,
    className,
    iconSize,
    onClick,
    type = "button",
    disabled = false,
    title,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            title={title} // <-- Add title here
            className={`${disabled ? "" : "cursor-pointer"} ${className}`}
        >
            {Icon && <Icon size={iconSize} />}
            {children}
        </button>
    )
}
