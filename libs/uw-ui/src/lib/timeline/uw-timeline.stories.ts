import type { Meta, StoryObj } from '@storybook/angular';
import { UwTimelineComponent } from './uw-timeline.component';
import { UwTimelineItemComponent } from './uw-timeline-item.component';

const meta: Meta<UwTimelineComponent> = {
  title: 'UW-UI/Data/Timeline',
  component: UwTimelineComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['linear', 'alternate'],
      description: 'Modo de exibição da linha do tempo',
    },
  },
};

export default meta;
type Story = StoryObj<UwTimelineComponent>;

export const Linear: Story = {
  args: { mode: 'linear' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [UwTimelineItemComponent] },
    template: `
      <uw-timeline [mode]="mode">
        <uw-timeline-item
          title="Pedido realizado"
          description="Seu pedido foi recebido com sucesso."
          timestamp="01/01/2024 10:30"
          icon="receipt_long"
          color="#6c47ff"
        ></uw-timeline-item>
        <uw-timeline-item
          title="Pagamento aprovado"
          description="Pagamento processado e aprovado."
          timestamp="01/01/2024 10:35"
          icon="check_circle"
          color="#10b981"
        ></uw-timeline-item>
      </uw-timeline>
    `,
  }),
};

export const WithProjectedActions: Story = {
  args: { mode: 'linear' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [UwTimelineItemComponent] },
    template: `
      <uw-timeline [mode]="mode">
        <uw-timeline-item
          title="Documentação enviada"
          description="documento.pdf · 840 KB"
          timestamp="10/09/2026 09:15"
          icon="hourglass_top"
          color="#3b82f6"
        >
          <div style="display:flex;gap:8px;margin-top:8px">
            <button type="button">Visualizar</button>
            <button type="button">Baixar</button>
          </div>
        </uw-timeline-item>
        <uw-timeline-item
          title="Documentação enviada"
          description="comprovante-matricula.pdf · 1.8 MB"
          timestamp="12/09/2026 14:32"
          icon="cancel"
          color="#e53e3e"
        >
          <button type="button">Visualizar</button>
        </uw-timeline-item>
      </uw-timeline>
    `,
  }),
};

export const Alternate: Story = {
  args: { mode: 'alternate' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [UwTimelineItemComponent] },
    template: `
      <uw-timeline [mode]="mode">
        <uw-timeline-item title="Etapa 1" timestamp="Janeiro 2024" icon="looks_one"></uw-timeline-item>
        <uw-timeline-item title="Etapa 2" timestamp="Fevereiro 2024" icon="looks_two"></uw-timeline-item>
        <uw-timeline-item title="Etapa 3" timestamp="Março 2024" icon="looks_3"></uw-timeline-item>
      </uw-timeline>
    `,
  }),
};
