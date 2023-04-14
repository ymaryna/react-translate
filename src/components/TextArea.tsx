import { Form } from 'react-bootstrap'
import { SectionType } from '../assets/types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Translate'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#1d1e1f' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
        autoFocus={type === SectionType.From}
        as="textarea"
        disabled={type === SectionType.To}
        placeholder={getPlaceHolder({ type, loading })}
        style={styles}
        value={value}
        onChange={handleChange}
    />
  )
}
