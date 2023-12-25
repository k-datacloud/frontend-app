<template>
    <v-app>
        <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/home')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="post-btn" @click="this.dialog = !this.dialog">
                <v-icon>mdi-plus</v-icon>投稿する
            </v-btn>
            <v-btn class="search-btn" @click="this.$router.push('/search')">
                <v-icon>mdi-magnify</v-icon>検索する
            </v-btn>
            <v-btn class="my-page" @click="this.$router.push(`/mypage/${userId}`)">
                <v-icon>mdi-account</v-icon>マイページ
            </v-btn>
            <v-btn class="logout" @click="Logout()">
                <v-icon>mdi-logout</v-icon>ログアウト
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container class="mt-16">
                <h2 class="home-title mb-10">
                    <span class="home-title__sub">最近の投稿</span>
                </h2>
                <div class="sort-btn d-flex">
                    <v-btn @click="getPosts()" class="mr-4" elevation="0">
                        <v-icon>mdi-sort</v-icon>日付順</v-btn>
                    <v-btn @click="rankPost()" elevation="0">
                        <v-icon>mdi-heart</v-icon>人気順</v-btn>
                </div>
                <v-row class="mx-auto">
                    <v-col cols="8" class="mx-auto" v-for="(post, index) in reversePostData" :key="index">
                        <v-card class="pa-4">

                            <v-col class="">
                                <div class="">
                                    <p @click="this.$router.push(`/user/${post.user}`)" class="username">@{{ post.user_name }}</p>
                                    <p class="date">投稿日&nbsp;{{ post.created_at }}</p>
                                </div>
                            </v-col>

                            <v-col class="post-info">
                                <v-card-item @click="this.$router.push(`/post/${post.id}`)">
                                    <v-card-title class="post-info__title">{{ post.title }}</v-card-title>
                                    <v-card-text class="post-info__content pa-0"><span class="post-person">どんな人に届けたいか</span>&nbsp;{{ post.person }}</v-card-text>
                                </v-card-item>
                            </v-col>

                            <v-col class="detail-item">
                                <div class="d-flex align-center">
                                        <v-icon class="mr-2" style="font-size: 20px;" :style="{color: post.like_count > 0 ? 'red' : 'black'}">mdi-heart</v-icon>
                                         <span class="likes"> {{ post.like_count }}いいね</span>
                                </div>
                            </v-col>
                        </v-card>
                    </v-col>
                </v-row>

                <v-dialog class="dialog" fullscreen transition="dialog-bottom-transition" v-model="dialog" overlay-color="white">
                    <v-card>
                        <v-toolbar app color="white" class="dialog-toolbar pa-4 mb-8 d-flex align-center" elevation="0">
                            <v-toolbar-title class="dialog-title">新規投稿</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn elevation="0" class="close-btn mb-8" @click="this.dialog = !this.dialog"><v-icon size="30">mdi-close</v-icon></v-btn>
                        </v-toolbar>
                        <v-card elevation="0" width="800" class="pa-4 mx-auto">
                            <v-form @submit.prevent="createPost(this.userId)" >
                                <v-text-field variant="outlined" class="text-field" v-model="this.postContent.title" label="タイトル"></v-text-field>
                                <v-text-field variant="outlined" class="text-field" v-model="this.postContent.person" label="どんな人に届けたいか"></v-text-field>
                                <v-textarea rows="10" variant="outlined" class="text-field" v-model="this.postContent.content" label="投稿内容"></v-textarea>
                                <v-col class="d-flex justify-center">
                                    <v-btn class="post-btn" type="submit">投稿する</v-btn>
                                </v-col>
                            </v-form>
                        </v-card>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    name: 'UserPage',

    data: () => ({
        userToken: '',
        postData: [],
        dialog : false,
        postContent: {title: '', person: '', content: ''},
        likeCount: 0,
    }),

    methods: {
        async Logout() {
            const url = 'http://127.0.0.1:8000/logout/';
            const cokies = Cookies.get('csrftoken');
            const token = this.$store.state.authToken;


            try {
                const logoutres = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type':  'application/json',
                        'X-CSRFToken': cokies,
                        'Authorization': `Token ${token}`,
                    },
                })

                if (logoutres.ok) {
                    this.$store.commit('setAuthToken', '');
                    this.$store.commit('setUserId', '');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    this.$router.push('/login');
                }

            } catch {
                console.log('error');
            }
        },

        async getPosts() {
            const url = 'http://127.0.0.1:8000/post/';
            const csrftoken = Cookies.get('csrftoken');
            const authToken = this.$store.state.authToken;

            try {

                const postres = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${authToken}`,
                        'Content-Type':  'application/json',
                        'X-CSRFToken': csrftoken,
                    }
                })

                if (!postres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                    throw new Error('Network response was not ok');
                }

                const postData = await postres.json();
                console.log(postData);
                this.postData = postData;
                this.formatted_Date();

            } catch {
                console.log('error');
            }

        },

        formatted_Date() {
            for (let i = 0; i < this.postData.length; i++) {
                const date = new Date(this.postData[i].created_at);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                this.postData[i].created_at = `${year}年${month}月${day}日`;
            }
        },

        async createPost(id) {
            const url = 'http://127.0.0.1:8000/post/';
            const csrftoken = Cookies.get('csrftoken');
            const token = this.$store.state.authToken;
            console.log(id);

            try {

                const createres = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type':  'application/json',
                        'X-CSRFToken': csrftoken,
                        'Authorization': `Token ${token}`,
                    },
                    body:JSON.stringify({
                        title: this.postContent.title,
                        person: this.postContent.person,
                        content: this.postContent.content,
                        user: id,
                    }),
                })

                if (!createres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                    throw new Error('Network response was not ok');
                }

                if (createres.ok) {
                    const data = await createres.json();
                    console.log(data);
                    this.dialog = false;
                    this.postContent.title = '';
                    this.postContent.content = '';
                    this.getPosts();
                }

            } catch {
                console.log('error');
            }
        },

        async likePost(postId) {
            const url = `http://127.0.0.1:8000/postlikes/${postId}/`;
            const cokies = Cookies.get('csrftoken');

            try {

                const likesres = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type':  'application/json',
                        'X-CSRFToken': cokies,
                    }
                })

                if(likesres.ok) {
                    const data = await likesres.json();
                    console.log(data);
                    this.postData.likes = data.likes;
                    console.log(this.postData.likes);
                    this.getPosts();
                }

            } catch {
                console.log('error');
            }
        },

        rankPost() {
            const array = [...this.postData];
            array.sort((a, b) => {
                return b.like_count - a.like_count;
            })
            this.postData = array.reverse();
        }
    },



    computed: {
        userId() {
            return this.$store.state.userId;
        },

        reversePostData() {
            return [...this.postData].reverse();
        },
    },

    created() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            this.$store.commit('setAuthToken', token);
            this.$store.commit('setUserId', userId);
        }

        this.getPosts();
    }
}
</script>

<style scoped lang="scss">

.custom-app-bar {
    padding: 10px 40px;

    &__title {
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        letter-spacing: 1px;
        cursor: pointer;
    }
}

.home-title {
    font-size: 24px;
    letter-spacing: 2px;
    text-align: center;
}

.text-field {
    background-color: #FFFFFF;
}

.post-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
}

.search-btn {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.my-page {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.logout {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}

.sort-btn {
    margin-bottom: 40px;
    justify-content: flex-end;
}

.post-info {
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    &__title {
        color: #333333;
        font-size: 20px;
        margin-bottom: 4px;
        font-weight: bold;
        letter-spacing: 2px;
    }

    &__content {
        color: black;
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: bold;
    }
}

.post-person {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: #E8D575;
    padding : 4px;
}

.username {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: .1px;
    margin-bottom: 8px;

    &:hover {
        text-decoration: underline;
    }
}

.date {
    font-size: 14px;
    color: darkgray;
    letter-spacing: .1px;
}

.likes {
    color: #333333;
    font-size: 16px;
    letter-spacing: 1px;
}

.post-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
}

.dialog-toolbar{
    background-color: #E8D575;
}
</style>