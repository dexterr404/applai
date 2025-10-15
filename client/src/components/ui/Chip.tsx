type ChipProps = {
    label?: string;
    className?: string;
}

export default function Chip({label,className}: ChipProps) {
    return (
        <div className={`${className}`}>
            {label}
        </div>
    )
}