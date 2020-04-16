import React,{useRef} from 'react'
import { useDrag,useDrop} from 'react-dnd'
const ItemType  =  {
  CARD: 'card',
}



function Basic({id,index,content}) {
	//making ref 
	const ref  = useRef(null)
	// Managning Drop Functionulity here
	const [{isOver},drop] = useDrop({
		accept:ItemType.CARD,
		drop(item,monitor){
			
			const rect = ref.current.getBoundingClientRect()
			const verticlemiddle  = (rect.bottom-rect.top)/2
			console.log(verticlemiddle)
			console.log(monitor.getClientOffset().y-rect.top)
			console.log(item.id)
		},
		hover(item,monitor){
			const draggedindex  = index
			const hoverindex  = item.index 
			if(draggedindex==hoverindex)return

			const rect = ref.current.getBoundingClientRect()
			const verticlemiddle  = (rect.bottom-rect.top)/2
			const current_y = monitor.getClientOffset().y-rect.top
			console.log(isOver)
			if(isOver){
				if(current_y<verticlemiddle){
			
							console.log("upper")
							ref.current.classList.remove("bottom-hover")
							ref.current.classList.add("top-hover")
			
						}else{
							ref.current.classList.remove("top-hover")
							ref.current.classList.add("bottom-hover")
							console.log("lower")
						}
			}else{
				ref.current.classList.remove("bottom-hover")
				ref.current.classList.remove("top-hover")
			}

		},
		collect(monitor){
			return {isOver:monitor.isOver()}

		}

	})

	const  [{ isDragging }, drag] = useDrag({
		item:{id,index,type:ItemType.CARD},
		end:(item,monitor)=>{
			console.log(monitor)
		},
		collect: (monitor) => ({
      		isDragging: monitor.isDragging(),
    	}),

	})
	
	drag(ref)
	drop(ref)
	return( <div className="cardstyle" ref={ref} >
      {content}
    </div>)
}

export default Basic