import HomePage from "./pages/HomePage/index.jsx";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import QuizPage from "./pages/QuizPage/index.jsx";
import Container from "./components/Container/index.jsx";
import EditQuizPage from "./pages/EditQuizPage/index.jsx";

function App() {
      return (
            <BrowserRouter>
                <nav className='bg-slate-400 py-4 mb-10'>
                    <Container classes='flex justify-between'>
                        <span>Quizzer</span>
                        <div>
                            <NavLink to='/'>Home</NavLink>
                        </div>
                    </Container>
                </nav>

                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/quiz/:id' element={<QuizPage />} />
                    <Route path='/quiz/edit/:id' element={<EditQuizPage />} />
                </Routes>
            </BrowserRouter>
      )
}

export default App
