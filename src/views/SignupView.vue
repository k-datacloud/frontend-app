<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-container>
        <v-row class="mt-16 mb-16 align-center">
          <v-col>
            <v-img width="500" src="@/assets/1396.png"></v-img>
          </v-col>
          <v-col>
            <v-card class=" pa-4" width="500">
                <v-form @submit.prevent="signUp">
                    <v-card-title class="signup-title">新規登録</v-card-title>
                    <p class="label">ユーザーネーム(投稿に表示されます)</p>
                    <v-text-field variant="outlined" class="text-field" v-model="signUser.username" label="田中太郎"></v-text-field>
                    <v-alert class="mb-4" type="error" v-if="this.errorMeaage.username">{{ this.errorMeaage.username }}</v-alert>
                
                    <p class="label">メールアドレス</p>
                    <v-text-field variant="outlined" class="text-field" v-model="signUser.email" label="sample@example.com"></v-text-field>
                    <v-alert class="mb-4" type="error" v-if="this.errorMeaage.email">{{ this.errorMeaage.email }}</v-alert>
                  
                    <p class="label">パスワード</p>
                    <v-text-field variant="outlined" class="text-field" v-model="signUser.password" label="password"></v-text-field>
                    <v-alert class="mb-4" type="error" v-if="this.errorMeaage.password">{{ this.errorMeaage.password }}</v-alert>
                    
                    <p class="label">フリースペース</p>
                    <v-text-field variant="outlined" class="text-field" v-model="signUser.freeword" label="自己紹介など"></v-text-field>
                    
                    <v-col class="d-flex justify-center">
                      <v-btn class="custom-btn__signup" type="submit" justify="center">新規登録</v-btn>
                    </v-col>
                </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
import Header from '@/components/Header.vue';


export default defineComponent({
  name: 'HomeView',

  components: {
    Header
  },

  data: () => ({
    //
    signUser:{username: '', email: '', password: '', freeword: ''},
    errorMeaage: {
      username: '',
      email: '',
      password: '',
    }

  }),
  methods: {
    async signUp() {
            const csrftoken = Cookies.get('csrftoken');
            const url = 'http://127.0.0.1:8000/user/'

            try {
                const signres = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type':  'application/json',
                        'X-CSRFToken': csrftoken,
                    },

                    body:JSON.stringify(this.signUser),
                })

                if (!signres.ok) {
                    // サーバーがエラーレスポンスを返した場合
                    const errorData = await signres.json();
                    this.errorMeaage.username = errorData.username[0];
                    this.errorMeaage.email = errorData.email[0];
                    this.errorMeaage.password = errorData.password[0];
                }

                if (signres.ok) {
                  const data = await signres.json();
                  console.log(data);
                  this.$store.commit('setAuthToken', data.token);
                  this.$store.commit('setUserId', data.id);
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('userId', data.id);
                  this.$router.push('/home');
                }

            } catch(error) {
              const errorData = await error.json();
              console.log(errorData);
            }
    },

  }
});
</script>


<style scoped lang="scss">

.custom-btn {
  background-color: #E8D575;
  color: #333333;
  font-size: 16px;
  font-weight: bold;

  &__signup {
    border-radius: 10px;
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
  }
}

.signup-wrap {
  margin: 120px auto 120px auto;
  max-width: 600px;
}


.signup-title {
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  color: #333333;
  text-align: center;
}

.text-field {
  font-size: 14px;
}

.label {
  font-size: 16px;
  letter-spacing: 1px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 8px;
}

</style>
