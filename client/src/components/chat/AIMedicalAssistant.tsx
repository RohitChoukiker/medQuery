import React, { useState } from 'react';
import { askAI } from '../../api';

interface Message {
  text: string;
  isUser: boolean;
}

const AIMedicalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI medical assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await askAI(input);
      setMessages((prev) => [
        ...prev,
        { text: res.data?.answer || 'Sorry, I could not generate an answer.', isUser: false }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { text: 'Error: Unable to get answer from AI.', isUser: false }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3 rounded-lg ${msg.isUser ? 'bg-blue-100 dark:bg-blue-800 text-right ml-auto' : 'bg-gray-100 dark:bg-gray-800 mr-auto'}`}>{msg.text}</div>
        ))}
        {loading && <div className="text-gray-400">AI is typing...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Ask a medical question..."
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIMedicalAssistant; 