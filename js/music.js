function screenWH(){
    let offsetWid = document.documentElement.clientWidth;
    let offsetHei = document.documentElement.clientHeight;
    if (/(Android)/i.test(navigator.userAgent)){     // 判断是否为Android手机
        offsetWid = screen.width;
        offsetHei = screen.height;
    }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){  // 判断是否为苹果手机
        offsetWid=document.documentElement.clientWidth;
        offsetHei=document.documentElement.clientHeight;
    }
    document.getElementsByTagName("body")[0].style.width=offsetWid+"px";
    document.getElementsByTagName("body")[0].style.height=offsetHei+"px";
};

(function(){
    screenWH();

    // 简单定义封装$
    let $=function(str){
    // 根据空格分割成数组
    let ary=str.split(' ');
    let dom=document;

    // 查询class，tag的为时候数组
    function queryChildren(dom,num){
        let dom_ary=[];
        if(ary[num].indexOf('.')>=0){
            for(let i=0;i<dom.length;i++){
                dom_ary.push(dom[i].getElementsByClassName(ary[num].slice(1)));
            }
        }else{
            for(let i=0;i<dom.length;i++){
                dom_ary.push(dom[i].getElementsByTagName(ary[num]));
            }
        }
        if(num+1!=ary.length){
                let new_ary=[];
                for(let i=0;i<dom_ary.length;i++){
                    let val=dom_ary[i];
                    new_ary.push(queryChildren(val,num+1));
                    console.log(new_ary[i])
                }
                dom_ary=new_ary;
        }
            return dom_ary;
        }

        for(let i=0;i<ary.length;i++){
            if(dom.length){
                return dom=queryChildren(dom,i);
            }else{
                if(ary[i].indexOf('#')>=0){
                    dom=dom.getElementById (ary[i].slice(1));
                }else if(ary[i].indexOf('.')>=0){
                    dom=dom.getElementsByClassName (ary[i].slice(1));
                }else{
                    dom=dom.getElementsByTagName(ary[i]);
                }
            }
        }
        return dom;
    }
    // 测试封装$方法
    // console.log($("#player .control div")[0][1]);
    // 歌单数组
    let list=[
        {
            title:'Bye Bye Bye',
            artist:'Lovestoned',
            album:'Rising Love',
            img:'./img/2.gif',
            mp3:'http://www.ytmp3.cn/down/39165.mp3',
        },
        {
            title:'Axero',
            artist:'Trip',
            album:'未知',
            img:'./img/ef6d41.gif',
            mp3:'http://www.ytmp3.cn/down/46328.mp3',
        },
        {
            title:'是风动',
            artist:'银临&河图',
            album:'未知',
            img:'./img/110.gif',
            mp3:'http://www.ytmp3.cn/down/52056.mp3',
        },
        {
            title:'多余的解释',
            artist:'许嵩',
            album:'未知',
            img:'./img/mc.gif',
            mp3:'http://www.ytmp3.cn/down/60447.mp3',
        }
    ];

    

    /**
     * @param {播放标签} audio
     * @param {当前位置} location
     * @param {声音大小} voiceSize
     * @param {进度条大小} processSize
     * @param {播放模式:单曲(single)，顺序(sequence)，乱序(disorder)} playbackMode
     * @param {是否静音} isVoice
     * @param {音乐列表} playlist
     * @memberof Music
     */
    class Music{
        constructor(audio,location,voiceSize,processSize,playbackMode,isVoice,playlist){
            this.audio=audio;
            this.location=location;
            this.voiceSize=voiceSize;
            this.processSize=processSize;            
            this.playbackMode=playbackMode;
            this.isVoice=isVoice;
            this.playlist=playlist;
        }

        /**
         * 添加歌曲列表
         * @param {所要生成列表的父级标签} list
         * 
         * @memberof Music
         */
        createPlayList(list=$("#playlist")){ 
            for(let i=0;i<this.playlist.length;i++){
                let item=this.playlist[i];
                list.innerHTML=list.innerHTML+('<li>'+item.artist+'-'+item.title+'</li>');
            }
        }
        /**
         * voiceControl()控制声音是否静音图标变化
         * @param {*} {
         *                  voiceIcon：声音图标所在位置
         *                  voiceClass：非静音class
         *                  muteClass：静音class
         *                  voiceLoaded：声音进度条
         *             }
         * @memberof Music
         */
        voiceControl(
            {
                voiceIcon=$("#isVoice"),
                voiceClass="icon-shengyin",
                muteClass="icon-jingyin",
                voiceLoaded=$("#voiceLoaded")
            }={}
        ){
            if(this.isVoice||this.voiceSize==0){
                voiceIcon.classList.remove(voiceClass);
                voiceIcon.classList.add(muteClass);
                this.audio.volume=0;
            }else{
                voiceIcon.classList.remove(muteClass);
                voiceIcon.classList.add(voiceClass);
                this.audio.volume=this.voiceSize;
            }
            voiceLoaded.style.width=this.voiceSize*100+"%";
        }
        /**
         * change()播放音乐样式变化改变
         * @param {*} {
         *                  musicImg：音乐图片；
         *                  title: 音乐标题；
         *                  artist: 歌手；
         *                  album：专辑；
         *                  li：音乐列表；
         *                  palyingClass：正在播放的音乐列表样式；
         *                  voiceIcon：声音图标所在位置；
         *                  voiceClass：非静音class；
         *                  muteClass：静音class；
         *                  voiceLoaded：声音进度条
         *             }
         * @memberof Music
         */
        change(
            {
                musicImg=$("#music-img"),
                title=$("#music .tag strong")[0][0],
                artist=$("#music .tag .artist")[0][0],
                album=$("#music .tag .album")[0][0],
                li=$("#playlist li"),
                palyingClass="playing",
                voiceIcon=$("#isVoice"),
                voiceClass="icon-shengyin",
                muteClass="icon-jingyin",
                voiceLoaded=$("#voiceLoaded")
            }={}
        ){
            for(let i=0;i<this.playlist.length;i++){
                li[i].classList.remove(palyingClass);
            }
            this.audio.src=this.playlist[this.location].mp3;
            musicImg.src=this.playlist[this.location].img;
            title.innerText=this.playlist[this.location].title;
            artist.innerText=this.playlist[this.location].artist;
            album.innerText=this.playlist[this.location].album;
            li[this.location].classList.add(palyingClass);
            this.voiceControl();
        }
        //格式秒数
        format(_time)
        {
            return _time.toString().replace(/^(\d)$/, "0$1")	
        }
        
        /**
         *
         *歌曲进度条自动绘制
         * @param {string} [musicLoaded=$("#musicLoaded")]
         * @memberof Music
         */
        automaticPlotting(musicLoaded=$("#musicLoaded")){
            let time=setInterval(()=>{
                let duration=this.audio.duration;//歌曲总时长
                let currentTime=this.audio.currentTime;//歌曲播放当前时间
                musicLoaded.style.width=currentTime/duration*100+'%';//绘制进度条
                if(this.audio.ended){
                    clearInterval(time);
                }
            },10);
        }
        /**
         *
         *
         * @param {*} [{   
         *                 musicLoaded：音乐进度条；
         *                 _time：音乐动态时间；
        *                  musicImg：音乐图片；
         *                 title: 音乐标题；
         *                 artist: 歌手；
         *                 album：专辑；
         *                 li：音乐列表；
         *                 palyingClass：正在播放的音乐列表样式；
         *                 voiceIcon：声音图标所在位置；
         *                 voiceClass：非静音class；
         *                 muteClass：静音class；
         *                 voiceLoaded：声音进度条
         * @memberof Music
         */
        run(
            {   
                musicLoaded=$("#musicLoaded"),
                _time=$("#time"),
                musicImg=$("#music-img"),
                title=$("#music .tag strong")[0][0],
                artist=$("#music .tag .artist")[0][0],
                album=$("#music .tag .album")[0][0],
                li=$("#playlist li"),
                palyingClass="playing",
                voiceIcon=$("#isVoice"),
                voiceClass="icon-shengyin",
                muteClass="icon-jingyin",
                voiceLoaded=$("#voiceLoaded")
            }={}
        ){
            this.audio.play();
            this.automaticPlotting(musicLoaded);
            let time=setInterval(()=>{
                let cur=this.audio.currentTime;
                _time.innerText=this.format(parseInt(cur/60))+ ':' + this.format(parseInt(((cur-60*parseInt(cur/60)))));
                if(this.audio.ended){
                    clearInterval(time);
                    this.playOrder();
                    this.change();
                    this.run();
                }
            },10);
        }
        //播放顺序
        playOrder(){
            if(this.playbackMode=='single'){//单曲循环 

            }else if(this.playbackMode=='sequence'){//顺序播放
                if(this.location==this.playlist.length-1){
                    this.location=0;
                }else{
                    this.location++;
                }
            }else{//乱序播放
                    this.location=parseInt(Math.random() * this.playlist.length);
            }
        }
        /**
         * eventBind()事件绑定
         * @param {*} {
         *                  voiceSlider：声音进度条外层；
         *                  voiceLoaded：声音进度条；
         *                  voiceIcon：声音图标所在位置；
         *                  voiceClass：非静音class；
         *                  muteClass：静音class；
         * 
         *                  suspend：播放/暂停所在位置 
         *                  playClass:播放class
         *                  pauseClass:暂停class；
         * 
         *                  prev：上一首；   
         *                  next：下一首；
         *                  musicImg：音乐图片；
         *                  title: 音乐标题；
         *                  artist: 歌手；
         *                  album：专辑；
         *                  li：音乐列表；
         *                  palyingClass：正在播放的音乐列表样式；
         * 
         *                  musicSlider：歌曲进度条外面；
         *                  musicLoaded：歌曲进度条；
         *                  _time：音乐动态时间；
         *                  
         *                  playMode：播放模式；
         *                  singleClass：单曲Class；
         *                  sequenceClass：顺序Class；
         *                  disorderClass：乱序Class；
         *             }
         * @memberof Music
         */
        eventBind(
            {
                voiceSlider=$("#voiceSlider"),
                voiceLoaded=$("#voiceLoaded"),
                voiceIcon=$("#isVoice"),
                voiceClass="icon-shengyin",
                muteClass="icon-jingyin",

                suspend=$("#suspend"),
                playClass="icon-play",
                pauseClass="icon-zanting",

                prev=$("#prev"),
                next=$("#next"),
                musicImg=$("#music-img"),
                title=$("#music .tag strong")[0][0],
                artist=$("#music .tag .artist")[0][0],
                album=$("#music .tag .album")[0][0],
                li=$("#playlist li"),
                palyingClass="playing",


                musicSlider=$("#musicSlider"),
                musicLoaded=$("#musicLoaded"),
                _time=$("#time"),

                playMode=$("#playMode"),
                singleClass="icon-danquxunhuan",
                sequenceClass="icon-shunxubofang",
                disorderClass="icon-suijibofang"
            }={}
        ){
            //控制声音的大小
            voiceSlider.onclick=()=>{
                let x=event.offsetX;//距左边的X轴
                let Width=voiceSlider.offsetWidth;//整个div的长度
                this.voiceSize=x/Width;
                this.voiceControl();
            }; 
            //点击声音图标
            voiceIcon.onclick=()=>{
                this.isVoice=!this.isVoice;
                this.voiceControl();
            }
            //上一首
            prev.onclick=()=>{
                this.location--;
                if(this.location<0){
                    this.location=this.playlist.length-1;
                }
                this.change();
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                }
                this.run();
            }
            //下一首
            next.onclick=()=>{
                this.location++;
                if(this.location==this.playlist.length){
                    this.location=0;
                }
                this.change();
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                }
                this.run();
            }
            //暂停/播放控制
            suspend.onclick=()=>{
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                    this.run();
                }else{
                    suspend.classList.remove(pauseClass);
                    suspend.classList.add(playClass);
                    this.audio.pause();
                }
            }
            //控制进度条
            musicSlider.onclick=()=>{
                let x=event.offsetX;//距左边的X轴
                let Width=musicSlider.offsetWidth;//整个div的长度
                let duration=this.audio.duration;//歌曲总时长
                this.audio.currentTime=x/Width*duration;
                musicLoaded.style.width=x/Width*100+'%';
            }
            //控制播放顺序
            playMode.onclick=()=>{
                if(this.playbackMode=='single'){//单曲循环 
                    playMode.classList.remove(singleClass);
                    playMode.classList.add(sequenceClass);
                    this.playbackMode='sequence';
                }else if(this.playbackMode=='sequence'){//顺序播放
                    playMode.classList.remove(sequenceClass);
                    playMode.classList.add(disorderClass);
                    this.playbackMode='disorder';
                }else{//乱序播放
                    playMode.classList.remove(disorderClass);
                    playMode.classList.add(singleClass);
                    this.playbackMode='single';
                }
            }
            //列表点击播放
            for(let i=0;i<this.playlist.length;i++){
                li[i].onclick=()=>{
                    this.location=i;
                    this.change();
                    if(this.audio.paused){
                        suspend.classList.remove(playClass);
                        suspend.classList.add(pauseClass);
                    }
                    this.run();
                }
            }
        }
        
    }


    
    let music=new Music($("#audio"),0,0.3,0,"sequence",false,list);
    music.createPlayList();
    music.change();
    music.eventBind();
       
})();

window.onresize=function(){
    screenWH();
}