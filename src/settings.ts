import dotenv from 'dotenv'

dotenv.config()

const Settings = {
  PORT: process.env.PORT ? process.env.PORT : 3000 
}

export default Settings
