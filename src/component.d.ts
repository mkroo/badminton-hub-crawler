interface UrlFrontier extends Iterable<URL> {
  
}

interface Fetcher {
  fetch(url: URL): Promise<string>
}

interface Parser<T> {
  parse(html: string): T[]
}

interface Storage<T> {
  save(data: T[]): Promise<void>
}

export { UrlFrontier, Fetcher, Parser, Storage }
