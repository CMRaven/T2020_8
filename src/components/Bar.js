import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

class Bar extends Component {
    state = {
        transactions: []
    }
    componentDidMount() {

        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("Bar", am4charts.XYChart);
            
            // Add data
            chart.data = [{
              "month": "January",
              "visits": 1488
            }, {
              "month": "Feb",
              "visits": 1278
            }, {
              "month": "March",
              "visits": 1309
            }, {
              "month": "April",
              "visits": 1273
            }, {
              "month": "May",
              "visits": 1023
            }, {
              "month": "June",
              "visits": 1088
            }, {
              "month": "July",
              "visits": 984
            }, {
              "month": "August",
              "visits": 1377
            }, {
              "month": "September",
              "visits": 1588
            }, {
              "month": "October",
              "visits": 1544
            }, {
              "month": "November",
              "visits": 1011
            }, {
              "month": "December",
              "visits": 1600
            }];
            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;
            
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;
            
            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "visits";
            series.dataFields.categoryX = "month";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;
            
            series.tooltip.pointerOrientation = "vertical";
            
            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;
            
            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;
            
            series.columns.template.adapter.add("fill", function(fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
            });
            
            // Cursor
            chart.cursor = new am4charts.XYCursor();
            
            });
      }
    
      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render() {
      return (
        <div id="Bar" style={{width: "500px", height: "500px"}} ></div>
      );
    };
  }



export default Bar;