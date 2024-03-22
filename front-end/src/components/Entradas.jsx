import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { getProducts, postOrder } from "../../services/Api";
import Swal from "sweetalert2";

const Entradas = () => {
  const [productos, setProductos] = useState([]);

  // metodo encargado de traer los productos
  const handleGetProducts = async () => {
    const { data } = await getProducts();
    setProductos(data);
  };

  const handleSaveOrder = async (values) => {
    const res = await postOrder({
      idProducto: values.idProducto,
      cantidad: values.cantidad,
      precioUnitario: values.precioUnitario,
      importeTotal: values.cantidad * values.precioUnitario,
    });
    return res
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="container mx-auto ">
      <h1>Alta de odenes</h1>

      <Formik
        // inicializamos los valores
        initialValues={{ idProducto: "", cantidad: "", precioUnitario: "" }}
        //  validacion de valores
        validate={(values) => {
          const errors = {};

          if (!values.idProducto) {
            errors.idProducto = "campo obligatorio";
          }
          if (!values.cantidad) {
            errors.cantidad = "campo obligatorio";
          }
          if (!values.precioUnitario) {
            errors.precioUnitario = "campo obligatorio";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          const res = await handleSaveOrder(values);
          if (res.code === 200) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "information saved successfully",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "info",
              title: "information not successfully saved",
            });
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          // isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Lista de productos</Form.Label>
              <Form.Select
                name="idProducto"
                aria-label="seleccione un producto"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option disabled  selected defaultValue={"Selecciona una categoria"}>
                  Selecciona un producto
                </option>
                {productos
                  ? productos.map(({ idproducto, nombre, categoria }) => (
                      <option key={idproducto} value={idproducto}>
                        {nombre}___{categoria}
                      </option>
                    ))
                  : null}
              </Form.Select>

              {errors.idProducto && touched.idProducto ? (
                <label className=" required">{errors.idProducto}</label>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cantidad}
              />
              {errors.cantidad && touched.cantidad ? (
                <label className=" required">{errors.cantidad}</label>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio Unitario</Form.Label>
              <Form.Control
                type="number"
                step={"0.01"}
                
                name="precioUnitario"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.precioUnitario}
              />
              {errors.precioUnitario && touched.precioUnitario ? (
                <label className=" required">{errors.precioUnitario}</label>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar orden
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Entradas;
