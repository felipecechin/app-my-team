import { IPlayer } from './player'
import { IResultsTable } from './resultsTable'

interface IGoalsPerGameTime {
    minute: string
    goals: number
}

export interface ITeamStatistics {
    players: IPlayer[]
    mostUsedFormation: string
    resultsTable: IResultsTable
    goalsPerGameTime: IGoalsPerGameTime[]
}
