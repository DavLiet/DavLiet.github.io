
function Stories(radarChart) {
    var self = this;
    self.init();
    self.radarChart = radarChart
}


Stories.prototype.init = function () {
    var self = this;

    self.selected = ["", ""]

    self.second = "";
    self.first = "";
    d3.json('data/data.json', function (error, data) {

        // console.log(data)
        var storyTitles = [];
        data.forEach(function (d) {
            storyTitles.push(d.title)
        });
        // console.log(storyTitles)
        var storiesContainer = d3.select("#all-stories");
        storiesContainer.selectAll(".story").data(storyTitles).enter().append("button").attr("content", function (d) {
            return d;
        }).html(function (d) {
            return d;
        }).attr("class", "story").on("click", function (d) {


            if (d != self.selected[0] && d != self.selected[1]) {
                if (self.first) {
                    // console.log(self.selected[0])
                    //citation: https://stackoverflow.com/questions/507138/how-do-i-add-a-class-to-a-given-element
                    self.first.remove("selected")
                    // end citation
                }


                var current = d3.select(this)._groups[0][0].innerHTML;
                self.selected[0] = self.selected[1];
                self.selected[1] = current;
                //citation: https://stackoverflow.com/questions/507138/how-do-i-add-a-class-to-a-given-element
                d3.select(this)._groups[0][0].classList.add("selected")
                // end citation



                self.first = self.second;
                self.second = d3.select(this)._groups[0][0].classList



                data.forEach(function (d) {

                })
                self.radarChart.update(d)
            }
        })

    })

}