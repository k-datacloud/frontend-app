<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-row class="login-wrap mx-auto align-center">
        <div>
          <v-img width="320" src="@/assets/1289.png"></v-img>
        </div>
        <div>
          <v-card class=" pa-4" width="500">
            <v-form @submit.prevent="Login">
              <v-card-title class="login-title">ログイン画面</v-card-title>
                <v-card-text>
                  <v-col>
                    <p class="label">メールアドレス</p>
                  <v-text-field class="input" variant="outlined" v-model="loginUser.email" label="sample@example.com"></v-text-field>
                </v-col>
                <v-col>
                  <p class="label">パスワード</p>
                  <v-text-field variant="outlined" v-model="loginUser.password" label="password"></v-text-field>
                </v-col>
                <v-col>
                  <v-alert class="errormessage" v-if="errorMessage.error" type="error">{{ errorMessage.error }}</v-alert>
                </v-col>
                <v-col class="text-center">
                  <v-btn class="custom-btn" type="submit" justify="center">ログイン</v-btn>
                </v-col>
              </v-card-text>
            </v-form>
        </v-card>
      </div>
    </v-row>
  </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'
import Header from '@/components/Header.vue';
export default {
  name: 'LoginView',

  components: {
    Header
  },

  data: () => ({
    //
    loginUser:{email: '', password: ''},
    errorMessage: [],
  }),

  methods: {
    async Login() {
            const csrftoken = Cookies.get('csrftoken');
            const url = 'http://127.0.0.1:8000/login/';

            try {
                const loginres = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type':  'application/json',
                        'X-CSRFToken': csrftoken,
                    },

                    body:JSON.stringify(this.loginUser),
                })

                if (!loginres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                    const errorData = await loginres.json();
                    console.log(errorData);
                    this.errorMessage = errorData;
                }

                const data = await loginres.json();
                console.log(data);

                this.$store.commit('setAuthToken', data.token);
                this.$store.commit('setUserId', data.id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
                this.$router.push('/home');

            } catch {
                console.log('error');
            }
    },
  },

  mounted() {
    window.addEventListener('popstate', () => {
      this.$router.push('/');
    })
  }

};
</script>

<style scoped lang="scss">

.custom-btn {
  background-color: #E8D575;
  color: #333333;
  font-size: 16px;
  font-weight: bold; 
}

.login-wrap {
  margin: 120px auto 0 auto;
  justify-content: center;
  gap: 60px;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  letter-spacing: 2px;
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.input input::placeholder {
  font-size: 14px;
}

</style>
