import { Permissions } from "@/store/api/openApi"
import { useAppSelector } from "@/store/hooks"

export const useUserHasPermission = (permissionName: string): boolean => {
    const permissions: Record<string, Permissions> = useAppSelector(state => state.myPermissions.myPermissions)

    return permissions[permissionName] !== undefined
}