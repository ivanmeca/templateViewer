import React from "react"
import '../style.css'

interface TemplateCardProps {
    title?: string
    description?: string
    thumb: any
    active: boolean
    click: any
}

const TemplateCard: React.FunctionComponent<TemplateCardProps> = ({
                                                                      title,
                                                                      description,
                                                                      thumb,
                                                                      active,
                                                                      click
                                                                  }: TemplateCardProps) => {
    const iconFile = `/assets/thumbnails/${thumb}`
    return (
        <a href="#" title={title} className={`${active ? "active" : ""}`} onClick={click}>
            <img src={iconFile} alt="thumbnail image" width="145" height="121"/>
            <span>{description}</span>
        </a>
    );
}

export default TemplateCard
