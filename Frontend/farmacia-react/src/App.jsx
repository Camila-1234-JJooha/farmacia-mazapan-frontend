import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Clientes from './components/Clientes';
import Medicamentos from './components/Medicamentos';
import FormularioVenta from './components/FormularioVenta';
import ListaVentas from './components/ListaVentas';


function App() {

  const [opcion, setOpcion] = useState('inicio');

  const [actualizar, setActualizar] = useState(0);

  const [medicamentos, setMedicamentos] = useState([]);

  const [banner, setBanner] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);


  const cargarMedicamentos = () => {

    axios
    .get('https://farmacia-mazapan-backend.onrender.com/medicamentos')
    .then(res => {

        setMedicamentos(res.data);

      })
      .catch(err => {

        console.error(
          'Error al cargar medicamentos:',
          err
        );

      });

  };


  const cargarBanner = () => {

    axios
    .get('https://farmacia-mazapan-backend.onrender.com/banner')
    .then(res => {

        if (res.data.length > 0) {

          setBanner(res.data[0]);

        }

      })
      .catch(err => {

        console.error(
          'Error al cargar banner:',
          err
        );

      });

  };

  useEffect(() => {

    cargarMedicamentos();

    cargarBanner();

  }, [actualizar]);

  const actualizarLista = () => {

    setActualizar(
      prev => prev + 1
    );

  };

  const comprarProducto = (medicamento) => {

    alert(
      `Has seleccionado comprar ${medicamento.nombre}`
    );

  };


  return (

    <div className="app">


      <style>{`

        * {
          box-sizing: border-box;
        }


        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
          color: #333;
        }


        .app {
          min-height: 100vh;
          display: flex;
        }

        .sidebar {
          width: 250px;
          min-height: 100vh;
          background: white;
          position: fixed;
          left: 0;
          top: 0;
          padding: 30px 20px;
          border-right: 1px solid #ddd;
        }


        .logo {
          text-align: center;
          padding-bottom: 25px;
          border-bottom: 1px solid #ddd;
        }


        .logo-icon {
          font-size: 42px;
        }


        .logo h2 {
          margin: 8px 0 4px;
          color: #1976d2;
          font-size: 22px;
        }


        .logo p {
          margin: 0;
          color: #777;
          font-size: 12px;
          font-weight: bold;
        }


        .menu {
          margin-top: 30px;
        }


        .menu-titulo {
          font-size: 11px;
          color: #888;
          margin-bottom: 12px;
          padding-left: 10px;
          font-weight: bold;
        }


        .menu button {
          width: 100%;
          border: none;
          background: transparent;
          color: #555;
          padding: 13px;
          text-align: left;
          border-radius: 8px;
          margin-bottom: 7px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }


        .menu button:hover {
          background: #e3f2fd;
          color: #1976d2;
        }


        .menu button.activo {
          background: #1976d2;
          color: white;
        }

        .contenido {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-height: 100vh;
        }

        .banner-simi {
          width: 100%;
          height: 400px;
          position: relative;
          overflow: hidden;
          background: #ffffff;
        }


        .banner-simi img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }


        .banner-texto {
          position: absolute;
          top: 35px;
          left: 50px;
          z-index: 2;
        }


        .banner-texto small {
          display: block;
          color: white;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }


        .banner-texto h1 {
          margin: 0 0 8px;
          color: white;
          font-size: 38px;
          font-weight: bold;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }


        .banner-texto p {
          margin: 0;
          color: white;
          font-size: 18px;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }



        .productos-contenido {
          padding: 35px;
        }


        .productos-titulo {
          margin-bottom: 20px;
        }


        .productos-titulo h2 {
          margin: 0 0 5px;
          color: #1976d2;
          font-size: 25px;
        }


        .productos-titulo p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }


        .productos {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }


        .producto-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
        }


        .producto-card:hover {
          transform: translateY(-4px);
        }


        .producto-imagen {
          width: 100%;
          height: 180px;
          object-fit: contain;
          display: block;
          margin-bottom: 12px;
        }


        .producto-card h3 {
          margin: 5px 0;
          color: #222;
          font-size: 18px;
        }


        .producto-card p {
          margin: 5px 0 12px;
          color: #777;
          font-size: 13px;
        }


        .producto-card strong {
          display: inline-block;
          width: fit-content;
          background: #e3f2fd;
          color: #1976d2;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 16px;
          margin-bottom: 15px;
        }

        .btn-comprar {
          width: 100%;
          background: #1976d2;
          color: white;
          border: none;
          padding: 11px;
          border-radius: 7px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          margin-top: auto;
        }


        .btn-comprar:hover {
          background: #125ca1;
        }


        .sin-productos {
          background: white;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #ddd;
          text-align: center;
          color: #777;
        }

        @media (max-width: 1100px) {

          .productos {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        @media (max-width: 800px) {

          .sidebar {
            width: 200px;
          }


          .contenido {
            margin-left: 200px;
            width: calc(100% - 200px);
          }


          .banner-simi {
            height: 300px;
          }


          .banner-texto {
            left: 30px;
            top: 25px;
          }


          .banner-texto h1 {
            font-size: 28px;
          }

        }


        .barra-movil {
          display: none;
        }

        .fondo-menu-movil {
          display: none;
        }

        .vista-contenido {
          min-width: 0;
          max-width: 100%;
        }

        .vista-contenido table {
          width: 100%;
          min-width: 520px;
        }

        @media (max-width: 600px) {
          .app {
            display: block;
            width: 100%;
            overflow-x: hidden;
          }

          .barra-movil {
            display: flex;
            align-items: center;
            gap: 12px;
            position: sticky;
            top: 0;
            z-index: 20;
            width: 100%;
            min-height: 58px;
            padding: 10px 14px;
            background: white;
            border-bottom: 1px solid #ddd;
            box-shadow: 0 2px 6px rgba(0,0,0,.08);
          }

          .barra-movil button {
            border: none;
            background: #1976d2;
            color: white;
            border-radius: 8px;
            padding: 9px 12px;
            font-size: 20px;
            cursor: pointer;
          }

          .barra-movil strong {
            color: #1976d2;
            font-size: 16px;
          }

          .sidebar {
            width: min(280px, 85vw);
            min-height: 100vh;
            height: 100dvh;
            overflow-y: auto;
            position: fixed;
            z-index: 40;
            top: 0;
            left: 0;
            padding: 22px 16px;
            transform: translateX(-105%);
            transition: transform .25s ease;
            box-shadow: 4px 0 18px rgba(0,0,0,.15);
          }

          .sidebar.sidebar-abierta {
            transform: translateX(0);
          }

          .fondo-menu-movil {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 30;
            border: 0;
            background: rgba(0,0,0,.45);
          }

          .contenido {
            margin-left: 0;
            width: 100%;
            min-height: calc(100vh - 58px);
            max-width: 100%;
          }

          .banner-simi {
            height: 260px;
          }

          .banner-simi img {
            object-position: center;
          }

          .banner-texto {
            left: 18px;
            right: 18px;
            top: 24px;
            text-align: center;
          }

          .banner-texto small {
            font-size: 13px;
          }

          .banner-texto h1 {
            font-size: clamp(22px, 7vw, 30px);
            line-height: 1.1;
            overflow-wrap: anywhere;
          }

          .banner-texto p {
            font-size: 14px;
            line-height: 1.4;
          }

          .productos-contenido {
            padding: 18px 14px;
          }

          .productos-titulo {
            text-align: center;
          }

          .productos-titulo h2 {
            font-size: 23px;
          }

          .productos-titulo p {
            font-size: 13px;
          }

          .productos {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .producto-card {
            min-width: 0;
            padding: 10px;
          }

          .producto-imagen {
            height: 125px;
          }

          .producto-card h3 {
            font-size: 15px;
            overflow-wrap: anywhere;
          }

          .producto-card p {
            font-size: 12px;
          }

          .producto-card strong {
            padding: 7px 10px;
            font-size: 14px;
          }

          .btn-comprar {
            padding: 10px 6px;
            font-size: 12px;
          }

          .vista-contenido {
            padding: 18px 12px !important;
            width: 100%;
            overflow-x: auto;
          }

          .vista-contenido > * {
            max-width: 100%;
          }
        }

        @media (max-width: 360px) {
          .productos {
            grid-template-columns: 1fr;
          }

          .banner-simi {
            height: 230px;
          }
        }

      `}</style>

      {menuAbierto && (
        <button
          className="fondo-menu-movil"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      <aside className={`sidebar ${menuAbierto ? 'sidebar-abierta' : ''}`}>

        <div className="logo">

          <div className="logo-icon">
            67
          </div>

          <h2>
            Farmacia Mazapán
          </h2>

          <p>
            SISTEMA DE FARMACIA
          </p>

        </div>


        <div className="menu">

          <div className="menu-titulo">
            MENÚ PRINCIPAL
          </div>


          <button
            className={
              opcion === 'inicio'
                ? 'activo'
                : ''
            }
            onClick={() => { setOpcion('inicio'); setMenuAbierto(false); }}
          >
             Inicio
          </button>


          <button
            className={
              opcion === 'clientes'
                ? 'activo'
                : ''
            }
            onClick={() => { setOpcion('clientes'); setMenuAbierto(false); }}
          >
             Clientes
          </button>


          <button
            className={
              opcion === 'medicamentos'
                ? 'activo'
                : ''
            }
            onClick={() => { setOpcion('medicamentos'); setMenuAbierto(false); }}
          >
             Medicamentos
          </button>


          <button
            className={
              opcion === 'ventas'
                ? 'activo'
                : ''
            }
            onClick={() => { setOpcion('ventas'); setMenuAbierto(false); }}
          >
            Ventas
          </button>

        </div>

      </aside>


      <main className="contenido">
        <div className="barra-movil">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
          >
            ☰
          </button>
          <strong>Farmacia Mazapán</strong>
        </div>

        {opcion === 'inicio' && (

          <div className="inicio">

            <div className="banner-simi">


              {banner && (

                <img
                  src={`/images/${banner.imagen}`}
                  alt={banner.titulo}
                />

              )}

              <div className="banner-texto">

                <small>
                  Bienvenido
                </small>

                <h1>
                  FARMACIA MAZAPAN
                </h1>

                <p>
                  Administración de clientes, medicamentos y ventas.
                </p>

              </div>


            </div>

            <div className="productos-contenido">


              <div className="productos-titulo">

                <h2>
                   Productos destacados
                </h2>

                <p>
                  Algunos de nuestros productos disponibles
                </p>

              </div>


              {medicamentos.length === 0 ? (

                <div className="sin-productos">

                  No hay medicamentos registrados.

                </div>

              ) : (

                <div className="productos">

                  {medicamentos.map(medicamento => (

                    <div
                      className="producto-card"
                      key={medicamento.id}
                    >


                      <img
                        className="producto-imagen"
                        src={
                          `/images/${medicamento.imagen}`
                        }
                        alt={medicamento.nombre}
                      />


                      <h3>
                        {medicamento.nombre}
                      </h3>


                      <p>
                        Medicamento disponible
                      </p>


                      <strong>
                        $
                        {Number(
                          medicamento.precio
                        ).toFixed(2)}
                      </strong>


                      <button
                        className="btn-comprar"
                        onClick={() =>
                          comprarProducto(medicamento)
                        }
                      >
                        🛒 Comprar
                      </button>


                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        )}

        {opcion === 'clientes' && (

          <div className="vista-contenido" style={{ padding: '35px' }}>

            <Clientes
              actualizar={actualizar}
            />

          </div>

        )}

        {opcion === 'medicamentos' && (

          <div className="vista-contenido" style={{ padding: '35px' }}>

            <Medicamentos
              actualizar={actualizar}
            />

          </div>

        )}

        {opcion === 'ventas' && (

          <div className="vista-contenido" style={{ padding: '35px' }}>

            <FormularioVenta
              onVentaRegistrada={actualizarLista}
            />

            <ListaVentas
              actualizar={actualizar}
            />

          </div>

        )}

      </main>

    </div>

  );
}


export default App;