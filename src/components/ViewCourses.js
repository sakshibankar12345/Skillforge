import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Domain from './Domain';



const List = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const host=Domain.getAddress();

  const [course,setCourse] = useState(null);




  useEffect(() => {
    console.log("logging in usereffect")
    const fetchData = async () => {
      try {
        const response = await axios.get(host+'/courses/');
        console.log(host+'courses')
        console.log("loffing response")
        console.log(response)
        const dataArray = Object.values(response.data);
        setData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    // <div>
    //   {data ? (
    //     <div>
    //       {/* Render your data here */}
    //       <p>Data: {JSON.stringify(data)}</p>
    //     </div>
    //   ) : (
    //     <p>No data available</p>
    //   )}
    // </div>
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        
        <div className="w-11/12 p-12 sm:w-8/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            View Courses
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {data.map(data => (
              <div key={data.id} className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                <p>{data.description}</p>
                <p className="mt-2">Instructor: {data.instructor.first_name} {data.instructor.last_name}</p>
                <p>Start Date: {data.start_date}</p>
                <p>End Date: {data.end_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
