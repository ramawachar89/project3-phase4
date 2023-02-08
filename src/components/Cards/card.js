import React, { useEffect, useState } from "react";
import cardStyle from "../Cards/card.module.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialog from "@mui/material/Dialog";
import CustomInputFields from "../../atoms/InputFields/input";
import CustomButton from "../../atoms/button/button";
import { Link, useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import { tweetData , updatedActiveProfile} from "../../atom";
//import { useRecoilValue,useRecoilState } from "recoil";
import img from '../Cards/3.jpg'
import { userDetails } from "../../constData";
// import defaultImage from './3.jpg';

export default function Card() {
  const tweetData=JSON.parse(localStorage.getItem("tweetData")) || [] ;
  const [data,setData]=useState(tweetData)
  console.log(data,"fromcarddddd")
  const[likes,setLikes]=useState(0)
  const[input , setInput] = useState("")
  //const [updateActiveData, setUpdateActiveData]=useRecoilState(updatedActiveProfile)

  
  
  const [isopenComment, setIsOpenComment] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [clickedIndex, setClickedIndex]=useState("")
 

  const navigate = useNavigate()

//useEffect(()=>{ console.log("useEffect running")},[updateActiveData])

 
function handleProfileIcon(index,item){
  // console.log(item.handlerName)
  // const updatedData= updateActiveData.splice(index,1)
  // setUpdateActiveData([...updatedData])
 // console.log(updateActiveData, "===============================")

    // navigate(`/tweetProfile?id=${item.id}`)
    //  data.splice(index,1)
     navigate(`/tweetProfile?handlerName=${item.handlerName}`)
}
let userName = JSON.parse(localStorage.getItem("userData"));
 function addReply(){
  const newReply=[{
    
    
    
      profileIcon: <img src={img} className={cardStyle.img}/>,
     name:`${userName[0].phoneNumber}`,
     handlerName: `@${userName[0].username}`,
    tweetReplyText: input
  
    
  }]
  localStorage.setItem("tweetreply",JSON.stringify(newReply))
    
    setInput("")
   const newData= data[clickedIndex].tweets.map((item)=>item.TweetReplies)
   console.log([...newData,newReply], "after spreading")
    // setData([newReply,...newData])
    // console.log(newData , "hihihihi")

  }

 
   
  
  // function handleLike(id) {
  //   const data = JSON.parse(localStorage.getItem("userDetails"));
  //   console.log(userDetails,"lllllllllllllll")
  //   const item = data.find((ele) => ele.id === id);
  //   setLikes(item.likes += 1)
  //   localStorage.setItem("userDetails", JSON.stringify(userDetails));
  //   console.log(item, "likes");
  // }
  // function handleLike(id) {
  //   const data = JSON.parse(localStorage.getItem("userDetails")) || [];
  //   const item = data.find((ele) => ele.id === id);
  //   if (!item) {
  //     console.error("Item not found in data");
  //     return;
  //   }
  //   item.likes += 1;
  //   localStorage.setItem("data", JSON.stringify(userDetails));
  //   console.log(item, "likes");
  // }
  
  function handleLike(id) {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data,"likesss")
    let item = data.find((ele) => ele.id === id);
    if (!item) {
      item = { id, likes: 0 };
      data.push(item);
    }else if(likes==65){
      setLikes(item.likes += 1)
    }else if(likes==66){
      setLikes(item.likes -= 1)
    }
   
    localStorage.setItem("data", JSON.stringify(data));
    console.log(item, "likes");
  }
  // function handleLike(index, item){

  //   const filteredData = data.filter((ele) => ele[0]); // get likes data
  //   filteredData[index][1] += 1;
  // }
    // const likess=data.filter((ele)=>ele[0])
    // console.log(likess,"likkkk")
   
    // const incr=data.filter((element)=>element.id===likes.id)
    // console.log(incr,"likessssssssss")
    // if(likes.id==100){
    //   setLikes(likes+1)
    // }else if(likes.id==101){
    //   setLikes(likes-1)
    // }



  function handleViews() {
    setViewOpen(true);
  }
console.log(clickedIndex,"CLICKEDindex")
  function handleComment(index) {
    setClickedIndex(index)
    setIsOpenComment(true);
  }

  function handleReply(inputReply){
console.log(inputReply)
setInput(inputReply)
  }

  function handleClose() {
    setIsOpenComment(false);
  }
  function handleDismiss() {
    setViewOpen(false);
  }
  function handleTweet(index,item){
    // data.splice(index,1)
    navigate(`/tweetReplies?id=${item.id}`)

  }
 
  
    return (
        <>
        {isViewOpen ?
      <Dialog
        open={isViewOpen}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "3rem",
          },
        }}
      >
        <h1>Views</h1>
        <p>
          Times This Tweet was seen.To learn more, visit the{" "}
          <Link style={{ color: "black", fontWeight: "800" }}>Help Center</Link>
        </p>
        <CustomButton
          btnVal="Dismiss"
          onClicking={handleDismiss}
          style={{
            marginLeft: "4rem",
            marginTop: "2rem",
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            fontSize: "1.5rem",
            width: "20rem",
          }}
        />
      </Dialog> :""}

  
 
    
        
        {isopenComment?

      <Dialog
        open={isopenComment}
        PaperProps={{
          style: {
            borderRadius: "20px",
            marginBottom: "18em",
          },
        }}
      >
        <div className={cardStyle.dailog}>
          <CustomInputFields
            abc="Tweet Your Reply"
            style={{
              padding: "5rem",
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
            }}
            handleChange={handleReply}
               value={input}
          />
          <div className={cardStyle.btn}>
            <CustomButton
              btnVal="Reply"
              style={{
                backgroundColor: " rgb(11, 109, 220)",
                color: "white",
                width: "7rem",
                borderRadius: "20px",
              }}
               onClicking={addReply}
            />
          </div>
          <CustomButton
            btnVal="Close"
            style={{ marginTop: "3rem", fontWeight: "800" }}
            onClicking={handleClose}
          />
        </div>
      </Dialog> :""}
   

 
    <div>
      
      {data.map((item,index) => (
         <div className={cardStyle.main}>
         <div className={cardStyle.navContainer}>
           <div className={cardStyle.container}>
             
             <div onClick={()=>handleProfileIcon(index,item)}>
             <img src={img} className={cardStyle.img1}/>
             </div>
             <div className={cardStyle.name}>{item.name} </div>
             <VerifiedIcon />
             {item.handlerName}
           </div>

           <div className={cardStyle.more}><MoreHorizIcon /></div>
         </div>
         <div className={cardStyle.component2} onClick={()=>handleTweet(index,item)}>
         <div className={cardStyle.img_caption}>
           <div className={cardStyle.caption}> {item.tweetText}</div>
           
           {
             item.tweetPic ?

             <img
             src={item.tweetPic}
             alt="Image Here"
             className={cardStyle.img}
           />
           : 
            null
         
       
           }
           </div>
           
         </div>
         <div className={cardStyle.icons}>
           <div onClick={handleComment}><ChatBubbleOutlineIcon /></div>
           <div>
           <SwapCallsIcon />
           {item.retweetCount}
            
           </div>
           <div onClick={()=>handleLike(index,item)}>
           <FavoriteBorderIcon />
             {likes}
           </div>
           <div onClick={handleViews}>
           <EqualizerIcon />
           {item.views}
           </div>
           <IosShareIcon />
           </div>
       
         
       </div>
      ))}
      
    </div>
    <div>
      
      {userDetails.map((item,index) => (
         <div className={cardStyle.main}>
         <div className={cardStyle.navContainer}>
           <div className={cardStyle.container}>
             
             <div onClick={()=>handleProfileIcon(index,item)}>
             <img src={img} className={cardStyle.img1}/>
             </div>
             <div className={cardStyle.name}>{item.name} </div>
             <VerifiedIcon />
             {item.handlerName}
           </div>

           <div className={cardStyle.more}><MoreHorizIcon /></div>
         </div>
         <div className={cardStyle.component2} onClick={()=>handleTweet(index,item)}>
         <div className={cardStyle.img_caption}>
           <div className={cardStyle.caption}> {item.tweetText}</div>
           
           {
              item.tweets[0].tweetPic ?

              <img
              src={item.tweets[0].tweetPic}
              alt="Image Here"
              className={cardStyle.img}
            />
            : 
             null
          
        
            }
           </div>
           
         </div>
         <div className={cardStyle.icons}>
           <div onClick={handleComment}><ChatBubbleOutlineIcon /></div>
           <div>
           <SwapCallsIcon />
           {item.retweetCount}
            
           </div>
           <div onClick={()=>handleLike(index,item)}>
           <FavoriteBorderIcon />
             {likes}
           </div>
           <div onClick={handleViews}>
           <EqualizerIcon />
           {item.views}
           </div>
           <IosShareIcon />
           </div>
       
         
       </div>
      ))}
      
    </div>
 </>
 
 
 )

}