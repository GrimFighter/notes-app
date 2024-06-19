import React from "react";
import { useState } from "react";

function Input ( props )
{
    
    return (
        <>
            <textarea className="input-box"  placeholder={props.placeholder} value={props.value} onChange={props.handleChange}/>
        </>
    );
}

export default Input;