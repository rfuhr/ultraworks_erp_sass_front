import type { Meta, StoryObj } from '@storybook/angular';
import { UwProgressTrackComponent, type UwProgressStep } from './uw-progress-track.component';

const meta: Meta<UwProgressTrackComponent> = {
  title: 'UW-UI/Data/ProgressTrack',
  component: UwProgressTrackComponent,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text', description: 'Rótulo acessível da trilha' },
  },
};

export default meta;
type Story = StoryObj<UwProgressTrackComponent>;

const emAndamento: UwProgressStep[] = [
  { label: 'Submetido', state: 'done' },
  { label: 'Avaliação', state: 'current' },
  { label: 'Revisão', state: 'pending' },
  { label: 'Desfecho', state: 'pending' },
];

const semRevisao: UwProgressStep[] = [
  { label: 'Submetido', state: 'done' },
  { label: 'Avaliação', state: 'done' },
  { label: 'Revisão', state: 'disabled', hint: 'não solicitada' },
  { label: 'Aprovado', state: 'done' },
];

const reprovado: UwProgressStep[] = [
  { label: 'Submetido', state: 'done' },
  { label: 'Avaliação', state: 'done' },
  { label: 'Revisão', state: 'disabled', hint: 'não solicitada' },
  { label: 'Reprovado', state: 'done', tone: 'error' },
];

export const EmAndamento: Story = {
  args: {
    steps: emAndamento,
    ariaLabel: 'Progresso: submetido, avaliação em andamento',
  },
};

export const ComEtapaDesabilitada: Story = {
  args: {
    steps: semRevisao,
    ariaLabel: 'Progresso: submetido, avaliação, revisão não utilizada, aprovado',
  },
};

export const Reprovado: Story = {
  args: {
    steps: reprovado,
    ariaLabel: 'Progresso: submetido, avaliação, revisão não utilizada, reprovado',
  },
};

export const DesfechoPendente: Story = {
  args: {
    steps: [
      { label: 'Submetido', state: 'done' },
      { label: 'Avaliação', state: 'done' },
      { label: 'Revisão', state: 'current' },
      { label: 'Desfecho', state: 'pending' },
    ],
  },
};

export const PendenteAntesDaAvaliacao: Story = {
  args: {
    steps: [
      { label: 'Submetido', state: 'done' },
      { label: 'Avaliação', state: 'disabled', hint: 'aguardando' },
      { label: 'Revisão', state: 'disabled' },
      { label: 'Desfecho', state: 'pending' },
    ],
  },
};
