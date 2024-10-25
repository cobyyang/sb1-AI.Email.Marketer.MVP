import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Key } from 'lucide-react';

export function ApiKeyForm() {
  const { user, updateApiKey } = useAuth();
  const [apiKey, setApiKey] = useState(user?.apiKey || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiKey(apiKey);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Key className="text-indigo-600" />
        OpenAI API Key
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="sk-..."
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700"
        >
          Save API Key
        </button>
      </form>
    </div>
  );
}