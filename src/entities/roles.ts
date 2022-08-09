import { IPermission } from "./permission"
import { IFilter } from "./filter"

export interface IRoles {
    _id: string,
    name: string,
    permissions:  IPermission[],
    filters: IFilter[],
}