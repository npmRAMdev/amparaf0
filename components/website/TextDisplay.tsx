
export default function TextDisplay({message, className = ''}: {message: string;className: string }) {

  return (
    <div 
      className={`whitespace-pre-wrap leading-relaxed ${className}`}
      style={{
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
      }}
    >
      {message}
    </div>
  )
}