import React from 'react';
import { SketchPicker } from 'react-color'
import './Canvas.scss'


class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.canvasRef = React.createRef();

        this.state = { 
            x: 0, 
            y: 0,
            firstPoint: {},
            secondPoint: {},
            drawing: false,
            selectedColor: '#000000',
            background: '#fff',
        }

        this.client = this.props.client
    }
    
    componentDidMount() {
        const canvasRef = this.canvasRef.current
        canvasRef.width = this.canvasRef.current.offsetWidth
        canvasRef.height = this.canvasRef.current.offsetHeight
        // const rect = canvasRef.getBoundingClientRect();
    }

    onMouseDown(e) {
        this.setState({ 
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            drawing:true
         })
    }

    onMouseUp(e) {

        if (this.state.drawing) {
            let { x, y } = this.state
            const currX = e.nativeEvent.offsetX
            const currY = e.nativeEvent.offsetY
            this.drawline(
                { x , y }, 
                { x: currX, y: currY },
                this.state.selectedColor
            )
            this.setState({
                x: 0,
                y: 0,
                drawing: false
            })
        }

        //let imgData = ctx.getImageData(0,0, this.props.width, this.props.height)
        // imgData = JSON.stringify(imgData)
    }

    onMouseMove(e) {

        let {x, y} = this.state
        if (this.state.drawing) {
            const currX = e.nativeEvent.offsetX
            const currY = e.nativeEvent.offsetY
            console.log
            this.drawline( 
                { x , y }, 
                { x: currX, y: currY },
                this.state.selectedColor )

            this.client.send(JSON.stringify({
                "action": "OnMessage",
                "message": {
                    "type": "draw",
                    "prev" : { x: x, y: y },
                    "curr": { x: currX, y: currY }
                }
            }))
            
            this.setState({ 
                x: currX,
                y: currY,
            })
        }

    }

    drawline(point1, point2, selectedColor) {
        console.log(point1, ' ', point2)
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.beginPath()
        ctx.strokeStyle = selectedColor
        ctx.lineWidth = 5
        ctx.moveTo(point1.x, point1.y)
        ctx.lineTo(point2.x, point2.y)
        ctx.stroke()
        ctx.closePath()
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextprops ", nextProps)
        if (nextProps.firstPoint.x && nextProps.secondPoint.x 
                && nextProps.firstPoint.y && nextProps.secondPoint.y) {
                this.drawline(nextProps.firstPoint, nextProps.secondPoint)
            }
    }

    // handleChangeComplete = (color) => {
    //     this.setState({ selectedColor: color.hex })
    // }


    handleChange = (color) => {
        console.log(color.hex)
        this.setState({ selectedColor: color.hex });
    };
    
    handleChangeComplete = (color) => {
        console.log("CHANGE COMPLETE!")
        console.log(color.hex)
        this.setState({ selectedColor: color.hex });
    }

    sendCanvasState = () => {
        this.client.send(JSON.stringify({
            "action": "OnMessage",
            "message": {
                "type": "draw",
                "prev" : { x: x, y: y },
                "curr": { x: currX, y: currY }
            }
        }))
    }
    

    render() {
        return (
            <div className="canvasContainer">
                <SketchPicker
                    color={ this.state.selectedColor }
                    onChange={ this.handleChange }
                    onChangeComplete={ this.handleChangeComplete }
                />
                <div className="canvas">
                    <canvas 
                        onMouseMove={ this.onMouseMove.bind(this) } 
                        onMouseDown={ this.onMouseDown.bind(this) }
                        onMouseUp={ this.onMouseUp.bind(this) }
                        ref={ this.canvasRef } 
                        width={ this.props.width } 
                        height={ this.props.height }
                    />
                </div>
            </div>
        )
    }
}

export default Canvas