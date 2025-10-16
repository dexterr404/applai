type AvatarProps = {
    source?: string;
    className?: string;
    onClick: () => void;
}

export default function Avatar({source, className, onClick}: AvatarProps) {
    return (
        <img onClick={onClick} src={source} className={`${className}`}/>
    )
}