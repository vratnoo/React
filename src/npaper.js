import React,{useCallback,useState,useRef,useEffect,useLayoutEffect} from 'react'
import './App.css'
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


//helper function to make focus curser at the end of element
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}


function Paper(argument) {
	const ref = useRef({})
	const [isenter,setEnter]  = useState(null)
	const [isDeleted,setDelete]  = useState(false)
	const [direction,setTop]  = useState({top:null})
	const [showhandle,setHandle]  =  useState(false)
	const [handleId,setHandleId]  = useState(null)

	const [list,setList] = useState([
	{id:1,text:"Untitld",type:"Heading"},
	{id:Date.now(),text:"Write Something Here",type:"Paragraph"}
		])

	const handleKeyDown =  useCallback((e)=>{

		console.log(e.keyCode)
		const type = "Paragraph"
		const menuId = e.target.id
		let updatedlist = list.slice()
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
		setEnter(newItem.id)
		}else if(e.target.innerText.length===0 && e.keyCode===8){
			let focusid = null
			updatedlist  = updatedlist.filter((item,index)=>{
				
				if(item.id==menuId && updatedlist.length>1){
					focusid  = updatedlist[index-1].id
					return false
				}else{
					return true
				}
				
			})
			console.log(updatedlist)
			setList(updatedlist)
			setEnter(focusid)
		}
		


	});

	const setref = (elem,id)=>{
		ref.current[id] = elem
		console.log(ref.current)

		}



	 useEffect(() => {
	
    	if(isenter!==null){
    		// ref.current[isenter].focus()
    		setEndOfContenteditable(ref.current[isenter])
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

	const handlemouseover = (e)=>{
		
		setHandleId(e.target.id)
		// console.log(handleId)
	}
	const handleMouseLeave = (e)=>{
		setHandleId(null)
	}
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
		let gridhand = ""
		if(handleId!==null && handleId==item.id){
	 		gridhand = (<div style={{opacity:1}}><div id={item.id} onClick={handleclick}  className="gridhand"><img src={logo}/></div></div>)
			
		}
		return (<div style={{position:'relative'}} onMouseLeave={handleMouseLeave} onMouseOver={handlemouseover} id={item.id} key={item.id} >
			
<div  ref={(elem)=>setref(elem,item.id)}  id={item.id} onKeyDown={handleKeyDown}  contentEditable="true" placeholder={item.text} className={"data-block "+item.type}>

</div>

{gridhand}

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