// src/components/LinkForm.jsx
import { useState } from 'react';
import api from '../api';
import { formatUrl } from '../utils/formatUrl';

const LinkForm = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {
    link: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.link || !formData.description) {
      setError('Both fields are required');
      return;
    }

    try {
      const formattedLink = formatUrl(formData.link);
      const dataToSend = { ...formData, link: formattedLink };

      if (initialData) {
        await api.put(`/links/${initialData.id}`, dataToSend);
      } else {
        await api.post('/links', dataToSend);
      }
      onSuccess(); // This should trigger a refresh
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <input
          type="text"
          placeholder="Enter URL or domain name"
          className="w-full p-2 border rounded"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        <p className="text-sm text-gray-500 mt-1">
          We'll automatically add http:// and .com if needed
        </p>
      </div>
      <div>
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? 'Update Link' : 'Add Link'}
      </button>
    </form>
  );
};

export default LinkForm;