export const sanitizeHTML = (html: string): string => {
    if (!html || typeof html !== 'string') {
        return ''
    }
    
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
}

export const normalizeLimit = (limit: any, defaultLimit = 10, maxLimit = 10): number => {
    const numLimit = Number(limit)
    if (Number.isNaN(numLimit) || numLimit <= 0) {
        return defaultLimit
    }
    return Math.min(numLimit, maxLimit)
}

export const validateStatus = (status: any): string | undefined => {
    if (typeof status === 'string') {
        return status
    }
    return undefined
}
