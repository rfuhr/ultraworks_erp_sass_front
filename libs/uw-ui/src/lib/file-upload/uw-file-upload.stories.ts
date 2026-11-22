import type { Meta, StoryObj } from '@storybook/angular';
import { UwFileUploadComponent } from './uw-file-upload.component';

const meta: Meta<UwFileUploadComponent> = {
  title: 'UW-UI/Form/FileUpload',
  component: UwFileUploadComponent,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text', description: 'Tipos de arquivo aceitos' },
    maxSize: { control: 'number', description: 'Tamanho máximo em bytes' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
    hint: { control: 'text', description: 'Texto de ajuda' },
  },
};

export default meta;
type Story = StoryObj<UwFileUploadComponent>;

export const Default: Story = {
  args: {
    accept: 'image/png,image/jpeg,image/webp,application/pdf',
    maxSize: 10 * 1024 * 1024,
    disabled: false,
    hint: 'PNG, JPG, WebP ou PDF • Máx 10MB',
  },
};

export const ImagesOnly: Story = {
  args: {
    accept: 'image/png,image/jpeg,image/webp',
    maxSize: 5 * 1024 * 1024,
    disabled: false,
    hint: 'PNG, JPG ou WebP • Máx 5MB',
  },
};

export const DocumentsOnly: Story = {
  args: {
    accept: 'application/pdf,.doc,.docx',
    maxSize: 20 * 1024 * 1024,
    disabled: false,
    hint: 'PDF, DOC ou DOCX • Máx 20MB',
  },
};

export const SmallMaxSize: Story = {
  args: {
    accept: 'image/png,image/jpeg',
    maxSize: 2 * 1024 * 1024,
    disabled: false,
    hint: 'PNG ou JPG • Máx 2MB',
  },
};

export const LargeMaxSize: Story = {
  args: {
    accept: 'application/pdf',
    maxSize: 50 * 1024 * 1024,
    disabled: false,
    hint: 'PDF • Máx 50MB',
  },
};

export const Disabled: Story = {
  args: {
    accept: 'image/png,image/jpeg,application/pdf',
    maxSize: 10 * 1024 * 1024,
    disabled: true,
    hint: 'PNG, JPG ou PDF • Máx 10MB',
  },
};

export const CustomHint: Story = {
  args: {
    accept: 'image/*',
    maxSize: 10 * 1024 * 1024,
    disabled: false,
    hint: 'Qualquer formato de imagem • Máx 10MB',
  },
};
