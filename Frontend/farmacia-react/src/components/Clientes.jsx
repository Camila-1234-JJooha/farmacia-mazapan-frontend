import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clientes() {

  const [clientes, setClientes] = useState([]);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const [editando, setEditando] = useState(null);

  const [formEditar, setFormEditar] = useState({
    nombre: '',
    telefono: ''
  });

  const cargarClientes = () => {

    axios
      .get('https://farmacia-mazapan-backend.onrender.com/clientes')
      .then(res => {
        setClientes(res.data);
      })
      .catch(err => {
        console.error('Error al obtener clientes:', err);
      });

  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const agregarCliente = (e) => {

    e.preventDefault();

    if (!nombre || !telefono) {
      alert('Completa todos los campos');
      return;
    }

    axios
      .post('https://farmacia-mazapan-backend.onrender.com/clientes', {
        nombre,
        telefono
      })
      .then(() => {

        alert('Cliente agregado correctamente');

        setNombre('');
        setTelefono('');

        cargarClientes();

      })
      .catch(err => {
        console.error('Error al agregar cliente:', err);
        alert('No se pudo agregar el cliente');
      });

  };

  const eliminarCliente = (id) => {

    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar este cliente?'
    );

    if (!confirmar) {
      return;
    }

    axios
      .delete(`https://farmacia-mazapan-backend.onrender.com/clientes/${id}`)
      .then(() => {

        alert('Cliente eliminado correctamente');

        cargarClientes();

      })
      .catch(err => {

        console.error('Error al eliminar:', err);

        alert(
          'No se puede eliminar este cliente si tiene ventas registradas.'
        );

      });

  };

  const comenzarEditar = (cliente) => {

    setEditando(cliente.id);

    setFormEditar({
      nombre: cliente.nombre,
      telefono: cliente.telefono
    });

  };

  const guardarEdicion = (id) => {

    axios
      .put(
        `https://farmacia-mazapan-backend.onrender.com/clientes/${id}`,
        formEditar
      )
      .then(() => {

        alert('Cliente actualizado correctamente');

        setEditando(null);

        cargarClientes();

      })
      .catch(err => {

        console.error('Error al actualizar:', err);

        alert('No se pudo actualizar el cliente');

      });

  };

  return (

    <div>

      <style>{`

        .clientes-header {
          margin-bottom: 25px;
        }

        .clientes-header h2 {
          margin: 0 0 5px;
          color: #1976d2;
          font-size: 26px;
        }

        .clientes-header p {
          margin: 0;
          color: #666;
        }

        .cliente-form {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #ddd;
          margin-bottom: 25px;
        }

        .cliente-form h3 {
          margin-top: 0;
          color: #333;
        }

        .cliente-form form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cliente-form input {
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

        .clientes-lista {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
        }

        .clientes-lista h3 {
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

        .editar-input {
          padding: 7px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 90%;
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

      `}</style>

      <div className="clientes-header">
        <h2> Clientes</h2>
        <p>Administra los clientes registrados en la farmacia.</p>
      </div>

      <div className="cliente-form">

        <h3> Agregar cliente</h3>

        <form onSubmit={agregarCliente}>

          <input
            type="text"
            placeholder="Nombre del cliente"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />

          <button
            type="submit"
            className="btn-agregar"
          >
            Agregar cliente
          </button>

        </form>

      </div>

      <div className="clientes-lista">

        <h3> Lista de clientes</h3>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {clientes.map(cliente => (

              <tr key={cliente.id}>

                <td>{cliente.id}</td>

                <td>
                  {editando === cliente.id ? (

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
                    cliente.nombre
                  )}
                </td>

                <td>
                  {editando === cliente.id ? (

                    <input
                      className="editar-input"
                      value={formEditar.telefono}
                      onChange={e =>
                        setFormEditar({
                          ...formEditar,
                          telefono: e.target.value
                        })
                      }
                    />

                  ) : (
                    cliente.telefono
                  )}
                </td>

                <td>

                  {editando === cliente.id ? (

                    <>
                      <button
                        className="btn-guardar"
                        onClick={() => guardarEdicion(cliente.id)}
                      >
                        Guardar
                      </button>

                      <button
                        className="btn-cancelar"
                        onClick={() => setEditando(null)}
                      >
                        Cancelar
                      </button>
                    </>

                  ) : (

                    <>
                      <button
                        className="btn-editar"
                        onClick={() => comenzarEditar(cliente)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarCliente(cliente.id)}
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

  );
}

export default Clientes;