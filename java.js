
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = getComputedStyle.bind();

const app = {
    songs: [
        { 
            name: 'Thê Lương',
            singer: 'Phúc Chinh',
            path: './asset/music/song1.jpg',
            img: './asset/img/img1.jpg'
        },
        { 
            name: 'Thức Giấc',
            singer: 'Da LAB',
            path: './asset/music/song2.jpg',
            img: './asset/img/img2.jpg'
        },
        { 
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song3.jpg',
            img: './asset/img/img3.jpg'
        },
        { 
            name: 'Sao Còn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền, Hoàng Duyên',
            path: './asset/music/song4.jpg',
            img: './asset/img/img4.jpg'
        },
        { 
            name: 'Phận Duyên Lỡ Làng',
            singer: 'Phát Huy T4, Truzg',
            path: './asset/music/song5.jpg',
            img: './asset/img/img5.jpg'
        },
        { 
            name: 'Trắc Trở',
            singer: 'X2X',
            path: './asset/music/song6.jpg',
            img: './asset/img/img6.jpg'
        },
        { 
            name: 'Nắm Đôi Bàn Tay',
            singer: 'Kay Trần',
            path: './asset/music/song7.jpg',
            img: './asset/img/img7.jpg'
        },
        { 
            name: 'Câu Hẹn Câu Thề',
            singer: 'Đình Dũng, ACV',
            path: './asset/music/song8.jpg',
            img: './asset/img/img8.jpg'
        },
        { 
            name: 'Níu Duyên',
            singer: 'Lê Bảo Bình',
            path: './asset/music/song9.jpg',
            img: './asset/img/img9.jpg'
        },
        { 
            name: 'Anh Không Tha Thứ',
            singer: 'Đình Dũng, ACV',
            path: './asset/music/song10.jpg',
            img: './asset/img/img10.jpg'
        },
        
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
        $('.playlist').innerHTML = htmls.join('');
    },

    minHeightPlaylist: function(cdWidth) {
        const song = $('.song');
        const playylist = $('.playlist');
        /* lấy tổng chiều cao của tất cả Song */
        var heightTotalSong =   song.offsetHeight;
        heightTotalSong += parseInt($$$(song).marginTop);
        heightTotalSong += parseInt($$$(song).marginBottom);
        heightTotalSong *= this.songs.length;

        /* lấy tổng chiều cao của playlist */
        var heightTotalPlayylist =   playylist.offsetHeight;
        heightTotalPlayylist += parseInt($$$(playylist).marginTop);
        heightTotalPlayylist += parseInt($$$(playylist).marginBottom);
        /* công thêm khoảng cách của thẻ cd để lấy giá trị lúc widthcd = 0
         thì playlis sẽ bị kéo dài ra */
        heightTotalPlayylist += cdWidth;
        
        /* tổng height tất cả song trừ đi height của playlist
        rồi đem so sánh với thẻ co dãn khi cuộn bé hơn thì không cuộc tránh lỗi */
        return heightTotalSong - heightTotalPlayylist;
    },
    handleEvents: function() {
        const cd = $('.dashbroad_info_cd');
        const cdWidth = cd.offsetWidth;

        var heightPlaylist = app.minHeightPlaylist(cdWidth);
        
        /* chay lại hàm minHeightPlaylist mỗi khi body thay đổi size
        để cập nhật lại heightPlaylist*/
        $$('body')[0].onresize = function abc() {
            cdWidthload = cd.offsetWidth;
            heightPlaylist = app.minHeightPlaylist(cdWidthload)
        };
        
        $('.playlist').onscroll = function (e) {
            // console.log(heightPlaylist);
            /* heightPlaylist phải lớn hơn cdWidth để tránh lỗi giật giật
            vì item song phải đủ nhiều để khi cuộn sẽ kéo width của hình xuống 0 px
            nếu item song ít qua cuộn bị nửa nửa không cuộc được hết sẽ bị lỗi giật giật*/
            if (heightPlaylist > cdWidth) {
                const scrollPlaylist = e.srcElement.scrollTop;
                const newCdWidth = cdWidth - scrollPlaylist ;
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0;
            }
        }
    },

    start: function() {
        this.render();
        this.handleEvents();
    }
}


app.start()