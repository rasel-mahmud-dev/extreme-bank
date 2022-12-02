import React from 'react';
import {ScaleLoader} from "react-spinners"

const Loader = ({className="", title="", loaderOptions={}}) => {
	if(!loaderOptions?.color){
		loaderOptions.color = "#e84e4e"
	}
	return (
		<div className={className}>
			<div className="flex flex-col justify-center items-center">
				<ScaleLoader {...loaderOptions}  />
				{title && <h2 className="mt-2 font-medium text-dark-600 dark:text-dark-20">{title}...</h2> }
			</div>
  </div>
	);
};

export default Loader;