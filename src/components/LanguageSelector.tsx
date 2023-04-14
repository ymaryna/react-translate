import { Form } from 'react-bootstrap'
import { SectionType, type FromLanguage, type Language } from '../assets/types.d'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (Language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <Form.Select aria-label='Select the language' onChange={handleChange} value={value}>
        {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option>}

        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
            <option key={key} value={key}>
                {literal}
            </option>
        ))}
    </Form.Select>
  )
}
