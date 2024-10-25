import React, { useState } from 'react';
import { Sparkles, AlertCircle, LogOut } from 'lucide-react';
import { EmailForm } from './components/EmailForm';
import { EmailOutput } from './components/EmailOutput';
import { Auth } from './components/Auth';
import { ApiKeyForm } from './components/ApiKeyForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import { generateEmail } from './services/openai';

interface EmailFormData {
  wordCount: number;
  topic: string;
  conditions: string;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState<EmailFormData>({
    wordCount: 200,
    topic: '',
    conditions: '',
  });
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const email = await generateEmail(
        user?.apiKey || '',
        formData.wordCount,
        formData.topic,
        formData.conditions
      );
      setGeneratedEmail(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedEmail], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'marketing-email.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-indigo-600" />
              AI Email Marketer
            </h1>
            <p className="text-gray-600">Create engaging marketing emails in seconds</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <ApiKeyForm />

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <EmailForm
            formData={formData}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
          />
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 flex items-center gap-2">
            <AlertCircle className="text-red-400" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {generatedEmail && (
          <EmailOutput
            email={generatedEmail}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Auth />;
}

export default App;