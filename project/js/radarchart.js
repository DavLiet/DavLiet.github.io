function RadarChart() {
    var self = this;
    self.init();
}


RadarChart.prototype.init = function () {

    var self = this;

    self.firstVisual = ""
    self.secondVisual = ""

    self.data = []

    self.margin = { top: 10, right: 80, bottom: 30, left: 80 };


    var radarChart = d3.select("#chart-one");
    self.svgBounds = radarChart.node().getBoundingClientRect();
    // self.svgWidth = (self.svgBounds.width / 2) - self.margin.left - self.margin.right;
    self.svgWidth = 700;
    self.svgHeight = 700;
    // self.midWidth = self.svgWidth / 2
    // self.midHeight = self.svgHeight / 2
    // self.chartWidth = self.svgWidth - 40 - 40
    // self.chartHeight = self.svgHeight - 40 - 40

    //creates svg element within the div
    self.svg = radarChart.append("svg")
        .attr("width", self.svgWidth + 180)
        .attr("height", self.svgHeight + 180).append("g").attr("id", "first").attr("transform", function (d, i) {
            return "translate(80, 80)"; // positions the y-axis)
        })

    // create color scale


    // citatioin: https://bl.ocks.org/pstuffa/d5934843ee3a7d2cc8406de64e6e4ea5
    var colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([self.svgWidth, 0])

    var scaleGroup = self.svg.append("g").attr("class", "colorGroup")
    scaleGroup.append("text").text("Most Easy").attr("transform", "translate(0,-60)")
    scaleGroup.append("text").text("Most Difficult").attr("transform", "translate(0,-60)").attr("x", self.svgWidth - 90)
    scaleGroup.selectAll(".colorBars")
        .data(d3.range(self.svgWidth), function (d) { return d; })
        .enter().append("rect")
        .attr("class", "colorBars")
        .attr("x", function (d, i) { return i; })
        .attr("y", 0)
        .attr("height", 20)
        .attr("width", 1)
        .style("fill", function (d, i) { return colorScale(d); }).attr("transform", "translate(0,-50)")
    // end citation



    //draw radarchart
    var corners = [{ x: (self.svgWidth) / 2, y: 40 }, { x: (self.svgWidth) - 40, y: (self.svgHeight) / 2 }, { x: (self.svgWidth) / 2, y: (self.svgHeight) - 40 }, { x: 40, y: (self.svgHeight) / 2 }, { x: (self.svgWidth) / 2, y: 40 }]

    var chartGenerator = d3.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    })

    // self.svg.append("path").datum(corners).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '1').on("mouseover", function (d) {
    //     console.log("working")
    //     console.log(d)
    // }).attr("stroke-dasharray", "2")


    //draw axes for radarchart

    var mainX = [{ x: 0, y: ((self.svgHeight) / 2) }, { x: (self.svgWidth), y: (self.svgHeight) / 2 }]
    self.svg.append("path").datum(mainX).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').on("mouseover", function (d) {
        // console.log("working")
        // console.log(d)
    }).attr("stroke-dasharray", "2")
    var mainY = [{ x: (self.svgWidth) / 2, y: 0 }, { x: (self.svgWidth) / 2, y: (self.svgHeight) }]
    self.svg.append("path").datum(mainY).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').on("mouseover", function (d) {
        // console.log("working")
        // console.log(d)
    }).attr("stroke-dasharray", "2")


    var one = []
    var two = []
    var three = []
    var four = []
    var five = []
    var six = []
    var seven = []
    var eight = []
    var nine = []
    var ten = []
    // draw 10 grid-lines
    var chunk = ((self.svgWidth) / 10) / 2
    for (var i = 0; i < 10; i++) {
        var level = [{ x: (self.svgWidth) / 2, y: (chunk * i) }, { x: (self.svgWidth) - (chunk * i), y: (self.svgHeight) / 2 }, { x: (self.svgWidth) / 2, y: (self.svgHeight) - (chunk * i) }, { x: (chunk * i), y: (self.svgHeight) / 2 }, { x: (self.svgWidth) / 2, y: (chunk * i) }]
        switch (i) {
            case 0:
                ten = level;
                break;
            case 1:
                nine = level;
                break;
            case 2:
                eight = level;
                break;
            case 3:
                seven = level;
                break;
            case 4:
                six = level;
                break;
            case 5:
                five = level;
                break;
            case 6:
                four = level;
                break;
            case 7:
                three = level;
                break;
            case 8:
                two = level;
                break;
            case 9:
                one = level;
                break;

        }
        self.svg.append("path").datum(level).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').on("mouseover", function (d) {
            // console.log("working")
            // console.log(d)
        }).attr("stroke-dasharray", "2")
    }

    // add units
    var labels = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
    self.svg.selectAll("text").data(labels).enter().append("text").attr("x", function (d, i) {
        return (self.svgWidth) / 2

    }).attr("y", function (d, i) {
        return (self.svgHeight / 2) + (i * chunk);

    }).text(function (d) {
        return d;
    }).attr("transform", function (d, i) {
        return "translate(3, 6)"; // positions the y-axis)

    }).attr("class", "unitlabel").attr("stroke", "#7f8c8d");

    // add word count axis
    var wordLabels = [4000, 3600, 3200, 2800, 2400, 2000, 1600, 1200, 800, 400]
    self.svg.selectAll(".wordLabel").data(wordLabels).enter().append("text").attr("x", function (d, i) {
        return (self.svgWidth) / 2
    }).attr("y", function (d, i) {
        return (i * chunk);
    }).text(function (d) {
        return d;
    }).attr("transform", function (d, i) {
        return "translate(3, 6)"; // positions the y-axis)
    }).attr("class", "wordLabel").attr("stroke", "#7f8c8d");


    // add common count axis
    var percentLabels = ["100%", "90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "10%"]
    self.svg.selectAll(".percentLabel").data(percentLabels).enter().append("text").attr("x", function (d, i) {
        return i * chunk
    }).attr("y", function (d, i) {
        return self.svgHeight / 2;
    }).text(function (d) {
        return d;
    }).attr("transform", function (d, i) {
        return "translate(3, 10)"; // positions the y-axis)
    }).attr("class", "wordLabel").attr("stroke", "#7f8c8d");


    // add sentence count axis
    var sentenceLabels = ["12", "24", "36", "48", "60", "72", "84", "96", "108", "120"]
    self.svg.selectAll(".sentenceLabel").data(sentenceLabels).enter().append("text").attr("x", function (d, i) {
        return (self.svgWidth / 2) + ((i + 1) * chunk)
    }).attr("y", function (d, i) {
        return self.svgHeight / 2;
    }).text(function (d) {
        return d;
    }).attr("transform", function (d, i) {
        return "translate(-15, 10)"; // positions the y-axis)
    }).attr("class", "wordLabel").attr("stroke", "#7f8c8d");


    // add text labels

    self.svg.append("text").text("Word Count").attr("x", function () {
        return self.svgWidth / 2
    }).attr("y", function () {
        return 0
    }).attr("transform", function () {
        return "translate(-35,-10)"
    }).attr("class", "titleLabel")

    self.svg.append("text").text("Syllable Count").attr("x", function () {
        return self.svgWidth / 2
    }).attr("y", function () {
        return self.svgHeight
    }).attr("transform", function () {
        return "translate(-40,25)"
    }).attr("class", "titleLabel")

    self.svg.append("text").text("Common Words (%)").attr("x", function () {
        return 0
    }).attr("y", function () {
        return self.svgHeight / 2
    }).attr("transform", function () {
        return "translate(" + (-(self.svgWidth / 2) - 10) + "," + ((self.svgHeight / 2) + 60) + ") rotate(-90)"
    }).attr("class", "titleLabel")

    self.svg.append("text").text("Sentence Count").attr("x", function () {
        return 0
    }).attr("y", function () {
        return self.svgHeight / 2
    }).attr("transform", function () {
        return "translate(" + ((self.svgWidth * 2) - 340) + "," + ((self.svgHeight / 2) - 45) + ") rotate(90)"
    }).attr("class", "titleLabel")



    d3.json('data/data.json', function (error, data) {
        var metrics = ["total_words", "total_sentences", "total_syllables", "common_words"];

        self.data = data;
        var totalWords = []
        var totalSentences = []
        var totalSyllables = []
        var commonWords = []
        self.readabilityScore = []
        self.data.forEach(function (d) {
            totalWords.push(d.total_words)
            totalSentences.push(d.sentence_count)
            totalSyllables.push(d.syllable_count)
            commonWords.push(d.common_percentage)
            self.readabilityScore.push(d.flesch_score)
        });

        // console.log(Math.min(self.readabilityScore))



        // self.svg.selectAll("p").data(data).enter().append("p").text(function (d) {
        //     console.log(d)
        // });

        // Create an axis scale. Each "tick" on the X-Axis should represent a y-axis (total words, total sentences, total syllables, % of common words)
        var xScale = d3.scaleLinear().domain([0, 3]).range([0, self.svgWidth - 100]);

        var totalWordScale = d3.scaleLinear().domain([4000, 0]).range([10, 0]);
        var sentencesScale = d3.scaleLinear().domain([120, 0]).range([10, 0]);
        var syllableScale = d3.scaleLinear().domain([5000, 0]).range([10, 0]);
        var commonScale = d3.scaleLinear().domain([100, 0]).range([10, 0]);

        //offset scale
        var xOffSetScale = d3.scaleLinear().domain([0, 1]).range([0, (self.svgWidth / 10) / 2])
        var yOffSetScale = d3.scaleLinear().domain([0, 1]).range([0, (self.svgHeight / 10) / 2])


        // console.log(`Max Sentence: ${Math.max(...totalSentences)}`)
        // console.log(totalWordScale(295))
        // console.log(`Min Sentence: ${Math.min(...totalSentences)}`)



        //Define line generator
        self.lineGenerator = d3.line()
            .x(function (d, i) {
                if (d.index == 0) {    // total words is top vertice
                    // console.log(parseInt(totalWordScale(d.total_words)))
                    // return parseInt(totalWordScale(d.total_words))


                    return (self.svgWidth / 2);

                }
                else if (d.index == 1) {
                    // console.log(parseInt(sentencesScale(d.sentence_count)))
                    // return parseInt(sentencesScale(d.sentence_count))
                    // return self.svgHeight / 2
                    var level = parseInt(sentencesScale(d.sentence_count));
                    var offset = sentencesScale(d.sentence_count) - level;
                    // console.log(`Sentence Count: ${d.sentence_count}`)

                    switch (level) {
                        case 0:
                            return self.svgWidth / 2 + xOffSetScale(offset);
                            break;
                        case 1:
                            return one[1].x + xOffSetScale(offset);
                            break;
                        case 2:
                            return two[1].x + xOffSetScale(offset);
                            break;
                        case 3:
                            // self.svg.append("circle").attr("cx", self.svgWidth / 2).attr("cy", three[0].y).attr("r", "5")
                            return three[1].x + xOffSetScale(offset);
                            break;
                        case 4:
                            return four[1].x + xOffSetScale(offset);
                            break;
                        case 5:
                            return five[1].x + xOffSetScale(offset);
                            break;
                        case 6:
                            return six[1].x + xOffSetScale(offset);
                            break;
                        case 7:
                            return seven[1].x + xOffSetScale(offset);
                            break;
                        case 8:
                            return eight[1].x + xOffSetScale(offset);
                            break;
                        case 9:
                            return nine[1].x + xOffSetScale(offset);
                            break;
                        case 10:
                            return ten[1].x + xOffSetScale(offset);
                            break;
                    }

                }
                else if (d.index == 2) {
                    // console.log(parseInt(syllableScale(d.total_syllables)))
                    // return parseInt(syllableScale(d.total_syllables))
                    return self.svgWidth / 2

                }
                else {
                    // console.log(parseInt(commonScale(d.common_words)))
                    // return parseInt(commonScale(d.common_words))
                    // return self.svgHeight / 2

                    var level = parseInt(commonScale(d.common_words * 100));
                    var offset = commonScale(d.common_words * 100) - level;
                    // console.log(`Common Words: ${d.common_words * 100}`)


                    switch (level) {
                        case 0:
                            return self.svgWidth / 2 - yOffSetScale(offset);
                            break;
                        case 1:
                            return one[3].x - yOffSetScale(offset);
                            break;
                        case 2:
                            return two[3].x - yOffSetScale(offset);
                            break;
                        case 3:
                            // self.svg.append("circle").attr("cx", self.svgWidth / 2).attr("cy", three[0].y).attr("r", "5")
                            return three[3].x - yOffSetScale(offset);
                            break;
                        case 4:
                            return four[3].x - yOffSetScale(offset);
                            break;
                        case 5:
                            return five[3].x - yOffSetScale(offset);
                            break;
                        case 6:
                            return six[3].x - yOffSetScale(offset);
                            break;
                        case 7:
                            return seven[3].x - yOffSetScale(offset);
                            break;
                        case 8:
                            return eight[3].x - yOffSetScale(offset);
                            break;
                        case 9:
                            return nine[3].x - yOffSetScale(offset);
                            break;
                        case 10:
                            return ten[3].x - yOffSetScale(offset);
                            break;
                    }

                }

                // return xScale(d.index);

            })
            .y(function (d, i) {
                if (d.index == 0) {
                    // console.log(totalWordScale(d.total_words))
                    // console.log(`stuf::::${(10 - parseInt(totalWordScale(d.total_words))) * chunk}`)
                    // console.log(`;;;;;;;;;;;;;;;;;;;;;;;;${}`)
                    var level = parseInt(totalWordScale(d.total_words));
                    var offset = totalWordScale(d.total_words) - level;

                    // console.log(`Word Count: ${d.total_words}`)


                    switch (level) {
                        case 0:
                            return self.svgHeight / 2 - yOffSetScale(offset);
                            break;
                        case 1:
                            return one[0].y - yOffSetScale(offset);
                            break;
                        case 2:
                            return two[0].y - yOffSetScale(offset);
                            break;
                        case 3:
                            // self.svg.append("circle").attr("cx", self.svgWidth / 2).attr("cy", three[0].y).attr("r", "5")
                            return three[0].y - yOffSetScale(offset);
                            break;
                        case 4:
                            return four[0].y - yOffSetScale(offset);
                            break;
                        case 5:
                            return five[0].y - yOffSetScale(offset);
                            break;
                        case 6:
                            return six[0].y - yOffSetScale(offset);
                            break;
                        case 7:
                            return seven[0].y - yOffSetScale(offset);
                            break;
                        case 8:
                            return eight[0].y - yOffSetScale(offset);
                            break;
                        case 9:
                            return nine[0].y - yOffSetScale(offset);
                            break;
                        case 10:
                            return ten[0].y - yOffSetScale(offset);
                            break;
                    }
                    // return parseInt(totalWordScale(d.total_words)
                    // return xScale(d.index);
                }
                else if (d.index == 1) {
                    // console.log(sentencesScale(d.sentence_count))
                    // return parseInt(sentencesScale(d.sentence_count))
                    // return xScale(d.index);
                    // self.svg.append("circle").attr("cx", six[1].x).attr("cy", three[0].y).attr("r", "5")

                    return self.svgHeight / 2;
                }
                else if (d.index == 2) {
                    // console.log(syllableScale(d.totalSyllables))
                    // return parseInt(syllableScale(d.total_syllables))
                    // return xScale(d.index);
                    var level = parseInt(syllableScale(d.total_syllables));
                    var offset = syllableScale(d.total_syllables) - level;
                    // console.log(`Syllables: ${level + offset}`)
                    // console.log(`mmmmmmmm: ${d.total_syllables}`)
                    switch (level) {
                        case 0:
                            return self.svgHeight / 2 + yOffSetScale(offset);
                            break;
                        case 1:
                            return one[2].y + yOffSetScale(offset);
                            break;
                        case 2:
                            return two[2].y + yOffSetScale(offset);
                            break;
                        case 3:
                            // self.svg.append("circle").attr("cx", self.svgWidth / 2).attr("cy", three[0].y).attr("r", "5")
                            return three[2].y + yOffSetScale(offset);
                            break;
                        case 4:
                            return four[2].y + yOffSetScale(offset);
                            break;
                        case 5:
                            return five[2].y + yOffSetScale(offset);
                            break;
                        case 6:
                            return six[2].y + yOffSetScale(offset);
                            break;
                        case 7:
                            return seven[2].y + yOffSetScale(offset);
                            break;
                        case 8:
                            return eight[2].y + yOffSetScale(offset);
                            break;
                        case 9:
                            return nine[2].y + yOffSetScale(offset);
                            break;
                        case 10:
                            return ten[2].y + yOffSetScale(offset);
                            break;
                    }
                }
                else { // i==3
                    // console.log(commonScale(d.common_words))

                    // return parseInt(commonScale(d.common_words))
                    // return xScale(d.index);
                    return self.svgHeight / 2;
                }
            });


        // // var thing = [{ total_words: 1711, index: 0 }, { sentence_count: 39, index: 1 }, { total_syllables: 1608, index: 2 }, { common_words: 0.84, index: 3 }]

        // // self.svg.append("path").datum(thing).attr('d', lineGenerator).attr("fill", "none").attr('stroke', 'green').attr('stroke-width', '4').on("mouseover", function (d) {
        // //     console.log("working")
        // //     console.log(d)
        // // })


    })

}


RadarChart.prototype.drawGraph = function (story) {



    var self = this;

    // console.log(self.readabilityScore)
    var colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([Math.min(...self.readabilityScore), Math.max(...self.readabilityScore)])

    // console.log(Math.min(...self.readabilityScore))
    self.data.forEach(function (obj, i) {
        // console.log(obj)
        var flesch_score = ""

        if (obj.title == story) {
            // console.log("hit")
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
                    case "flesch_score":
                        flesch_score = obj.flesch_score
                        break;
                }
            }

            // if (i == 24 || i == 5) {
            arr.sort(function (a, b) {
                return a.index - b.index;
            });
            var lastelem = arr[0];
            arr.push(lastelem)
            self.svg.append("path").datum(arr).attr("d", self.lineGenerator).attr("fill", "none").attr('stroke', function () {
                return colorScale(flesch_score)
            }).attr('stroke-width', '5').on("click", function (d) {
            }).attr("fill", function (d) {
                // console.log(flesch_score)
                // console.log(colorScale(flesch_score))
                // return colorScale(flesch_score)
                return "none"
            }).attr("class", "polygon").attr("stroke-opacity", "0.8")
            // }

        }

    })
}
RadarChart.prototype.update = function (choiceOne) {

    var self = this;


    if ((choiceOne != self.firstVisual) && (choiceOne != self.secondVisual)) {
        d3.selectAll(".polygon").remove()

        self.firstVisual = self.secondVisual
        self.secondVisual = choiceOne


        self.drawGraph(self.firstVisual)
        self.drawGraph(self.secondVisual)
    }

}

