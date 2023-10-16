export interface IAction {
    _id?: string
    triggerId: string
    id: string
    $kind: string
    type: string
    name: string
    data?: any
    path: string[]
    configuring?: boolean
    validateStatusError?: boolean
    next?: string[]
    [key: string]: any
}