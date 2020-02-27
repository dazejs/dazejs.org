import { useState, useEffect } from 'react';

export function useMarkdown (version: string, name: string) {
  const [data, setData] = useState('');
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getMarkdown = async () => {
      try {
        const data = (await import(`@docs/zh/${version}/${name}.md`)).default
        setData(data)
      } catch (err) {
        console.error(err)
        setIsError(true)
      }
    }
    getMarkdown()
  })

  return { isError, data }
}