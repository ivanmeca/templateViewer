import React from "react"
import '../style.css'

interface TemplateProps {
    title?: string
    description?: string
    cost?: string
    id?: string
    thumb: any
    large: any
}

const TemplateView: React.FunctionComponent<TemplateProps> = ({
                                                              title,
                                                              description,
                                                              cost,
                                                              id,
                                                              thumb,
                                                              large,
                                                          }: TemplateProps) => {
    const iconFile = `/assets/large/${large}`
    return (
        <div id="large">
            <div className="group">
                <img src={iconFile} alt="Large template" width="430" height="360"/>
                <div className="details">
                    <p><strong>Title</strong>{title}</p>
                    <p><strong>Description</strong>{description}</p>
                    <p><strong>Cost</strong>{cost}</p>
                    <p><strong>ID #</strong>{id}</p>
                    <p><strong>Thumbnail File</strong>{thumb}</p>
                    <p><strong>Large Image File</strong>{large}</p>
                </div>
            </div>
        </div>
    );
}

export default TemplateView
