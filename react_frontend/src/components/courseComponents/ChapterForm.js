// src/components/ChapterForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';

const ChapterForm = () => {
  const [formData, setFormData] = useState({
    chapter_name: '',
    chapter_description: '',
    course: '',
    chapter_quiz: ''
  });
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses/courses/', 
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      }
      ); 
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('/api/quizzes/');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/courses/chapters/create-chapter/', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      });
      setFormData({
        chapter_name: '',
        chapter_description: '',
        course: '',
        chapter_quiz: ''
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div>
    
    <div className="mx-auto mt-10 w-[90%] md:w-[70%] md:mr-[10px] lg:w-full lg:mr-[90px]">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-cyan-950 dark:bg-gray-900 md:w-[80%] md:ml-[60px] lg:w-[60%] lg:ml-[400px]">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-bold mb-2" htmlFor="chapter_name">
            Chapter Name
          </label>
          <input
            type="text"
            name="chapter_name"
            id="chapter_name"
            value={formData.chapter_name}
            onChange={handleChange}
            className="appearance-none border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.chapter_name && <p className="text-red-500 text-xs italic">{errors.chapter_name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg dark:text-gray-100 font-bold mb-2" htmlFor="chapter_description">
            Chapter Description
          </label>
          <textarea
            name="chapter_description"
            id="chapter_description"
            value={formData.chapter_description}
            onChange={handleChange}
            className="appearance-none  border-none bg-gray-100 h-[120px] dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.chapter_description && <p className="text-red-500 text-xs italic">{errors.chapter_description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg dark:text-gray-100 font-bold mb-2" htmlFor="course">
            Course
          </label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            className="appearance-none  border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
          {errors.course && <p className="text-red-500 text-xs italic">{errors.course}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-bold mb-2" htmlFor="chapter_quiz">
            Chapter Quiz
          </label>
          <select
            name="chapter_quiz"
            id="chapter_quiz"
            value={formData.chapter_quiz}
            onChange={handleChange}
            className="appearance-none  border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Quiz</option>
            {quizzes.map(quiz => (
              <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
            ))}
          </select>
          {errors.chapter_quiz && <p className="text-red-500 text-xs italic">{errors.chapter_quiz}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Chapter
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ChapterForm;