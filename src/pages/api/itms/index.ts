import getHandler from '@/pages/api/getHandler'

const itmFile = `${"c:\\Bootdrv\\Aloha\\newDATA\\itm.dbf"}`;

const handler = getHandler()

handler.get(async (req, res) => {
  const { DBFFile } = require("dbffile");
  let dbf = await DBFFile.open(itmFile);
  let records = await dbf.readRecords(1000);
  res.json(records)
})

export default handler
