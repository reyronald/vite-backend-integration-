import * as express from 'express'
import * as ViteExpress from 'vite-express'

const app = express()
const port = 4000

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

ViteExpress.config({
  mode: process.env.NODE_ENV === 'production' ? 'production' : undefined,
  viteConfigFile: 'client/vite.config.ts',
  transformer: (html: string, _req: Request) => {
    const CDN_URL = 'http://localhost:4000'

    return html.replace(
      '<!-- placeholder -->',
      `<meta name="custom" content="hello from the server"/>\n` +
        `
        <script>
          window.__toCdnUrl = (path) => "${CDN_URL}/" + path;
          window.__dynamicImportHandler = (path) => "${CDN_URL}/assets" + path.replace(/^./, '');
        </script>
        `,
    )
  },
})

ViteExpress.listen(app, port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
