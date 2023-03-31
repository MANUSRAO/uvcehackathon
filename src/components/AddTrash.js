import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
const AddTrash = ()=>{

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
    const [data, setData] = useState({});

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
        
        let prevRec = rec;
        console.log(data);
        Object.entries(prevRec).forEach((entry) => {
            const [key, value] = entry;
            let a = parseFloat(prevRec[key]), b = parseFloat(data.rec[key]);
            //console.log(a,b);
            prevRec[key] = ""+(a+b);
          });

        let prevNonRec = non_rec;
        Object.entries(prevNonRec).forEach((entry)=>{
            const[key, value] = entry;
            let a = parseFloat(prevNonRec[key]), b = parseFloat(data.non_rec[key]);
            console.log(a,b);
            prevNonRec[key] = ""+(a+b);
        })
        
           
        
        // make put request to 
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

    }

    return (
    <div >
        <Navbar name={location.state.name}/>
        <h1 style={{textAlign:'center',color:'#6558d3'}}>Add Trash for {location.state.name[0].toUpperCase()+location.state.name.slice(1)}</h1>
      <div className="form">
        <h1>Recyclable Trash</h1>
        <div className="trash-row">
            <p>Plastic</p>
            <input type="number" defaultValue={0}  name="plastic" onChange={(e)=>recHandler(e)}/>
        </div>
        <div className="trash-row">
            <p>Paper</p>
            <input type="number" defaultValue={0}  name="paper" onChange={(e)=>recHandler(e)}/>
        </div>
        <div className="trash-row">
            <p>Glass</p>
            <input type="number" defaultValue={0}  name="glass" onChange={(e)=>recHandler(e)}/>
        </div>
        <div className="trash-row">
            <p>Metal</p>
            <input type="number" defaultValue={0} name="metal" onChange={(e)=>recHandler(e)} />
        </div>
        <div className="trash-row">
            <p>Electronic devices</p>
            <input type="number" defaultValue={0}  name="electronic" onChange={(e)=>recHandler(e)}/>
        </div>

        <h1>Non recyclable Trash</h1>
        <div className="trash-row">
            <p>Biodegradable wastes</p>
            <input type="number" defaultValue={0} name="bio" onChange={(e)=>nonRecHandler(e)}/>
        </div>
        <div className="trash-row">
            <p>Non Biodegradable wastes</p>
            <input type="number" defaultValue={0} name="non_bio" onChange={(e)=>nonRecHandler(e)}/>
        </div>

        <button onClick={submitButtonHandler}>Add Trash</button>
      </div>

   </div>
    )
   
}

export default AddTrash;