import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import "./css/follow.css"

function FollowingP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followingData, setFData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])

    useEffect(() => {
		axiosInstance.get(`/users/followings/${id}`).then(
			res => res.data
		).then(
			data => {
				setFData(data["Data"][id]["followings"])
                setValidUser(true)
                setLoading(false)
			}            
		). catch((error) => {
            console.log(error)
			setValidUser(false)
            setLoading(false)
		})
	}, [])

    return (
        <>
            {loading ? (
                <div id="profilePage">
                    <NavBar/>
                    LOADING...
                </div>
            ) : validUser ? (
                <div id="profilePage">
                    <NavBar/>
                    <div id="pageTemp" className="container-fluid">
                        <h1 id="headerTemp">{id + "'s Followings"}</h1>
                        <p id="listTemp" className="text-align-center"> 
                            {followingData.map(e => typeof e == "string"?<><a id="itemTemp" href={"/Profile/"+e}>{e}</a><br/></> : "")}
                        </p>
                    </div>
                </div>
                ) : (
                <div id="profilePage">
                    <NavBar/>
                    <div className="container-fluid" id="errorProfile">
                        User not found!
                    </div>
                </div>
            )}
        </>
    )
}

export default FollowingP