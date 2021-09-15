import React,{useEffect} from 'react';
import { Button } from 'react-bootstrap';

const BidButton = (props)=>{

    

       

if(props.ready){
    return (
        <Button
        variant={props.variant}
        onChange={props.onchange}
        onClick={props.onClick}
        className={props.className}
  
        
        >
       Next Bid: {props.nextBid}
       <br />
       Currently at {props.currentBid}

        </Button>
      );

}
if(props.ready==false){
  return(
    <Button
    variant={props.variant}
    onChange={props.onchange}
    className={props.className}

    
    >
Bid Close 

    </Button> 
  )
}
  

else{
    return (
        <Button
        variant={props.variant}
        onChange={props.onchange}
        
        >
          Waiting!!!


        </Button>
      );


}
 
}

export default  BidButton ;
