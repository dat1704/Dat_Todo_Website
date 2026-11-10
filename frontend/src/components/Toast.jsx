export default function Toast({ message }) {
  return (
    <div aria-live="polite" role="status">
      {message && (
        <div className="animate-toast-in fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full bg-ink px-6 py-3.5 text-center text-sm text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  )
}
