import type { Meta, StoryObj } from '@storybook/react-vite'
import Form from './Form.tsx'

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    action: '#',
    inputs: [
      { name: 'name'},
      { name: 'lastname'},
      { value: 'Submit', type: 'submit', className: 'w-full rounded rounded-md mt-2' },
    ],
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}