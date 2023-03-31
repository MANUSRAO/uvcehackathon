import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactEcharts from "echarts-for-react"; 
import './Dashboard.css'

const Dashboard = () =>{

    const [totalData, setTotalData] = useState([]);
    const navigate = useNavigate();
    let clusterNames = totalData.map((data)=>{return data[1]});
    let nonRec = totalData.map((data)=>{return parseFloat(data[4])+parseFloat(data[5])});
    let recData = totalData.map((data)=>{return (parseFloat(data[6])+parseFloat(data[7])+parseFloat(data[8])+parseFloat(data[9])+parseFloat(data[10]))});
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
            data: clusterNames,
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: 'Recyclable',
            type: 'bar',
            stack: 'Trash',
            emphasis: {
                focus: 'series'
            },
            data: recData
            },
            {
            name: 'Non Recyclable',
            type: 'bar',
            stack: 'Trash',
            emphasis: {
                focus: 'series'
            },
            data: nonRec
            },
        ]
    };
    useEffect(() => {
        getData();
      }, []);

    let getData = async () =>{
        try{
            const response = await fetch("https://rest-api-b9001-default-rtdb.asia-southeast1.firebasedatabase.app/Areas.json",{
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'  
              }});
            const realData = await response.json();
            let res=[],index=0;
            Object.entries(realData).forEach((entry) => {
                const [key, value] = entry;
                res.push([]);
                res[index].push(key);
                res[index].push(value.name);
                res[index].push(value.address);
                res[index].push(value.incharge);
                res[index].push(value.non_rec.bio);
                res[index].push(value.non_rec.non_bio);
                res[index].push(value.rec.electronic);
                res[index].push(value.rec.glass);
                res[index].push(value.rec.metal);
                res[index].push(value.rec.paper);
                res[index].push(value.rec.plastic);
                index++;
              })
            setTotalData(res);
        }
        catch(err){
            console.error(err);
        }
    }


    return (
        <div className='container'>
            <h1 style={{textAlign:'center','marginBottom':'2rem'}}>Dashboard - Waste Managment System</h1>
            <div id="main">
                <ReactEcharts option={option} />
            </div>
            <h1>Area Info</h1>
            <div className='cardContainer'>
            {
               totalData.map((data,index)=>{
                   return (
                    <div className='card' key={data[0]}>
                      <h1>{data[1]}</h1>
                      <p><b>Address:</b> <br></br>{data[2]}</p>
                      <p><b>Manager:</b><br></br>{data[3]}</p>
                      <button className="btn"onClick={()=>navigate("/cluster",{state:{name:data[0]}})}>Know More</button>
                    </div>
                   );
               })
            }
            </div>
        </div>
    )
}

export default Dashboard;