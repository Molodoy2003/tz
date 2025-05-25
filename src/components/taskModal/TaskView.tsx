interface TaskViewProps {
  title: string
  description: string
  time: number
}

export function TaskView({ title, description, time }: TaskViewProps) {
  return (
    <div className='space-y-2'>
      <h3 className='text-xl font-bold'>{title}</h3>
      <p>{description}</p>
      <p className='text-gray-600'>⏱ Время на выполнение: {time} мин</p>
    </div>
  )
}
