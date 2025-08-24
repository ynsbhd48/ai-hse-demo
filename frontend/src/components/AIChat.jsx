import React, { useState } from 'react'
import useAppStore from '../store/appStore'
import { Send, Sparkles } from 'lucide-react'

const AIChat = React.memo(function AIChat() {
  const { chat, sendPrompt } = useAppStore()
  const [text, setText] = useState('')

  const onSend = (e) => {
    e?.preventDefault()
    if (!text.trim()) return
    sendPrompt(text.trim())
    setText('')
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles size={18}/> AI Safety Copilot</h2>
      </div>
      <div className="h-48 overflow-y-auto space-y-2 pr-1">
        {chat.length === 0 && (
          <div className="text-sm text-gray-500">Ask about risk, permits, PPE, or compliance trends.</div>
        )}
        {chat.map(m => (
          <div key={m.id} className={`chat ${m.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-info' : 'chat-bubble-success'}`}>{m.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={onSend} className="mt-3 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="input input-bordered w-full" placeholder="Ask AI about safety..." />
        <button type="submit" className="btn btn-primary" aria-label="Send"><Send size={16}/></button>
      </form>
    </div>
  )
})

export default AIChat