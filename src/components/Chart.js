import React from "react";
import ReactEcharts from "echarts-for-react"; 

const Chart = (props) =>{
    return <div id="main">
        <ReactEcharts option={props.option} />
    </div>
}

export default Chart;