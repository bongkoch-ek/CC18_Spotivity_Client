import React from 'react'

export default function Dropdown(props) {

    const{title, ...option} = props

    return (
        <div>
            <select className="select w-52 max-w-xs rounded-3xl bg-[#e6eeee]">
                <option disabled selected>{title}</option>
                <option>Football</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
            </select>
        </div>
    )
}
