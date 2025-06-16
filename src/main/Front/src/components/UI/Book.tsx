import {JSX} from "react";

interface props {
    imgSrc: string|undefined
}

const Book = ({imgSrc}:props):JSX.Element => {
    return (
        <img className='w-[200px] h-[250px] bg-red-800 rounded-r-2xl drop-shadow-[20px_10px_10px_rgba(0,0,0,0.30)] z-10 relative' src={imgSrc} alt="">

        </img>
    )
}

export default Book