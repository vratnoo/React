import React,{useRef} from "react";
import Menu from "./menu";
import { useDrag, useDrop } from "react-dnd";
import logo from "../grid.png";
const ItemTypes  = {
	CARD:"card"
}
function Datablock(props) {


	const {
	direction,
	handleMenuClick,
	list,
	handleId,
	handleclick,
	handleMouseEnter,
	setref,
	handleKeyDown,

} =  props

	// body...
	let elem = "";
	if (direction.top) {
		elem = (
			<Menu
				top={direction.top}
				hid={direction.id}
				onMenuClick={handleMenuClick}
			/>
		);
	}

	const paper = list.map((item, index) => {
		return <div key={item.id}>{elem}<Card item={item} index={index} {...props}/></div>
	});

	return paper;
}

function Card(props) {
	const {
	item,
	index,
	handleId,
	direction,
	handleclick,
	handleMouseEnter,
	setref,
	handleKeyDown,
	moveCards,
	handleChange,
	handleFocus
} = props;
	//drop
	const ref = useRef(null)
	const [drop_props, drop] = useDrop({
		accept:ItemTypes.CARD,
		drop(item,monitor){
			const draggedIndex  = item.index
			const hoverdIndex  = index
			if(draggedIndex==hoverdIndex){
				return
			}
			

			const BoundingClientRect  = ref.current.getBoundingClientRect()
			const verticlemiddle = (BoundingClientRect.bottom-BoundingClientRect.top)/2+BoundingClientRect.top
			
			if(monitor.getClientOffset().y<verticlemiddle){
					if(draggedIndex!=hoverdIndex-1){
				console.log("UPPER")
				console.log("droped item")
				 moveCards(draggedIndex,hoverdIndex)
				}
			}else{
				if(draggedIndex!=hoverdIndex+1){
				moveCards(draggedIndex,hoverdIndex+1)
				console.log("Neeche")
				console.log("droped item")
			}
			}
			
			
			
			return {name:"dustmit",some:"Something"}
		},
		hover(item, monitor){
			console.log("hoverd")
			const draggedIndex  = item.index
			const hoverdIndex  = index
			if(draggedIndex==hoverdIndex){
				return
			}
		
			
			const BoundingClientRect  = ref.current.getBoundingClientRect()
			const verticlemiddle = (BoundingClientRect.bottom-BoundingClientRect.top)/2+BoundingClientRect.top
			
			
			if(monitor.getClientOffset().y<verticlemiddle){
				console.log("UPPER HE BAY")
				ref.current.classList.remove("bottom-hover")
				ref.current.classList.add("top-hover")
				
			}else{
				console.log("Nihce HE BAY")
				ref.current.classList.remove("top-hover")
				ref.current.classList.add("bottom-hover")
				
			}

			
		},
		collect:(monitor)=>({
			isOver:monitor.isOver(),
			canDrop:monitor.canDrop()
		})
	})

	//drag
	const [{isDragging},drag,preview] = useDrag({
		item:{id:item.id,type:ItemTypes.CARD,index:index},
		begin:(monitor)=>{

		},
		end:(monitor)=>{

		},
		collect:(monitor)=>{
			return {isDragging:monitor.isDragging()}
		}

	})

	let gridhand = "";
		let todoelem = "";
		if (handleId !== null && handleId == item.id) {
			gridhand = (
				<div style={{ opacity: 1 }}>
					<div
						id={item.id}
						onClick={handleclick}
						className="gridhand"
					>
						<img src={logo} />
					</div>
				</div>
			);
		}
		if (item.type === "Todo") {
			todoelem = (
				<input
					type="checkbox"
					className="check"
					defaultChecked={item.done}
					name="checkit"
				/>
			);
		}
		drop(ref)
		drag(ref)

			if(!props.isOver && ref.current){
		
		ref.current.classList.remove("bottom-hover")
		ref.current.classList.remove("top-hover")

	}
		return (
			<div ref={ref} className="dragmask">
				
				<div draggable="false" style={{ position: "relative" }} onMouseEnter={handleMouseEnter} id={item.id} key={item.id}>
					<div
						ref={(elem) => setref(elem, item.id)}
						id={item.id}
						onInput={handleChange}
						onFocus={handleFocus}
						onKeyDown={handleKeyDown}
						data-type={item.type}
						contentEditable="true"
						placeholder={item.text}
						className={"data-block " + item.type}
					>
						{todoelem}
					</div>

					{gridhand}
				</div>
			</div>
		);


}
export default Datablock;
