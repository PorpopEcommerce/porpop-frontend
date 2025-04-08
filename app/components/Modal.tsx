import Button from "./product/Button";

export const Modal = ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="bg-[#1f2937] p-6 rounded shadow-lg w-[80%] max-w-[60rem] h-[100%] max-h-[30rem]">
          <Button
            onClick={onClose}
            label="CLOSE"
            custom="absolute max-w-fit top-2 right-2 bg-red-700"
          />
          <div className="h-full p-4 overflow-y-auto">{children}</div>{" "}
        </div>
      </div>
    );
  };