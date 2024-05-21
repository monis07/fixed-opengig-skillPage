import {useState,useEffect,useRef, ChangeEvent} from 'react'
import './App.scss'
import globe from './assets/globe.svg'
import github from './assets/github.svg'
import gmail from './assets/Gmail.svg'
import linkedin from './assets/linkedin.svg'
import phone from './assets/phone.svg'
import user from './assets/user.svg'
import mesh from './assets/mesh.svg'

function App() {
  const [links,setLinks] = useState([
    {
    name:"LinkedIn",
    link:"https://www.linkedin.com/in/",
    svg:linkedin
  },{
    name:"Website",
    link:"https://",
    svg:globe
  },{
    name:"GitHub",
    link:"https://www.github.com/",
    svg:github
  },
  {
    name:"Phone",
    link:"tel:",
    svg:phone
},{
  name:"G-Mail",
  link:"mailto:",
  svg:gmail
}
])
const originalLinks = [
  {
  name:"LinkedIn",
  link:"https://www.linkedin.com/in/",
  svg:linkedin
},{
  name:"Website",
  link:"https://",
  svg:globe
},{
  name:"GitHub",
  link:"https://www.github.com/",
  svg:github
},
{
  name:"Phone",
  link:"tel:",
  svg:phone
},{
name:"G-Mail",
link:"mailto:",
svg:gmail
}
]

interface Link{
  name:string,
  link:string,
  svg:string
}

const [updatedLinks,setupdatedLinks] = useState<Link[]>([])
  const [linkName,setlinkName]=useState('Profile Link')
  const [link,setLink]=useState('Select a profile to continue')
  const [visibile,setVisibile]=useState("none")
  const [selected,setselectedLink]=useState("")
  const mainCardRef = useRef(null);
  const backgroundCard1Ref = useRef(null);
  const backgroundCard2Ref = useRef(null);

  useEffect(() => {
    if (mainCardRef.current) {
      const mainCard:HTMLElement = mainCardRef.current;
      let { width, height } = mainCard.getBoundingClientRect();

      width=width+45;
      height=height+45;

      if (backgroundCard1Ref.current) {
        const backgroundCard1:HTMLElement = backgroundCard1Ref.current;
        backgroundCard1.style.width = `${width}px`;
        backgroundCard1.style.height = `${height}px`;
      }

      if (backgroundCard2Ref.current) {
        const backgroundCard2:HTMLElement = backgroundCard2Ref.current;
        backgroundCard2.style.width = `${width}px`;
        backgroundCard2.style.height = `${height}px`;
      }
    }
  }, [updatedLinks]); 
  
  const handleClick=(name:string,link:string)=>{
    setlinkName(name)
    setLink(link)
    setVisibile("none")
    setselectedLink(name)
  }

  const handleChange=(e:ChangeEvent<HTMLInputElement>,checklinkName:string)=>{
    let value:string="";
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


  const handleDone=()=>{
    let count=0;
    const newLink={
      name:linkName,
      link:link,
      svg:linkName==="GitHub"?github:linkName==="LinkedIn"?linkedin:linkName==="Website"?globe:linkName==="Phone"?phone:linkName==="G-Mail"?gmail:globe
    }
    updatedLinks && updatedLinks.map((link:{name:string,link:string})=>{
      if(link.name === newLink.name){
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

  const handleEdit=(event:React.MouseEvent<HTMLButtonElement>,edit:{link:string,name:string})=>{
    setLink(edit.link)
    setlinkName(edit.name)
    setselectedLink(edit.name)
  }

  const handleDelete=(event:React.MouseEvent<HTMLButtonElement>,del:{name:string})=>{
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
        <p style={{fontSize:"0.8rem"}}>Step 5 of 6</p>
        <p style={{fontSize:"1.6rem",fontWeight:"600"}}>Boost your Credibility</p>
        <p style={{fontSize:"0.9rem"}}>GitHub and at least 1 DSA platform is required</p>

        <div className='app__updatedLinks'>
        {updatedLinks && updatedLinks.map((link)=>(
          <div className='singleLink'>
          <div className='singleLinkName'>
            <div className='singleLinkNamely'>
            <img src={link.svg} alt="globe" width={24} height={24}/>
            <p>{link.name}</p>
            </div>
            <p>{link.link}</p>
          </div>
          <div className='singleLinkSymbol'>
            <button onClick={(event:React.MouseEvent<HTMLButtonElement>)=>handleEdit(event,link)}>Edit</button>
            <button onClick={(event:React.MouseEvent<HTMLButtonElement>)=>handleDelete(event,link)}>Delete</button>
          </div>
        </div>
        ))}
      </div>

        <div className='app__all-links'>
          {links.map((link)=>(
              <div className='link' style={{cursor:"pointer",borderColor:selected === link.name?"black":"grey"}} onClick={()=>handleClick(link.name,link.link)}>
              <div className='plus' style={{color:selected === link.name?"black":"grey",fontWeight:"500",borderColor:selected === link.name?"black":"grey"}}>+</div>
              <p className='link-name' style={{color:selected === link.name?"black":"grey"}}>{link.name}</p>
            </div>
          ))}
      </div>
      <div className='input__box'>
        <p style={{fontSize:"1.1rem"}}>{linkName}</p>
      <input type="text" value={link} onChange={(event)=>handleChange(event,linkName)}/>
      </div>
      <button style={{display:visibile}} onClick={handleDone}
      className='app__done-button'
      >Done</button>
    </div>

    <div className='app__card' style={{
      backgroundImage:`url(${mesh})`,
      backgroundSize:"cover",
      backgroundPosition:"50%",
      backgroundRepeat:"no-repeat",
      backgroundColor:"black"
    }}>
    <div className='background-card rotated-card1' ref={backgroundCard1Ref}></div>
    <div className='background-card rotated-card2' ref={backgroundCard2Ref}></div>
      <div className='app__main-card3' ref={mainCardRef}>
        <div className='intro'>
        <img src={user} alt="" width={80} height={80}/>
        <div className='name_position'>
        <p style={{fontSize:"28px",display:"inline-block",color:"#8f3b76",fontWeight:"600"}}>Monis Azeem</p>
        <p style={{fontSize:"0.9rem",display:"inline-block"}}>Full Stack developer</p>
        </div>
        </div>
        

        <p style={{fontSize:"0.9rem",display:"inline-block",margin:0,marginTop:"1rem"}}>Skills</p>
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
        <p style={{fontSize:"0.9rem",display:"inline-block",margin:0,marginTop:"1rem"}}>Social Handles</p>
        <div className='app__socials'>{
          updatedLinks && updatedLinks.map((link)=>(
            <div className='app__social'>
              <a href={link.link} target='_blank'><img src={link.svg} alt={link.name} width={24} height={24}/></a>          
            </div>
          ))
          }</div>
      </div>
    </div>

    </div>
    </div>
    </>
  )
}



export default App
