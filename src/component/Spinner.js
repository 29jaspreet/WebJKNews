import React  from 'react'
import Loading from './Loading.gif'
  const Spinner=()=>{
    return (
      <div className='text-center' > 
        <img src={Loading} alt="Loading" style={{maxWidth:"59px", marginTop:"60px"}} />
      </div>
    )
  
}

export default Spinner
