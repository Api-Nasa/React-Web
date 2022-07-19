# React-Web Api-Nasa
## Proyecto final de Curso con General Assambly para consumir varias APIs de la Nasa

<a target="_blank" rel="noopener noreferrer" href="https://pataruco.github.io/ga-assets/assets/logos/ga.svg"><img src="https://pataruco.github.io/ga-assets/assets/logos/ga.svg" alt="" style="max-width: 10%;"></a>
 - Este artículo esta redactado en español pero puedes ver su versión en [inglés](README.md)
 - ## Demo
- Si quieres ver la demo de este proyecto desplegado, puedes visitar [Demostración proyecto API-NASA](https://react-api-nasa.netlify.app/)
- ![](https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-medium/1fac2@2x.png)
  Hemos decidido trabajar en equipo como práctica de lo que es el trabajo colaborarivo en desarrollo Web.
  - proyecto realizado por [Claudia Muñoz García](mailto:claudia.munozgarcia@gmail.com?subject=[GitHub]%20Source%20Han%20Sans) y [Eduardo Cabrera Blázquez](mailto:ecabrerablazquez@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)


![Logo Nasa](https://res.cloudinary.com/dquxfl0fe/image/upload/v1657194000/API-GA/nasa-logo_w5ebmi.png)















## Hooks y tecnologias usadas en React Bundle

- Hooks usados  `usestate`, `usereducer`, `useref`, `useeffects`, 

- Según a sido oportuno, hemos usado Frameworks o librerias como `MapBox`, `Bootstrap`, `Animate.js`, `@material-ui/core`, o `react-zoom-pan-pinch`
--------------------------------------
--------------------------------------
> En este ejecicio, se llama a la API-NASA de la imagen astronómica del día.
> Tambien se podran visualizar en mapas tanto la posición actual 
> de la estación internacional como la API que tiene
> Nasa para registrar localizaciones de meteoritos conocidos
--------------------------------------
--------------------------------------
## Muestra Apod Json Api-Nasa
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658221607/API-GA/2022-07-05_21h17_03_y8ogpw.png)





### - Teoría del Color

   Es importante respeccto al color conocer un poco de su psicología, y sobre todo:
    
    - Buscar colores equilibrados: para lograrlo, respetamosa la gama cromática de la paleta escogida.
    - Hemos procurado no usar o abusar de otros colores, para no transmitir sensación de desorden.

   ![paleta usada](https://res.cloudinary.com/dquxfl0fe/image/upload/v1657994150/API-GA/paleta_sdyfk5.png)


   
=======
Proyect Web development 2022
>>>>>>> Codigo Rutas
```const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Main" element={<Main />} />
      <Route path="Meteors" element={<Meteors />} />
      <Route path="MapsMeteors" element={<MapsMeteors />} />
      <Route path="Iss" element={<Iss/>} />
      <Route path="MapsEstacionIss" element={<MapsEstacionIss />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>,
);

reportWebVitals();

```

>>>>>>> Contraseñas Mapbox privada y protegida (Si haces Fork del proyecto necesitas conseguir la tuya)
```
mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
```


