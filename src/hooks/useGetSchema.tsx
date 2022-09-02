import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchSwaggerDocs } from "@/store/apiSpec"
import type { $Ref, EntitySchema, Schema } from '@/types/schema'

export const useGetSchema = (schemaName: string): EntitySchema | undefined => {
    const dispatch = useAppDispatch()
    const schemas: Record<string, Schema> = useAppSelector(state => state.apiSpec.components.schemas)

    useEffect(() => {
        if (!schemas || Object.keys(schemas).length === 0) {
            dispatch(fetchSwaggerDocs())
        }
    }, [schemas, dispatch])

    if (!schemaName && typeof schemaName !== 'string') return undefined

    const foundSchema = schemas[schemaName]

    // if Schema involves inheritance, merge the inheritance fields
    if (foundSchema && ('allOf' in foundSchema || '$ref' in foundSchema)) {
        const mergedFields: EntitySchema = {
            type: 'object',
            required: [],
            properties: {}
        }

        function mergeSchemaItem (schemaItem: EntitySchema) {
            mergedFields.required = [...mergedFields.required, ...schemaItem.required]
            mergedFields.properties = {
                ...mergedFields.properties,
                ...schemaItem.properties
            }
        }

        function handleSchema (schemaItem: Schema) {
            if ('type' in schemaItem) {
                mergeSchemaItem(schemaItem)
            }
            if ('$ref' in schemaItem) {
                const refName = schemaItem.$ref.slice(schemaItem.$ref.lastIndexOf('/') + 1)
                const foundInnerSchema = schemas[refName]
                handleSchema(foundInnerSchema)
            }
            if ('allOf' in schemaItem) {
                schemaItem.allOf.forEach(itm => {
                    handleSchema(itm)
                })
            }
        }

        handleSchema(foundSchema)
        return mergedFields
    }

    return foundSchema
}