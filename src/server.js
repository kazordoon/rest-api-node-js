const app = require('./config/express')

require('./database')

app.listen(app.get('PORT'), () => {
  console.log(`Servidor rodando em ${process.env.APP_HOST}:${app.get('PORT')}`)
})
