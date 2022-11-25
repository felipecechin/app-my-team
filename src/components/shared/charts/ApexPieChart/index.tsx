/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import Chart from 'react-apexcharts'

interface IApexPieChartProps {
    responsiveWidth: string[]
    responsiveHeight: string[]
    responsiveLegendPosition: string[]
    seriesKey: string
    labelsKey: string
    data: { [key: string]: any }[]
    width: string
    height?: string
}

function ApexPieChart({
    responsiveWidth,
    responsiveHeight,
    responsiveLegendPosition,
    seriesKey,
    labelsKey,
    data,
    height,
    width,
}: IApexPieChartProps): JSX.Element {
    const [series, setSeries] = useState<ApexAxisChartSeries>([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        const series = data.map((item) => item[seriesKey])
        const labels = data.map((item) => item[labelsKey])
        const breakpoints = [640, 768, 1024, 1280]
        const responsiveOptions = breakpoints.map((item, index) => {
            return {
                breakpoint: item,
                options: {
                    chart: {
                        width:
                            responsiveWidth && responsiveWidth[index]
                                ? responsiveWidth[index]
                                : 'auto',
                        height:
                            responsiveHeight && responsiveHeight[index]
                                ? responsiveHeight[index]
                                : 'auto',
                    },
                    legend: {
                        position:
                            responsiveLegendPosition &&
                            responsiveLegendPosition[index]
                                ? responsiveLegendPosition[index]
                                : 'bottom',
                    },
                },
            }
        })
        setSeries(series)
        const options = {
            labels: [...labels],
            responsive: [...responsiveOptions],
            legend: {
                position: 'bottom',
            },
        }
        setOptions(options)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <Chart
            height={height || 'auto'}
            options={options}
            series={series}
            type='pie'
            width={width || '100%'}
        />
    )
}

export default ApexPieChart
