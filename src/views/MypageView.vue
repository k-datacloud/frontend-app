<template>
    <v-app>
        <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/home')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="back" @click="this.$router.push('/home')">
                <v-icon>mdi-arrow-left</v-icon>投稿に戻る
            </v-btn>
            <v-btn class="logout background-color" @click="Logout()">
                <v-icon>mdi-logout</v-icon>ログアウト
            </v-btn>
        </v-app-bar>
        <v-main>
            <div class="mypage-wrapper d-flex">
                <v-col>
                    <v-img width="400" src="@/assets/1289.png" alt="人物"></v-img>
                </v-col>
                <v-col>
                    <h2 class="mypage-title">Profile</h2>
                    <table class="table">
                        <tbody>
                            <tr class="align-middle">
                                <th class="table-title">ユーザーネーム</th>
                                <td class="table-data">{{ this.user.username }}</td>
                                <td class="table-btn"><button @click="this.dialog = !this.dialog" class="edit-icon"><v-icon>mdi-pencil</v-icon></button></td>
                            </tr>
                            <tr>
                                <th class="table-title">メールアドレス</th>
                                <td class="table-data">{{ this.user.email }}</td>
                                <td class="table-btn"><button @click="this.dialog = !this.dialog" class="edit-icon"><v-icon>mdi-pencil</v-icon></button></td>
                            </tr>
                            <tr>
                                <th class="table-title">自己紹介</th>
                                <td class="table-data">{{ this.user.freeword }}</td>
                                <td class="table-btn"><button @click="this.dialog = !this.dialog" class="edit-icon"><v-icon>mdi-pencil</v-icon></button></td>
                            </tr>
                            <tr>
                                <th class="table-title">投稿数</th>
                                <td class="table-data">{{ this.user.post_count }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </div>

            <v-dialog width="500" overlay-color="rgba(0, 0, 0, 0.8)" class="dialog mx-auto" v-model="dialog">
                <v-card class="pa-4">
                    <v-form @submit.prevent="editUser(userId)">
                        <v-text-field class="text-field" v-model="newUser.username"  variant="outlined" label="名前"></v-text-field>
                        <v-text-field class="text-field" v-model="newUser.email"  variant="outlined" label="メールアドレス"></v-text-field>
                        <v-text-field class="text-field" v-model="newUser.freeword"  variant="outlined" label="自己紹介"></v-text-field>
                        <v-col class="d-flex justify-center">
                            <v-btn class="edit-btn" elevation="0" type="submit">Edit</v-btn>
                        </v-col>
                    </v-form>
                </v-card>
            </v-dialog>

        </v-main>
    </v-app>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    name: 'MypageView',

    data: () => ({
        //
        user: [],
        dialog: false,
        newUser: {
            username: '',
            email: '',
            freeword: '',
        }
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


                const data = await userres.json();
                console.log(data);
                this.user = data

            } catch {
                console.log('error');
            }
        },

        async editUser(userId) {
            const url = `http://127.0.0.1:8000/edituser/${userId}/`;
            const csrftoken = Cookies.get('csrftoken');
            const token = this.$store.state.authToken;

            try {
                const editres = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                        'Authorization': `Token ${token}`
                    },

                    body: JSON.stringify({
                        username: this.newUser.username,
                        email: this.newUser.email,
                        freeword: this.newUser.freeword
                    })
                })

                if(editres.status === 400) {
                    const data = await editres.json();
                    console.log(data);
                    this.errorMessage = data
                }

                if(editres.ok) {
                    const data = await editres.json();
                    console.log(data);
                    this.dialog = !this.dialog
                    this.getUser(this.userId)
                    this.newUser = {
                        username: '',
                        email: '',
                        freeword: '',
                    }
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

    computed: {
        userId() {
            return this.$route.params.id;
        },
    },

    created() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            this.$store.commit('setAuthToken', token);
            this.$store.commit('setUserId', userId);
        }
        this.getUser(this.userId);

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
        width: 55%;
        padding: 20px;
        font-size: 16px;
        letter-spacing: 1px;
    }

    .table-btn {
        width: 10%;
        padding: 20px;
    }
}

.text-field {
    background-color: #FFFFFF;
}

.edit-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
}
</style>