import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHomePage from './components/Admin';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import Lesson from './components/Lesson';
import ChallengeCTF from './components/ChallengeCTF';
import Quiz from './components/Quiz';
import Ranking from './components/Ranking';
import QuizView from './components/Quiz/QuizView';
import ViewLesson from './components/Lesson/ViewLesson';
import Lab from './components/Lab';
import HistoryUser from './components/HistoryUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/' index element={<Navigate to='/login' />} />
        <Route element={<HomePage />}>
          <Route path='/lesson' element={<Lesson />} />
          <Route path='/viewLesson/:lessonId' element={<ViewLesson />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/viewQuiz/:quizTitle' element={<QuizView />} />
          <Route path='/challenge-ctf' element={<ChallengeCTF />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/lab' element={<Lab />} />
          <Route path='/history' element={<HistoryUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
