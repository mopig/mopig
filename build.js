import Parser from 'rss-parser'
import Handlebars from 'handlebars'
import source from './template.js'

const parser = new Parser()
const { compile } = Handlebars
const template = compile(source)
const postsURL = 'https://xiaozhu.dev/index.xml'
const tilsURL = 'https://til.xiaozhu.dev/tils/feed.atom'

const formatDate = d => new Intl.DateTimeFormat('zh-CN').format(d).replace(/\//g, '-')

const main = async _ => {
  try {
    const [postsFeed, tilsFeed] = await Promise.all([parser.parseURL(postsURL), parser.parseURL(tilsURL)])
    const posts = postsFeed.items.slice(0, 3).map(item => {
      item.date = formatDate(new Date(item.pubDate))
      return item
    })
    const tils = tilsFeed.items.slice(0, 3).map(item => {
      item.date = formatDate(new Date(item.pubDate))
      return item
    })
    console.log(template({posts, tils}))
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

main()




