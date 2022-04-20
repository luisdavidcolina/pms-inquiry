import fs from 'fs'
import parser from 'xml2json'
import getHandler from '@/pages/api/getHandler'
import pool from '@/pages/api/pool'
import logger from '@/pages/api/log'
import { convertJSON } from './util'
import { print } from './print'
import { folder } from '@/const/routes'

const handler = getHandler()

handler
  .get(async (req, res) => {
    const response = await pool.query('SELECT * FROM master.tbl_consumos')
    const invoices = response.rows.map((invoice) => {
      return {
        ...invoice,
        price: [invoice.price],
      }
    })

    res.status(200).json(invoices)
  })
  .post((req, res) => {
    const { checkNumber, room, user } = req.body
    const file = fs.readFile(`${folder}${checkNumber}.xml`, (err, data) => {
      const json = JSON.parse(parser.toJson(data, { reversible: false }))
      const items = convertJSON(json, room)
      //sendPrint()
      print(items, user)
      logger.info('Connecting to the database')
      items.forEach((item: any) => {
        const { pos, name, date, account, product, price, hab } = item
        
        const newQuery = `INSERT INTO master.tbl_consumos(pos, name, date, account, product, price, hab)VALUES('${pos}', '${name}', '${date}', '${account}', '${product}', ${price}, '${hab}')`
        pool.query(newQuery, (err, res) => {
          if (res) logger.info(`Successfully inserted: ${account} - ${product} - ${price}`)
          if (err) logger.error(JSON.stringify(err))
        })
      })

      res.status(200).json(items)
    })
  })

export default handler
