import React,{useCallback,useState,useRef,useEffect} from 'react'
import './app.css'
import logo from './grid.png'


function Handle({top,hid,onMenuClick}){
	console.log(top)
	const style = {top:top+"px"}
	return (<div style={style} className="handle">
	<div id={hid} onClick={onMenuClick} data-type="Heading" className="handlemenu">
		Heading
	</div>
<div id={hid} onClick={onMenuClick} data-type="Paragraph" className="handlemenu">
		Paragraph
	</div>
	<div id={hid} onClick={onMenuClick} data-type="Quote" className="handlemenu">
		Quote
	</div>
		


	</div>)
}
function Paper(argument) {
	const ref = useRef(null)
	const [isenter,setEnter]  = useState(false)
	const [direction,setTop]  = useState({top:null})

	const [list,setList] = useState([
	{id:Date.now(),text:"Untitld",type:"Heading"},
	{id:Date.now(),text:"Write Something Here",type:"Paragraph"}
		])
	const handleKeyDown =  useCallback((e)=>{

		console.log(e.keyCode)
		const type = "Paragraph"
		const menuId = e.target.id
		const updatedlist = list.slice()
		const newItem =  {id:Date.now(),text:type+" New Dummy",type:type}

		if(e.keyCode===13){
			 e.preventDefault();
  			 e.stopPropagation();
			console.log("Enterd")

			updatedlist.every((item,index)=>{
				
			if(item.id==menuId){
				updatedlist.splice(index+1,0,newItem)
				return false
			}
			return true
		})
		console.log(updatedlist)
		setList(updatedlist)
		setEnter(true)
		}/*else if(e.keyCode){

			list.every((item,index)=>{
				
			if(item.id==menuId){
				console.log(item.id,menuId,index)
				  updatedlist[index].text = e.target.innerText

				return false
			}
			return true
		})

			 console.log(updatedlist)
			 setList(updatedlist)

		}*/


	});

	 useEffect(() => {
    ref.current.focus();
    console.log(ref.current.parentNode.previousSibling)
    setEnter(false)
    return () => {
    console.log(ref.current.id);
  }

  },[isenter]);

	const handleclick = useCallback((e)=>{
		
    	console.log(e.currentTarget);
		const dir = e.currentTarget.getBoundingClientRect()
		// console.log(dir.top)
		// console.log(e.clientY)
		// console.log("clicked")
		setTop({top:dir.y,id:e.currentTarget.id})
		// console.log(e.target)
		// console.log(top)
	});
	const handleMenuClick  = useCallback((e)=>{

		const type = e.target.dataset.type
		const menuId = e.target.id
		const updatedlist = list.slice()
		const newItem =  {id:Date.now(),text:type+" New Dummy",type:type}
		updatedlist.every((item,index)=>{
			if(item.id==menuId){
				updatedlist.splice(index+1,0,newItem)
			}
			return true
		})
		console.log(updatedlist)
		setList(updatedlist)
	});
	// body...
	let elem = ""
	if(direction.top){
		elem = <Handle top={direction.top} hid={direction.id} onMenuClick={handleMenuClick}/>
	}

	const paper =  list.map((item,index)=>{

		return (<div key={item.id} >
			<div id={item.id} onClick={handleclick}  className="gridhand"><img src={logo}/></div>
<div  ref={ref} id={item.id} onKeyDown={handleKeyDown}  contentEditable="true" placeholder={item.text} className={"data-block "+item.type}>

</div>

			</div>)
	})
	return (<div>
			{elem}
		
			<div className="container">
				<div className="row">
					<div className="col">
					 <div className="main">
					
					 {paper}
					 </div>
					 
					</div>
				</div>
		</div>
	</div>)

}

export default Paper