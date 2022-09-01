import { Services, IServices } from 'services'

export const useServices = <T extends string>(serviceName: T): IServices<T> => {
    if (!Services[serviceName]) throw new Error(`No service available with key: ${serviceName}`)
    
    return Services[serviceName] as IServices<T>
}