import React from 'react'

const NewsItem =(props)=> {
    let {title,description,imageUrl, newsUrl ,author,date,source} =props;
    return (
      <div className=' my-3'>
        <div className="card" style={{width: "18rem"}}>
         
  <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2024/02/26/1600x900/SHOUVIK_STORY_1708959564216_1708959568398.jpeg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}   <span class="badge text-bg-warning"> 
{source}  </span></h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {!author?"unknown":author} updated at {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href = {newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem
