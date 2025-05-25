interface TaskModalActionsProps {
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onDelete: () => void
  onClose: () => void
}

export function TaskModalActions({
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onClose,
}: TaskModalActionsProps) {
  return (
    <div className='flex justify-between items-center pt-4 border-t mt-2'>
      <button
        onClick={onDelete}
        className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
      >
        Удалить
      </button>
      <div className='flex gap-2'>
        {isEditing ? (
          <button
            onClick={onSave}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Сохранить
          </button>
        ) : (
          <button
            onClick={onEdit}
            className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'
          >
            Редактировать
          </button>
        )}
        <button
          onClick={onClose}
          className='px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400'
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
