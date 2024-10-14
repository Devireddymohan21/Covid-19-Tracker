import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes';
import StatisticsPage from './StatisticsPage';
import HistoryPage from './HistoryPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import Home from './Home';
import Verify from './Verify';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import Contact_us from './Contact_us';
import Profile from './Profile';
import './App.css';
import HelpPage from './HelpPage';
const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/profile" element={<Profile/>} />
                    </Route>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/contact_us" element={<Contact_us />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/reset-password" element={<ResetPassword/>} />
                    <Route path="/help" element={<HelpPage/>} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
