import React from 'react';
import './App.css';
import './style.css'
import TemplateView from "./components/TemplateView";
import {useState, useEffect} from 'react';
import TemplateCard from "./components/TemplateCard";

interface TemplateData {
    title: string
    description: string
    cost: string
    id: string
    thumbnail: any
    image: any
}

function HandleClick(delta:number,position:number,positionSetter:any,datasetSize:number){
    if(position+delta<0){
        positionSetter(0)
    }else if(position+delta > datasetSize-delta){
        positionSetter(datasetSize-delta+1)
    }else{
        positionSetter(position+delta)
    }
    console.log(position)
}


function App() {
    const [position, setPosition] = useState(0);
    const [activeTemplate, setactiveTemplate] = useState<TemplateData>();
    const [data, setData] = useState<TemplateData[]>([])

    useEffect(() => {
        fetch('http://localhost:3030/templates')
            .then(response => {
                return response.json();
            }).then(data => {
            setData(data);
            setactiveTemplate(data[0])
        }).catch((e: Error) => {
            console.log(e.message);
        });
    }, []);

    return (
        <div id="container">
            <header>
                Code Development Project
            </header>
            <div id="main" role="main">
                <TemplateView
                    title={activeTemplate?.title}
                    description={activeTemplate?.description}
                    cost={activeTemplate?.cost}
                    id={activeTemplate?.id}
                    thumb={activeTemplate?.thumbnail}
                    large={activeTemplate?.image}
                />
                <div className="thumbnails">
                    <div className="group">
                        {data.slice(position,position+4).map((item) =>
                            <TemplateCard
                                thumb={item.thumbnail}
                                title={item.title}
                                description={item.title}
                                active={item.id === activeTemplate?.id}
                                click={() => setactiveTemplate(item)}
                            />
                        )}
                        <span className={`previous ${position<=0 ? "disabled" : ""}`} title="Previous" onClick={() => HandleClick(-4,position,setPosition,data.length)}>Previous</span>
                        <a href="#" className={`next ${position>=data.length-3 ? "disabled" : ""}`} title="Next" onClick={() => HandleClick(4,position,setPosition,data.length)}>Next</a>
                    </div>
                </div>
            </div>
            <footer>
                {/*<a href="instructions.pdf">Download PDF Instructions</a>*/}
            </footer>
        </div>
    );
}

export default App;
