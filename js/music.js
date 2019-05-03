



(function(){

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
    let playlist=[
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
            title:'千年',
            artist:'吉克隽逸&金志文  ',
            album:'电视剧《天乩之白蛇传说》',
            img:'./img/110.gif',
            mp3:'http://www.ytmp3.cn/down/49093.mp3',
        },
        {
            title:'多余的解释',
            artist:'许嵩',
            album:'未知',
            img:'./img/9.gif',
            mp3:'http://www.ytmp3.cn/down/60447.mp3',
        }
    ];

    // 添加歌曲列表
    for(let i=0;i<playlist.length;i++){
        let item=playlist[i];
        $("#playlist").innerHTML=$("#playlist").innerHTML+('<li>'+item.artist+'-'+item.title+'</li>');
    }

    /**
     * @param {播放标签} audio
     * @param {当前位置} location
     * @param {声音大小} voiceSize
     * @param {进度条大小} processSize
     * @param {播放模式:单曲(single)，顺序(sequence)，乱序(disorder)} playbackMode
     * @param {是否静音} isVoice
     * @memberof Music
     */
    class Music{
        constructor(audio,location,voiceSize,processSize,playbackMode,isVoice){
            this.audio=audio;
            this.location=location;
            this.voiceSize=voiceSize;
            this.processSize=processSize;            
            this.playbackMode=playbackMode;
            this.isVoice=isVoice;
        }
        /**
         * run()播放歌曲控制
         * domIcon：播放/暂停所在位置 
         * playClass:播放class
         * pauseClass:暂停class
         */
        run(
            {
                domIcon=$(".player-component i")[0][1],
                playClass="icon-play",
                pauseClass="icon-zanting"
            }={}
        ){
            if(this.audio.paused){
                domIcon.classList.remove(playClass);
                domIcon.classList.add(pauseClass);
                this.audio.play();
            }else{
                domIcon.classList.remove(pauseClass);
                domIcon.classList.add(playClass);
                this.audio.pause();
            } 
        }
        /**
         * voiceControl()控制声音是否静音图标变化
         * oiceIcon：声音图标所在位置
         * voiceClass：非静音class
         * muteClass：静音class
         * voiceLoaded：声音进度条
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
         * musicImg：音乐图片
         * title: 音乐标题
         * artist: 歌手
         * album：专辑
         * li：音乐列表
         * palyingClass：正在播放的音乐列表样式
         * oiceIcon：声音图标所在位置
         * voiceClass：非静音class
         * muteClass：静音class
         * voiceLoaded：声音进度条
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
            this.audio.src=playlist[this.location].mp3;
            musicImg.src=playlist[this.location].img;
            title.innerText=playlist[this.location].title;
            artist.innerText=playlist[this.location].artist;
            album.innerText=playlist[this.location].album;
            li[this.location].classList.add(palyingClass);
            this.voiceControl({voiceIcon,voiceClass,muteClass,voiceLoaded});
        }
        // 事件绑定
        eventBind(
            {
                voiceSlider=$("#voiceSlider"),
                voiceLoaded=$("#voiceLoaded"),
                voiceIcon=$("#isVoice"),
                voiceClass="icon-shengyin",
                muteClass="icon-jingyin",
                musicSlider=$("#musicSlider"),
                musicLoaded=$("#musicLoaded"),  
            }={}
        ){
            //控制声音的大小
            voiceSlider.onclick=()=>{
                let x=event.offsetX;//距左边的X轴
                let Width=voiceSlider.offsetWidth;//整个div的长度
                this.voiceSize=x/Width;
                this.voiceControl();
            }; 
        }
    }


    
    let music=new Music($("#audio"),0,0.5,0,"sequence",false);
    music.change();
    music.eventBind();
    music.run();
       
})();