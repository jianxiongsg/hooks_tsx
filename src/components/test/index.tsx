// import { createElement } from 'rax';
// import View from 'rax-view';
// import Text from 'rax-text';
// import TextInput from "rax-textinput";

// import './index.css';

// import subscribe from '@ali/mpds-subscription-windvane';
// import  MTOP from "@ali/universal-mtop";
// export default function Home() {

//   var id = 'testNoticeConfirm111';// 业务的唯一id
//   const subFrom = 'test';// 填订阅来源，和服务端@华藏申请
//   const activityType = 'test';// 填业务类型，和服务端@华藏申请`
//   const subscribeInstance = subscribe.init(
//     [id],
//     subFrom,
//       activityType,
//     () => {}

//   );

//     //必须根据自己页面的域名设置，有问题联系lib-mtop的负责人洋风， https://yuque.antfin.com/mtbsdkdocs/mtopjssdkdocs/uyq37p
//     MTOP.config('prefix', 'market');
//     MTOP.config('subDomain', 'wapa');
//     MTOP.config('mainDomain', 'taobao.com');
//   return (
//     <View className="home" >
//       <TextInput className="input" defaultValue={id} onChangeText={text => {  id = text;}} />
//       <Text className="title"onClick={() => {
//         // 订阅提醒
//         subscribeInstance.subscribe(id,(res) => {
//           alert(JSON.stringify(res))
//         }, (err) => {
//             alert(JSON.stringify(err))
//             // 处理订阅失败(toast内部会去弹，这里不用处理)
//         });
//       }} >订阅</Text>
//       <Text className="title"onClick={() => {
//         // 订阅提醒
//         subscribeInstance.unsubscribe(id,(res) => {
//           alert(JSON.stringify(res))

//         }, (err) => {
//             alert(JSON.stringify(err))
//             // 处理订阅失败(toast内部会去弹，这里不用处理)
//         });
//       }} >取消订阅</Text>
//       <Text className="title"onClick={() => {
//         // 订阅提醒
//         subscribeInstance.requestSubscribeStatus([id],(res) => {
//           alert(JSON.stringify(res))
//         }, (err) => {
//             alert(JSON.stringify(err))
//             // 处理订阅失败(toast内部会去弹，这里不用处理)
//         });
//       }} >查询订阅</Text>
//     </View>
//   );
// }