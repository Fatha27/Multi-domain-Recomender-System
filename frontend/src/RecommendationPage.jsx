


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieImage from './Assets/bg-movie.jpg';
import BookImage from './Assets/bg-books.png'
import SearchImage from './Assets/search.png'
import ViewComponent from './ViewComponent';
import MovieComponent from './Components/MovieComponent';
import CourseImage from "./Assets/bg-courses.png"
import RestaurantImage from "./Assets/bg-restaurants.png"
import axios from 'axios';
import CourseComponent from './Components/CourseComponent';
import RestaurantComponent from './Components/RestaurantComponent';
import WebSeries from "./Assets/bg-webseries.jpeg"
import Shimmer from './Shimmer';
import Movie from "./Assets/movie-info.jpg"
import Books from "./Assets/info-books.jpg"
import Restaurant from "./Assets/info-restaurant.jpg"
import Courses from "./Assets/info-courses.jpg"
import Binge from "./Assets/info-binge.jpg"
import movies from "./json/movies.json"
import books from "./json/books.json"
import restaurants from "./json/restaurants.json"
import webseries from "./json/webseries.json"
import udemy from "./json/udemy.json"
import coursera from "./json/coursera.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecommendationPage() {
  const { id } = useParams();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [input, setInput] = useState('')
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([{
    image: '',
    title: '',
    category: '',
    duration: '',
    year: '',
    numerics: '',
    rating: '',
    people: '',
    genre: '',
    scores: { review: '', count: '' },
    overview: ''
  }])
  const [url, setUrl] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [index, setIndex] = useState()
  const [text, setText] = useState("")
  const [selectedOption, setSelectedOption] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [image, setImage] = useState('')
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setUrl(event.target.value); // Log the selected value to the console
  };

  function onModalClick(index) {
    setModal(!modal)
    setIndex(index)
  }
  function onModalBackClick() {
    setModal(!modal)
  }

  useEffect(() => {
    if (id === "restaurants") {


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(response => response.json())
              .then(data => setCity(data.city))
              .catch(error => setError(error));
          },
          (error) => {
            toast.error("No Location Detected");
            setError(error.message);
          }
        );
      } else {
        toast.warning('Geolocation is not supported by this browser.');
      }

    }
  }, []);
  console.log(city)

  useEffect(() => {
    // Set background image based on id
    if (id === "movies") {
      setBackgroundImage(`url(${MovieImage})`);
      setData({ category: "Movie", duration: "min" })
      setUrl("moviesm")
      setImage(Movie)
      setJsonData(movies)
      setText("Discover cinematic gems handpicked just for you by our intuitive recommender system.")

    }
    else if (id === "books") {
      setBackgroundImage(`url(${BookImage})`);
      // setData()
      setData({ category: "Books", duration: "" })
      setUrl("booksm")
      setImage(Books)
      setJsonData(books)
      setText("Dive into captivating reads perfectly matched to your preferences by our personalized recommendation engine.")
    }
    else if (id === "courses") {
      setBackgroundImage(`url(${CourseImage})`);
      // setData({ category: "Book", duration: "" })
      // setUrl("udemy")
      setImage(Courses)
      if (selectedOption === "coursera") {

        setJsonData(coursera)
      }
      else {
        setJsonData(udemy)
      }
      setText("Empower your learning journey with courses curated just for you by our intelligent recommender system.")
    }
    else if (id === "restaurants") {
      setBackgroundImage(`url(${RestaurantImage})`);
      // setData({ category: "Book", duration: "" })
      setUrl("restaurants")
      setImage(Restaurant)
      setJsonData(restaurants)
      setText("Explore culinary delights recommended exclusively for you by our expert system.")
    }
    else if (id === "web-series") {
      setBackgroundImage(`url(${WebSeries})`);
      setData({ category: "Web-Series", duration: "/episode" })
      setUrl("webseries")
      setImage(Binge)
      setJsonData(webseries)
      setText("Uncover binge-worthy series tailored to your taste, thanks to our smart recommendations.")
    }
    else {
      // Set default background if id is not recognized
      setBackgroundImage('');
    }
  }, [id]);

  function handleChange(event) {
    // const { value } = event.target;
    // setInput(value)
    const term = event.target.value.toLowerCase(); // Remove trim() to allow spaces
    setInput(term);
    if (term === '') {
      setFilteredData([]);
    } else {
      const filtered = jsonData.filter(row => {
        if (!row) return false; // Check if row is undefined

        if (id === 'movies') {

          const title = typeof row['original_title'] === 'string' ? row['original_title'].toLowerCase() : '';
          return title.includes(term);
        }
        else if (id === "books") {
          const title = typeof row['bookTitle'] === 'string' ? row['bookTitle'].toLowerCase() : '';
          return title.includes(term);
        }
        else if (id === "restaurants") {

          const title = typeof row['Restaurant'] === 'string' ? row['Restaurant'].toLowerCase() : '';
          return title.includes(term);
        }
        else if (id === "web-series") {
          const title = typeof row['Series Title'] === 'string' ? row['Series Title'].toLowerCase() : '';
          return title.includes(term);
        }
        else if (id === "courses") {
          if (selectedOption === "udemy") {
            setJsonData(udemy)
            const title = typeof row['title'] === 'string' ? row['title'].toLowerCase() : '';
            return title.includes(term);
          }
          else {
            setJsonData(coursera)
            const title = typeof row['course'] === 'string' ? row['course'].toLowerCase() : '';
            return title.includes(term);
          }


        }

      });
      setFilteredData(filtered.slice(0, 5));
    }
  }
  console.log(input)
  console.log(filteredData)
  function handleSearch() {
    console.log(input)
  }



  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   setI
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)



    if (id === "movies") {
      try {
        const response = await axios.post(`http://recom-ai.site:5000/${url}`, {
          movie_name: input,
        });
        if(response.data.recommendations.length === 0){
          toast.error("No Recommendations Found")
        }
        setRecommendations(response.data.recommendations);
        // const imageId = response.data.recommendations[0].Id
        // console.log(imageId)


        // const imageResponse = await axios.get(`https://api.themoviedb.org/3/movie/${imageId}?api_key=86c48e9d929996f5f775aa9b14fdad89`)
        // console.log(imageResponse)
        // const path=imageResponse.data.poster_path
        // setData((prevData) => ({
        //   ...prevData,
        //   image: `https://image.tmdb.org/t/p/w500${path}`
        // }));

        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false)
    }
    else if (id === "courses") {
      if (selectedOption === "udemy") {
        try {
          const response = await axios.post(`http://recom-ai.site:5000/${url}`, {
            title_utf: input,
          });
          if(response.data.recommendations.length === 0){
            toast.error("No Recommendations Found")
          }
          setRecommendations(response.data.recommendations);
          console.log(response.data)
        } catch (error) {
          console.error('Error:', error);
        }
      }
      else {
        try {
          const response = await axios.post(`http://recom-ai.site:5000/${url}`, {
            course_name: input,
          });
          if(response.data.recommendations.length === 0){
            toast.error("No Recommendations Found")
          }
          setRecommendations(response.data.recommendations);
          console.log(response.data)
        } catch (error) {
          console.error('Error:', error);
        }
      }

      setLoading(false)
    }
    else if (id === "web-series") {
      try {
        const response = await axios.post(`http://recom-ai.site:5000/${url}`, {
          series_name: input,
        });
        if(response.data.recommendations.length === 0){
          toast.error("No Recommendations Found")
        }
        setRecommendations(response.data.recommendations);
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false)
    }
    else if (id === "restaurants") {
      if (city === "") {
        toast.error("Please Enable Location");
      } else {
        toast.success("Location Detected : " + city)
        try {
          const response = await axios.post(`http://localhost:5000/${url}`, {
            city_name: city,
            restaurant_name: input
          });
          if(response.data.recommendations.length === 0){
            toast.error("No Recommendations Found")
          }
          setRecommendations(response.data.recommendations);
          console.log(response.data)
        } catch (error) {
          console.error('Error:', error);
        }
      }
      setLoading(false)
    }
    else {
      try {
        const response = await axios.post(`http://recom-ai.site:5000/${url}`, {
          book_name: input,
        });
        if(response.data.recommendations.length === 0){
          toast.error("No Recommendations Found")
        }
        setRecommendations(response.data.recommendations);
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false)
    }


  };
  console.log(data.image)

  return (
    <div
      className='flex h-screen '
    // Apply dynamic background image
    >
      <ToastContainer position="top-center" />
      <div className='hidden  xl:block xl:w-1/4 m-4'>
        <div className='text-white text-[40px] font-extrabold uppercase text-center p-4 text-'>{id}</div>
        <div className='bg-[#F8F8FF] p-16 rounded-3xl pr-8 pl-8 text-[18px] font-semibold' >
          <img src={image} alt="" className='mb-4' />
          {text}
        </div>
      </div>
      <div className=' hidden xl:block bg-white border-8 rounded-md'></div>
      {/* <div className='w-3/4 ml-4' style={{ backgroundImage: backgroundImage, opacity: "50%" }}>
        <div className='bg-[#D9D9D9]  w-2/3 m-auto mt-10 h-12   rounded-3xl flex pr-3'>
          <input type="text" name="" id="" className='w-full h-full bg-[#D9D9D9] border-none rounded-3xl text-xl font-normal text-[30px] p-4 border-2 border-white' />
          <div className='m-auto'>          <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
          </div>
        </div>
        <div>hello</div>

      </div>
       */}

      {/* <div className='w-3/4 ml-4 relative  '>
        <div
          className='absolute inset-0 bg-cover bg-center '
          style={{ backgroundImage: backgroundImage, zIndex: -1,  }}
        />
        <div className='bg-[#D9D9D9] w-2/3 m-auto mt-10 h-12 rounded-3xl flex pr-3  '>
          <input
            type="text"
            name=""
            id=""
            value={input}
            onChange={handleChange}
            className='w-full h-full bg-[#D9D9D9] border-none rounded-3xl text-xl font-normal text-[30px] p-4 border-2 border-white'
          />
          <div className='m-auto' onClick={handleSearch}>
            <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
          </div>
        </div>
        <div className='flex flex-wrap overflow-y-auto ml-11 mr-11 mt-4 '>
          {!modal ? <ViewComponent titleClick={onModalClick} info={data} /> : <MovieComponent backClick={onModalBackClick} info={data}/>
          }
        </div>

      </div> */}

      <div className='w-full xl:w-3/4 ml-4 relative overflow-y-auto'>
        <div
          className='absolute inset-0 bg-cover bg-center filter blur-sm'
          style={{ backgroundImage: backgroundImage, zIndex: -1 }}
        />
        <div>
          <form onSubmit={handleFormSubmit} method='post' className='bg-[#F8F8FF] w-2/3 m-auto mt-10 h-12 rounded-3xl flex pr-3'>
            <input
              type="text"
              id="movie_name" name="movie_name"
              placeholder='Search'
              value={input}
              onChange={handleChange}
              list="results"
              className='w-full h-full outline-none bg-[#F8F8FF] border-none rounded-3xl  font-normal text-[15px] md:text-[20px] p-4 border-2 '
            />
            <datalist id="results">
              {filteredData.map((row, index) => (
                <option key={index} value={row['original_title'] || row['bookTitle'] || row['Restaurant'] || row['Series Title'] || row['title'] || row['course']} />
              ))}
            </datalist>

            <button className='m-auto' type='submit'>
              <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
            </button>

          </form>
          {id === "courses" && <div className='flex place-content-center text-white space-x-4 mt-2'>
            <label>
              <input type='radio' name='platform' value='udemy' checked={selectedOption === 'udemy'} onChange={handleOptionChange} />
              Udemy
            </label>
            <label>
              <input type='radio' name='platform' value='coursera' checked={selectedOption === 'coursera'} onChange={handleOptionChange} />
              Coursera
            </label>
          </div>}

        </div>
        {/* <div className='flex flex-wrap overflow-y-auto h-5/6 ml-11 mr-11 mt-4 place-content-evenly'>
          {()=>{
            switch (id) {
              case ('movies' || 'books'):
                return (!modal ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} /> : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />)
                break;
              case 'restaurants':
                return <CourseComponent />
              default:
                break;
            }
          }}
          {/* {!modal ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} /> : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />} */}
        {/* </div>  */}
        <div className='scroller flex flex-wrap overflow-y-auto h-5/6 ml-2 mr-2 lg:ml-11 lg:mr-11 mt-4 place-content-evenly'>
        


          {!loading ?
            (() => {
              switch (id) {
                case 'movies':
                case 'books':
                case 'web-series':
                  return (!modal
                    ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} />
                    : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />
                  );
                case 'courses':
                  return <CourseComponent recommendations={recommendations} />;
                case 'restaurants':
                  return <RestaurantComponent recommendations={recommendations} />;
                default:
                  return <div>Invalid category</div>;
              }
            })()
            : <> <Shimmer />  <Shimmer />  <Shimmer /> <Shimmer /> <Shimmer /> </>}
          {/* This function is now immediately invoked */}
          {/* <MovieComponent backClick={onModalBackClick} info={data && data} recommendations={recommendations && recommendations[index]} /> */}
        </div>

      </div>


    </div>
  );
}

export default RecommendationPage;






