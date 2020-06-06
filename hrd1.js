// 武将类
/**
 * width: 武将宽度  1 2 4
 * height: 武将高度 1 2 4
 * left: this.left / 100 = x(武将横坐标)
 * top: this.top / 100 = x(武将纵坐标)
 * dom: 插入到网页中的元素
 * classname: 武将伪类(pesron_type: classname)
 * parentDon: 父级元素(用于渲染到父级上)
 * url: 武将图片地址
 */
class Wujiang {
    constructor(width, height, left, top, dom, className, parentDom, url) {
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.dom = dom;
        this.className = className;
        this.parentDom = parentDom;
        this.url = url;

        // 获取x,y轴坐标
        this.x = this.left / 100;
        this.y = this.top / 100;
        this.render();

        // 定时器
        this.timer;
    }
    render() {
        // 元素的宽高，定位，图片的初始化
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
        this.dom.style.position = 'absolute'
        this.dom.classList.add(this.className);
        this.dom.style.backgroundImage = this.url;
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundSize = 'auto 100%';
        this.dom.style.backgroundPosition = '50%';
        this.parentDom.appendChild(this.dom);

        // 改变黄忠的中心位置
        if (this.className == 'huangzhong') {
            this.dom.style.backgroundPosition = '80%';
        }
        // 改变赵云的中心位置
        if (this.className == 'zhaoyun') {
            this.dom.style.backgroundPosition = '40%';
        }
    }

    // 确定移动方向和移动距离
    move(wujiangArray, optimal, direction, i) {
        switch (direction) {
            case 'up':
                this.top -= 100;
                this.uniform(direction, this.top, wujiangArray, optimal, i);
                break;
            case 'down':
                this.top += 100;
                this.uniform(direction, this.top, wujiangArray, optimal, i);
                break;
            case 'left':
                this.left -= 100;
                this.uniform(direction, this.left, wujiangArray, optimal, i);
                break;
            case 'right':
                this.left += 100;
                this.uniform(direction, this.left, wujiangArray, optimal, i);
                break;
            default:
                console.log('移动方向发生错误');
                break;
        }
    }

    //匀速运动
    uniform(direction, distance, wujiangArray, optimal, i) {
        let f = i + 1;
        let bStop = false;
        clearInterval(this.timer);
        if (direction == 'up' || direction == 'down') {
            direction = 'top';
            this.__movingDirection(bStop, direction, distance, 'offsetTop', f, wujiangArray, optimal);
        } else {
            direction = 'left';
            this.__movingDirection(bStop, direction, distance, 'offsetLeft', f, wujiangArray, optimal);
        }
    }
    // 除去冗余代码 + 递归调用(实现动画一层一层播放)
    __movingDirection(bStop, direction, distance, offsetDir, f, wujiangArray, optimal) {
        let isPeed = distance - this.dom[offsetDir] > 0 ? 3 : -3;
        this.timer = setInterval(() => {
            if (Math.abs(distance - this.dom[offsetDir]) < Math.abs(isPeed)) {
                clearInterval(this.timer);
                this.dom.style[direction] = distance + 'px';
                bStop = true;
            } else {
                this.dom.style[direction] = this.dom[offsetDir] + isPeed + 'px';
            }
            if (bStop) {
                if (f < optimal.length) {
                    wujiangArray[optimal[f].person_type].move(wujiangArray, optimal, optimal[f].direction, f);
                }
            }
        }, 30)
    }
}

// 获取父级元素
let wrapper = document.getElementsByClassName('wrapper')[0];
// 获取点击按钮
let btn = document.getElementById('btn');

// 创建武将元素
let caocaoDiv = document.createElement('div');
let zhaoyunDiv = document.createElement('div');
let macaoDiv = document.createElement('div');
let guanyuDiv = document.createElement('div');
let huangzhongDiv = document.createElement('div');
let zhangfeiDiv = document.createElement('div');
let xb1Div = document.createElement('div');
let xb2Div = document.createElement('div');
let xb3Div = document.createElement('div');
let xb4Div = document.createElement('div');


// 创建武将实体类
let huangzhong = new Wujiang(100, 200, 300, 100, huangzhongDiv, 'huangzhong', wrapper, 'url(./img/huangzhong.jpg)'),
    caocao = new Wujiang(200, 200, 100, 100, caocaoDiv, 'caocao', wrapper, 'url(./img/caocao.jpg)'),
    zhaoyun = new Wujiang(100, 200, 0, 100, zhaoyunDiv, 'zhaoyun', wrapper, 'url(./img/zhaoyun.jpg)'),
    zhangfei = new Wujiang(100, 200, 300, 300, zhangfeiDiv, 'zhangfei', wrapper, 'url(./img/zhangfei.jpg)'),
    guanyu = new Wujiang(200, 100, 100, 0, guanyuDiv, 'guanyu', wrapper, 'url(./img/guanyu.jpg)'),
    xb1 = new Wujiang(100, 100, 100, 300, xb1Div, 'xb1', wrapper, 'url(./img/zu.jpg)'),
    xb2 = new Wujiang(100, 100, 200, 300, xb2Div, 'xb2', wrapper, 'url(./img/zu.jpg)'),
    machao = new Wujiang(100, 200, 0, 300, macaoDiv, 'machao', wrapper, 'url(./img/machao.jpg)'),
    xb3 = new Wujiang(100, 100, 0, 0, xb3Div, 'xb3', wrapper, 'url(./img/zu.jpg)'),
    xb4 = new Wujiang(100, 100, 300, 0, xb4Div, 'xb4', wrapper, 'url(./img/zu.jpg)');
// 把武将放入数组
let wujiangArray = {
    huangzhong,
    caocao,
    zhaoyun,
    zhangfei,
    guanyu,
    xb1,
    xb2,
    machao,
    xb3,
    xb4
};


// 模拟

// 给武将定位: 海阔天空摆法
let location_haikuo = [{
        name: 'huangzhong',
        x: 300,
        y: 100
    },
    {
        name: 'caocao',
        x: 100,
        y: 100
    },
    {
        name: 'zhaoyun',
        x: 0,
        y: 100
    },
    {
        name: 'zhangfei',
        x: 300,
        y: 300
    },
    {
        name: 'guanyu',
        x: 100,
        y: 0
    },
    {
        name: 'xb1',
        x: 100,
        y: 300
    },
    {
        name: 'xb2',
        x: 200,
        y: 300
    },
    {
        name: 'machao',
        x: 0,
        y: 300
    },
    {
        name: 'xb3',
        x: 0,
        y: 0
    },
    {
        name: 'xb4',
        x: 300,
        y: 0
    },
]
// 给后端发送的数据
let curLocation = [];
for (let i = 0; i < location_haikuo.length; i++) {
    let curName = location_haikuo[i].name; // 定位名称
    let curX = location_haikuo[i].x // x轴
    let curY = location_haikuo[i].y // y轴
    wujiangArray[curName].left = curX;
    wujiangArray[curName].top = curY;
    wujiangArray[curName].render();
    curLocation.push({
        name: curName,
        x: curX / 100,
        y: curY / 100
    });
}
// 给后端发送的数据
console.log(curLocation)



// 接受的后端数据
// 海阔天空 -最优解
let optimal = [{
        'person_type': 'xb1',
        'direction': 'down'
    },
    {
        'person_type': 'xb2',
        'direction': 'down'
    },
    {
        'person_type': 'caocao',
        'direction': 'down'
    },
    {
        'person_type': 'guanyu',
        'direction': 'down'
    },
    {
        'person_type': 'xb3',
        'direction': 'right'
    },
    {
        'person_type': 'xb4',
        'direction': 'left'
    },
    {
        'person_type': 'zhaoyun',
        'direction': 'up'
    },
    {
        'person_type': 'machao',
        'direction': 'up'
    },
    {
        'person_type': 'huangzhong',
        'direction': 'up'
    },
    {
        'person_type': 'xb1',
        'direction': 'left'
    },
    {
        'person_type': 'zhangfei',
        'direction': 'up'
    },
    {
        'person_type': 'xb2',
        'direction': 'right'
    },
    {
        'person_type': 'caocao',
        'direction': 'down'
    },
    {
        'person_type': 'caocao',
        'direction': 'down'
    }
]
// 模仿移动
btn.onclick = () => {
    wujiangArray[optimal[0].person_type].move(wujiangArray, optimal, optimal[0].direction, 0);
}
