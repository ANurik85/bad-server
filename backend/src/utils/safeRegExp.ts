import escapeRegExp from './escapeRegExp'

interface SafeRegExpOptions {
    timeout?: number
    flags?: string
    maxLength?: number
}

function executeWithTimeout<T>(fn: () => T, timeout: number): T {
    const start = Date.now()
    const result = fn()
    const elapsed = Date.now() - start
    
    if (elapsed > timeout) {
        throw new Error('Операция поиска превысила максимальное время выполнения')
    }
    
    return result
}

export function createSafeRegExp(
    pattern: string, 
    options: SafeRegExpOptions = {}
): RegExp {
    const { timeout = 1000, flags = 'i', maxLength = 100 } = options
    
    if (pattern.length > maxLength) {
        throw new Error('Поисковая строка слишком длинная')
    }
    
    const escapedPattern = escapeRegExp(pattern)
    
    const regex = new RegExp(escapedPattern, flags)
    
    return new Proxy(regex, {
    get(target, prop) {
        if (prop === 'test' || prop === 'exec') {
            return function(str: string) {
                if (prop in target && typeof target[prop] === 'function') {
                    return executeWithTimeout(
                        () => (target[prop as keyof RegExp] as (str: string) => boolean)(str),
                        timeout
                    )
                } 
                    throw new Error(`Метод ${prop} не найден`);
                
            }
        }
        return target[prop as keyof RegExp]
    }
})
}

export default createSafeRegExp
