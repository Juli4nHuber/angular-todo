export interface todoModel {
    id: number,
    title: string | null,
    isCompleted: boolean,
    isEditing: boolean
}

export type filterType = 'all' | 'active' | 'completed';