
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
