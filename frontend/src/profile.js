import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./css/profile.css"


function ProfileP(){
    const {id="UserNameHere"} = useParams()
    console.log(id)

    const [followerData, setFData] = useState([{}])
    const [followingData, setFGData] = useState([{}])
    const [coinData, setCoinData] = useState([{}])

    useEffect(() => {
		fetch(`/users/details/${id}`).then(
			res => res.json()
		).then(
			data => {
				setFData(data["Data"][id]["Name"]["Followers"])
                setFGData(data["Data"][id]["Name"]["Following"])
                setCoinData(data["Data"][id]["Name"]["coins"])
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])

 
    

    return(
        <>
            <div id = "profilestyle">
                <NavBar/>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-15 mb-4 mb-sm-5">
                        <div style={{maxWidth: "10rem", width: "10rem", marginLeft: "3rem"}}>
                            <img className="bg-dark rounded-circle img-thumbnail mt-3" style={{width: "10rem", height: "10rem"}}/>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>
                            <span className="bg-secondary p-1 px-4 rounded text-white text-center" style={{marginTop: "10rem", marginLeft:"4.5rem"}}>{id}</span>                            
                        </div>
                    </div>
                </div>

            </div>





            <div className="card dflex"
            style={{maxHeight: "20rem", maxWidth: "40rem",
                    marginTop: "-10rem", alignItems: "center",
                    marginLeft: "25rem", height:"15rem",
                    justifyContent: "center", display: "flex", textAlign: "center"}}>
                <div className="card-body dflex text-align-center"  style={{width : "15rem"}}>
                    <h6><u>FOLLOWERS ({followerData.length})</u></h6>
                    <p className="text-align-center"> 
                        {followerData.map(e => typeof e == "string"?<div>{e}</div> : "")}
                    </p>
                    <h6><u>FOLLOWING ({followingData.length})</u></h6>
                    <p className="text-align-center">
                        {followingData.map(e => typeof e == "string"?<div>{e}</div> : "")}
                    </p>
                    <h6><u>COINS</u></h6>
                    <p className="text-align-center">
                        {coinData.map(e => typeof e == "string"?<div>{e}</div> : "")}
                    </p>
                </div>
            </div>

            <div className="card dflex"
            style={{maxHeight: "10rem", maxWidth: "40rem",
                    marginTop: "10rem", alignItems: "center",
                    marginLeft: "25rem", height:"10rem",
                    justifyContent: "center", display: "flex", textAlign: "center"}}>
                <div className="card-body dflex text-align-center"  style={{width : "15rem"}}>
                    <p className="text-align-center">No posts to show!</p>
                </div>
            </div>


        </>

    )
}

export default ProfileP