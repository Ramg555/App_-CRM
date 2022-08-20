import React from 'react'
import {Formik, Form, Field} from "formik"
import { useNavigate} from "react-router-dom"
import * as Yup from "yup"
import Alerta from './Alerta'

function Formulario({cliente, cargando}) {
    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3,"El nombre es muy corto")
                    .max(20,"El nombre es muy largo")
                    .required("El nombre del Cliente es obligatorio"),
        empresa: Yup.string()
                    .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
                    .required("El email es obligatorio")
                    .email("Email no valido"),
        telefono: Yup.number().typeError("El numero no es valido")
                    .integer("Numero no valido")
                    .positive("Numero no valido"),

    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if(cliente.id){
                // Eitando un registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
            }else{
                // Nuevo Registro
                const url = "http://localhost:4000/clientes"

                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
            }
            await respuesta.json()
            navigate("/clientes")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                {cliente.nombre ? "Editar Cliente" : "Nuevo Cliente"}
            </h1>
            <Formik
                initialValues={{
                    nombre: cliente.nombre ?? "",
                    empresa: cliente.empresa ?? "",
                    email: cliente.email ?? "",
                    telefono: cliente.telefono ?? "",
                    notas: cliente.notas ?? "",
                }}
                enableReinitialize
                onSubmit={async (values, {resetForm}) => {
                    handleSubmit(values)
                    
                    resetForm()
                }}
                validationSchema = {nuevoClienteSchema}
            >
                { ({errors, touched}) => {
                    // console.log(data);
                    return (
                    
                    
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label htmlFor="nombre" className='text-gray-800 '>Nombre:</label>
                    <Field
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Cliente"
                        name="nombre"
                    />
                    {
                        errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null
                    }

                    </div>

                    <div className='mb-4'>
                        <label htmlFor="empresa" className='text-gray-800 '>Empresa:</label>
                    <Field
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Empresa del Cliente"
                        name="empresa"
                    />
                    {
                        errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null
                    }

                    </div>

                    
                    <div className='mb-4'>
                        <label htmlFor="email" className='text-gray-800 '>Email:</label>
                    <Field
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Email del Cliente"
                        name="email"
                    />
                    {
                        errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null
                    }

                    </div>

                    <div className='mb-4'>
                        <label htmlFor="telefono" className='text-gray-800 '>Telefono:</label>
                    <Field
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Telefono del Cliente"
                        name="telefono"
                    />
                    {
                        errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null
                    }

                    </div>

                    <div className='mb-4'>
                        <label htmlFor="notas" className='text-gray-800 '>Notas:</label>
                    <Field
                        as="textarea"
                        id="notas"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                        placeholder="Notas del Cliente"
                        name="notas"
                    />

                    </div>

                    <input 
                        type="submit" 
                        value={cliente.nombre ? "Editar Cliente" : "Nuevo Cliente"} 
                        className='mt-5 w-full text-center bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                    />
                    
                </Form>
                )
            } }
            </Formik>
        </div>
    )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario
