interface UrlFrontier extends Iterable<URL> {
  
}

interface Fetcher {
  fetch(url: URL): Promise<string>
}

interface Parser<T> {
  parse(html: string): T[]
}

export { UrlFrontier, Fetcher, Parser }
