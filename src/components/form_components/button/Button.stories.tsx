import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Button',
    styleType: 'primary',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const colors = ['primary', 'success', 'warning', 'danger', 'info'] as const

export const AllButtons: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <h3 className='py-4'>Primary</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <Button
              key={`primary-${color}`}
              label={color}
              styleType="primary"
              color={color}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className='py-4'>Secondary</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <Button
              key={`secondary-${color}`}
              label={color}
              styleType="secondary"
              color={color}
            />
          ))}
        </div>
      </div>
    </div>
  ),
}