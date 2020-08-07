import React, { useEffect, useState, Link } from "react";
// import { PromiseProvider } from "mongoose";
// import { prompts } from "../../scripts/seedDB"
import Voice from "../components/voice";
import API from "../utils/API";
import List from "../components/List";
import ListItem from "../components/ListItem";



function WordEntry() {

    const[stories, setStories] = useState([])
   
    //when page loads we need blanks for each prompt from the seedDB

    useEffect(()=> {
        getAllStories()
    }, [])

    function getAllStories() {
        API.getTemplates()
          .then(res => {
              console.log(res)
              setStories(res.data)
            })
          .catch(err => console.log(err));
      }
    

    return(
        // <div>
        //     <p>inputs for each blank</p>

        //     {stories.length ? (
        //       <List>
        //         {stories.map(story => {
        //           return (
        //             <ListItem key={story._id}>
                     
        //              <input type="text" class="form-control" placeholder= {story.prompts} aria-label="word" aria-describedby="basic-addon1" />
                    
        //             </ListItem>
        //           );
        //         })}
        //       </List>

        //     ):(
        //         <h3>Story can't be found</h3>
            
        //     )}
      
        //     <Voice />

        //     <Link to = "/create">
        //         Generate my (fill in name)
        //     </Link>
        // </div>

        <div>
            hello
            <p>inputs for each blank</p>
        </div>
    );
}

export default WordEntry;