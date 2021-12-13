import animate from 'universal-animation';
import { createElement, useRef, useLayoutEffect, useState, memo } from 'rax';
import View from 'rax-view';
import Image from './Base/Image';
import Text from 'rax-text';

interface InterpolateConfig {
  inputRange: Array<number>;
  outputRange: Array<any>;
}

const Empty: string = '';

const Animated = {
  Value: class {
    public value: number = 0;
    public animationInfo: Array<any>;
    constructor(initial: number) {
      this.value = initial;
      this.animationInfo = [];
    }
    setValue(value: number) {
      this.value = value;
    }
    interpolate(config: InterpolateConfig) {
      return {
        self: this,
        config,
      };
    }
    setConfig(timingConfig) {
      const { toValue, duration, easing } = timingConfig;
      this.animationInfo = this.animationInfo.map((item) => {
        const info = {
          easing,
          duration,
          start: getCurVal(item.config, this.value),
          end: getCurVal(item.config, toValue),
          delay: 0,
        };
        return Object.assign(item, info);
      });
      this.setValue(toValue);
    }
    start(cb) {
      animate(
        {
          props: this.animationInfo,
        },
        () => {
          cb && cb();
        },
      ).export();
    }
  },
  View: createAnimatedComponent(View),
  Text: createAnimatedComponent(Text),
  Image: createAnimatedComponent(Image),
  timing(constructor, timingConfig) {
    constructor.setConfig(timingConfig);
    return constructor;
  },
};

/**
 * Object.is兼容
 */
if (!Object.is) {
  Object.is = function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}

function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

function createAnimatedComponent(OriginComponent: any):any {
  const AnimatedComponent = (props) => {
    const { style, children, ..._props } = props;
    const nodeRef = useRef(null);
    const selfRefs = useRef([]);
    const getStyle = (value: object | any, property) => {
      let { config, self } = value || {};
      if (selfRefs.current.indexOf(self) === -1) {
        selfRefs.current.push(self);
      }
      if (property.indexOf('transform.') === 0 && !(self instanceof Animated.Value)) {
        const val = parseFloat(value);
        if (!isNaN(val)) {
          config = {
            inputRange: [0, 1],
            outputRange: [val, val],
          };
        }
      }
      if (config) {
        self.animationInfo.push({
          element: null,
          property,
          config,
        });
        return null;
      }
      if (property === 'transformOrigin' && isNumber(value)) {
        return { [property]: `${value} ${value}` };
      }
      return { [property]: value };
    };
    const mapTransform = (t, prefix) => {
      let k = Object.keys(t)[0];
      const _style = getStyle(t[k], `${prefix}.${k}`);
      if (_style) {
        let unit = Empty;
        let val = t[k];
        if (k.indexOf('translate') === 0 && isNumber(t[k])) {
          unit = 'vw';
          val /= 7.5;
        }
        return `${k}(${val}${unit})`;
      }
      return Empty;
    };
    /**
     *组件样式
     */
    const [componentStyle] = useState(() => {
      const _style = {};
      if (typeof(style) === "object") {
        for (const key in style) {
          // Transform
          if (Array.isArray(style[key])) {
            const _static = style[key]
              .map((item) => {
                return mapTransform(item, key);
              })
              .join('');
            if (_static) {
              Object.assign(_style, { [`${key}`]: _static });
            }
          } else {
            const _static = getStyle(style[key], key);
            if (_static) {
              Object.assign(_style, _static);
            }
          }
        }
      }
      return _style;
    });

    useLayoutEffect(() => {
      if (selfRefs.current) {
        for (let i = 0; i < selfRefs.current.length; i++) {
          if (selfRefs.current[i] && selfRefs.current[i].animationInfo) {
            for (let j = 0; j < selfRefs.current[i].animationInfo.length; j++) {
              selfRefs.current[i].animationInfo[j].element = nodeRef.current;
            }
          }
        }
      }
    }, []);

    return memo(
      //@ts-ignore
      <OriginComponent style={componentStyle} ref={nodeRef} {..._props}>
        {children}
      </OriginComponent>,
      (prevProps, nextProps) => {
        return !Object.is(prevProps, nextProps);
      },
    );
  };
  return AnimatedComponent;
}

/**
 *获取值的单位--> deg
 * @param {*} val
 */
function getUnit(val) {
  if (typeof val !== 'string') return undefined;
  return val.replace(/[0-9]*/g, '').replace(/\./, '');
}

/**
 * 获取当前对应的值
 * @param {*} config
 * @param {*} result
 */
function getCurVal(config: InterpolateConfig, result: number) {
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
  const total = inputMax - inputMin; // 总份数
  const curOffset = result - inputMin; // 当前份数
  const per = curOffset / total; // 占比
  const unit = getUnit(outputMax);
  if (unit) {
    const offset = parseFloat(outputMax) - parseFloat(outputMin);
    const curVal = offset * per + parseFloat(outputMin);
    return curVal;
  } else {
    return (outputMax - outputMin) * per + outputMin;
  }
}
export default Animated
// export Animated;
// export const Easing = {
//   linear: 'linear',
// };
