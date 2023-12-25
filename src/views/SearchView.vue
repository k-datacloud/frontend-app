<template>
    <v-app>
        <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/home')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn @click="this.$router.push('/home')" class="back">
                <v-icon>mdi-arrow-left</v-icon>投稿に戻る
            </v-btn>
            <v-btn class="logout">
                <v-icon>mdi-logout</v-icon>ログアウト
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container class="search-wrapper">
                <h1 class="search-title">どんな体験を探していますか？</h1>
                <v-form class="search-form" @submit.prevent="SearchPost()">
                    <v-text-field variant="outlined" v-model="searchText" class="search-text" label="例：○○の勉強方法など"></v-text-field>
                    <p class="text-center mb-10"><v-btn type="submit" class="custom-btn">検索する</v-btn></p>
                    <p class="text-center" v-if="error">{{ this.error }}</p>
                    <div v-if="error">
                        <v-img class="mx-auto" width="400" src="@/assets/1288.png"></v-img>
                    </div>
                </v-form>
                <v-col cols="12" v-for="post in postDates" :key="post.id">
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
                                <v-card-subtitle class="post-info__content">{{ post.person }}</v-card-subtitle>
                                </v-card-item>
                        </v-col>

                        <v-col class="detail-item d-flex align-center justify-space-between">
                            <div class="d-flex align-center">
                                    <v-icon class="mr-2" style="font-size: 20px;" :style="{color: post.like_count > 0 ? 'red' : 'black'}">mdi-heart</v-icon>
                                    <span class="likes"> {{ post.like_count }}いいね</span>
                            </div>
                        </v-col>
                    </v-card>
                </v-col>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    name: "SearchView",

   data: () => ({
       searchText: '',
       length: '',
       postDates: [],
       error: '',
   }),

   methods: {
       async SearchPost() {
           const url = `http://127.0.0.1:8000/search/`;
           const csrftoken = Cookies.get('csrftoken');
           const token = this.$store.state.authToken;

           try {
               const searchres = await fetch(url, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken,
                       'Authorization': `Token ${token}`
                   },

                   body: JSON.stringify({
                       text: this.searchText
                   })
               })



               if (!searchres.ok) {
                   // サーバーがエラーレスポンスを返した場合
               }

               const data = await searchres.json();
               console.log(data);

               if (data.error) {
                   this.error = data.error;
               } else {
                   this.postDates = data;
                   this.formatted_Date();
                   this.searchText = '';
                   this.error = '';
               }
            } catch {
                console.log('error');
            }
       },

       formatted_Date() {
            for (let i = 0; i < this.postDates.length; i++) {
                const date = new Date(this.postDates[i].created_at);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                this.postDates[i].created_at = `${year}年${month}月${day}日`;
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

.back {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
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

.search-wrapper {
    width: 70%;
    max-width: 1000px;
    margin: 80px auto 0 auto;
}

.search-form {
    margin-bottom: 40px;
}

.search-title {
    font-size: 30px;
    margin-bottom: 40px;
    color: #333333;
}

.custom-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.search-text {
    margin-bottom: 40px;
}

.search-result {
    font-size: 20px;
    color: #333333;
    margin-bottom: 40px;
}

.post-info {
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    &__title {
        color: #333333;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: .2px;
    }

    &__content {
        color: #333333;
        font-size: 15px;
        letter-spacing: .1px;
    }
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
    font-size: 15px;
    letter-spacing: .1px;
}
</style>