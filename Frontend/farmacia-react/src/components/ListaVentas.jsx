import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaVentas({ actualizar }) {

  const [ventas, setVentas] = useState([]);

  const cargarVentas = () => {

    axios
      .get('https://farmacia-mazapan-backend.onrender.com/ventas')
      .then(res => {
        setVentas(res.data);
      })
      .catch(err => {
        console.error('Error al obtener ventas:', err);
      });

  };

  useEffect(() => {
    cargarVentas();
  }, [actualizar]);

  const eliminarVenta = (id) => {

    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar esta venta?'
    );

    if (!confirmar) {
      return;
    }

    axios
      .delete(`https://farmacia-mazapan-backend.onrender.com/ventas/${id}`)
      .then(() => {

        alert('Venta eliminada correctamente');

        cargarVentas();

      })
      .catch(err => {

        console.error('Error al eliminar venta:', err);

        alert('No se pudo eliminar la venta');

      });

  };

  return (

    <div className="lista-ventas">

      <style>{`

        .lista-ventas {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          min-width: 0;
        }

        .tabla-ventas-responsive {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .lista-ventas-header {
          padding: 20px;
          border-bottom: 1px solid #ddd;
        }

        .lista-ventas-header h2 {
          margin: 0 0 5px;
          color: #1976d2;
        }

        .lista-ventas-header p {
          margin: 0;
          color: #666;
        }

        .tabla-ventas {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
          table-layout: auto;
        }

        .tabla-ventas th {
          background: #e3f2fd;
          color: #1976d2;
          padding: 10px 6px;
          text-align: center;
          font-size: 13px;
          border-bottom: 1px solid #ddd;
        }

        .tabla-ventas td {
          padding: 10px 6px;
          border-bottom: 1px solid #eee;
          text-align: center;
          font-size: 13px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .tabla-ventas tr:hover td {
          background: #f8fbff;
        }

        .tabla-ventas th:nth-child(1),
        .tabla-ventas td:nth-child(1) {
          width: 6%;
        }

        .tabla-ventas th:nth-child(2),
        .tabla-ventas td:nth-child(2) {
          width: 15%;
        }

        .tabla-ventas th:nth-child(3),
        .tabla-ventas td:nth-child(3) {
          width: 17%;
        }

        .tabla-ventas th:nth-child(4),
        .tabla-ventas td:nth-child(4) {
          width: 9%;
        }

        .tabla-ventas th:nth-child(5),
        .tabla-ventas td:nth-child(5) {
          width: 10%;
        }

        .tabla-ventas th:nth-child(6),
        .tabla-ventas td:nth-child(6) {
          width: 10%;
        }

        .tabla-ventas th:nth-child(7),
        .tabla-ventas td:nth-child(7) {
          width: 13%;
        }

        .tabla-ventas th:nth-child(8),
        .tabla-ventas td:nth-child(8) {
          width: 20%;
        }

        .total {
          font-weight: bold;
          color: #1976d2;
        }

        .btn-eliminar {
          background: #e53935;
          color: white;
          border: none;
          padding: 6px 9px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 12px;
        }

        .btn-eliminar:hover {
          background: #c62828;
        }

        .sin-ventas {
          padding: 35px;
          text-align: center;
          color: #777;
        }

        @media (max-width: 900px) {

          .tabla-ventas th,
          .tabla-ventas td {
            font-size: 11px;
            padding: 8px 4px;
          }

          .btn-eliminar {
            padding: 5px 7px;
            font-size: 10px;
          }

        }

      `}</style>

      <div className="lista-ventas-header">

        <h2>
           Ventas registradas
        </h2>

        <p>
          Lista de las ventas realizadas en la farmacia.
        </p>

      </div>

      {ventas.length === 0 ? (

        <div className="sin-ventas">
          No hay ventas registradas.
        </div>

      ) : (

        <div className="tabla-ventas-responsive">
        <table className="tabla-ventas">

          <thead>

            <tr>

              <th>ID</th>
              <th>Cliente</th>
              <th>Medicamento</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {ventas.map(venta => (

              <tr key={venta.id}>

                <td>
                  {venta.id}
                </td>

                <td>
                  {venta.cliente}
                </td>

                <td>
                  {venta.medicamento}
                </td>

                <td>
                  {venta.cantidad}
                </td>

                <td>
                  ${Number(venta.precio).toFixed(2)}
                </td>

                <td className="total">
                  ${Number(venta.total).toFixed(2)}
                </td>

                <td>
                  {venta.fecha}
                </td>

                <td>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarVenta(venta.id)}
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        </div>

      )}

    </div>

  );
}

export default ListaVentas;

