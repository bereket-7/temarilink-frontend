import { useState, useEffect } from 'react';
import { Save, Download, Upload } from 'lucide-react';
import { useApi, useMutation } from '../hooks/useApi';

const GradeMatrix = ({ term, onTermChange }) => {
  const [grades, setGrades] = useState({});
  const [selectedTerm, setSelectedTerm] = useState(term || '');
  const [isDirty, setIsDirty] = useState(false);

  const { data: students = [], loading: studentsLoading } = useApi('/students/');
  const { data: subjects = [], loading: subjectsLoading } = useApi('/subjects/');
  const { data: existingGrades = [], loading: gradesLoading } = useApi(`/grades/?term=${selectedTerm}`);
  const { mutate: saveGrades, loading: saving } = useMutation('/grades/bulk/');

  useEffect(() => {
    if (existingGrades.length > 0 && students.length > 0 && subjects.length > 0) {
      // Initialize grades matrix with existing data
      const initialGrades = {};
      existingGrades.forEach(grade => {
        const key = `${grade.student}-${grade.subject}`;
        initialGrades[key] = grade.score;
      });
      setGrades(initialGrades);
      setIsDirty(false);
    }
  }, [existingGrades, students, subjects]);

  const handleGradeChange = (studentId, subjectId, value) => {
    const key = `${studentId}-${subjectId}`;
    setGrades(prev => ({
      ...prev,
      [key]: value
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const gradeData = Object.entries(grades).map(([key, score]) => {
        const [studentId, subjectId] = key.split('-');
        return {
          student: studentId,
          subject: subjectId,
          term: selectedTerm,
          score: parseFloat(score) || 0
        };
      }).filter(grade => grade.score > 0); // Only save grades with scores

      await saveGrades(gradeData);
      setIsDirty(false);
      alert('Grades saved successfully!');
    } catch (error) {
      console.error('Failed to save grades:', error);
      alert('Failed to save grades. Please try again.');
    }
  };

  const handleExport = () => {
    // Create CSV data
    const headers = ['Student Name', ...subjects.map(s => s.name)];
    const rows = students.map(student => [
      student.full_name,
      ...subjects.map(subject => {
        const key = `${student.id}-${subject.id}`;
        return grades[key] || '';
      })
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades_term_${selectedTerm}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (studentsLoading || subjectsLoading || gradesLoading) {
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
          <h2 className="text-lg font-semibold text-gray-900">Grade Entry Matrix</h2>
          <p className="text-gray-600">Enter grades for multiple students and subjects</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? 'Saving...' : 'Save Grades'}
          </button>
        </div>
      </div>

      {/* Term Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Term
        </label>
        <select
          value={selectedTerm}
          onChange={(e) => {
            setSelectedTerm(e.target.value);
            onTermChange?.(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a term</option>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </select>
      </div>

      {/* Grade Matrix */}
      {selectedTerm && (
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Student Name
                </th>
                {subjects.map(subject => (
                  <th key={subject.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    {subject.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {student.full_name}
                  </td>
                  {subjects.map(subject => {
                    const key = `${student.id}-${subject.id}`;
                    const value = grades[key] || '';
                    
                    return (
                      <td key={subject.id} className="px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={value}
                          onChange={(e) => handleGradeChange(student.id, subject.id, e.target.value)}
                          className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="-"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isDirty && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            You have unsaved changes. Click "Save Grades" to persist your changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default GradeMatrix;
