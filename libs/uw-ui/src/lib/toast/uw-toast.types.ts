export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastConfig { duration?: number; persistent?: boolean; action?: { label: string; callback: () => void }; }
export interface ToastItem { id: string; message: string; type: ToastType; duration: number; persistent: boolean; createdAt: number; }
