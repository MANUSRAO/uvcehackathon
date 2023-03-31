import {React, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ReactEcharts from "echarts-for-react"; 
import './Cluster.css'
const Cluster = ()=>{
    const location = useLocation();
    const [totalData, setTotalData] = useState();
    const datas = [totalData?.non_rec.bio,totalData?.non_rec.non_bio,totalData?.rec.electronic,totalData?.rec.glass,totalData?.rec.metal,totalData?.rec.paper,totalData?.rec.plastic]
    var option={};
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: ['Bio','Non Bio','Electronic','Glass','Metal','Paper','Plastic'],
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: datas
            }
        ]
    };
    useEffect(() => {
        getData();
      }, []);
    let getData = async () =>{
        try{
            const response = await fetch("https://rest-api-b9001-default-rtdb.asia-southeast1.firebasedatabase.app/Areas/"+location.state.name+".json",{
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'  
              }});
            const realData = await response.json();
            setTotalData(realData);
        }
        catch(err){
            console.error(err);
        }
    }

    return (
    <div>

      <Navbar name={location.state.name}/>
      <div id="main">
            <ReactEcharts option={option} />
      </div>
      <div className="clusterCard">
        <h2>{totalData?.name}</h2>

        <div className="inner">
            <div>
            <p><b>Address:</b> {totalData?.address}</p>
            <p><b>Manager:</b> {totalData?.incharge}</p>
            </div>
            <div>
                <b>Recyclable:</b>
                <p>Electronic: {totalData?.rec.electronic}</p>
                <p>Glass: {totalData?.rec.glass}</p>
                <p>Metal: {totalData?.rec.metal}</p>
                <p>Paper: {totalData?.rec.paper}</p>
                <p>Plastic: {totalData?.rec.plastic}</p>
            </div>
            <div>
                <b>Non Recyclable</b>
                <p>Biodegradable: {totalData?.non_rec.bio}</p>
                <p>Non Biodegradable: {totalData?.non_rec.non_bio}</p>
            </div>
        </div>

      </div>
    </div>
    )
}
export default Cluster;