import React from 'react'

function AIChat() {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">AI Chat Assistant</h2>
      <textarea placeholder="Ask AI about safety..." className="w-full p-2 border rounded"></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Send</button>
    </div>
  )
}

export default AIChat