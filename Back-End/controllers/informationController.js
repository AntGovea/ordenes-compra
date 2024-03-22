const { response } = require("express");
const getConnection = require("../database/configDatabase");
const { api } = require("../const/const");

const executeQuery = async (query) => {
	const poolSQL = await getConnection();
	let result = await poolSQL.request().query(`${query}`);
	return result;
}
const testApi = async (req, res = response) => {
	const response = await fetch(`${api}productos`, {
		method: 'GET',
	}
	);
	const json = await response.json()
	res.status(200).json({
		message: "consulta exitosa",
		data: json,
	});
};
const getAllProducts = async (req, res = response) => {
	try {
		const resp = await fetch(`${api}productos`);
		const json = await resp.json()
		res.json({
			code: 200,
			description: "successfully",
			data: json,
		});
	} catch (error) {
		res.json({
			code: 500,
			description: error.toString(),

		})
	}
};
const saveOrder = async (req, res = response) => {

	try {

		let {
			idorden = '0',
			idproducto = null,
			cantidad = null,
			preciounitario = null,
			importetotal = null,

		} = req.body;

		const response = await fetch(`${api}ordenes`, {
			method: 'POST',
			body: JSON.stringify({
				idorden,
				idproducto,
				cantidad,
				preciounitario,
				importetotal,
			}),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		const json = await response.json();
		await executeQuery(`INSERT INTO
		Ordenes (nombre, categoria, cantidad, importe_total,fecha)
		VALUES
		('${json.nombre}','${json.categoria}',${json.cantidad},${json.importetotal},'${json.fecha}');`);
		res.json({
			code: 200,
			description: "successfully",
			data: json,
		})
	}
	catch (error) {

		res.json({
			code: 500,
			description: error.toString(),

		})
	}

}
const getGrandTotal = async (req, res = response) => {
	const data = await executeQuery(`
	 SELECT sum(importe_total) FROM Ordenes;`);

	res.json({
		code: 200,
		description: 'successfully',
		data: data.recordset
	})
}
const getTotalByCategory = async (req, res = response) => {
	try {
		const {
			categoria = null
		} = req.body;
		const data = await executeQuery(`
	 SELECT sum(importe_total) FROM Ordenes WHERE categoria LIKE '${categoria}%';`);

		res.json({
			code: 200,
			description: 'successfully',
			data: data.recordset
		})
	} catch (error) {
		res.json({
			code: 500,
			description: error.toString(),

		})
	}
}

module.exports = {
	testApi,
	getAllProducts,
	saveOrder,
	getGrandTotal,
	getTotalByCategory,
};
