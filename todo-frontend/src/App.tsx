import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import TodoPage from './pages/TodoPage'; 
import AddTodo from './pages/AddTodo'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ana sayfaya gelen tüm kullanıcıları login sayfasına yönlendir */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<TodoPage />} /> 
        <Route path="/add-todo" element={<AddTodo />} />
      </Routes>
    </Router>
  );
};

export default App;
