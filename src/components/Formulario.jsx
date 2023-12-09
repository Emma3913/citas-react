import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  const [nombre, setNombre] = useState("");
  const [propietario, setPropioetario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  
  const [error, setError] = useState(false);

    // Lo que se coloque dentro de los corchetes, sera el 
    // valor que va a estar revisando cuando cambie y si lo hace muestra un re-render
    // Si no se le pasa nada dentro de las dependecias, indicariamos que solo se ejeccutara una vez
  
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropioetario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } 
  }, [paciente])   

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const feecha = Date.now().toString(36);

    return random + feecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log("Hay al menos un campo vacio")

      setError(true)
      return;
    } 
    
    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if (paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState )   

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])

    }

    // Reiniciar nombre
    setNombre('');
    setPropioetario('');
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5  mx-3">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Admnistralos</span>
      </p>

      <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        <div className="mb-5">
          
          { error && <Error><p>Todos los campos son obligatorios</p></Error>}
          
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la mascota"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Propietario
          </label>
          <input
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del propietario"
            value={propietario}
            onChange={ (e) => setPropioetario(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email de contacto"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            ALta
          </label>
          <input
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            placeholder="Nombre de la mascota"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>
        <input type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
          hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? "Editar paciente" : "Agregar paciente" }
        />
      </form>
    </div>
  );
}

export default Formulario;
