import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import setEndOfContenteditable from "../helper/helper";
import Datablock from "./Datablock";
const ItemTypes  = {
	CARD:"card"
}

function Controler(props) {

	// body...
	const ref = useRef({});
	const { isenter } = props;
	const setref = (elem, id) => {
		ref.current[id] = elem;
		
	};

	useEffect(() => {
		if (isenter !== null) {
			// ref.current[isenter].focus()
			setEndOfContenteditable(ref.current[isenter]);
		}
	}, [isenter]);

	//spreading props for forward
	const propsforward = { ...props, setref };

	return <Datablock {...propsforward} />;
}

export default Controler;
