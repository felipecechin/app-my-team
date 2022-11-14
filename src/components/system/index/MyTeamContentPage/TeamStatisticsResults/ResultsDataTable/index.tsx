import { IResultsTable } from '@/types/resultsTable'

interface IResultsDataTableProps {
    data: IResultsTable
}

function ResultsDataTable({ data }: IResultsDataTableProps): JSX.Element {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table
                className="w-full text-sm text-left text-gray-500 font-bold"
                data-testid='testresultsdatatable'
            >
                <thead className="text-xs text-emerald-700 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-2 sm:px-4 md:px-6" scope="col"></th>
                        <th className="py-3 px-2 sm:px-4 md:px-6" scope="col">
                            Casa
                        </th>
                        <th className="py-3 px-2 sm:px-4 md:px-6" scope="col">
                            Fora
                        </th>
                        <th className="py-3 px-2 sm:px-4 md:px-6" scope="col">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <th className="py-4 px-2 sm:px-4 md:px-6 font-medium text-emerald-900 whitespace-nowrap" scope="row">
                            Partidas
                        </th>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.played.home}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.played.away}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.played.total}
                        </td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                        <th className="py-4 px-2 sm:px-4 md:px-6 font-medium text-emerald-900 whitespace-nowrap" scope="row">
                            Vitórias
                        </th>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.wins.home}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.wins.away}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.wins.total}
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th className="py-4 px-2 sm:px-4 md:px-6 font-medium text-emerald-900 whitespace-nowrap" scope="row">
                            Empates
                        </th>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.draws.home}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.draws.away}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.draws.total}
                        </td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                        <th className="py-4 px-2 sm:px-4 md:px-6 font-medium text-emerald-900 whitespace-nowrap" scope="row">
                            Derrotas
                        </th>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.loses.home}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.loses.away}
                        </td>
                        <td className="py-4 px-2 sm:px-4 md:px-6">
                            {data.loses.total}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResultsDataTable