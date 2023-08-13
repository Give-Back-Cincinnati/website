import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSwaggerDocs } from "@/store/apiSpec";
import type { $Ref, EntityEnum, EntitySchema, Schema } from "@/types/schema";

function ReplaceEnumRefs(
  schemas: Record<string, Schema>,
  schemaName: string
): Schema {
  const foundSchema = schemas[schemaName];
  // if properties exist, make sure to replace any $Refs with their value
  if (foundSchema && "properties" in foundSchema) {
    const mergedFields: Schema = {
      type: foundSchema.type,
      required: [...foundSchema.required],
      properties: {
        ...foundSchema.properties,
      },
    };

    Object.entries(foundSchema.properties).forEach(([key, value]) => {
      if ("schema" in value && value.schema) {
        const ref = value.schema["$ref"];
        const refName = ref.slice(ref.lastIndexOf("/") + 1);

        if (
          schemas[refName] &&
          "enum" in schemas[refName] &&
          "type" in schemas[refName]
        ) {
          const foundEnum = schemas[refName] as EntityEnum;

          mergedFields.properties[key] = {
            type: foundEnum.type,
            enum: foundEnum.enum,
          };
        }
      }
    });
    return mergedFields;
  }
  return foundSchema;
}

function InheritEntities(
  foundSchema: Schema,
  schemas: Record<string, Schema>
): EntitySchema {
  if (foundSchema && ("allOf" in foundSchema || "$ref" in foundSchema)) {
    const mergedFields: EntitySchema = {
      type: "object",
      required: [],
      properties: {},
    };

    function mergeSchemaItem(schemaItem: EntitySchema) {
      mergedFields.required = [
        ...mergedFields.required,
        ...schemaItem.required,
      ];
      mergedFields.properties = {
        ...mergedFields.properties,
        ...schemaItem.properties,
      };
    }

    function handleSchema(schemaItem: Schema) {
      if ("type" in schemaItem && "required" in schemaItem) {
        mergeSchemaItem(schemaItem);
      }
      if ("$ref" in schemaItem) {
        const refName = schemaItem.$ref.slice(
          schemaItem.$ref.lastIndexOf("/") + 1
        );
        const foundInnerSchema = schemas[refName];
        handleSchema(foundInnerSchema);
      }
      if ("allOf" in schemaItem) {
        schemaItem.allOf.forEach((itm) => {
          handleSchema(itm);
        });
      }
    }

    handleSchema(foundSchema);
    return mergedFields;
  }
  return foundSchema as EntitySchema;
}

export const useGetSchema = (schemaName: string): EntitySchema | undefined => {
  const dispatch = useAppDispatch();
  const schemas: Record<string, Schema> = useAppSelector(
    (state) => state.apiSpec.components.schemas
  );

  useEffect(() => {
    if (!schemas || Object.keys(schemas).length === 0) {
      dispatch(fetchSwaggerDocs());
    }
  }, [schemas, dispatch]);

  if (!schemaName && typeof schemaName !== "string") return undefined;

  // if there is an enum $ref in the property, replace it with its value
  let foundSchema = ReplaceEnumRefs(schemas, schemaName);

  // if Schema involves inheritance, merge the inheritance fields
  foundSchema = InheritEntities(foundSchema, schemas);

  return foundSchema;
};
