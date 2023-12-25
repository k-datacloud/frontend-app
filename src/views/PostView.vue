<template>
    <v-app>
        <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/home')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="back" @click="this.$router.push('/home')">
                <v-icon>mdi-home</v-icon>ホームに戻る</v-btn>
            <v-btn class="logout"  @click="Logout()">
                <v-icon>mdi-logout</v-icon>ログアウト
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row class="align-center mt-16" justify="center">
                    <v-card elevation="0" class="post" mt-16>
                        <div class="user-info">
                            <p class="username">教えてくれた人&nbsp;<span class="username-span">@{{ postDates.user_name }}</span></p>
                            <p class="date">投稿日&nbsp;{{ postDates.created_at }}</p>
                            <div class="like-action">
                                <v-icon :style="{ color: postDates.like_count > 0 ? 'red' : 'black'}" class="icon mr-2">mdi-heart</v-icon>
                                <span class="like">{{ postDates.like_count }}いいね</span>
                                <v-btn elevation="0" class="like-btn" @click="likePost(postDates.id)">
                                {{ postDates.like_count > 0 ? 'いいねを取り消す' : 'いいねする' }}
                                </v-btn>
                            </div>
                        </div>
                        <h2 class="post__title">{{ postDates.title }}</h2>
                        <p class="person">どんな人に届けたいか&nbsp;{{ postDates.person }}</p>
                        <p class="post__content">{{ postDates.content }}</p>
                    </v-card>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>


<script>

import Cookies from 'js-cookie';

export default {
    name: 'MypageView',

    data: () => ({
        //
        postDates : [],
        isLiked: false
    }),

    computed: {
        userId() {
            return this.$store.state.userId;
        },

        postId() {
            return this.$route.params.id;
        }
    },

    methods: {
        async getPost(postId) {
            const url = `http://127.0.0.1:8000/post/${postId}/`;
            const cokies = Cookies.get('csrftoken');
            const token = this.$store.state.authToken;

            try {
                const postres = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': cokies,
                        'Authorization': `Token ${token}`
                    },
                })

                if(!postres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                }

                if (postres.ok) {
                    const data = await postres.json();
                    console.log(data);
                    this.postDates = data;
                    this.isLiked = data.likes;
                    this.formatted_Date();
                }

            } catch {
                console.log('error');
            }
        },

        formatted_Date() {
            const date = new Date(this.postDates.created_at);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            this.postDates.created_at = `${year}年${month}月${day}日`;
        },

        async likePost(Id) {
            const url = `http://127.0.0.1:8000/postlikes/${Id}/`;
            const cokies = Cookies.get('csrftoken');
            const userId = this.$store.state.userId;
            const token = this.$store.state.authToken;

            try {
                const likesres = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': cokies,
                        'Authorization': `Token ${token}`
                    },

                    body:JSON.stringify({user_id: userId}),


                })

                if (likesres.ok) {
                    const data = await likesres.json();
                    console.log(data);
                    this.postDates = data;
                    this.isLiked = !this.isLiked;
                    this.formatted_Date();
                }

            } catch {
                console.log('error');
            }
        },

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
        
    },

    created() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            this.$store.commit('setAuthToken', token);
            this.$store.commit('setUserId', userId);
        }
        this.getPost(this.postId);

    },
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

.back {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}

.logout {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}

.user-info {
    margin-bottom: 40px;
}
.post {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;

    &__title {
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
        letter-spacing: 3px;
        line-height: 1.7;
    }

    &__content {
        font-size: 16px;
        color: #333333;
        line-height: 1.8;
        letter-spacing: 1px;
    }
}

.username {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
}

.username-span {
    font-size: 18px;
    font-weight: bold;
    color: #333333;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

.date {
    font-size: 14px;
    color: darkgray;
    margin-bottom: 20px;
}

.person {
    font-size: 18px;
    color: #333333;
    margin-bottom: 20px;
    font-weight: bold;
}

.like {
    font-size: 16px;
    letter-spacing: 1px;
}

.icon {
    font-size: 20px;
}

.like-btn {
    font-size: 16px;
}
</style>