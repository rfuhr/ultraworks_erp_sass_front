export type DocViewerStatus = 'ok' | 'rejeitado' | 'pendente';

export interface DocViewerDocument {
  id: string;
  tipo: string;
  nome: string;
  tamanho: string;
  dataEnvio: string;
  url: string;
  status: DocViewerStatus | null;
  observacao: string;
}
