import axios from 'axios';
import {
  useEffect, useState
} from 'react';
import { Button } from 'react-bootstrap';
import './index.css'
import Header from './Header';
const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    evento: "",
    estacion: "",
    edad: "",
    estilo: "",
    ropa: "" 
  }); 
  const fetchImages = async () => {
    try {

      setErrorMsg('');
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}?query=${result
        }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY
        }`
      );
      console.log(result)
      setImages(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);

    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
      setLoading(false);
    }
  }

  const handleChangeSelected = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value })
    fetchImages()
  }

  useEffect(() => {
    fetchImages();
  }, [filters]);

  const string = Object.values(filters)
  const result = string.toString().replace(",", " ")
  console.log(result)
  return (
    <>
    <Header />
    <div>

      <h1 className='title'>Explorar opciones</h1>

      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      <div className='search-section'>
          <select name="evento " onChange={handleChangeSelected}>
            <option disabled defaultValue>Evento</option>
            <option value="Formal clothe">Formal</option>
            <option value="Informal clothe">Informal</option>
            <option value="Fancy">Elegante</option>
            <option value="Sport">Sport</option>

          </select>
          <select name="estacion" onChange={handleChangeSelected}>
            <option defaultValue>Estación del año</option>
            <option value="Spring">Primavera</option>
            <option value="Summer">Verano</option>
            <option value="Autumn">Otoño</option>
            <option value="Winter">Invierno</option>
          </select>
          <select name="edad" onChange={handleChangeSelected}>
            <option defaultValue>Edad</option>
            <option value="age berween 15-25">15-25</option>
            <option value="age berween 26-35">26-35</option>
            <option value="age berween 36-45">36-45</option>
            <option value="age berween 46-55">46-55</option>
            <option value="age berween 56-65">56-65</option>
            <option value="age berween 66-75">66-75</option>
            <option value="age berween 76-85">76-85</option>
          </select>
          <select name="estilo" onChange={handleChangeSelected}>
            <option defaultValue>Estilo</option>
            <option value="corto">corto</option>
            <option value="largo">largo</option>
          </select>
          <select name="ropa" onChange={handleChangeSelected}>
            <option defaultValue>Prenda</option>
            <option value="shirt">remera</option>
            <option value="pants">pantalon</option>
          </select>
        </div>
    

      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          <div className='images'>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className='image'
              />
            ))}
          </div>
          <div className='buttons'>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            {page < totalPages && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
