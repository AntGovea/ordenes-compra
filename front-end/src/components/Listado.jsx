import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getGrandTotal,
  getProducts,
  getTotalByCategory,
} from "../../services/Api";
import { CustomModal } from "./Modal";

export const Listado = () => {
  const [categorias, setCategorias] = useState([]);

  const [values, setValues] = useState({
    granTotal: 0,
    totalPorCategoria: 0,
    categoria: "",
  });
  const [showGranTotal, setShowGranTotal] = useState(false);
  const [showTotalPorCategoria, setShowTotalPorCategoria] = useState(false);

  // metodo encargado de traer los productos
  const handleGetProducts = async () => {
    const response = await getProducts();
    console.log("responses", response);

    if (response.code === 200) {
      const categoriasUnicas = {};
      let categorias = response.data.filter((item) => {
        if (!categoriasUnicas[item.categoria]) {
          categoriasUnicas[item.categoria] = true;
          return true;
        }
        return false;
      });
      setCategorias(categorias);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setValues({ ...values, categoria: value });
  };
  const handleGetGrandTotal = async () => {
    try {
      const response = await getGrandTotal();
      if (response.code === 200) {
        setValues({ ...values, granTotal: response.data[0][""] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleGetTotalByCategory = async () => {
    try {
      const response = await getTotalByCategory(values.categoria || 0);
      if (response.code === 200) {
        setValues({ ...values, totalPorCategoria: response.data[0][""] || 0 });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <Container className="mt-6">
        <Container>
          <Accordion>
            <Button
              onClick={() => {
                handleGetGrandTotal();
                setShowGranTotal(true);
              }}
              className="me-2"
            >
              Ver gran total
            </Button>

            <Form.Group className="mb-3">
              <Form.Label>Lista de productos</Form.Label>
              <Form.Select
                aria-label="seleccione una categoria"
                onChange={handleChange}
              >
                <option disabled  selected defaultValue={"Selecciona una categoria"}>
                  Selecciona una categoria
                </option>
                {categorias
                  ? categorias.map(({ categoria }) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Form.Group>
            <Button
              onClick={() => {
                handleGetTotalByCategory();
                setShowTotalPorCategoria(true);
              }}
              className="me-2"
            >
              Ver gran total por categoria
            </Button>
            <CustomModal
              smShow={showGranTotal}
              closeModal={() => {
                setShowGranTotal(!showGranTotal);
              }}
              title={"GRAN TOTAL"}
              description={values.granTotal}
            />
            <CustomModal
              smShow={showTotalPorCategoria}
              closeModal={() => {
                setShowTotalPorCategoria(!showTotalPorCategoria);
              }}
              title={"GRAN TOTAL POR CATEGORIA"}
              description={values.totalPorCategoria}
            />
          </Accordion>
        </Container>
      </Container>
    </>
  );
};
