function ParallelPoints() {
    var self = this;
    self.init();
}


ParallelPoints.prototype.init = function () {

    var self = this;

    self.margin = { top: 10, right: 80, bottom: 30, left: 80 };

    var parallelPointsChart = d3.select("#chart");
    self.svgBounds = parallelPointsChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 500;


    //creates svg element within the div
    self.svg = parallelPointsChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)
    // .style("padding-top", "100")




    d3.json('data/data.json', function (error, data) {
        var metrics = ["total_words", "total_sentences", "total_syllables", "common_words"];

        var totalWords = []
        var totalSentences = []
        var totalSyllables = []
        var commonWords = []
        data.forEach(function (d) {
            totalWords.push(d.total_words)
            totalSentences.push(d.sentence_count)
            totalSyllables.push(d.syllable_count)
            commonWords.push(d.common_percentage)
        });




        // self.svg.selectAll("p").data(data).enter().append("p").text(function (d) {
        //     console.log(d)
        // });

        // Create an axis scale. Each "tick" on the X-Axis should represent a y-axis (total words, total sentences, total syllables, % of common words)
        var xScale = d3.scaleLinear().domain([0, 3]).range([0, self.svgWidth - 100]);

        var totalWordScale = d3.scaleLinear().domain([Math.max(...totalWords), Math.min(...totalWords)]).range([0, 400]);
        var sentencesScale = d3.scaleLinear().domain([Math.max(...totalSentences), Math.min(...totalSentences)]).range([0, 400]);
        var syllableScale = d3.scaleLinear().domain([100 + Math.max(...totalSyllables), Math.min(...totalSyllables) - 100]).range([0, 400]);
        var commonScale = d3.scaleLinear().domain([Math.max(...commonWords), Math.min(...commonWords)]).range([0, 400]);


        //Define line generator
        var lineGenerator = d3.line()
            .x(function (d, i) { return xScale(d.index); })
            .y(function (d, i) {
                if (d.index == 0) {
                    // console.log(totalWordScale(d.total_words))
                    return parseInt(totalWordScale(d.total_words))
                    // return xScale(d.index);
                }
                else if (d.index == 1) {
                    // console.log(sentencesScale(d.sentence_count))
                    return parseInt(sentencesScale(d.sentence_count))
                    // return xScale(d.index);
                }
                else if (d.index == 2) {
                    // console.log(syllableScale(d.totalSyllables))
                    return parseInt(syllableScale(d.total_syllables))
                    // return xScale(d.index);
                }
                else { // i==3
                    // console.log(commonScale(d.common_words))

                    return parseInt(commonScale(d.common_words))
                    // return xScale(d.index);
                }
            });


        // var thing = [{ total_words: 1711, index: 0 }, { sentence_count: 39, index: 1 }, { total_syllables: 1608, index: 2 }, { common_words: 0.84, index: 3 }]

        // self.svg.append("path").datum(thing).attr('d', lineGenerator).attr("fill", "none").attr('stroke', 'green').attr('stroke-width', '4').on("mouseover", function (d) {
        //     console.log("working")
        //     console.log(d)
        // })

        data.forEach(function (obj) {
            var arr = []
            for (var property in obj) {
                switch (property) {
                    case "total_words":
                        var a = {
                            total_words: obj.total_words,
                            index: 0
                        }
                        arr.push(a)
                        break;
                    case "sentence_count":
                        var a = {
                            sentence_count: obj.sentence_count,
                            index: 1
                        }
                        arr.push(a)
                        break;
                    case "syllable_count":
                        var a = {
                            total_syllables: obj.syllable_count,
                            index: 2
                        }
                        arr.push(a)
                        break;
                    case "common_percentage":
                        var a = {
                            common_words: obj.common_percentage,
                            index: 3
                        }
                        arr.push(a)
                        break;
                }
            }

            self.svg.append("path").datum(arr).attr("d", lineGenerator).attr("fill", "none").attr('stroke', 'green').attr('stroke-width', '3').on("click", function (d) {
                console.log("working")
                console.log(d)
            }).attr("transform", function (d, i) {
                return "translate(" + xScale(i) + ", 50)"; // positions the y-axis

            })

        })














        self.svg.selectAll("g").data(metrics).enter().append("g").attr("transform", function (d, i) {
            return "translate(" + xScale(i) + ", 50)"; // positions the y-axis
        }).each(function (d, i) {
            var firstAxis = d3.axisRight();
            // var firstScale = d3.scaleLinear().domain([10, 0]).range([0, 400]);

            switch (i) {
                case 0:
                    //each axis also needs to be told on what scale to operate
                    firstAxis.scale(totalWordScale);  // tells us the scale of y-axis metric
                    break;
                case 1:
                    //each axis also needs to be told on what scale to operate
                    firstAxis.scale(sentencesScale);  // tells us the scale of y-axis metric
                    break;
                case 2:
                    //each axis also needs to be told on what scale to operate
                    firstAxis.scale(syllableScale);  // tells us the scale of y-axis metric
                    break;
                case 3:
                    //each axis also needs to be told on what scale to operate
                    firstAxis.scale(commonScale);  // tells us the scale of y-axis metric
                    break;
            }
            // console.log(i)

            d3.select(this).call(firstAxis)
        }).append("text")
            .attr("y", -9)
            .text(function (d) { return d; })
            .style("fill", "blue")

    })

}

