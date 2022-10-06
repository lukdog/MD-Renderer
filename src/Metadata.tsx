import React from 'react'
import classNames from 'classnames'
import './App.scss'

type MetadataProps = {
    title?: string;
    difficulty?: string;
    className?: string;
}

export default function Metadata({title, difficulty, className}: MetadataProps) {

    return (
        <div className={classNames('metadata', className)}>
            { title && <div className="metadata__title">{title}</div> }
            { difficulty && <div className="metadata__difficulty">{difficulty}</div> }
        </div>
    )
}