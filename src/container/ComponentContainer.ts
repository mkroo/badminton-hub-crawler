abstract class ComponentContainer<K, V, Q = K> {
  protected components = new Map<K, V>()

  constructor(private componentName: string) {}

  bind(key: K, component: V) {
    this.components.set(key, component)
  }

  get(query: Q): V {
    const component = this.tryGet(query)

    if (!component) {
      throw new Error(`No ${this.componentName} found for ${query}`)
    }

    return component
  }

  supports(query: Q): boolean {
    return this.tryGet(query) !== undefined
  }

  abstract tryGet(query: Q): V | undefined
}

export { ComponentContainer }