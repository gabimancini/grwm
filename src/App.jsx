import { useState, useEffect } from 'react';
import data from './../api/images';
import Header from "./Header";
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
      <>
      <Header />
        <div>
            <h1>Buscar Imágenes</h1>
            <div className='search-section'>
            <select name="prenda" onChange={handleChangeSelected}>
            <option defaultValue>Prenda</option>
            <option value="Abrigo">Abrigo</option>
            <option value="Camisa">Camisa</option>
            <option value="Pantalon">Pantalón</option>
            <option value="Pollera">Pollera</option>
            <option value="Remera">Remera</option>
            <option value="Vestidos">Vestidos</option>
          </select>
          <select name="estacion" onChange={handleChangeSelected}>
            <option defaultValue>Estación del año</option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otonio">Otoño</option>
            <option value="Invierno">Invierno</option>
          </select>
          <select name="estilo" onChange={handleChangeSelected}>
            <option defaultValue>Estilo</option>
            <option value="Corto">Corto</option>
            <option value="Mediano">Mediano</option>
            <option value="Largo">Largo</option>
          </select>
          <select name="evento" onChange={handleChangeSelected}>
            <option  defaultValue>Evento</option>
            <option value="Elegante">Elegante</option>
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Sport">Sport</option>
          </select>
          <select name="edad" onChange={handleChangeSelected}>
            <option defaultValue>Edad</option>
            <option value="15-25">15-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-55">46-55</option>
          </select>
        </div>
            <div className="images">
                {filteredImages.map((image) => (
                    <div key={image.id} className='image-clothe'>
                        <img src={image.image_url} alt={`Imagen de ${image.prenda}`} width="200" />
                    </div>
                ))}
            </div> 
        </div>
        </>
    );
}