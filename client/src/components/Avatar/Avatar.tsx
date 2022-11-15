import React, {FC, SyntheticEvent} from "react";

function chooseFirstLetter(name) {
	if (!name) {
		return "";
	}
	let letterOne = name[0];
	let letterTwo = "";
	let splitName = name.split(" ");
	if (splitName.length > 1) {
		letterTwo = splitName[1][0];
	}
	return letterOne + letterTwo;
}

interface Props {
	className?: string,
	username?: string
	imgClass?: string
	src: string
}

const Avatar: FC<Props> = ({className = "", imgClass = "", username, src}) => {
	let letter = chooseFirstLetter(username)
	
	function handleErrorImage(e: SyntheticEvent) {
		let avatarRoot = e.target?.parentNode as HTMLElement
		avatarRoot.innerHTML = `
			<span class="rounded-full bg-dark-5/50 w-9 h-9 flex items-center text-sm font-medium justify-center uppercase">${chooseFirstLetter(username)}</span>
		`
	}
	
	return (
		<div className={className}>
			 {src
				 ? <div className="avatar-root">
					 <img onError={handleErrorImage} src={src} alt="avatar"
						  className={`rounded-full w-full ${imgClass}`}/>
				 </div>
				 : <div
					 className="rounded-full bg-dark-5/50 w-10 h-10 flex items-center justify-center uppercase">{letter}</div>
			 }
		</div>
	);
};

export default Avatar;
