import { useState, useEffect } from 'react';
import data from './../api/images';

export default function Home() {
    const [filters, setFilters] = useState({
        evento: '',
        estacion: '',
        edad: '',
        estilo: '',
        prenda: ''
    });

    const [filteredImages, setFilteredImages] = useState(data);

    const handleChangeSelected = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    useEffect(() => {
        const filterImages = () => {
            return data.filter(image => {
                return (
                    (filters.evento === '' || image.evento.includes(filters.evento)) &&
                    (filters.estacion === '' || image.estacion.includes(filters.estacion)) &&
                    (filters.edad === '' || image.edad.includes(filters.edad)) &&
                    (filters.estilo === '' || image.estilo.includes(filters.estilo)) &&
                    (filters.prenda === '' || image.prenda.includes(filters.prenda))
                );
            });
        };
        setFilteredImages(filterImages());
    }, [filters]);

    return (
        <div>
            <h1>Buscar Imágenes</h1>
            <div className='search-section'>
            <select name="prenda" onChange={handleChangeSelected}>
            <option defaultValue>Prenda</option>
            <option value="Abrigo">Abrigo</option>
            <option value="Remera">Remera</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Pollera">Pollera</option>
            <option value="Short">Short</option>
            <option value="Camisa">Camisa</option>
            <option value="Vestidos">Vestidos</option>
          </select>
          <select name="evento" onChange={handleChangeSelected}>
            <option disabled defaultValue>Evento</option>
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Elegante">Elegante</option>
            <option value="Sport">Sport</option>

          </select>
          <select name="estacion" onChange={handleChangeSelected}>
            <option defaultValue>Estación del año</option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otonio">Otoño</option>
            <option value="Invierno">Invierno</option>
          </select>
          <select name="edad" onChange={handleChangeSelected}>
            <option defaultValue>Edad</option>
            <option value="15-25">15-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-55">46-55</option>
            <option value="56-65">56-65</option>
            <option value="66-75">66-75</option>
            <option value="76-85">76-85</option>
          </select>
          <select name="estilo" onChange={handleChangeSelected}>
            <option defaultValue>Estilo</option>
            <option value="Mediano">Mediano</option>
            <option value="Corto">Corto</option>
            <option value="Largo">Largo</option>
          </select>
   
        </div>
            <div className="images">
                {filteredImages.map((image) => (
                    <div key={image.id} className='image-clothe'>
                        <img src={image.image_url} alt={`Imagen de ${image.evento}`} width="200" />
                        <p>{image.prenda}</p>
                    </div>
                ))}
            </div> 
        </div>
    );
}

/* import axios from 'axios';
import {
  useEffect, useState
} from 'react';
import { Button } from 'react-bootstrap';
import './index.css'
import Header from './Header';
const API_URL = './../api/images';
const IMAGES_PER_PAGE = 20;

function App() {
  const [images, setImages] = useState([]); 
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
      const { data } = await axios.get(API_URL);
     console.log(data )
      setImages(data);
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
console.log("filters", filters)
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
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Elegante">Elegante</option>
            <option value="Sport">Sport</option>

          </select>
          <select name="estacion" onChange={handleChangeSelected}>
            <option defaultValue>Estación del año</option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otonio">Otoño</option>
            <option value="Invierno">Invierno</option>
          </select>
          <select name="edad" onChange={handleChangeSelected}>
            <option defaultValue>Edad</option>
            <option value="15-25">15-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-55">46-55</option>
            <option value="56-65">56-65</option>
            <option value="66-75">66-75</option>
            <option value="76-85">76-85</option>
          </select>
          <select name="estilo" onChange={handleChangeSelected}>
            <option defaultValue>Estilo</option>
            <option value="Mediano">mediano</option>
            <option value="Corto">corto</option>
            <option value="Largo">largo</option>
          </select>
          <select name="ropa" onChange={handleChangeSelected}>
            <option defaultValue>Prenda</option>
            <option value="Remera">remera</option>
            <option value="Pantalon">pantalon</option>
            <option value="Pollera">pollera</option>
            <option value="Short">short</option>
            <option value="Camisa">camisa</option>
            <option value="Vestidos">vestidos</option>
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
                src={image.image_url} 
                className='image'
              />
            ))}
          </div>
      
        </>
      )}
    </div>
    </>
  );
}

export default App;
*/