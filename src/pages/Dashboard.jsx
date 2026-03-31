import { useState, useEffect } from 'react';
import { Users, BookOpen, MessageSquare, TrendingUp, Calendar, Award, Target, Activity } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import GlassCard from '../components/ui/GlassCard';
import StatsCard from '../components/ui/StatsCard';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const { data: stats = [], loading } = useApi('/dashboard/stats');

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents || '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Grades Entered',
      value: stats.totalGrades || '856',
      change: '+8%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'success'
    },
    {
      title: 'Messages Sent',
      value: stats.messagesSent || '2,456',
      change: '+23%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      title: 'Activity Rate',
      value: '94%',
      change: '+5%',
      changeType: 'positive',
      icon: Activity,
      color: 'warning'
    }
  ];

  const recentActivities = [
    { id: 1, description: 'New student registration: John Doe', timestamp: '2 minutes ago', type: 'student' },
    { id: 2, description: 'Grade updated: Mathematics - Class 10A', timestamp: '15 minutes ago', type: 'grade' },
    { id: 3, description: 'SMS campaign sent to 45 parents', timestamp: '1 hour ago', type: 'sms' },
    { id: 4, description: 'System backup completed successfully', timestamp: '2 hours ago', type: 'system' },
    { id: 5, description: 'New teacher account created', timestamp: '3 hours ago', type: 'user' }
  ];

  const quickActions = [
    { title: 'Add Student', icon: Users, color: 'blue', href: '/students' },
    { title: 'Enter Grades', icon: BookOpen, color: 'green', href: '/grades' },
    { title: 'Send SMS', icon: MessageSquare, color: 'purple', href: '/sms' },
    { title: 'View Reports', icon: TrendingUp, color: 'orange', href: '/reports' }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      student: <Users className="w-4 h-4 text-blue-500" />,
      grade: <BookOpen className="w-4 h-4 text-green-500" />,
      sms: <MessageSquare className="w-4 h-4 text-purple-500" />,
      system: <Activity className="w-4 h-4 text-gray-500" />,
      user: <Award className="w-4 h-4 text-orange-500" />
    };
    return icons[type] || icons.system;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stats-card">
              <div className="w-12 h-12 bg-gray-200 rounded-xl loading-skeleton mb-4"></div>
              <div className="w-24 h-8 bg-gray-200 rounded-lg loading-skeleton mb-2"></div>
              <div className="w-32 h-4 bg-gray-200 rounded loading-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening at your school.</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-auto">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard variant="default" padding="lg" className="slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <GlassCard variant="default" padding="lg" className="slide-up delay-75">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const colors = {
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600',
                  orange: 'from-orange-500 to-orange-600'
                };
                
                return (
                  <button
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:scale-105 transition-all group"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${colors[action.color]} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Upcoming Events */}
          <GlassCard variant="default" padding="lg" className="slide-up delay-150">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Upcoming Events
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">MAR</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">15</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Parent Meeting</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">MAR</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">18</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Science Fair</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">MAR</p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">22</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Exam Results</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">All Day</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
