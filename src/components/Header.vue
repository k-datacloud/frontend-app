<template>
    <v-app-bar elevation="0" class="custom-app-bar">
            <v-app-bar-title><span @click="this.$router.push('/')" class="custom-app-bar__title">CarrerShere</span></v-app-bar-title>
            <v-spacer></v-spacer>
            <button elevation="0" @click="this.$router.push('/signup')" class="custom-btn__signup mr-8">新規登録(無料)</button>
            <button elevation="0" @click="this.$router.push('/login')" class="custom-btn__login mr-8">ログイン</button>
            <button elevation="0" @click="this.$router.push('/privacy')" class="custom-btn__privacy">プライバシーポリシー</button>
    </v-app-bar>
</template>

<script>
export default {
    name: 'HeaderView',
}
</script>

<style scoped lang="scss">
.custom-app-bar {
    background-color: #fff;
    padding: 10px 40px;
    box-shadow: none;

    &__title {
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        letter-spacing: 1.5px;
        cursor: pointer;
    }
}

.custom-btn__signup {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px;
    width: 180px;
    letter-spacing: 1px;
    padding: 10px 0;
}

.custom-btn__login {
    border: 2px solid #E8D575;
    color: #333333;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: bold;
    border-radius: 20px;
    width: 180px;
    padding: 10px 0;
}

.custom-btn__privacy {
    color: #333333;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: bold;
    border-radius: 20px;
    width: 180px;
    padding:  10px 0;
}

</style>

