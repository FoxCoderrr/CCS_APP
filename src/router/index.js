import Vue from 'vue'
import Router from 'vue-router'
import BotNav from '@/components/botNavs'
import Register from '@/pages/register'
import Login from '@/pages/login'
import Forget from '@/pages/forget'
import Demo from '@/pages/demo'
import JiShi from '@/pages/jishi'
import WaKuang from '@/pages/wakuang'
import DongTai from '@/pages/dongtai'
import JiaoYi from '@/pages/jiaoyi'
import Mine from '@/pages/mine'
import ZhongChou from '@/pages/zhongchou'
import QianDao from '@/pages/qiandao'
import Jyzx from '@/pages/jyzx'
import Vinfo from '@/pages/vinfo'
import AllInfo from '@/pages/allinfo'
import AddCard from '@/pages/addcard'
import SucCard from '@/pages/succard'
import TuiGuang from '@/pages/tuiguang'
import Tgjl from '@/pages/tgjl'
import MyDeal from '@/pages/mydeal'
import Team from '@/pages/team'
import Czjl from '@/pages/czjl'
import Yjmx from '@/pages/yjmx'
import KeFu from '@/pages/kefu'
import Setting from '@/pages/setting'
import SysDetail from '@/pages/sysdetail'
import Help from '@/pages/help'
import Tgyj from '@/pages/tgyj'
import Txmx from '@/pages/txmx'
import TiXian from '@/pages/tixian'
import Pay from '@/pages/pay'
import Forget1 from '@/pages/forget1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta:{index:1}
    },
    {
      path: '/register/:pre',
      name: 'register',
      components: {
        main: Register,
      },
      meta:{index:2}
    },
    {
      path: '/forget',
      name: 'forget',
      components: {
        main: Forget,
      },
      meta:{index:2}
    },
    {
      path: '/demo',
      name: 'demo',
      components: {
        main: Demo,
      },
      meta:{index:100}
    },
    {
      path: '/jishi',
      name: 'jishi',
      components: {
        main: JiShi,
        footer: BotNav
      },
      meta:{index:3}
    },
    {
      path: '/wakuang',
      name: 'wakuang',
      components: {
        main: WaKuang,
        footer: BotNav
      },
      meta:{index:4}
    },
    {
      path: '/dongtai',
      name: 'dongtai',
      components: {
        main: DongTai,
        footer: BotNav
      },
      meta:{index:5}
    },
    {
      path: '/jiaoyi',
      name: 'jiaoyi',
      components: {
        main: JiaoYi,
        footer: BotNav
      },
      meta:{index:6}
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNav
      },
      meta:{index:7}
    },
    {
      path: '/qiandao',
      name: 'qiandao',
      components: {
        main: QianDao,
      },
      meta:{index:8}
    },
    {
      path: '/jyzx',
      name: 'jyzx',
      components: {
        main: Jyzx,
      },
      meta:{index:8}
    },
    {
      path: '/zhongchou',
      name: 'zhongchou',
      components: {
        main: ZhongChou,
      },
      meta:{index:8}
    },
    {
      path: '/pay/:money&:num&:order',
      name: 'pay',
      components: {
        main: Pay,
      },
      meta:{index:9}
    },
    {
      path: '/vinfo',
      name: 'vinfo',
      components: {
        main: Vinfo,
      },
      meta:{index:8}
    },
    {
      path: '/allinfo',
      name: 'allinfo',
      components: {
        main: AllInfo,
      },
      meta:{index:9}
    },
    {
      path: '/addcard',
      name: 'addcard',
      components: {
        main: AddCard,
      },
      meta:{index:9}
    },
    {
      path: '/succard',
      name: 'succard',
      components: {
        main: SucCard,
      },
      meta:{index:10}
    },
    {
      path: '/tuiguang/:x',
      name: 'tuiguang',
      components: {
        main: TuiGuang,
      },
      meta:{index:8}
    },
    {
      path: '/tgjl',
      name: 'tgjl',
      components: {
        main: Tgjl,
      },
      meta:{index:9}
    },
    {
      path: '/mydeal',
      name: 'mydeal',
      components: {
        main: MyDeal,
      },
      meta:{index:8}
    },
    {
      path: '/team',
      name: 'team',
      components: {
        main: Team,
      },
      meta:{index:8}
    },
    {
      path: '/czjl',
      name: 'czjl',
      components: {
        main: Czjl,
      },
      meta:{index:8}
    },
    {
      path: '/yjmx',
      name: 'yjmx',
      components: {
        main: Yjmx,
      },
      meta:{index:8}
    },
    {
      path: '/kefu',
      name: 'kefu',
      components: {
        main: KeFu,
      },
      meta:{index:8}
    },
    {
      path: '/setting',
      name: 'setting',
      components: {
        main: Setting,
      },
      meta:{index:8}
    },
    {
      path: '/sysdetail/:id&:type',
      name: 'sysdetail',
      components: {
        main: SysDetail,
      },
      meta:{index:9}
    },
    {
      path: '/help',
      name: 'help',
      components: {
        main: Help,
      },
      meta:{index:8}
    },
    {
      path: '/tgyj',
      name: 'tgyj',
      components: {
        main: Tgyj,
      },
      meta:{index:8}
    },
    {
      path: '/txmx',
      name: 'txmx',
      components: {
        main: Txmx,
      },
      meta:{index:9}
    },
    {
      path: '/tixian/:e&:bank&:rate',
      name: 'tixian',
      components: {
        main: TiXian,
      },
      meta:{index:9}
    },
    {
      path: '/forget1',
      name: 'forget1',
      components: {
        main: Forget1,
      },
      meta:{index:100}
    },
  ]
})
