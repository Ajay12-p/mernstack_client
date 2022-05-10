// import { useContext } from "react";


const ParallaxBG =({url, children ="MERNCAMP"})=>{

    return(
      <div className="container-fluid"
         style={{backgroundImage:"url("+ url + ")",
         backgroundAttachment:"fixed",
         padding:"100px 0 px 75px",
         backgroundRepeat:"no-repeat",
         backgroundSize:"cover",
         backgroundPosition:"center center",
         display:"block",

         }}  
          
          
          >
           <div className="row">
               <div className="col">
                   <h1 className="desplay-1 text-center py-5  text-light">{children}</h1>

                   
                 
               </div>
           </div>

      </div>
        

    );
    
};
export default ParallaxBG;