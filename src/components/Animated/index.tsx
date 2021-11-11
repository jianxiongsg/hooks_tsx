/**@jsx createElement */
/** @jsxFrag */
import { Component, createElement, render } from "rax";
import Animated,{Easing} from "./animated";

export default class AnimatedUI extends Component {
  state:any;
  constructor(props) {
    super(props);
    this.state = {
      shakeBubbleAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
     setTimeout(() => {
      // this.showDialogBox();
      this.shakeBubble();
     },300)
  }
  // showDialogBox() {
  //   this.state.shakeBubbleAnim.setValue(0);
  //   Animated.timing(this.state.shakeBubbleAnim, {
  //     toValue: 1,
  //     duration: 3000,
  //     easing: "easeOutSine",
  //   }).start();
  // }
  shakeBubble = () => {
      this.state.shakeBubbleAnim.setValue(0);
      Animated.timing(
        this.state.shakeBubbleAnim,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start(() => {
        Animated.timing(
          this.state.shakeBubbleAnim,
          {
            toValue: 0,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }
        ).start(()=>{
          Animated.timing(
            this.state.shakeBubbleAnim,
            {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear,
              useNativeDriver: true,
            }
          ).start(()=>{
            Animated.timing(
              this.state.shakeBubbleAnim,
              {
                toValue: 0,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
              }
            ).start()
          })
        })
      })
    }

  getScale() {
    return this.state.shakeBubbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }
  render() {
    return (
      <div>
      <Animated.View style={{ transform: [{ scale: this.getScale() }],opacity: this.getScale()  }}>
        <div
          style={{ backgroundColor: "red", height: "100rpx", width: "100rpx" }}
        ></div>
      </Animated.View>
      <div>11</div>
      </div>
    );
    // return ":::";
  }
}