import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import './ClearTrash.css'
const ClearTrash = ()=>{
    const location = useLocation();
    const url = "https://rest-api-b9001-default-rtdb.asia-southeast1.firebasedatabase.app/Areas/"+location.state.name+".json";

    const [rec,setRec] = useState({
        plastic:"0",
        electronic:"0",
        paper:"0",
        glass:"0",
        metal:"0",
    });
    const [non_rec, setNonRec] = useState({
        bio:"0",
        non_bio:"0",
    });
    const [data, setData] = useState({
        rec:{
            plastic:"0",
        electronic:"0",
        paper:"0",
        glass:"0",
        metal:"0",
        },
        non_rec:{
            bio:"0",
            non_bio:"0",
        }
    });

    useEffect(()=>{
            getPreviousData();
    },[]);

    const getPreviousData = async()=>{
        let response = await fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'  
            }});
      let realData = await response.json();
      setData(realData);
     
    }
    
    //console.log(rec,non_rec);
    const recHandler = (e)=>{
        let prev = rec;
        if(!(e.target.value === ""))
        prev[e.target.name] = e.target.value;
        
       
        setRec(prev);
    }

    const nonRecHandler = (e)=>{
        let prev = non_rec;

        if(!(e.target.value===""))
        prev[e.target.name] = e.target.value;
           
        
        setNonRec(prev);
    }

    const submitButtonHandler = async (e) =>{
        
        let valid = true;
        let prevRec = rec;
        console.log(data);
        Object.entries(prevRec).forEach((entry) => {
            const [key, value] = entry;
            let a = parseFloat(prevRec[key]), b = parseFloat(data.rec[key]);
            //console.log(a,b);
            if(a>b){
                alert("The value exceeds available "+key+" waste");
                valid=false;
            }
              
            prevRec[key] = ""+(b-a);
          });

        let prevNonRec = non_rec;
        Object.entries(prevNonRec).forEach((entry)=>{
            const[key, value] = entry;
            let a = parseFloat(prevNonRec[key]), b = parseFloat(data.non_rec[key]);
            if(a>b){
                alert("The value exceeds available "+key+" waste");
                valid=false;
            }
              
            //console.log(a,b);
            prevNonRec[key] = ""+(b-a);
        })
        
           
        
        // make put request to 
       // if(valid){
            let prev = data;
            prev.rec = prevRec;
            prev.non_rec = prevNonRec;
            setData(prev);
    
            let response = await fetch(url,{
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'  
                },
                body:JSON.stringify(data),
            });
    
            window.scrollTo(0,0);
            window.location.reload();
        //}
        
    }
    return (
        <div >
        <Navbar name={location.state.name}/>
        <h1 style={{textAlign:'center',color:'#6558d3'}}>Clear Trash for {location.state.name[0].toUpperCase()+location.state.name.slice(1)}</h1>
        <div className="form">
            <h2>Recyclable Trash</h2>
            <div className="trash-row">
                <div className="trash-value">
                        <p className="bold">Plastic</p>
                        <p>Max Value: {data.rec.plastic}</p>
                </div>
                <input type="number" defaultValue={0}  name="plastic" onChange={(e)=>recHandler(e)}/>
            </div>
            <div className="trash-row">  
                    <div className="trash-value">
                        <p className="bold">Paper</p>
                        <p>Max Value: {data.rec.paper}</p>
                    </div>
                <input type="number" defaultValue={0}  name="paper" onChange={(e)=>recHandler(e)}/>
            </div>
            <div className="trash-row">
                    <div className="trash-value">
                        <p className="bold">Glass</p>
                        <p>Max Value: {data.rec.glass}</p>
                    </div>
                <input type="number" defaultValue={0}  name="glass" onChange={(e)=>recHandler(e)}/>
            </div>
            <div className="trash-row">
                    <div className="trash-value">
                        <p className="bold">Metal</p>
                        <p>Max Value: {data.rec.metal}</p>
                    </div>  
                <input type="number" defaultValue={0} name="metal" onChange={(e)=>recHandler(e)} />
            </div>
            <div className="trash-row">
                <div className="trash-value">
                        <p className="bold">Electronic devices</p>
                        <p>Max Value: {data.rec.electronic}</p>
                    </div>
                <input type="number" defaultValue={0}  name="electronic" onChange={(e)=>recHandler(e)}/>
            </div>

            <h2>Non recyclable Trash</h2>
            <div className="trash-row">
                    <div className="trash-value">
                        <p>Biodegradable wastes</p>
                        <p>Max Value: {data.non_rec.bio}</p>
                    </div>
                
                <input type="number" defaultValue={0} name="bio" onChange={(e)=>nonRecHandler(e)}/>
            </div>
            <div className="trash-row">
                    <div className="trash-value">
                        <p>Non Biodegradable wastes</p>
                        <p>Max Value: {data.non_rec.non_bio}</p>
                    </div>
                
                <input type="number" defaultValue={0} name="non_bio" onChange={(e)=>nonRecHandler(e)}/>
            </div>

            <button onClick={submitButtonHandler}>Clear Trash</button>
        </div>
   </div>
    )
}
export default ClearTrash;