import fs from 'fs'

export default class AsyncStorage {
  constructor(public filePath = 'storage/local-db.json') {}

  async createStorage() {
    const fileExists = fs.existsSync(this.filePath)
    if (!fileExists) {
      const folder = this.filePath.split('/').slice(0, -1).join('/')
      fs.mkdirSync(folder, { recursive: true })
      fs.writeFileSync(this.filePath, '{}', { encoding: 'utf-8' })
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    const parseData = await this.getAllData()
    const parseValue = JSON.parse(value)
    const updateData = JSON.stringify(
      { ...parseData, [key]: parseValue },
      null,
      2,
    )
    await this.writeAllData(updateData)
  }

  async getItem(key: string): Promise<string | null> {
    if (!key) return null
    const parseData = await this.getAllData()
    if (parseData[key]) {
      return JSON.stringify(parseData[key])
    }
    return null
  }

  async getAllData() {
    const data = fs.readFileSync(this.filePath, { encoding: 'utf-8' })
    return JSON.parse(data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async writeAllData(allData: any) {
    fs.writeFileSync(this.filePath, allData, { encoding: 'utf-8' })
  }
}
