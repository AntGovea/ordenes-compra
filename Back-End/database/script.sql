CREATE TABLE
    Ordenes (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        nombre varchar(50),
        categoria varchar(30),
        cantidad INT,
        importe_total DECIMAL(10, 2),
        fecha varchar(10),
    );

SELECT
    *
FROM
    Ordenes;

SELECT
    *
FROM
    INFORMATION_SCHEMA.TABLES
WHERE
    TABLE_TYPE = 'BASE TABLE';

DROP TABLE Ordenes;

SELECT
    sum(importe_total)
FROM
    Ordenes;

SELECT
    sum(importe_total) importeTotal
FROM
    Ordenes;

SELECT
    sum(importe_total)
FROM
    Ordenes
WHERE
    categoria LIKE 'categoria%';