import DOMPurify from 'dompurify'

export const sanitizeHTML = (html: string): string => {
    if (!html || typeof html !== 'string') {
        return ''
    }
    
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'b', 'i'],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
        FORBID_TAGS: ['img', 'script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
        FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'src', 'href']
    })
}