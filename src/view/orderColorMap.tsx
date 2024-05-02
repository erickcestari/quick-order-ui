import { Order } from "@web/domain/order";

export const statusOrderColorMap = new Map<Order["status"], string>([
  ["Concluído", "#52c41a"],
  ["Em Progresso", "#1890ff"],
  ["Enviado", "#722ed1"],
  ["Cancelado", "#f5222d"],
  ["Pendente", "#e67935"],
]);