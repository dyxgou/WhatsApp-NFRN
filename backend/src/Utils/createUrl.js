import { config } from "dotenv"


config()
const createUrl = (path) =>
{
  return `${process.env.API}/${path}`
}

export default createUrl