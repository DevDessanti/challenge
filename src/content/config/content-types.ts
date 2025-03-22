export const CONTENT_TYPES = {
  // Vídeo
  'video/mp4': { format: 'mp4', is_embeddable: true, allow_download: true },
  'video/webm': { format: 'webm', is_embeddable: true, allow_download: true },
  'video/ogg': { format: 'ogg', is_embeddable: true, allow_download: true },

  // Imagem
  'image/jpeg': { format: 'jpg', is_embeddable: true, allow_download: false },
  'image/png': { format: 'png', is_embeddable: true, allow_download: false },
  'image/gif': { format: 'gif', is_embeddable: true, allow_download: false },
  'image/webp': { format: 'webp', is_embeddable: true, allow_download: false },

  // Áudio
  'audio/mpeg': { format: 'mp3', is_embeddable: true, allow_download: true },
  'audio/wav': { format: 'wav', is_embeddable: true, allow_download: true },

  // Documentos
  'application/pdf': { format: 'pdf', is_embeddable: false, allow_download: true },
  'application/msword': { format: 'doc', is_embeddable: false, allow_download: true },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    format: 'docx',
    is_embeddable: false,
    allow_download: true,
  },
  'application/vnd.ms-excel': { format: 'xls', is_embeddable: false, allow_download: true },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    format: 'xlsx',
    is_embeddable: false,
    allow_download: true,
  },

  // Texto
  'text/plain': { format: 'txt', is_embeddable: false, allow_download: true },
  'text/markdown': { format: 'md', is_embeddable: false, allow_download: true },
  'text/html': { format: 'html', is_embeddable: false, allow_download: true },
} as const

export const SUPPORTED_MIME_TYPES = Object.keys(CONTENT_TYPES)
