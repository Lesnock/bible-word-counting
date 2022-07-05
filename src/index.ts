import puppeteer, { Page } from 'puppeteer'

const BASE_URL = 'https://bibliaonline.com.br'
const BIBLE_VERSION = 'acf'
const BOOK_LINK_SELECTOR = '.jss3 .jss29'
const CHAPTER_LINK_SELECTOR = '.jss1 .jss24'
const TEXT_SELECTOR = '.jss40'
const WORD_FOR_SEARCH = 'Deus'

start()

async function start() {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()

  page.setViewport({
    width: 800,
    height: 600
  })

  await page.goto(`${BASE_URL}/${BIBLE_VERSION}/index`, { timeout: 0 })

  let booksHref = await collectBooksHrefs(page)

  let count = 0

  for (const bookHref of booksHref) {
    await page.goto(bookHref, { timeout: 0 })

    const chaptersHrefs = await collectChaptersHrefs(page)
    console.log(`Collecting chapter from href: ${bookHref} - Chapter Qt: ${chaptersHrefs.length}`)

    for (const chapterHref of chaptersHrefs) {
      await page.goto(chapterHref, { timeout: 0 })
      const text = await getChapterText(page)
      console.log(`Collecting text of chapter: ${chapterHref}`)
      if (text) {
        const find = text.match(new RegExp(`${WORD_FOR_SEARCH}`, 'ig')) || []
        count += find.length
        console.log(`Found word ${WORD_FOR_SEARCH}: ${find.length} times`)
      }
    }
  }

  console.log('=================================================')
  console.log(`!!! Found word ${WORD_FOR_SEARCH}: ${count} times in the whole Bible !!!`)
}

async function collectBooksHrefs(page: Page) {
  return page.evaluate((BOOK_LINK_SELECTOR: string) => {
    const books = document.querySelectorAll(BOOK_LINK_SELECTOR)
    return Array.from(books).map(book => book.getAttribute('href') || '')
  }, BOOK_LINK_SELECTOR)
}

async function collectChaptersHrefs(page: Page) {
  return page.evaluate((CHAPTER_LINK_SELECTOR: string) => {
    const chapters = document.querySelectorAll(CHAPTER_LINK_SELECTOR)
    return Array.from(chapters).map(chapter => chapter.getAttribute('href') || '')
  }, CHAPTER_LINK_SELECTOR)
}

async function getChapterText(page: Page) {
  return page.evaluate((TEXT_SELECTOR) => {
    const textNode: HTMLElement | null = document.querySelector(TEXT_SELECTOR)
    return textNode!.innerText
  }, TEXT_SELECTOR)
}
