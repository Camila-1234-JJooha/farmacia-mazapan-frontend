import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Medicamentos() {

  const [medicamentos, setMedicamentos] = useState([]);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const [editando, setEditando] = useState(null);

  const [formEditar, setFormEditar] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });


 

  const cargarMedicamentos = () => {

    axios
      .get('https://farmacia-mazapan-backend.onrender.com/medicamentos')
      .then(res => {

        setMedicamentos(res.data);

      })
      .catch(err => {

        console.error(
          'Error al obtener medicamentos:',
          err
        );

      });

  };


  useEffect(() => {

    cargarMedicamentos();

  }, []);



  const agregarMedicamento = (e) => {

    e.preventDefault();

    if (!nombre || !precio) {

      alert('Completa todos los campos');

      return;

    }


    

    let nombreImagen = nombre
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      + '.jpg';


    axios
      .post('https://farmacia-mazapan-backend.onrender.com/medicamentos',
        {
          nombre,
          precio,
          imagen: nombreImagen
        }
      )
      .then(() => {

        alert(
          'Medicamento agregado correctamente'
        );

        setNombre('');
        setPrecio('');

        cargarMedicamentos();

      })
      .catch(err => {

        console.error(
          'Error al agregar medicamento:',
          err
        );

        alert(
          'No se pudo agregar el medicamento'
        );

      });

  };




  const eliminarMedicamento = (id) => {

    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar este medicamento?'
    );

    if (!confirmar) {
      return;
    }


    axios
      .delete(`https://farmacia-mazapan-backend.onrender.com/medicamentos/${id}`)
      .then(() => {

        alert(
          'Medicamento eliminado correctamente'
        );

        cargarMedicamentos();

      })
      .catch(err => {

        console.error(
          'Error al eliminar:',
          err
        );

        alert(
          'No se puede eliminar este medicamento si tiene ventas registradas.'
        );

      });

  };



  const comenzarEditar = (medicamento) => {

    setEditando(medicamento.id);

    setFormEditar({

      nombre: medicamento.nombre,

      precio: medicamento.precio,

      imagen: medicamento.imagen

    });

  };



  const guardarEdicion = (id) => {

    if (
      !formEditar.nombre ||
      !formEditar.precio
    ) {

      alert('Completa todos los campos');

      return;

    }


    axios
      .put(
        `https://farmacia-mazapan-backend.onrender.com/medicamentos/${id}`,
        formEditar
      )
      .then(() => {

        alert(
          'Medicamento actualizado correctamente'
        );

        setEditando(null);

        cargarMedicamentos();

      })
      .catch(err => {

        console.error(
          'Error al actualizar:',
          err
        );

        alert(
          'No se pudo actualizar el medicamento'
        );

      });

  };


  return (

    <div>

      <style>{`

        .medicamentos-header {
          margin-bottom: 25px;
        }

        .medicamentos-header h2 {
          margin: 0 0 5px;
          color: #1976d2;
          font-size: 26px;
        }

        .medicamentos-header p {
          margin: 0;
          color: #666;
        }


        .medicamento-form {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #ddd;
          margin-bottom: 25px;
        }

        .medicamento-form h3 {
          margin-top: 0;
          color: #333;
        }


        .medicamento-form form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }


        .medicamento-form input {
          padding: 11px;
          border: 1px solid #ccc;
          border-radius: 7px;
          font-size: 14px;
          flex: 1;
          min-width: 200px;
        }


        .btn-agregar {
          background: #1976d2;
          color: white;
          border: none;
          padding: 11px 20px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
        }


        .btn-agregar:hover {
          background: #125ca1;
        }


        .medicamentos-lista {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          min-width: 0;
        }

        .tabla-responsive {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .tabla-responsive table {
          width: 100%;
          min-width: 700px;
          border-collapse: collapse;
        }


        .medicamentos-lista h3 {
          margin: 0;
          padding: 18px;
          border-bottom: 1px solid #ddd;
        }


        table {
          width: 100%;
          border-collapse: collapse;
        }


        th {
          background: #e3f2fd;
          color: #1976d2;
          padding: 12px;
          text-align: left;
        }


        td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }


        .imagen-tabla {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }


        .btn-editar {
          background: #ff9800;
          color: white;
          border: none;
          padding: 7px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
        }


        .btn-eliminar {
          background: #e53935;
          color: white;
          border: none;
          padding: 7px 12px;
          border-radius: 5px;
          cursor: pointer;
        }


        .btn-guardar {
          background: #43a047;
          color: white;
          border: none;
          padding: 7px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
        }


        .btn-cancelar {
          background: #777;
          color: white;
          border: none;
          padding: 7px 12px;
          border-radius: 5px;
          cursor: pointer;
        }


        .editar-input {
          padding: 7px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 90%;
        }

      `}</style>


      <div className="medicamentos-header">

        <h2>
           Medicamentos
        </h2>

        <p>
          Administra los medicamentos disponibles en la farmacia.
        </p>

      </div>


      
      <div className="medicamento-form">

        <h3>
          Agregar medicamento
        </h3>


        <form onSubmit={agregarMedicamento}>

          <input
            type="text"
            placeholder="Nombre del medicamento"
            value={nombre}
            onChange={e =>
              setNombre(e.target.value)
            }
          />


          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={precio}
            onChange={e =>
              setPrecio(e.target.value)
            }
          />


          <button
            type="submit"
            className="btn-agregar"
          >
            Agregar medicamento
          </button>

        </form>

      </div>


   

      <div className="medicamentos-lista">

        <h3>
           Lista de medicamentos
        </h3>


        <div className="tabla-responsive">
        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Imagen</th>

              <th>Nombre</th>

              <th>Precio</th>

              <th>Acciones</th>

            </tr>

          </thead>


          <tbody>

            {medicamentos.map(medicamento => (

              <tr key={medicamento.id}>


                <td>
                  {medicamento.id}
                </td>


                <td>

                  <img
                    className="imagen-tabla"
                    src={`/images/${medicamento.imagen}`}
                    alt={medicamento.nombre}
                  />

                </td>


                <td>

                  {editando === medicamento.id ? (

                    <input
                      className="editar-input"
                      value={formEditar.nombre}
                      onChange={e =>
                        setFormEditar({
                          ...formEditar,
                          nombre: e.target.value
                        })
                      }
                    />

                  ) : (

                    medicamento.nombre

                  )}

                </td>


                <td>

                  {editando === medicamento.id ? (

                    <input
                      className="editar-input"
                      type="number"
                      step="0.01"
                      value={formEditar.precio}
                      onChange={e =>
                        setFormEditar({
                          ...formEditar,
                          precio: e.target.value
                        })
                      }
                    />

                  ) : (

                    `$${Number(
                      medicamento.precio
                    ).toFixed(2)}`

                  )}

                </td>


                <td>

                  {editando === medicamento.id ? (

                    <>

                      <button
                        className="btn-guardar"
                        onClick={() =>
                          guardarEdicion(
                            medicamento.id
                          )
                        }
                      >
                        Guardar
                      </button>


                      <button
                        className="btn-cancelar"
                        onClick={() =>
                          setEditando(null)
                        }
                      >
                        Cancelar
                      </button>

                    </>

                  ) : (

                    <>

                      <button
                        className="btn-editar"
                        onClick={() =>
                          comenzarEditar(
                            medicamento
                          )
                        }
                      >
                        Editar
                      </button>


                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          eliminarMedicamento(
                            medicamento.id
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </>

                  )}

                </td>


              </tr>

            ))}

          </tbody>

        </table>
        </div>

      </div>

    </div>

  );
}

export default Medicamentos;