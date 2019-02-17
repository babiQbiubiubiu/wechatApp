import 'muse-ui/lib/styles/base.less'
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    BottomNav,
    Divider,
    Drawer,
    Icon,
    List,
    Tabs,
    TextField,
	Form,  // 登录验证 
	Checkbox, // 登录表单选中框
	SubHeader
} from 'muse-ui'

const componets = [AppBar, Avatar, Badge, Button, BottomNav, Divider, Drawer, Icon, List, Tabs, TextField, Form, Checkbox, SubHeader]

export default {
    // Vue.use(对象) 方法会调用对象的install方法并且将,Vue构造函数传入install函数内
    install(Vue) {
        componets.forEach(c => Vue.use(c))
    }
}