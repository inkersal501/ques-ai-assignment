function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full">
      <div className="bg-white rounded-2xl shadow-xl md:w-2xl  p-6 relative">        
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;