import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import './App.css'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './assets/types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const { loading, fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore()

  const debouncedFromText = useDebounce(fromText, 400)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h2>Translate with ChatGPT</h2>

      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </Stack>
        </Col>

        <Col xs='auto'>
        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}><ArrowsIcon /></Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
            </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
