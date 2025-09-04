// src/assets/data/videotb_view.schema.ts

export interface VideoRow {
  id: string;                // identificador único estável do vídeo
  title: string;             // título do vídeo
  url: string;               // URL canônica do vídeo
  channel?: string;          // nome do canal
  publishedAt?: string;      // ISO date (ex: 2024-06-15T12:34:56Z)
  durationSeconds?: number;  // duração em segundos
  views?: number;            // contagem de visualizações
  likes?: number;            // contagem de curtidas
  tags?: string[];           // lista de tags
  thumbnailUrl?: string;     // URL do thumbnail
  // Campos adicionais do dataset continuarão sendo aceitos:
  [extra: string]: unknown;
}

export type VideoTable = VideoRow[];

// JSON Schema (Draft 2020-12) que descreve o array de vídeos
export const videoTableJsonSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://example.com/schemas/videotb_view.schema.json",
  title: "VideoTable",
  type: "array",
  items: {
    type: "object",
    additionalProperties: true,
    required: ["id", "title", "url"],
    properties: {
      id: { type: "string", minLength: 1 },
      title: { type: "string", minLength: 1 },
      url: { type: "string", format: "uri" },
      channel: { type: "string" },
      publishedAt: {
        type: "string",
        // formato ISO 8601 (permitindo 'Z' ou offset). Validadores podem variar no suporte a 'format'
        pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+\\-]\\d{2}:\\d{2})$"
      },
      durationSeconds: { type: "number", minimum: 0 },
      views: { type: "number", minimum: 0 },
      likes: { type: "number", minimum: 0 },
      tags: {
        type: "array",
        items: { type: "string" }
      },
      thumbnailUrl: { type: "string", format: "uri" }
    }
  }
} as const;

// Type guard para um item
export function isVideoRow(value: unknown): value is VideoRow {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (typeof v.id !== "string" || v.id.length === 0) return false;
  if (typeof v.title !== "string" || v.title.length === 0) return false;
  if (typeof v.url !== "string" || v.url.length === 0) return false;
  if (v.durationSeconds != null && typeof v.durationSeconds !== "number") return false;
  if (v.views != null && typeof v.views !== "number") return false;
  if (v.likes != null && typeof v.likes !== "number") return false;
  if (v.tags != null && !Array.isArray(v.tags)) return false;
  return true;
}

// Validação do array completo com erros descritivos
export function assertVideoTable(data: unknown): asserts data is VideoTable {
  if (!Array.isArray(data)) {
    throw new Error("videotb_view.json: esperado um array de objetos de vídeo.");
  }
  for (let i = 0; i < data.length; i++) {
    if (!isVideoRow(data[i])) {
      throw new Error(`videotb_view.json: item inválido na posição ${i}.`);
    }
  }
}