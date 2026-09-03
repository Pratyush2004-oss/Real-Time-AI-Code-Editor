export type ProjectType = {
    _id: string,
    name: string,
    description: string,
    starred: boolean,
    lastOpenedAt: Date,
    owner: string,
    createdAt: Date,
    updatedAt: Date
}

export type ProjectResponseType = {
    project: ProjectType | ProjectType[],
    message: string
}