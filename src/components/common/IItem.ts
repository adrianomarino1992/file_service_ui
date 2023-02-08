export interface IItem
{
    Path : string,
    Type : Type
}

export enum Type
{
    FILE = "file",
    DIRECTORY = "directory"
}