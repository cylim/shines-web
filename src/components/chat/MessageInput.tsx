import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'

type MessageInputProps = {
  onSend: (msg: string) => Promise<void>
  scrollRef: () => void
}

const MessageInput = ({ onSend, scrollRef }: MessageInputProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if(!message) { return }
    await onSend(message)
    setMessage('')
    setTimeout(() => scrollRef(), 100)
  }

  return (
    <div className={'pt-2 w-[100%]'}>
      <div className={'flex flex-row'}>
        <Input
          type="text"
          label={'Message'}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
        />
        <Button onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default MessageInput
