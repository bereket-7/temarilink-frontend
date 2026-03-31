import { useState, useEffect } from 'react';
import { Send, MessageSquare, Users, Search, Plus, Trash2, Eye } from 'lucide-react';
import apiClient from '../api/client';

const SMS = () => {
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    message: '',
    recipients: [],
    templateId: ''
  });

  useEffect(() => {
    fetchMessages();
    fetchStudents();
    fetchTemplates();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await apiClient.get('/sms/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await apiClient.get('/sms/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleSendSMS = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/sms/send', {
        message: formData.message,
        recipients: selectedStudents
      });
      setShowComposeModal(false);
      setFormData({ message: '', recipients: [], templateId: '' });
      setSelectedStudents([]);
      fetchMessages();
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        message: template.content,
        templateId
      });
    }
  };

  const handleStudentToggle = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const filteredMessages = messages.filter(message =>
    message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS Messaging</h1>
          <p className="text-gray-600">Send bulk SMS messages to students and parents</p>
        </div>
        <button
          onClick={() => setShowComposeModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Compose SMS
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
          {filteredMessages.map((message) => (
            <div key={message.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{message.recipient}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      message.status === 'sent' ? 'bg-green-100 text-green-800' :
                      message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{message.message}</p>
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SMS Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Sent</span>
                <span className="font-semibold text-gray-900">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivered</span>
                <span className="font-semibold text-green-600">1,156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Failed</span>
                <span className="font-semibold text-red-600">78</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h2>
            <div className="space-y-2">
              {templates.slice(0, 3).map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-xs text-gray-500 truncate">{template.content}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compose SMS Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compose SMS</h2>
            <form onSubmit={handleSendSMS} className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Use Template (Optional)
                </label>
                <select
                  value={formData.templateId}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a template</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipients Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients ({selectedStudents.length} selected)
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {students.map(student => (
                      <label key={student.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentToggle(student.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {student.firstName} {student.lastName}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Type your message here..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.message.length} / 160
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={selectedStudents.length === 0 || !formData.message}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 inline mr-2" />
                  Send SMS
                </button>
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMS;
