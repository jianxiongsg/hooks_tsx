/**@jsx createElement */
import animate from 'universal-animation';
import { createElement, Component, useEffect, useRef, useLayoutEffect, useState } from 'rax';
import View from 'rax-view';
// import { isPlainObject } from "@ali/pcom-mu";

const Animated = {
  Value: class {
      value
      animationInfo
    constructor(initial) {
      this.value = initial;
      this.animationInfo = [];
    }
    setValue(value) {
      this.value = value;
    }
    interpolate(config) {
      return {
        self: this,
        config
      };
    }
    setConfig(timingConfig) {
      const { toValue, duration, easing, } = timingConfig;
      this.animationInfo = this.animationInfo.map((item) => {
        const info = {
          easing,
          duration,
          start: getCurVal(item.config, this.value),
          end: getCurVal(item.config, toValue),
          delay: 0,
        }
        return Object.assign(item, info);
      })
      this.setValue(toValue);
    }
    start(cb) {
      animate(
        {
          props: this.animationInfo
        },
        () => {
          cb && cb();
        },
      ).export();
    }

  },
  View: createAnimatedComponent(View),
  timing: function (constructor, timingConfig) {
    constructor.setConfig(timingConfig);
    return constructor;
  }
}



function mapTransform(t) {
  var k = Object.keys(t)[0];
  var unit = '';
  if (k.indexOf('translate') === 0) {
    unit = 'rpx';
  }
  return `${k}(${t[k]}${unit})`;
}


function createAnimatedComponent(OriginComponent) {
  const AnimatedComponent = (props) => {
    const { style, children } = props;
    const animations = useRef([]);
    // const getStyle = (obj, property) => {
    //   //判断是否绑定有动画 
    //   if (obj.self instanceof Animated.Value) {
    //     const { config } = obj;
    //     animations.current.push({
    //       element: null,
    //       property,
    //       config
    //     })
    //     return null;
    //   }
    //   if (property.includes('transform')) {

    //   }

    // }
    // const [componentStyle] = useState(() => {
    //   const _style = {};
    //   if (!isPlainObject(style)) {
    //     for (const key in style) {
    //       if (Array.isArray(style[key])) {
    //         let _static = '';
    //         style[key].forEach((item) => {
    //           var k = Object.keys(item)[0];
    //           if (item[k].self instanceof Animated.Value) {
    //             getStyle(item[k], `${key}.${k}`);
    //           } else {
    //             _static += mapTransform(item);
    //           }
    //           Object.assign(_style, { [`${key}`]: _static })
    //           console.log("ssssssss", _static)
    //         })
    //       } else {
    //         getStyle(style[key], key);
    //       }
    //     }

    //   }
    //   return _style;

    // })
    const nodeRef = useRef(null);

    const attach = (obj, property) => {
      //判断是否绑定有动画 
      if (obj.self instanceof Animated.Value) {
        const { self, config } = obj;
        self.animationInfo.push({
          element: nodeRef.current,
          property,
          config
        });
      }
    }
    useLayoutEffect(() => {
      if (!false) {
        for (const key in style) {
          if (Array.isArray(style[key])) {
            for (const elem of style[key]) {
              for (const k in elem) {
                attach(elem[k], `${key}.${k}`);
              }
            }
          } else {
            attach(style[key], key);
          }
        }

      }
    }, [])
    return (
      <OriginComponent
        // {...props}
        // style={componentStyle}
        ref={nodeRef}
      >{children}</OriginComponent>
    );
  }
  return AnimatedComponent;
}

function getUnit(val) {
  if (typeof (val) !== "string") return undefined;
  return val.replace(/[0-9]*/g, '').replace(/\./, '');
}

function getCurVal(config, result) {
  const { inputRange, outputRange } = config;
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  if (result < inputMin) {
    return inputMin;
  }

  if (result > inputMax) {
    return inputMax;
  }

  if (outputMin === outputMax) {
    return outputMin;
  }
  const total = inputMax - inputMin; //总份数
  const curOffset = result - inputMin;//当前份数
  const per = curOffset / total;//占比
  const unit = getUnit(outputMax);
  if (unit) {
    const offset = parseFloat(outputMax) - parseFloat(outputMin);
    const curVal = offset * per - parseFloat(outputMin);
    return curVal + unit;
  } else {
    return (outputMax - outputMin) * per - outputMin;
  }
}

export default Animated;
export const Easing = {
  linear: 'linear'
}