

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Task } from '../../types';
import Header from './Header';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';
import EditTaskModal from './EditTaskModal';
import ParallaxBackground from '../ui/ParallaxBackground';
import Stats from './Stats';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../ui/ConfirmationModal';
import { GitHub, LinkedIn } from '../ui/Icons';

const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  // By using a dynamic key (`tasks_${currentUser?.id}`), we ensure that tasks are
  // stored separately and robustly for each user in localStorage. The `useLocalStorage`
  // hook handles all the logic for persisting and retrieving this user-specific data.
  const [tasks, setTasks] = useLocalStorage<Task[]>(`tasks_${currentUser?.id}`, []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast.success(`Task added: "${text}"`);
  };

  const toggleTask = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
     if (taskToToggle) {
        toast.success(taskToToggle.completed ? `Task marked as pending: "${taskToToggle.text}"` : `Task completed: "${taskToToggle.text}"`);
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToDelete(task);
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      toast.success(`Task deleted: "${taskToDelete.text}"`);
      setTaskToDelete(null);
    }
  };
  
  const editTask = (id: string, newText: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
    setEditingTask(null);
    toast.success(`Task updated to: "${newText}"`);
  };

  const markAllComplete = () => {
    const allCompleted = tasks.every(task => task.completed);
    setTasks(tasks.map(task => ({ ...task, completed: !allCompleted })));
    toast.success(allCompleted ? 'All tasks unmarked.' : 'All tasks marked complete.');
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    toast.success('You have been logged out.');
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => (a.completed === b.completed ? b.createdAt - a.createdAt : a.completed ? 1 : -1));
  }, [tasks, searchTerm]);

  const stats = useMemo(() => {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;
    return {
      total: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen w-full relative overflow-x-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            {currentUser && (
              <Header 
                user={currentUser} 
                onLogout={() => setIsLogoutModalOpen(true)} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
              />
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Stats stats={stats} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AddTaskForm onAddTask={addTask} />
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="mt-8 bg-[#2e2e2e]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-neumorphic-dark border border-white/10"
          >
              <div className="flex justify-between items-center mb-4 px-2">
                  <h2 className="text-xl font-semibold text-gray-300">Your Tasks</h2>
                  {tasks.length > 0 && (
                    <button 
                        onClick={markAllComplete} 
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        {tasks.every(t => t.completed) ? 'Unmark All' : 'Mark All Complete'}
                    </button>
                  )}
              </div>
              
              <div className="min-h-[200px]">
                <AnimatePresence>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={toggleTask} 
                        onDelete={deleteTask}
                        onEdit={() => setEditingTask(task)}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12 text-gray-500"
                    >
                      <p className="text-lg">
                        {searchTerm ? "No tasks match your search." : "No tasks yet. Add one above!"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </motion.div>

          <motion.footer variants={itemVariants} className="text-center mt-12 text-gray-500 text-sm">
            <p>Created by Kumar Yash</p>
            <div className="flex justify-center items-center gap-4 mt-2">
                 <a href="https://github.com/kumaryash-24" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub Profile">
                    <GitHub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/kumar-yash-592973227" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn Profile">
                    <LinkedIn size={20} />
                </a>
            </div>
          </motion.footer>

        </motion.div>
      </div>

      <AnimatePresence>
        {editingTask && (
          <EditTaskModal 
            task={editingTask} 
            onClose={() => setEditingTask(null)} 
            onSave={editTask} 
          />
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
      >
        <p>Are you sure you want to log out of your account?</p>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to permanently delete this task?</p>
        {taskToDelete && <p className="mt-2 font-semibold text-white bg-white/10 p-2 rounded-md truncate">"{taskToDelete.text}"</p>}
      </ConfirmationModal>

    </motion.div>
  );
};

export default DashboardPage;