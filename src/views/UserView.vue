<template>
    <v-app>
        <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/home')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="back" @click="this.$router.push('/home')" >
                <v-icon>mdi-arrow-left</v-icon>投稿に戻る
            </v-btn>
            <v-btn  class="logout background-color"  @click="Logout()">
                <v-icon>mdi-logout</v-icon>ログアウト
            </v-btn>
        </v-app-bar>
        <v-main>
            <div class="mypage-wrapper d-flex">
                <v-col>
                    <v-img width="400" src="@/assets/402.png" alt="人物"></v-img>
                </v-col>
                <v-col>
                    <h2 class="mypage-title">Profile</h2>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th class="table-title">ユーザーネーム</th>
                                <td class="table-data">{{ this.user.username }}</td>
                            </tr>
                            <tr>
                                <th class="table-title">自己紹介</th>
                                <td class="table-data">{{ this.user.freeword }}</td>
                            </tr>
                            <tr>
                                <th class="table-title">投稿数</th>
                                <td class="table-data">{{ this.user.post_count }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </div>
        </v-main>
    </v-app>
</template>

<script>

import Cookies from 'js-cookie'

export default {
    name: "UserView",

    data: () => ({
        user: [],
        isFollow: false,
    }),

    methods: {

        async getUser(userId) {
            const url = `http://127.0.0.1:8000/user/${userId}/`;
            const csrftoken = Cookies.get('csrftoken');
            

            console.log(userId);
            try {
                const userres = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                });

                if (!userres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                    throw new Error('Network response was not ok');
                }

                const data = await userres.json();
                console.log(data);
                this.user = data;

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

    computed: {
        userId () {
            return this.$route.params.id
        }
    },

    created() {
        this.getUser(this.userId)
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            this.$store.commit('setAuthToken', token);
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

.logout {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}

.user-wrap {
    margin: 120px auto 0 auto;
    max-width: 600px;
}

.user-card {
    padding: 40px 100px;
}

.profile {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    text-align: center;
}

.follow-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.mypage-wrapper {
    margin: 160px auto 0 auto;
    width: 800px;
    justify-content: center;
    gap: 40px;
}

.mypage-title {
    font-size: 24px;
    letter-spacing: 2px;
    font-family: fantasy;
    font-weight: normal;
    color: #333333;
    margin-bottom: 20px;
}

.table {
    width: 600px;
    border-collapse: collapse;

    tr {
        border-bottom: 1px solid #e0e0e0;
    }


    th {
        width: 35%;
        padding: 20px;
        font-weight: bold;
        font-size: 16px;
        letter-spacing: 1px;
    }

    td {
        width: 65%;
        padding: 20px;
        font-size: 16px;
        letter-spacing: 1px;
    }
}
</style>