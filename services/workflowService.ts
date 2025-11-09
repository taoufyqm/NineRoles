import { Project, Task } from "../types";

/**
 * Scans all projects and returns a flat list of all tasks with a 'pending' status.
 * @param projects The array of all projects.
 * @returns An array of tasks that are pending.
 */
export const getAllPendingTasks = (projects: Project[]): Task[] => {
    const pendingTasks: Task[] = [];
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.status === 'pending') {
                pendingTasks.push(task);
            }
        });
    });
    return pendingTasks;
};
