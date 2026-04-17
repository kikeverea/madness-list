import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './Input.tsx'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Type here',
    'aria-label': 'Example input',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: 'Jerry',
  },
}

export const WithLabel: Story = {
  args: {
    defaultValue: 'Jerry',
    label: 'Test label'
  },
}

export const WithError: Story = {
  args: {
    'error': 'Test error',
  },
}

const colors = ['primary', 'success', 'warning', 'danger', 'info'] as const

export const TypeSubmit: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      {colors.map((color) => (
        <Input
          key={`${color}`}
          type='submit'
          value={color}
          color={color}
        />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled input',
  },
}