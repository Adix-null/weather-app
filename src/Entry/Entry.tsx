import React from "react";
import "./Entry.scss";

interface EntryProps {
	data: any[];
}

const Entry: React.FC<EntryProps> = ({ data }) => {
	return (
		<div className="entry">
			{data.map((date, key) => (
				<span key={key}>{date.toString()}</span>
			))}
		</div>
	);
};

export default Entry;
