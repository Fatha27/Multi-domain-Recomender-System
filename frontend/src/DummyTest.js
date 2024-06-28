// import React, { useState } from 'react';
// import axios from 'axios';

// function DummyTest() {
//   const [inputValue, setInputValue] = useState("The Dark Knight");
//   const [recommendations, setRecommendations] = useState([]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/moviesm', {
//         movie_name: inputValue,
        
//       });
//       console.log(inputValue)

//       setRecommendations(response.data.recommendations);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           Movie Name:
//           <input type="text" value={inputValue} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>

//       <ul>
//         {recommendations.map((recommendation, index) => (
//           <li key={index}>{recommendation}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DummyTest;

import React, { useState } from 'react';
import axios from 'axios';

function DummyTest() {
  const [inputValue, setInputValue] = useState("The Dark Knight");
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/moviesm', {
        movie_name: inputValue,
      });

      setRecommendations(response.data.recommendations);
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} method='post'>
        <label>
          Movie Name:
          <input type="text" value={inputValue} id="movie_name" name="movie_name" onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>
            <p>Title: {recommendation.Title}</p>
            <p>Director: {recommendation.Director}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DummyTest;
