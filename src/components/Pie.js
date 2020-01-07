import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Pie extends Component {
    componentDidMount() {
        am4core.ready(function() {
            
            // Create chart instance
            var chart = am4core.create("Pie", am4charts.PieChart);
            
            // var label = pieSeries.createChild(am4core.Label);
            // label.text = "Hi there!";
            // label.horizontalCenter = "middle";
            // label.verticalCenter = "middle";
            // label.fontSize = 40;

            // Add data
            chart.data = [{
              "type": "F&B",
              "amount": 501.9
            }, {
              "type": "LEISURE",
              "amount": 301.9
            }, {
              "type": "TRANSFER",
              "amount": 201.1
            }, {
              "type": "TRANSPORT",
              "amount": 165.8
            }, {
              "type": "ATM",
              "amount": 139.9
            }, {
              "type": "ONLINE",
              "amount": 128.3
            }];
            
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "amount";
            pieSeries.dataFields.category = "type";
            pieSeries.innerRadius = am4core.percent(50);
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;
            
            var rgm = new am4core.RadialGradientModifier();
            rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
            pieSeries.slices.template.fillModifier = rgm;
            pieSeries.slices.template.strokeModifier = rgm;
            pieSeries.slices.template.strokeOpacity = 0.4;
            pieSeries.slices.template.strokeWidth = 0;
            
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            
            });
      }
    
      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render() {
      return (
      <div className="Pie">
            <div id="Pie" style={{width: "500px", height: "500px"}}></div>
      </div>
      );
    };
  }



export default Pie;