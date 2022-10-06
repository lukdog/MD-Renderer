import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Classnames from 'classnames'
import {DebounceInput} from 'react-debounce-input';
import metadataParser from 'markdown-yaml-metadata-parser'
import remarkGfm from 'remark-gfm'

import './App.scss'
import '~github-md-css/github-markdown.css'

const isUrl = (url: string) => {
  let parsed: URL;
  
  try {
    parsed = new URL(url);
  } catch (_) {
    return false;  
  }

  return parsed.protocol === "http:" || parsed.protocol === "https:";
}

function App() {
  const [metadata, setMetadata] = useState({})
  const [text, setText] = useState('')
  const [baseUrl, setBaseUrl] = useState('')

  const OnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (isUrl(value)) {
      setBaseUrl(value.split('/').slice(0, -1).join('/'))
      fetch(value, { method: 'GET',}).then((response) => {
        if(response.ok) {
          return response.text() 
        } 
        throw new Error('Network response was not ok.');
      }).then((text) => {
        const { metadata, content } = metadataParser(text)
        setText(content)
        setMetadata(metadata)
      }).catch((error) => setText(error.message))
    }

  }

  const trasformImageUrl = (src: string, alt: string | null , title: string | null) => {
    return `${baseUrl}/${src}`
  }

  return (
    <div className="App">
      <DebounceInput type="text" debounceTImeout={500} onChange={OnTextChange}/>
      <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} transformImageUri={trasformImageUrl} className={Classnames('markdown-body')}/>
    </div>
  )
}

export default App
