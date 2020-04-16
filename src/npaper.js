import React,{useCallback,useState} from 'react'
function Handle({top}){
	console.log(top)
	const style = {top:top+"px"}
	return (<div style={style} className="handle">
	<div className="handlemenu">
		Heading
	</div>
		<div className="handlemenu">
		paragraph
	</div>


	</div>)
}
function Paper(argument) {
	const [direction,setTop]  = useState({top:null})

	const handleclick = useCallback((e)=>{
		const dir = e.target.getBoundingClientRect()
		// console.log(dir.top)
		// console.log(e.clientY)
		// console.log("clicked")
		setTop({top:dir.top})
		// console.log(top)
	});
	// body...
	let elem = ""
	if(direction.top){
		elem = <Handle top={direction.top}/>
	}
	return (<div>
			{elem}
			<Npaper  onCheck={handleclick}/>
	</div>)

}
function Npaper({onCheck}) {
	

	return (<div className="container">
				<div className="row">
					<div className="col">
					 <div className="main">
					  	<div onClick={onCheck} id="1" className="data-block">
					  		 sdsd
					  	</div>
					  	<div onClick={onCheck} id="2" className="data-block">
					  		 sdsd
					  	</div>
					  	<div onClick={onCheck} id="3" className="data-block">
					  		 sdsd
					  	</div>
					  	<div onClick={onCheck} id="4" className="data-block">
					  		 sdsd
					  	</div>

					 </div>
					</div>
				</div>
		</div>)
}
export default Paper