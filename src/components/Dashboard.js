import { useEffect, useState } from 'react';
import './Dashboard.css'

const Dashboard = () =>{
    const [totalData, setTotalData] = useState([]);
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
                res[index].push(value.name)
                res[index].push(value.address)
                res[index].push(value.inchrage)

                //res[index].push(value.incharge)
                console.log(key);
                index++;
              })
            console.log(realData);
            setTotalData(res);
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div className='container'>
            {
               totalData.map((data,index)=>{
                   return (
                    <div>
                      <h1>{data[0]}</h1>
                      <p>{data[1]}</p>
                      <p>{data[2]}</p>
                    </div>
                   );
               })
            }

        </div>
    )
}

export default Dashboard;