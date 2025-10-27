type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children}: ModalProps) {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
            {/* Modal Content */}
            <div className="bg-white max-h-[80vh] overflow-y-auto rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
                {/* Close Button */}
                <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-800"
                >
                ✕
                </button>

                {/* Optional Title */}
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

                {/* Body */}
                {children}
            </div>
        </div>
    )
}