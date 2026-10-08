import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormularioVenta({ onVentaRegistrada }) {

  const [clientes, setClientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  const [formData, setFormData] = useState({
    cliente_id: '',
    medicamento_id: '',
    cantidad: '',
    fecha: ''
  });

  useEffect(() => {

    axios
      .get('https://farmacia-mazapan-backend.onrender.com/clientes')
      .then(res => {
        setClientes(res.data);
      })
      .catch(err => {
        console.error('Error al cargar clientes:', err);
      });

    axios
      .get('https://farmacia-mazapan-backend.onrender.com/medicamentos')
      .then(res => {
        setMedicamentos(res.data);
      })
      .catch(err => {
        console.error('Error al cargar medicamentos:', err);
      });

  }, []);

  const manejarCambio = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const registrarVenta = (e) => {

    e.preventDefault();

    if (
      !formData.cliente_id ||
      !formData.medicamento_id ||
      !formData.cantidad ||
      !formData.fecha
    ) {

      alert('Completa todos los campos');

      return;
    }

    axios
      .post( 'https://farmacia-mazapan-backend.onrender.com/ventas',
            formData
      )
      .then(() => {

        alert('Venta registrada correctamente');

        setFormData({
          cliente_id: '',
          medicamento_id: '',
          cantidad: '',
          fecha: ''
        });

        onVentaRegistrada();

      })
      .catch(err => {

        console.error('Error al registrar venta:', err);

        alert('No se pudo registrar la venta');

      });

  };

  return (

    <div className="formulario-venta">

      <style>{`

        .formulario-venta {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #ddd;
          margin-bottom: 30px;
        }

        .formulario-venta h2 {
          color: #1976d2;
          margin-top: 0;
        }

        .formulario-venta p {
          color: #666;
          margin-bottom: 20px;
        }

        .venta-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .campo {
          display: flex;
          flex-direction: column;
        }

        .campo label {
          margin-bottom: 6px;
          font-weight: bold;
          color: #444;
          font-size: 14px;
        }

        .campo input,
        .campo select {
          padding: 11px;
          border: 1px solid #ccc;
          border-radius: 7px;
          font-size: 14px;
        }

        .btn-registrar {
          grid-column: 1 / -1;
          background: #1976d2;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 7px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-registrar:hover {
          background: #125ca1;
        }

        @media (max-width: 700px) {
          .venta-form {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <h2>Registrar venta</h2>

      <p>
        Completa los datos para registrar una nueva venta.
      </p>

      <form
        className="venta-form"
        onSubmit={registrarVenta}
      >

        <div className="campo">

          <label>
            Cliente
          </label>

          <select
            name="cliente_id"
            value={formData.cliente_id}
            onChange={manejarCambio}
          >

            <option value="">
              Seleccionar cliente
            </option>

            {clientes.map(cliente => (

              <option
                key={cliente.id}
                value={cliente.id}
              >
                {cliente.nombre}
              </option>

            ))}

          </select>

        </div>

        <div className="campo">

          <label>
            Medicamento
          </label>

          <select
            name="medicamento_id"
            value={formData.medicamento_id}
            onChange={manejarCambio}
          >

            <option value="">
              Seleccionar medicamento
            </option>

            {medicamentos.map(medicamento => (

              <option
                key={medicamento.id}
                value={medicamento.id}
              >
                {medicamento.nombre}
              </option>

            ))}

          </select>

        </div>

        <div className="campo">

          <label>
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            name="cantidad"
            value={formData.cantidad}
            onChange={manejarCambio}
            placeholder="Cantidad"
          />

        </div>

        <div className="campo">

          <label>
            Fecha
          </label>

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={manejarCambio}
          />

        </div>

        <button
          type="submit"
          className="btn-registrar"
        >
          Registrar venta
        </button>

      </form>

    </div>

  );
}

export default FormularioVenta;