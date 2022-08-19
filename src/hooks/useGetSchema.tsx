import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchSwaggerDocs } from "@/store/apiSpec"
import type { EntitySchema } from '@/types/schema'

export const useGetSchema = (schemaName: string | any | undefined): EntitySchema | undefined => {
    const dispatch = useAppDispatch()
    const schemas = useAppSelector(state => state.apiSpec.components.schemas)

    useEffect(() => {
        if (!schemas || Object.keys(schemas).length === 0) {
            dispatch(fetchSwaggerDocs())
        }
    }, [schemas, dispatch])

    if (!schemaName && typeof schemaName !== 'string') return undefined
    const transformedSchemaName = schemaName.replace(/./, schemaName[0].toUpperCase())
    return (schemas as Record<string, EntitySchema>)[transformedSchemaName]
}