import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTaskStore = create(
    persist(
        (set, get) => ({
            tasks: [],

            addTask: (title, description) => {
                const newTask = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    isPinned: false
                }

                set(state => ({
                    tasks: [ ...state.tasks, newTask ]
                }))
            },

            editTask: (id, editTitle, editDescription) => {
                set(state => ({
                    tasks: state.tasks.map(task =>
                        task.id === id
                        ? { ...task, title: editTitle, description: editDescription }
                        : task
                    )
                }))
            },
      
            deleteTask: (id) => {
                set(state => ({
                    tasks: state.tasks.filter(task => task.id !== id)
                }))
            },
      
            togglePin: (id) => {
                set(state => {
                    let currentTask = state.tasks.find(task => task.id === id);
                    if (!currentTask) return state;

                    if (currentTask.isPinned) {
                        return {
                            tasks: state.tasks.map(task =>
                                task.id === id ? { ...task, isPinned: false } : task
                            )
                        };
                    }

                    let pinnedCount = state.tasks.filter(task => task.isPinned).length;
                    if (pinnedCount >= 3) {
                        return state;
                    }

                    return {
                        tasks: state.tasks.map(task =>
                            task.id === id ? { ...task, isPinned: true } : task
                        )
                    };
                });
            },
      
            reorderTasks: (draggedId, targetId) => {
                set(state => {
                    let tasks = [...state.tasks]
                    let draggedIndex = tasks.findIndex(task => task.id === draggedId);
                    let targetIndex = tasks.findIndex(task => task.id === targetId);

                    if (draggedIndex === -1 || targetIndex === -1) return state;

                    const [draggedTask] = tasks.splice(draggedIndex, 1);
                    tasks.splice(targetIndex, 0, draggedTask);

                    return { tasks };
                });
            }
        }),
        {
            name: 'task-storage',
        }
    )
)