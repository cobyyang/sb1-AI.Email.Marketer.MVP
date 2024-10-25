import React from 'react';
import { Copy, Download } from 'lucide-react';

interface EmailOutputProps {
  email: string;
  onCopy: () => void;
  onDownload: () => void;
}

export function EmailOutput({ email, onCopy, onDownload }: EmailOutputProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Generated Email</h2>
        <div className="flex gap-2">
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border border-gray-200">
          {email}
        </div>
      </div>
    </div>
  );
}