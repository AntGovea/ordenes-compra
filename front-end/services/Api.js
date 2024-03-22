const api = `http://localhost:8081/api/datos/`;

export const getProducts = async () => {
    try {
        const res = await fetch(`${api}getAllProducts`);
        const json = await res.json()
        return json
    } catch (error) {
        throw error(error)
    }
}
export const getOrders = async () => {
    try {
        const res = await fetch(`${api}ordenes`);
        const json = await res.json()
        return json

    } catch (error) {
        throw error(error)
    }
}
export const getGrandTotal = async () => {
    try {
        const res = await fetch(`${api}getGrandTotal`);
        const json = await res.json()
        return json

    } catch (error) {
        throw error(error)
    }
}
export const getTotalByCategory = async (categoria) => {
    try {
        const res = await fetch(`${api}getTotalByCategory`, {
            method: 'POST',
            body: JSON.stringify({
                categoria,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json()
        return json

    } catch (error) {
        throw error(error)
    }
}

export const postOrder = async ({
    idProducto, cantidad, precioUnitario, importeTotal
}) => {
    try {
        const res = await fetch(`${api}saveOrder`, {
            method: 'POST',
            body: JSON.stringify({
                idorden: 0,
                idproducto: idProducto,
                cantidad,
                preciounitario: precioUnitario,
                importetotal: importeTotal,

            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await res.json()
        return json
    } catch (error) {
        throw error(error)
    }
}














