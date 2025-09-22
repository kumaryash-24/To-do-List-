export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
  profilePicture?: string; // Optional: Base64 encoded image string
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number | null;
}