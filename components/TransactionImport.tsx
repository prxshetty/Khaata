import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const TransactionImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !session) return;

    setIsUploading(true);
    setImportResult(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/import-transactions', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setImportResult(result.message);
      } else {
        throw new Error(result.message || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing transactions:', error);
      setImportResult(`Error importing transactions: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Choose CSV file
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button
        type="submit"
        disabled={!file || isUploading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {isUploading ? 'Uploading...' : 'Import Transactions'}
      </button>
      {importResult && (
        <div className={`mt-4 p-4 rounded ${importResult.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {importResult}
        </div>
      )}
    </form>
  );
};

export default TransactionImport;