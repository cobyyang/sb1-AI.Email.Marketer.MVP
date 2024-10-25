import React from 'react';
import { Send } from 'lucide-react';

interface EmailFormProps {
  formData: {
    wordCount: number;
    topic: string;
    conditions: string;
  };
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string | number) => void;
}

export function EmailForm({ formData, isLoading, onSubmit, onChange }: EmailFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 mb-1">
          Word Count
        </label>
        <input
          type="number"
          id="wordCount"
          min="50"
          max="1000"
          value={formData.wordCount || ''}
          onChange={(e) => onChange('wordCount', parseInt(e.target.value) || 200)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          Topic
        </label>
        <input
          type="text"
          id="topic"
          value={formData.topic}
          onChange={(e) => onChange('topic', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., New Product Launch, Holiday Sale"
        />
      </div>

      <div>
        <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">
          Conditions
        </label>
        <textarea
          id="conditions"
          value={formData.conditions}
          onChange={(e) => onChange('conditions', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Include call to action, Keep tone professional"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.topic || !formData.conditions}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            Generate Email
          </>
        )}
      </button>
    </form>
  );
}