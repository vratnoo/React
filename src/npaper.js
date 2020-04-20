import React,{useCallback,useState} from 'react'
function Handle({top,handleSelect,hId}){
	console.log(top)
	const style = {top:top+"px"}
	return (<div style={style} className="handle">
	<div id={hId} onClick={handleSelect} data-type="Heading" className="handlemenu">
		Heading
	</div>
		<div id={hId} onClick={handleSelect} data-type="paragraph" className="handlemenu">
		paragraph
	</div>


	</div>)
}
function Paper(argument) {
	const [direction,setTop]  = useState({top:null})
	const [list,setList] = useState([
		{id:"3",text:"this is super coder",type:"Heading"},
		{id:"7",text:"Another supercoder",type:"paragraph"}

	])

	const handleclick = useCallback((e)=>{
		const offsetTop = window.scrollTop
		console.log(offsetTop)
		const dir = e.target.getBoundingClientRect()
		
		setTop({top:dir.top+offsetTop,id: e.target.id})

	});

	const handleselectmenu = useCallback((e)=>{
			console.log(e.target.id)
		 const updatelist = list.slice()
		 const dtype = e.target.dataset.type

		 const newElem = {id:Date.now(),text:"New Element "+dtype,type:dtype}
		 console.log("start")
		list.every((item,index)=>{
			if(item.id==e.target.id){
				console.log("nested")
				updatelist.splice(index+1,0,newElem)
				return false

				
			}
			return true
		})
		console.log(updatelist)
		setList(updatelist)
	
	
	})
		


	// body...
	let elem = ""
	if(direction.top){
		elem = <Handle handleSelect={handleselectmenu} hId={direction.id} top={direction.top}/>
	}
	return (<div>
			{elem}
			<Npaper  list={list} onCheck={handleclick}/>
	</div>)

}
function DataBlock({onCheck,children,id}){
	return (<div onClick={onCheck} id={id} className="data-block">
					  		{children}
					  	</div>)
}
function Npaper({onCheck,list}) {


	
const elems = list.map((item,index)=>{
	return ( <DataBlock id={item.id} onCheck={onCheck}>{item.text}</DataBlock>)
})
	return (<div className="container">
				<div className="row">
					<div className="col">
					 <div className="main">
					  	{elems}
					 

					 </div>
					</div>
				</div>
		</div>)
}
export default Paper