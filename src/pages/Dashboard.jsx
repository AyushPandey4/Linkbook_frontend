// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import LinkList from '../components/LinkList';
import LinkForm from '../components/LinkForm';
import api from '../api';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editLink, setEditLink] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const response = await api.get('/links');
      setLinks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSuccess = () => {
    fetchLinks(); // Refresh the list after submission
    setShowForm(false);
    setEditLink(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditLink(null);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'Add New Link'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <LinkForm onSuccess={handleSuccess} />
        </div>
      )}

      {editLink ? (
        <div className="mb-6">
          <LinkForm initialData={editLink} onSuccess={handleSuccess} />
        </div>
      ) : (
        <LinkList 
          links={links}
          loading={loading}
          onEdit={(link) => {
            setEditLink(link);
            setShowForm(false);
          }}
          onDelete={fetchLinks} // Refresh after delete
        />
      )}
    </div>
  );
};

export default Dashboard;