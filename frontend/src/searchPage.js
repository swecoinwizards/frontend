import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/home.css"
import Select from "react-select"


// search page that comes up after searching for coin/user/post
// would show user + img or coin+logo or post snippet

function SearchPage() {
    const [word, setWord] = useState("")
    const [menuData, setMenuData] = useState([{}])

    console.log("word:",word)

    useEffect(() => {
      fetch("/options").then(
        res => res.json()
      ).then(
          data => {
            setMenuData(data)
        }            
      ). catch((error) => {
        console.error("Error: ", error)
      })
    }, [])
    let options = [{value:"All", label:"All"}]
    if(typeof menuData == "undefined"){    
      for(let i=0; i< menuData["Choices"].length;i++){
        options.push({values: menuData["Choices"][i]["value"], label: menuData["Choices"][i]["label"]})
      }
    }
    return (
      <>
        <NavBar/>
        <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
            <Form className="d-flex justify-content-center">
              <Select options={options}/>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
        </div>

        <div>
          <h3>Users</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>

          </div>

          <h3 style={{marginTop:"5vh"}}>Coins</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>
            
          </div>
        </div>
        
      </>
    )
  }
  
  export default SearchPage