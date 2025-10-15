import { type LucideIcon } from "lucide-react"

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    icon?: LucideIcon;
    iconSize?: number;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

export default function Button({children,icon:Icon,className,iconSize,onClick,type = "button",disabled = false}: ButtonProps) {
    return(
        <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={`${disabled ? "" : "cursor-pointer"} ${className}`}>
            { Icon && <Icon size={iconSize}/>}
            {children}
        </button>
    )
}