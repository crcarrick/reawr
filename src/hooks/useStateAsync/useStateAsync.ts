import { useEffect, useLayoutEffect, useState } from 'react'
import type { DependencyList, Dispatch, SetStateAction } from 'react'

interface IAsyncValueCallback<T> {
  (): Promise<T>
}

export function useStateAsync<T>(
  callback: IAsyncValueCallback<T>,
  defaultValue: T,
  dependencies: DependencyList
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    callback().then(setValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return [value, setValue]
}
