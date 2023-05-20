import { useState ,useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";


function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)
  // console.log(url);
   useEffect(() => {
    fetchApiConfig();
    genresCall()

   },[url]);

   const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res)=>{
      // console.log(res);
      const url = {
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    });
    // console.log(fetchDataFromApi());
   }
   const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
     </Routes>
    <Footer/>
    </BrowserRouter>
   
  )
}

export default App
