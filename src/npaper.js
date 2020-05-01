import React, { useCallback, useState, useRef, useEffect } from "react";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Controler from "./component/controler";
import "./App.css";

function Notion() {
	// body...
	return (
		<DndProvider backend={Backend}>
			<Paper />
		</DndProvider>
	);
}

function Paper(argument) {
	const [isenter, setEnter] = useState(null);
	const [direction, setTop] = useState({ top: null });
	const [handleId, setHandleId] = useState(null);

	const [list, setList] = useState([
		{ id: 1, text: "Untitld", type: "Heading" },
		{ id: 2, text: "Write Something Here", type: "Paragraph" },
		{
			id: Date.now(),
			text: "Write Something Here",
			type: "Todo",
			done: false,
		},
	]);

	const moveCards  = useCallback((draggedindex,hoverindex)=>{

		console.log(draggedindex+"is moved with"+hoverindex)
		//geting dragged card
		const draggedcard = list[draggedindex]
		const cards = list.slice()
		
		cards.splice(draggedindex,1)
		cards.splice(hoverindex,0,draggedcard)
		setList(cards)
	})

	const handleChange = useCallback((e) => {
		console.log(e.target.id)
		const datablock_id = e.target.id
		let newlist  = list.slice()
		newlist.every((item, index) => {
				if (item.id == datablock_id) {
					item.text = e.target.innerText
					return false;
				}
				return true;
				});
		setList(newlist)

	});

	const handleKeyDown = useCallback((e) => {
		const menuId = e.target.id;
		const type = "Paragraph";
	
		let updatedlist = list.slice();
		let newItem = { id: Date.now(), text: type + " New Dummy", type: type };
		if (e.target.dataset.type === "Todo") {
			newItem = {
				id: Date.now(),
				text: " Enter Your To do list item",
				type: "Todo",
				done: false,
			};
		}

		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			updatedlist.every((item, index) => {
				if (item.id == menuId) {
					updatedlist.splice(index + 1, 0, newItem);
					return false;
				}
				return true;
			});

			setList(updatedlist);
			setEnter(newItem.id);
		} else if (e.target.innerText.length === 0 && e.keyCode === 8) {
			let focusid = null;
			updatedlist = updatedlist.filter((item, index) => {
				if (item.id == menuId && updatedlist.length > 1) {
					focusid = updatedlist[index - 1].id;
					return false;
				} else {
					return true;
				}
			});
			console.log(updatedlist);
			setList(updatedlist);
			setEnter(focusid);
		}
	});

	const handleclick = useCallback((e) => {
		setTop({ top: e.pageY, id: e.currentTarget.id });
	});

	const handleMouseEnter = (e) => {
		setHandleId(e.target.id);
	};
	const handleMouseLeave = (e) => {
		setHandleId(null);
		setTop({top:null})
	};
	const handleFocus = (e) =>{
		setTop({top:null})
	}

	const handleMenuClick = useCallback((e) => {
		const type = e.target.dataset.type;
		const menuId = e.target.id;
		const updatedlist = list.slice();
		const newItem = {
			id: Date.now(),
			text: type + " New Dummy",
			type: type,
		};
		updatedlist.every((item, index) => {
			if (item.id == menuId) {
				updatedlist.splice(index + 1, 0, newItem);
			}
			return true;
		});
		console.log(updatedlist);
		setList(updatedlist);
	});

	//starting component arrengment
	const dbprops = {
		direction,
		handleMenuClick,
		list,
		handleId,
		handleclick,
		handleMouseEnter,
		handleKeyDown,
		isenter,
		setEnter,
		moveCards,
		handleChange,
		handleFocus

	};
	const controler = <Controler {...dbprops} />;


	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="main" onMouseLeave={handleMouseLeave}>
							{controler}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Notion;
