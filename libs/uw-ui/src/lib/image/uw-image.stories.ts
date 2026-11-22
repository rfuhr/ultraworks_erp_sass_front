import type { Meta, StoryObj } from '@storybook/angular';
import { UwImageComponent } from './uw-image.component';

const meta: Meta<UwImageComponent> = {
  title: 'UW-UI/Data/Image',
  component: UwImageComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'URL da imagem' },
    alt: { control: 'text', description: 'Texto alternativo' },
    fallbackUrl: { control: 'text', description: 'URL de fallback' },
    lazy: { control: 'boolean', description: 'Carregamento lazy' },
    objectFit: { control: 'radio', options: ['cover', 'contain', 'fill', 'none', 'scale-down'], description: 'Modo de ajuste da imagem' },
    width: { control: 'text', description: 'Largura' },
    height: { control: 'text', description: 'Altura' },
    borderRadius: { control: 'text', description: 'Border radius' },
  },
};

export default meta;
type Story = StoryObj<UwImageComponent>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Imagem de exemplo',
    lazy: true,
    objectFit: 'cover',
    width: '400px',
    height: '300px',
  },
};

export const Contain: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Imagem com contain',
    lazy: true,
    objectFit: 'contain',
    width: '400px',
    height: '300px',
  },
};

export const Fill: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Imagem com fill',
    lazy: true,
    objectFit: 'fill',
    width: '400px',
    height: '300px',
  },
};

export const WithBorderRadius: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Imagem com bordas arredondadas',
    lazy: true,
    objectFit: 'cover',
    width: '400px',
    height: '300px',
    borderRadius: '16px',
  },
};

export const Circular: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Imagem circular',
    lazy: true,
    objectFit: 'cover',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
  },
};

export const Small: Story = {
  args: {
    src: 'https://picsum.photos/150/150',
    alt: 'Imagem pequena',
    lazy: true,
    objectFit: 'cover',
    width: '150px',
    height: '150px',
    borderRadius: '8px',
  },
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Imagem grande',
    lazy: true,
    objectFit: 'cover',
    width: '800px',
    height: '600px',
    borderRadius: '12px',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallbackUrl: 'https://picsum.photos/400/300',
    alt: 'Imagem com fallback',
    lazy: true,
    objectFit: 'cover',
    width: '400px',
    height: '300px',
  },
};

export const NoLazy: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Imagem sem lazy loading',
    lazy: false,
    objectFit: 'cover',
    width: '400px',
    height: '300px',
  },
};

export const Portrait: Story = {
  args: {
    src: 'https://picsum.photos/300/400',
    alt: 'Imagem retrato',
    lazy: true,
    objectFit: 'cover',
    width: '300px',
    height: '400px',
    borderRadius: '12px',
  },
};

export const Gallery: Story = {
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Galeria de imagens',
    lazy: true,
    objectFit: 'cover',
    width: '300px',
    height: '200px',
    borderRadius: '8px',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-3 gap-4">
        <uw-image src="https://picsum.photos/300/200?random=1" alt="Imagem 1" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
        <uw-image src="https://picsum.photos/300/200?random=2" alt="Imagem 2" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
        <uw-image src="https://picsum.photos/300/200?random=3" alt="Imagem 3" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
        <uw-image src="https://picsum.photos/300/200?random=4" alt="Imagem 4" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
        <uw-image src="https://picsum.photos/300/200?random=5" alt="Imagem 5" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
        <uw-image src="https://picsum.photos/300/200?random=6" alt="Imagem 6" width="300px" height="200px" borderRadius="8px" objectFit="cover" />
      </div>
    `,
  }),
};
