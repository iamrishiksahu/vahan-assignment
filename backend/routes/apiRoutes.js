const express = require('express');
const router = express.Router()
const client = require('../db/dbConfig');


// SAMPLE RESPONSE
// Result {
//     command: 'SELECT',
//     rowCount: 3,
//     oid: null,
//     rows: [
//       { brand: 'Volvo', model: 'p1800', year: 1968 },
//       { brand: 'BMW', model: 'M1', year: 1978 },
//       { brand: 'Toyota', model: 'Celica', year: 1975 }
//     ],
//     fields: [
//       Field {
//         name: 'brand',
//         tableID: 16399,
//         columnID: 1,
//         dataTypeID: 1043,
//         dataTypeSize: -1,
//         dataTypeModifier: 259,
//         format: 'text'
//       }
//     ],
//   }

router.post('/create-table', async (req, res) => {

    const { table, attributes } = req.body

    if (!table || !attributes) {
        return res.status(400).send('table, id, attributes are required!')
    }

    // Create table definition
    const attrString = attributes.map((item) => {
        return `${item.fieldName} ${item.type.dataType}`
    }).join(',')

    try {
        const qs = `CREATE TABLE "${table}" (${attrString});`
        const ans = await client.query(qs)
        // res.status(201).send('Table created successfully!')
    } catch (err) {
        console.log(err)
        if (err.code === '42P07') {
            return res.status(409).send('This table already exists!')
        }
        return res.status(500).send(err)
    }

    // Record table data in entities table
    try {
        const qs = `INSERT INTO entities VALUES ('${table}', $1, $2, $3);`

        const ans = await client.query(qs, [JSON.stringify(attributes), new Date(), new Date()])
        console.log(ans.rows)
        return res.status(201).send('Table created successfully!')
    } catch (err) {
        // Reverting back the table creation
        const qs = `DROP TABLE "${table}";`
        await client.query(qs)


        console.log(err)
        return res.status(500).send(err)
    }

})

router.delete('/delete-table', async (req, res) => {
    const { data } = req.body;
    console.log(req.body)

    if (!data) {
        return res.status(400).send('Table Name (data) is required')
    }
    const qs = `DROP TABLE "${data}"`

    try {
        const ans = await client.query(qs)
        console.log(ans)
        return res.status(200).send('Deleted!')
    } catch (err) {
        console.log(err)
        if (err?.code === '42P01') {
            return res.status(404).send('DropErrorMsgNonExistent')
        }
        return res.status(500).send(err)
    }
})

router.get('/get-tables', async (req, res) => {

    try{
        const qs = `SELECT * FROM entities;`
        const ans = await client.query(qs)

        console.log(ans.rows)
        return res.status(200).json(ans.rows)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

router.post('/test', async (req, res) => {

    const getAllTables = `SELECT *
    FROM pg_catalog.pg_tables
    WHERE schemaname != 'pg_catalog' AND 
        schemaname != 'information_schema';`

    const qs = `ALTER TABLE entities ALTER COLUMN attributes TYPE TEXT`
    const qsss = `SELECT * FROM ENTITIES`
    const qss = `SELECT
        column_name,
        data_type
    FROM
        information_schema.columns
    WHERE
        table_name = 'entities';`



    try {
        const ans = await client.query(qsss)
        console.log(ans.rows)
        return res.status(200).json(ans.rows)
    } catch (err) {
        console.log(err)

        return res.status(500).send(err)
    }

})

router.post('/add-entity', (req, res) => {

    const query = "INERT INTO ENTITIES ()"
    console.log(req.body)
    return res.status(200).send('inserted into entity')
})




router.post('/insert-record', (req, res) => {
    // Need record details and table name
    const { tableName, record } = req.body
    const query = `INSERT INTO ${tableName} `
    return res.status(200).send('api')
})
router.put('/update-record', (req, res) => {
    // Need record details and table name
    return res.status(200).send('api')
})
router.delete('/delete-record', (req, res) => {
    // Need record details and table name
    return res.status(200).send('api')
})
router.get('/get-all-records', (req, res) => {
    // Need table name
    return res.status(200).send('api')
})






module.exports = router