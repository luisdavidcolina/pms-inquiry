import { promises as fsPromises } from 'fs'
import chokidar from 'chokidar'
import fs from 'fs'
import parser from 'xml2json'
import { spawn } from 'child_process'
import logger from '@/pages/api/log'
import getHandler from '@/pages/api/getHandler'
import { convertJSON } from './util'
import { folder, folderFile, route } from '@/const/routes'

const watcher = chokidar.watch(folder, {
  ignored: /^\./,
  persistent: false,
  ignoreInitial: true,
})

const verify = (checkNumber: string) => {
  const bat =
    'start "" "C:\\pcnub\\Luisda.lnk" http://localhost:3000/' + checkNumber
    const xmlFile =  `${folder}${checkNumber}.xml`
    logger.info(`Leyendo XML de ${xmlFile}`)
  try {
    const file = fs.readFile(xmlFile, (err, data) => {
      if (err) {
        logger.error(err)
        return
      }
      const buffer: Buffer = data
      let json: any
      try {
        json = JSON.parse(parser.toJson(buffer, { reversible: false }))
      } catch (error) {
        logger.error(`Error al parsear XML de ${checkNumber}`)
        logger.error(error)
      } finally {
        logger.info(`Procesando JSON de ${checkNumber}`)
        const validate =
          json.Transacction !== undefined &&
          json.Transacction.Tenders.Tender.TenderName === 'PMS'
        if (validate)
          fsPromises
            .writeFile(route, bat)
            .then(() => {
              logger.info(`${checkNumber} has been sent to the inquiry screen`)
              logger.info(`Bat: ${bat} Route: ${route}`)
              spawn('cmd.exe', ['/c', route])
            })
            .catch(function (error) {
              logger.error(`Error: ${error}`)
            })
        else logger.info(`${checkNumber} is not a PMS check`)
      }
    })
  } catch (error) {
    logger.error(`Error: ${error}`)
  }
}


const handler = getHandler()

watcher
  .on('ready', () => {
    logger.info(`Initializing XML lookup in ${folder}`)
  })
  .on('add', function (path) {
    logger.info(`${path} has been detected`)
    const checkNumber = path.replace(folder, '').replace('.xml', '')
    logger.info(`CheckNumber N° ${checkNumber}`)
    verify(checkNumber)
  })
  .on('unlinkDir', function (path) {
    logger.error(`${path} has been deleted`)
  })
  .on('error', (error) => {
    logger.error(`Error: ${error}`)
  })

handler.get((req, res) => {
  res.status(200).json({ message: 'ok' })
})

export default handler
