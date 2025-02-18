// src/components/LinkList.jsx
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import api from '../api';

const LinkList = ({ links, loading, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/links/${id}`);
      onDelete(); // Trigger parent to refresh
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div key={link.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.link}
              </a>
              <p className="text-gray-600">{link.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(link)}
                className="text-gray-500 hover:text-blue-600"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkList;