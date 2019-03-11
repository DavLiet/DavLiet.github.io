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
    self.svgWidth = 700;
    self.svgHeight = 700;


    //creates svg element within the div
    self.svg = radarChart.append("svg")
        .attr("width", self.svgWidth + 180)
        .attr("height", self.svgHeight + 180).append("g").attr("id", "first").attr("transform", function (d, i) {
            return "translate(80, 80)"; // positions the y-axis)
        })

    // create color scale

    // citation: https://bl.ocks.org/pstuffa/d5934843ee3a7d2cc8406de64e6e4ea5
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
    var chartGenerator = d3.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    })

    //draw axes for radarchart

    var mainX = [{ x: 0, y: ((self.svgHeight) / 2) }, { x: (self.svgWidth), y: (self.svgHeight) / 2 }]
    self.svg.append("path").datum(mainX).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').attr("stroke-dasharray", "2")
    var mainY = [{ x: (self.svgWidth) / 2, y: 0 }, { x: (self.svgWidth) / 2, y: (self.svgHeight) }]
    self.svg.append("path").datum(mainY).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').attr("stroke-dasharray", "2")


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
        self.svg.append("path").datum(level).attr('d', chartGenerator).attr("fill", "none").attr('stroke', '#7f8c8d').attr('stroke-width', '0.5').attr("stroke-dasharray", "2")
    }

    // add units
    var labels = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
    self.svg.selectAll(".unitlabel").data(labels).enter().append("text").attr("x", function (d, i) {
        return (self.svgWidth) / 2

    }).attr("y", function (d, i) {
        return (self.svgHeight / 2) + (i * chunk);

    }).text(function (d) {
        console.log(d)
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



    // ---------------------------------------------------------------------------------------------------------
    // Note: I am removing the common count because the complex word count is much more useful and relevant
    // add common count axis 
    // var percentLabels = ["100%", "90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "10%"]
    // self.svg.selectAll(".percentLabel").data(percentLabels).enter().append("text").attr("x", function (d, i) {
    //     return i * chunk
    // }).attr("y", function (d, i) {
    //     return self.svgHeight / 2;
    // }).text(function (d) {
    //     return d;
    // }).attr("transform", function (d, i) {
    //     return "translate(3, 10)"; // positions the y-axis)
    // }).attr("class", "wordLabel").attr("stroke", "#7f8c8d");


    // ---------------------------------------------------------------------------------------------------------


    // add complex word count axis

    var complexLabels = ["120", "108", "96", "84", "72", "60", "48", "36", "24", "12"]
    self.svg.selectAll(".complexLabel").data(complexLabels).enter().append("text").attr("x", function (d, i) {
        return i * chunk
    }).attr("y", function (d, i) {
        return self.svgHeight / 2;
    }).text(function (d) {
        return d;
    }).attr("transform", function (d, i) {
        return "translate(3, 10)"; // positions the y-axis)
    }).attr("class", "complexLabel").attr("stroke", "#7f8c8d");



    // add sentence count axis
    // var sentenceLabels = ["12", "24", "36", "48", "60", "72", "84", "96", "108", "120"]
    var sentenceLabels = ["15", "30", "45", "60", "75", "90", "105", "120", "135", "150"]

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

    // self.svg.append("text").text("Common Words (%)").attr("x", function () {
    //     return 0
    // }).attr("y", function () {
    //     return self.svgHeight / 2
    // }).attr("transform", function () {
    //     return "translate(" + (-(self.svgWidth / 2) - 10) + "," + ((self.svgHeight / 2) + 60) + ") rotate(-90)"
    // }).attr("class", "titleLabel")

    self.svg.append("text").text("Complex Words Count").attr("x", function () {
        return 0
    }).attr("y", function () {
        return self.svgHeight / 2
    }).attr("transform", function () {
        return "translate(" + (-(self.svgWidth / 2) - 10) + "," + ((self.svgHeight / 2) + 75) + ") rotate(-90)"
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

        // Create an axis scale. Each "tick" on the X-Axis should represent a y-axis (total words, total sentences, total syllables, % of common words)
        var xScale = d3.scaleLinear().domain([0, 3]).range([0, self.svgWidth - 100]);

        var totalWordScale = d3.scaleLinear().domain([4000, 0]).range([10, 0]);
        var sentencesScale = d3.scaleLinear().domain([151, 0]).range([10, 0]);
        var syllableScale = d3.scaleLinear().domain([5000, 0]).range([10, 0]);
        var commonScale = d3.scaleLinear().domain([100, 0]).range([10, 0]);   // No longer used
        var complexScale = d3.scaleLinear().domain([120, 0]).range([10, 0]);

        //offset scale
        var xOffSetScale = d3.scaleLinear().domain([0, 1]).range([0, (self.svgWidth / 10) / 2])
        var yOffSetScale = d3.scaleLinear().domain([0, 1]).range([0, (self.svgHeight / 10) / 2])

        //Define line generator
        self.lineGenerator = d3.line()
            .x(function (d, i) {
                console.log("X HIT")
                if (d.index == 0) {    // total words is top vertice
                    console.log(`X: ${(self.svgWidth / 2)}`)
                    return (self.svgWidth / 2);
                }
                else if (d.index == 1) {
                    var level = parseInt(sentencesScale(d.sentence_count));
                    var offset = sentencesScale(d.sentence_count) - level;
                    switch (level) {
                        case 0:
                            console.log(`X: ${(self.svgWidth / 2 + xOffSetScale(offset))}`)
                            return self.svgWidth / 2 + xOffSetScale(offset);
                            break;
                        case 1:
                            console.log(`X: ${one[1].x + xOffSetScale(offset)}`)

                            return one[1].x + xOffSetScale(offset);
                            break;
                        case 2:
                            console.log(`X: ${two[1].x + xOffSetScale(offset)}`)

                            return two[1].x + xOffSetScale(offset);
                            break;
                        case 3:
                            console.log(`X: ${three[1].x + xOffSetScale(offset)}`)

                            return three[1].x + xOffSetScale(offset);
                            break;
                        case 4:
                            console.log(`X: ${four[1].x + xOffSetScale(offset)}`)

                            return four[1].x + xOffSetScale(offset);
                            break;
                        case 5:
                            console.log(`X: ${five[1].x + xOffSetScale(offset)}`)

                            return five[1].x + xOffSetScale(offset);
                            break;
                        case 6:
                            console.log(`X: ${six[1].x + xOffSetScale(offset)}`)

                            return six[1].x + xOffSetScale(offset);
                            break;
                        case 7:
                            console.log(`X: ${seven[1].x + xOffSetScale(offset)}`)

                            return seven[1].x + xOffSetScale(offset);
                            break;
                        case 8:
                            console.log(`X: ${eight[1].x + xOffSetScale(offset)}`)

                            return eight[1].x + xOffSetScale(offset);
                            break;
                        case 9:
                            console.log(`X: ${nine[1].x + xOffSetScale(offset)}`)

                            return nine[1].x + xOffSetScale(offset);
                            break;
                        case 10:
                            console.log(`X: ${ten[1].x + xOffSetScale(offset)}`)

                            return ten[1].x + xOffSetScale(offset);
                            break;
                    }

                }
                else if (d.index == 2) {
                    console.log(`X: ${self.svgWidth / 2}`)
                    return self.svgWidth / 2
                }
                else {

                    // var level = parseInt(commonScale(d.complex_words));
                    // var offset = commonScale(d.complex_words) - level;

                    var lastLevel = parseInt(complexScale(d.complex_words));
                    var offset = complexScale(d.complex_words) - lastLevel;

                    // console.log("LEVEL")
                    // console.log(lastLevel)
                    // console.log(d.complex_words)
                    // console.log(complexScale(d.complex_words))
                    // console.log(offset)
                    // console.log(parseInt(complexScale(d.complex_words)))
                    // console.log(lastLevel)
                    // console.log(offset)
                    // console.log(nine[3].x - yOffSetScale(offset))
                    // self.svg.append("circle").attr("cx", nine[3].x - yOffSetScale(offset)).attr("cy", self.svgHeight / 2).attr("r", "5")
                    switch (lastLevel) {
                        case 0:
                            console.log(`X: ${self.svgWidth / 2 - yOffSetScale(offset)}`)

                            return self.svgWidth / 2 - yOffSetScale(offset);
                            break;
                        case 1:
                            console.log(`X: ${one[3].x - yOffSetScale(offset)}`)
                            return one[3].x - yOffSetScale(offset);
                            break;
                        case 2:
                            console.log(`X: ${two[3].x - yOffSetScale(offset)}`)

                            return two[3].x - yOffSetScale(offset);
                            break;
                        case 3:
                            console.log(`X: ${three[3].x - yOffSetScale(offset)}`)

                            return three[3].x - yOffSetScale(offset);
                            break;
                        case 4:
                            console.log(`X: ${four[3].x - yOffSetScale(offset)}`)

                            return four[3].x - yOffSetScale(offset);
                            break;
                        case 5:
                            console.log(`X: ${five[3].x - yOffSetScale(offset)}`)

                            return five[3].x - yOffSetScale(offset);
                            break;
                        case 6:
                            console.log(`X: ${six[3].x - yOffSetScale(offset)}`)

                            return six[3].x - yOffSetScale(offset);
                            break;
                        case 7:
                            console.log(`X: ${seven[3].x - yOffSetScale(offset)}`)

                            return seven[3].x - yOffSetScale(offset);
                            break;
                        case 8:
                            console.log(`X: ${eight[3].x - yOffSetScale(offset)}`)

                            return eight[3].x - yOffSetScale(offset);
                            break;
                        case 9:
                            console.log(`X: ${nine[3].x - yOffSetScale(offset)}`)

                            console.log(`X: ${nine[3].x - yOffSetScale(offset)}`)
                            return nine[3].x - yOffSetScale(offset);
                            break;
                        case 10:
                            console.log(`X: ${ten[3].x - yOffSetScale(offset)}`)

                            return ten[3].x - yOffSetScale(offset);
                            break;
                    }

                }
            })
            .y(function (d, i) {
                console.log("Y HIT")

                if (d.index == 0) {
                    var level = parseInt(totalWordScale(d.total_words));
                    var offset = totalWordScale(d.total_words) - level;
                    switch (level) {
                        case 0:
                            console.log(`Y: ${self.svgHeight / 2 - yOffSetScale(offset)}`)
                            return self.svgHeight / 2 - yOffSetScale(offset);
                            break;
                        case 1:
                            console.log(`1Y: ${one[0].y - yOffSetScale(offset)}`)
                            return one[0].y - yOffSetScale(offset);
                            break;
                        case 2:
                            console.log(`2Y: ${two[0].y - yOffSetScale(offset)}`)
                            return two[0].y - yOffSetScale(offset);
                            break;
                        case 3:
                            console.log(`3Y: ${three[0].y - yOffSetScale(offset)}`)
                            return three[0].y - yOffSetScale(offset);
                            break;
                        case 4:
                            console.log(`4Y: ${four[0].y - yOffSetScale(offset)}`)
                            return four[0].y - yOffSetScale(offset);
                            break;
                        case 5:
                            console.log(`5Y: ${five[0].y - yOffSetScale(offset)}`)
                            return five[0].y - yOffSetScale(offset);
                            break;
                        case 6:
                            console.log(`6Y: ${six[0].y - yOffSetScale(offset)}`)
                            return six[0].y - yOffSetScale(offset);
                            break;
                        case 7:
                            console.log(`7Y: ${seven[0].y - yOffSetScale(offset)}`)
                            return seven[0].y - yOffSetScale(offset);
                            break;
                        case 8:
                            console.log(`8Y: ${eight[0].y - yOffSetScale(offset)}`)
                            return eight[0].y - yOffSetScale(offset);
                            break;
                        case 9:
                            console.log(`9Y: ${nine[0].y - yOffSetScale(offset)}`)
                            console.log(level)
                            console.log(offset)
                            console.log(nine[0].y - yOffSetScale(offset))
                            console.log(d.total_words)
                            // self.svg.append("circle").attr("cx", self.svgWidth / 2).attr("cy", nine[0].y - yOffSetScale(offset)).attr("r", "5")

                            return nine[0].y - yOffSetScale(offset);
                            break;
                        case 10:
                            console.log(`10Y: ${ten[0].y - yOffSetScale(offset)}`)
                            return ten[0].y - yOffSetScale(offset);
                            break;
                    }
                }
                else if (d.index == 1) {
                    console.log(`Y: ${self.svgHeight / 2}`)

                    return self.svgHeight / 2;
                }
                else if (d.index == 2) {
                    var level = parseInt(syllableScale(d.total_syllables));
                    var offset = syllableScale(d.total_syllables) - level;
                    switch (level) {
                        case 0:
                            console.log(`Y: ${self.svgHeight / 2 + yOffSetScale(offset)}`)

                            return self.svgHeight / 2 + yOffSetScale(offset);
                            break;
                        case 1:
                            console.log(`Y: ${one[2].y + yOffSetScale(offset)}`)
                            return one[2].y + yOffSetScale(offset);
                            break;
                        case 2:
                            console.log(`Y: ${two[2].y + yOffSetScale(offset)}`)
                            return two[2].y + yOffSetScale(offset);
                            break;
                        case 3:
                            console.log(`Y: ${three[2].y + yOffSetScale(offset)}`)

                            return three[2].y + yOffSetScale(offset);
                            break;
                        case 4:
                            console.log(`Y: ${four[2].y + yOffSetScale(offset)}`)

                            return four[2].y + yOffSetScale(offset);
                            break;
                        case 5:
                            console.log(`Y: ${five[2].y + yOffSetScale(offset)}`)

                            return five[2].y + yOffSetScale(offset);
                            break;
                        case 6:
                            console.log(`Y: ${six[2].y + yOffSetScale(offset)}`)

                            return six[2].y + yOffSetScale(offset);
                            break;
                        case 7:
                            console.log(`Y: ${seven[2].y + yOffSetScale(offset)}`)

                            return seven[2].y + yOffSetScale(offset);
                            break;
                        case 8:
                            console.log(`Y: ${eight[2].y + yOffSetScale(offset)}`)

                            return eight[2].y + yOffSetScale(offset);
                            break;
                        case 9:
                            console.log(`Y: ${nine[2].y + yOffSetScale(offset)}`)

                            return nine[2].y + yOffSetScale(offset);
                            break;
                        case 10:
                            console.log(`Y: ${ten[2].y + yOffSetScale(offset)}`)

                            return ten[2].y + yOffSetScale(offset);
                            break;
                    }
                }
                else { // i==3
                    console.log(`Y: ${self.svgHeight / 2}`)
                    return self.svgHeight / 2;
                }
            });
    })

}


RadarChart.prototype.drawGraph = function (story) {

    var self = this;

    self.colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([Math.min(...self.readabilityScore), Math.max(...self.readabilityScore)])

    self.data.forEach(function (obj, i) {
        var flesch_score = ""

        if (obj.title == story) {
            var arr = []
            for (var property in obj) {
                switch (property) {
                    case "total_words":
                        console.log(`SENTENCES: ${obj.sentence_count}`)
                        var a = {
                            total_words: obj.total_words,
                            title: obj.title,
                            flesch_score: obj.flesch_score,
                            index: 0
                        }
                        arr.push(a)
                        break;
                    case "sentence_count":
                        var a = {
                            sentence_count: obj.sentence_count,
                            title: obj.title,
                            flesch_score: obj.flesch_score,
                            index: 1
                        }
                        arr.push(a)
                        break;
                    case "syllable_count":
                        var a = {
                            total_syllables: obj.syllable_count,
                            title: obj.title,
                            flesch_score: obj.flesch_score,
                            index: 2
                        }
                        arr.push(a)
                        break;
                    case "complex_words":
                        // console.log(obj.complex_words)
                        var a = {
                            complex_words: obj.complex_words,
                            title: obj.title,
                            flesch_score: obj.flesch_score,
                            index: 3
                        }
                        arr.push(a)
                        break;
                    // case "common_percentage":
                    //     var a = {
                    //         common_words: obj.common_percentage,
                    //         title: obj.title,
                    //         flesch_score: obj.flesch_score,
                    //         index: 3
                    //     }
                    //     arr.push(a)
                    //     break;
                    case "flesch_score":
                        flesch_score = obj.flesch_score
                        break;
                }
            }

            arr.sort(function (a, b) {
                return a.index - b.index;
            });
            var lastelem = arr[0];
            arr.push(lastelem)

            console.log(arr)


            /* Initialize tooltip */
            self.tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
                return RadarChart.prototype.tooltip_render(d, self.colorScale);
            }).direction('e').offset(function () {
                return [0, 0]
            });


            var drawnPath = self.svg.append("path").datum(arr).attr("d", self.lineGenerator).attr("fill", "none").attr('stroke', function () {
                return self.colorScale(flesch_score)
            }).attr('stroke-width', '5').on("click", function (d) {
            }).attr("fill", function (d) {
                return "none"
            }).attr("class", "polygon").attr("stroke-opacity", "0.8").on('mouseover', function (d) {
                self.tip.show(d);
                d3.select(this).attr("stroke-opacity", "0.4");
            }).on('mouseout', function () {
                self.tip.hide();
                d3.select(this).attr("stroke-opacity", "0.8");

            })

            console.log(drawnPath)


            d3.selectAll(".polygon").call(self.tip)

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


// Citation: The idea for having this function was taken from the source code in the elctoral votes assignment
/**
 * Renders the HTML content for tool tip.
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for tool tip
 */
RadarChart.prototype.tooltip_render = function (tooltip_data, colorScale) {
    var self = this;
    var title = tooltip_data[0].title
    var flesch_score = tooltip_data[0].flesch_score
    var text = "<h2 class =" + "tooltip-title" + " style='color:" + colorScale(flesch_score) + ";' >" + title + "</h2>";
    text += "<ul style='list-style-type:none;'>"
    text += "<li class = " + "metadata" + "><b>Flesch Readability Score:</b> " + flesch_score + "</li>"
    text += "<li class = " + "metadata" + "><b>Word Count:</b> " + tooltip_data[0].total_words + "</li>"
    text += "<li class = " + "metadata" + "><b>Sentence Count: </b>" + tooltip_data[1].sentence_count + "</li>"
    text += "<li class = " + "metadata" + "><b>Syllable Count: </b>" + tooltip_data[2].total_syllables + "</li>"
    text += "<li class = " + "metadata" + "><b>Complex Word Count: </b>" + tooltip_data[3].complex_words + "</li>"
    text += "</ul>";
    return text;
}

