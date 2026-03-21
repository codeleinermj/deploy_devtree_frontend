type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-500/10 text-red-400 border border-red-500/20 p-3 uppercase text-sm font-bold text-center rounded-lg">{children}</p>
  )
}
