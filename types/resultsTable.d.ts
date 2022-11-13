interface IResultsTableSpecification {
    home: number
    away: number
    total: number
}

export interface IResultsTable {
    played: IResultsTableSpecification
    wins: IResultsTableSpecification
    draws: IResultsTableSpecification
    loses: IResultsTableSpecification
}