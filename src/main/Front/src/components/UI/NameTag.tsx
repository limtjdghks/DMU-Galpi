import {JSX} from "react";

interface props {
    text: string
}

const NameTag = ({text}:props):JSX.Element => {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
}

export default NameTag