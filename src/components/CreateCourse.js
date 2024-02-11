import axios from 'axios';
import React, { useState } from 'react';
import Domain from './Domain';
import authService from './authServices';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    
  });

  const host=Domain.getAddress()

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    



    // Perform course creation logic
    try{

      

      
      // const response= await axios.post(host + "/createcourse/",courseData);
      const accessToken = authService.refreshToken();

      // Check if the user is authenticated
      if (!accessToken) {
        console.error('User not authenticated.');
        // You might want to redirect the user to the login page or handle this scenario appropriately.
        return;
      }

      // Perform course creation logic with authentication
      const response = await axios.post(
        `${host}/courses/?access_token=${accessToken}`,
        courseData
      );

      if(response.status===201){
        console.log("course created successfully",response.data);


        setCourseData({
          title: '',
          description: '',
          start_date: '',
          end_date: ''
          
          
        });
  

      }

      else{
        console.log("failed to craete course",response.statusText);
      }


    }
    catch(error){
      console.log("error message",error);

    }
      

    // Reset the form after submission
    
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">

          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Create Course
          </h2>

          <form onSubmit={handleSubmit} className="mt-8" method="POST">
            <div className="mb-2">
              <label htmlFor="title" className="block text-xs font-semibold text-gray-600 uppercase">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter course title"
                value={courseData.title}
                onChange={handleInputChange}
                className="block w-full py-3 px-1
                  text-gray-800 appearance-none
                  border-b-2 border-gray-100
                  focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="description" className="block text-xs font-semibold text-gray-600 uppercase">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter course description"
                value={courseData.description}
                onChange={handleInputChange}
                className="block w-full py-3 px-1
                  text-gray-800 appearance-none
                  border-b-2 border-gray-100
                  focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="start_date" className="block text-xs font-semibold text-gray-600 uppercase">Start Date</label>
              <input
                type="date"  
                id="start_date"
                name="start_date"
                placeholder="Enter start date"
                value={courseData.start_date}
                onChange={handleInputChange}
                className="block w-full py-3 px-1
                  text-gray-800 appearance-none
                  border-b-2 border-gray-100
                  focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="end_date" className="block text-xs font-semibold text-gray-600 uppercase">End Date</label>
              <input
                type="date"  
                id="end_date"
                name="end_date"
                placeholder="Enter end date"
                value={courseData.end_date}
                onChange={handleInputChange}
                className="block w-full py-3 px-1
                  text-gray-800 appearance-none
                  border-b-2 border-gray-100
                  focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>

            

            

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
