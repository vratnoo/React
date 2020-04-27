import React from 'react'

function Menu({top,hid,onMenuClick}){
	
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
	<div id={hid} onClick={onMenuClick} data-type="Todo" className="handlemenu">
		Todo
	</div>
</div>)
}

export default Menu