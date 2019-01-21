// get the '2D' context of the canvas 'chart'
var chart = document.getElementById("chart");

var chartOptions = {
    title: {
        display: true,
        text: 'Trends in Dutch Car Colors',
        fontSize: 36
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Cars Sold (by the thousands)',
                fontSize: 28
            }

        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Year',
                fontSize: 28
            }

        }]
    }
};

var chartData = {
    labels: [1900, 1920, 1940, 1960, 1980, 2000, 2020],
    datasets: [
        {
            label: 'black',
            borderColor: '#000000',
            fill: false,
            data: [4000, 10000, 50000, 55000, 65000, 80000, 85000],
        },
        {
            label: 'yellow',
            borderColor: '#f1c40f',
            showLine: 'true',
            fill: false,
            data: [20, 50000, 40000, 45000, 50000, 30000, 40000],
        },
        {
            label: 'brown',
            borderColor: '#A52A2A',
            showLine: true,
            fill: false,

            data: [1000, 5000, 10000, 25000, 45000, 30000, 35000],
        },
        {
            label: 'red',
            borderColor: '#e74c3c',
            showLine: 'true',
            fill: false,
            data: [2500, 7000, 5000, 20000, 35000, 45000, 68000],
        },
        {
            label: 'blue',
            borderColor: '#0984e3',
            showLine: 'true',
            fill: false,
            data: [5000, 10000, 20000, 40000, 80000, 70000, 60000],
        },
        {
            label: 'green',
            borderColor: '#00b894',
            showLine: 'true',
            fill: false,
            data: [3000, 5000, 7000, 15000, 20000, 45000, 30000],
        },
        {
            label: 'white',
            borderColor: '#f5f6fa',
            showLine: 'true',
            fill: false,
            data: [1000, 5000, 9000, 35000, 55000, 70000, 90000],
        },
        {
            label: 'gray',
            borderColor: '#718093',
            showLine: 'true',
            fill: false,
            data: [2000, 8000, 20000, 35000, 45000, 58000, 75000],
        },
        {
            label: 'beige',
            borderColor: '#f5f5dc',
            showLine: 'true',
            fill: false,
            data: [3000, 5000, 10000, 15000, 20000, 10000, 30000],
        },
        {
            label: 'orange',
            borderColor: '#ffa502',
            showLine: 'true',
            fill: false,
            data: [4000, 10000, 20000, 15000, 12000, 13000, 20000],
        },
        {
            label: 'creme',
            borderColor: '#fffdd0',
            showLine: 'true',
            fill: false,
            data: [4500, 8000, 15000, 20000, 30000, 25000, 35000],
        },
        {
            label: 'purple',
            borderColor: '#9400D3',
            showLine: 'true',
            fill: false,
            data: [6000, 8000, 10000, 15000, 12000, 25000, 35000],
        },
        { //good
            label: 'pink',
            borderColor: '#FF69B4',
            showLine: 'true',
            fill: false,
            data: [200, 1000, 2000, 4000, 3000, 2500, 2000],
        }



    ]
}

Chart.defaults.global.elements.point.radius = 5;
Chart.defaults.global.elements.point.hoverRadius = 10;


var dataChart = new Chart(chart, {
    type: 'line',
    data: chartData,
    options: chartOptions,
})