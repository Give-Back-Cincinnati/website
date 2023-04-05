import { EntitySchema } from '@/types/schema'
import { Experience, ComponentMap } from './Display'

export const useConvertToSchemaHook = (): (experience: Experience) => EntitySchema & { componentName: string } => {
  return ({ component: componentName, props }: Experience) => {
    const schema: EntitySchema & { componentName: string } = {
      componentName,
      type: 'object',
      required: [],
      properties: {}
    }
  
    const { availableFields } = ComponentMap[componentName]

    Object.entries(availableFields).forEach(([key, value]) => {
      schema.properties ??= {}
      switch (value.type) {
        case 'array':
          const { type, ...shape } = value.shape

          if (!type) {
            // if no type, this is an object -> insert the shape in properties
            schema.properties[key] = {
              type: value.type,
              items: {
                type: type,
                required: [],
                properties: shape
              }
            }
          } else {
            // if type exists, this is an array of simple types
            schema.type = 'array'
            schema.properties[key] = {
              type: value.type,
              items: {
                type: type,
                required: [],
                properties: {
                  [key]: {
                    type
                  }
                }
              }
            }
          }


          break;
        default:
          schema.properties[key] = value
      }
    })
  
    return schema
  }
}

export default useConvertToSchemaHook