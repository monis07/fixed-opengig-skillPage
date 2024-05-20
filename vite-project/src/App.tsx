import {useState} from 'react'
import './App.scss'

function App() {
  const links = [
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
  const [linkName,setlinkName]=useState('Profile Link')
  const [link,setLink]=useState('Select a profile to continue')
  
  const handleClick=(name:string,link:string)=>{
    setlinkName(name)
    setLink(link)
  }

  const handleChange=(e:any,checklinkName:string)=>{
    let value;
    links.map((link)=>{
      if(link.name===checklinkName)
        value=link.link
    })
    const newValue=e.target.value
    if(newValue.startsWith(value))
      setLink(newValue)
  }

  return (
    <>
    <div className='app__main'>

      <div className='app__links'>
        <p>Step 5 of 6</p>
        <h1>Boost your credibility</h1>
        <p>GitHub and at least 1 DSA platform is required</p>
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
      {}
      <button>Done</button>
    </div>

    <div className='app__card'></div>

    </div>
    </>
  )
}

let value;


export default App
