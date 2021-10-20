import React from 'react';

const BidMessage = (props) => {

    
if(props.bidstatus==1){
   return(
    <p>Going Once</p>
   )
}


if(props.bidstatus==2){
   return(
    <p>Going Twice</p>
   )
}

if(props.bidstatus==3){
   return(
    <p>Going Three</p>
   )
}

 
}

export default  BidMessage ;
