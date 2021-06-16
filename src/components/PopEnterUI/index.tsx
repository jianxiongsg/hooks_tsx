// import { createElement, memo, useEffect, useState, useRef } from 'rax';
// import './index.scoped.css';
// import crossImage from 'mobile/utils/crossImage';
// import mx from '@ali/pcom-mx';
// import mu from '@ali/pcom-mu';
// import { EventTypeSend, EventTypeReceive } from 'mobile/types/eventType';
// import { toBool } from 'mobile/utils/helpers';
// import LottieWrap from '../LottieWrap';
// import getStaticData from 'mobile/staticData';
// import config from 'mobile/config';
// import { StoreName } from 'mobile/types/store';
// import { doTracker, TrackerType, TrackerLogKey } from 'mobile/utils/doTracker';
// import { px2vw } from 'mobile/utils/screen';
// import Hand from '../Hand';
// import useTimeout from 'mobile/hooks/useTimeout';

// interface PopInfo {
//   isOutgivingRedBag: boolean;
// }
// export default function(props: { info: PopInfo; closeUI: () => void }) {
//   const redbagLottieEle = useRef(null);
//   const btmLottieEle = useRef(null);
//   const btnEle = useRef(null);
//   const uiEle = useRef(null);
//   const localTimeout = useTimeout();
//   const [showHand, setShowHand] = useState(false);

//   const onPressClose = () => {
//     doTracker({
//       logkey: TrackerLogKey.FresherPop,
//       gmkey: TrackerType.CLK,
//       gokey: '',
//     });
//     mx.event.emit(EventTypeSend.ONCLOSE_FRESHER_MODAL);

//     props.closeUI();
//   };

//   const getPopBgImg = () => {
//     const staticData = getStaticData();
//     try {
//       const career = mx.store.get(StoreName.myCareer);
//       return staticData.fresherNoRedbagConfig[career];
//     } catch (error) {
//       return '';
//     }
//   };

//   const loadRedbagLottie = async () => {
//     if (!redbagLottieEle.current || !getStaticData()?.common?.newAnim) {
//       return;
//     }
//     const downgradeConfig = {
//       needDowngrade: false, // 是否降级
//       forceDowngrade: false, // 是否强制降级
//     };
//     try {
//       const res = await LottieWrap(
//         {
//           container: redbagLottieEle.current,
//           renderer: 'svg',
//           loop: false,
//           autoplay: true,
//           path: getStaticData().common.newAnim,
//         },
//         downgradeConfig,
//       );
//       const { lottieAnim } = res;
//       if (lottieAnim) {
//         lottieAnim.addEventListener('loaded', () => {});
//       } else {
//       }
//     } catch (e) {
//       console.log('ss', e);
//     }
//   };

//   const loadBtmLottie = async () => {
//     if (!btmLottieEle.current) {
//       return;
//     }
//     const downgradeConfig = {
//       needDowngrade: false, // 是否降级
//       forceDowngrade: false, // 是否强制降级
//     };
//     try {
//       const res = await LottieWrap(
//         {
//           container: btmLottieEle.current,
//           renderer: 'svg',
//           loop: true,
//           autoplay: true,
//           path: getStaticData().newBtmLottieAnim,
//         },
//         downgradeConfig,
//       );
//       const { lottieAnim } = res;
//       if (lottieAnim) {
//         lottieAnim.addEventListener('complete', () => {});
//       } else {
//       }
//     } catch (e) {
//       console.log('ss', e);
//     }
//   };

//   const canPlayAnim = () => {
//     return config.useWelcomeAnim;
//   };

//   const getCatNick = () => {
//     const staticData = getStaticData();
//     try {
//       const career = mx.store.get(StoreName.myCareer);
//       return staticData.catNickConfig[career];
//     } catch (error) {
//       return '';
//     }
//   };

//   useEffect(() => {
//     doTracker({
//       logkey: TrackerLogKey.FresherPop,
//       gmkey: TrackerType.EXP,
//       gokey: '',
//     });
//     // if (canPlayLottie()) {
//     //   loadRedbagLottie();
//     // loadBtmLottie();
//     //   localTimeout(() => {
//     //     uiEle.current && setShowHand(true);
//     //   }, 1000);
//     // }
//     localTimeout(() => {
//       uiEle.current && setShowHand(true);
//     }, 1000);
//     if (!toBool(props.info.isOutgivingRedBag)) {
//       doTracker({
//         logkey: TrackerLogKey.Guide,
//         gmkey: TrackerType.EXP,
//         gokey: 'step=1',
//       });
//     }

//     setTimeout(() => {
//       if (uiEle.current) {
//         uiEle.current.focus();
//       }
//       document.querySelector('#module-container')?.setAttribute('aria-hidden', 'true');
//     }, 0);

//     mu.disableScroll();
//     return () => {
//       document.querySelector('#module-container')?.setAttribute('aria-hidden', 'false');
//       mu.enableScroll();
//     };
//   }, []);
//   return (
//     <div
//       className="enterui-mask"
//       ref={uiEle}
//       role="dialog"
//       tabIndex={-1}
//       aria-modal="true"
//       aria-describedby="dialog-title">
//       {!toBool(props.info.isOutgivingRedBag) ? (
//         <div>
//           {canPlayAnim() ? (
//             <>
//               <div className="fresher-box">
//                 <div aria-hidden="true" className="fresher-biglightempty" />
//                 <div aria-hidden="true" className="fresher-biglightbold" />
//                 {/* <div aria-hidden="true" className="fresher-lightbox">
//                   <div className="light-img23rotate1"><div className="light-img23anim1"></div></div>
//                   <div className="light-img23rotate2"><div className="light-img23anim2"></div></div>
//                   <div className="light-img23rotate3"><div className="light-img23anim3"></div></div>
//                   <div className="light-img24rotate1"><div className="light-img24anim1"></div></div>
//                   <div className="light-img24rotate2"><div className="light-img24anim2"></div></div>
//                   <div className="light-img24rotate3"><div className="light-img24anim3"></div></div>
//                   <div className="light-img25rotate1"><div className="light-img25anim1"></div></div>
//                   <div className="light-img25rotate2"><div className="light-img25anim2"></div></div>
//                   <div className="light-img25rotate3"><div className="light-img25anim3"></div></div>
//                 </div> */}
//                 <div aria-hidden="true" className="fresher-topbox">
//                   <img
//                     aria-hidden="true"
//                     className="fresher-titleimg"
//                     src={crossImage(getStaticData().fresherPopTitle)}
//                     alt={'618狂撒10亿补贴'}
//                   />
//                   <img
//                     className="fresher-subtitleimg"
//                     aria-hidden="true"
//                     src={crossImage(
//                       'https://gw.alicdn.com/imgextra/i4/O1CN01hEBjUK1On5OmkSnZW_!!6000000001749-2-tps-480-75.png',
//                     )}
//                     alt={'618狂撒10亿补贴'}
//                   />
//                   <div className="fresher-xx1" />
//                   <div className="fresher-xx2" />
//                   <div className="fresher-xx3" />
//                   <div className="fresher-xx4" />
//                   <div className="fresher-xx5" />
//                 </div>
//                 <div id={'dialog-title'} className="aria-txt">
//                   {getStaticData().fresherPopAria}
//                 </div>
//                 <div className="fresher-body fresherbodyanim">
//                   <img
//                     className="fresher-centerimg fresherredbaganim"
//                     aria-hidden="true"
//                     src={crossImage(getStaticData().fresherPopBg)}
//                     alt={'红包'}
//                   />
//                   <div
//                     className="fresher-btn fresherbtnanim"
//                     aria-label={'立即兑换'}
//                     tabIndex={-1}
//                     role={'button'}
//                     ref={btnEle}
//                     onClick={onPressClose}>
//                     <img
//                       className="fresher-btnimg"
//                       aria-hidden="true"
//                       src={crossImage(getStaticData().fresherPopBtn)}
//                       alt={'按钮'}
//                     />
//                     {showHand && <Hand top={60} left={300} />}
//                   </div>
//                   <div className="fresher-cenlxx" />
//                   <div className="fresher-cenrxx" />
//                 </div>
//               </div>
//               {/* <div aria-hidden="true" className="bottom-lottie" ref={btmLottieEle} /> */}
//               <div className="fresher-bottomanim" aria-hidden="true">
//                 <div className="fresher-btmimg0" />
//                 <div className="fresher-btmimg1" />
//                 <div className="fresher-btmimg2" />
//                 <div className="fresher-btmimg3" />
//                 <div className="fresher-btmimg4" />
//                 <div className="fresher-btmimg5" />
//               </div>
//             </>
//           ) : (
//             <div>
//               <div
//                 className="enterui-box"
//                 role="dialog"
//                 tabIndex={-1}
//                 aria-modal="true"
//                 aria-describedby="dialog-title">
//                 <div id={'dialog-title'} className="aria-txt">
//                   {getStaticData().fresherPopAria}
//                 </div>
//                 <img
//                   id={'dialog-title'}
//                   aria-hidden="true"
//                   className="enterui-bg"
//                   src={crossImage(getStaticData()?.common?.newAnimPopImg)}
//                   alt={getStaticData().fresherPopAria}
//                 />
//                 <div
//                   ref={btnEle}
//                   aria-label={'立即兑换'}
//                   className="enterui-btn"
//                   tabIndex={-1}
//                   role={'button'}
//                   onClick={onPressClose}>
//                   <Hand top={120} left={500} />
//                 </div>
//               </div>
//               <img
//                 aria-hidden="true"
//                 className="enterui-btmimg"
//                 src={crossImage(
//                   'https://gw.alicdn.com/imgextra/i2/O1CN01C1xZBT1McQx7CWFjk_!!6000000001455-2-tps-750-230.png',
//                 )}
//                 alt="开启新手猫厨神之路"
//               />
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="entercat-box showPopAnim">
//           <img className="entercat-conimg" aria-hidden="true" src={crossImage(getPopBgImg())} alt="背景" />
//           <div className="aria-txt">{'恭喜获得一只新秀猫'}</div>
//           <div id="dialog-title" className="entercat-desc">
//             {`获得星秀猫${getCatNick()}-${mx.store.get(StoreName.catNick)}`}
//           </div>
//           <div aria-label={'领取喵咪'} className="entercat-btn" tabIndex={-1} role={'button'} onClick={onPressClose}>
//             <img
//               className="entercat-btnimg"
//               aria-hidden="true"
//               src={crossImage(
//                 'https://gw.alicdn.com/imgextra/i3/O1CN01nR9msk1drrlOOc7F9_!!6000000003790-2-tps-444-80.png',
//               )}
//               alt="领取猫咪"
//             />
//           </div>
//           <div className="entercat-closebtn" role={'button'} tabIndex={-1} aria-label={'关闭'} onClick={onPressClose}>
//             <img
//               aria-hidden="true"
//               className="entercat-closeimg"
//               src={crossImage(
//                 'https://gw.alicdn.com/imgextra/i4/O1CN01mP4aaO1R7oY9TL9vZ_!!6000000002065-2-tps-72-72.png',
//               )}
//               alt="关闭"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


