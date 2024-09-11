import * as express from 'express'
import * as ViteExpress from 'vite-express'

const app = express()
const port = 4000

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

ViteExpress.config({
  viteConfigFile: 'client/vite.config.ts',
  transformer: (html: string, _req: Request) => {
    return html.replace(
      '<!-- placeholder -->',
      `<meta name="custom" content="hello from the server"/>`,
    )
  },
})

ViteExpress.listen(app, port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
