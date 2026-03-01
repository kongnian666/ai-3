/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExamConfig from '@/pages/ExamConfig';
import QuestionBank from '@/pages/QuestionBank';
import TeacherDashboard from '@/pages/TeacherDashboard';
import Profile from '@/pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/exam-config" element={<ExamConfig />} />
        <Route path="/bank" element={<QuestionBank />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
