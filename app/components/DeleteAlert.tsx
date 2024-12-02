interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  //   user: User | null;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  onConfirm,
  //   user,
}) => {
  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
          Warning
        </h2>
        <p className="text-gray-700 mb-6">
          You’re about to deactivate a user. This user will not be able to log
          in again until activated.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#FF1717] text-white uppercase flex justify-center gap-2 items-center rounded-md"
          >
            Yes, Deactivate
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded hover:bg-[#F3F3F3] border border-[#12121233]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteAlert;
