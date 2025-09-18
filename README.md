# Yash To Do - Animated To-Do List Application



<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmkxbW1tczRuOGg0Z2F3eGRhaG1hbjVvY3U3cWhwM2ZocWFuODV2ZyZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif" alt="Yash To Do App Demo" />
</p>


[👉 Try Yash To Do App](https://to-do-list-yash-24.vercel.app/#/login)



A full-featured, visually stunning To-Do List application built with a focus on exceptional UI/UX. This project combines a sleek, modern design with fluid animations to create a delightful user experience. It features a complete authentication flow and robust task management functionalities, all persisted locally in your browser.

---

## ✨ Features

### Authentication
- **Secure User Accounts**: Full registration and login system.
- **Persistent Sessions**: User sessions are saved using `localStorage`, keeping you logged in.
- **Responsive Auth UI**: A beautiful split-screen layout on desktops that gracefully stacks on mobile devices.
- **Animated Illustrations**: Engaging, custom-animated SVG illustrations on login and register pages.
- **Instant Feedback**: Toast notifications for successful logins, registrations, and errors.

### Task Management (CRUD)
- **Create, Read, Update, Delete**: Full CRUD functionality for your tasks.
- **Complete Tasks**: Mark tasks as complete with a satisfying animated strikethrough and color fade.
- **Edit Tasks**: Seamlessly edit tasks in a focused modal view.
- **Live Search**: Instantly filter your tasks with a real-time search bar.
- **Bulk Actions**: "Mark All Complete" and "Unmark All" functionality for efficiency.

### UI & User Experience
- **Modern Design**: A sleek, dark-themed UI with glassmorphism and neumorphic elements.
- **Fluid Animations**: Powered by **Framer Motion**, every interaction—from page transitions to task updates—is beautifully animated.
- **Staggered Loading**: Dashboard elements animate into view sequentially for a polished entrance.
- **Confirmation Modals**: Prevent accidental actions with confirmation prompts for deleting tasks and logging out.
- **Responsive & Mobile-First**: The entire application is fully responsive and optimized for a seamless experience on any device.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Client-Side Storage**: Browser `localStorage`

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
- [Node.js](https://nodejs.org/) (which includes npm)

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/yash-to-do.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd yash-to-do
   ```
3. **Install NPM packages:**
   ```sh
   npm install
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## 📂 Project Structure

The codebase is organized to be clean, scalable, and easy to navigate.

```
/src
├── components/
│   ├── auth/             # Login, Register, Illustrations, Layout
│   ├── dashboard/        # Dashboard page and its components (Header, TaskItem, etc.)
│   └── ui/               # Reusable UI elements (Modals, Cards, Icons)
│
├── context/              # React Context for global state (Auth, Toasts)
├── hooks/                # Custom hooks (useAuth, useLocalStorage)
│
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main app component with routing
└── index.tsx             # Entry point of the React application
```

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.