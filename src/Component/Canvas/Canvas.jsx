import React from 'react';
import './Canvas.scss'
class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.canvasRef = React.createRef();

        this.state = { 
            x: 0, 
            y: 0,
            drawing: false
        }

        this.client = this.props.client
    }
    
    componentDidMount() {
        this.canvasRef.current.width = this.canvasRef.current.offsetWidth
        this.canvasRef.current.height = this.canvasRef.current.offsetHeight
        const rect = this.canvasRef.current.getBoundingClientRect();

        this.client.onmessage = (message) => {
            const msg = JSON.parse(message.data)
        }
    }
    componentDidUpdate() {
        // this.updateCanvas();
    }

    onMouseDown(e) {
        this.setState({ 
            x: e.nativeEvent.offsetX1/1.5,
            y: e.nativeEvent.offsetY/1.5,
            drawing:true
         })
    }

    onMouseUp(e) {
        if (this.state.drawing) {
            const ctx = this.canvasRef.current.getContext('2d');
            let { x, y } = this.state
            const currX = e.nativeEvent.offsetX / 1.5
            const currY = e.nativeEvent.offsetY /1.5
            this.drawline(ctx, 
                { x , y }, 
                { x: currX, y: currY } )
            this.setState({
                x: 0,
                y: 0,
                drawing: false
            })
        }
    }

    onMouseMove(e) {

        const ctx = this.canvasRef.current.getContext('2d');
        let {x, y} = this.state
        if (this.state.drawing) {
            const currX = e.nativeEvent.offsetX/1.5
            const currY = e.nativeEvent.offsetY/1.5
            this.drawline(ctx, 
                { x , y }, 
                { x: currX, y: currY } )
            
            this.setState({ 
                x: currX,
                y: currY,
            })
        }

    }

    drawline(ctx, point1, point2) {
        console.log(point1, ' ', point2)
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.moveTo(point1.x, point1.y)
        ctx.lineTo(point2.x, point2.y)
        ctx.stroke()
        ctx.closePath()
    }

    render() {
        return (
            <div className="canvasContainer">
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

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

export default Canvas