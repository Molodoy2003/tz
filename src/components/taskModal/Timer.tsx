interface TimerProps {
  secondsLeft: number
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Timer({
  secondsLeft,
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className='text-5xl font-mono text-center text-blue-600'>
      {formatTime(secondsLeft)}
      <div className='flex justify-center gap-4 mt-4'>
        {!isRunning ? (
          <button
            onClick={onStart}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            Старт
          </button>
        ) : (
          <button
            onClick={onPause}
            className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
          >
            Пауза
          </button>
        )}
        <button
          onClick={onReset}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
        >
          Сброс
        </button>
      </div>
    </div>
  )
}
