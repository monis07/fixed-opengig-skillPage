import {useState} from 'react'
import './App.scss'

function App() {
  const [links,setLinks] = useState([
    {
    name:"LinkedIn",
    link:"https://www.linkedin.com/in/"
  },{
    name:"Website",
    link:"https://"
  },{
    name:"GitHub",
    link:"https://www.github.com/"
  },
  {
    name:"Phone",
    link:""
},{
  name:"G-Mail",
  link:""
}
])
const originalLinks = [
  {
  name:"LinkedIn",
  link:"https://www.linkedin.com/in/"
},{
  name:"Website",
  link:"https://"
},{
  name:"GitHub",
  link:"https://www.github.com/"
},
{
  name:"Phone",
  link:""
},{
name:"G-Mail",
link:""
}
]

const [updatedLinks,setupdatedLinks] = useState([])
  const [linkName,setlinkName]=useState('Profile Link')
  const [link,setLink]=useState('Select a profile to continue')
  const [visibile,setVisibile]=useState("none")
  
  const handleClick=(name:string,link:string)=>{
    setlinkName(name)
    setLink(link)
    setVisibile("none")
  }

  const handleChange=(e:any,checklinkName:string)=>{
    let value;
    originalLinks.map((link)=>{
      if(link.name===checklinkName)
        value=link.link
    })
    const newValue=e.target.value
    if(newValue.startsWith(value) && newValue.length > value.length){
      setLink(newValue)
      setVisibile("block")
    }
    else if(newValue.length === value.length){
      setLink(newValue)
      setVisibile("none")
    }
  }

  let count=0;

  const handleDone=()=>{
    const newLink={
      name:linkName,
      link:link
    }
    updatedLinks && updatedLinks.map((link)=>{
      if(link.name===newLink.name){
        link.name=newLink.name
        link.link=newLink.link
        setupdatedLinks([...updatedLinks])
        count+=1;
      }
    })
    if(count===0){
    setupdatedLinks([...updatedLinks,newLink])
    links.map((link)=>{
      if(link.name===linkName){
        const newLinks=links.filter((link)=>link.name!==linkName)
        setLinks([...newLinks])
      }
    
    })
    }
  }

  const handleEdit=(event,edit)=>{
    setLink(edit.link)
    setlinkName(edit.name)
  }

  const handleDelete=(event,del)=>{
    originalLinks.map((link)=>{
      if(link.name===del.name){
        setLinks([...links,link])
        const newUpdate=updatedLinks.filter((link)=>link.name!==del.name)
        setupdatedLinks([...newUpdate])
      }
    })
  }

  return (
    <>
    <div className='app__main'>
      <div className='app__links'>
        <p>Step 5 of 6</p>
        <h1>Boost your credibility</h1>
        <p>GitHub and at least 1 DSA platform is required</p>
        <div className='app__updatedLinks'>
        {updatedLinks && updatedLinks.map((link)=>(
          <div className='singleLink'>
          <div className='singleLinkName'>
            {/* <svg></svg> */}
            <p>{link.name}</p>
            <p>{link.link}</p>
          </div>
          <div className='singleLinkSymbol'>
            <button onClick={(event)=>handleEdit(event,link)}>Edit</button>
            <button onClick={(event)=>handleDelete(event,link)}>Delete</button>
          </div>
        </div>
        ))}
      </div>
        <div className='app__all-links'>
          {links.map((link)=>(
              <div className='link' style={{cursor:"pointer"}}onClick={()=>handleClick(link.name,link.link)}>
              <div className='plus'>+</div>
              <p className='link-name'>{link.name}</p>
            </div>
          ))}
      </div>
      <div className='input__box'>
        <p>{linkName}</p>
      <input type="text" value={link} onChange={(event)=>handleChange(event,linkName)}/>
      </div>
      <button style={{display:visibile}} onClick={handleDone}>Done</button>
    </div>

    <div className='app__card'>
      <div className='app__main-card'>
        <h1>Monis Azeem</h1>
        <p>Full Stack developer</p>

        <h1>Skills</h1>
        <div className='skills' style={{display:"flex",flexDirection:"row"}}>
        <p>TypeScript</p>
        <p>React.js</p>
        <p>Next.js</p>
        <p>Sass</p>
        <p>Node.js</p>
        <p>Express.js</p>
        <p>MongoDB</p>
        </div>

        <div>
          {updatedLinks && updatedLinks.map((link)=>(
            <a href={link.link} target='_blank'  style={{margin:"1rem"}}>{link.name}</a>
          ))}
        </div>
        
      </div>
    </div>

    </div>
    </>
  )
}

let value;


export default App
