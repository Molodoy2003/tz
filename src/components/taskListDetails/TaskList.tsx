import { Task } from '@/redux/features/taskSlice'
import TaskItem from './TaskItem'

type TaskListProps = {
  tasks: Task[]
  onDeleteTask: (taskId: string) => void
  onUpdateTask: (task: Task) => void
  onOpenModal: (task: Task) => void
}

export default function TaskList({
  tasks,
  onDeleteTask,
  onUpdateTask,
  onOpenModal,
}: TaskListProps) {
  if (tasks.length === 0) return <p>Задачи отсутствуют.</p>

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>Задачи</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onUpdate={onUpdateTask}
            onOpenModal={() => onOpenModal(task)}
          />
        ))}
      </ul>
    </div>
  )
}
