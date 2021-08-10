const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = getComputedStyle.bind();


const nameSongUI = $('.dashbroad_info_name');
const cd = $('.dashbroad_info_cd');
const cdThumbUI = $('.dashbroad_info_cd_image');
const audio = $('#audio');
const playBtn = $('.dashbroad_control_pp');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.dashbroad_control_next');
const prevBtn = $('.dashbroad_control_previous');
const randomBtn = $('.dashbroad_control_random');
const repeatBtn = $('.dashbroad_control_repeat');
const dashLabel = $('.dashbroad_info_label');
const playlist = $('.playlist');
const song = $('.song');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: 'Thê Lương',
            singer: 'Phúc Chinh',
            path: './asset/music/song1.mp3',
            img: './asset/img/img1.jpg'
        },
        {
            name: 'Thức Giấc',
            singer: 'Da LAB',
            path: './asset/music/song2.mp3',
            img: './asset/img/img2.jpg'
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song3.mp3',
            img: './asset/img/img3.jpg'
        },
        {
            name: 'Sao Còn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền, Hoàng Duyên',
            path: './asset/music/song4.mp3',
            img: './asset/img/img4.jpg'
        },
        {
            name: 'Phận Duyên Lỡ Làng',
            singer: 'Phát Huy T4, Truzg',
            path: './asset/music/song5.mp3',
            img: './asset/img/img5.jpg'
        },
        {
            name: 'Trắc Trở',
            singer: 'X2X',
            path: './asset/music/song6.mp3',
            img: './asset/img/img6.jpg'
        },
        {
            name: 'Nắm Đôi Bàn Tay',
            singer: 'Kay Trần',
            path: './asset/music/song7.mp3',
            img: './asset/img/img7.jpg'
        },
        {
            name: 'Câu Hẹn Câu Thề',
            singer: 'Đình Dũng, ACV',
            path: './asset/music/song8.mp3',
            img: './asset/img/img8.jpg'
        },
        {
            name: 'Níu Duyên',
            singer: 'Lê Bảo Bình',
            path: './asset/music/song9.mp3',
            img: './asset/img/img9.jpg'
        },
        {
            name: 'Anh Không Tha Thứ',
            singer: 'Đình Dũng, ACV',
            path: './asset/music/song10.mp3',
            img: './asset/img/img10.jpg'
        },
        {
            name: 'Có Hẹn Với Thanh Xuân',
            singer: 'MONSTAR',
            path: './asset/music/song11.mp3',
            img: './asset/img/img11.jpg'
        },
        {
            name: 'Sao Ta Ngược Lối',
            singer: 'Đình Dũng',
            path: './asset/music/song12.mp3',
            img: './asset/img/img12.jpg'
        },
        {
            name: 'Vách Ngọc Ngà',
            singer: 'Anh Rồng',
            path: './asset/music/song13.mp3',
            img: './asset/img/img13.jpg'
        },
        {
            name: 'Trên Tình Bạn Dưới Tình Yêu',
            singer: 'MIN',
            path: './asset/music/song14.mp3',
            img: './asset/img/img14.jpg'
        },
        {
            name: 'Chúng Ta Sau Này',
            singer: 'T.R.I',
            path: './asset/music/song15.mp3',
            img: './asset/img/img15.jpg'
        },
    ],

    /*  true = đang pause
        flase = đang play */
    currentPlayPause: function() {
        result = [player.classList].some(function(array) {
            return array[1] == 'playing';
        });
        return this.isPlaying = result;
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" data-index="${index}">
                <div class="song_thumbnail">
                    <div class="song_thumbnail_img" 
                        style="background-image: url(${song.img});" >
                    </div>
                </div>
                <div class="song_content">
                    <div class="song_content_name">
                        ${song.name}
                    </div>
                    <div class="song_content_singer">
                        ${song.singer}
                    </div>
                </div>
                <div class="song_option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },

    minHeightPlaylist: function(cdWidth) {
        /* lấy tổng chiều cao của tất cả Song */
        var heightTotalSong = $('.song').offsetHeight ;
        heightTotalSong += parseInt($$$($('.song')).marginTop);
        heightTotalSong += parseInt($$$($('.song')).marginBottom);
        heightTotalSong *= this.songs.length;

        /* lấy tổng chiều cao của playlist */
        var heightTotalPlayylist = playlist.offsetHeight;
        heightTotalPlayylist += parseInt($$$(playlist).marginTop);
        heightTotalPlayylist += parseInt($$$(playlist).marginBottom);
        /* công thêm khoảng cách của thẻ cd để lấy giá trị lúc widthcd = 0
         thì playlis sẽ bị kéo dài ra */
        heightTotalPlayylist += cdWidth;

        // console.log(heightTotalPlayylist)
        /* tổng height tất cả song trừ đi height của playlist
        rồi đem so sánh với thẻ co dãn khi cuộn bé hơn thì không cuộc tránh lỗi */
        return heightTotalSong - heightTotalPlayylist;
    },

    defineProperties: function() {
        /* thêm một key là currentSong và có value là phần tử
        đầu tiên của object this.song this = app*/
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        var heightPlaylist = app.minHeightPlaylist(cdWidth);

        /* xử lý cd quay và dừng */
        const cdThumbUIAnimate = cdThumbUI.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbUIAnimate.pause()
            /* chay lại hàm minHeightPlaylist mỗi khi body thay đổi size
            để cập nhật lại heightPlaylist*/
        $$('body')[0].onresize = function abc() {
            cdWidthload = cd.offsetWidth;
            heightPlaylist = _this.minHeightPlaylist(cdWidthload)
        };

        /* xử lý phóng to thu nhỏ cd khi scroll playlist */
        playlist.onscroll = function(e) {
            // console.log(heightPlaylist);
            /* heightPlaylist phải lớn hơn cdWidth để tránh lỗi giật giật
            vì item song phải đủ nhiều để khi cuộn sẽ kéo width của hình xuống 0 px
            nếu item song ít qua cuộn bị nửa nửa không cuộc được hết sẽ bị lỗi giật giật*/
            if (heightPlaylist > cdWidth) {
                const scrollPlaylist = e.srcElement.scrollTop;
                const newCdWidth = cdWidth - scrollPlaylist;
                if (newCdWidth > 0) {
                    cd.style.width = newCdWidth + 'px'
                    // cd.style.marginBottom = "20px";
                }else {
                    cd.style.width =0;
                    // cd.style.marginBottom = "0";
                }
                cd.style.opacity = newCdWidth / cdWidth;
            }
        }

        /* xử lý khi nhấn play */
        playBtn.onclick = function() {
            _this.currentPlayPause()
            if (!_this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        /* khi bài hát được play */
        audio.onplay = function() {
            player.classList.add('playing')
            cdThumbUIAnimate.play()
            _this.volumeUp(0,0.05,25);

            dashLabel.innerHTML = "Playing"
        }

        /* khi bài hát được pause */
        audio.onpause = function() {
            player.classList.remove('playing')
            cdThumbUIAnimate.pause()
        }

        /* phi bài hát đang được phát */
        audio.ontimeupdate = function() {
            if (this.duration) {
                progress.value = Math.floor(this.currentTime * 100 / this.duration)
            }
        }

        /* khi progress bị thay đổi thì sẽ làm gì*/
        progress.oninput = function(e) {
            currentPerson = e.target.value;
            audio.currentTime = currentPerson * audio.duration / 100;
        }

        /* khi nhạc gần hết */
        

        /* khi next */
        nextBtn.onclick = function() {
            if (_this.isRepeat) {
                audio.load();
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            if (_this.isRandom) {
                _this.playRandomSong();
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            _this.nextSong();
            audio.play();
            _this.scrollToActiveSong()
        }

        /* khi previous */
        prevBtn.onclick = function() {
            if (_this.isRepeat) {
                audio.load();
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            if (_this.isRandom) {
                _this.playRandomSong();
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            _this.previousSong();
            audio.play();
            _this.scrollToActiveSong()
        }

        /* xử lý khi random */
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        /* xử lý phát lại tuần tự các bài hát */
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat);

        }

        /* xử lý khi hết bài hát */
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            if (_this.isRandom) {
                _this.playRandomSong();
                audio.play();
                _this.scrollToActiveSong()
                return;
            }
            _this.nextSong();
            audio.play();
            _this.scrollToActiveSong()
        }

        playlist.onclick = function(e) {
            var clickSong = e.target.closest('.song:not(.active)');
            var clicksongOption = e.target.closest('.song_option');
            if (clickSong || clicksongOption) {
                if (clickSong && !clicksongOption) {
                    // console.log(clickSong)
                    var clickSongIndex = parseInt(clickSong.getAttribute('data-index'))
                    _this.currentIndex = clickSongIndex
                    _this.loadCurrenSong()
                    _this.activeSong(clickSongIndex);
                    audio.play();
                }
                if (clicksongOption) {
                    // console.log(clicksongOption)
                }
            }

        }

        audio.onwaiting  = function() {
            dashLabel.innerHTML = `
            <i class="fas fa-heart"></i>
                Music Loading
            <i class="fas fa-heart"></i>
            `
        };
        audio.oncanplaythrough = function() {
            dashLabel.innerHTML = `
            <i class="fas fa-heart"></i>
            Playing...
            <i class="fas fa-heart"></i>
            `
        };


    },

    loadCurrenSong: function() {
        nameSongUI.textContent = this.currentSong.name;
        cdThumbUI.style.backgroundImage = `url(${this.currentSong.img})`;
        audio.src = this.currentSong.path;

        // console.log(nameSongUI);
        // console.log(cdThumbUI );
        // console.log(audio );
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
        this.loadCurrenSong()
            // console.log(playlist.children[this.currentIndex]);
        this.activeSong(this.currentIndex);
    },
    previousSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrenSong()
        this.activeSong(this.currentIndex);
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrenSong()
        this.activeSong(this.currentIndex);
    },

    activeSong: function(index = 0) {
        var length = this.songs.length;
        for (var i = 0; i < length; ++i) {
            playlist.children[i].classList.remove('active');
        }
        var song = playlist.children[index]
        song.classList.add('active');
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100)
    },

    volumeUp: function (starVolume,step = 0.01,speed = 50) {
        audio.volume = starVolume
        for (let i = 0; i <= 1; i+=step){ 
            setTimeout(function () {  
                if (audio.volume < 0.9) {
                    audio.volume += step 
                }else {
                    audio.volume = 1;
                }
            }, i*speed*100)
        }
    },

    

    start: function() {
        /* định nghĩa các thuộc tính cho Object app */
        this.defineProperties();

        /* lắng nghe và sự lý các sự kiện */
        this.handleEvents();

        /* tải bài hát đầu tiên vào UI khi chạy ứng dụng */
        this.loadCurrenSong()

        /* render danh sách bài hát */
        this.render();

        this.activeSong();

        
    }
}
function Effect() {
    var widthBody = $$('body')[0].offsetWidth;
    if (widthBody >= 1024) {
        VanillaTilt.init(document.querySelectorAll(".btn"), {
            reverse:                false,  // reverse the tilt direction
            max:                    35,     // max tilt rotation (degrees)
            startX:                 0,      // the starting tilt on the X axis, in degrees.
            startY:                 0,      // the starting tilt on the Y axis, in degrees.
            perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
            scale:                  1,      // 2 = 200%, 1.5 = 150%, etc..
            speed:                  300,    // Speed of the enter/exit transition
            transition:             true,   // Set a transition on enter/exit.
            axis:                   null,   // What axis should be disabled. Can be X or Y.
            reset:                  true,    // If the tilt effect has to be reset on exit.
            easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
            glare:                  true,   // if it should have a "glare" effect
            "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
            "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                            // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
            "mouse-event-element":  null, 
        });
        VanillaTilt.init(document.querySelector(".dashbroad_info_cd"), {
            reverse:                false,  // reverse the tilt direction
            max:                    35,     // max tilt rotation (degrees)
            glare:                  true,   // if it should have a "glare" effect
            "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
            "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                            // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
            "mouse-event-element":  null, 
        });
    }
}

app.start()
Effect()