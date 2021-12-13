/**@jsx createElement */
import {createElement, Component ,forwardRef } from 'rax';

 const Image = forwardRef((props:any,ref)=>{
    // const props:any = this.props;
    const { uri } = props.source ||
    { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+LlG9z8AB0YC0sJWoKgAAAAASUVORK5CYII=' };
    const _props = { ...props } as any;
    delete _props.source;
    return (
        <img alt="图片" {..._props} src={uri} ref={ref} />
    )
})
export default Image;
// class Image extends Component {
//   static propTypes = {}

//   render() {
//     const props:any = this.props;
//     const { uri } = props.source ||
//     { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+LlG9z8AB0YC0sJWoKgAAAAASUVORK5CYII=' };
//     console.log('............image')
//     const _props = { ...props } as any;
//     delete _props.source;
//     return (
//       <img alt="图片" {..._props} src={uri} />
//     );
//   }
// }

// export default Image;
