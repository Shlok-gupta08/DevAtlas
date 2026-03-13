import { useDSAStore } from '../../store/useDSAStore';

export default function DeleteConfirmDialog({ catId, question, onClose }) {
    const deleteCustomQuestion = useDSAStore((s) => s.deleteCustomQuestion);

    function handleDelete() {
        deleteCustomQuestion(catId, question.id);
        onClose();
    }

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-box delete-q-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-title">Delete Question</div>
                <div className="dialog-msg">
                    Are you sure you want to delete <strong>"{question.title}"</strong>?
                    This action cannot be undone.
                </div>
                <div className="dialog-actions-sticky">
                    <button type="button" className="dialog-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" className="dialog-delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
